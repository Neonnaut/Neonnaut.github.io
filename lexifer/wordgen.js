/*
 * Copyright (c) 2021 William Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
import WeightedSelector from './WeightedSelector';
import Word from './word';
import { ClusterEngine } from './SmartClusters';
import { Rule, Fragment } from './rule';
import ArbSorter from './ArbSorter';
const invalidItemAndWeight = (item) => {
    const parts = item.split(':');
    if (parts.length !== 2) {
        return true;
    }
    const weight = +parts[1];
    return Number.isNaN(weight) || weight < 0 || weight === Infinity;
};
class Category extends Map {
    weight;
    constructor(weight) {
        super();
        this.weight = weight;
    }
}
class SoundSystem {
    filters = [];
    phonemeset = {};
    ruleset = {};
    randpercent = 10;
    useAssim = false;
    useCoronalMetathesis = false;
    sorter = null;
    constructor() {
        Fragment.getRandomPhoneme = phoneme => {
            if (phoneme in this.phonemeset) {
                return this.phonemeset[phoneme].select();
            }
            return phoneme;
        };
    }
    applyFilters(word) {
        if (this.useAssim) {
            word.applyAssimilations();
        }
        if (this.useCoronalMetathesis) {
            word.applyCoronalMetathesis();
        }
        word.applyFilters(this.filters);
        return word;
    }
    addPhUnit(name, selection) {
        const naturalWeights = (phonemes) => {
            const jitter = (val, percent = 10) => val * (1 + percent * (Math.random() - 0.5) / 100);
            const phons = phonemes.split(/\s+/gu);
            const weighted = {};
            const numPhons = phons.length;
            for (let i = 0; i < numPhons; ++i) {
                weighted[phons[i]] = jitter(Math.log(numPhons + 1) - Math.log(i + 1));
            }
            let temp = '';
            for (const key in weighted) {
                temp += `${key}:${weighted[key]} `;
            }
            temp.trim();
            return temp;
        };
        const ruleToDict = (rule) => {
            const items = rule.trim().split(/\s+/gu);
            const dict = new Map();
            for (const item of items) {
                if (invalidItemAndWeight(item)) {
                    throw new Error(`'${item}' is not a valid phoneme and `
                        + 'weight.');
                }
                const [value, weight] = item.split(':');
                dict.set(value, +weight);
            }
            return dict;
        };
        if (!selection.includes(':')) {
            selection = naturalWeights(selection);
        }
        this.phonemeset[name] = new WeightedSelector(ruleToDict(selection));
    }
    addRule(rule, weight, cat = 'words:') {
        if (this.ruleset[cat]) {
            this.ruleset[cat].set(new Rule(rule), weight);
        }
        else {
            throw new Error(`uninitialized category '${cat}' referenced.`);
        }
    }
    addCategory(name, weight) {
        this.ruleset[name] = new Category(weight);
    }
    addFilter(pat, repl) {
        if (repl === '!') {
            this.filters.push([pat, '']);
        }
        else {
            this.filters.push([pat, repl]);
        }
    }
    addSortOrder(order) {
        this.sorter = new ArbSorter(order);
    }
    useIpa() {
        Word.clusterEngine = new ClusterEngine(true);
    }
    useDigraphs() {
        Word.clusterEngine = new ClusterEngine(false);
    }
    generate(numWords, verbose, unsorted, category, force = false) {
        const words = new Set();
        Word.verbose = verbose;
        Word.sorter = this.sorter;
        if (!this.ruleset[category]) {
            throw new Error(`unknown category '${category}'.`);
        }
        const dict = new Map(
        // at ts-expect-error `Category` and `undefined` are both
        // individually valid, but no single overload matches both.
        this.ruleset[category]);
        // If the map is empty, add `category` to it with weight 0 to produce a
        // more legible error message.
        if (dict.size === 0) {
            dict.set(category, 0);
        }
        const ruleSelector = new WeightedSelector(dict);
        /*
         * If they request more words than are possible, we don't want to lock
         * up. Instead, try up to four times as many (note: is this good?),
         * and then cut off after that. However, this doesn't guarantee that
         * it's impossible to generate more. Setting `force` to true requires
         * it to generate that many words, or freeze if it can't. It's
         * currently only used in paragraph mode, which chooses one word at a
         * time. I think it's safe to assume it's always possible to generate
         * at least one valid word.
         */
        for (let i = 0; i < 4_294_967_295 && (force || i < 4 * numWords); ++i) {
            const rule = ruleSelector.select();
            const form = rule.generate();
            const word = new Word(form, rule.toString());
            this.applyFilters(word);
            if (word.toString() !== 'REJECT') {
                words.add(word.toString());
                if (words.size === numWords) {
                    break;
                }
            }
        }
        let wordList = [...words];
        if (!(unsorted || verbose)) {
            if (this.sorter) {
                wordList = this.sorter.sort(wordList);
            }
            else {
                wordList.sort();
            }
        }
        return wordList;
    }
    randomCategory() {
        const weightedCats = new Map();
        for (const cat in this.ruleset) {
            weightedCats.set(cat, this.ruleset[cat].weight);
        }
        const catSelector = new WeightedSelector(weightedCats);
        return catSelector.select();
    }
}
const textify = (phsys, sentences = 25) => {
    let text = '';
    for (let i = 0; i < sentences; ++i) {
        const sent = Math.floor(Math.random() * 9) + 3;
        let comma = -1;
        if (sent >= 7) {
            comma = Math.floor(Math.random() * (sent - 1));
        }
        text += phsys.generate(1, false, true, phsys.randomCategory(), true)[0].toString()
            .replace(/./u, el => el.toUpperCase());
        for (let j = 0; j < sent; ++j) {
            text += ` ${phsys.generate(1, false, true, phsys.randomCategory(), true)[0]}`;
            if (j === comma) {
                text += ',';
            }
        }
        text += Math.random() <= 0.85 ? '. ' : '? ';
    }
    return text.trim();
};
export { SoundSystem, textify, invalidItemAndWeight };

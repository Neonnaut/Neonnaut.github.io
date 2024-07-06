/*
 * Copyright (c) 2021-2022 William Baker
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
/**
 * This class represents a sorting mechanism that can use an arbitrary sort
 * order. Its main purpose is to alphabetize the output of Lexifer.
 */
class ArbSorter {
    splitter;
    ords;
    vals;
    /**
     * Create a new `ArbSorter`.
     * @param order The list of all graphs used, in the order they are to be
     * sorted, separated by whitespace.
     */
    constructor(order) {
        const graphs = order.split(/\s+/gu);
        const splitOrder = [...graphs].sort((a, b) => b.length - a.length);
        this.splitter = new RegExp(`(${splitOrder.join('|')}|.)`, 'gu');
        this.ords = {};
        this.vals = [];
        for (const i in graphs) {
            this.ords[graphs[i]] = +i;
            this.vals.push(graphs[i]);
        }
    }
    /**
     * Convert a word to an array of numbers, for better sorting.
     * @param word The original word, as a string.
     * @returns A list of numbers based on the sort order.
     */
    wordAsValues(word) {
        const splitWord = this.split(word);
        const arrayedWord = splitWord.map(char => this.ords[char]);
        if (arrayedWord.includes(undefined)) {
            throw new Error(`word with unknown letter: '${word}'.\n`
                + 'A filter or assimilation might have caused this.');
        }
        return arrayedWord;
    }
    /**
     * Convert the array of numbers generated by `wordAsValues()` back to a
     * word.
     * @param values The list of numbers based on the sord order.
     * @returns The original word, as a string.
     */
    valuesAsWord(values) {
        return values.map(el => this.vals[el])
            .join('');
    }
    /**
     * Split a word into its graphs.
     * @param word The word to be split.
     * @returns An array of short strings, each one representing a single
     * grapheme or multigraph.
     */
    split(word) {
        return word.split(this.splitter)
            .filter(Boolean);
    }
    /**
     * Sort a list of words.
     * @param list The list of words to be sorted.
     * @returns A sorted copy of the list.
     */
    sort(list) {
        const l2 = list.filter(el => el !== '').map(this.wordAsValues, this);
        l2.sort((a, b) => {
            for (let i = 0; i < Math.min(a.length, b.length); ++i) {
                if (a[i] !== b[i]) {
                    return a[i] - b[i];
                }
            }
            return a.length - b.length;
        });
        return l2.map(this.valuesAsWord, this);
    }
}
export default ArbSorter;

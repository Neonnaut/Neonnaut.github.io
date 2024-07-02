"use strict";
/*! Lexifer TS v1.2.2

Copyright (c) 2021-2022 William Baker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

const genWords = (text, numbers, verbose, unsorted, oneperline) => {
    let f = "";
    let r = y(
        text,
        numbers,
        verbose,
        unsorted,
        oneperline,
        (e) => {
            f += e + "<br>";
        }
    );
    return [r, f];
};
class e {
    constructor(e) {
        const t = e.split(/\s+/gu),
            s = [...t].sort((e, t) => t.length - e.length);
        (this.splitter = RegExp(`(${s.join("|")}|.)`, "gu")), (this.ords = {}), (this.vals = []);
        for (const e in t) (this.ords[t[e]] = +e), this.vals.push(t[e]);
    }
    wordAsValues(e) {
        const t = this.split(e).map((e) => this.ords[e]);
        if (t.includes(void 0)) throw Error(`word with unknown letter: '${e}'.\nA filter or assimilation might have caused this.`);
        return t;
    }
    valuesAsWord(e) {
        return e.map((e) => this.vals[e]).join("");
    }
    split(e) {
        return e.split(this.splitter).filter(Boolean);
    }
    sort(e) {
        const t = e.filter((e) => "" !== e).map(this.wordAsValues, this);
        return (
            t.sort((e, t) => {
                for (let s = 0; s < Math.min(e.length, t.length); ++s) if (e[s] !== t[s]) return e[s] - t[s];
                return e.length - t.length;
            }),
            t.map(this.valuesAsWord, this)
        );
    }
}
const t = (e) => e && e[e.length - 1];
class s {
    constructor(e, t) {
        if (((this.stderr = t), (this.macros = []), (this.phClasses = []), (this.letters = []), (this.categories = []), (this.defFileLineNum = 0), (this.soundsys = new p()), "" === e.trim())) throw Error("Please include a definition.");
        (this.defFileArr = e.split("\n")), this.parse(), this.sanityCheck();
    }
    parse() {
        for (n.addOptional = () => this.soundsys.randpercent > 100 * Math.random(); this.defFileLineNum < this.defFileArr.length; ++this.defFileLineNum) {
            let e = this.defFileArr[this.defFileLineNum];
            if (((e = e.replace(/#.*/u, "").trim()), "" !== e))
                if (e.startsWith("with:")) this.parseOption(e.substring(5).trim());
                else if (e.startsWith("random-rate:")) {
                    const t = +e.substring(12);
                    if (!(t >= 0 && t <= 100)) throw Error("Invalid random-rate.");
                    this.soundsys.randpercent = t;
                } else if (e.startsWith("filter:")) this.parseFilter(e.substring(7).trim());
                else if (e.startsWith("reject:")) this.parseReject(e.substring(7).trim());
                else if (e.startsWith("words:")) this.parseWords(e.substring(6).trim());
                else if (e.startsWith("letters:")) this.parseLetters(e.substring(8).trim());
                else if (e.startsWith("categories:")) this.parseCategories(e.substring(11).trim());
                else if ("%" === e[0]) this.parseClusterfield();
                else {
                    if (!e.includes("=")) throw Error(`parsing error at '${e}'.`);
                    this.parseClass(e);
                }
        }
        if (this.soundsys.useAssim || this.soundsys.useCoronalMetathesis) {
            if (!c.clusterEngine) throw Error("Must select a featureset.");
            this.soundsys.sorter || this.stderr("Without 'letters:' cannot apply assimilations or coronal metathesis.");
        }
    }
    sanityCheck() {
        if (this.letters.length > 0) {
            const e = new Set(this.letters), t = new Set(this.phClasses);
            if (t.size > e.size) {
                const s = [...t].filter((t) => !e.has(t) && !e.has(t.split(":")[0]));
                this.stderr(`A phoneme class contains '${s.join(" ")}' missing from 'letters'.  Strange word shapes are likely to result.`);
            }
        }
    }
    parseOption(e) {
        var t;
        if ((null !== (t = e.match(/features/gu)) && void 0 !== t ? t : []).length > 1) throw Error("Must only choose one featureset.");
        for (const t of e.split(/\s+/gu))
            switch (t) {
                case "std-ipa-features":
                    this.soundsys.useIpa();
                    break;
                case "std-digraph-features":
                    this.soundsys.useDigraphs();
                    break;
                case "std-assimilations":
                    this.soundsys.useAssim = !0;
                    break;
                case "coronal-metathesis":
                    this.soundsys.useCoronalMetathesis = !0;
                    break;
                default:
                    throw Error(`unknown option '${t}'.`);
            }
    }
    parseFilter(e) {
        for (let t of e.split(";")) {
            if (((t = t.trim()), "" === t)) continue;
            const e = t.split(">");
            if (2 !== e.length) throw Error(`malformed filter '${t}': filters must look like 'old > new'.`);
            const s = e[0].trim(),
                r = e[1].trim();
            this.soundsys.addFilter(s, r);
        }
    }
    parseReject(e) {
        for (const t of e.split(/\s+/gu)) this.soundsys.addFilter(t, "REJECT");
    }
    parseWords(e) {
        if (this.categories.length > 0 && "words:" !== this.categories[0]) throw Error("both 'words:' and 'categories:' found. Please only use one.");
        0 === this.categories.length && this.soundsys.addCategory("words:", 1), (this.categories = ["words:"]), this.addRules(e);
    }
    addRules(e, t) {
        const s = e.split(/\s+/gu),
            r = e.includes(":");
        if ("?" === e[0] || /\s\?[^?!]/u.test(e)) throw Error("Rule cannot start with '?'.");
        e.includes("??") && this.stderr("'??' may cause unexpected behavior.");
        for (let e = 0; e < s.length; ++e) {
            let i, n;
            if (r) {
                if (d(s[e])) throw Error(`'${s[e]}' is not a valid pattern and weight.`);
                let t;
                ([i, t] = s[e].split(":")), (n = +t);
            } else (i = s[e]), (n = 10 / (e + 1) ** 0.9);
            if (!/[^?!]/u.test(i)) throw Error(`'${s[e]}'` + (t ? ` (in category ${t})` : "") + " will only produce empty words.");
            /^\?*[^?!]!?\?+!?$/u.test(i) && this.stderr(`'${s[e]}'` + (t ? ` (in category ${t})` : "") + " may produce empty words."), (i = this.expandMacros(i)), this.soundsys.addRule(i, n, t);
        }
    }
    expandMacros(e) {
        for (const [t, s] of this.macros) e = e.replace(t, s);
        return e;
    }
    parseLetters(e) {
        (this.letters = e.split(/\s+/gu)), this.soundsys.addSortOrder(e);
    }
    parseClusterfield() {
        var e;
        const t = this.defFileArr[this.defFileLineNum].trimEnd().split(/\s+/gu);
        t.shift();
        const s = t.length;
        for (; !["", "\n", void 0].includes(this.defFileArr[this.defFileLineNum]);) {
            let r = null !== (e = this.defFileArr[++this.defFileLineNum]) && void 0 !== e ? e : "";
            if (((r = r.replace(/#.*/u, "").trim()), "" === r)) continue;
            const i = r.split(/\s+/gu),
                n = i.splice(0, 1);
            if (i.length !== s) throw i.length > s ? Error(`cluster field row too long: '${r}'.`) : Error(`cluster field row too short: '${r}'.`);
            for (let e = 0; e < s; ++e) "+" !== i[e] && ("-" === i[e] ? this.soundsys.addFilter(n + t[e], "REJECT") : this.soundsys.addFilter(n + t[e], i[e]));
        }
    }

    parseClass(e) {
        const [t, s] = e.split("=").map((e) => e.trim());
        if ("$" === t[0]) /\s/u.test(s) && this.stderr(`Unexpected whitespace in macro '${t}'. Macros cannot make choices, so this may give very unexpected output.`), this.macros.push([RegExp("\\" + t, "gu"), s]);
        else if (1 === t.length) this.phClasses.push(...s.split(/\s+/gu)), this.soundsys.addPhUnit(t, s);
        else {
            if (!this.categories.includes(t)) throw Error(`unknown category '${t}'. Please put category definitions after the 'categories:' statement.`);
            this.addRules(s, t);
        }
    }
    parseCategories(e) {
        if (this.categories.includes("words:")) throw Error("both 'words:' and 'categories:' found. Please only use one.");
        const t = e.split(/\s+/gu), s = e.includes(":");
        for (const e of t)
            if (s) {
                if (d(e)) throw Error(`'${e}' is not a valid category and weight.`);
                const [t, s] = e.split(":");
                this.categories.push(t), this.soundsys.addCategory(t, +s);
            } else this.categories.push(e), this.soundsys.addCategory(e, 1);
    }
    generate(e = 1, t = !1, s = t) {
        const r = Object.create(null);
        for (const i of this.categories) {
            const n = this.soundsys.generate(e, t, s, i);
            n.length < e && this.stderr(`Could only generate ${n.length} word` + (1 === n.length ? "" : "s") + " " + ("words:" === i ? "" : `of category '${i}' `) + `(${e} requested).`), (r[i] = n);
        }
        return r;
    }
    paragraph(e) {
        return g(this.soundsys, e);
    }
}
const r = (e, t) => "!" === t || "?" === t || ![...e].some((e) => "!" !== e && "?" !== e && e !== t);
class i {
    constructor(e) {
        if (e.includes("!!")) throw Error(`misplaced '!' option: in non-duplicate environment: '${e}'.`);
        (this.parts = []), (this.str = e);
        const t = [];
        let s = "";
        for (const n of [...e.replace(/(.)\?/gu, "?$1")].reverse()) {
            if (r(s, n)) {
                const e = RegExp(`(${((i = n), i.replace(/([[\]{}()*+?|^$:.\\])/gu, "\\$1"))}\\??){3,}!`, "u");
                if ("!" === n ? /!\??$/u.test(s) : !e.test(n + s)) {
                    s = n + s;
                    continue;
                }
            }
            t.push(s), (s = n);
        }
        var i;
        t.push(s);
        for (const s of t.filter(Boolean).reverse()) {
            const t = !s.endsWith("!");
            if (!t && s.length <= 2) throw Error(`misplaced '!' option: in non-duplicate environment: '${e}'.`);
            const r = [...s],
                i = r.filter((e) => "?" === e).length,
                o = t ? 0 : r.filter((e) => "!" === e).length,
                a = s.length - o - i;
            this.parts.push(
                new n(
                    r.find((e) => "!" !== e && "?" !== e), a - i, a, t
                )
            );
        }
    }
    generate() {
        return this.parts.map((e) => e.generate()).join("");
    }
    toString() {
        return this.str;
    }
}
class n {
    constructor(e, t, s, r) {
        (this.value = e), (this.minReps = t), (this.maxReps = s), (this.allowRepeats = r);
    }
    getPhoneme(e) {
        if (!(null == e ? void 0 : e.length)) return n.getRandomPhoneme(this.value);
        let s;
        do {
            s = n.getRandomPhoneme(this.value);
        } while (!this.allowRepeats && s === t(e));
        return s;
    }
    generate() {
        if (1 === this.maxReps) return 0 !== this.minReps || n.addOptional() ? this.getPhoneme() : "";
        let e;
        const t = [];
        for (e = 0; e < this.minReps; ++e) t.push(this.getPhoneme(t));
        for (; e < this.maxReps; ++e) n.addOptional() && t.push(this.getPhoneme(t));
        return t.join("");
    }
}
var o, a;
!(function (e) {
    (e[(e.Bilabial = 0)] = "Bilabial"), (e[(e.Labiodental = 1)] = "Labiodental"),
        (e[(e.Alveolar = 2)] = "Alveolar"), (e[(e.Postalveolar = 3)] = "Postalveolar"),
        (e[(e.Retroflex = 4)] = "Retroflex"), (e[(e.Palatal = 5)] = "Palatal"),
        (e[(e.Velar = 6)] = "Velar"), (e[(e.Uvular = 7)] = "Uvular");
})(o || (o = {})),
    (function (e) {
        (e[(e.Plosive = 0)] = "Plosive"), (e[(e.Fricative = 1)] = "Fricative"),
            (e[(e.Nasal = 2)] = "Nasal"), (e[(e.Sibilant = 3)] = "Sibilant"),
            (e[(e.LateralFricative = 4)] = "LateralFricative"),
            (e[(e.LateralAffricate = 5)] = "LateralAffricate"),
            (e[(e.Affricate = 6)] = "Affricate");
    })(a || (a = {}));
class l {
    constructor(e, t, s, r) {
        (this.representation = e), (this.voiced = t), (this.place = s), (this.manner = r);
    }
    get isStop() {
        return this.manner === a.Nasal || this.manner === a.Plosive;
    }
    get isPeripheral() {
        return this.place === o.Bilabial || this.place === o.Velar;
    }
    toString() {
        return this.representation;
    }
}
class h {
    constructor(e) {
        this.segments = [
            new l("p", !1, o.Bilabial, a.Plosive), new l("b", !0, o.Bilabial, a.Plosive),
            new l(e ? "ɸ" : "ph", !1, o.Bilabial, a.Fricative),
            new l(e ? "β" : "bh", !0, o.Bilabial, a.Fricative),
            new l("f", !1, o.Labiodental, a.Fricative), new l("v", !0, o.Labiodental, a.Fricative),
            new l("m", !0, o.Bilabial, a.Nasal), new l("m", !0, o.Labiodental, a.Nasal),
            new l("t", !1, o.Alveolar, a.Plosive), new l("d", !0, o.Alveolar, a.Plosive),
            new l("s", !1, o.Alveolar, a.Sibilant), new l("z", !0, o.Alveolar, a.Sibilant),
            new l(e ? "θ" : "th", !1, o.Alveolar, a.Fricative),
            new l(e ? "ð" : "dh", !0, o.Alveolar, a.Fricative),
            new l(e ? "ɬ" : "lh", !1, o.Alveolar, a.LateralFricative),
            new l(e ? "ɮ" : "ldh", !0, o.Alveolar, a.LateralFricative),
            new l(e ? "tɬ" : "tl", !1, o.Alveolar, a.LateralAffricate),
            new l(e ? "dɮ" : "dl", !0, o.Alveolar, a.LateralAffricate),
            new l("ts", !1, o.Alveolar, a.Affricate), new l("dz", !0, o.Alveolar, a.Affricate),
            new l(e ? "ʃ" : "sh", !1, o.Postalveolar, a.Sibilant),
            new l(e ? "ʒ" : "zh", !0, o.Postalveolar, a.Sibilant),
            new l(e ? "tʃ" : "ch", !1, o.Postalveolar, a.Affricate),
            new l(e ? "dʒ" : "j", !0, o.Postalveolar, a.Affricate),
            new l("n", !0, o.Alveolar, a.Nasal),
            new l(e ? "ʈ" : "rt", !1, o.Retroflex, a.Plosive),
            new l(e ? "ɖ" : "rd", !0, o.Retroflex, a.Plosive),
            new l(e ? "ʂ" : "sr", !1, o.Retroflex, a.Sibilant),
            new l(e ? "ʐ" : "zr", !0, o.Retroflex, a.Sibilant),
            new l(e ? "ʈʂ" : "rts", !1, o.Retroflex, a.Affricate),
            new l(e ? "ɖʐ" : "rdz", !0, o.Retroflex, a.Affricate),
            new l(e ? "ɳ" : "rn", !0, o.Retroflex, a.Nasal),
            new l(e ? "c" : "ky", !1, o.Palatal, a.Plosive),
            new l(e ? "ɟ" : "gy", !0, o.Palatal, a.Plosive),
            new l(e ? "ɕ" : "sy", !1, o.Palatal, a.Sibilant),
            new l(e ? "ʑ" : "zy", !0, o.Palatal, a.Sibilant),
            new l(e ? "ç" : "hy", !1, o.Palatal, a.Fricative),
            new l(e ? "ʝ" : "yy", !0, o.Palatal, a.Fricative),
            new l(e ? "tɕ" : "cy", !1, o.Palatal, a.Affricate),
            new l(e ? "dʑ" : "jy", !0, o.Palatal, a.Affricate),
            new l(e ? "ɲ" : "ny", !0, o.Palatal, a.Nasal),
            new l("k", !1, o.Velar, a.Plosive), new l("g", !0, o.Velar, a.Plosive),
            new l(e ? "x" : "kh", !1, o.Velar, a.Fricative),
            new l(e ? "ɣ" : "gh", !0, o.Velar, a.Fricative),
            new l(e ? "ŋ" : "ng", !0, o.Velar, a.Nasal),
            new l("q", !1, o.Uvular, a.Plosive),
            new l(e ? "ɢ" : "gq", !0, o.Uvular, a.Plosive),
            new l(e ? "χ" : "qh", !1, o.Uvular, a.Fricative),
            new l(e ? "ʁ" : "gqh", !0, o.Uvular, a.Fricative),
            new l(e ? "ɴ" : "nq", !0, o.Uvular, a.Nasal),
        ];
    }
    getSegment(e) {
        return this.segments.find((t) => !((void 0 !== e.voiced && t.voiced !== e.voiced) || (void 0 !== e.place && t.place !== e.place) || (void 0 !== e.manner && t.manner !== e.manner)));
    }
    applyAssimilations(e) {
        const t = (e, t) => {
            const s = this.segments.find((t) => t.representation === e);
            if (s && s.manner === a.Nasal) {
                const e = this.segments.find((e) => e.representation === t);
                if (e) {
                    const t = this.segments.find((t) => t.place === e.place && t.manner === a.Nasal);
                    if (t) return t.representation;
                }
            }
            return e;
        },
            s = (e, t) => {
                const s = this.segments.find((e) => e.representation === t);
                if (s) {
                    const t = this.segments.find((t) => t.representation === e);
                    if (t) {
                        const e = this.segments.find((e) => e.voiced === s.voiced && e.place === t.place && e.manner === t.manner);
                        if (e) return e.representation;
                    }
                }
                return e;
            },
            r = [...e];
        for (let i = 0; i < e.length - 1; ++i) (r[i] = s(e[i], e[i + 1])), (r[i] = t(r[i], e[i + 1]));
        return r;
    }
    applyCoronalMetathesis(e) {
        const t = (e, t) => {
            const s = this.segments.find((t) => t.representation === e);
            if (s && s.place === o.Alveolar) {
                const r = this.segments.find((e) => e.representation === t);
                if ((null == r ? void 0 : r.isPeripheral) && r.isStop && r.manner === s.manner) return [t, e];
            }
            return [e, t];
        },
            s = [...e];
        for (let r = 0; r < e.length - 1; ++r) [s[r], s[r + 1]] = t(s[r], e[r + 1]);
        return s;
    }
}
class u {
    constructor(e) {
        (this.keys = []), (this.weights = []);
        for (const [t, s] of e) "number" == typeof s && (this.keys.push(t), this.weights.push(s));
        this.sum = this.weights.reduce((e, t) => e + t, 0);
    }
    select() {
        const e = Math.random() * this.sum;
        let t = 0;
        for (let s = 0; s < this.keys.length; ++s) if (((t += this.weights[s]), e < t)) return this.keys[s];
        throw Error(`failed to choose options from '${this.keys.join("', '")}'.`);
    }
}
class c {
    constructor(e, t) {
        (this.forms = [e]), (this.filters = [t]);
    }
    applyFilter(e, s) {
        let r = t(this.forms);
        (r = r.replace(RegExp(e, "gu"), s)), r.includes("REJECT") && (r = "REJECT"), r !== t(this.forms) && (this.forms.push(r), this.filters.push(`${e} > ${s || "!"}`));
    }
    applyFilters(e) {
        for (const s of e) if ((this.applyFilter(...s), "REJECT" === t(this.forms))) return;
    }
    applyAssimilations() {
        if (c.sorter && c.clusterEngine) {
            const e = c.clusterEngine.applyAssimilations(c.sorter.split(t(this.forms))).join("");
            e !== t(this.forms) && (this.forms.push(e), this.filters.push("std-assimilations"));
        }
    }
    applyCoronalMetathesis() {
        if (c.sorter && c.clusterEngine) {
            const e = c.clusterEngine.applyCoronalMetathesis(c.sorter.split(t(this.forms))).join("");
            e !== t(this.forms) && (this.forms.push(e), this.filters.push("coronal-metathesis"));
        }
    }
    toString() {
        if (c.verbose) {
            let e = "";
            for (const t in this.forms) e += `${this.filters[t]} – ${this.forms[t]}\n`;
            return e;
        }
        return t(this.forms);
    }
}
(c.verbose = !1), (c.sorter = null), (c.clusterEngine = null);
const d = (e) => {
    const t = e.split(":");
    if (2 !== t.length) return !0;
    const s = +t[1];
    return Number.isNaN(s) || s < 0 || s === 1 / 0;
};
class f extends Map {
    constructor(e) {
        super(), (this.weight = e);
    }
}
class p {
    constructor() {
        (this.filters = []), (this.phonemeset = {}), (this.ruleset = {}), (this.randpercent = 10),
            (this.useAssim = !1), (this.useCoronalMetathesis = !1), (this.sorter = null),
            (n.getRandomPhoneme = (e) => (e in this.phonemeset ? this.phonemeset[e].select() : e));
    }
    applyFilters(e) {
        return this.useAssim && e.applyAssimilations(), this.useCoronalMetathesis && e.applyCoronalMetathesis(), e.applyFilters(this.filters), e;
    }
    addPhUnit(e, t) {
        t.includes(":") ||
            (t = ((e) => {
                const t = (e, t = 10) => e * (1 + (t * (Math.random() - 0.5)) / 100),
                    s = e.split(/\s+/gu), r = {}, i = s.length;
                for (let e = 0; e < i; ++e) r[s[e]] = t(Math.log(i + 1) - Math.log(e + 1));
                let n = "";
                for (const e in r) n += `${e}:${r[e]} `;
                return n.trim(), n;
            })(t)),
            (this.phonemeset[e] = new u(
                ((e) => {
                    const t = e.trim().split(/\s+/gu),
                        s = new Map();
                    for (const e of t) {
                        if (d(e)) throw Error(`'${e}' is not a valid phoneme and weight.`);
                        const [t, r] = e.split(":");
                        s.set(t, +r);
                    }
                    return s;
                })(t)
            ));
    }
    addRule(e, t, s = "words:") {
        if (!this.ruleset[s]) throw Error(`uninitialized category '${s}' referenced.`);
        this.ruleset[s].set(new i(e), t);
    }
    addCategory(e, t) {
        this.ruleset[e] = new f(t);
    }
    addFilter(e, t) {
        "!" === t ? this.filters.push([e, ""]) : this.filters.push([e, t]);
    }
    addSortOrder(t) {
        this.sorter = new e(t);
    }
    useIpa() {
        c.clusterEngine = new h(!0);
    }
    useDigraphs() {
        c.clusterEngine = new h(!1);
    }
    generate(e, t, s, r, i = !1) {
        const n = new Set();
        if (((c.verbose = t), (c.sorter = this.sorter), !this.ruleset[r])) throw Error(`unknown category '${r}'.`);
        const o = new Map(this.ruleset[r]);
        0 === o.size && o.set(r, 0);
        const a = new u(o);
        for (let t = 0; t < 4294967295 && (i || t < 4 * e); ++t) {
            const t = a.select(), s = t.generate(), r = new c(s, t.toString());
            if ((this.applyFilters(r), "REJECT" !== r.toString() && (n.add(r.toString()), n.size === e))) break;
        }
        let l = [...n];
        return s || t || (this.sorter ? (l = this.sorter.sort(l)) : l.sort()), l;
    }
    randomCategory() {
        const e = new Map();
        for (const t in this.ruleset) e.set(t, this.ruleset[t].weight);
        return new u(e).select();
    }
}
const g = (e, t = 25) => {
    let s = "";
    for (let r = 0; r < t; ++r) {
        const t = Math.floor(9 * Math.random()) + 3;
        let r = -1;
        t >= 7 && (r = Math.floor(Math.random() * (t - 1))),
            (s += e
                .generate(1, !1, !0, e.randomCategory(), !0)[0]
                .toString()
                .replace(/./u, (e) => e.toUpperCase()));
        for (let i = 0; i < t; ++i) (s += " " + e.generate(1, !1, !0, e.randomCategory(), !0)[0]), i === r && (s += ",");
        s += Math.random() <= 0.85 ? ". " : "? ";
    }
    return s.trim();
};
class w {
    constructor(e, t) {
        (this.categories = e), (this.warnings = t);
    }
    get allWords() {
        const e = [];
        for (const t of Object.values(this.categories)) e.push(...t);
        return e;
    }
    *[Symbol.iterator]() {
        for (const [e, t] of Object.entries(this.categories)) for (const s of t) yield [s, e];
    }
}
class v {
    constructor(e) {
        this.initWarnings = [];
        let t = !1;
        (this.phonDef = new s(e, (e) => {
            t ? this.runWarnings.push(e) : this.initWarnings.push(e);
        })),
            (t = !0);
    }
    generate(e) {
        if (e.number > Number.MAX_SAFE_INTEGER || e.number <= 0 || Number.isNaN(e.number)) throw Error(`Cannot generate ${e.number} words.`);
        this.runWarnings = [];
        let t = e.number;
        return (
            t !== Math.round(t) && (this.runWarnings.push(`Requested number of words (${t}) is not an integer. Rounding to ${Math.round(t)}.`), (t = Math.round(t))),
            new w(this.phonDef.generate(t, !1, e.unsorted), [...this.initWarnings, ...this.runWarnings])
        );
    }
}

const y = (() => {
    let t = 0, r = null;
    const i = (e, i, n = !1, o, a = !1, l = console.error) => {
        let h = "";
        try {
            const u = ((e) => {
                let t = 0;
                if (0 === e.length) return t;
                for (let s = 0; s < e.length; ++s) t = Math.trunc((t << 5) - t + e.codePointAt(s));
                return t;
            })(e);
            if (((t === u && r) || ((r = new s(e, l)), (t = u)), i))
                if (i < 0 || i === 1 / 0) l(`Cannot generate ${i} words.`), (h = r.paragraph());
                else {
                    i !== Math.round(i) && (l(`Requested number of words (${i}) is not an integer. Rounding to ${Math.round(i)}.`), (i = Math.round(i))),
                        n && (!1 === o && (l("** 'Unsorted' option always enabled in verbose mode."), (o = !0)), a && l("** 'One per line' option ignored in verbose mode."));
                    const e = r.generate(i, n, o);
                    for (const t in e) "words:" !== t && (h += `\n\n${t}:\n`), (h += e[t].join(a || n ? "\n" : " "));
                }
            else n && l("** 'Verbose' option ignored in paragraph mode."), o && l("** 'Unsorted' option ignored in paragraph mode."), a && l("** 'One per line' option ignored in paragraph mode."), (h = r.paragraph());
        } catch (e) { l(e); }
        return h;
    };
    return (i.WordGenerator = v), (i.GeneratedWords = w), (i.ClusterEngine = h), (i.Segment = l), (i.Place = o), (i.Manner = a), (i.__ArbSorter = e), i;
})();


function lexiferExample(example, option) {
    var choice = '';

    if (example == "basic") {
        choice = `with: std-ipa-features std-assimilations coronal-metathesis

letters: ʔ a á b ch d e g h i k l m n o p r s t u w y

C = t n k m ch l ʔ s r d h w b y p g
D = n l ʔ t k r p
V = a i e á u o

$S = CVD?

words: V?$S$S V?$S V?$S$S$S

# haplology
reject: (..+)\\1+

reject: wu yi w$ y$ h$ ʔʔ (p|t|k|ʔ)h
filter: nr > tr; mr > pr; ŋ > n`;
    } else if (example == "basic-ex") {
        choice = `# See the documentation linked above for full details.

# These set up assimilations ("np" will be changed to "mp") and a few other
# minor things.  It is possible for assimilations to produce phonemes you
# don't want, which is why one of the filters below is: ŋ > n.
with: std-ipa-features std-assimilations coronal-metathesis

# This determines the sort order of the output, and also helps
# the 'with:' line settings understand what is going on.
letters: ʔ a á b ch d e g h i k l m n o p r s t u w y

# THE ORDER OF PHONEME CLASSES MATTERS.  The very first phoneme
# will be picked much, much more often than the last.  The order
# here is approximately natural for a lot of languages.  You can
# change the character of a language a lot by shuffling which
# phonemes occur most often, which the least.
C = t n k m ch l ʔ s r d h w b y p g
D = n l ʔ t k r p
V = a i e á u o

# Macros are only a convenience to reduce typing, and do simple
# substitution only.  You can't use macros inside other macros.
$S = CVD?

# The first word shape will be picked most often, the last least
# often.
words: V?$S$S V?$S V?$S$S$S

# Rejections and filters use Javascript regular expressions.
# 'reject:' simply throws away a word.  Filter turns certain
# paterns into something else.
reject: wu yi w$ y$ h$ ʔʔ (p|t|k|ʔ)h
filter: nr > tr; mr > pr; ŋ > n

# Haplology - remove repeats.
reject: (..+)\\1+`;
    } else if (example == "tonal") {
        choice = `# A tonal language with a slightly odd phoneme inventory.
# Turn on "Display all generation steps" and select a number of words to
# see how this operates.

C = t n k l ch m kw v j tl y d tw s zh f g sh dw w t' z gh k' sw ng zw gw ch' nw kh tl' ngw ny kw' ɬ ghw khw b dl p
F = n m s ng ɬ t kh k khw p
U = a i u e ou ei o
V = a i e u ou ai oi au o ei eu 

# I fake tone with digits.  Because the tones are not in a power
# distribution, I give explicit weights, with the unmarked, middle tone
# occurring most often, and the contour tone the least often.  The
# digits are converted to something more familiar at the end of the
# definition.
T = 0:1.5 1:1 2:1 3:0.5

# Make optional elements - marked with '?' - occur 35% of the time.
random-rate: 35

words: CUTF? CVT UTF? VT

filter: yi > i
filter: wau > wai

# Simplify labiovelars.  Purely arbitrary substitution, but one that
# results in still legal diphthongs.
% o u
w wa we

reject: nyi nye o$ o1$ o2$ o3$ e$ e1$ e2$ e3$ 

# Turn tone numbers into diacritics.
% 0 1 2 3
a a á à ǎ
e e é è ě
i i í ì ǐ
o o ó ò ǒ
u u ú ù ǔ`;
    } else if (example == "japanese") {
        choice = `# Japanese-like based on interpreting wikipedia.org/wiki/Japanese_phonology 
# and link.springer.com/content/pdf/10.3758/BF03195600.pdf

# <x> gives me onsetless morae later on
C = k:45 t:39 s:33 r:25 n:20 x:15 h:10 m:10 d:8 g:8 z:4 b:4 w:3 p:2
I = k:45 x:40 t:39 s:33 r:20 n:20 m:10 h:8 d:6 g:6 z:2 b:2 w:2 p:2
V = a:233 i:226 u:215 o:204 e:190 ya:8 yu:8 yo:8 oo:2 ai:3 aa:2 ii:2 ee:2 uu:1
W = a:223 i:216 u:205 o:194 e:180 ya:5 yu:5 yo:5
X = oo:12 ai:10 aa:12 ii:12 ee:11 uu:1 yoo:2 yai:1 yaa:1 yuu:1
F = N Q

random-rate: 9

$S = CVF? # Gives type C(y/V)V(N/Q).
$A = IVF? # First syllable of slightly different consonant distribution.

$L = CW # C(y)V, light syllable type
$H = CX # C(y)VV, Heavy syllable of long vowel
$J = CVF # C(y)V[N/Q], heavy syllable with <N> or <Q>

# Where light syllable is of type (C)V, and heavy is (C)[VF/VV(F)].
# The final two syllables are least likely to be light followed by heavy.
# I will be sneaking in one-syllable word into the LH class as well.

#words: $A$S$S $A$S$L $A$S$S$S $A$S$S$L $A$S$S$S$L $A$S$S$L$L $A$L

categories: LL:60 LH-a:1 LH-b:2 HL-a:5 HL-b:20 HH-a:1 HH-b:1 HH-c:2 HH-d:2
LL = $A$L$L $A$S$L$L $A$S$S$L$L $A$L
LH-a = $S $A$L$H $A$S$L$H $A$S$S$L$H $A$H
LH-b = $S $A$L$J $A$S$L$J $A$S$S$L$J $A$J
HL-a = $A$H$L $A$S$H$L $A$S$S$H$L $A$L
HL-b = $A$J$L $A$S$J$L $A$S$S$J$L $A$L
HH-a = $A$H$H $A$S$H$H $A$S$S$H$H $A$H
HH-b = $A$H$J $A$S$H$J $A$S$S$H$J $A$J
HH-c = $A$J$J $A$S$J$J $A$S$S$J$J $A$J
HH-d = $A$J$H $A$S$J$H $A$S$S$J$H $A$J

filter: axa > a; ixi > i; uxu > u; oxo > o; uxu > u; exe > e
filter: x > !;

# These changes historically happened
%  u   
a  oo  
i  yuu 
u  +  
e  yoo 
o  oo

# Allowed C(y)V morae
# Yotsugana: <dz> and <dj> neutralise to <z> and <j>
%  a   i    u   e   o   ya   yu   yo
k  ka  ki   ku  ke  ko  kya  kyu  kyo
g  ga  gi   gu  ge  go  gya  gyu  gyo
s  sa  ši   su  se  so  ša   šu   šo
z  za  ji   zu  ze  zo  ja   ju   jo 
t  ta  či   cu  te  to  ča   ču   čo
d  da  ji   zu  de  do  ja   ju   jo
n  na  ni   nu  ne  no  nya  nyu  nyo
h  ha  hi   fu  he  ho  hya  hyu  hyo
b  ba  bi   bu  be  bo  bya  byu  byo
p  pa  pi   pu  pe  po  pya  pyu  pyo
m  ma  mi   mu  me  mo  mya  myu  myo
r  ra  ri   ru  re  ro  rya  ryu  ryo
w  wa  i    wa  e   o   ya   yu   yo

# Long-vowel + <Q> is ilegal.
filter: aaQ > aa; iiQ > ii; uuQ > uu; ooQ > oo; eeQ > ee;

# <N> assimilation and <Q> gemination.
# Only <k s (š) t (c) p h> can geminate. <hQ fQ wQ> is <pp>; historically.
% č  š  c   j  k  g  s  z  t  d  n  h  b  p  m  r  l  f   w   y
Q tč šš tc  j  kk g  ss z  tt d  n  pp b  pp m  r  l  pp  pp  y
N nč nš nc  nj nk ng ns nz nt nd nn nh mb mp mm nr nl nf  nw  ny

# Phonetically, <N> word finally is [ɴ],
# except after /i/ or /e/ is [ŋ]. Between vowel or before
# /j, w, ɸ, s, ɕ, ç, h], is a nasalized vowel/semivowel. I'll use <'> here. 
% a    e    i    o    u    y
N n'a  n'e  n'i  n'o  n'u  n'y

filter: N > n; Q > !; niga$ > nega

filter: c> ts; č > ch; š > sh; # This was to stop <chu> becoming <cfu>.

# There some other phonetic stuff such as /r/ becoming lateral/retroflex after
# /i, e/ or at the bigginning of a word. /b/, /g/ becoming [β], [ɣ/ŋ]
# between vowels. And the pitch accent. But these are dependant on dialect,
# and are not shown in any writing system of Japanese.`;
    } else if (example == "hungarian") {
        choice = `# This isn't quite Hungarian, but approximates it for demonstration
# purposes.  The cluster restrictions, in particular, are based on
# Hungarian data:
#
#    http://real-d.mtak.hu/233/1/Torkenczy_Miklos.pdf
#
# But I have left out the front, rounded vowels and some of the
# palatalized consonants.

with: std-ipa-features std-assimilations coronal-metathesis

letters: a á b c d dz dʒ e é f g h i í j k kl kr l m n o ó p pr r s ʃ t tr ts tʃ u ú v z ʒ '

C = t n k tʃ s m r ʃ d h p ts v l d b ʒ dʒ f j z p g dz

# Some initial fricative + C clusters
D = s ʃ v ʒ f z
E = t n k tʃ m r p ts l v f p

# Cluster rules... notice the single quote mark, which I will use in
# the 'words:' section below, to mark of syllable boundaries.  This
# lets me more carefully craft where clusters are allowed and where
# they are forbidden.

%  p t k ts tʃ f v m n l r
'f - + - -  -  - - - - + +
'v - - - -  -  - - - - + -
's + + + +  -  + + + + + -
'ʃ + + - -  +  - + + + + +
'z - - - -  -  - - - - + +
'ʒ - - - -  -  - - - - - -

# For initial complex clusters.
W = s ʃ
X = tr kr kl pr

%  pr tr kr kl
's -  +  -  +
'ʃ +  +  +  -

V = a i e á u o é í ó ú
S = s z ʃ
R = n l r m

# Vowel clusters
% i e u o a í é ú ó á
i - + + + + - + + + +
e + - + + + - - - + +
u + + - + + + - - + +
o + + - - + - + - - +
a + + + + - + - - + -
í - - - - - - - - - -
é - - - - - - - - - -
ú - - - - - - - - - -
ó - - - - - - - - - -
á - - - - - - - - - -

# Coda clusters
T = t n k tʃ s m r ʃ d p ts v l d dʒ b ʒ f j z p g dz

# This rejects a mass of final clusters, and makes word generation
# a bit slow.
%  p' t' k' b' d' g' ts' tʃ' dʒ' f' s' ʃ' v' z' ʒ' m' n' l' r' j'
p  +  +  -  -  -  -  -   -   -   +  +  +  -  -  -  -  -  -  -  -
t  -  +  +  -  -  -  -   -   -   -  -  -  -  -  -  -  -  -  -  -
k  -  -  +  -  -  -  -   +   -   -  +  +  -  -  -  -  -  -  -  -
b  -  -  -  +  -  -  -   -   -   -  -  -  -  -  -  -  -  -  -  -
d  -  -  -  -  +  -  -   -   -   -  -  -  +  +  -  -  -  -  -  -
g  -  -  -  -  +  +  -   -   -   -  -  -  -  -  -  -  -  -  -  -
ts -  -  +  -  -  -  +   -   -   -  -  -  -  -  -  -  -  -  -  -
tʃ -  -  +  -  -  -  -   +   -   -  -  -  -  -  -  -  -  -  -  -
dʒ -  -  -  -  +  -  -   -   +   -  -  -  -  -  -  -  -  -  -  -
f  -  +  -  -  -  -  -   -   -   +  -  -  -  -  -  -  -  -  -  -
s  -  +  +  -  -  -  -   -   -   -  +  -  -  -  -  -  -  -  -  -
ʃ  -  +  -  -  -  -  -   -   -   -  -  +  -  -  -  -  -  -  -  -
v  -  -  -  -  +  -  -   -   -   -  -  -  -  -  -  -  -  -  -  -
z  -  -  -  -  +  +  -   -   -   -  -  -  -  +  -  -  -  -  -  -
ʒ  -  -  -  -  +  -  -   -   -   -  -  -  -  -  -  -  -  -  -  -
m  +  +  -  -  +  -  -   -   -   +  -  -  +  +  +  +  -  -  -  -
n  -  +  +  -  +  -  +   +   +   -  +  +  +  -  -  -  +  +  -  -
l  +  +  +  +  +  +  +   +   -   +  -  +  +  -  -  +  -  +  -  -
r  +  +  +  +  +  +  +   +   -   +  +  +  +  +  +  +  +  +  +  +
j  +  +  +  -  +  +  +   +   -   +  +  +  +  +  +  +  +  +  -  -

# Words

# First, some basic syllable types, with clustering rules as defined
# above. 
# Note that all syllables have a leading quote mark, which defines
# syllable boundary, to make the cluster rules given above apply more
# precisely.

$A = 'CVV?C?
$B = 'VV?C?
$C = 'WXVV?C?

$D = 'DEVC?

$P = 'CVV?TT?
$Q = 'VV?TT?

# The actual words.
words: $P' $Q' $D $Q$P' $P$P' $A$A $C$A $C$P' $Q$D$P' $Q$A $Q$A$P' V?$A $B$A

# Reject a few vexations.
reject: j(i|í) j' h' h$ ʃs sʃ zʒ ʒz sz

# Hungarian-esque spelling
filter: ts > c; s > sz; tʃ > cs; ʒ > zs; ʃ > s; ss > s; ŋ > n

# Remove syllable boundaries.
filter: ' > !`;
    }
    confirm = true;
    if (option === true) {
        var confirm = window.confirm("Clear input with example?");
    }
    if (confirm) {
        return choice;
    } else {
        return false;
    }
}
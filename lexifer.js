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


// Check for markup submit button and colour it blue
$(window).load(function () {
    $("[name='lexiferButton']").click(function () {
        genWords();
    });
    $("[name='fakeLoadButton']").click(function () {
        importFile();
    });
    $("[name='saveButton']").click(function () {
        downloadFile($("#editing").text());
    });
});
window.addEventListener("load", function () {
    lexiferExample('basic');
});

function importFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _this => {
        let file = Array.from(input.files)[0], read = new FileReader();
        read.readAsText(file);

        read.onloadend = function () {
            $("#editing").html(read.result);
            update(read.result);
        }
    };
    input.click();
}

const downloadFile = (content) => {
    const link = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "sample.def";
    link.click();
    URL.revokeObjectURL(link.href);
};

const genWords = () => {
    let f = "";
    let r = y(
        $("#editing").val(),
        parseInt($("#number").val()),
        $("#verbose").is(":checked"),
        $("#unsorted").is(":checked"),
        $("#one-per-line").is(":checked"),
        (e) => {
            f += e + "<br>";
        }
    );

    ($("#result").html(
        "<p class='error-message'>" + f + "</p>" +
        "<textarea id='output' spellcheck='false'>" + r + "</textarea>"
    ));
    $('#output').focus();
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


function lexiferExample(example) {
    var def = document.getElementById("editing");

    if (example == "basic") {
        def.innerHTML = `with: std-ipa-features std-assimilations coronal-metathesis

letters: ʔ a á b ch d e g h i k l m n o p r s t u w y

C = t n k m ch l ʔ s r d h w b y p g
D = n l ʔ t k r p
V = a i e á u o

$S = CVD?

words: V?$S$S V?$S V?$S$S$S

# haplology
reject: (..+)\\1+

reject: wu yi w$ y$ h$ ʔʔ (p|t|k|ʔ)h
filter: nr > tr; mr > pr; ŋ > n
`;
    } else if (example == "basic-ex") {
        def.innerHTML = `# See the documentation linked above for full details.

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
reject: (..+)\\1+

`;
    } else if (example == "tonal") {
        def.innerHTML = `# A tonal language with a slightly odd phoneme inventory.
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
u u ú ù ǔ
`;
    } else if (example == "hungarian") {
        def.innerHTML = `# This isn't quite Hungarian, but approximates it for demonstration
# purposes.  The cluster restrictions, in particular, are based on
# Hungarian data:
#
#    http://real-d.mtak.hu/233/1/Torkenczy_Miklos.pdf
#
# But I have left out the front, rounded vowels and some of the
# palatalized consonants.

with: std-ipa-features std-assimilations coronal-metathesis

letters: a á b c d dz dʒ e é f g h i í j k l m n o ó p r s ʃ t ts tʃ u ú v z ʒ '

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
filter: ' > !
`;
    }
    // Move back to the top.
    update($("#editing").val());
    $("#editing").focus().select();
}



function update(text) {
    let result_element = document.querySelector("#highlighting-content");
    // Handle final newlines (see article)
    if (text[text.length - 1] == "\n") {
        text += " ";
    }
    // Update code
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
    // Syntax Highlight
    Prism.highlightElement(result_element);
}

function sync_scroll(element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector("#highlighting");
    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
    let code = element.value;
    if (event.key == "Tab") {
        /* Tab key pressed */
        event.preventDefault(); // stop normal
        let before_tab = code.slice(0, element.selectionStart); // text before tab
        let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
        let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_tab + "\t" + after_tab; // add tab char
        // move cursor
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        update(element.value); // Update text to include indent
    }
}


/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism&languages=python */
/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
    ? window   // if in browser
    : (
        (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
            ? self // if in worker
            : {}   // if in node js
    );

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self) {

    // Private helper vars
    var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
    var uniqueId = 0;

    // The grammar object for plaintext
    var plainTextGrammar = {};


    var _ = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: _self.Prism && _self.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
            encode: function encode(tokens) {
                if (tokens instanceof Token) {
                    return new Token(tokens.type, encode(tokens.content), tokens.alias);
                } else if (Array.isArray(tokens)) {
                    return tokens.map(encode);
                } else {
                    return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                }
            },

            /**
             * Returns the name of the type of the given value.
             *
             * @param {any} o
             * @returns {string}
             * @example
             * type(null)      === 'Null'
             * type(undefined) === 'Undefined'
             * type(123)       === 'Number'
             * type('foo')     === 'String'
             * type(true)      === 'Boolean'
             * type([1, 2])    === 'Array'
             * type({})        === 'Object'
             * type(String)    === 'Function'
             * type(/abc+/)    === 'RegExp'
             */
            type: function (o) {
                return Object.prototype.toString.call(o).slice(8, -1);
            },

            /**
             * Returns a unique number for the given object. Later calls will still return the same number.
             *
             * @param {Object} obj
             * @returns {number}
             */
            objId: function (obj) {
                if (!obj['__id']) {
                    Object.defineProperty(obj, '__id', { value: ++uniqueId });
                }
                return obj['__id'];
            },

            /**
             * Creates a deep clone of the given object.
             *
             * The main intended use of this function is to clone language definitions.
             *
             * @param {T} o
             * @param {Record<number, any>} [visited]
             * @returns {T}
             * @template T
             */
            clone: function deepClone(o, visited) {
                visited = visited || {};

                var clone; var id;
                switch (_.util.type(o)) {
                    case 'Object':
                        id = _.util.objId(o);
                        if (visited[id]) {
                            return visited[id];
                        }
                        clone = /** @type {Record<string, any>} */ ({});
                        visited[id] = clone;

                        for (var key in o) {
                            if (o.hasOwnProperty(key)) {
                                clone[key] = deepClone(o[key], visited);
                            }
                        }

                        return /** @type {any} */ (clone);

                    case 'Array':
                        id = _.util.objId(o);
                        if (visited[id]) {
                            return visited[id];
                        }
                        clone = [];
                        visited[id] = clone;

                        (/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
                            clone[i] = deepClone(v, visited);
                        });

                        return /** @type {any} */ (clone);

                    default:
                        return o;
                }
            },

            /**
             * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
             *
             * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
             *
             * @param {Element} element
             * @returns {string}
             */
            getLanguage: function (element) {
                while (element) {
                    var m = lang.exec(element.className);
                    if (m) {
                        return m[1].toLowerCase();
                    }
                    element = element.parentElement;
                }
                return 'none';
            },

            /**
             * Sets the Prism `language-xxxx` class of the given element.
             *
             * @param {Element} element
             * @param {string} language
             * @returns {void}
             */
            setLanguage: function (element, language) {
                // remove all `language-xxxx` classes
                // (this might leave behind a leading space)
                element.className = element.className.replace(RegExp(lang, 'gi'), '');

                // add the new `language-xxxx` class
                // (using `classList` will automatically clean up spaces for us)
                element.classList.add('language-' + language);
            },

            /**
             * Returns the script element that is currently executing.
             *
             * This does __not__ work for line script element.
             *
             * @returns {HTMLScriptElement | null}
             */
            currentScript: function () {
                if (typeof document === 'undefined') {
                    return null;
                }
                if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
                    return /** @type {any} */ (document.currentScript);
                }

                // IE11 workaround
                // we'll get the src of the current script by parsing IE11's error stack trace
                // this will not work for inline scripts

                try {
                    throw new Error();
                } catch (err) {
                    // Get file src url from stack. Specifically works with the format of stack traces in IE.
                    // A stack will look like this:
                    //
                    // Error
                    //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
                    //    at Global code (http://localhost/components/prism-core.js:606:1)

                    var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                    if (src) {
                        var scripts = document.getElementsByTagName('script');
                        for (var i in scripts) {
                            if (scripts[i].src == src) {
                                return scripts[i];
                            }
                        }
                    }
                    return null;
                }
            },

            /**
             * Returns whether a given class is active for `element`.
             *
             * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
             * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
             * given class is just the given class with a `no-` prefix.
             *
             * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
             * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
             * ancestors have the given class or the negated version of it, then the default activation will be returned.
             *
             * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
             * version of it, the class is considered active.
             *
             * @param {Element} element
             * @param {string} className
             * @param {boolean} [defaultActivation=false]
             * @returns {boolean}
             */
            isActive: function (element, className, defaultActivation) {
                var no = 'no-' + className;

                while (element) {
                    var classList = element.classList;
                    if (classList.contains(className)) {
                        return true;
                    }
                    if (classList.contains(no)) {
                        return false;
                    }
                    element = element.parentElement;
                }
                return !!defaultActivation;
            }
        },

        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
            /**
             * The grammar for plain, unformatted text.
             */
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,

            /**
             * Creates a deep copy of the language with the given id and appends the given tokens.
             *
             * If a token in `redef` also appears in the copied language, then the existing token in the copied language
             * will be overwritten at its original position.
             *
             * ## Best practices
             *
             * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
             * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
             * understand the language definition because, normally, the order of tokens matters in Prism grammars.
             *
             * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
             * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
             *
             * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
             * @param {Grammar} redef The new tokens to append.
             * @returns {Grammar} The new language created.
             * @public
             * @example
             * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
             *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
             *     // at its original position
             *     'comment': { ... },
             *     // CSS doesn't have a 'color' token, so this token will be appended
             *     'color': /\b(?:red|green|blue)\b/
             * });
             */
            extend: function (id, redef) {
                var lang = _.util.clone(_.languages[id]);

                for (var key in redef) {
                    lang[key] = redef[key];
                }

                return lang;
            },

            /**
             * Inserts tokens _before_ another token in a language definition or any other grammar.
             *
             * ## Usage
             *
             * This helper method makes it easy to modify existing languages. For example, the CSS language definition
             * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
             * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
             * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
             * this:
             *
             * ```js
             * Prism.languages.markup.style = {
             *     // token
             * };
             * ```
             *
             * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
             * before existing tokens. For the CSS example above, you would use it like this:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'cdata', {
             *     'style': {
             *         // token
             *     }
             * });
             * ```
             *
             * ## Special cases
             *
             * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
             * will be ignored.
             *
             * This behavior can be used to insert tokens after `before`:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'comment', {
             *     'comment': Prism.languages.markup.comment,
             *     // tokens after 'comment'
             * });
             * ```
             *
             * ## Limitations
             *
             * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
             * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
             * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
             * deleting properties which is necessary to insert at arbitrary positions.
             *
             * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
             * Instead, it will create a new object and replace all references to the target object with the new one. This
             * can be done without temporarily deleting properties, so the iteration order is well-defined.
             *
             * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
             * you hold the target object in a variable, then the value of the variable will not change.
             *
             * ```js
             * var oldMarkup = Prism.languages.markup;
             * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
             *
             * assert(oldMarkup !== Prism.languages.markup);
             * assert(newMarkup === Prism.languages.markup);
             * ```
             *
             * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
             * object to be modified.
             * @param {string} before The key to insert before.
             * @param {Grammar} insert An object containing the key-value pairs to be inserted.
             * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
             * object to be modified.
             *
             * Defaults to `Prism.languages`.
             * @returns {Grammar} The new grammar object.
             * @public
             */
            insertBefore: function (inside, before, insert, root) {
                root = root || /** @type {any} */ (_.languages);
                var grammar = root[inside];
                /** @type {Grammar} */
                var ret = {};

                for (var token in grammar) {
                    if (grammar.hasOwnProperty(token)) {

                        if (token == before) {
                            for (var newToken in insert) {
                                if (insert.hasOwnProperty(newToken)) {
                                    ret[newToken] = insert[newToken];
                                }
                            }
                        }

                        // Do not insert token which also occur in insert. See #1525
                        if (!insert.hasOwnProperty(token)) {
                            ret[token] = grammar[token];
                        }
                    }
                }

                var old = root[inside];
                root[inside] = ret;

                // Update references in other language definitions
                _.languages.DFS(_.languages, function (key, value) {
                    if (value === old && key != inside) {
                        this[key] = ret;
                    }
                });

                return ret;
            },

            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
                visited = visited || {};

                var objId = _.util.objId;

                for (var i in o) {
                    if (o.hasOwnProperty(i)) {
                        callback.call(o, i, o[i], type || i);

                        var property = o[i];
                        var propertyType = _.util.type(property);

                        if (propertyType === 'Object' && !visited[objId(property)]) {
                            visited[objId(property)] = true;
                            DFS(property, callback, null, visited);
                        } else if (propertyType === 'Array' && !visited[objId(property)]) {
                            visited[objId(property)] = true;
                            DFS(property, callback, i, visited);
                        }
                    }
                }
            }
        },

        plugins: {},

        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function (async, callback) {
            _.highlightAllUnder(document, async, callback);
        },

        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function (container, async, callback) {
            var env = {
                callback: callback,
                container: container,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };

            _.hooks.run('before-highlightall', env);

            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

            _.hooks.run('before-all-elements-highlight', env);

            for (var i = 0, element; (element = env.elements[i++]);) {
                _.highlightElement(element, async === true, env.callback);
            }
        },

        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function (element, async, callback) {
            // Find language
            var language = _.util.getLanguage(element);
            var grammar = _.languages[language];

            // Set language on the element, if not present
            _.util.setLanguage(element, language);

            // Set language on the parent, for styling
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === 'pre') {
                _.util.setLanguage(parent, language);
            }

            var code = element.textContent;

            var env = {
                element: element,
                language: language,
                grammar: grammar,
                code: code
            };

            function insertHighlightedCode(highlightedCode) {
                env.highlightedCode = highlightedCode;

                _.hooks.run('before-insert', env);

                env.element.innerHTML = env.highlightedCode;

                _.hooks.run('after-highlight', env);
                _.hooks.run('complete', env);
                callback && callback.call(env.element);
            }

            _.hooks.run('before-sanity-check', env);

            // plugins may change/add the parent/element
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
                parent.setAttribute('tabindex', '0');
            }

            if (!env.code) {
                _.hooks.run('complete', env);
                callback && callback.call(env.element);
                return;
            }

            _.hooks.run('before-highlight', env);

            if (!env.grammar) {
                insertHighlightedCode(_.util.encode(env.code));
                return;
            }

            if (async && _self.Worker) {
                var worker = new Worker(_.filename);

                worker.onmessage = function (evt) {
                    insertHighlightedCode(evt.data);
                };

                worker.postMessage(JSON.stringify({
                    language: env.language,
                    code: env.code,
                    immediateClose: true
                }));
            } else {
                insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
            }
        },

        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function (text, grammar, language) {
            var env = {
                code: text,
                grammar: grammar,
                language: language
            };
            _.hooks.run('before-tokenize', env);
            if (!env.grammar) {
                throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run('after-tokenize', env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
        },

        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function (text, grammar) {
            var rest = grammar.rest;
            if (rest) {
                for (var token in rest) {
                    grammar[token] = rest[token];
                }

                delete grammar.rest;
            }

            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);

            matchGrammar(text, tokenList, grammar, tokenList.head, 0);

            return toArray(tokenList);
        },

        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
            all: {},

            /**
             * Adds the given callback to the list of callbacks for the given hook.
             *
             * The callback will be invoked when the hook it is registered for is run.
             * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
             *
             * One callback function can be registered to multiple hooks and the same hook multiple times.
             *
             * @param {string} name The name of the hook.
             * @param {HookCallback} callback The callback function which is given environment variables.
             * @public
             */
            add: function (name, callback) {
                var hooks = _.hooks.all;

                hooks[name] = hooks[name] || [];

                hooks[name].push(callback);
            },

            /**
             * Runs a hook invoking all registered callbacks with the given environment variables.
             *
             * Callbacks will be invoked synchronously and in the order in which they were registered.
             *
             * @param {string} name The name of the hook.
             * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
             * @public
             */
            run: function (name, env) {
                var callbacks = _.hooks.all[name];

                if (!callbacks || !callbacks.length) {
                    return;
                }

                for (var i = 0, callback; (callback = callbacks[i++]);) {
                    callback(env);
                }
            }
        },

        Token: Token
    };
    _self.Prism = _;


    // Typescript note:
    // The following can be used to import the Token type in JSDoc:
    //
    //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

    /**
     * Creates a new token.
     *
     * @param {string} type See {@link Token#type type}
     * @param {string | TokenStream} content See {@link Token#content content}
     * @param {string|string[]} [alias] The alias(es) of the token.
     * @param {string} [matchedStr=""] A copy of the full string this token was created from.
     * @class
     * @global
     * @public
     */
    function Token(type, content, alias, matchedStr) {
        /**
         * The type of the token.
         *
         * This is usually the key of a pattern in a {@link Grammar}.
         *
         * @type {string}
         * @see GrammarToken
         * @public
         */
        this.type = type;
        /**
         * The strings or tokens contained by this token.
         *
         * This will be a token stream if the pattern matched also defined an `inside` grammar.
         *
         * @type {string | TokenStream}
         * @public
         */
        this.content = content;
        /**
         * The alias(es) of the token.
         *
         * @type {string|string[]}
         * @see GrammarToken
         * @public
         */
        this.alias = alias;
        // Copy of the full string this token was created from
        this.length = (matchedStr || '').length | 0;
    }

    /**
     * A token stream is an array of strings and {@link Token Token} objects.
     *
     * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
     * them.
     *
     * 1. No adjacent strings.
     * 2. No empty strings.
     *
     *    The only exception here is the token stream that only contains the empty string and nothing else.
     *
     * @typedef {Array<string | Token>} TokenStream
     * @global
     * @public
     */

    /**
     * Converts the given token or token stream to an HTML representation.
     *
     * The following hooks will be run:
     * 1. `wrap`: On each {@link Token}.
     *
     * @param {string | Token | TokenStream} o The token or token stream to be converted.
     * @param {string} language The name of current language.
     * @returns {string} The HTML representation of the token or token stream.
     * @memberof Token
     * @static
     */
    Token.stringify = function stringify(o, language) {
        if (typeof o == 'string') {
            return o;
        }
        if (Array.isArray(o)) {
            var s = '';
            o.forEach(function (e) {
                s += stringify(e, language);
            });
            return s;
        }

        var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: 'span',
            classes: ['token', o.type],
            attributes: {},
            language: language
        };

        var aliases = o.alias;
        if (aliases) {
            if (Array.isArray(aliases)) {
                Array.prototype.push.apply(env.classes, aliases);
            } else {
                env.classes.push(aliases);
            }
        }

        _.hooks.run('wrap', env);

        var attributes = '';
        for (var name in env.attributes) {
            attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
        }

        return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
    };

    /**
     * @param {RegExp} pattern
     * @param {number} pos
     * @param {string} text
     * @param {boolean} lookbehind
     * @returns {RegExpExecArray | null}
     */
    function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
            // change the match to remove the text matched by the Prism lookbehind group
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
        }
        return match;
    }

    /**
     * @param {string} text
     * @param {LinkedList<string | Token>} tokenList
     * @param {any} grammar
     * @param {LinkedListNode<string | Token>} startNode
     * @param {number} startPos
     * @param {RematchOptions} [rematch]
     * @returns {void}
     * @private
     *
     * @typedef RematchOptions
     * @property {string} cause
     * @property {number} reach
     */
    function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                continue;
            }

            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];

            for (var j = 0; j < patterns.length; ++j) {
                if (rematch && rematch.cause == token + ',' + j) {
                    return;
                }

                var patternObj = patterns[j];
                var inside = patternObj.inside;
                var lookbehind = !!patternObj.lookbehind;
                var greedy = !!patternObj.greedy;
                var alias = patternObj.alias;

                if (greedy && !patternObj.pattern.global) {
                    // Without the global flag, lastIndex won't work
                    var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                    patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
                }

                /** @type {RegExp} */
                var pattern = patternObj.pattern || patternObj;

                for ( // iterate the token list and keep track of the current token/string position
                    var currentNode = startNode.next, pos = startPos;
                    currentNode !== tokenList.tail;
                    pos += currentNode.value.length, currentNode = currentNode.next
                ) {

                    if (rematch && pos >= rematch.reach) {
                        break;
                    }

                    var str = currentNode.value;

                    if (tokenList.length > text.length) {
                        // Something went terribly wrong, ABORT, ABORT!
                        return;
                    }

                    if (str instanceof Token) {
                        continue;
                    }

                    var removeCount = 1; // this is the to parameter of removeBetween
                    var match;

                    if (greedy) {
                        match = matchPattern(pattern, pos, text, lookbehind);
                        if (!match || match.index >= text.length) {
                            break;
                        }

                        var from = match.index;
                        var to = match.index + match[0].length;
                        var p = pos;

                        // find the node that contains the match
                        p += currentNode.value.length;
                        while (from >= p) {
                            currentNode = currentNode.next;
                            p += currentNode.value.length;
                        }
                        // adjust pos (and p)
                        p -= currentNode.value.length;
                        pos = p;

                        // the current node is a Token, then the match starts inside another Token, which is invalid
                        if (currentNode.value instanceof Token) {
                            continue;
                        }

                        // find the last node which is affected by this match
                        for (
                            var k = currentNode;
                            k !== tokenList.tail && (p < to || typeof k.value === 'string');
                            k = k.next
                        ) {
                            removeCount++;
                            p += k.value.length;
                        }
                        removeCount--;

                        // replace with the new match
                        str = text.slice(pos, p);
                        match.index -= pos;
                    } else {
                        match = matchPattern(pattern, 0, str, lookbehind);
                        if (!match) {
                            continue;
                        }
                    }

                    // eslint-disable-next-line no-redeclare
                    var from = match.index;
                    var matchStr = match[0];
                    var before = str.slice(0, from);
                    var after = str.slice(from + matchStr.length);

                    var reach = pos + str.length;
                    if (rematch && reach > rematch.reach) {
                        rematch.reach = reach;
                    }

                    var removeFrom = currentNode.prev;

                    if (before) {
                        removeFrom = addAfter(tokenList, removeFrom, before);
                        pos += before.length;
                    }

                    removeRange(tokenList, removeFrom, removeCount);

                    var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                    currentNode = addAfter(tokenList, removeFrom, wrapped);

                    if (after) {
                        addAfter(tokenList, currentNode, after);
                    }

                    if (removeCount > 1) {
                        // at least one Token object was removed, so we have to do some rematching
                        // this can only happen if the current pattern is greedy

                        /** @type {RematchOptions} */
                        var nestedRematch = {
                            cause: token + ',' + j,
                            reach: reach
                        };
                        matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

                        // the reach might have been extended because of the rematching
                        if (rematch && nestedRematch.reach > rematch.reach) {
                            rematch.reach = nestedRematch.reach;
                        }
                    }
                }
            }
        }
    }

    /**
     * @typedef LinkedListNode
     * @property {T} value
     * @property {LinkedListNode<T> | null} prev The previous node.
     * @property {LinkedListNode<T> | null} next The next node.
     * @template T
     * @private
     */

    /**
     * @template T
     * @private
     */
    function LinkedList() {
        /** @type {LinkedListNode<T>} */
        var head = { value: null, prev: null, next: null };
        /** @type {LinkedListNode<T>} */
        var tail = { value: null, prev: head, next: null };
        head.next = tail;

        /** @type {LinkedListNode<T>} */
        this.head = head;
        /** @type {LinkedListNode<T>} */
        this.tail = tail;
        this.length = 0;
    }

    /**
     * Adds a new node with the given value to the list.
     *
     * @param {LinkedList<T>} list
     * @param {LinkedListNode<T>} node
     * @param {T} value
     * @returns {LinkedListNode<T>} The added node.
     * @template T
     */
    function addAfter(list, node, value) {
        // assumes that node != list.tail && values.length >= 0
        var next = node.next;

        var newNode = { value: value, prev: node, next: next };
        node.next = newNode;
        next.prev = newNode;
        list.length++;

        return newNode;
    }
    /**
     * Removes `count` nodes after the given node. The given node will not be removed.
     *
     * @param {LinkedList<T>} list
     * @param {LinkedListNode<T>} node
     * @param {number} count
     * @template T
     */
    function removeRange(list, node, count) {
        var next = node.next;
        for (var i = 0; i < count && next !== list.tail; i++) {
            next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i;
    }
    /**
     * @param {LinkedList<T>} list
     * @returns {T[]}
     * @template T
     */
    function toArray(list) {
        var array = [];
        var node = list.head.next;
        while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
        }
        return array;
    }


    if (!_self.document) {
        if (!_self.addEventListener) {
            // in Node.js
            return _;
        }

        if (!_.disableWorkerMessageHandler) {
            // In worker
            _self.addEventListener('message', function (evt) {
                var message = JSON.parse(evt.data);
                var lang = message.language;
                var code = message.code;
                var immediateClose = message.immediateClose;

                _self.postMessage(_.highlight(code, _.languages[lang], lang));
                if (immediateClose) {
                    _self.close();
                }
            }, false);
        }

        return _;
    }

    // Get current script and highlight
    var script = _.util.currentScript();

    if (script) {
        _.filename = script.src;

        if (script.hasAttribute('data-manual')) {
            _.manual = true;
        }
    }

    function highlightAutomaticallyCallback() {
        if (!_.manual) {
            _.highlightAll();
        }
    }

    if (!_.manual) {
        // If the document state is "loading", then we'll use DOMContentLoaded.
        // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
        // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
        // might take longer one animation frame to execute which can create a race condition where only some plugins have
        // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
        // See https://github.com/PrismJS/prism/issues/2102
        var readyState = document.readyState;
        if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
            document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
        } else {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
                window.setTimeout(highlightAutomaticallyCallback, 16);
            }
        }
    }

    return _;

}(_self));

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
    global.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */
;
Prism.languages.lexifer = {
    'comment': {
        pattern: /(^|[^\\])#.*/,
        lookbehind: true,
        greedy: true
    },
    'keyword': {
        pattern: /(^[\t ]*)(with|letters|%|filter|reject|random-rate)+(?:\.\w+)*/m,
        lookbehind: true,
        inside: {
            'punctuation': /\./
        }
    },
    'builtin': {
        pattern: /(^[\t ]*)(categories|words)+(?:\.\w+)*/m,
        lookbehind: true,
        inside: {
            'punctuation': /\./
        }
    },
    'number': /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
    'operator': /[=]=?|!|:|\?|<[<=>]?|>[=>]?|[&|^~]|\(|\)|;|\+|\-|\\|\||\.|\$|\*|\[|\]|\{|\}/,
};


Prism.languages.py = Prism.languages.lexifer;


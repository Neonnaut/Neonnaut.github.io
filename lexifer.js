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
        downloadFile($("#def").text());
    });
});
window.addEventListener("load", function () {
    lexiferExample('basic');
    colourText();
});

// https://stackoverflow.com/a/61237402
document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak')
        event.preventDefault()
    }
});

function importFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _this => {
        let file = Array.from(input.files)[0], read = new FileReader();
        read.readAsText(file);

        read.onloadend = function () {
            $("#def").html(read.result);
            colourText();
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

var colourText = function () {
    var typedText = $("#def").text();
    var myLines = typedText.split('\n');
    let myString = ''
    var parsedLines = [];
    for (let i = 0; i < myLines.length; i++) {
        if (myLines[i].trim().startsWith("#")) {
            parsedLines.push("<span class='comment-line'>" + myLines[i] + "</span>");
        } else if (myLines[i].trim().startsWith("with:")) {
            myString = myLines[i].split(/:(.+)/);
            if (myString[1] == undefined) { myString[1] = " " } else { myString[1] = ":" + myString[1] }
            parsedLines.push("<span class='purple-line'>" + myString[0] + "</span>" + myString[1]);
        } else if (myLines[i].trim().startsWith("letters:")) {
            myString = myLines[i].split(/:(.+)/);
            if (myString[1] == undefined) { myString[1] = " " } else { myString[1] = ":" + myString[1] }
            parsedLines.push("<span class='purple-line'>" + myString[0] + "</span>" + myString[1]);
        } else if (myLines[i].trim().startsWith("% ")) {
            myString = myLines[i].split(/\s(.+)/);
            if (myString[1] == undefined) { myString[1] = " " } else { myString[1] = ":" + myString[1] }
            parsedLines.push("<span class='purple-line'>" + myString[0] + "</span> " + myString[1]);
        } else if (myLines[i].trim().startsWith("filter:")) {
            myString = myLines[i].split(/:(.+)/);
            if (myString[1] == undefined) { myString[1] = " " } else { myString[1] = ":" + myString[1] }
            parsedLines.push("<span class='purple-line'>" + myString[0] + "</span>" + myString[1]);
        } else if (myLines[i].trim().startsWith("reject:")) {
            myString = myLines[i].split(/:(.+)/);
            if (myString[1] == undefined) { myString[1] = " " } else { myString[1] = ":" + myString[1] }
            parsedLines.push("<span class='purple-line'>" + myString[0] + "</span>" + myString[1]);
        } else if (myLines[i].trim().startsWith("random-rate:")) {
            myString = myLines[i].split(/:(.+)/);
            if (myString[1] == undefined) { myString[1] = " " } else { myString[1] = ":" + myString[1] }
            parsedLines.push("<span class='purple-line'>" + myString[0] + "</span>" + myString[1]);
        } else if (myLines[i].trim().startsWith("words:")) {
            myString = myLines[i].split(/:(.+)/);
            if (myString[1] == undefined) { myString[1] = " " } else { myString[1] = ":" + myString[1] }
            parsedLines.push("<span class='yellow-line'>" + myString[0] + "</span>" + myString[1]);
        } else {
            parsedLines.push(myLines[i]);
        }
    };
    $("#def").html(parsedLines.join("\n"));
};

const genWords = () => {
    ($("#errors").html(""));
    ($("#result").html(
        "<textarea id='output' spellcheck='false'>" +
        y(
            $("#def").text(),
            parseInt($("#number").val()),
            $("#verbose").is(":checked"),
            $("#unsorted").is(":checked"),
            $("#one-per-line").is(":checked"),
            (e) => {
                $("#errors").append(e + "<br>");
            }
        ) + "</textarea>"
    ));
    $('#output').focus();
    colourText();
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
        const t = this.defFileArr[this.defFileLineNum].split(/\s+/gu);
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
                    h = m(h);
                }
            else n && l("** 'Verbose' option ignored in paragraph mode."), o && l("** 'Unsorted' option ignored in paragraph mode."), a && l("** 'One per line' option ignored in paragraph mode."), (h = r.paragraph());
        } catch (e) { l(e); }
        return h;
    };
    return (i.WordGenerator = v), (i.GeneratedWords = w), (i.ClusterEngine = h), (i.Segment = l), (i.Place = o), (i.Manner = a), (i.__ArbSorter = e), i;
})();


function lexiferExample(example) {
    var def = document.getElementById("def");

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

##################################################
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

##################################################
# For initial complex clusters.
W = s ʃ
X = tr kr kl pr

%  pr tr kr kl
's -  +  -  +
'ʃ +  +  +  -

V = a i e á u o é í ó ú
S = s z ʃ
R = n l r m

##################################################
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

##################################################
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

##################################################
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
    def.scrollTop = 0;
    def.scrollLeft = 0;

    colourText();
}

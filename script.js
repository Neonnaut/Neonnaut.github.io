function glossarize() {
	//Search radiobuttons for markup
	var markup = $("input[name=markupButton]").filter(":checked").val();

	//Get noninterlinear lines
	var notInterlinear = $("#notInterlinear").val().split(",");
	if (notInterlinear.some(isNaN) == true && notInterlinear.length != 0) {
		alert("Invalid interlinear line input!");
		notInterlinear = "";
	}

	//Get if use abbreviations
	var useAbbrv = $("#useAbbrv").is(":checked");

	//Get abbreviations and put them at the start of the arrays
	var origAbbreviations = ["1", "2", "3", "4", "12", "1E", "1S", "1DU", "1PAU", "1P", "1T", "12S", "12DU", "12PAU", "12P", "12T", "1GEN", "1ES", "1EDU", "1EPAU", "1EP", "2S", "2DU", "2PAU", "2P", "2T", "2GEN", "3S", "3DU", "3PAU", "3P", "3T", "3GEN", "3SF", "3SM",
		"A", "ABESS", "ABL", "ABS", "ABSL", "ACC", "ACCOM", "ACP", "ACR", "ADDR", "ADESS", "ADEL", "ADJ", "ADJZ", "ADM", "ADV", "ADVS", "ADVZ", "AF", "AFF", "AFFT", "AFW", "AGN", "AGR", "ALL", "ALLOC", "AN", "ANIM", "ANA", "ANAPH", "AND", "ANTE", "ANTESS", "ANTIC", "ANTIP", "AC", "AP", "AO", "AOR", "APPL", "APPR", "APRX", "APPR", "APUD", "ARG", "ART", "ASRT", "ASSUM", "AT", "ATTEN", "ATR", "AUD", "AUX", "AUG", "AVERT", "AVR", "ABL", "ABS", "ACC", "ADJ", "ADV", "AGR", "ALL", "ANTIP", "APPL", "ART", "AUX",
		"BEN", "CAUS", "CLF", "COM", "COMP", "COMPL", "COND", "COP", "CVB", "DAT", "DECL", "DEF", "DEM", "DET", "DIST", "DISTR", "DU", "DUR", "ERG", "EXCL", "F", "FOC", "FUT", "GEN", "IMP", "INCL", "IND", "INDF", "INF", "INS", "INTR", "IPFV", "IRR", "LOC", "M", "N", "NEG", "NMLZ", "NOM", "OBJ", "OBL", "P", "PASS", "PFV", "PL", "POSS", "PRED", "PRF", "PRS", "PROG", "PROH", "PROX", "PST", "PTCP", "PURP", "Q", "QUOT", "RECP", "REFL", "REL", "RES", "S", "SBJ", "SBJV", "SG", "TOP", "TR", "VOC", "∅"];
	var origExplanations = ["First Person (speaker)", "Second person (adrressee)", "Third person (referent)", "Fourth person (oviative or generic)", "First person inclusive", "First person exclusive", "First person singular", "First person dual", "First person paucal", "First person plural", "First person trial", "First person inclusive singular", "First person inclusive dual", "First person inclusive paucal", "First person inclusive plural", "First person inclusive trial", "First person genitive (my or our)", "First person inclusive singular", "First person exclusive dual", "First person exclusive paucal", "First person exclusive plural",
		"Second person singular", "Second person dual", "Second person paucal", "Second person plural", "Second person trial", "Second person genitive (your)", "Third person singular", "Third person dual", "Third person paucal", "Third person plural", "Third person trial", "Third person genitive (theirs)", "Third person singular feminine (she)", "Third person singular masculine (he)",
		"agent-like argument of canonical transitive verb", "abessive case", "ablative case (from)", "absolutive case", "absolute (free - non-incorporated form of noun)", "accusative case", "accompanier", "accomplishment", "actor role", "addressive", "adessive case (at)", "adelative", "adjective", "adjectivizer", "admonitive mood (warning)", "adverb(ial); adverbial case", "adversative", "adverbializer", "actor/agent focus - agent voice", "affirmative", "affective case", "away from water", "agent nominalization", "agreement affix", "allative case", "allocutive agreement", "animate gender", "animate gender", "anaphoric demonstrative", "anaphoric demonstrative", "andative (going towards)", "in front of", "antessive case (before)", "anticausative", "antipassive", "anticausative", "antipassive voice", "agent-orientated verb", "aorist (= PFV or PST.PFV )", "applicative", "apprehensive mood (lest)", "approximative", "approximative", "near - in the vicinity of", "argumentative", "article", "assertive mood", "assumptive mood - assumed", "agent trigger", "attenuative", "attributive", "auditory evidential", "auxiliary", "augmentative", "avertive", "aversative", "ablative", "absolutive", "accusative", "adjective", "adverb(ial)", "agreement", "allative", "antipassive", "applicative", "article", "auxiliary",
		"benefactive", "causative", "classifier", "comitative", "complementizer", "completive", "conditional", "copula", "converb", "dative", "declarative", "definite", "demonstrative", "determiner", "distal", "distributive", "dual", "durative", "ergative", "exclusive", "feminine", "focus", "future", "genitive", "imperative", "inclusive", "indicative", "indefinite", "infinitive", "instrumental", "intransitive", "imperfective", "irrealis", "locative", "masculine", "neuter", "negation - negative", "nominalizer/nominalization", "nominative", "object", "oblique", "patient-like argument of canonical transitive verb", "passive", "perfective", "plural", "possessive", "predicative", "perfect", "present", "progressive", "prohibitive", "proximal/proximate", "past", "participle", "purposive", "question particle/marker", "quotative", "reciprocal", "reflexive", "relative", "resultative", "single argument of canonical intransitive verb", "subject", "subjunctive", "singular", "topic", "transitive", "vocative", "zero (null) morpheme"];
	var abbreviations = [];
	var explanations = [];
	var abbrvInput = $("#abbrvInput").val().split("\n");
	for (var i = 0; i < abbrvInput.length; i++) {
		var temp = abbrvInput[i].split(",");
		if (temp[0] != "" && temp[1] != "") {
			abbreviations.push(temp[0]);
			explanations.push(temp[1]);
		}
	}
	abbreviations = abbreviations.concat(origAbbreviations);
	explanations = explanations.concat(origExplanations);

	//Get delimiters and concat to original
	var abbrvDelimiterInput = $("#abbrvDelimiterInput").val().split(",");

	//Get if use caps
	var useSmallCaps = $("#useSmallCaps").is(":checked");
	if (useSmallCaps == true) {
		useSmallCaps = "gloss-abbr-caps";
	} else {
		useSmallCaps = "gloss-abbr";
	}

	//CONVERT
	var conv = new Converter(
		markup,
		notInterlinear,
		useAbbrv,
		abbreviations,
		explanations,
		abbrvDelimiterInput,
		useSmallCaps
	);

	convert(conv);
	$("#out").html(conv.output);
}

function convert(conv) {
	var nonInterlinear = conv.nonInterlinear;
	var useAbbrv = conv.useAbbrv;
	var useSmallCaps = conv.useSmallCaps;
	var markup = conv.markup;

	var lines = $("#input").val().split("\n").map($.trim).filter(function (x) { return !(x === ""); });

	if (markup == "ZBBgloss") {
		zbbMarkup();
	} else if (markup == "HTMLTableOption") {
		htmlTableMarkup();
	}

	function zbbMarkup() {
		var gloss = "";
		let i = 0;
		while (i < lines.length) {
			//Third last line or if there are only two lines
			if ((i + 3 == lines.length) || (lines.length == 2)) {
				var normLine = lines[i].split(" ").map($.trim).filter(function (x) { return !(x === ""); });
				i++;
				var glossLine = lines[i].split(" ").map($.trim).filter(function (x) { return !(x === ""); });
				for (let j = 0; j < normLine.length; j++) {
					if ((typeof normLine !== "undefined") || (typeof glossLine !== "undefined")) {
						gloss += "[gloss=" + glossLine[j] + "]" + normLine[j] + "[/gloss]";
					} else {
						alert("Not matched");
					}
				}
				gloss += "\n"
			} else {
				gloss += lines[i] + "\n";
			}
			i++;
		}
		conv.finishZbb(gloss);
	}

	function htmlTableMarkup() {
		for (let i = 0; i < lines.length; i++) {
			var skipline = false;
			var a = 0;
			var parsedEntry = "";
			while (a < nonInterlinear[a]) {
				if (nonInterlinear[a] == i + 1) {
					skipline = true;
					a == nonInterlinear[a] - 5;
				}
				a++
			}
			var entries = lines[i].split(" ").map($.trim).filter(function (x) { return !(x === ""); });
			// Do something if is the second last iteration of the array
			if ((i + 2 == lines.length) && (useAbbrv || useSmallCaps)) {
				for (let b = 0; b < entries.length; b++) {
					parsedEntry += "<td>" + splitEntryGloss(entries[b], conv) + "</td>";
				}
				conv.addLine(parsedEntry);
				//Do something if skip line or last line
			} else if (skipline || i + 1 == lines.length) {
				var maxLines = 0;
				for (let m = 0; m < lines.length; m++) {
					var entriesZ = lines[m].split(" ").map($.trim).filter(function (x) { return !(x === ""); });
					for (let n = 0; n < entriesZ.length; n++) {
						if (maxLines <= entriesZ.length) {
							maxLines = entriesZ.length;
						}
					}
				}
				conv.addSingleLineEntry(lines[i], maxLines);
				//Else do normal line
			} else {
				for (let c = 0; c < entries.length; c++) {
					parsedEntry += "<td>" + entries[c] + "</td>";
				}
				conv.addLine(parsedEntry);
			}
			parsedEntry = "";
		}
		conv.finish();
	}
}


function splitEntryGloss(entry, conv) {
	var result = "";
	var word = "";
	abbrvDelimiterInput = conv.abbrvDelimiterInput;
	useSmallCaps = conv.useSmallCaps;
	useAbbrv = conv.useAbbrv;
	abbreviations = conv.abbreviations;
	explanations = conv.explanations;
	for (var i = 0; i < entry.length; i++) {
		if (abbrvDelimiterInput.indexOf(entry[i]) != -1) {
			if (!(word === "")) {
				setEntryGloss();
			}
			word = "";
			result = result.concat(entry[i]);
		} else {
			word += entry[i];
		}
	}
	if (!(word === "")) {
		setEntryGloss();
	}
	function setEntryGloss() {
		var glossexpl = "";
		let j = 0;
		while (j < abbreviations.length) {
			if (word == abbreviations[j]) {
				glossexpl = explanations[j];
				break;
			}
			j++
		}
		if (glossexpl == "") {
			if (word == word.toUpperCase()) {
				result = result.concat("<a class='small-caps'>", word, "</a>");
			} else {
				result = result.concat(word);
			}
		} else if (useAbbrv) {
			if (word == word.toUpperCase() && useSmallCaps) {
				result = result.concat("<abbr class='", useSmallCaps, "' title='", glossexpl, "'>", word, "</abbr>");
			} else {
				result = result.concat("<abbr class='gloss-abbr' title='", glossexpl, "'>", word, "</abbr>");
			}
		} else {
			result = result.concat("<a class='small-caps'>", word, "</a>");
		}
	}
	return result;
}
var Converter = function (markup, nonInterlinear, useAbbrv, abbreviations, explanations, abbrvDelimiterInput, useSmallCaps) {
	this.orig = "";
	this.gloss = "";
	this.lines = "";
	this.output = "";

	this.markup = markup;

	this.nonInterlinear = nonInterlinear;

	this.useAbbrv = useAbbrv;

	this.abbreviations = abbreviations;

	this.explanations = explanations;

	this.abbrvDelimiterInput = abbrvDelimiterInput;

	this.useSmallCaps = useSmallCaps;
};

Converter.prototype.addLine = function (input) {
	this.orig += "<tr>" + input + "</tr>" + "\n";
};
Converter.prototype.addSingleLineEntry = function (input, maxLines) {
	this.orig += "<tr><td colspan=" + maxLines + ">" + input + "</td></tr>" + "\n";
};
Converter.prototype.finish = function () {
	this.output = "<table>" + "\n" + this.orig + "\n" + "</table><br>" + "<textarea id='output'>"
		+ "\n" + "<table>" + "\n" + this.orig + "</table>" + "</textarea>";
};
Converter.prototype.finishZbb = function (input) {
	this.output = "<textarea id='output'>" + input + "</textarea>";
}

// Set these inputs to disabled if user has selected not to use abbreviations.
function checkIfUseAbbrv() {
	if ($("#useAbbrv").is(':checked')) {
		$("#abbrvInput").prop('disabled', false);
		$("#abbrvDelimiterInput").prop('disabled', false);
	} else {
		$("#abbrvInput").prop('disabled', true);
		$("#abbrvDelimiterInput").prop('disabled', true);
	}
}
$(window).load(function () {
	$("#glossarize").click(glossarize);
});
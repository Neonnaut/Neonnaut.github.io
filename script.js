function glossarize(markup) {

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
	if ($("#useInputAbbrv").is(":checked")) {
		abbreviations = abbreviations.concat(origAbbreviations);
		explanations = explanations.concat(origExplanations);
	}

	//Get delimiters and concat to original
	var abbrvDelimiterInput = $("#abbrvDelimiterInput").val().split(",");

	//Get if use caps
	var useSmallCaps = $("#useSmallCaps").is(":checked");
	if (useSmallCaps == true) {
		useSmallCaps = "abbrv sc";
	} else {
		useSmallCaps = "abbrv";
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
	$("#output").select();
	setLocalStorage();
}

function convert(conv) {
	var nonInterlinear = conv.nonInterlinear;
	var useAbbrv = conv.useAbbrv;
	var useSmallCaps = conv.useSmallCaps;
	var markup = conv.markup;

	var lines = $("#input").val().split("\n").map($.trim).filter(function (x) { return !(x === ""); });

	if (markup == "zbbGloss") {
		zbbMarkup();
	} else if (markup == "htmlTable") {
		htmlTableMarkup();
	} else if (markup == "plainText") {
		plainTextMarkup();
	} else if (markup == "latexGloss") {
		latexMarkup();
	} else if (markup == "cwsGloss") {
		cwsMarkup();
	} else if (markup == "wikiTable") {
		wikiMarkup();
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
						if (useSmallCaps == "abbrv sc") {
							glossLine[j] = toSmallCaps(glossLine[j]);
						}
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
		conv.finish(gloss);
	}
	function latexMarkup() {
		gloss = "";
		for (let m = 0; m < lines.length; m++) {
			// Third last line
			if (m + 3 == lines.length) {
				gloss += "\\begin{exe}\n\\ex\n\\gll " + lines[m] + "\\\\\n";
			} else if (m + 2 == lines.length) {
				gloss += lines[m] + "\\\\\n";
			} else if (m + 1 == lines.length) {
				gloss += "\\trans " + lines[m] + "\n\\end{exe}";
			} else {
				gloss += lines[m] + "\n";
			}
		}
		conv.finish(gloss);
	}
	function cwsMarkup() {
		gloss = "";
		table = new Array();
		maxColumns = 0;

		noOfLines = lines.length - 1;
		for (let a = 0; a < lines.length; a++) {
			// If last line
			if (a + 1 == lines.length) {

			} else {
				var line = lines[a].split(" ").map($.trim).filter(function (x) { return !(x === ""); });
				if (maxColumns <= line.length) {
					maxColumns = line.length;
				}
				table[a] = new Array();
				for (let b = 0; b < line.length; b++) {
					table[a].push(line[b]);
				}
			}
		}
		for (let j = 0; j < maxColumns; j++) {
			for (let i = 0; i < noOfLines; i++) {
				if (table[i][j] != null) {
					gloss += table[i][j];
				} else {
					gloss += "?"
				}
				if (i != noOfLines - 1) {
					gloss += "//";
				}
			}
			if (j != maxColumns - 1) {
				gloss += "|";
			}
		}
		gloss = "<gbl=" + maxColumns + ">" + gloss + "</gbl>\n";
		var lastLine = lines[noOfLines].split(" ").map($.trim).filter(function (x) { return !(x === ""); });
		gloss += lastLine.join(" ");

		conv.finish(gloss);
	}
	function wikiMarkup() {
		/*
		{| class="wikitable"
		|mujhe
		|apne
		|sabhī
		|rishtedār
		|pasand
		|hɛ̄
		|-
		|I. {{abbr|{{sc|DAT}}|Mean Sea Level Pressure}}
		|{{sc|REFL}}.{{sc|MASC}}.{{sc|PL}}
		|all.{{sc|nom}}
		|relatives.{{sc|masc}}.{{sc|PL}}
		|like
		|be.{{sc|prs}}.{{sc|masc}}.{{sc|PL}}
		|-
		| colspan="6" |'I like all my relatives'
		|}
		*/
		gloss = "";
		conv.finish(gloss);
	}
	function plainTextMarkup() {
		var wordLength = [];
		var gloss = "";
		for (let m = 0; m < lines.length; m++) {
			// Find out if the line is non allignable
			var skipline = false;
			var a = 0;
			while (a < nonInterlinear[a]) {
				if (nonInterlinear[a] == m + 1) {
					skipline = true;
					a == nonInterlinear[a] - 5;
				}
				a++
			}
			var entriesZ = lines[m].split(" ").map($.trim).filter(function (x) { return !(x === ""); });
			for (let n = 0; n < entriesZ.length; n++) {
				if (!skipline && m + 1 != lines.length) {
					if (typeof wordLength[n] === "undefined") {
						wordLength.push(entriesZ[n].length);
					}
					if (wordLength[n] <= entriesZ[n].length) {
						wordLength[n] = entriesZ[n].length;
					}
				}
			}
		}
		for (let i = 0; i < lines.length; i++) {
			// Find out if the line is non allignable
			var skipline = false;
			var a = 0;
			while (a < nonInterlinear[a]) {
				if (nonInterlinear[a] == i + 1) {
					skipline = true;
					a == nonInterlinear[a] - 5;
				}
				a++
			}
			var line = lines[i].split(" ").map($.trim).filter(function (x) { return !(x === ""); });
			for (let j = 0; j < line.length; j++) {
				//alert(skipline);
				if (!skipline && i + 1 != lines.length) {
					while (line[j].length < wordLength[j] && j != line.length - 1) {
						line[j] += " ";
					}
				}
			}
			gloss += line.join(" ") + "\n";
		}
		conv.finish(gloss);
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
					if (m != i) {
						var entriesZ = lines[m].split(" ").map($.trim).filter(function (x) { return !(x === ""); });
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
		conv.finishTable();
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
				result = result.concat("<a class='sc'>", word, "</a>");
			} else {
				result = result.concat(word);
			}
		} else if (useAbbrv) {
			if (word == word.toUpperCase() && useSmallCaps) {
				result = result.concat("<abbr class='", useSmallCaps, "' title='", glossexpl, "'>", word, "</abbr>");
			} else {
				result = result.concat("<abbr class='abbrv' title='", glossexpl, "'>", word, "</abbr>");
			}
		} else {
			result = result.concat("<a class='sc'>", word, "</a>");
		}
	}
	return result;
}

function toSmallCaps(input) {
	var table = [];
	table["A"] = "ᴀ";
	table["B"] = "ʙ";
	table["C"] = "ᴄ";
	table["D"] = "ᴅ";
	table["E"] = "ᴇ";
	table["F"] = "ꜰ";
	table["G"] = "ɢ";
	table["H"] = "ʜ";
	table["I"] = "ɪ";
	table["J"] = "ᴊ";
	table["K"] = "ᴋ";
	table["L"] = "ʟ";
	table["M"] = "ᴍ";
	table["N"] = "ɴ";
	table["O"] = "ᴏ";
	table["P"] = "ᴘ";
	table["Q"] = "ǫ";
	table["R"] = "ʀ";
	table["S"] = "ꜱ";
	table["T"] = "ᴛ";
	table["U"] = "ᴜ";
	table["V"] = "ᴠ";
	table["W"] = "ᴡ";
	table["X"] = "x";
	table["Y"] = "ʏ";
	table["Z"] = "ᴢ";

	var result = "";

	for (var i = 0; i < input.length; i++) {
		var c = input[i];
		if (c in table) {
			result += table[c];
		} else {
			result += c;
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
Converter.prototype.finishTable = function () {
	if (this.orig == "") {
		this.output = "<textarea id='output' spellcheck='false' readonly>"
			+ "\n" + "</textarea>";
	} else {
		this.output = "<table>" + "\n" + this.orig + "\n" + "</table><br>" + "<textarea id='output' spellcheck='false' readonly>"
			+ "\n" + "<table>" + "\n" + this.orig + "</table>" + "</textarea>";
	}
};
Converter.prototype.finish = function (input) {
	this.output = "<textarea id='output' spellcheck='false' readonly>" + input + "</textarea>";
}

function setLocalStorage() {
	localStorage.setItem('notInterlinear', $('#notInterlinear').val());
	localStorage.setItem('abbrvInput', $('#abbrvInput').val());
	localStorage.setItem('abbrvDelimiterInput', $('#abbrvDelimiterInput').val());
}
window.onload = function () {
	if (localStorage.hasOwnProperty('notInterlinear')) {
		$('#notInterlinear').val(localStorage.getItem('notInterlinear'));
		$('#abbrvInput').val(localStorage.getItem('abbrvInput'));
		$('#abbrvDelimiterInput').val(localStorage.getItem('abbrvDelimiterInput'));
	}
};
$(window).load(function () {
	$("[name='markupButton']").click(function () {
		glossarize($(this).attr('id'));
		var selection = document.querySelectorAll("#switch-field input");
		for (i = 0; i < selection.length; i++) {
			selection[i].classList.remove('checked');
		}
		$(id = $(this)).addClass("checked");
	});
	$("#useAbbrv").click(function () {
		if ($("#useAbbrv").is(':checked')) {
			$("#abbrvInput").prop('disabled', false);
			$("#abbrvDelimiterInput").prop('disabled', false);
			$("#useInputAbbrv").prop('disabled', false);
		} else {
			$("#abbrvInput").prop('disabled', true);
			$("#abbrvDelimiterInput").prop('disabled', true);
			$("#useInputAbbrv").prop('disabled', true);
		}
	});
});
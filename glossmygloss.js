// Populate input fields with data in local storage on window load if it exists
$(window).on('load', function () {
	if (localStorage.hasOwnProperty('notInterlinear')) {
		$('#input').val(localStorage.getItem('input'));
		$('#notInterlinear').val(localStorage.getItem('notInterlinear'));
		$('#abbrvInput').val(localStorage.getItem('abbrvInput'));
		$('#abbrvDelimiterInput').val(localStorage.getItem('abbrvDelimiterInput'));

		// Select all text in the input
		$('#input').focus().select();
	}
});
// Check for markup submit button and colour it
$(window).on('load', function () {
	$("[name='markupButton']").click(function () {

		glossarize($(this).attr('id'));

		colourButtons(this)

	});
	// Check if use abbreviations has been unchecked and disable abbreviation input
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

function colourButtons(click) {
	let selection = document.querySelectorAll("#GMGSwitch-field input");

	for (i = 0; i < selection.length; i++) {
		selection[i].classList.remove('checked');
	}

	$(id = $(click)).addClass("checked");
}

function glossarize(markup) {

	//Get noninterlinear lines
	var notInterlinear = $("#notInterlinear").val().split(",");
	if (notInterlinear.some(isNaN) == true && notInterlinear.length != 0) {
		alert("Invalid interlinear line input!");
		notInterlinear = [];
	}

	//Get if use abbreviations
	var useAbbrv = $("#useAbbrv").is(":checked");

	//Get abbreviations and put them at the start of the arrays
	var origAbbreviations = ["1", "2", "3", "4", "12", "ACC", "AN", "ANIM", "C", "CLF", "DAT", "ERG", "F", "FUT", "GEN", "HUM", "INAN", "INST", "INSTR", "LOC", "M", "N", "NEG", "NEUT", "NOM", "OBL", "PAST", "PL", "POSS", "PRS", "Q", "R", "SG", "?", "12DU", "12P", "12PAU", "12S", "12T", "1DU", "1E", "1EDU", "1EP", "1EPAU", "1ES", "1GEN", "1P", "1PAU", "1S", "1T", "2DU", "2GEN", "2P", "2PAU", "2S", "2T", "3DU", "3GEN", "3P", "3PAU", "3S", "3SF", "3SM", "3SN", "3T", "1p", "1pl", "1s", "1sg", "2p", "2pl", "2s", "2sg", "3p", "3pl", "3s", "3sg", "A", "ABESS", "ABL", "ABS", "ABSL", "AC", "ACCOM", "ACP", "ACR", "ADDR", "ADEL", "ADESS", "ADJ", "ADJZ", "ADM", "ADV", "ADVS", "ADVZ", "AF", "AFF", "AFFT", "AFW", "AGN", "AGR", "ALL", "ALLOC", "AND", "ANTE", "ANTESS", "ANTIC", "ANTIP", "AO", "AOR", "AP", "APPL", "APRX", "APUD", "ARG", "ART", "ASRT", "ASSUM", "AT", "ATR", "ATTEN", "AUD", "AUG", "AUX", "AVERT", "AVR", "BEN", "BF", "CAR", "CARD", "CAUS", "CENT", "CERT", "CESS", "CF", "CMP", "CMPD", "CNJ", "CNS", "CNSQ", "CNTF", "COL", "COM", "COMIT", "COMP", "COMPL", "COMPLR", "COMPUL", "CONC", "COND", "CONF", "CONJC", "CONN", "CONR", "CONT", "CONTEMP", "CONTR", "CONV", "COOP", "COORD", "COP", "COR", "COREF", "COTEMP", "CRAS", "CTG", "CTM", "CVB", "DE", "DEB", "DECL", "DED", "DEF", "DEFIN", "DEFOC", "DEL", "DEM", "DENOM", "DEO", "DEOBJ", "DEONT", "DEP", "DER", "DERIV", "DES", "DET", "DETR", "DH", "DIM", "DIMIN", "DIS", "DISJ", "DIST", "DISTR", "DITR", "DON", "DOX", "DP", "DR", "DTR", "DU", "DUB", "DUBIT", "DUPLIC", "DUR", "DYN", "DYNM", "EL", "ELA", "ELAT", "EMP", "EMPH", "EPIT", "ESS", "EVIT", "EX", "EXAL", "EXC", "EXCL", "EXCLAM", "EXESS", "EXIST", "EXO", "EXP", "EXPR", "EXST", "EXT", "FACT", "FAM", "FEM", "FIN", "FOC", "FPRT", "FRACT", "FREQ", "FRQ ", "FRUS", "FRUST", "FS", "FUNC", "GER", "GF", "GIV", "GNO", "GNOMIC", "GNT", "GT", "HAB", "HABIT", "HBL", "HES", "HEST", "HIST", "HML", "HOD", "HON", "HORT", "HRS", "HYP", "HYPO", "IAM", "IC", "ICOM", "IDEO", "IDEOPH", "IDPH", "IF", "IFUT", "IGNOR", "ILL", "ILLA", "IMMED", "IMP", "IMPER", "IMPF", "IMPOSS", "IMPR", "IN", "INAB", "INABL", "INACT", "INAL", "INANIM", "INC", "INCEP", "INCH", "INCHO", "INCL", "IND", "INDET", "INDF", "INDEF", "INDIC", "INDIR", "INEL", "INESS", "INF", "INFER", "INFL", "INFR", "ING", "INS", "INTENS", "INTENTV", "INTER", "INTERESS", "INTERJ", "INTERP", "INTJ", "INTL", "INTR", "INTRV", "INTS", "INTV", "INV", "INVOL", "IO", "IOBJ", "IP", "IPFV", "IRR", "ITER", "JUS", "LIM", "MASC", "MID", "MIT", "MOM", "NARR", "NEC", "NFIN", "NH", "NMLZ", "NUM", "NVEXP", "O", "OBLIG", "OBJ", "OBV", "OFC", "ONOM", "OPT", "ORD", "PASS", "PAU", "PAUS", "PEG", "PERF", "PERL", "PF", "PFV", "PLUP", "PLUR", "POL", "POSB", "PPFV", "PQP", "PREC", "PRED", "PREP", "PRF", "PROG", "PROH", "PROP", "PST", "PTCP", "PTV", "PURP", "PVB", "QUOT", "RECP", "RED", "REDUP", "REF", "REFL", "REL", "REM", "REP", "RES", "RESP", "RPRT", "RQ", "SBJ", "SCEP", "SEM", "SENS", "SIM", "SJV", "SPECL", "STAT", "SUB", "SUBL", "SUG", "SUPEL", "SUPL", "TENT", "TOP", "TRI", "UF", "UH", "UNCERT", "UR", "UWPST", "V", "VAL", "VBLZR", "VEG", "VEN", "VENT", "VERT", "VIA", "VN", "VOC", "VOL", "WH", "WHQ", "WIT", "WP", "WPST", "YNQ", "DTRNZ", "ER", "EXH", "HSY", "MAL", "PDS", "FRUSTR", "FDS ", "FSSI", "FSST", "PSSI", "PSST", "SDS", "SSSI", "SSST", "AB", "ANTIAPP", "TCV", "PFVCVB", "AS", "2POSS", "3POSS", "1POSS", "PSR", "SDS", "SE", "SS", "U", "UC", "RLN", "SBEN", "PERSE", "EXPECT"];
	var origExplanations = ["first person (speaker)", "second person (listener)", "third person (referent)", "fourth person (obviative or generic)", "first person inclusive", "accusative case", "animate gender", "animate gender", "common gender", "classifier", "dative case", "ergative case", "feminine gender", "future", "genitive case", "human gender; anthropic gender", "inanimate gender", "instrumental case", "instrumental case", "locative case", "masculine gender", "neuter gender", "negation; negative", "neuter", "nominative case", "oblique case", "past", "plural", "possessive; possessor", "present tense", "question word or particle", "rational gender (thinking beings)", "singular", "zero (null) morpheme", "first person inclusive dual", "first person inclusive plural", "first person inclusive paucal", "first person inclusive singular", "first person inclusive trial", "first person dual (you two)", "first person exclusive", "first person exclusive dual", "first person exclusive plural", "first person exclusive paucal", "first person inclusive singular", "first person genitive (my or our)", "first person plural (we)", "first person paucal", "first person singular (i; me)", "first person trial", "second person dual", "second person genitive (your)", "second person plural", "second person paucal", "second person singular (you)", "second person trial", "third person dual", "third person genitive (their)", "third person plural (they)", "third person paucal", "third person singular (he; she; it)", "third person singular feminine (she)", "third person singular masculine (he)", "third person singular neuter (it)", "third person trial", "first person plural (we)", "first person plural (we)", "first person singular (i)", "first person singular (i)", "second person plural (you all)", "second person plural (you all)", "second person singular (you)", "second person singular (you)", "third person plural (they)", "third person plural (they)", "third person singular (he; she; it)", "third person singular (he; she; it)", "agent", "abessive case", "ablative case (from)", "absolutive case", "absolute", "anticausative", "accompanier", "accomplishment", "actor role", "addressive", "adelative", "adessive case (at)", "adjective", "adjectiviser", "admonitive mood (warning)", "adverb(ial); adverbial case", "adversative", "adverbialiser", "actor; agent focus; agent voice", "affirmative", "affective case", "away from water", "agent nominalisation", "agreement", "allative case", "allocutive agreement", "andative (going towards)", "in front of", "antessive case (before)", "anticausative", "antipassive", "agent-orientated verb", "aorist", "antipassive voice", "applicative", "approximative", "near; in the vicinity of", "argumentative", "article", "assertive mood", "assumptive mood; assumed", "agent trigger", "attributive", "attenuative", "auditory evidential", "augmentative", "auxiliary", "avertive", "aversative", "benefactive case (for)", "beneficiary focus", "caritive case", "cardinal numeral", "causative", "centric case", "certainty (evidential)", "cessative", "circumstantial focus", "comparative", "compound", "conjunction", "construct state", "consequential mood", "counterfactual conditional", "collective number", "comitative case (together with)", "comitative case (together with)", "complementiser", "completive aspect", "complementiser", "compulsional", "concessive", "conditional mood", "confirmational", "conjectural (evidential)", "connective particle", "connector", "continuous aspect; continuative aspect", "contemporative (at that/the same time)", "contrastive; contranstive focus", "converb", "cooperative", "coordination", "copula", "coreference; coreferential", "coreference; coreferential", "contemporative (at that/the same time)", "crastinal tense (tomorrow)", "contingent mood", "contemporative (at that/the same time)", "converb", "different event; change of event", "debitive", "declarative mood", "deductive evidential", "definite", "definitive", "defocus", "delative case (off of)", "demonstrative", "denominal", "deontic mood", "deobjective", "deontic mood", "dependent", "derivation; derivational", "derivation; derivational", "desiderative mood", "determiner", "detransitiviser; detransitive", "downhill; seaward", "diminutive", "diminutive", "distal; distant", "disjunction; disjunctive", "distal; distant", "distributive", "ditransitive", "donative", "doxastic", "distant past", "downriver; toward the water", "detrimentary", "dual", "dubitative mood", "dubitative mood", "duplicative", "durative aspect", "dynamic aspect", "dynamic aspect", "elative case (out of)", "elative case (out of)", "elative case (out of)", "emphatic; emphasiser", "emphatic; emphasiser", "epithet", "essive case", "evitative case", "exclusive person", "exaltive; deferential (high-status register )", "exclusive person", "exclusive", "exclamative", "exessive case", "existential (there is)", "exocentric case", "experiential; eyewitness; direct evidential", "expressive", "existential (there is)", "extended aspect; extendible", "factive", "familiar; familiar register", "feminine gender", "finite verb", "focus", "future participle", "fraction; fractional (numeral)", "frequentative aspect", "frequentative aspect", "frustrative", "frustrative", "false start", "functive case", "gerund; gerundive", "goal focus", "given", "gnomic (generic) aspect", "gnomic (generic) aspect", "general tense", "goal trigger", "habitual aspect", "habitual aspect", "habilitive", "hesitation; hesitation particle", "hesternal tense (yesterday)", "historic(al) tense", "humiliative (humble/low-status register)", "hodiernal tense", "honorific", "hortative", "hearsay; reported evidential", "hypothetical mood", "hypothetical mood", "iamitive", "involuntary causative", "involuntary comitative", "ideophone", "ideophone", "ideophone", "instrument focus", "indefinite future", "ignorative", "illative case (into)", "illative case (into)", "immediate past", "imperative mood", "imperative mood", "imperfect", "modal impossibility", "imprecative mood", "inclusive person", "impotential", "inablative", "inactive", "inalienable possession", "inanimate gender", "inclusive person", "inceptive aspect", "inchoative aspect", "inchoative aspect", "inclusive", "indicative", "indeterminate", "indefinite", "indefinite", "indicative mood", "indirect; indirective", "inelative case (from within)", "inessive case (in)", "infinitive", "inferential mood", "inflectional", "inferential mood", "ingressive case", "instrumental", "intensifier; intensive", "intentive", "interrogative", "interessive", "interjection", "interpellative mood", "interjection", "intentional", "intransitive", "introversive", "intensifier; intensive", "intentive", "inverse", "involuntative; involitive", "indirect object (ive)", "indirect object", "immediate past", "imperfective", "irrealis", "iterative aspect", "jussive mood", "limitative", "masculine gender", "middle voice; medio-passive", "mitigation", "momentane (single-event verb)", "narrative tense", "necessitative", "non-finite", "non-human", "nominaliser; nominalisation", "numeral; numerative", "nonvisual experiential (evidential)", "object(ive)", "obligative mood", "object(ive)", "obviative", "object focus", "onomatopoeia", "optative mood ", "ordinal numeral", "passive voice", "paucal number", "pausal", "pegative case (a special case for the giver)", "perfective aspect", "perlative case", "patient focus; patient voice", "perfective aspect", "pluperfect", "pluractional", "polite register", "possible; modal possibility", "past perfective", "polar question particle", "precative mood (requests)", "predicative affix; predicative", "preposition; prepositional case", "perfect", "progressive aspect", "prohibitive mood (do not!)", "proprietive case", "past tense", "participle", "partitive case", "purposive case", "preverb", "quotative", "reciprocal voice", "reduplication", "reduplication", "referential", "reflexive (reflexive pronoun; reflexive voice)", "relative clause marker", "remote", "repetitive aspect", "resultative", "respect", "reported evidential", "rhetorical question", "subject; subject agreement", "sceptical", "semelfactive aspect (once)", "sensory evidential mood", "simultaneous aspect; simultaneity", "subjunctive mood", "speculative mood", "stative aspect", "sublocative (under)", "sublative case (onto; down onto)", "suggestive mood", "superelative case (on)", "superlative", "tentative", "topic marker", "trial number", "uncertain future", "uphill; inland", "uncertain mood", "upriver", "unwitnessed past", "valency increasing; valence marker", "verbaliser", "vegetable (food) gender", "venitive (coming towards; andative)", "ventive; ventitive", "vertical", "vialis case", "verbal noun", "vocative case", "volitive mood; volitional", "interrogative pronoun", "wh- question", "witnessed evidential", "witnessed past", "witnessed past", "witnessed past", "yes-no question", "detransitiviser", "ergative", "exhortative", "hearsay", "malefactive", "previous different subject", "frustrative", "subsequent different subject", "subsequent same subject intransitive", "subsequent same subject transitive", "previous same subject intransitive", "previous same subject transitive", "simultaneous different subject", "simultaneous same subject intransitive", "simultaneous same subject transitive", "absolutive", "aniapplicative", "temporal converb", "perfective converb", "aseverative", "second person possessive", "second person possessive", "first person possessive", "possessor", "simultaneous event different subject", "same event", "same-subject", "uninflected", "upcoast", "relational", "self-benefactive", "personal experience", "expectational"];
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

	//CONVERT
	var conv = new Converter(
		markup,
		notInterlinear,
		useAbbrv,
		abbreviations,
		explanations,
		abbrvDelimiterInput,
		useSmallCaps,
		$("#useAcknowledgement").is(":checked")
	);

	convert(conv);
	$("#GMGResult").html(conv.output);
	$("#GMGOutput").focus();
	$("#GMGOutput").select();
	// Save input text in user's localstorage for next session
	localStorage.setItem('input', $('#input').val());
	localStorage.setItem('notInterlinear', $('#notInterlinear').val());
	localStorage.setItem('abbrvInput', $('#abbrvInput').val());
	localStorage.setItem('abbrvDelimiterInput', $('#abbrvDelimiterInput').val());
}

function convert(conv) {
	var nonInterlinear = conv.nonInterlinear;
	var useAbbrv = conv.useAbbrv;
	var useSmallCaps = conv.useSmallCaps;
	var markup = conv.markup;

	var lines = $("#input").val().trim();
	if (lines == "") {
		lines = $("#input").attr('placeholder');
	}
	lines = lines.split("\n");
	for (let i = 0; i < lines.length; i++) {
		if (lines[i] == "") {
			if (lines[i + 1] != "") {
				lines[i] = "$&N;";
			}
		}
		lines[i] = lines[i].replace(/ +(?= )/g, '').trim();
	}
	lines = lines.map($.trim).filter(function (x) { return !(x === ""); });
	for (let i = 0; i < lines.length; i++) {
		if (lines[i] == "$&N;") {
			lines[i] = "";
		}
	}

	// This is a horrible way to do this as a lot of code is repeated. But since this
	// tool is very limited and most of what we're doing is enclosing
	// elements of the input in a specific format... Anything but this approach
	// may be over-engeneering.
	switch (markup) {
		case "htmlTable":
			htmlTableMarkup();
			break;
		case "interlinear":
			interlinearMarkup();
			break;
		case "plainText":
			plainTextMarkup();
			break;
		case "latexGloss":
			latexMarkup();
			break;
		case "zbbGloss":
			zbbMarkup();
			break;
		case "cwsGloss":
			cwsMarkup();
			break;
		case "block":
			blockMarkup();
			break;
		case "wikiTable":
			wikiMarkup();
			break;
	}

	function htmlTableMarkup() {
		var htmlOutput = "";

		maxColumns = 0;
		for (let col_num = 0; col_num < lines.length; col_num++) {
			var line = lines[col_num].split(/[ \t]+/);

			var toMatch = col_num + 1;
			toMatch.toString();
			stringInterlinear = nonInterlinear.join(',');
			var includes = stringInterlinear.indexOf(toMatch);
			if (includes != -1) {
				skipline = true;
			} else if (col_num + 1 == lines.length) {

			} else if (maxColumns <= line.length) {
				maxColumns = line.length;
			}
		}

		for (let col_num = 0; col_num < lines.length; col_num++) {
			var skipline = false;
			var parsedEntry = "";

			var toMatch = col_num + 1;
			toMatch.toString();
			stringInterlinear = nonInterlinear.join(',');
			var includes = stringInterlinear.indexOf(toMatch);
			if (includes != -1) {
				skipline = true;
			}

			var entries = lines[col_num].split(/[ \t]+/);
			// Do something if is the second last iteration of the array
			if ((col_num + 2 == lines.length) && (useAbbrv || useSmallCaps)) {
				for (let row_num = 0; row_num < entries.length; row_num++) {
					parsedEntry += "<td>" + splitEntryGloss(entries[row_num], conv) + "</td>";
				}
				htmlOutput += "  <tr>" + parsedEntry + "</tr>" + "\n";
				//Do something if skip line or last line
			} else if (lines[col_num] == "") {
				htmlOutput += "  <tr><td colspan=" + maxColumns + ">" + "<br/>" + "</td></tr>" + "\n";
			} else if (skipline || col_num + 1 == lines.length) {
				htmlOutput += "  <tr><td colspan=" + maxColumns + ">" + lines[col_num] + "</td></tr>" + "\n";
				//Else do normal line
			} else {
				for (let row_num = 0; row_num < entries.length; row_num++) {
					parsedEntry += "<td>" + entries[row_num] + "</td>";
				}
				htmlOutput += "  <tr>" + parsedEntry + "</tr>" + "\n";
			}
			parsedEntry = "";
		}
		htmlOutput = "<table>" + "\n" + htmlOutput + "</table>";
		conv.finishAndShow(htmlOutput);
	}
	function interlinearMarkup() {
		interOutput = "";
		table = new Array();
		maxColumns = 0;
		noOfLines = lines.length - 1;

		for (let col_num = 0; col_num < lines.length; col_num++) {
			// If last line
			if (col_num + 1 == lines.length) {

			} else {
				var line = lines[col_num].split(/[ \t]+/);
				if (maxColumns <= line.length) {
					maxColumns = line.length;
				}
				table[col_num] = new Array();
				for (let row_num = 0; row_num < line.length; row_num++) {
					if (col_num + 2 == lines.length) {
						table[col_num].push(splitEntryGloss(line[row_num], conv));
					} else {
						table[col_num].push(line[row_num]);
					}
				}
			}
		}
		for (let col_num = 0; col_num < maxColumns; col_num++) {
			interOutput += "  <div class='gll'>";
			for (let row_num = 0; row_num < noOfLines; row_num++) {
				if (table[row_num][col_num] != null) {
					interOutput += table[row_num][col_num];
				} else {
					interOutput += ""
				}
				if (row_num != noOfLines - 1) {
					interOutput += "<br/>";
				}
			}
			interOutput += "</div>\n";
		}
		var lastLine = lines[noOfLines].split(/[ \t]+/);
		interOutput += "  <div>" + lastLine.join(" ") + "</div>\n";
		interOutput = "<div>\n" + interOutput + "</div>";

		conv.finishAndShow(interOutput);
	}
	function plainTextMarkup() {
		var wordLength = [];
		var plainOutput = "";

		for (let col_num = 0; col_num < lines.length; col_num++) {
			// Find out if the line is non allignable
			var skipline = false;
			var inter_num = 0;
			while (inter_num < nonInterlinear[inter_num]) {
				if (nonInterlinear[inter_num] == col_num + 1) {
					skipline = true;
					inter_num == nonInterlinear[inter_num] - 5;
				}
				inter_num++
			}
			var entriesZ = lines[col_num].split(/[ \t]+/);
			for (let row_num = 0; row_num < entriesZ.length; row_num++) {
				var noDiacritics = entriesZ[row_num].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
				noDiacritics = noDiacritics.replace(/[\u02E5-\u02E9]/g, "˥");
				noDiacritics = noDiacritics.replace(/[\uA708-\uA716]/g, "˥");

				let noDiacriticsLength = noDiacritics.length
				noDiChar = 0;
				while (noDiChar < noDiacritics.length) {
					noDiChar++
					if (noDiacritics[noDiChar] == "˥") {
						noDiChar++
						if (noDiacritics[noDiChar] == "˥") {
							noDiChar++
							noDiacriticsLength--
							if (noDiacritics[noDiChar] == "˥") {
								noDiacriticsLength--
							}
						}
					}
				}

				if (!skipline && col_num + 1 != lines.length) {
					if (typeof wordLength[row_num] === "undefined") {
						wordLength.push(noDiacriticsLength);
					}
					if (wordLength[row_num] <= noDiacriticsLength) {
						wordLength[row_num] = noDiacriticsLength;
					}
				}
			}
		}
		for (let col_num = 0; col_num < lines.length; col_num++) {
			// Find out if the line is non allignable
			var skipline = false;
			var inter_num = 0;
			while (inter_num < nonInterlinear[inter_num]) {
				if (nonInterlinear[inter_num] == col_num + 1) {
					skipline = true;
					inter_num == nonInterlinear[inter_num] - 5;
				}
				inter_num++
			}
			var line = lines[col_num].split(/[ \t]+/);
			for (let row_num = 0; row_num < line.length; row_num++) {
				// If small caps, turn each glossing abbreviation to small caps if abbreviation is all caps.
				if (useSmallCaps) {
					line[row_num] = splitEntryGlossZbb(line[row_num], conv);
				}
				if (!skipline && col_num + 1 != lines.length) {

					// breack diacritical characters to get true length of entry
					var noDiacritics = line[row_num].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
					noDiacritics = noDiacritics.replace(/[\u02E5-\u02E9]/g, "˥");
					noDiacritics = noDiacritics.replace(/[\uA708-\uA716]/g, "˥");

					let noDiacriticsLength = noDiacritics.length
					noDiChar = 0;
					while (noDiChar < noDiacritics.length) {
						noDiChar++
						if (noDiacritics[noDiChar] == "˥") {
							noDiChar++
							if (noDiacritics[noDiChar] == "˥") {
								noDiChar++
								noDiacriticsLength--
								if (noDiacritics[noDiChar] == "˥") {
									noDiacriticsLength--
								}
							}
						}
					}

					while (noDiacriticsLength < wordLength[row_num] && row_num != line.length - 1) {
						line[row_num] += " ";
						noDiacriticsLength++;
					}
				}
			}
			plainOutput += line.join(" ") + "\n";
		}
		conv.finishPlainText(plainOutput);
	}
	function latexMarkup() {
		latexOutput = "";
		for (let col_num = 0; col_num < lines.length; col_num++) {
			// Third last line
			if (col_num + 3 == lines.length) {
				latexOutput += "\\begin{exe}\n\\ex\n\\gll " + lines[col_num] + "\\\\\n";
			} else if (col_num + 2 == lines.length) {
				if (useSmallCaps) {
					var entries = lines[col_num].split(/[ \t]+/);
					for (let row_num = 0; row_num < entries.length; row_num++) {
						latexOutput += splitEntryGlossLatex(entries[row_num], conv);
						if (row_num + 1 != entries.length) {
							latexOutput += " ";
						}
					}
					latexOutput += "\\\\\n";
				} else {
					latexOutput += lines[col_num] + "\\\\\n";
				}
			} else if (col_num + 1 == lines.length) {
				latexOutput += "\\trans " + lines[col_num] + "\n\\end{exe}";
			} else {
				latexOutput += lines[col_num] + "\n";
			}
		}
		conv.finish(latexOutput);
	}
	function zbbMarkup() {
		var zbbOutput = "";
		let col_num = 0;
		while (col_num < lines.length) {
			//Third last line. Or first if there are only two lines
			if ((col_num + 3 == lines.length) || (lines.length == 2 && col_num == 0)) {
				var normLine = lines[col_num].split(/[ \t]+/);
				//Go to second last line
				col_num++;
				var glossLine = lines[col_num].split(/[ \t]+/);
				for (let col_num = 0; col_num < glossLine.length; col_num++) {
					if ((typeof normLine !== "undefined") || (typeof glossLine !== "undefined")) {
						if (useSmallCaps) {
							glossLine[col_num] = splitEntryGlossZbb(glossLine[col_num], conv);
						}
						zbbOutput += "[gloss=" + glossLine[col_num] + "]" + normLine[col_num] + "[/gloss]";
					}
				}
				zbbOutput += "\n"
				//Other lines, spit it out
			} else {
				zbbOutput += lines[col_num] + "\n";
			}
			col_num++;
		}
		conv.finish(zbbOutput);
	}
	function cwsMarkup() {
		cwsOutput = "";
		table = new Array();
		maxColumns = 0;
		noOfLines = lines.length - 1;

		for (let col_num = 0; col_num < lines.length; col_num++) {
			// If last line
			if (col_num + 1 == lines.length) {

			} else {
				var line = lines[col_num].split(/[ \t]+/);
				if (maxColumns <= line.length) {
					maxColumns = line.length;
				}
				table[col_num] = new Array();
				for (let row_num = 0; row_num < line.length; row_num++) {
					table[col_num].push(line[row_num]);
				}
			}
		}
		for (let col_num = 0; col_num < maxColumns; col_num++) {
			for (let row_num = 0; row_num < noOfLines; row_num++) {
				if (table[row_num][col_num] != null) {
					cwsOutput += table[row_num][col_num];
				} else {
					cwsOutput += ""
				}
				if (row_num != noOfLines - 1) {
					cwsOutput += "//";
				}
			}
			if (col_num != maxColumns - 1) {
				cwsOutput += "|";
			}
		}
		cwsOutput = "<gbl=" + noOfLines + ">" + cwsOutput + "</gbl>\n";
		var lastLine = lines[noOfLines].split(/[ \t]+/);
		cwsOutput += lastLine.join(" ");

		conv.finish(cwsOutput);
	}
	function blockMarkup() {
		var wordLength = [];
		var plainOutput = "";

		for (let col_num = 0; col_num < lines.length; col_num++) {
			// Find out if the line is non allignable
			var skipline = false;
			var inter_num = 0;
			while (inter_num < nonInterlinear[inter_num]) {
				if (nonInterlinear[inter_num] == col_num + 1) {
					skipline = true;
					inter_num == nonInterlinear[inter_num] - 5;
				}
				inter_num++
			}
			var entriesZ = lines[col_num].split(/[ \t]+/);
			for (let row_num = 0; row_num < entriesZ.length; row_num++) {
				var noDiacritics = entriesZ[row_num].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
				noDiacritics = noDiacritics.replace(/[\u02E5-\u02E9]/g, "˥");
				noDiacritics = noDiacritics.replace(/[\uA708-\uA716]/g, "˥");

				let noDiacriticsLength = noDiacritics.length
				noDiChar = 0;
				while (noDiChar < noDiacritics.length) {
					noDiChar++
					if (noDiacritics[noDiChar] == "˥") {
						noDiChar++
						if (noDiacritics[noDiChar] == "˥") {
							noDiChar++
							noDiacriticsLength--
							if (noDiacritics[noDiChar] == "˥") {
								noDiacriticsLength--
							}
						}
					}
				}

				if (!skipline && col_num + 1 != lines.length) {
					if (typeof wordLength[row_num] === "undefined") {
						wordLength.push(noDiacriticsLength);
					}
					if (wordLength[row_num] <= noDiacriticsLength) {
						wordLength[row_num] = noDiacriticsLength;
					}
				}
			}
		}
		for (let col_num = 0; col_num < lines.length; col_num++) {
			// Find out if the line is non allignable
			var skipline = false;
			var inter_num = 0;
			while (inter_num < nonInterlinear[inter_num]) {
				if (nonInterlinear[inter_num] == col_num + 1) {
					skipline = true;
					inter_num == nonInterlinear[inter_num] - 5;
				}
				inter_num++
			}
			var line = lines[col_num].split(/[ \t]+/);
			for (let row_num = 0; row_num < line.length; row_num++) {
				// If small caps, turn each glossing abbreviation to small caps if abbreviation is all caps.
				if (useSmallCaps) {
					line[row_num] = splitEntryGlossZbb(line[row_num], conv);
				}
				if (!skipline && col_num + 1 != lines.length) {

					// breack diacritical characters to get true length of entry
					var noDiacritics = line[row_num].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
					noDiacritics = noDiacritics.replace(/[\u02E5-\u02E9]/g, "˥");
					noDiacritics = noDiacritics.replace(/[\uA708-\uA716]/g, "˥");

					let noDiacriticsLength = noDiacritics.length
					noDiChar = 0;
					while (noDiChar < noDiacritics.length) {
						noDiChar++
						if (noDiacritics[noDiChar] == "˥") {
							noDiChar++
							if (noDiacritics[noDiChar] == "˥") {
								noDiChar++
								noDiacriticsLength--
								if (noDiacritics[noDiChar] == "˥") {
									noDiacriticsLength--
								}
							}
						}
					}

					while (noDiacriticsLength < wordLength[row_num] && row_num != line.length - 1) {
						line[row_num] += " ";
						noDiacriticsLength++;
					}
				}
			}
			plainOutput += line.join(" ") + "\n";
		}
		conv.finishBlock(plainOutput);
	}
	function wikiMarkup() {
		var wikiOutput = "";
		maxColumns = 0;

		for (let col_num = 0; col_num < lines.length; col_num++) {
			var line = lines[col_num].split(/[ \t]+/);

			var toMatch = col_num + 1;
			toMatch.toString();
			stringInterlinear = nonInterlinear.join(',');
			var includes = stringInterlinear.indexOf(toMatch);
			if (includes != -1) {
				skipline = true;
			} else if (col_num + 1 == lines.length) {

			} else if (maxColumns <= line.length) {
				maxColumns = line.length;
			}
		}

		for (let col_num = 0; col_num < lines.length; col_num++) {
			var parsedEntry = "";
			skipline = false;

			var toMatch = col_num + 1;
			toMatch.toString();
			stringInterlinear = nonInterlinear.join(',');
			var includes = stringInterlinear.indexOf(toMatch);
			if (includes != -1) {
				skipline = true;
			}

			var entries = lines[col_num].split(/[ \t]+/);
			// Do something if is the second last iteration of the array
			if ((col_num + 2 == lines.length) && (useAbbrv || useSmallCaps)) {
				for (let row_num = 0; row_num < maxColumns; row_num++) {
					if (entries[row_num] == null || entries[row_num] == "") {
						parsedEntry += "|\n";
					} else {
						parsedEntry += "| " + splitEntryGlossWiki(entries[row_num], conv) + "\n";
					}
				}
				wikiOutput += parsedEntry;
				//Do something if skip line 
			} else if (skipline) {
				wikiOutput += "| colspan='" + maxColumns + "'|" + lines[col_num] + "\n|-\n";
				//Blank line
			} else if (lines[col_num] == "") {
				wikiOutput += "| colspan='" + maxColumns + "'|" + "\n|-\n";
				//Else or last line
			} else if (col_num + 1 == lines.length) {
				wikiOutput += "|-\n| colspan='" + maxColumns + "'|" + lines[col_num];
				//Else do normal line
			} else {
				for (let row_num = 0; row_num < maxColumns; row_num++) {
					if (entries[row_num] == null) {
						parsedEntry += "|" + "\n";
					} else {
						parsedEntry += "| " + entries[row_num] + "\n";
					}
				}
				parsedEntry += "|-\n";
				wikiOutput += parsedEntry;
			}
			parsedEntry = "";
		}

		wikiOutput = "<blockquote>\n{| \n|-\n" + wikiOutput + "\n|}\n</blockquote>"

		conv.finish(wikiOutput);
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
		var smallCapsClass = "abbrv";
		if (useSmallCaps) {
			smallCapsClass = "abbrv sc";
		}
		let j = 0;
		while (j < abbreviations.length) {
			if (word == abbreviations[j]) {
				glossexpl = explanations[j];
				break;
			}
			j++
		}
		if (glossexpl == "") {
			if (word == word.toUpperCase() && useSmallCaps) {
				result = result.concat("<a class='sc'>", word, "</a>");
			} else {
				result = result.concat(word);
			}
		} else if (useAbbrv) {
			if (word == word.toUpperCase() && useSmallCaps) {
				result = result.concat("<abbr class='", smallCapsClass, "' title='", glossexpl, "'>", word, "</abbr>");
			} else {
				result = result.concat("<abbr class='abbrv' title='", glossexpl, "'>", word, "</abbr>");
			}
		} else if (useSmallCaps) {
			result = result.concat("<a class='sc'>", word, "</a>");
		} else {
			result = result.concat(word);
		}
	}
	return result;
}
function splitEntryGlossLatex(entry, conv) {
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
				setEntryGlossLatex();
			}
			word = "";
			result = result.concat(entry[i]);
		} else {
			word += entry[i];
		}
	}
	if (!(word === "")) {
		setEntryGlossLatex();
	}
	function setEntryGlossLatex() {
		if (word.toUpperCase() == word) {
			result = result.concat("\\textsc{", word.toLowerCase(), "}");
		} else {
			result = result.concat(word);
		}
	}
	return result;
}
function splitEntryGlossZbb(entry, conv) {
	var result = "";
	var word = "";
	abbrvDelimiterInput = conv.abbrvDelimiterInput;
	useSmallCaps = conv.useSmallCaps;
	for (var i = 0; i < entry.length; i++) {
		if (abbrvDelimiterInput.indexOf(entry[i]) != -1) {
			if (!(word === "")) {
				setEntryGlossZbb();
			}
			word = "";
			result = result.concat(entry[i]);
		} else {
			word += entry[i];
		}
	}
	if (!(word === "")) {
		setEntryGlossZbb();
	}
	function setEntryGlossZbb() {
		if (word == word.toUpperCase()) {
			result += toSmallCaps(word);
		} else {
			result += word;
		}
	}
	return result;
}
function splitEntryGlossWiki(entry, conv) {
	var result = "";
	var word = "";
	abbrvDelimiterInput = conv.abbrvDelimiterInput;
	useSmallCaps = conv.useSmallCaps;
	var smallCapsPrefix = "";
	var smallCapsSuffix = "";
	if (useSmallCaps) {
		smallCapsPrefix = "{{sc|";
		smallCapsSuffix = "}}";
	}
	useAbbrv = conv.useAbbrv;
	abbreviations = conv.abbreviations;
	explanations = conv.explanations;
	for (var i = 0; i < entry.length; i++) {
		if (abbrvDelimiterInput.indexOf(entry[i]) != -1) {
			if (!(word === "")) {
				setEntryGlossWiki();
			}
			word = "";
			result = result.concat(entry[i]);
		} else {
			word += entry[i];
		}
	}
	if (!(word === "")) {
		setEntryGlossWiki();
	}
	function setEntryGlossWiki() {
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
				result = result.concat("{{sc|", word, "}}");
			} else {
				result = result.concat(word);
			}
		} else if (useAbbrv) {
			if (word == word.toUpperCase() && useSmallCaps) {
				result = result.concat("{{abbr", "|", smallCapsPrefix, word, smallCapsSuffix, "|", glossexpl, "}}");
			} else {
				result = result.concat("{{abbr|", word, "|", glossexpl, "}}");
			}
		} else if (useSmallCaps) {
			result = result.concat("{{sc|", word, "}}");
		} else {
			result = result.concat(word);
		}
	}
	return result;
}

function toSmallCaps(input) {
	var table = [];
	// small caps X is just lowercase x; small caps Q is o with ogonek.
	table["A"] = "ᴀ"; table["B"] = "ʙ"; table["C"] = "ᴄ"; table["D"] = "ᴅ";
	table["E"] = "ᴇ"; table["F"] = "ғ"; table["G"] = "ɢ"; table["H"] = "ʜ";
	table["I"] = "ɪ"; table["J"] = "ᴊ"; table["K"] = "ᴋ"; table["L"] = "ʟ";
	table["M"] = "ᴍ"; table["N"] = "ɴ"; table["O"] = "ᴏ"; table["P"] = "ᴘ";
	table["Q"] = "ǫ"; table["R"] = "ʀ"; table["S"] = "s"; table["T"] = "ᴛ";
	table["U"] = "ᴜ"; table["V"] = "ᴠ"; table["W"] = "ᴡ"; table["X"] = "x";
	table["Y"] = "ʏ"; table["Z"] = "ᴢ";

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

var Converter = function (markup, nonInterlinear, useAbbrv, abbreviations, explanations, abbrvDelimiterInput, useSmallCaps, useAcknowledgement) {
	this.output = "";
	this.markup = markup;
	this.nonInterlinear = nonInterlinear;
	this.useAbbrv = useAbbrv;
	this.abbreviations = abbreviations;
	this.explanations = explanations;
	this.abbrvDelimiterInput = abbrvDelimiterInput;
	this.useSmallCaps = useSmallCaps;
	this.useAcknowledgement = useAcknowledgement;
};
Converter.prototype.finish = function (input) {
	this.output = "<textarea id='GMGOutput' spellcheck='false'>" + input + "</textarea>";
}
Converter.prototype.finishAndShow = function (input) {
	if (this.useAcknowledgement) {
		let ack = "<i class='gmg-ack'>Gloss provided by <a href='https://neonnaut.github.io/'>Gloss My Gloss</a></i>";
		this.output = input + ack + "<br>" + "<br><textarea id='GMGOutput' spellcheck='false'>" + input + "\n" + ack + "</textarea>";
	} else {
		this.output = input + "<br><textarea id='GMGOutput' spellcheck='false'>" + input + "</textarea>";
	}
}
Converter.prototype.finishPlainText = function (input) {
	this.output = "<textarea id='GMGOutput' spellcheck='false'>" + input + "</textarea>";
}
Converter.prototype.finishBlock = function (input) {
	this.output = "<textarea id='GMGOutput' spellcheck='false'>`\n" + input + "`</textarea>";
}
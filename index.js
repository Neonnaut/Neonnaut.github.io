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
	var origAbbreviations = ["1","2","3","4","12","ACC","AN","ANIM","C","CLF","DAT","ERG","F","FUT","GEN","HUM","INAN","INST","INSTR","LOC","M","N","NEG","NEUT","NOM","OBL","PAST","PL","POSS","PRS","Q","R","SG","∅","12DU","12P","12PAU","12S","12T","1DU","1E","1EDU","1EP","1EPAU","1ES","1GEN","1P","1PAU","1S","1T","2DU","2GEN","2P","2PAU","2S","2T","3DU","3GEN","3P","3PAU","3S","3SF","3SM","3T","1p","1pl","1s","1sg","2p","2pl","2s","2sg","3p","3pl","3s","3sg","A",
	"ABESS","ABL","ABS","ABSL","AC","ACCOM","ACP","ACR","ADDR","ADEL","ADESS","ADJ","ADJZ","ADM","ADV","ADVS","ADVZ","AF","AFF","AFFT","AFW","AGN","AGR","ALL","ALLOC","AND","ANTE","ANTESS","ANTIC","ANTIP","AO","AOR","AP","APPL","APRX","APUD","ARG","ART","ASRT","ASSUM","AT","ATR","ATTEN","AUD","AUG","AUX","AVERT","AVR","BEN","BF","CAR","CARD","CAUS","CENT","CERT","CESS","CF","CMP","CMPD","CNJ","CNS","CNSQ","CNTF","COL","COM","COMIT","COMP","COMPL","COMPLR","COMPUL","CONC","COND","CONF","CONJC","CONN","CONR","CONT","CONTEMP","CONTR","CONV","COOP","COORD","COP","COR","COREF","COTEMP","CRAS","CTG","CTM","CVB","DE","DEB",
	"DECL","DED","DEF","DEFIN","DEFOC","DEL","DEM","DENOM","DEO","DEOBJ","DEONT","DEP","DER","DERIV","DES","DET","DETR","DH","DIM","DIMIN","DIS","DISJ","DIST","DISTR","DITR","DON","DOX","DP","DR","DTR","DU","DUB","DUBIT","DUPLIC","DUR","DYN","DYNM","EL","ELA","ELAT","EMP","EMPH","EP","EPIT","ESS","EVIT","EX","EXAL","EXC","EXCL","EXCLAM","EXESS","EXIST","EXO","EXP","EXPR","EXST","EXT","FAC","FACT","FAM","FEM","FIN","FOC","FPRT","FRACT","FREQ","FRQ ","FRUS","FRUST","FS","FUNC","GER","GF","GIV","GNO","GNOMIC","GNT","GT","HAB","HABIT","HBL","HES","HEST","HIST","HML","HOD","HON","HORT","HRS","HYP","HYPO",
	"IAM","IC","ICOM","IDEO","IDEOPH","IDPH","IF","IFUT","IGNOR","ILL","ILLA","IMMED","IMP","IMPER","IMPF","IMPOSS","IMPR","IN","INAB","INABL","INACT","INAL","INANIM","INC","INCEP","INCH","INCHO","INCL","IND","INDET","INDF","INDEF","INDIC","INDIR","INEL","INESS","INF","INFER","INFL","INFR","ING","INS","INTENS","INTENTV","INTER","INTERESS","INTERJ","INTERP","INTJ","INTL","INTR","INTRV","INTS","INTV","INV","INVOL","IO","IOBJ","IP","IPFV","IRR","ITER","JUS","KIN","LIM","MASC","MID","MIT","MOM","NARR","NEC","NFIN","NH","NMLZ","NUM","NVEXP","O","OBLIG","OBV","OFC","ONOM","ORD","PASS","PAU","PAUS","PEG","PERFV","PERL","PF","PFV","PLUP","PLUR","POL","POSB","PPFV","PQP","PREC","PRED","PREP","PRF","PROG","PROH","PROP","PST","PTCP","PTV","PURP","PVB",
	"QUOT","RECP","RED","REDUP","REF","REFL","REL","REM","REP","RES","RESP","RPRT","RQ","S","SBJ","SCEP","SEM","SENS","SIM","SJV","SPECL","STAT","SUB","SUBL","SUG","SUPEL","SUPL","TENT","TOP","TRI","UF","UH","UNCERT","UR","UWPST","VAL","VBLZR","VEG","VEN","VENT","VERT","VIA","VN","VOC","VOL","WH","WHQ","WIT","WP","WPST","YNQ"];
	var origExplanations = ["First person (speaker)","Second person (listener)","Third person (referent)","Fourth person (oviative or generic)","First person inclusive","Accusative case","Animate gender","Animate gender","Common gender","Classifier","Dative case","Ergative case","Feminine gender","Future","Genitive case","Human gender; anthropic gender","Inanimate gender","Instrumental case","Instrumental case","Locative case","Masculine gender","Neuter gender","Negation; negative","Neuter","Nominative case","Oblique case","Past","Plural","Possessive; possessor","Present tense","Question word or particle","Rational gender (thinking beings)","Singular","Zero (null) morpheme",
	"First person inclusive dual","First person inclusive plural","First person inclusive paucal","First person inclusive singular","First person inclusive trial","First person dual (you two)","First person exclusive","First person exclusive dual","First person exclusive plural","First person exclusive paucal","First person inclusive singular","First person genitive (my or our)","First person plural (we)","First person paucal","First person singular (I; me)","First person trial","Second person dual","Second person genitive (your)","Second person plural","Second person paucal","Second person singular (you)","Second person trial","Third person dual","Third person genitive (their)","Third person plural (they)","Third person paucal","Third person singular (they)","Third person singular feminine (she)","Third person singular masculine (he)","Third person trial","First person plural (we)","First person plural (we)","First person singular (I)","First person singular (I)","Second person plural (you all)","Second person plural (you all)","Second person singular (you)","Second person singular (you)","Third person plural (they)","Third person plural (they)","Third person singular (he she it)","Third person singular (he she it)","Agent-like argument of canonical transitive verb",
	"Abessive case","Ablative case (from)","Absolutive case","Absolute","Anticausative","Accompanier","Accomplishment","Actor role","Addressive","Adelative","Adessive case (at)","Adjective","Adjectivizer","Admonitive mood (warning)","Adverb(ial); adverbial case","Adversative","Adverbializer","Actor; agent focus; agent voice","Affirmative","Affective case","Away from water","Agent nominalization","Agreement","Allative case","Allocutive agreement","Andative (going towards)","In front of","Antessive case (before)","Anticausative","Antipassive","Agent-orientated verb","Aorist (= pfv or pst.pfv )","Antipassive voice","Applicative","Approximative","Near; in the vicinity of","Argumentative","Article","Assertive mood","Assumptive mood; assumed","Agent trigger","Attributive","Attenuative","Auditory evidential","Augmentative","Auxiliary","Avertive","Aversative","Benefactive case (for)","Beneficiary focus","Caritive case","Cardinal numeral (morpheme or grammatical feature)","Causative","Centric case","Certainty (evidential)","Cessative","Circumstantial focus","Comparative","Compound","Conjunction","Construct state","Consequential mood","Counterfactual conditional","Collective number","Comitative case (together with)","Comitative case (together with)","Complementizer","Completive aspect","Complementizer","Compulsional","Concessive","Conditional mood","Confirmational","Conjectural (evidential)","Connective particle","Connector","Continuous aspect; continuative aspect","Contemporative (at that/the same time)","Contrastive; contranstive focus","Converb","Cooperative","Coordination","Copula","Coreference; coreferential","Coreference; coreferential","Contemporative (at that/the same time)","Crastinal tense (tomorrow)","Contingent mood","Contemporative (at that/the same time)","Converb",
	"Different event; change of event","Debitive","Declarative mood","Deductive evidential","Definite","Definitive","Defocus","Delative case (off of)","Demonstrative","Denominal","Deontic mood","Deobjective","Deontic mood","Dependent","Derivation - derivational","Derivation - derivational","Desiderative mood","Determiner","Detransitivizer; detransitive","Downhill; seaward","Diminutive","Diminutive","Distal; distant","Disjunction; disjunctive","Distal; distant","Distributive","Ditransitive","Donative","Doxastic","Distant past","Downriver; toward the water","Detrimentary","Dual","Dubitative mood","Dubitative mood","Duplicative","Durative aspect","Dynamic aspect","Dynamic aspect","Elative case (out of)","Elative case (out of)","Elative case (out of)","Emphatic; emphasizer","Emphatic; emphasizer","Epenthetic morpheme; epenthetical","Epithet","Essive case","Evitative case","Exclusive person","Exaltive; deferential (high-status register )","Exclusive person","Exclusive","Exclamative","Exessive case","Existential (there is)","Exocentric case","Experiential; eyewitness; direct evidential","Expressive","Existential (there is)","Extended aspect; extendible","Factive","Factive","Familiar; familiar register","Feminine gender","Finite verb","Focus","Future participle","Fraction; fractional (numeral)","Frequentative aspect","Frequentative aspect","Frustrative","Frustrative","False start","Functive case","Gerund; gerundive","Goal focus","Given","Gnomic (generic) aspect","Gnomic (generic) aspect","General tense","Goal trigger","Habitual aspect","Habitual aspect","Habilitive","Hesitation; hesitation particle","Hesternal tense (yesterday)","Historic(al) tense","Humiliative (humble/low-status register )","Hodiernal tense","Honorific","Hortative","Hearsay; reported evidential","Hypothetical mood","Hypothetical mood",
	"Iamitive","Involuntary causative","Involuntary comitative","Ideophone","Ideophone","Ideophone","Instrument focus","Indefinite future","Ignorative","Illative case (into)","Illative case (into)","Immediate past","Imperative mood","Imperative mood","Imperfect","Modal impossibility","Imprecative mood","Inclusive person","Impotential","Inablative","Inactive","Inalienable possession","Inanimate gender","Inclusive person","Inceptive aspect","Inchoative aspect","Inchoative aspect","Inclusive","Indicative","Indeterminate","Indefinite","Indefinite","Indicative mood","Indirect; indirective","Inelative case (from within)","Inessive case (in)","Infinitive","Inferential mood","Inflectional","Inferential mood","Ingressive case","Instrumental","Intensifier; intensive","Intentive","Interrogative","Interessive","Interjection","Interpellative mood","Interjection","Intentional","Intransitive","Introversive","Intensifier; intensive","Intentive","Inverse","Involuntative; involitive","Indirect object (ive)","Indirect object","Immediate past","Imperfective","Irrealis","Iterative aspect","Jussive mood","Kinship affix","Limitative","Masculine gender","Middle voice; medio-passive","Mitigation","Momentane (single-event verb)","Narrative tense","Necessitative","Non-finite","Non-human","Nominalizer; nominalization","Numeral; numerative","Nonvisual experiential (evidential)","Object(ive)","Obligative mood","Obviative","Object focus","Onomatopoeia","Ordinal numeral","Passive voice","Paucal number","Pausal","Pegative case (a special case for the giver)","Perfective aspect","Perlative case","Patient focus; patient voice","Perfective aspect","Pluperfect","Pluractional","Polite register","Possible; modal possibility","Past perfective (= perfect)","Polar question particle","Precative mood (requests)","Predicative affix; predicative","Preposition; prepositional case","Perfect","Progressive aspect","Prohibitive mood (do not!)","Proprietive case","Past tense","Participle","Partitive case","Purposive case","Preverb",
	"Quotative","Reciprocal voice","Reduplication","Reduplication","Referential","Reflexive ( reflexive pronoun; reflexive voice )","Relative clause marker","Remote","Repetitive aspect","Resultative","Respect","Reported evidential","Rhetorical question","Single argument of canonical intransitive verb","Subject; subject agreement","Sceptical","Semelfactive aspect (once)","Sensory evidential mood","Simultaneous aspect; simultaneity","Subjunctive mood","Speculative mood","Stative aspect","Sublocative (under)","Sublative case (onto; down onto)","Suggestive mood","Superelative case (on)","Superlative","Tentative","Topic marker","Trial number","Uncertain future","Uphill; inland","Uncertain mood","Upriver","Unwitnessed past","Valency increasing; valence marker","Verbalizer","Vegetable (food) gender","Venitive (coming towards; andative)","Ventive; ventitive","Vertical","Vialis case","Verbal noun","Vocative case","Volitive mood; volitional","Interrogative pronoun","Wh- question","Witnessed evidential","Witnessed past","Witnessed past","Yes-no question"];
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

	var lines = $("#input").val().trim();
	if (lines == "") {
		lines = $("#input").attr('placeholder');
	}

	lines = lines.split("\n");

	for (let i = 0; i < lines.length; i++) {
		if (lines[i] == "") {
			if (lines[i+1] != "") {
				lines[i] = "$&N;";
			}
		}
		lines[i] = lines[i].replace(/ +(?= )/g,'');
	}

	lines = lines.map($.trim).filter(function (x) { return !(x === ""); });

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
	} else if (markup == "interlinear") {
		interlinearMarkup();
	} else if (markup == "reddit") {
		redditMarkup();
	}

	function zbbMarkup() {
		var gloss = "";
		let i = 0;
		while (i < lines.length) {
			if (lines[i] == "$&N;") {
				lines[i] = "";
			}
			//Third last line or if there are only two lines
			if ((i + 3 == lines.length) || (lines.length == 2)) {
				var normLine = lines[i].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
				i++;
				if (lines[i] == "$&N;") {
					lines[i] = "";
				}
				var glossLine = lines[i].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
				for (let j = 0; j < glossLine.length; j++) {
					if ((typeof normLine !== "undefined") || (typeof glossLine !== "undefined")) {
						if (useSmallCaps == "abbrv sc") {
							///////////////////
							glossLine[j] = splitEntryGlossZbb(glossLine[j], conv);
							//////////////////
						}
						gloss += "[gloss=" + glossLine[j] + "]" + normLine[j] + "[/gloss]";
					} else {
						alert("Gloss and above line do not line up");
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
			if (lines[m] == "$&N;") {
				lines[m] = "";
			}
			// Third last line
		  if (m + 3 == lines.length) {
				gloss += "\\begin{exe}\n\\ex\n\\gll " + lines[m] + "\\\\\n";
			} else if (m + 2 == lines.length) {
				if (useSmallCaps == "abbrv sc") {
					var entries = lines[m].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
					for (let o = 0; o < entries.length; o++) {
						gloss += splitEntryGlossLatex(entries[o], conv);
						if (o + 1 != entries.length) {
							gloss += " ";
						}
					}
					gloss += "\\\\\n";
				} else {
					gloss += lines[m] + "\\\\\n";
				}
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
				var line = lines[a].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
				if (maxColumns <= line.length) {
					maxColumns = line.length;
				}
				table[a] = new Array();
				for (let b = 0; b < line.length; b++) {
					if (line[b] == "$&N;") {
						line[b] = "";
					}
					table[a].push(line[b]);
				}
			}
		}
		for (let j = 0; j < maxColumns; j++) {
			for (let i = 0; i < noOfLines; i++) {
				if (table[i][j] != null) {
					gloss += table[i][j];
				} else {
					gloss += ""
				}
				if (i != noOfLines - 1) {
					gloss += "//";
				}
			}
			if (j != maxColumns - 1) {
				gloss += "|";
			}
		}
		gloss = "<gbl=" + noOfLines + ">" + gloss + "</gbl>\n";
		var lastLine = lines[noOfLines].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
		gloss += lastLine.join(" ");

		conv.finish(gloss);
	}
	function interlinearMarkup() {
		gloss = "";
		table = new Array();
		maxColumns = 0;

		noOfLines = lines.length - 1;
		for (let a = 0; a < lines.length; a++) {
			// If last line
			if (a + 1 == lines.length) {

			} else {
				var line = lines[a].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
				if (maxColumns <= line.length) {
					maxColumns = line.length;
				}
				table[a] = new Array();
				for (let b = 0; b < line.length; b++) {
					if (a + 2 == lines.length) {
						table[a].push(splitEntryGloss(line[b], conv));
					} else {
						table[a].push(line[b]);
					}
				}
			}
		}
		for (let j = 0; j < maxColumns; j++) {
			gloss += "  <div class='gll'>";
			for (let i = 0; i < noOfLines; i++) {
				////
				var skipline = false;
				var toMatch = i + 1;
				toMatch.toString();
				stringInterlinear = nonInterlinear.join(',');
				var includes = stringInterlinear.indexOf(toMatch);
				if (includes != -1) {
					skipline = true;
				}
				////

				if (table[i][0] == "$&N;") {
					gloss += "";
				} else if (table[i][j] != null) {
					gloss += table[i][j];
				} else {
					gloss += "?"
				}
				if (i != noOfLines - 1) {
					gloss += "<br/>";
				}
			}
			gloss += "</div>\n";

		}
		var lastLine = lines[noOfLines].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
		gloss += "  <div>" + lastLine.join(" ") + "</div>\n";
		gloss = "<div>\n" + gloss + "</div>";

		conv.finishInterlinear(gloss);
	}
	function wikiMarkup() {
		var output = "";
		///////
		maxColumns = 0;
		for (let a = 0; a < lines.length; a++) {
			var line = lines[a].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });

			var toMatch = a + 1;
			toMatch.toString();
			stringInterlinear = nonInterlinear.join(',');
  		var includes = stringInterlinear.indexOf(toMatch);
			if (includes != -1) {
				skipline = true;
			} else if (a + 1 == lines.length) {

			} else if (maxColumns <= line.length) {
				maxColumns = line.length;
			}
		}

		for (let i = 0; i < lines.length; i++) {
			var parsedEntry = "";
			skipline = false;
			
			var toMatch = i + 1;
			toMatch.toString();
			stringInterlinear = nonInterlinear.join(',');
  		var includes = stringInterlinear.indexOf(toMatch);
			if (includes != -1) {
				skipline = true;
			}
			//////
			var entries = lines[i].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
			// Do something if is the second last iteration of the array
			if ((i + 2 == lines.length) && (useAbbrv || useSmallCaps)) {
				for (let b = 0; b < maxColumns; b++) {
					if (entries[b] == null || entries[b] == "$&N;") {
						parsedEntry += "|?\n";
					} else {
						parsedEntry += "|" + splitEntryGlossWiki(entries[b], conv) + "\n";
					}
				}
				output += parsedEntry;
				//Do something if skip line 
			} else if (skipline) {
				output += "| colspan='" + maxColumns + "'|" + lines[i] + "\n|-\n";
				//Blank line
			} else if (lines[i] == "$&N;") {
				output += "| colspan='" + maxColumns + "'|" + "\n|-\n";
				//Else or last line
			} else if (i + 1 == lines.length) {
				output += "|-\n| colspan='" + maxColumns + "'|" + lines[i];
				//Else do normal line
			} else {
				for (let c = 0; c < maxColumns; c++) {
					if (entries[c] == null) {
						parsedEntry += "|" + "?" + "\n";
					} else {
						parsedEntry += "| " + entries[c] + "\n";
					}
				}
				parsedEntry += "|-\n";
				output += parsedEntry;
			}
			parsedEntry = "";
		}
		conv.finishWiki(output);
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
			var entriesZ = lines[m].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
			for (let n = 0; n < entriesZ.length; n++) {
				var noDiacriticsEntry = entriesZ[n].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
				if (!skipline && m + 1 != lines.length) {
					if (typeof wordLength[n] === "undefined") {
						wordLength.push(noDiacriticsEntry.length);
					}
					if (wordLength[n] <= noDiacriticsEntry.length) {
						wordLength[n] = noDiacriticsEntry.length;
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
			var line = lines[i].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
			for (let j = 0; j < line.length; j++) {
				// If small caps, turn each glossing abbreviation to small caps if abbreviation is all caps.
				if (useSmallCaps == "abbrv sc") {
					///////////////////
					line[j] = splitEntryGlossZbb(line[j], conv);
					//////////////////
				}
				if (line[j] == "$&N;") {
					line[j] = ""
				} else if (!skipline && i + 1 != lines.length) {
					// breack diacritical characters to get true length of entry
					var noDiacritics = line[j].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
					while (noDiacritics.length < wordLength[j] && j != line.length - 1) {
						line[j] += " ";
						noDiacritics += " ";
					}
				}
			}
			gloss += line.join(" ") + "\n";
		}
		conv.finishPlainText(gloss);
	}
	function htmlTableMarkup() {
		maxColumns = 0;
		for (let a = 0; a < lines.length; a++) {
			var line = lines[a].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });

			var toMatch = a + 1;
			toMatch.toString();
			stringInterlinear = nonInterlinear.join(',');
  		var includes = stringInterlinear.indexOf(toMatch);
			if (includes != -1) {
				skipline = true;
			} else if (a + 1 == lines.length) {

			} else if (maxColumns <= line.length) {
				maxColumns = line.length;
			}
		}

		for (let i = 0; i < lines.length; i++) {
			var skipline = false;
			var parsedEntry = "";

			var toMatch = i + 1;
			toMatch.toString();
			stringInterlinear = nonInterlinear.join(',');
  		var includes = stringInterlinear.indexOf(toMatch);
			if (includes != -1) {
				skipline = true;
			}

			var entries = lines[i].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
			// Do something if is the second last iteration of the array
			if ((i + 2 == lines.length) && (useAbbrv || useSmallCaps)) {
				for (let b = 0; b < entries.length; b++) {
					parsedEntry += "<td>" + splitEntryGloss(entries[b], conv) + "</td>";
				}
				conv.addLine(parsedEntry);
				//Do something if skip line or last line
			} else if (lines[i] == "$&N;") {
				conv.addSingleLineEntry("<br/>", maxColumns);
			} else if (skipline || i + 1 == lines.length) {
				conv.addSingleLineEntry(lines[i], maxColumns);
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
	function redditMarkup() {
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
			var entriesZ = lines[m].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
			for (let n = 0; n < entriesZ.length; n++) {
				var noDiacriticsEntry = entriesZ[n].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
				if (!skipline && m + 1 != lines.length) {
					if (typeof wordLength[n] === "undefined") {
						wordLength.push(noDiacriticsEntry.length);
					}
					if (wordLength[n] <= noDiacriticsEntry.length) {
						wordLength[n] = noDiacriticsEntry.length;
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
			var line = lines[i].split(/[ \t]+/).map($.trim).filter(function (x) { return !(x === ""); });
			for (let j = 0; j < line.length; j++) {
				// If small caps, turn each glossing abbreviation to small caps if abbreviation is all caps.
				if (useSmallCaps == "abbrv sc") {
					///////////////////
					line[j] = splitEntryGlossZbb(line[j], conv);
					//////////////////
				}
				if (line[j] == "$&N;") {
					line[j] = ""
				} else if (!skipline && i + 1 != lines.length) {
					// breack diacritical characters to get true length of entry
					var noDiacritics = line[j].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
					while (noDiacritics.length < wordLength[j] && j != line.length - 1) {
						line[j] += " ";
						noDiacritics += " ";
					}
				}
			}
			// Last line or first line
			if (i + 1 == lines.length && lines.length != 2) {
				gloss += line.join(" ") + "\n";
			} else {
				gloss += "    " + line.join(" ") + "\n";
			}
		}
		conv.finish(gloss);
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
			if (word == word.toUpperCase() && useSmallCaps == "abbrv sc") {
				result = result.concat("<a class='sc'>", word, "</a>");
			} else {
				result = result.concat(word);
			}
		} else if (useAbbrv) {
			if (word == word.toUpperCase() && useSmallCaps == "abbrv sc") {
				result = result.concat("<abbr class='", useSmallCaps, "' title='", glossexpl, "'>", word, "</abbr>");
			} else {
				result = result.concat("<abbr class='abbrv' title='", glossexpl, "'>", word, "</abbr>");
			}
		} else if (useSmallCaps == "abbrv sc") {
			result = result.concat("<a class='sc'>", word, "</a>");
		} else {
			result = result.concat(word);
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
	if (useSmallCaps == "abbrv sc") {
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
		} else if (useSmallCaps == "abbrv sc") {
			result = result.concat("{{sc|", word, "}}");
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

function toSmallCaps(input) {
	var table = [];
	table["A"] = "ᴀ";
	table["B"] = "ʙ";
	table["C"] = "ᴄ";
	table["D"] = "ᴅ";
	table["E"] = "ᴇ";
	table["F"] = "ғ";
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
	table["S"] = "s";
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
	this.orig += "  <tr>" + input + "</tr>" + "\n";
};
Converter.prototype.addSingleLineEntry = function (input, maxLines) {
	this.orig += "  <tr><td colspan=" + maxLines + ">" + input + "</td></tr>" + "\n";
};
Converter.prototype.finishTable = function () {
	this.output = "<table>" + "\n" + this.orig + "\n" + "</table><br>" + "<textarea id='output' spellcheck='false' readonly>"
		+ "\n" + "<table>" + "\n" + this.orig + "</table>" + "</textarea>";
};
Converter.prototype.finishWiki = function (input) {
	this.output = "<textarea id='output' spellcheck='false' readonly>{| class='wikitable'\n|-\n" + input + "\n|}</textarea>";
};
Converter.prototype.finish = function (input) {
	this.output = "<textarea id='output' spellcheck='false' readonly>" + input + "</textarea>";
}
Converter.prototype.finishInterlinear = function (input) {
	this.output = input + "<br><textarea id='output' spellcheck='false' readonly>" + input + "</textarea>";
}
Converter.prototype.finishPlainText = function (input) {
	this.output = "<pre>" + input + "</pre><textarea id='output' spellcheck='false' readonly>" + input + "</textarea>";
}

// Save input text in user's localstorage for next session
function setLocalStorage() {
	localStorage.setItem('input', $('#input').val());
	localStorage.setItem('notInterlinear', $('#notInterlinear').val());
	localStorage.setItem('abbrvInput', $('#abbrvInput').val());
	localStorage.setItem('abbrvDelimiterInput', $('#abbrvDelimiterInput').val());
}
// Populate input fields with data in local storage on window load if it exists
window.onload = function () {
	if (localStorage.hasOwnProperty('notInterlinear')) {
		$('#input').val(localStorage.getItem('input'));
		$('#notInterlinear').val(localStorage.getItem('notInterlinear'));
		$('#abbrvInput').val(localStorage.getItem('abbrvInput'));
		$('#abbrvDelimiterInput').val(localStorage.getItem('abbrvDelimiterInput'));
	}
};
// Check for markup submit button and colour it blue
$(window).load(function () {
	$("[name='markupButton']").click(function () {
		glossarize($(this).attr('id'));
		var selection = document.querySelectorAll("#switch-field input");
		for (i = 0; i < selection.length; i++) {
			selection[i].classList.remove('checked');
		}
		$(id = $(this)).addClass("checked");
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
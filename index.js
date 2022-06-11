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
	var origAbbreviations = ["1","2","3","4","12","ACC","AN","ANIM","C","CLF","DAT","ERG","F","FUT","GEN","HUM","INAN","INST","INSTR","LOC","M","N","NEG","NEUT","NOM","OBL","PAST","PL","POSS","PRS","Q","R","SG","?","12DU","12P","12PAU","12S","12T","1DU","1E","1EDU","1EP","1EPAU","1ES","1GEN","1P","1PAU","1S","1T","2DU","2GEN","2P","2PAU","2S","2T","3DU","3GEN","3P","3PAU","3S","3SF","3SM","3T","1p","1pl","1s","1sg","2p","2pl","2s","2sg","3p","3pl","3s","3sg","A","ABESS","ABL","ABS","ABSL","AC","ACCOM","ACP","ACR","ADDR","ADEL","ADESS","ADJ","ADJZ","ADM","ADV","ADVS","ADVZ","AF","AFF","AFFT","AFW","AGN","AGR","ALL","ALLOC","AND","ANTE","ANTESS","ANTIC","ANTIP","AO","AOR","AP","APPL","APRX","APUD","ARG","ART","ASRT","ASSUM","AT","ATR","ATTEN","AUD","AUG","AUX","AVERT","AVR","BEN","BF","CAR","CARD","CAUS","CENT","CERT","CESS","CF","CMP","CMPD","CNJ","CNS","CNSQ","CNTF","COL","COM","COMIT","COMP","COMPL","COMPLR","COMPUL","CONC","COND","CONF","CONJC","CONN","CONR","CONT","CONTEMP","CONTR","CONV","COOP","COORD","COP","COR","COREF","COTEMP","CRAS","CTG","CTM","CVB","DE","DEB","DECL","DED","DEF","DEFIN","DEFOC","DEL","DEM","DENOM","DEO","DEOBJ","DEONT","DEP","DER","DERIV","DES","DET","DETR","DH","DIM","DIMIN","DIS","DISJ","DIST","DISTR","DITR","DON","DOX","DP","DR","DTR","DU","DUB","DUBIT","DUPLIC","DUR","DYN","DYNM","EL","ELA","ELAT","EMP","EMPH","EPIT","ESS","EVIT","EX","EXAL","EXC","EXCL","EXCLAM","EXESS","EXIST","EXO","EXP","EXPR","EXST","EXT","FACT","FAM","FEM","FIN","FOC","FPRT","FRACT","FREQ","FRQ ","FRUS","FRUST","FS","FUNC","GER","GF","GIV","GNO","GNOMIC","GNT","GT","HAB","HABIT","HBL","HES","HEST","HIST","HML","HOD","HON","HORT","HRS","HYP","HYPO","IAM","IC","ICOM","IDEO","IDEOPH","IDPH","IF","IFUT","IGNOR","ILL","ILLA","IMMED","IMP","IMPER","IMPF","IMPOSS","IMPR","IN","INAB","INABL","INACT","INAL","INANIM","INC","INCEP","INCH","INCHO","INCL","IND","INDET","INDF","INDEF","INDIC","INDIR","INEL","INESS","INF","INFER","INFL","INFR","ING","INS","INTENS","INTENTV","INTER","INTERESS","INTERJ","INTERP","INTJ","INTL","INTR","INTRV","INTS","INTV","INV","INVOL","IO","IOBJ","IP","IPFV","IRR","ITER","JUS","LIM","MASC","MID","MIT","MOM","NARR","NEC","NFIN","NH","NMLZ","NUM","NVEXP","O","OBLIG","OBJ","OBV","OFC","ONOM","OPT","ORD","PASS","PAU","PAUS","PEG","PERFV","PERL","PF","PFV","PLUP","PLUR","POL","POSB","PPFV","PQP","PREC","PRED","PREP","PRF","PROG","PROH","PROP","PST","PTCP","PTV","PURP","PVB","QUOT","RECP","RED","REDUP","REF","REFL","REL","REM","REP","RES","RESP","RPRT","RQ","SBJ","SCEP","SEM","SENS","SIM","SJV","SPECL","STAT","SUB","SUBL","SUG","SUPEL","SUPL","TENT","TOP","TRI","UF","UH","UNCERT","UR","UWPST","V","VAL","VBLZR","VEG","VEN","VENT","VERT","VIA","VN","VOC","VOL","WH","WHQ","WIT","WP","WPST","YNQ","DTRNZ","ER","EXH","HSY","MAL","PDS","FRUSTR","FDS ","FSSI","FSST","PSSI","PSST","SDS","SSSI","SSST","AB","ANTIAPP","TCV","PFVCVB","AS","2POSS","3POSS","1POSS","PSR","SDS","SE","SS","U","UC","RLN","SBEN","PERSE","EXPECT"];
	var origExplanations = ["First person (speaker)","Second person (listener)","Third person (referent)","Fourth person (obviative or generic)","First person inclusive","Accusative case","Animate gender","Animate gender","Common gender","Classifier","Dative case","Ergative case","Feminine gender","Future","Genitive case","Human gender; anthropic gender","Inanimate gender","Instrumental case","Instrumental case","Locative case","Masculine gender","Neuter gender","Negation; negative","Neuter","Nominative case","Oblique case","Past","Plural","Possessive; possessor","Present tense","Question word or particle","Rational gender (thinking beings)","Singular","Zero (null) morpheme","First person inclusive dual","First person inclusive plural","First person inclusive paucal","First person inclusive singular","First person inclusive trial","First person dual (you two)","First person exclusive","First person exclusive dual","First person exclusive plural","First person exclusive paucal","First person inclusive singular","First person genitive (my or our)","First person plural (we)","First person paucal","First person singular (I; me)","First person trial","Second person dual","Second person genitive (your)","Second person plural","Second person paucal","Second person singular (you)","Second person trial","Third person dual","Third person genitive (their)","Third person plural (they)","Third person paucal","Third person singular (he; she; it)","Third person singular feminine (she)","Third person singular masculine (he)","Third person trial","First person plural (we)","First person plural (we)","First person singular (I)","First person singular (I)","Second person plural (you all)","Second person plural (you all)","Second person singular (you)","Second person singular (you)","Third person plural (they)","Third person plural (they)","Third person singular (he; she; it)","Third person singular (he; she; it)","Agent","Abessive case","Ablative case (from)","Absolutive case","Absolute","Anticausative","Accompanier","Accomplishment","Actor role","Addressive","Adelative","Adessive case (at)","Adjective","Adjectivizer","Admonitive mood (warning)","Adverb(ial); adverbial case","Adversative","Adverbializer","Actor; agent focus; agent voice","Affirmative","Affective case","Away from water","Agent nominalization","Agreement","Allative case","Allocutive agreement","Andative (going towards)","In front of","Antessive case (before)","Anticausative","Antipassive","Agent-orientated verb","Aorist","Antipassive voice","Applicative","Approximative","Near; in the vicinity of","Argumentative","Article","Assertive mood","Assumptive mood; assumed","Agent trigger","Attributive","Attenuative","Auditory evidential","Augmentative","Auxiliary","Avertive","Aversative",
	"Benefactive case (for)","Beneficiary focus","Caritive case","Cardinal numeral","Causative","Centric case","Certainty (evidential)","Cessative","Circumstantial focus","Comparative","Compound","Conjunction","Construct state","Consequential mood","Counterfactual conditional","Collective number","Comitative case (together with)","Comitative case (together with)","Complementizer","Completive aspect","Complementizer","Compulsional","Concessive","Conditional mood","Confirmational","Conjectural (evidential)","Connective particle","Connector","Continuous aspect; continuative aspect","Contemporative (at that/the same time)","Contrastive; contranstive focus","Converb","Cooperative","Coordination","Copula","Coreference; coreferential","Coreference; coreferential","Contemporative (at that/the same time)","Crastinal tense (tomorrow)","Contingent mood","Contemporative (at that/the same time)","Converb","Different event; change of event","Debitive","Declarative mood","Deductive evidential","Definite","Definitive","Defocus","Delative case (off of)","Demonstrative","Denominal","Deontic mood","Deobjective","Deontic mood","Dependent","Derivation; derivational","Derivation; derivational","Desiderative mood","Determiner","Detransitivizer; detransitive","Downhill; seaward","Diminutive","Diminutive","Distal; distant","Disjunction; disjunctive","Distal; distant","Distributive","Ditransitive","Donative","Doxastic","Distant past","Downriver; toward the water","Detrimentary","Dual","Dubitative mood","Dubitative mood","Duplicative","Durative aspect","Dynamic aspect","Dynamic aspect","Elative case (out of)","Elative case (out of)","Elative case (out of)","Emphatic; emphasizer","Emphatic; emphasizer","Epithet","Essive case","Evitative case","Exclusive person","Exaltive; deferential (high-status register )","Exclusive person","Exclusive","Exclamative","Exessive case","Existential (there is)","Exocentric case","Experiential; eyewitness; direct evidential","Expressive","Existential (there is)","Extended aspect; extendible","Factive","Familiar; familiar register","Feminine gender","Finite verb","Focus","Future participle","Fraction; fractional (numeral)","Frequentative aspect","Frequentative aspect","Frustrative","Frustrative","False start","Functive case","Gerund; gerundive","Goal focus","Given","Gnomic (generic) aspect","Gnomic (generic) aspect","General tense","Goal trigger","Habitual aspect","Habitual aspect","Habilitive","Hesitation; hesitation particle","Hesternal tense (yesterday)","Historic(al) tense","Humiliative (humble/low-status register)","Hodiernal tense","Honorific","Hortative","Hearsay; reported evidential","Hypothetical mood","Hypothetical mood",
	"Iamitive","Involuntary causative","Involuntary comitative","Ideophone","Ideophone","Ideophone","Instrument focus","Indefinite future","Ignorative","Illative case (into)","Illative case (into)","Immediate past","Imperative mood","Imperative mood","Imperfect","Modal impossibility","Imprecative mood","Inclusive person","Impotential","Inablative","Inactive","Inalienable possession","Inanimate gender","Inclusive person","Inceptive aspect","Inchoative aspect","Inchoative aspect","Inclusive","Indicative","Indeterminate","Indefinite","Indefinite","Indicative mood","Indirect; indirective","Inelative case (from within)","Inessive case (in)","Infinitive","Inferential mood","Inflectional","Inferential mood","Ingressive case","Instrumental","Intensifier; intensive","Intentive","Interrogative","Interessive","Interjection","Interpellative mood","Interjection","Intentional","Intransitive","Introversive","Intensifier; intensive","Intentive","Inverse","Involuntative; involitive","Indirect object (ive)","Indirect object","Immediate past","Imperfective","Irrealis","Iterative aspect","Jussive mood","Limitative","Masculine gender","Middle voice; medio-passive","Mitigation","Momentane (single-event verb)","Narrative tense","Necessitative","Non-finite","Non-human","Nominalizer; nominalization","Numeral; numerative","Nonvisual experiential (evidential)","Object(ive)","Obligative mood","Object(ive)","Obviative","Object focus","Onomatopoeia","Optative mood","Ordinal numeral","Passive voice","Paucal number","Pausal","Pegative case (a special case for the giver)","Perfective aspect","Perlative case","Patient focus; patient voice","Perfective aspect","Pluperfect","Pluractional","Polite register","Possible; modal possibility","Past perfective","Polar question particle","Precative mood (requests)","Predicative affix; predicative","Preposition; prepositional case","Perfect","Progressive aspect","Prohibitive mood (do not!)","Proprietive case","Past tense","Participle","Partitive case","Purposive case","Preverb","Quotative","Reciprocal voice","Reduplication","Reduplication","Referential","Reflexive (reflexive pronoun; reflexive voice)","Relative clause marker","Remote","Repetitive aspect","Resultative","Respect","Reported evidential","Rhetorical question","Subject; subject agreement","Sceptical","Semelfactive aspect (once)","Sensory evidential mood","Simultaneous aspect; simultaneity","Subjunctive mood","Speculative mood","Stative aspect","Sublocative (under)","Sublative case (onto; down onto)","Suggestive mood","Superelative case (on)","Superlative","Tentative","Topic marker","Trial number","Uncertain future","Uphill; inland","Uncertain mood","Upriver","Unwitnessed past","Vegetable (food) gender","Valency increasing; valence marker","Verbalizer","Vegetable (food) gender","Venitive (coming towards; andative)","Ventive; ventitive","Vertical","Vialis case","Verbal noun","Vocative case","Volitive mood; volitional","Interrogative pronoun","Wh- question","Witnessed evidential","Witnessed past","Witnessed past","Yes-no question","Detransitivizer","Ergative","Exhortative","Hearsay","Malefactive","Previous different subject","Frustrative","Subsequent different subject","Subsequent same subject intransitive","Subsequent same subject transitive","Previous same subject intransitive","Previous same subject transitive","Simultaneous different subject","Simultaneous same subject intransitive","Simultaneous same subject transitive","Absolutive","aniapplicative","Temporal Converb","Perfective Converb","aseverative","Second person possessive","Second person possessive","First person possessive","Possessor","Simultaneous event different subject","Same event","Same-subject","Uninflected","Upcoast","Relational","Self-benefactive","Personal experience","expectational"];
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
	$("#out").html(conv.output);
	$("#output").focus();
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
		lines[i] = lines[i].replace(/ +(?= )/g,'').trim();
	}
	lines = lines.map($.trim).filter(function (x) { return !(x === ""); });
	for (let i = 0; i < lines.length; i++) {
		if (lines[i] == "$&N;") {
			lines[i] = "";
		}
	}

	switch(markup) {
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
		case "reddit":
			redditMarkup();
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
		htmlOutput = "<div id='outerTable'><table>" + "\n" + htmlOutput + "</table></div>";
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
				while (noDiChar < noDiacritics.length){
					noDiChar++
					if (noDiacritics[noDiChar] == "˥"){
						noDiChar++
						if (noDiacritics[noDiChar] == "˥"){
							noDiChar++
							noDiacriticsLength--
							if (noDiacritics[noDiChar] == "˥"){
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
					while (noDiChar < noDiacritics.length){
						noDiChar++
						if (noDiacritics[noDiChar] == "˥"){
							noDiChar++
							if (noDiacritics[noDiChar] == "˥"){
								noDiChar++
								noDiacriticsLength--
								if (noDiacritics[noDiChar] == "˥"){
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
				while (noDiChar < noDiacritics.length){
					noDiChar++
					if (noDiacritics[noDiChar] == "˥"){
						noDiChar++
						if (noDiacritics[noDiChar] == "˥"){
							noDiChar++
							noDiacriticsLength--
							if (noDiacritics[noDiChar] == "˥"){
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
					while (noDiChar < noDiacritics.length){
						noDiChar++
						if (noDiacritics[noDiChar] == "˥"){
							noDiChar++
							if (noDiacritics[noDiChar] == "˥"){
								noDiChar++
								noDiacriticsLength--
								if (noDiacritics[noDiChar] == "˥"){
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
	function redditMarkup() {
		var wordLength = [];
		var redditOutput = "";
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
				while (noDiChar < noDiacritics.length){
					noDiChar++
					if (noDiacritics[noDiChar] == "˥"){
						noDiChar++
						if (noDiacritics[noDiChar] == "˥"){
							noDiChar++
							noDiacriticsLength--
							if (noDiacritics[noDiChar] == "˥"){
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
					inter_num = inter_num + 5;
				}
				inter_num++
			}
			var line = lines[col_num].split(/[ \t]+/);
			for (let row_num = 0; row_num < line.length; row_num++) {
				// If small caps, turn each glossing abbreviation to small caps if abbreviation is all caps.
				if (useSmallCaps) {
					/////////////////
					line[row_num] = splitEntryGlossZbb(line[row_num], conv);
					//////////////////
				}
				if (!skipline && col_num + 1 != lines.length) {
					// break diacritical characters to get true length of entry
					var noDiacritics = line[row_num].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
					noDiacritics = noDiacritics.replace(/[\u02E5-\u02E9]/g, "˥");
					noDiacritics = noDiacritics.replace(/[\uA708-\uA716]/g, "˥");

					let noDiacriticsLength = noDiacritics.length
					noDiChar = 0;
					while (noDiChar < noDiacritics.length){
						noDiChar++
						if (noDiacritics[noDiChar] == "˥"){
							noDiChar++
							if (noDiacritics[noDiChar] == "˥"){
								noDiChar++
								noDiacriticsLength--
								if (noDiacritics[noDiChar] == "˥"){
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
			// Last line or first line
			if (col_num + 1 == lines.length && lines.length != 2) {
				redditOutput += line.join(" ") + "\n";
			} else {
				redditOutput += "    " + line.join(" ") + "\n";
			}
		}
		conv.finish(redditOutput);
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
	this.output = "<textarea id='output' spellcheck='false'>" + input + "</textarea>";
}
Converter.prototype.finishAndShow = function (input) {
	if (this.useAcknowledgement){
		let ack = "<i class='gmg-ack'>Gloss provided by <a href='https://neonnaut.github.io/'>Gloss My Gloss</a></i>";
		this.output = input + ack + "<br>" + "<br><textarea id='output' spellcheck='false'>" + input + "\n" + ack + "</textarea>";
	} else {
		this.output = input + "<br><textarea id='output' spellcheck='false'>" + input + "</textarea>";
	}
}
Converter.prototype.finishPlainText = function (input) {
	this.output = "<pre><code>" + input + "</code></pre><textarea id='output' spellcheck='false'>" + input + "</textarea>";
}
Converter.prototype.finishBlock = function (input) {
	this.output = "<textarea id='output' spellcheck='false'>`\n" + input + "`</textarea>";
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

		// Select all text in the input
		$('#input').focus().select();
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
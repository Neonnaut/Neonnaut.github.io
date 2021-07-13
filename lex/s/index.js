function glossarize(markup) {

	//CONVERT
	var conv = new Converter();

	convert(conv);
	$("#out").html(conv.output);
	$("#output").focus();
	$("#output").select();
}

function convert(conv) {
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
	
	doConvert();

	function doConvert() {
		for (let col_num = 0; col_num < lines.length; col_num++) {
			var entriesZ = lines[col_num].split(/[ \t]+/);
			for (let row_num = 0; row_num < entriesZ.length; row_num++) {
				var noDiacriticsEntry = entriesZ[row_num].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
				if (!skipline && col_num + 1 != lines.length) {
					if (typeof wordLength[row_num] === "undefined") {
						wordLength.push(noDiacriticsEntry.length);
					}
					if (wordLength[row_num] <= noDiacriticsEntry.length) {
						wordLength[row_num] = noDiacriticsEntry.length;
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
					while (noDiacritics.length < wordLength[row_num] && row_num != line.length - 1) {
						line[row_num] += " ";
						noDiacritics += " ";
					}
				}
			}
			plainOutput += line.join(" ") + "\n";
		}
		conv.finishPlainText(plainOutput);
	}
	

var Converter = function () {
	this.output = "";
};
Converter.prototype.finishAndShow = function (input) {
	this.output = input + "<br><textarea id='output' spellcheck='false'>" + input + "</textarea>";
}

$(window).load(function () {
	$("[name='markupButton']").click(function () {
		glossarize($(this).attr('id'));
		var selection = document.querySelectorAll("#switch-field input");
		for (i = 0; i < selection.length; i++) {
			selection[i].classList.remove('checked');
		}
		$(id = $(this)).addClass("checked");
	});
});
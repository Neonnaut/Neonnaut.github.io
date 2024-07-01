
function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if (elem != null) {
        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if (elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

function hideIPA() {
    var x = document.getElementById("IPA");
    if (x.style.display === "none") {
        x.style.display = "table";
    } else {
        x.style.display = "none";
    }
}

function hideIPAsuper() {
    var x = document.getElementById("IPAsuper");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function hideSAMPA() {
    var x = document.getElementById("SAMPA");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function hideInfo() {
    var x = document.getElementById("Info");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function hideLog() {
    var x = document.getElementById("Log");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function hideIssues() {
    var x = document.getElementById("Issues");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function CopyClip() {
    var copyText = document.getElementById("ipaBox");

    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
    document.getElementById("ipaBox").focus();
}


function doc_keyUp(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 8) {
        ClearFields();
    }
    else if (e.ctrlKey && e.shiftKey && e.keyCode == 32) {
        CopyClip();
    }
    else if (e.ctrlKey && e.shiftKey && e.keyCode == 13) {
        ResetClicked();
    }
}
document.addEventListener('keyup', doc_keyUp, false);


function ClearFields() {

    document.getElementById("sampaBox").value = "";
    document.getElementById("ipaBox").value = "";
    document.getElementById("ipaBox").focus();
}

var classes = ["Cons", "ConsX", "ConsN", "Vowel", "VowelX", "Other", "OtherX", "Supra", "Tone", "Diac", "DiacX"];

function ResetClicked() {
    for (j = 0; j < classes.length; j++) {
        var elems = document.getElementsByClassName(classes[j] + "Clicked");
        for (i = elems.length - 1; i >= 0; i--) {
            elems[i].className = classes[j];
        }
    }
}

function writeSampa(event, x, y) {
    var e = document.getElementById("ipaBox");
    var savePos = e.selectionStart;
    e.value = e.value.slice(0, savePos) + x + e.value.slice(savePos);
    TranslateIPA()
    setCaretPosition("ipaBox", savePos + x.length);
    var t = event.target;
    var c = t.className;

    if (c.match(/Clicked/)) {
        // t.className = c.replace("Clicked", "");
    }
    else {
        document.getElementById('symbolsUsed').style.display = 'inline'; //show used toolbar

        // list of used symbols
        var symbolsList = document.getElementById('symbolsList').getElementsByTagName('a');

        let newSymbolsList = document.getElementById('symbolsList').cloneNode(true);
        //newSymbolsList.innerHTML = '';

        if (symbolsList.length == 0) {
            let newATag = document.createElement('a');
            let newContent = document.createTextNode(t.innerHTML);
            newATag.appendChild(newContent);
            newATag.setAttribute("onclick", t.getAttribute("onclick"));
            newSymbolsList.appendChild(newATag); //Append new a to empty div
        } else {
            var triggered = false;
            for (var i = 0; i < symbolsList.length; i++) {
                myList = newSymbolsList.children

                if (myList[i].innerHTML != t.innerHTML && triggered == false) {
                    // Do nothing
                } else {
                    triggered = true;
                }
            }

            if (triggered == false) {
                let newATag = document.createElement('a');
                let newContent = document.createTextNode(t.innerHTML);
                newATag.appendChild(newContent);
                newATag.setAttribute("onclick", t.getAttribute("onclick"));
                //Append new a to div
                newSymbolsList.insertBefore(newATag, newSymbolsList.firstChild);
            }
        }

        if (newSymbolsList.children.length > 10) {
            newSymbolsList.removeChild(newSymbolsList.lastChild)
        }

        document.getElementById('symbolsList').innerHTML = newSymbolsList.innerHTML


    }
}


function TranslateSAMPA() {
    var s = document.getElementById("sampaBox").value;

    document.getElementById("ipaBox").value = x2i(s);
}

function TranslateIPA() {
    var s = document.getElementById("ipaBox").value;

    document.getElementById("sampaBox").value = i2x(s);
}

function x2i(tin) {
    tout = "";
    for (i = 0; i < tin.length; i++) {
        cc = tin.charAt(i);
        cn = tin.charAt(i + 1);
        ce = tin.charAt(i + 2);
        cg = tin.charAt(i + 3);
        switch (cn) {
            case '`': {
                cd = cc.charCodeAt(0);
                switch (cc) {
                    case '@': cd = 602; break;
                    case 'd': cd = 598; break;
                    case 'l': cd = 621; break;
                    case 'n': cd = 627; break;
                    case 'r': cd = 637; break;
                    case 's': cd = 642; break;
                    case 't': cd = 648; if (ce == '_', cg == '!') { cd = 451; i += 2; } break;
                    case 'z': cd = 656; break;
                    case '_': cd = 734; break;
                    default: i--;
                }
                cx = String.fromCharCode(cd);
                i++;
            }
                break;
            case '\\': {
                cd = 42;
                ii = 1;
                switch (cc) {
                    case '!': cd = 451; break;
                    case '-': cd = 8255; break;
                    case '3': cd = 606; break;
                    case ':': cd = 721; break;
                    case '<': cd = 674; break;
                    case '=': cd = 450; break;
                    case '>': cd = 673; break;
                    case '?': cd = 661; break;
                    case '@': cd = 600; break;
                    case 'B': cd = 665; break;
                    case 'G': if (ce != '_') cd = 610; else { cd = 667; ii = 3; } break;
                    case 'H': cd = 668; break;
                    case 'J': if (ce != '_') cd = 607; else { cd = 644; ii = 3; } break;
                    case 'K': cd = 622; break;
                    case 'L': cd = 671; break;
                    case 'M': cd = 624; break;
                    case 'N': cd = 628; break;
                    case 'O': cd = 664; break;
                    case 'R': cd = 640; break;
                    case 'X': cd = 295; break;
                    case 'b': cd = 11377; break;
                    case 'g': cd = 609; break;
                    case 'h': cd = 614; break;
                    case 'i': cd = 616; break;
                    case 'j': cd = 669; break;
                    case 'l': cd = 634; break;
                    case 'p': cd = 632; break;
                    case 'r': if (ce != '`') cd = 633; else { cd = 635; ii = 2; } break;
                    case 's': cd = 597; break;
                    case 'u': cd = 649; break;
                    case 'v': cd = 651; break;
                    case 'x': cd = 615; break;
                    case 'z': cd = 657; break;
                    case '|': if (ce != '|') cd = 448; else { cd = 449; ii = 3; } break;
                }
                cx = String.fromCharCode(cd);
                i += ii;
            }
                break;
            case '_':
                if (ce == '<') {
                    cd = 42;
                    switch (cc) {
                        case 'b': cd = 595; i += 2; break;
                        case 'd': cd = 599; i += 2; break;
                        case 'g': cd = 608; i += 2; break;
                    }
                    cx = String.fromCharCode(cd);
                    break;
                }
                else if (ce == '!') {
                    cd = 42;
                    switch (cc) {
                        case 'p': cd = 664; i += 2; break;
                        case 't': cd = 448; i += 2; break;
                        case 'c': cd = 450; i += 2; break;
                        case 'l': cd = 449; i += 2; break;
                    }
                    cx = String.fromCharCode(cd);
                    break;
                }
                else if (ce == 'J') {
                    cd = 42;
                    switch (cc) {
                        case 't': cd = 566; i += 2; break;
                        case 'd': cd = 545; i += 2; break;
                        case 'n': cd = 565; i += 2; break;
                        case 'l': cd = 564; i += 2; break;
                        case 's': cd = 597; i += 2; break;
                        case 'z': cd = 657; i += 2; break;
                    }
                    cx = String.fromCharCode(cd);
                    break;
                }
            default: {
                cd = cc.charCodeAt(0);
                switch (cc) {
                    case '!': cd = 42780; break;
                    case '"': cd = 712; break;
                    case '+': {
                        ii = 1;
                        switch (cn) {
                            case 'p': cd = 7510; if (ce == '\\') { cd = 7602; i++; } break;
                            case 'b': cd = 7495; break;
                            case 't': cd = 7511; break;
                            case 'd': cd = 7496; break;
                            case 'c': cd = 7580; break;
                            case 'J': if (ce == '\\') { cd = 7585; i++; } break;
                            case 'k': cd = 7503; break;
                            case 'g': cd = 7501; break;
                            case '?': cd = 704; if (ce == '\\') { cd = 740; i++; } break;
                            case 'm': cd = 7504; break;
                            case 'F': cd = 7596; break;
                            case 'n': cd = 8319; if (ce == '`') { cd = 7599; i++; } break;
                            case 'J': cd = 7598; break;
                            case 'N': cd = 7505; if (ce == '\\') { cd = 7600; i++; } break;
                            case 'B': cd = 7517; break;
                            case 'f': cd = 7584; break;
                            case 'v': cd = 7515; break;
                            case 'T': cd = 7615; break;
                            case 'D': cd = 7582; break;
                            case 's': cd = 738; if (ce == '\\') { cd = 7581; i++; }; if (ce == '`') { cd = 7603; i++; } break;
                            case 'z': cd = 7611; if (ce == '\\') { cd = 7613; i++; }; if (ce == '`') { cd = 7612; i++; } break;
                            case 'S': cd = 7604; break;
                            case 'Z': cd = 7614; break;
                            case 'j': cd = 690; if (ce == '\\') { cd = 7592; i++; } break;
                            case 'x': cd = 739; break;
                            case 'G': cd = 736; break;
                            case 'X': cd = 7521; break;
                            case 'R': cd = 694; break;
                            case 'h': cd = 688; if (ce == '\\') { cd = 689; i++; } break;
                            case 'P': cd = 7609; break;
                            case 'r': cd = 691; if (ce == '\\') { cd = 692; i++; }; if (ce == '\\', cg == '`') { cd = 693; i++; } break;
                            case 'w': cd = 695; break;
                            case 'H': cd = 7587; break;
                            case 'l': cd = 737; if (ce == '`') { cd = 7593; i++; } break;
                            case '5': cd = 43870; break;
                            case 'L': if (ce == '\\') { cd = 7595; i++; } break;
                            case 'i': cd = 8305; break;
                            case 'y': cd = 696; break;
                            case '1': cd = 7588; break;
                            case '}': cd = 7606; break;
                            case 'M': cd = 7514; if (ce == '\\') { cd = 7597; i++; } break;
                            case 'u': cd = 7512; break;
                            case 'I': cd = 7590; break;
                            case 'U': cd = 7607; break;
                            case 'e': cd = 7497; break;
                            case '8': cd = 7601; break;
                            case 'o': cd = 7506; break;
                            case '@': cd = 7498; break;
                            case 'E': cd = 7499; break;
                            case '9': cd = 43001; break;
                            case '3': cd = 7583; break;
                            case 'V': cd = 7610; break;
                            case 'O': cd = 7507; break;
                            case '6': cd = 7492; break;
                            case 'A': cd = 7493; break;
                            case 'Q': cd = 7579; break;
                            case 'a': cd = 7491; break;
                        }
                        i += ii;
                    }
                        break;
                    case '%': cd = 716; break;
                    case '^': cd = 42779; break;
                    case '&': cd = 630; break;
                    case "'": cd = 690; break;
                    case '1': cd = 616; break;
                    case '2': cd = 248; break;
                    case '3': cd = 604; break;
                    case '4': cd = 638; break;
                    case '5': cd = 619; break;
                    case '6': cd = 592; break;
                    case '7': cd = 612; break;
                    case '8': cd = 629; break;
                    case '9': cd = 339; break;
                    case ':': cd = 720; break;
                    case '<': if (ce == '>') {
                        switch (cn) {
                            case 'F': cd = 8600; break;
                            case 'R': cd = 8599; break;
                        }
                        i += 2;
                    }
                        break;
                    case '=': cd = 809; break;
                    case '?': cd = 660; break;
                    case '@': cd = 601; break;
                    case 'A': cd = 593; break;
                    case 'B': cd = 946; break;
                    case 'C': cd = 231; break;
                    case 'D': cd = 240; break;
                    case 'E': cd = 603; break;
                    case 'F': cd = 625; break;
                    case 'G': cd = 611; break;
                    case 'H': cd = 613; break;
                    case 'I': cd = 618; break;
                    case 'J': cd = 626; break;
                    case 'K': cd = 620; break;
                    case 'L': cd = 654; break;
                    case 'M': cd = 623; break;
                    case 'N': cd = 331; break;
                    case 'O': cd = 596; break;
                    case 'Q': cd = 594; break;
                    case 'P': cd = 651; break;
                    case 'R': cd = 641; break;
                    case 'S': cd = 643; break;
                    case 'T': cd = 952; break;
                    case 'U': cd = 650; break;
                    case 'V': cd = 652; break;
                    case 'W': cd = 653; break;
                    case 'X': cd = 967; break;
                    case 'Y': cd = 655; break;
                    case 'Z': cd = 658; break;
                    case '{': cd = 230; break;
                    case '}': cd = 649; break;
                    case '(': cd = 860; break;
                    case ')': cd = 865; break;
                    case '_': {
                        ii = 1;
                        switch (cn) {
                            case '"': cd = 776; break;
                            case '+': cd = 799; if (ce == '\\') { cd = 726; i++; } break;
                            case '-': cd = 800; if (ce == '\\') { cd = 727; i++; } break;
                            case '0': cd = 805; if (ce == '\\') { cd = 778; i++; } break;
                            case '@': cd = 7498; break;
                            case '=': cd = 809; if (ce == '\\') { cd = 781; i++; } break;
                            case '>': cd = 700; break;
                            case '?': if (ce == '\\') { cd = 740; i++; } break;
                            case 'O': cd = 825; if (ce == '\\') { cd = 855; i++; } break;
                            case 'A': cd = 792; break;
                            case 'B': cd = 783; if (ce == '\\') { cd = 745; i++; }; if (ce == '_', cg == 'L') { cd = 7620; ii = 3; } break;
                            case 'F': cd = 770; break;
                            case 'G': cd = 736; break;
                            case 'H': cd = 769; if (ce == '\\') { cd = 742; i++; }; if (ce == '_', cg == 'T') { cd = 7622; ii = 3; } break;
                            case 'L': cd = 768; if (ce == '\\') { cd = 744; i++; } break;
                            case 'M': cd = 772; if (ce == '\\') { cd = 743; i++; } break;
                            case 'N': cd = 828; break;
                            case 'R': cd = 780; if (ce == '_', cg == 'F') { cd = 7624; ii = 3; } break;
                            case 'T': cd = 779; if (ce == '\\') { cd = 741; i++; } break;
                            case 'X': cd = 774; break;
                            case 'c': cd = 796; if (ce == '\\') { cd = 849; i++; } break;
                            case '^': cd = 815; if (ce == '\\') { cd = 785; i++; } break;
                            case 'a': cd = 826; break;
                            case 'd': cd = 810; if (ce == '\\') { cd = 838; i++; } break;
                            case 'e': cd = 820; break;
                            case 'f': cd = 846; break;
                            case 'h': cd = 688; break;
                            case 'j': cd = 690; break;
                            case 'k': cd = 816; break;
                            case 'l': cd = 737; break;
                            case 'm': cd = 827; break;
                            case 'n': cd = 8319; break;
                            case 'o': cd = 798; if (ce == '\\') { cd = 725; i++; } break;
                            case 'q': cd = 793; break;
                            case 'r': cd = 797; if (ce == '\\') { cd = 724; i++; } break;
                            case 't': cd = 804; break;
                            case 'v': cd = 812; break;
                            case 'w': cd = 695; break;
                            case 'x': cd = 829; break;
                            case '}': cd = 794; break;
                            case '~': cd = 771; break;
                        }
                        i += ii;
                    }
                        break;
                    case '`': cd = 734; break;
                    case '~': cd = 771; break;
                }
                cx = String.fromCharCode(cd);
            }
        }
        tout += cx;
    }
    return tout;
}

function i2x(tin) {
    var tout = "";
    for (i = 0; i < tin.length; i++) {
        var currentchar = tin.charCodeAt(i);
        switch (currentchar) {///
            case 648: tout += "t`"; break;
            case 598: tout += "d`"; break;
            case 607: tout += "J\\"; break;
            case 610: tout += "G\\"; break;
            case 673: tout += ">\\"; break;
            case 660: tout += "?"; break;
            case 625: tout += "F"; break;
            case 627: tout += "n`"; break;
            case 626: tout += "J"; break;
            case 331: tout += "N"; break;
            case 628: tout += "N\\"; break;
            case 665: tout += "B\\"; break;
            case 640: tout += "R\\"; break;
            case 668: tout += "H\\"; break;
            case 674: tout += "<\\"; break;
            case 11377: tout += "b\\"; break;
            case 638: tout += "4"; break;
            case 637: tout += "r`"; break;
            case 632: tout += "p\\"; break;
            case 946: tout += "B"; break;
            case 952: tout += "T"; break;
            case 240: tout += "D"; break;
            case 643: tout += "S"; break;
            case 658: tout += "Z"; break;
            case 642: tout += "s`"; break;
            case 656: tout += "z`"; break;
            case 231: tout += "C"; break;
            case 669: tout += "j\\"; break;
            case 611: tout += "G"; break;
            case 967: tout += "X"; break;
            case 641: tout += "R"; break;
            case 295: tout += "X\\"; break;
            case 661: tout += "?\\"; break;
            case 614: tout += "h\\"; break;
            case 620: tout += "K"; break;
            case 622: tout += "K\\"; break;
            case 651: tout += "P"; break;
            case 633: tout += "r\\"; break;
            case 635: tout += "r\\`"; break;
            case 624: tout += "M\\"; break;
            case 621: tout += "l`"; break;
            case 654: tout += "L"; break;
            case 671: tout += "L\\"; break;
            case 664: tout += "O\\"; break;
            case 448: tout += "|\\"; break;
            case 451: tout += "!\\"; break;
            case 450: tout += "=\\"; break;
            case 449: tout += "|\\|\\"; break;
            case 8252: tout += "!\\!\\"; break;
            case 595: tout += "b_<"; break;
            case 599: tout += "d_<"; break;
            case 644: tout += "J\\_<"; break;
            case 608: tout += "g_<"; break;
            case 667: tout += "G\\_<"; break;
            case 700: tout += "_>"; break;
            case 653: tout += "W"; break;
            case 613: tout += "H"; break;
            case 597: tout += "s\\"; break;
            case 657: tout += "z\\"; break;
            case 634: tout += "l\\"; break;
            case 615: tout += "x\\"; break;
            case 619: tout += "5"; break;
            case 865: tout += ")"; break;
            case 860: tout += "("; break;
            case 616: tout += "1"; break;
            case 649: tout += "}"; break;
            case 623: tout += "M"; break;
            case 618: tout += "I"; break;
            case 655: tout += "Y"; break;
            case 650: tout += "U"; break;
            case 248: tout += "2"; break;
            case 600: tout += "@\\"; break;
            case 629: tout += "8"; break;
            case 612: tout += "7"; break;
            case 601: tout += "@"; break;
            case 603: tout += "E"; break;
            case 339: tout += "9"; break;
            case 604: tout += "3"; break;
            case 606: tout += "3\\"; break;
            case 652: tout += "V"; break;
            case 596: tout += "O"; break;
            case 230: tout += "{"; break;
            case 592: tout += "6"; break;
            case 630: tout += "&"; break;
            case 593: tout += "A"; break;
            case 594: tout += "Q"; break;
            case 712: tout += "\""; break;
            case 716: tout += "%"; break;
            case 720: tout += ":"; break;
            case 721: tout += ":\\"; break;
            case 774: tout += "_X"; break;
            case 124: tout += "|"; break;
            case 8214: tout += "||"; break;
            case 8255: tout += "-\\"; break;
            case 779: tout += "_T"; break;
            case 769: tout += "_H"; break;
            case 772: tout += "_M"; break;
            case 768: tout += "_L"; break;
            case 783: tout += "_B"; break;
            case 42780: tout += "!"; break;
            case 42779: tout += "^"; break;
            case 780: tout += "_R"; break;
            case 770: tout += "_F"; break;
            case 7620: tout += "_H_T"; break;
            case 7622: tout += "_B_L"; break;
            case 7624: tout += "_R_F"; break;
            case 8599: tout += "<R>"; break;
            case 8600: tout += "<F>"; break;

            case 809: tout += "="; break;
            case 781: tout += "_=\\"; break;
            case 815: tout += "_^"; break;
            case 785: tout += "_^\\"; break;
            case 688: tout += "_h"; break;
            case 8319: tout += "_n"; break;
            case 737: tout += "_l"; break;
            case 794: tout += "_}"; break;
            case 7615: tout += "+T"; break;
            case 739: tout += "+x"; break;
            case 7498: tout += "+@"; break;
            case 805: tout += "_0"; break;
            case 778: tout += "_0\\"; break;
            case 812: tout += "_v"; break;
            case 804: tout += "_t"; break;
            case 689: tout += "+h\\"; break;
            case 816: tout += "_k"; break;
            case 704: tout += "+?"; break;
            case 810: tout += "_d"; break;
            case 838: tout += "_d\\"; break;
            case 826: tout += "_a"; break;
            case 827: tout += "_m"; break;
            case 828: tout += "_N"; break;
            case 799: tout += "_+"; break;
            case 726: tout += "_+\\"; break;
            case 800: tout += "_-"; break;
            case 727: tout += "_-\\"; break;
            case 776: tout += "_\""; break;
            case 829: tout += "_x"; break;
            case 797: tout += "_r"; break;
            case 724: tout += "_r\\"; break;
            case 798: tout += "_o"; break;
            case 725: tout += "_o\\"; break;
            case 825: tout += "_O"; break;
            case 855: tout += "_O\\"; break;
            case 796: tout += "_c"; break;
            case 849: tout += "_c\\"; break;
            case 695: tout += "_w"; break;
            case 7517: tout += "+B"; break;
            case 690: tout += "_j"; break;
            case 736: tout += "_G"; break;
            case 740: tout += "_?\\"; break;
            case 820: tout += "_e"; break;
            case 792: tout += "_A"; break;
            case 793: tout += "_q"; break;
            case 771: tout += "~"; break;
            case 734: tout += "`"; break;
            case 846: tout += "_f"; break;

            case 7510: tout += "+p"; break;
            case 7495: tout += "+b"; break;
            case 7511: tout += "+t"; break;
            case 7496: tout += "+d"; break;
            case 7580: tout += "+c"; break;
            case 7585: tout += "+J\\"; break;
            case 7503: tout += "+k"; break;
            case 7501: tout += "+g"; break;
            case 704: tout += "+?"; break;
            case 7504: tout += "+m"; break;
            case 7596: tout += "+F"; break;
            case 7599: tout += "+n`"; break;
            case 7598: tout += "+J"; break;
            case 7505: tout += "+N"; break;
            case 7600: tout += "+N\\"; break;
            case 7602: tout += "+p\\"; break;
            case 7517: tout += "+B"; break;
            case 7584: tout += "+f"; break;
            case 7515: tout += "+v"; break;
            case 7615: tout += "+T"; break;
            case 7582: tout += "+D"; break;
            case 738: tout += "+s"; break;
            case 7611: tout += "+z"; break;
            case 7604: tout += "+S"; break;
            case 7614: tout += "+Z"; break;
            case 7581: tout += "+s\\"; break;
            case 7613: tout += "+z\\"; break;
            case 7603: tout += "+s`"; break;
            case 7612: tout += "+z`"; break;
            case 7592: tout += "+j\\"; break;
            case 739: tout += "+x"; break;
            case 7521: tout += "+X"; break;
            case 694: tout += "+R"; break;
            case 689: tout += "+h\\"; break;
            case 7609: tout += "+P"; break;
            case 692: tout += "+r\\"; break;
            case 693: tout += "+r\\`"; break;
            case 7587: tout += "+H"; break;
            case 7597: tout += "+M\\"; break;
            case 691: tout += "+r"; break;
            case 43870: tout += "+5"; break;
            case 7593: tout += "+l`"; break;
            case 7595: tout += "+L\\"; break;

            case 8305: tout += "+i"; break;
            case 696: tout += "+y"; break;
            case 7588: tout += "+1"; break;
            case 7606: tout += "+}"; break;
            case 7514: tout += "+M"; break;
            case 7512: tout += "+u"; break;
            case 7590: tout += "+I"; break;
            case 7607: tout += "+U"; break;
            case 7497: tout += "+e"; break;
            case 7601: tout += "+8"; break;
            case 7506: tout += "+o"; break;
            case 7498: tout += "+@"; break;
            case 7499: tout += "+E"; break;
            case 43001: tout += "+9"; break;
            case 7583: tout += "+3"; break;
            case 7610: tout += "+V"; break;
            case 7507: tout += "+O"; break;
            case 7492: tout += "+6"; break;
            case 7493: tout += "+A"; break;
            case 7579: tout += "+Q"; break;
            case 7491: tout += "+a"; break;

            case 741: tout += "_T\\"; break;
            case 742: tout += "_H\\"; break;
            case 743: tout += "_M\\"; break;
            case 744: tout += "_L\\"; break;
            case 745: tout += "_B\\"; break;

            case 566: tout += "t_J"; break;
            case 545: tout += "d_J"; break;
            case 565: tout += "n_J"; break;
            case 564: tout += "l_J"; break;

            case 609: tout += "g\\"; break;

            default: tout += String.fromCharCode(currentchar); break;
        }
    }

    return tout;
}
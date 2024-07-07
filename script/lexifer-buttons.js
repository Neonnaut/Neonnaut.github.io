const view = cm6.createEditorView( //Initial editor
    cm6.createEditorState(''),
    document.getElementById("editor")
);
lexiferExample('basic', false)

// Populate input fields with data in local storage on window load if it exists
window.onload = function () {
    if (localStorage.hasOwnProperty('lexifer')) {
        view.dispatch({
            changes: {
                from: 0,
                to: view.state.doc.length,
                insert: localStorage.getItem('lexifer')
            }
        })
    } else {
        view.dispatch({
            changes: {
                from: 0,
                to: view.state.doc.length,
                insert: lexiferExample('basic', false)
            }
        })
    }
    // Select all text in the input
    $('#input').focus().select();
};

$(window).on('load', function () {
    $("[class='lexifer-example']").click(function () { //Examples
        const choice = $(this).attr('name');
        const text = lexiferExample(choice, true);
        if (text != false) {
            view.dispatch({
                changes: {
                    from: 0,
                    to: view.state.doc.length,
                    insert: text
                }
            })
        }
        localStorage.setItem('lexifer', text);
    });

    $("[name='fakeLoadButton']").click(function () { //Load button
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _this => {
            let file = Array.from(input.files)[0], read = new FileReader();
            read.readAsText(file);
            read.onloadend = function () {
                view.dispatch({
                    changes: {
                        from: 0,
                        to: view.state.doc.length,
                        insert: read.result
                    }
                })
                localStorage.setItem('lexifer', read.result);
            }
        };
        input.click();
        $("#editor").focus();
    });

    $("[name='saveButton']").click(function () { // Save button
        const link = document.createElement("a");
        const text = view.state.doc.toString();
        const file = new Blob([text], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);

        var filename = "lexifer_definition.def";
        var fileLines = text.split("\n");

        for (var i = 0; i < fileLines.length; i++) {
            if (fileLines[i].trim().startsWith("name:")) {
                filename = fileLines[i].trim().substring(5).trim();
                filename += ".def"
            }
        }

        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        // Save input text in user's localstorage for next session
        localStorage.setItem('lexifer', text);
    });

    $("[name='lexiferButton']").click(function () { //Generate button
        document.getElementById('lexiferErrorMessage').innerHTML = ""
        const myWords = genWords(
            view.state.doc.toString(),
            parseInt($("#number").val()),
            $("#verbose").is(":checked"),
            $("#unsorted").is(":checked"),
            $("#one-per-line").is(":checked"),
            (error) => {
                document.getElementById('lexiferErrorMessage').innerHTML += `${error}<br>`;
            }
        );
        $("#lexiferResult").html(
            "<textarea id='lexiferOutput' spellcheck='false'>" + myWords + "</textarea>"
        );

        localStorage.setItem('lexifer', view.state.doc.toString());
        $('#lexiferOutput').focus();
    });
});
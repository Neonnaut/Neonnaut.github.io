function colourSchemeButtons(click) {
    let selection = document.querySelectorAll("#colour-switch-field input");

    for (i = 0; i < selection.length; i++) {
        selection[i].classList.remove('checked');
    }
    click.addClass("checked");
}

function assignSchemeClass(scheme) {
    var mySchemes = ["light-mode", "dark-mode", "warm-mode"];

    for (var i = 0; i < mySchemes.length; i++) {
        if (scheme != mySchemes[i]) {
            document.getElementById("colour-target").classList.remove(mySchemes[i]);
        } else {
            document.getElementById("colour-target").classList.add(scheme);
        }
    }
}

if (localStorage.hasOwnProperty('colourScheme')) {
    assignSchemeClass(localStorage.getItem('colourScheme'));
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    assignSchemeClass('light-mode');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!localStorage.hasOwnProperty('colourScheme')) {
        const scheme = event.matches ? "dark" : "light";
        if (scheme == "dark") {
            document.getElementById("colour-target").classList.remove("light-mode");
        } else if (scheme == "light") {
            document.getElementById("colour-target").classList.add("light-mode");
        }
    }
});

$(window).on('load', function () {
    $("#main_menu").click(function () {
        window.location.href = './index.html';
    });
});
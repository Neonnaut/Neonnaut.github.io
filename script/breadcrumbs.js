$(document).ready(function () {
    if ($('.breadcrumbs')) {
        var here = location.href.replace(/(\?.*)$/, '').split('/').slice(3);
        var crumbs = []

        for (var j = 0; j < here.length; j++) {
            let pageName = here[j].charAt(0).toUpperCase() + here[j].slice(1); pageName = pageName.trim();
            let link = '/' + here.slice(0, j + 1).join('/');
            crumbs.push('<li><a href="' + link + '">' + pageName.replace(/\.(htm[l]?|asp[x]?|php|jsp)$/, '') + '</a></li>');
        }
        crumbs.pop();
        $('.breadcrumbs').append(crumbs.join('\n'));
    }
});
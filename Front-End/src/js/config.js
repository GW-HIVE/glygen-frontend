

var MESSAGES = {}



// Questions

// MESSAGES.QUESTION_1 = "What are the enzymes involved in the biosynthesis of glycan X in human?";
MESSAGES.QUESTION_1 = "Who changed the damn question here?";
MESSAGES.QUESTION_2 = "Which proteins have been shown to bear glycan X and which site is this glycan attached to?";
MESSAGES.QUESTION_3 = "What are the gene locations of the enzymes involved in the biosynthesis of glycan X in human?";
MESSAGES.QUESTION_4 = "What are the orthologues of protein X in different species?";
MESSAGES.QUESTION_5 = "What are the functions of protein X?";
MESSAGES.QUESTION_6 = "Which glycans might have been synthesized in mouse using enzyme X?";
MESSAGES.QUESTION_7 = "What are the glycosyltransferases in species X?";
MESSAGES.QUESTION_8 = "What are the glycohydrolases in species X?";
MESSAGES.QUESTION_9 = "What are the reported or predicted glycosylated proteins in species X?";
MESSAGES.QUESTION_10 = "Which glycosyltransferases are known to be involved in disease X?";


function localizeLabels(target) {
    var $target = (target || document);

    $('.localized', $target).each(function () {
        var $this = $(this);
        var key = $this.data('key');
        var message = (MESSAGES[key] || '');

        $this.html(message);
    });
}

$(document).ready(function () {
    localizeLabels();
});



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
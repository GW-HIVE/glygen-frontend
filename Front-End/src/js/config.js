// var GLYTOUCAN_AC = "GlyTouCan Accession";
// var UNIPROT_AC = "UniProt Accession";
// var MONO_MASS="Monoisotopic Mass";
// var CHEM_MASS = "Chemical Mass";
// var ENZYME = "Biosynthetic Enzyme";
// var CHROMOSOME="Chromosome";
// var CROSS_REF = "Cross References";
// var MOTIF = "Glycan Motif";
// var GENE_NAME="Gene Name";
// var SUBTYPE = "Glycan Subtype";
// var ENZYME = "Biosynthetic Enzyme";
// var CHROMOSOME="Chromosome";
// var TYPE = "Glycan Type";
// var GLYCOCT="GlycoCT";
// var GLYCOSYLATION = "Glycosylation";
// var ENZYME = "Biosynthetic Enzyme";
// var CHROMOSOME="Chromosome";

//
// var GLYTOUCAN_AC = document.getElementById("GLYTOUCAN_AC");
// GLYTOUCAN_AC.innerHTML = "<b>GlyTouCan Accession</b>";


// function localization() {
//     return {
//         GLYTOUCAN_AC: "GlyTouCan Accession",
//         UNIPROT_AC: "UniProt Accession"
//     }
// }


var MESSAGES = {}
MESSAGES.GLYTOUCAN_AC = "GlyTouCan Accession";
MESSAGES.MONO_MASS = "Monoisotopic Mass";
MESSAGES.SELECT_ORGANISM = "Select Organism";


// Questions
// MESSAGES.QUESTION_1 = "What are the enzymes involved in the biosynthesis of glycan X in human?";
MESSAGES.QUESTION_1 = "What are the enzymes involved in the biosynthesis of glycan X in human?";
MESSAGES.QUESTION_2 = "Which proteins have been shown to bear glycan X and which site is this glycan attached to?";
MESSAGES.QUESTION_3 = "What are the gene locations of the enzymes involved in the biosynthesis of glycan X in human?";
MESSAGES.QUESTION_4 = "What are the orthologues of protein X in different species?";
MESSAGES.QUESTION_5 = "What are the functions of protein X?";
MESSAGES.QUESTION_6 = "Which glycans might have been synthesized in mouse using enzyme X?";
MESSAGES.QUESTION_7 = "What are the glycosyltransferases in species X?";
MESSAGES.QUESTION_8 = "What are the glycohydrolases in species X?";
MESSAGES.QUESTION_9 = "What are the reported or predicted glycosylated proteins in species X?";
MESSAGES.QUESTION_10 = "Which glycosyltransferases are known to be involved in disease X?";
// MESSAGES['9606'] = "Homo Sapiens";
// MESSAGES['10090'] = "Mus Mus";

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

// var DYNAMIC_MESSAGES = {};
// DYNAMIC_MESSAGES.QUESTION_1 = "What are the enzymes involved in the biosynthesis of <b>{{#glytoucan_ac}}{{glytoucan_ac}}{{/glytoucan_ac}}</b>  in human?";
// DYNAMIC_MESSAGES.QUESTION_2 = "Which proteins have been shown to bear <b>{{#glytoucan_ac}}{{glytoucan_ac}}{{/glytoucan_ac}}</b>  and which site is this glycan attached to?";

// DYNAMIC_MESSAGES.q9 = "Which proteins have been shown to bear and which site is this glycan attached to? {{evidence_type}} - {{species}}";


function getMessageText(key, values) {
    var staticMessage = MESSAGES[key];
    var dynamicMessage = DYNAMIC_MESSAGES[key]

    if (staticMessage) {
        return staticMessage;
    } else if (dynamicMessage) {
        return Mustache.to_html(dynamicMessage, values);
    } else {
        return '';
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
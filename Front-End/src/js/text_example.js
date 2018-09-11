/**
 * Add example text in input onclick.
 * @author Tatiana Williamson
 * @date August 29, 2018
 */

/* --------------------------
    Glycan Search Page 
---------------------------- */

// select already you input element for re-use
var $tagsInputGlycan = $('#glycan_id');
// bind a click event to links within ".textExample" element
$('#textExampleGlycan').click(function() {
    // append link text to the input field value
    $tagsInputGlycan[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Protein
var $tagsInputProtein = $('#protein');
$('#textExampleProtein').click(function() {
    $tagsInputProtein[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Motif
var $tagsInputMotif = $('#motif');
$('#textExampleMotif').click(function() {
    $tagsInputMotif[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Enzyme
var $tagsInputEnzyme = $('#enzyme');
$('#textExampleEnzyme').click(function() {
    $tagsInputEnzyme[0].value = $(this).text();
    return false;
});

/* ------------------------------------------
    Protein and Glycoprotein Search Pages 
---------------------------------------------- */

// append link text to the input field value for RefSeq Accession
var $tagsInputRefseq = $('#refseq');
$('#textExampleRefseq').click(function() {
    $tagsInputRefseq[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Protein Name
var $tagsInputProteinName = $('#protein_name');
$('#textExampleProteinName').click(function() {
    $tagsInputProteinName[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Gene Name
var $tagsInputGeneName = $('#gene_name');
$('#textExampleGeneName').click(function() {
    $tagsInputGeneName[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Protein Sequence
var $tagsInputSequences = $('#sequences');
$('#textExampleSequences').click(function() {
    $tagsInputSequences[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Pathway ID
var $tagsInputPathwayID = $('#pathway');
$('.textExampleKegg.textExampleReactome a').click(function() {
    $tagsInputPathwayID[0].value = $(this).text();
    return false;
});

/* -----------------------------------------
    Quick Search Page
--------------------------------------------*/
// append link text to the input field value for Search by Glycan in Quick Search
var $tagsInputBioenzyme = $('#bioenzyme');
$('#textExampleBioenzyme').click(function() {
    $tagsInputBioenzyme[0].value = $(this).text();
    return false;
});

var $tagsInputGlycansite = $('#glycansite');
$('#textExampleGlycansite').click(function() {
    $tagsInputGlycansite[0].value = $(this).text();
    return false;
});

var $tagsInputGlycangene = $('#glycangene');
$('#textExampleGlycangene').click(function() {
    $tagsInputGlycangene[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Search by Protein in Quick Search
var $tagsInputOrthologues = $('#proteinorthologues');
$('#textExampleOrthologues').click(function() {
    $tagsInputOrthologues[0].value = $(this).text();
    return false;
});

var $tagsInputFunction = $('#proteinfunction');
$('#textExampleFunction').click(function() {
    $tagsInputFunction[0].value = $(this).text();
    return false;
});

var $tagsInputGlycanenzyme = $('#glycanenzyme');
$('#textExampleGlycanenzyme').click(function() {
    $tagsInputGlycanenzyme[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Search by Disease in Quick Search
var $tagsInputGlycosyltransferasesd = $('#glycosyltransferasesdisease');
$('#textExGlycosyltransferasesdisease').click(function() {
    $tagsInputGlycosyltransferasesd[0].value = $(this).text();
    return false;
});



//button to toggle between hiding and showing the advanced search
function advancedSearchButton() {
    var x = document.getElementById("advanced");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

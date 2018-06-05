
$(document).ready(function(){

    $(".glycosylated_aa").chosen({
        // max_selected_options: 10,
        placeholder_text_multiple: "choose amino acid"
    })
        .bind("chosen:maxselected2", function (){
            window.alert("You reached your limited number of selections which is 2 selections!");
        });

});




/**
 * function addCommas is a regular expression is used on nStr to add the commas


 * @param {integer} nstr gets divide
 * @returns {number} Number with commas
 */

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    return x1 + x2;
}




/**
 * function aminoLetter is a to select value of text-input


 * @param {string} strings of characters
 * @returns {number} if matches returns true or not false
 */

function aminoLetter(textareatxt)
{
    var letters = /^[RKDEQNHSTYCWAILMFVPG]+$/gi;
    if(textareatxt.value.match(letters))
    {
        document.getElementById("msg").innerHTML = "";
        return true;
    }
    else
    {
        document.getElementById("msg").innerHTML = "Enter a valid amino seq.";
        return false;
    }
}



/** Protein field on change detect and suggest auto complete options from retrieved Json
 * @proteinjson - forms the JSON to post
 * @data-returns the protein ID's
 *
 */
$( "#protein" ).autocomplete({
    source: function(request, response) {
        var queryUrl = getWsUrl("typehead_protein") + "?" + getSearchtypeheadData( "protein", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 5);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function( event, ui ) {
        console.log( "Selected: " + ui.item.value + " aka " + ui.item.id );
    }
});


/** protein_name field on change detect and suggest auto complete options from retrieved Json
 * @proteinjson - forms the JSON to post
 * @data-returns the protein_name.
 *
 */
$( "#protein_name" ).autocomplete({
    source: function(request, response) {
        var queryUrl = getWsUrl("typehead_protein_name") + "?" + getSearchtypeheadData( "protein_name_short", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 10);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function( event, ui ) {
        console.log( "Selected: " + ui.item.value + " aka " + ui.item.id );
    }
});

/** pgene_name field on change detect and suggest auto complete options from retrieved Json
 * @proteinjson - forms the JSON to post
 * @data-returns the gene_name.
 *
 */

$( "#gene_name" ).autocomplete({
    source: function(request, response) {

        var queryUrl = getWsUrl("typehead_gene") + "?" + getSearchtypeheadData( "gene_name", request.term);


        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 10);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function( event, ui ) {
        console.log( "Selected: " + ui.item.value + " aka " + ui.item.id );
    }
});

/** glycan_id field on change detect and suggest auto complete options from retrieved Json
 * @glycan_idjson - forms the JSON to post
 * @data-returns the glycan_id.
 *
 */

$( "#glycan_id" ).autocomplete({
    source: function(request, response) {

        var queryUrl = getWsUrl("typehead_glycan") + "?" + getSearchtypeheadData( "glycan_id", request.term);


        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 10);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function( event, ui ) {
        console.log( "Selected: " + ui.item.value + " aka " + ui.item.id );
    }
});


/** functions for dropdowns organism
 * get organism drop down values for search form
 */

var mass_max;
var mass_min;
$(document).ready(function () {
    $.getJSON(getWsUrl("search_init_protein"), function (result) {
        for (var x = 0; x < result.organism.length; x++) {
            $("#organism").append("<option>" + result.organism[x] + "</option>");
        }
        var mass_max = result.protein_mass.max;
        var mass_min = result.protein_mass.min;
        mass(mass_min, mass_max)

    });
});

/** Mass range function
 * @param {numeric} mass_min - minimum value of the mass range
 * @param {numeric} mass_max - maximum value of the mass range
 */
function mass(mass_min, mass_max) {
    var nonLinearSlider = document.getElementById('slider');
    noUiSlider.create(nonLinearSlider, {
        connect: true,
        behaviour: 'tap',

        start: [mass_min, mass_max],
        range: {
            'min': mass_min,
            'max': mass_max
        }
    });
    // nonLinearSlider.noUiSlider.set([mass_min, mass_max]);
    var nodes = [
        document.getElementById('lower-value'), // 0
        document.getElementById('upper-value')  // 1
    ];
    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    nonLinearSlider.noUiSlider.on('update', function (values, handle) {
        nodes[handle].innerHTML = addCommas(values[handle]);
    });

}



/** On submit, function forms the JSON and submits to the search web services
 */
function ajaxProteinSearchSuccess() {
    var operation="AND";
    var query_type = "search_protein";
    var organism= $("#organism").val();
    var protein_id = $("#protein").val();
    var mass_slider = $("#slider").get(0).noUiSlider.get();
    // var mass_slider = document.getElementById("slider").noUiSlider.get();
    var gene_name=$("#gene_name").val();
    var protein_name_long = $("#protein_name_long").val();
    var pathway_id=$("#pathway").val();
    var sequence=$("#sequences").val();
    var glycan_id= $("#glycan_id").val();
    var glycan_relation= $("#glycan_relation").val();
    var glycosylated_aa= $(".glycosylated_aa").val();
    var glycosylation_evidence= $("#glycosylation_evidence").val();
    var formObject = getProteinSearchPostdata(operation,query_type,organism,mass_slider[0], mass_slider[1],protein_id,gene_name,protein_name_long,pathway_id, sequence, glycosylated_aa,glycosylation_evidence);
    // , protein_name_long,gene_name);
    var json = "query=" + JSON.stringify(formObject);
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-tst.biochemistry.gwu.edu/api/protein/search',
        data: json,
        success: function (results) {
            if(results.search_results_id){
                window.location = './protein-list.html?id=' + results.search_results_id;
            }
            else{
                displayErrorByCode("server-down")
            }

        }
    });
}


/** Forms searchjson from the form values submitted
 * @param input_query_type query search
 * @param input_glycan_id user glycan id input
 * @param mass_min user mass min input
 * @param mass_max user mass max input
 * @param input_organism user organism input
 * @param input_glycantype user glycan_type input
 * @param input_glycansubtype user glycan_subtype input
 * @param input_enzyme user enzyme input
 * @param input_proteinid user protein_id input
 * @param input_motif user motif input
 */

// function getProteinSearchPostdata(query_type,organism,protein,mass_min,mass_max,protein_name_long,gene_name,pathway_id, sequence, glycosylated_aa) {
function getProteinSearchPostdata(operation,query_type,organism,mass_min,mass_max,protein_id,gene_name,protein_name_long,pathway_id, relation,glycan_id, type, aa_sequence,glycosylated_aa,glycosylation_evidence)
// ,protein_name_long,gene_name)
{
    var formjson = {
        operation:operation,
        query_type: query_type,
        organism: organism,
        protein_id: protein_id,
        mass: { "min": mass_min, "max": mass_max },
        protein_name_long:protein_name_long,
        glycan:{"relation":"","glycan_id":" "},
        gene_name:gene_name,
        pathway_id:pathway_id,
        sequence: {"type":"exact", "aa_sequence":""},
        glycosylated_aa: glycosylated_aa,
        glycosylation_evidence:glycosylation_evidence

    };
    return formjson;
}


$(window).on('resize', function () {
    var $element = $('.chosen-container');
    $element.width($element.parent().width());

})





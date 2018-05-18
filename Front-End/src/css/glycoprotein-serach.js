
$(document).ready(function(){

    $(".glycosylated_aa").chosen({
        // max_selected_options: 10,
        placeholder_text_multiple: "choose amino acid"
    })
        .bind("chosen:maxselected2", function (){
            window.alert("You reached your limited number of selections which is 2 selections!");
        });

});



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
        nodes[handle].innerHTML = values[handle];
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
    var glycosylated_aa= $(".glycosylated_aa").val();
    var formObject = getProteinSearchPostdata(operation,query_type,organism,mass_slider[0], mass_slider[1],protein_id,gene_name,protein_name_long,pathway_id, sequence, glycosylated_aa);
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

// function getProteinSearchPostdata(query_type,organism,protein,mass_min,mass_max,protein_name_long,gene_name,pathway_id, sequence, glycosylated_aa) {
function getProteinSearchPostdata(operation,query_type,organism,mass_min,mass_max,protein_id,gene_name,protein_name_long,pathway_id, sequence, glycosylated_aa)
// ,protein_name_long,gene_name)
{
    var formjson = {
        operation:operation,
        query_type: query_type,
        organism: organism,
        protein_id: protein_id,
        mass: { "min": mass_min, "max": mass_max },
        protein_name_long:protein_name_long,
        gene_name:gene_name,
        pathway_id:pathway_id,
        sequence: sequence,
        glycosylated_aa: glycosylated_aa

    };
    return formjson;
}








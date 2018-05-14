
$(document).ready(function(){
    //Chosen
    $(".limitedNumbChosen").chosen({
        // max_selected_options: 10,
        placeholder_text_multiple: "choose amino acid"
    })
        .bind("chosen:maxselected", function (){
            window.alert("You reached your limited number of selections which is 2 selections!");
        })
    //Select2
    $(".limitedNumbChosen2").chosen({
        // max_selected_options: 10,
        placeholder_text_multiple: "choose amino acid"
    })
        .bind("chosen:maxselected2", function (){
            window.alert("You reached your limited number of selections which is 2 selections!");
        });

});





$( "#protein" ).autocomplete({
    source: function(request, response) {
        var searchData = {
            field: "protein",
            value: request.term
        };
        var queryUrl = "http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/typehead?query=" + JSON.stringify(searchData);

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

$( "#protein_name" ).autocomplete({
    source: function(request, response) {
        var searchData = {
            field: "protein_name_short",
            value: request.term
        };
        var queryUrl = "http://glygen-vm-tst.biochemistry.gwu.edu/api/protein/typehead?query=" + JSON.stringify(searchData);

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
        var searchData = {
            field: "gene_name",
            value: request.term
        };
        var queryUrl = "http://glygen-vm-tst.biochemistry.gwu.edu/api/protein/typehead?query=" + JSON.stringify(searchData);

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
function submitvalues() {
    var query_type = "search_protein";

    var organism= $("#organism").val();
    var protein = $("#protein_id").val();
    //var mass_slider = $("slider").val().noUiSlider.get();
    // var organism = document.getElementById("organism").value;
    // var protein = document.getElementById("protein").value;
     var mass_slider = document.getElementById("slider").noUiSlider.get();

    var protein_name_long = $("#protein_name_long").val();
    var gene_name = $("#gene_name").val();


    var formObject = getProteinSearchPostdata(query_type,organism,protein,mass_slider[0], mass_slider[1], protein_name_long,gene_name);

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
                displayErrorByCode("1")
            }

        }
    });
}





//form json from form submit
function getProteinSearchPostdata(query_type,organism,protein,mass_min,mass_max,protein_name_long,gene_name) {
    var formjson = {
        query_type: query_type,
        organism: organism,
        protein: protein,
        mass: { "min": mass_min, "max": mass_max },
        protein_name_long:protein_name_long,
        gene_name:gene_name

    };
    return formjson;
}








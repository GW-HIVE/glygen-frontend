//@author: Rupali Mahadik
// @description: UO1 Version-1.1.
//@update:6 June 2018
//@update: 26 June 2018-web services changes updated


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

function aminoLetter(textareatxt) {
    var letters = /^[RKDEQNHSTYCWAILMFVPG]+$/gi;
    if (textareatxt.value.match(letters)) {
        document.getElementById("msg").innerHTML = "";
        return true;
    } else {
        document.getElementById("msg").innerHTML = "Enter a valid amino seq.";
        return false;
    }
}


/** Protein field on change detect and suggest auto complete options from retrieved Json
 * @proteinjson - forms the JSON to post
 * @data-returns the protein ID's
 *
 */


$("#protein").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("uniprot_canonical_ac", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 5);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});








$("#refseq").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("refseq_ac", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 5);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});

/** protein_name field on change detect and suggest auto complete options from retrieved Json
 * @proteinjson - forms the JSON to post
 * @data-returns the protein_name.
 *
 */
$("#protein_name").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("protein_name", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 10);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});

/** pgene_name field on change detect and suggest auto complete options from retrieved Json
 * @proteinjson - forms the JSON to post
 * @data-returns the gene_name.
 *
 */

$("#gene_name").autocomplete({
    source: function (request, response) {

        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("gene_name", request.term);


        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 10);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});


$("#pathway").autocomplete({
    source: function (request, response) {

        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("pathway_id", request.term);


        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 10);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});


/** functions for dropdowns organism
 * get organism drop down values for search form
 */

var mass_max;
var mass_min;
$(document).ready(function () {
    $(".glycosylated_aa").chosen({
        // max_selected_options: 10,
        placeholder_text_multiple: "choose amino acid"
    })
        .bind("chosen:maxselected2", function () {
            window.alert("You reached your limited number of selections which is 2 selections!");
        });

    $.getJSON(getWsUrl("search_init_protein"), function (result) {
        for (var x = 0; x < result.organism.length; x++) {
            $("#organism").append("<option>" + result.organism[x] + "</option>");
        }
        var mass_max = result.protein_mass.max;
        var mass_min = result.protein_mass.min;
        mass(mass_min, mass_max)
        // check for ID to see if we need to load search values
        // please do not remove this code as it is required prepopulate search values
        var id = getParameterByName('id') || id;
        if (id) {
            LoadProteinSearchvalues(id);
        }
    })
    .fail(function(result){
        activityTracker("error", "", result.status +": search_init WS error");
        console.log("error in search_init");
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
        document.getElementById('upper-value') // 1
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
    var organism = $("#organism").val();
    var uniprot_id = $("#protein").val();
    var refseq_id=$("#refseq").val();
    var mass_slider = document.getElementById("slider").noUiSlider.get();
    var mass_min = mass_slider[0];
    var mass_max = mass_slider[1];
    var gene_name = $("#gene_name").val();
    var protein_name_long = $("#protein_name_long").val();
    var pathway_id = $("#pathway").val();
    var sequence = $("#sequences").val();

    var formObject = {
        operation: "AND",
        query_type: "search_protein",
        organism: organism,
        uniprot_canonical_ac: uniprot_id,
        refseq_ac:refseq_id,
        // mass: {
        //     min: mass_min,
        //     max: mass_max
        // },
        mass: {"min":parseInt(mass_min), "max":parseInt(mass_max)},
        protein_name: protein_name_long,
        gene_name: gene_name,
        pathway_id: pathway_id,
        sequence: {
            type: "exact",
            aa_sequence: sequence
        },

    };
    var json = "query=" + JSON.stringify(formObject);
    $.ajax({
        type: 'post',
        url: getWsUrl("search_protein"),
        data: json,
        success: function (results) {
            if (results.list_id) {
                window.location = './protein_list.html?id=' + results.list_id;
            } else {
                displayErrorByCode("server-down");
                activityTracker("error", "", results.error_code);
            }

        }
    });
}


// to resizing choosen field

$(window).on('resize', function () {
    var $element = $('.chosen-container');
    $element.width($element.parent().width());

})

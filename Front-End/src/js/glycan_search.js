// <!--
//     //@author: Rupali Mahadik
// // @description: UO1 Version-1.1.
// //@refactored  :June-27-2017
// @update on July 25 2018 - Gaurav Agarwal - added code for loading gif.
//     -->



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


$("#glycan_id").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("glytoucan_ac", request.term);
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


$("#motif").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("motif_name", request.term);
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

$("#enzyme").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("enzyme_uniprot_canonical_ac", request.term);
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



/** functions for dropdowns organism
 * get organism drop down values for search form
 */

var searchInitValues;

var mass_max;
var mass_min;
$(document).ready(function () {
    $.getJSON(getWsUrl("search_init_glycan"), function (result) {
        searchInitValues = result;

        var orgElement = $(".organism").get(0);
        createOption(orgElement, result.organism[0].name, result.organism[0].id);
        createOption(orgElement, result.organism[1].name, result.organism[1].id);

        var glycanElement = $(".ddl").get(0);

        for(var x = 0; x < result.glycan_type.length; x++) {
            createOption(glycanElement, result.glycan_type[x].name, result.glycan_type[x].name);
        }

        // $(".ddl").append("<option>" + result.glycan_type[0].name + "</option>");
        var mass_max = result.glycan_mass.max;
        var mass_min = result.glycan_mass.min;
        var sugar_mass_min = result.number_monosaccharides.min;
        var sugar_mass_max = result.number_monosaccharides.max;
        mass(mass_min, mass_max);
        sugarmass(sugar_mass_min, sugar_mass_max)
        // check for ID to see if we need to load search values
        // please do not remove rhis code as it is required prepopulate search values
        var id = getParameterByName('id') || id;
        if (id) {
            LoadSearchvalues(id);
        }

    })
        .fail(function (result) {
            activityTracker("error", "", result.status + ": search_init WS error");
            console.log("error in search_init");
        });
});


/** Sugar Mass range function
 * @param {numeric} sugar_mass_min - minimum value of the sugar mass range
 * @param {numeric} sugar_mass_max - maximum value of the sugar mass range
 */
function sugarmass(sugar_mass_min, sugar_mass_max) {
    var nonLinearSlider1 = document.getElementById('slider1');
    noUiSlider.create(nonLinearSlider1, {

        connect: true,
        behaviour: 'tap',
        start: [0, 10000],
        range: {
            'min': sugar_mass_min,
            'max': sugar_mass_max
        }
    });
    var nodes1 = [
        document.getElementById('lower-value1'), // 0
        document.getElementById('upper-value1')  // 1
    ];
    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    nonLinearSlider1.noUiSlider.on('update', function (values, handle) {
        nodes1[handle].innerHTML = addCommas(values[handle]);
    });
}

/** Mass range function
 * @param {numeric} mass_min - minimum value of the mass range
 * @param {numeric} mass_max - maximum value of the mass range
 */
function mass(mass_min, mass_max) {
    var nonLinearSlider = document.getElementById('slider');
    noUiSlider.create(nonLinearSlider, {
        connect: true,
        behaviour: 'tap',
        start: [0, 10000],

        // range: {
        //     'min': [1],
        //     '60%': [10],
        //     'max': [1000]
        // }
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

/** glycan sub type dropdown function based on type field
 * @param {numeric} ddl1 - User selected glycan type
 * @param {numeric} ddl2 - Glycan sub type
 */

function configureDropDownLists(ddl1, ddl2, callback) {
    var glyan_type_name = ddl1.value;

    // clears existing options
    ddl2.options.length = 0;

    createOption(ddl2, '', '');

    for (var x = 0; x < searchInitValues.glycan_type.length; x++) {
        var glycan_type = searchInitValues.glycan_type[x];

        // find glycan type by name
        if(glycan_type.name === glyan_type_name) {
            glycan_type.subtype.sort(function(a,b){
                var Atokens = a.split(' ');
                var Btokens = b.split(' ');
                var Atext = Atokens[0];
                var Btext = Btokens[0];
                var Anumber = parseInt(Atokens[1]);
                var Bnumber = parseInt(Btokens[1]);
                if(isNaN(Anumber) || isNaN(Bnumber)){
                    return Atext > Btext;
                }
                else {
                    return Anumber - Bnumber;
                }
            });


            for (i = 0; i < glycan_type.subtype.length; i++) {
                var subtype = glycan_type.subtype[i];



                createOption(ddl2, subtype, subtype);
            }

            break;
        }
    }

    if (callback) {
        callback();
    }
}

function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
}

function ajaxSearchFailure() {
    displayErrorByCode('server_down');
}


/** On submit, function forms the JSON and submits to the search web services
 */
function submitvalues() {
    // displays the loading gif when the ajax call starts
    $('#loading_image').fadeIn();

    var query_type = "search_glycan";
    var mass_slider = document.getElementById("slider").noUiSlider.get();
    var sugar_slider = document.getElementById("slider1").noUiSlider.get();
    var glycan_id = document.getElementById("glycan_id").value;
    var organism = document.getElementById("organism").value;
    var glycan_type = document.getElementById("ddl").value;
    var glycan_subtype = document.getElementById("ddl2").value;
    var proteinid = document.getElementById("protein").value;
    var enzyme = document.getElementById("enzyme").value;
    var glycan_motif = document.getElementById("motif").value;
    var formObject = searchjson(query_type, glycan_id, mass_slider[0], mass_slider[1], sugar_slider[0], sugar_slider[1], organism, glycan_type, glycan_subtype, enzyme, proteinid, glycan_motif);
    var json = "query=" + JSON.stringify(formObject);

    $.ajax({
        type: 'post',
        url: getWsUrl("glycan_search"),
        data: json,
        error: ajaxSearchFailure,
        success: function (results) {
            if (results.error_code) {
                displayErrorByCode(results.error_code);
                // activityTracker("error", "", results.error_code);
                activityTracker("error", "", "no result found for "+json);
                $('#loading_image').fadeOut();
            } else if ((results.list_id !== undefined) && (results.list_id.length === 0)) {
                displayErrorByCode('no-results-found');
                activityTracker("user", "", "no result found");
                $('#loading_image').fadeOut();
            } else {
                window.location = './glycan_list.html?id=' + results.list_id;
                $('#loading_image').fadeOut();
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
 * @param input_proteinid user uniprot_id input
 * @param input_motif user motif input
 */

//form json from form submit
function searchjson(input_query_type, input_glycan_id, mass_min, mass_max, sugar_min, sugar_max, input_organism, input_glycantype, input_glycansubtype, input_enzyme, input_proteinid, input_motif) {
    var formjson = {
        "operation": "AND",
        query_type: input_query_type,
        mass: { "min": parseInt(mass_min), "max": parseInt(mass_max) },
        number_monosaccharides: { "min": parseInt(sugar_min), "max": parseInt(sugar_max) },
        enzyme: {
            "id": input_enzyme,
            "type": "gene"
        },
        glytoucan_ac: input_glycan_id,
        tax_id: input_organism ? parseInt(input_organism) : '',
        glycan_type: input_glycantype,
        glycan_subtype: input_glycansubtype,
        uniprot_canonical_ac: input_proteinid,
        glycan_motif: input_motif,

    };
    return formjson;
}

// function searchjson(input_query_type, input_glycan_id, mass_min, mass_max, sugar_min, sugar_max, input_organism, input_glycantype, input_glycansubtype, input_enzyme, input_proteinid, input_motif) {
//     var formJson = {};
//
//     if (input_organism) {
//         formJson.tax_id = parseInt(input_organism);
//     }
//
//     ...
//
//     return formjson;
// }

/**
 * hides the loading gif and displays the page after the search_init results are loaded.
 * @author Gaurav Agarwal
 * @date July 25, 2018
 */
$(document).ajaxStop(function () {
    $('#loading_image').fadeOut();
});
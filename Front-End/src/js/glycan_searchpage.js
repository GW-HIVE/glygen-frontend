//  @author: Pradeep Kumar Ragu Chanthar
//  @description: UO1 Version-1.1
//  @Date: 19th Feb 2018



/** Protein field on change detect and suggest auto complete options from retrieved Json
 * @proteinjson - forms the JSON to post
 * @data-returns the protein ID's
 * 
*/ 
$('#protein').on('input',function(){
    var protein_id = document.getElementById("protein").value;
var proteinobj = {
    field: "protein",
    value:  protein_id
}
var proteinjson = "query=" + JSON.stringify(proteinobj);
$.ajax({
    url: getWsUrl("typehead"), // path to protein WS
    method: 'post', // POST request 
    data: proteinjson, //post user input on change
    success: function (data) {
        //data is the JSON string
        $(function () {
            $(".protein").autocomplete({
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(data, request.term);
                    response(results.slice(0, 5));
                }
            });
        });
    },
});
});

/** Motif field on change detect and suggest auto complete options from retrieved Json
 * @Motifjson - forms the JSON to post
 * @data-returns the Motifs
 * 
*/ 
    $('#motif').on('input',function(){
        var motif_id = document.getElementById("motif").value;
    var motifobj = {
        field: "motif",
        value:  motif_id
    }
    var motifjson = "query=" + JSON.stringify(motifobj);
    $.ajax({
        url: getWsUrl("typehead"), // path to protein WS
        method: 'post', // POST request 
        data: motifjson, //post user input on change
        success: function (data) {
            //data is the JSON string
            $(function () {
                $(".motif").autocomplete({
                    source: function (request, response) {
                        var results = $.ui.autocomplete.filter(data, request.term);
                        response(results.slice(0, 5));
                    }
                });
            });
        },
    });
    });


/** enzyme field on change detect and suggest auto complete options from retrieved Json
 * @enzymejson - forms the JSON to post
 * @data-returns the enzymes
 * 
*/ 
$('#enzyme').on('input',function(){
    var enzyme_id = document.getElementById("enzyme").value;
var enzymeobj = {
    field: "enzyme",
    value:  enzyme_id
}
var enzymejson = "query=" + JSON.stringify(enzymeobj);
$.ajax({
    url: getWsUrl("typehead"), // path to protein WS
    method: 'post', // POST request 
    data: enzymejson, //post user input on change
    success: function (data) {
        //data is the JSON string
        $(function () {
            $(".enzyme").autocomplete({
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(data, request.term);
                    response(results.slice(0, 5));
                }
            });
        });
    },
});
});

/** functions for dropdowns organism 
 * get organism drop down values for search form
 */
 
var mass_max;
var mass_min;
$(document).ready(function () {
    $.getJSON(getWsUrl("search_init"), function (result) {
        $(".organism").append("<option>" + result.organism[0] + "</option>");
        $(".organism").append("<option>" + result.organism[1] + "</option>");
        $(".ddl").append("<option>" + result.glycan_type[0].name + "</option>");
        var mass_max = result.glycan_mass.max;
        var mass_min = result.glycan_mass.min;
        mass(mass_min, mass_max)


        // check for Id to see if we need to load search values
        //Please do not remove this code as it is required for prepolluting search values.
        var id = getParameterByName('id') || id;

        if(id){
            LoadSearchvalues(id);
        }
    });
});


//Sugar mass value
var nonLinearSlider1 = document.getElementById('slider1');
noUiSlider.create(nonLinearSlider1, {

    connect: true,
    behaviour: 'tap',
    start: [0, 10000],
    range: {
        'min': [0],
        'max': [10000]
    }
});
var nodes1 = [
    document.getElementById('lower-value1'), // 0
    document.getElementById('upper-value1')  // 1
];
// Display the slider value and how far the handle moved
// from the left edge of the slider.
nonLinearSlider1.noUiSlider.on('update', function (values, handle) {
    nodes1[handle].innerHTML = values[handle];
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
        start: [0, 10000],
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

/** glycan sub type dropdown function based on type field
 * @param {numeric} ddl1 - User selected glycan type 
 * @param {numeric} ddl2 - Glycan sub type 
 */

function configureDropDownLists(ddl1, ddl2,callback) {
    var nglycan;
    var oglycan;
    // var nglycan={};
    $.getJSON(getWsUrl("search_init"), function (result) {
        nglycan = result.glycan_type[0].subtype;
        // oglycan = result.glycan_type[1].subtype;
        dataReady();
    });
    function dataReady() {
        switch (ddl1.value) {
            case 'N-glycan':
                ddl2.options.length = 0;
                for (i = 0; i < nglycan.length; i++) {
                    createOption(ddl2, nglycan[i], nglycan[i]);
                }
                break;
            case 'O-glycan':
                ddl2.options.length = 0;
                for (i = 0; i < oglycan.length; i++) {
                    createOption(ddl2, oglycan[i], oglycan[i]);
                }
                break;
            default:
                ddl2.options.length = 0;
                break;
        }
        if(callback) {
            callback();
        }
    }
}
function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
}

/** On submit, function forms the JSON and submits to the search web services
 */
function submitvalues() {
    var query_type = "search_glycan";
    var mass_slider = document.getElementById("slider").noUiSlider.get();
    // var sugar_slider = document.getElementById("slider1").noUiSlider.get();
    var glycan_id = document.getElementById("glycan_id").value;
    var organism = document.getElementById("organism").value;
    var glycantype = document.getElementById("ddl").value;
    var glycansubtype = document.getElementById("ddl2").value;
    var proteinid = document.getElementById("protein").value;
    var enzyme = document.getElementById("enzyme").value;
    var motif = document.getElementById("motif").value;
    var formObject = searchjson(query_type, glycan_id, mass_slider[0], mass_slider[1], organism, glycantype, glycansubtype, enzyme, proteinid, motif);
    var json = "query=" + JSON.stringify(formObject);
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search',
        data: json,
        success: function (results) {
            if(results.search_results_id){
                window.location = './glycan-list.html?id=' + results.search_results_id;
            }
            else{
                displayErrorByCode("1")
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


//form json from form submit
function searchjson(input_query_type, input_glycan_id, mass_min, mass_max, input_organism, input_glycantype, input_glycansubtype, input_enzyme, input_proteinid, input_motif) {
    var formjson = {
        query_type: input_query_type,
        mass: { "min": mass_min, "max": mass_max },
        //  sugar_mass: {"min":sugar_min,"max":sugar_max},
        glycan_id: input_glycan_id,
        organism: input_organism,
        glycantype: input_glycantype,
        glycansubtype: input_glycansubtype,
        enzyme: input_enzyme,
        proteinid: input_proteinid,
        motif: input_motif
    };
    return formjson;
}

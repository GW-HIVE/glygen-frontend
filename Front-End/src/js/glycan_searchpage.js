//  @author: Pradeep Kumar Ragu Chanthar
//  @description: UO1 Version-1.1
//  @Date: 19th Feb 2018

//Functions to auto complete and retrieve the values from JSON
//protein autocomple:
function proteinid() {
    var protein_id = document.getElementById("protein_id").value;
    //alert(protein_id)
    var proteinobj = {
        field: "protein",
        value: protein_id
    }
    var proteinjson =  "query=" +JSON.stringify(proteinobj);
    $.ajax({
        url: 'http://glygen-vm-tst.biochemistry.gwu.edu/api/glycan/typehead', // path to protein WS
        method: 'post', // POST request 
        data: proteinjson, //post user input
        success: function (data) {
            alert("data");
          //  $("#result").html("Successful");
        },
        error: function (error) {
            alert("error");
        }
    });
}


//Motif autocomplete
function motif() {
    var motif = document.getElementById("motif").value;
    $.getJSON('http://glygen-vm-tst.biochemistry.gwu.edu/api/glycan/typehead?query={"field":"motif","value":"' + motif + '"}', function (data) {
        //data is the JSON string
        $(function () {
            $(".motif").autocomplete({
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(data, request.term);
                    response(results.slice(0, 5));
                }
            });
        });
    });
}

//Enzyme autocomplete
function enzyme() {
    var enzyme = document.getElementById("enzyme").value;
    $.getJSON('http://glygen-vm-tst.biochemistry.gwu.edu/api/glycan/typehead?query={"field":"enzyme","value":"' + enzyme + '"}', function (data) {
        //data is the JSON string
        $(function () {
            $(".enzyme").autocomplete({
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(data, request.term);
                    response(results.slice(0, 5));
                }
            });
        });
    });
}

// functions for dropdowns organism 
var mass_max;
var mass_min;
$(document).ready(function () {
    $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search_init", function (result) {
        $(".organism").append("<option>" + result.organism[0] + "</option>");
        $(".organism").append("<option>" + result.organism[1] + "</option>");
        $(".ddl").append("<option>" + result.glycan_type[0].name + "</option>");
        var mass_max = result.glycan_mass.max;
        var mass_min = result.glycan_mass.min;
        mass(mass_min, mass_max)
    });
});


// sugar range
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

//Mass range function
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

//glycan sub type dropdown function based on type field

function configureDropDownLists(ddl1, ddl2) {
    var nglycan;
    var oglycan;
    // var nglycan={};
    $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search_init", function (result) {
        nglycan = result.glycan_type[0].subtype;
        // oglycan = result.glycan_type[1].subtype;
        dataReady();
    });
    function dataReady() {
        //document.write(nglycan);
        switch (ddl1.value) {
            case 'N-glycan':
                ddl2.options.length = 0;
                for (i = 0; i < nglycan.length; i++) {
                    createOption(ddl2, nglycan[i], nglycan[i]);
                }
                // alert(nglycan)
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
    }
}
function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
}
//function to Convert form values to JSON 
function submitvalues() {
    var query_type = "search_glycan";
    var mass_slider = document.getElementById("slider").noUiSlider.get();
    // var sugar_slider = document.getElementById("slider1").noUiSlider.get();
    var glycan_id = document.getElementById("glycan_id").value;
    var organism = document.getElementById("organism").value;
    var glycantype = document.getElementById("ddl").value;
    var glycansubtype = document.getElementById("ddl2").value;
    var proteinid = document.getElementById("protein_id").value;
    var enzyme = document.getElementById("enzyme").value;
    var motif = document.getElementById("motif").value;
    var formObject = searchjson(query_type, glycan_id, mass_slider[0], mass_slider[1], organism, glycantype, glycansubtype, enzyme, proteinid, motif);
    var json = "query=" + JSON.stringify(formObject);
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search',
        data: json,
        success: function (results) {
            window.location = './glycan-list.html?id=' + results.search_results_id;
        }
    });
}
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

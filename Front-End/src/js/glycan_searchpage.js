//  @author: Pradeep Kumar Ragu Chanthar
//  @description: UO1 Version-1.1
//  @Date: 19th Feb 2018

//Functions to auto complete and retrieve the values from JSON
//protein autocomple
function proteinid() {
var proteinid = document.getElementById("proteinid").value;
$.getJSON('http://glygen-vm-tst.biochemistry.gwu.edu/api/glycan/typehead?query={"field":"protein","value":"' + proteinid + '"}', function (data) {
    //data is the JSON string
    $(function () {
        $(".proteinid").autocomplete({
            source: function (request, response) {
                var results = $.ui.autocomplete.filter(data, request.term);
                response(results.slice(0, 5));
            }
        });
    });
});
}

//Motif autocomplete
function motif() {
var motif = document.getElementById("motif").value;
$.getJSON('http://glygen-vm-tst.biochemistry.gwu.edu/api/glycan/typehead?query={"field":"motif","value":"' + motif + '"}', function (data) {
    //data is the JSON string √
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

// functions for range slider
// var mini={};
// var maxi={};
// $.getJSON("http://localhost:8888/Glycan/Drwillyork/templates/formsearch.php?action=get_user&id=1", function (result) {
//         mini = result.glycan_mass.min;
//         maxi = result.glycan_mass.max;
//     });
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
    //  alert(values[handle]);
    //  var values = $(nodes1[handle].innerHTML).val();
    //document.write(values[0]);        
});

//second range function

var nonLinearSlider = document.getElementById('slider');
noUiSlider.create(nonLinearSlider, {
    connect: true,
    behaviour: 'tap',
    start: [0, 10000],
    range: {
        'min': [0],
        'max': [10000]
    }
});
var nodes = [
    document.getElementById('lower-value'), // 0
    document.getElementById('upper-value')  // 1
];
// Display the slider value and how far the handle moved
// from the left edge of the slider.
nonLinearSlider.noUiSlider.on('update', function (values, handle) {
    nodes[handle].innerHTML = values[handle];
});



// functions for dropdowns organism 

$(document).ready(function () {
    $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search_init", function (result) {
        $(".organism").append("<option>" + result.organism[0] + "</option>");
        $(".organism").append("<option>" + result.organism[1] + "</option>");

    });
});

//functions for dropdowns glycan type

$(document).ready(function () {
    $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search_init", function (result) {

        $(".ddl").append("<option>" + result.glycan_type[0].name + "</option>");
        // $(".ddl").append("<option>" + result.glycan_type[1].name + "</option>");

    });
});

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
    var json = $("#myForm").serialize();
    var Glycansearch = $("#myForm").serializeArray();
    var jsonform = JSON.stringify(Glycansearch);
    var data = JSON.parse(jsonform);
    var organism = document.getElementById("organism").value;
    var glycantype = document.getElementById("ddl").value;
    var glycansubtype = document.getElementById("ddl2").value;
    // var sugarmin = document.getElementById("lower-value").value;
    // var sugarmax = document.getElementById("higher-value").value;
    var proteinid = document.getElementById("proteinid").value;
    var enzyme = document.getElementById("enzyme").value;
    var motif = document.getElementById("motif").value;
    var query_type = "search_glycan";
    var formObject = searchjson(query_type, organism, glycantype, glycansubtype, enzyme, proteinid, motif);
    event.preventDefault();
    //     var formObject = {
    //     query_type: "search_glycan",
    //    // mass: '{"min":0,"max":6000}',
    //     glycan_id: data[0].value,
    //     organism: organism,
    //     glycantype: glycantype,
    //     glycansubtype: glycansubtype,
    //     enzyme: enzyme,
    //     proteinid: proteinid,
    //     motif: motif
    // };
   
    var json = JSON.stringify(formObject);
    event.preventDefault();
    redirect(json)
    // var listpage = reload(json)
    // alert(json)
}

//form json from form submit
function searchjson(input_query_type, input_glycan_id, input_mass, input_organism, input_glycantype, input_glycansubtype, input_enzyme, input_proteinid, input_motif) {
    var formjson = {
        query_type: input_query_type,
        mass: input_mass,
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
//get searchid
function redirect(obj) {
    $.getJSON("http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search?query=" + obj, function (result) {
        var url = window.location.href;
        window.location = './listpage.html?id=' + result.search_results_id;

    });
}

// <!--
//     //@author: Rupali Mahadik
// // @description: UO1 Version-1.1.
// //@refactored  :June-27-2017
// @update on July 25 2018 - Gaurav Agarwal - added code for loading gif.
// @update on Aug 27, 2018 - Gaurav Agarwal - added ajax timeout and error handling functions
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

function sortDropdown(a, b) {
    if (a.name < b.name) {
        return -1;
    } else if (b.name < a.name) {
        return 1;
    }
    return 0;
}


/** functions for dropdowns organism
 * get organism drop down values for search form
 */

var searchInitValues;

var mass_max;
var mass_min;
var sugar_mass_min;
var sugar_mass_max;
$(document).ready(function () {
    $.ajax({
        dataType: "json",
        url: getWsUrl("search_init_glycan"),
        timeout: getTimeout("search_init_glycan"),
        error: searchInitFailure,
        success: function (result) {
            searchInitValues = result;


            var orgElement = $("#species").get(0);
            result.organism.sort(sortDropdown);
            for (var x = 0; x < result.organism.length; x++) {
                createOption(orgElement, result.organism[x].name, result.organism[x].id);
            }

            var categoryType = $("#simplifiedCategory").get(0);
            result.simple_search_category.sort(sortDropdownSimple);
            for (var x = 0; x < result.simple_search_category.length; x++) {
                createOption(categoryType, result.simple_search_category[x].id, result.simple_search_category[x].id);
            }

            var glycanElement = $(".ddl").get(0);
            result.glycan_type.sort(sortDropdown);

            for (var x = 0; x < result.glycan_type.length; x++) {
                createOption(glycanElement, result.glycan_type[x].name, result.glycan_type[x].name);
            }

            var mass_max = result.glycan_mass.max;
            var mass_min = result.glycan_mass.min;
            var sugar_mass_min = result.number_monosaccharides.min;
            var sugar_mass_max = result.number_monosaccharides.max;

            var id = getParameterByName('id') || id;
            if (id) {
                LoadSearchvalues(id);
            }
            new Sliderbox({
                target: '.sliderbox',
                start: [mass_min, mass_max], // Handle start position
                connect: true, // Display a colored bar between the handles
                behaviour: 'tap-drag', // Move handle on tap, bar is draggable
                range: { // Slider can select '0' to '100'
                    'min': mass_min,
                    'max': mass_max

                }
            });
            new Sliderbox1({
                target: '.sliderbox1',
                start: [sugar_mass_min, sugar_mass_max], // Handle start position
                connect: true, // Display a colored bar between the handles
                behaviour: 'tap-drag', // Move handle on tap, bar is draggable
                range: { // Slider can select '0' to '100'
                    'min': sugar_mass_min,
                    'max': sugar_mass_max

                }
            });

        }
    });
});

///New slider

Sliderbox = function (options) {

    this.options = options;

    this.init();

};

Sliderbox.prototype.init = function () {

    var box = document.querySelectorAll(this.options.target),
        len = box.length,
        i = 0;

    for (; i < len; i++) {

        this.handler(box[i]);

    }

};

Sliderbox.prototype.handler = function (target) {

    var slider = target.querySelector('.sliderbox-slider'),
        inpMin = target.querySelector('.sliderbox-input-min'),
        inpMax = target.querySelector('.sliderbox-input-max');

    noUiSlider.create(slider, this.options);

    slider.noUiSlider.on('update', function (values, handle) {
        if (handle) {
            inpMax.value = addCommas(parseInt(values[handle]));
        } else {
            inpMin.value = addCommas(parseInt(values[handle]));
        }
    });

    target.addEventListener('change', function (e) {

        if (e.target === inpMin) {

            slider.noUiSlider.set([e.target.value]);

        } else {

            slider.noUiSlider.set([null, e.target.value]);

        }

    });

};
///New slider

Sliderbox1 = function (options) {

    this.options = options;

    this.init();

};

Sliderbox1.prototype.init = function () {

    var box = document.querySelectorAll(this.options.target),
        len = box.length,
        i = 0;

    for (; i < len; i++) {

        this.handler(box[i]);

    }

};

Sliderbox1.prototype.handler = function (target) {

    var slider1 = target.querySelector('.sliderbox-slider1'),
        inpMin1 = target.querySelector('.sliderbox-input-min1'),
        inpMax1 = target.querySelector('.sliderbox-input-max1');

    noUiSlider.create(slider1, this.options);

    slider1.noUiSlider.on('update', function (values, handle) {
        if (handle) {
            inpMax1.value = addCommas(parseInt(values[handle]));
        } else {
            inpMin1.value = addCommas(parseInt(values[handle]));
        }
    });

    target.addEventListener('change', function (e) {

        if (e.target === inpMin1) {

            slider1.noUiSlider.set([e.target.value]);

        } else {

            slider1.noUiSlider.set([null, e.target.value]);

        }

    });

};

/** glycan sub type dropdown function based on type field
 * @param {numeric} ddl1 - User selected glycan type
 * @param {numeric} ddl2 - Glycan sub type
 */

function configureDropDownLists(ddl1, ddl2, callback) {
    var glyan_type_name = ddl1.value;
    // Hides Subtype by default and shows glycan type when it's selected
    var subtypeDiv = document.getElementById("showSubtype");
    if (subtypeDiv.style.display = "block") {
        if (ddl1.value == "") {
            subtypeDiv.style.display = "none";
        }
    } else {
        subtypeDiv.style.display = "block";
        //        var option = document.createElement("selectSubtype");
        //        option.value = "";
        //        option.text = "Select Glycan Subtype";
        //        ddl2.add(option);
    }

    // clears existing options
    ddl2.options.length = 0;

    createOption(ddl2, 'Select Glycan Subtype', '');

    for (var x = 0; x < searchInitValues.glycan_type.length; x++) {
        var glycan_type = searchInitValues.glycan_type[x];

        // find glycan type by name
        if (glycan_type.name === glyan_type_name) {
            glycan_type.subtype.sort(function (a, b) {
                var Atokens = a.split(' ');
                var Btokens = b.split(' ');
                var Atext = Atokens[0];
                var Btext = Btokens[0];
                var Anumber = parseInt(Atokens[1]);
                var Bnumber = parseInt(Btokens[1]);
                if (isNaN(Anumber) || isNaN(Bnumber)) {
                    return Atext > Btext;
                } else {
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


/** On submit, function forms the JSON and submits to the search web services
 */
function submitvalues() {
    // displays the loading gif when the ajax call starts
    $('#loading_image').fadeIn();
    var query_type = "search_glycan";
    var mass_slider = document.getElementById("sliderbox-slider").noUiSlider.get();
    var sugar_slider = document.getElementById("sliderbox-slider1").noUiSlider.get();
    var glycan_id = document.getElementById("glycan_id").value;
    var selected_species = document.getElementById("species");
    var organism = {
        "id": parseInt(selected_species.value),
        "name": selected_species.options[selected_species.selectedIndex].text
    };
    var glycan_type = document.getElementById("ddl").value;
    var glycan_subtype = document.getElementById("ddl2").value;
    var proteinid = document.getElementById("protein").value;
    var enzyme = document.getElementById("enzyme").value;
    var glycan_motif = document.getElementById("motif").value;
    var formObject = searchjson(query_type, glycan_id, mass_slider[0], mass_slider[1], sugar_slider[0], sugar_slider[1], organism, glycan_type, glycan_subtype, enzyme, proteinid, glycan_motif);
    var json = "query=" + JSON.stringify(formObject);
    debugger;
    $.ajax({
        type: 'post',
        url: getWsUrl("glycan_search"),
        data: json,
        timeout: getTimeout("search_glycan"),
        error: ajaxSearchFailure,
        success: function (results) {
            if (results.error_code) {
                displayErrorByCode(results.error_code, results.field);
                // activityTracker("error", "", results.error_code);
                activityTracker("error", "", results.error_code + " for " + json);
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
    var enzymes = {}
    if (input_enzyme) {
        enzymes = {
            "id": input_enzyme,
            "type": "gene"
        }

    }
    var organisms = {
        "id": 0,
        "name": "All"
    }

    if (input_organism.id !== "0") {
        organisms.id = input_organism.id;
        organisms.name = input_organism.name;
    }


    var formjson = {
        "operation": "AND",
        query_type: input_query_type,
        mass: {
            "min": parseInt(mass_min),
            "max": parseInt(mass_max)
        },
        // mass:masses,
        number_monosaccharides: {
            "min": parseInt(sugar_min),
            "max": parseInt(sugar_max)
        },
        enzyme: enzymes,
        glytoucan_ac: input_glycan_id,
        organism: organisms,
        glycan_type: input_glycantype,
        glycan_subtype: input_glycansubtype,
        uniprot_canonical_ac: input_proteinid,
        glycan_motif: input_motif,

    };
    return formjson;
}

function sortDropdown(a, b) {
    if (a.name < b.name) {
        return -1;
    } else if (b.name < a.name) {
        return 1;
    }
    return 0;
}

/**
 * hides the loading gif and displays the page after the search_init results are loaded.
 * @author Gaurav Agarwal
 * @date July 25, 2018
 */
$(document).ajaxStop(function () {
    $('#loading_image').fadeOut();
});

/* ---------------------- 
    Simplified search 
------------------------- */

/**
 * sorting drop down list for category in simplified search page.
 * @author Tatiana Williamson
 * @date October 2, 2018
 */

function sortDropdownSimple(c, d) {
    if (c.id < d.id) {
        return -1;
    } else if (d.id < c.id) {
        return 1;
    }
    return 0;
}

function searchGlycanSimple() {

    // Get values from form fields
    var query_type = "glycan_search_simple";
    var term_category = document.getElementById("simplifiedCategory").value;
    var term = document.getElementById("simplifiedSearch").value;
    var formObjectSimple = searchjsonSimple(query_type, term_category, term);
    var json = "query=" + JSON.stringify(formObjectSimple);
    // call web services 
    $.ajax({
        type: 'post',
        url: getWsUrl("glycan_search_simple"),
        data: json,
        timeout: getTimeout("search_simple_glycan"),
        error: ajaxSearchFailure,
        success: function (results) {
            if (results.error_code) {
                displayErrorByCode(results.error_code);
                // activityTracker("error", "", results.error_code);
                activityTracker("error", "", results.error_code + " for " + json);
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
//formjason from form submit 
function searchjsonSimple(input_query_type, input_category, input_term) {
    var formjsonSimple = {
        "operation": "AND",
        query_type: input_query_type,
        term: input_term,
        term_category: input_category
    };
    return formjsonSimple;
}

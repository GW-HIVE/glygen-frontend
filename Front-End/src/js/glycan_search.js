// @author: Rupali Mahadik
// @description: UO1 Version-1.1.
// @author: Tatiana Williamson
// @description: glycan_search.js
// @refactored  :June-27-2017
// @update on July 25 2018 - Gaurav Agarwal - added code for loading gif.
// @update on Aug 27, 2018 - Gaurav Agarwal - added ajax timeout and error handling functions
// @update on Feb 8, 2019 - Tatiana Williamson

/**
 * Sorts dropdown organism list in asc order in advanced search
 * @param {string} a dropdown name
 * @param {string} b dropdown name
 * @return {string} asc order name
 */
function sortDropdown(a, b) {
    if (a.name < b.name) {
        return -1;
    } else if (b.name < a.name) {
        return 1;
    }
    return 0;
}

/**
 * This helps retain the search tab on pressing the back button from the list page.
 */
$(function () {
    var hash = window.location.hash;
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    $('.nav-tabs a').click(function (e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop() || $('html').scrollTop();
        window.location.hash = this.hash;
        $('html,body').scrollTop(scrollmem);
    });
});

var searchInitValues;
var mass_type_native;
var native_mass_min;
var native_mass_max;
var perMet_mass_min;
var perMet_mass_max;
var sugar_mass_min;
var sugar_mass_max;
var residue_list;
$(document).ready(function () {

    $(".organism").chosen({
        placeholder_text_multiple: "Click to select multiple Organisms",
        width: "100%"
    })
        .bind(function () {
            window.alert("You reached your limited number of selections!");
        });
    // setting width of chosen multiselect dropdown to show placeholder text.
    $(".search-field").css({ "width": "100%" });

    //Section for populating label names from key-value.json
    populateFromKeyValueStore("lbl_glytoucan_acc", "GLYTOUCAN_ID", "", ":", 2);
    populateFromKeyValueStore("lbl_monoiso_mass", "MONOISOTOPIC_MASS", "", ":", 2);
    //End section for populating label names from key-value.json

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
            $("#species").val('').trigger("chosen:updated");
            var categoryType = $("#simplifiedCategory").get(0);
            result.simple_search_category.sort(sortDropdownSimple);
            result.simple_search_category[0].display = "Any category";
            for (var x = 0; x < result.simple_search_category.length; x++) {
                createOption(categoryType, result.simple_search_category[x].display, result.simple_search_category[x].id);
            }
            var glycanElement = $(".ddl").get(0);
            result.glycan_type.sort(sortDropdown);
            for (var x = 0; x < result.glycan_type.length; x++) {
                createOption(glycanElement, result.glycan_type[x].name, result.glycan_type[x].name);
            }

            residue_list = result.composition.map(function (res) {
                // Special case for residue max value less than or equal to 1.
                if (res.max <= 1) {
                    res.max = 2;
                }
                return res;
            });
            var html = "";
            var other_residue = undefined;
            for (var x = 0; x < residue_list.length; x++) {
                if (residue_list[x].residue != "other") {
                    html += getResidueDiv(residue_list[x].name, residue_list[x].residue, parseInt(residue_list[x].min), parseInt(residue_list[x].max));
                } else {
                    other_residue = residue_list[x];
                }
            }
            if (other_residue != undefined) {
                html += getResidueDiv(other_residue.name, other_residue.residue, parseInt(other_residue.min), parseInt(other_residue.max));
            }
            $("#comp_tab").html(html);

            mass_type_native = result.glycan_mass.native.name;
            native_mass_max = Math.ceil(result.glycan_mass.native.max + 1);
            native_mass_min = Math.floor(result.glycan_mass.native.min - 1);
            perMet_mass_max = Math.ceil(result.glycan_mass.permethylated.max + 1);
            perMet_mass_min = Math.floor(result.glycan_mass.permethylated.min - 1);

            var massType = $("#mass-drop").get(0);
            result.organism.sort(sortDropdown);

            for (mstype in result.glycan_mass) {
                createOption(massType, result.glycan_mass[mstype].name, result.glycan_mass[mstype].name);
            }
            massType.value = result.glycan_mass.native.name;

            sugar_mass_min = Math.floor(result.number_monosaccharides.min - 1);
            sugar_mass_max = Math.ceil(result.number_monosaccharides.max + 1);

            var id = getParameterByName('id') || id;
            if (id) {
                LoadSearchvalues(id);
            }
            new Sliderbox({
                target: '.sliderbox',
                start: [native_mass_min, native_mass_max], // Handle start position
                connect: true, // Display a colored bar between the handles
                behaviour: 'tap-drag', // Move handle on tap, bar is draggable
                range: { // Slider can select '0' to '100'
                    'min': native_mass_min,
                    'max': native_mass_max
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

            var id = getParameterByName('id');
            if (id) {
                LoadDataList(id);
            }
            populateExample();

            for (var x = 0; x < residue_list.length; x++) {
                enableDisableMinMax(document.getElementById("comp_" + residue_list[x].residue + "_sel").value,
                    document.getElementById("comp_" + residue_list[x].residue + "_min"),
                    document.getElementById("comp_" + residue_list[x].residue + "_max"));
            }
        }

    });

    /**
     * Submit input value on enter in Simplified search 
     */
    $("#simplifiedSearch").keypress(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            searchGlycanSimple();
        }
    });

    /** 
    * @param {string} No results found 
    * @return {string} Alert message in all searches
    */
    $(".alert").hide();
    $(document).on('click', function (e) {
        $(".alert").hide();
    })

    /** 
    * @param {string} popover and tooltip
    * @return {string} popover and tooltip on search pages
    */
    $('.link-with-tooltip').each(function () {
        $(this).popover({
            content: $(this).attr("popover-content"),
            title: $(this).attr("popover-title")
        });
        $(this).tooltip({
            placement: 'bottom',
            content: $(this).attr("tooltip-title")
        });
        $(this).tooltip('option', 'tooltipClass', 'tooltip-custom')
    })
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
            slider.noUiSlider.set([parseInt(e.target.value.replace(/,/g, ''))]);
        } else {
            slider.noUiSlider.set([null, parseInt(e.target.value.replace(/,/g, ''))]);
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
            slider1.noUiSlider.set([parseInt(e.target.value.replace(/,/g, ''))]);
        } else {
            slider1.noUiSlider.set([null, parseInt(e.target.value.replace(/,/g, ''))]);
        }
    });
};

/** glycan mass type dropdown on change event handler 
 */
$('#mass-drop').on('change', function () {
    var minval_range;
    var maxval_range;
    var glycan_mass_type = $("#mass-drop option:selected").val();
    var slider = $("#sliderbox-slider").get(0);
    var mass_slider = slider.noUiSlider.get();
    var minval = mass_slider[0];
    var maxval = mass_slider[1];

    if (glycan_mass_type == mass_type_native) {
        minval_range = native_mass_min;
        maxval_range = native_mass_max;

        if (minval == perMet_mass_min)
            minval = native_mass_min;

        if (maxval == perMet_mass_max)
            maxval = native_mass_max;
    } else {
        minval_range = perMet_mass_min;
        maxval_range = perMet_mass_max;

        if (minval == native_mass_min)
            minval = perMet_mass_min;

        if (maxval == native_mass_max)
            maxval = perMet_mass_max;
    }

    slider.noUiSlider.updateOptions({
        range: {
            'min': minval_range,
            'max': maxval_range
        }
    });
    slider.noUiSlider.set([minval, maxval]);
});

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
    }

    // clears existing options
    ddl2.options.length = 0;
    createOption(ddl2, 'Select Glycan Subtype', '');
    for (var x = 0; x < searchInitValues.glycan_type.length; x++) {
        var glycan_type = searchInitValues.glycan_type[x];
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

/** 
 * Functions for dropdown option
 */
function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
}

/** On submit, function forms the JSON and submits to the search web services
 * Advanced Search
 */
function submitvalues() {
    // displays the loading gif when the ajax call starts
    $('#loading_image').fadeIn();

    var prevListId = getParameterByName("id") || "";
    activityTracker("user", prevListId, "Performing Advanced Search");
    var query_type = "search_glycan";
    var mass_type = document.getElementById("mass-drop").value;
    var mass_slider = document.getElementById("sliderbox-slider").noUiSlider.get();
    var sugar_slider = document.getElementById("sliderbox-slider1").noUiSlider.get();
    var glycan_id = document.getElementById("glycan_id").value;
    glycan_id = glycan_id.replace(/\u200B/g, "");
    glycan_id = glycan_id.replace(/\u2011/g, "-");
    var selected_species = document.getElementById("species");
    var organism_operation = $("#species_operation").val();
    var organism = [];
    for (i = 0; i < selected_species.selectedOptions.length; i++) {
        organism[i] = {
            "id": parseInt(selected_species.selectedOptions[i].value),
            "name": selected_species.selectedOptions[i].text
        };
    }
    var glycan_type = document.getElementById("ddl").value;
    var glycan_subtype = document.getElementById("ddl2").value;
    var proteinid = document.getElementById("protein").value;
    var enzyme = document.getElementById("enzyme").value;
    var glycan_motif = document.getElementById("motif").value;
    var pmid = document.getElementById("pmid").value;
    var formObject = undefined;
    if ($('.nav-tabs .active').text().trim() == "Composition Search") {
        var residue_comp = undefined;
        residue_comp = [];
        for (var x = 0; x < residue_list.length; x++) {
            var residue = { "residue": residue_list[x].residue, "min": parseInt(document.getElementById("comp_" + residue_list[x].residue + "_min").value), "max": parseInt(document.getElementById("comp_" + residue_list[x].residue + "_max").value) }
            residue_comp.push(residue);
        }
        formObject = searchjson(query_type, undefined, mass_type_native, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, residue_comp);
    } else if ($('.nav-tabs .active').text().trim() == "Advanced Search") {
        formObject = searchjson(query_type, glycan_id, mass_type, mass_slider[0], mass_slider[1], sugar_slider[0], sugar_slider[1], organism, organism_operation, glycan_type, glycan_subtype, enzyme, proteinid, glycan_motif, pmid, residue_comp);
    }

    var json = "query=" + JSON.stringify(formObject);
    $.ajax({
        type: 'post',
        url: getWsUrl("glycan_search"),
        data: json,
        timeout: getTimeout("search_glycan"),
        error: ajaxFailure,
        success: function (results) {
            if (results.error_code) {
                displayErrorByCode(results.error_code, results.field);
                // activityTracker("error", "", results.error_code);
                activityTracker("error", "", "Advanced Search: " + results.error_code + " for " + json);
                $('#loading_image').fadeOut();
            } else if ((results.list_id !== undefined) && (results.list_id.length === 0)) {
                displayErrorByCode('no-results-found');
                activityTracker("user", "", "Advanced Search: no result found for " + json);
                $('#loading_image').fadeOut();
            } else {
                activityTracker("user", prevListId + ">" + results.list_id, "Advanced Search: Searched with modified parameters");
                window.location = './glycan_list.html?id=' + results.list_id;
                $('#loading_image').fadeOut();
            }
        }
    });
}

/**
 * Cleares all fields in advinced search
 * Clear fields button
 */
function resetAdvanced() {
    if ($('.nav-tabs .active').text().trim() == "Composition Search") {
        setFormValues({
            query: {
                composition: residue_list
            }
        });
    } else if ($('.nav-tabs .active').text().trim() == "Advanced Search") {
        setFormValues({
            query: {
                query_type: "search_glycan",
                mass_type: mass_type_native,
                mass: {
                    "min": native_mass_min,
                    "max": native_mass_max
                },
                number_monosaccharides: {
                    "min": sugar_mass_min,
                    "max": sugar_mass_max
                },
                enzyme: {},
                glytoucan_ac: "",
                organism: {
                    organism_list: "",
                    operation: "or"
                },
                glycan_type: "",
                glycan_subtype: "",
                protein_identifier: "",
                glycan_motif: "",
                pmid: "",
            }
        });
    }
}

/** 
 * Forms searchjson from the form values submitted
 * @param {string} input_query_type query search
 * @param {string} input_glycan_id user glycan id input
 * @param {string} input_mass_type user mass type input
 * @param {string} mass_min user mass min input
 * @param {string} mass_max user mass max input
 * @param {string} input_organism user organism input
 * @param {string} input_organism_operation user organism operation input
 * @param {string} input_glycantype user glycan_type input
 * @param {string} input_glycansubtype user glycan_subtype input
 * @param {string} input_enzyme user enzyme input
 * @param {string} input_proteinid user uniprot_id input
 * @param {string} input_motif user motif input
 * @return {string} returns text or id
 * @param {string} input_residue_comp user residue input
 */
function searchjson(input_query_type, input_glycan_id, input_mass_type, input_mass_min, input_mass_max, input_sugar_min, input_sugar_max, input_organism, input_organism_operation, input_glycantype, input_glycansubtype, input_enzyme, input_proteinid, input_motif, input_pmid, input_residue_comp) {
    var enzymes = {}
    if (input_enzyme) {
        enzymes = {
            "id": input_enzyme,
            "type": "gene"
        }
    }
    var monosaccharides = undefined;
    if (input_sugar_min && input_sugar_max) {
        if (input_sugar_min != sugar_mass_min || input_sugar_max != sugar_mass_max) {
            monosaccharides = {
                "min": parseInt(input_sugar_min),
                "max": parseInt(input_sugar_max)
            };
        }
    }

    var input_mass = undefined;
    if (input_mass_min && input_mass_max) {
        if (input_mass_type == mass_type_native) {
            if (input_mass_min != native_mass_min || input_mass_max != native_mass_max) {
                input_mass = {
                    "min": parseInt(input_mass_min),
                    "max": parseInt(input_mass_max)
                };
            }
        } else {
            if (input_mass_min != perMet_mass_min || input_mass_max != perMet_mass_max) {
                input_mass = {
                    "min": parseInt(input_mass_min),
                    "max": parseInt(input_mass_max)
                };
            }
        }
    }

    var organisms = undefined;
    if (input_organism && input_organism.length > 0) {
        organisms = {
            "organism_list": input_organism,
            "operation": input_organism_operation
        }
    }
    var formjson = {
        "operation": "AND",
        query_type: input_query_type,
        mass_type: input_mass_type,
        mass: input_mass,
        number_monosaccharides: monosaccharides,
        enzyme: enzymes,
        glytoucan_ac: input_glycan_id,
        organism: organisms,
        glycan_type: input_glycantype,
        glycan_subtype: input_glycansubtype,
        protein_identifier: input_proteinid,
        glycan_motif: input_motif,
        pmid: input_pmid,
        composition: input_residue_comp
    };
    return formjson;
}

/**
 * Sorts dropdown organism list in asc order in advanced search
 * @param {string} a dropdown name
 * @param {string} b dropdown name
 * @return {string} asc order name
 */
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
    if (c.display < d.display) {
        return -1;
    } else if (d.display < c.display) {
        return 1;
    }
    return 0;
}

/**
 * updates the example on the simplified search on select option.
 */
$('#simplifiedCategory').on('change', populateExample);

function populateExample() {
    $('#simpleCatSelectedOptionExample').show();
    var name = $("#simplifiedCategory option:selected").val();
    var examples = [];
    var exampleText = "Example";

    switch (name.toLowerCase()) {
        case "enzyme":
            examples = ["B4GALT1"];
            break;
        case "glycan":
            examples = ["G17689DH"];
            break;
        case "organism":
            examples = ["Homo sapiens"];
            break;
        case "protein":
            examples = ["P14210-1"];
            break;
        default:
            examples = ["G17689DH", "P14210-1", "B4GALT1", "Homo sapiens"];
            exampleText += "s";
            break;
    }

    //    if (name != "Choose category") {
    $('#simpleCatSelectedOptionExample')[0].innerHTML = exampleText + ": ";
    $.each(examples, function (i, example) {
        $('#simpleCatSelectedOptionExample')[0].innerHTML += "<a href='' class='simpleTextExample' data-tippy='Click to Insert'>" + example + "</a>, ";
    });
    //remove last comma and space
    $('#simpleCatSelectedOptionExample')[0].innerHTML = $('#simpleCatSelectedOptionExample')[0].innerHTML.slice(0, -2);

    $('#simplifiedSearch').attr('placeholder', "Enter the " + getPlaceHolder(name));
    $('[data-toggle="tooltip"]').tooltip();
    clickableExample();
    //    } else {
    //        $('#simpleCatSelectedOptionExample').hide();
    //        $('#simpleTextExample').text('');
    //        $('#simplifiedSearch').attr('placeholder', "Enter the search term");
    //    }
}

/**
 * Assigns a different text in simple search placeholder
 * @param {string} type [Changes a different placeholer text]
 */
function getPlaceHolder(type) {
    switch (type.toLowerCase()) {
        case "glycan":
            return "GlyTouCan Accession";
        case "protein":
            return "UniProtKB Accession";
        case "any":
            return "search term";
        default:
            return type;
    }
}
/**
 * make the example clickable and inserts it into the search input field.
 */
function clickableExample() {
    $('.simpleTextExample').click(function () {
        $('#simplifiedSearch').val($(this).text());
        $('#simplifiedSearch').focus();
        return false;
    });
}

/** On submit, function forms the JSON and submits to the search web services
 * @link {link} glycan_search_simple webservices.
 * @param {string} input_query_type - The user's query_type input to load.
 * @class {string} simplifiedCategory for glycan.
 * @class {string} simplifiedSearch for glycan.
 * @param {function} formObjectSimpleSearch JSON for simplified searc.
 * @param JSON call function formObjectSimple.
 */
function searchGlycanSimple() {
    // displays the loading gif when the ajax call starts
    $('#loading_image').fadeIn();

    var prevListId = getParameterByName("id") || "";
    activityTracker("user", prevListId, "Performing Simplified Search");

    // Get values from form fields
    var query_type = "glycan_search_simple";
    var term_category = document.getElementById("simplifiedCategory").value;
    if (term_category === "") {
        term_category = "any";
    }
    var term = document.getElementById("simplifiedSearch").value;
    var formObjectSimple = searchjsonSimple(query_type, term_category, term);
    var json = "query=" + JSON.stringify(formObjectSimple);
    // call web services
    $.ajax({
        type: 'post',
        url: getWsUrl("glycan_search_simple"),
        data: json,
        //timeout: getTimeout("search_simple_glycan"),
        error: ajaxFailure,
        success: function (results) {
            if (results.error_code) {
                displayErrorByCode(results.error_code);
                activityTracker("error", "", "Simplified Search: " + results.error_code + " for " + json);
                $('#loading_image').fadeOut();
            } else if ((results.list_id !== undefined) && (results.list_id.length === 0)) {
                displayErrorByCode('no-results-found');
                activityTracker("user", "", "Simplified Search: no result found for " + json);
                $('#loading_image').fadeOut();
            } else {
                activityTracker("user", prevListId + ">" + results.list_id, "Simplified Search: Searched with modified parameters");
                window.location = './glycan_list.html?id=' + results.list_id;
                $('#loading_image').fadeOut();
            }
        }
    });
}

/**
 * formjason from form submit.
 * @param {string} input_query_type - The user's query_type input to load.
 * @param {string} input_category - The user's term_category input to load.
 * @param {string} input_term - The user's term input to load.
 * */

function searchjsonSimple(input_query_type, input_category, input_term) {
    var formjsonSimple = {
        "operation": "AND",
        query_type: input_query_type,
        term: input_term,
        term_category: input_category.toLowerCase()
    };
    return formjsonSimple;
}

/* ----------------------
 Start-Prepopulating search results after clicking modify button on glycan list summary section
 * @author Rupali
 * @date October 18, 2018
------------------------- */

/**
 * LoadDataList function to configure and start the request to GWU  service
 * @param {string} id - The glycan id to load
 * */
function LoadDataList(id) {
    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("glycan_list"),
        data: getListPostData(id, 1, 'mass', 'asc', 10),
        method: 'POST',
        timeout: getTimeout("list_glycan"),
        success: ajaxListSuccess,
        error: ajaxFailure
    };

    // make the server call
    $.ajax(ajaxConfig);
}

/**
 * Handling a succesful call to the server for list page
 * @param {Object} data - the data set returned from the server on success
 * @param {Array} data.results - Array of individual results
 * @param {Object} data.pagination - the dataset for pagination info
 * @param {Object} data.query - the dataset for query
 */

function ajaxListSuccess(data) {
    var id = getParameterByName("id")
    if (data.code) {
        console.log(data.code);
        displayErrorByCode(data.code);
        activityTracker("error", id, "error code: " + data.code);
    } else {
        if (data.query) {
            if (data.query.query_type === "glycan_search_simple") {
                $('.nav-tabs a[href="#simple_search"]').tab('show');
                $("#simplifiedCategory").val(data.query.term_category);
                $("#simplifiedSearch").val(data.query.term);
                populateExample();
            } else {
                if (data.query.composition) {
                    $('.nav-tabs a[href="#composition_search"]').tab('show');
                } else {
                    $('.nav-tabs a[href="#advanced_search"]').tab('show');
                }
            }
        }
        activityTracker("user", id, "Search modification initiated");
    }
}
/* ----------------------
 End-Prepopulating search results after clicking modify button on glycan list summary section
 * @author Rupali Mahadik
 * @date October 18, 2018
------------------------- */

/**
 * setResidueMinMaxValue sets min max values based on user selection.
 * @param {object} select_control - Select control.
 * @param {object} min_val - min value control.
 * @param {object} max_val - max value control.
 * */
function setResidueMinMaxValue(select_control, min_val, max_val) {
    var sel_control_value = select_control.value;
    var sel_id = select_control.id;
    var min = undefined;
    var max = undefined;

    var sel_residue = residue_list.filter(function (res) { return sel_id == 'comp_' + res.residue + '_sel' })[0];
    if (sel_residue) {
        min = parseInt(sel_residue.min);
        max = parseInt(sel_residue.max);
    }

    if (sel_control_value == "maybe") {
        min_val.value = parseInt(min);
        if (parseInt(max_val.value) == max || parseInt(max_val.value) == min)
            max_val.value = parseInt(max);
        min_val.min = parseInt(min);
        min_val.max = parseInt(max - 1);
        max_val.min = parseInt(min + 1);
        max_val.max = parseInt(max);
        enableDisableMinMax(sel_control_value, min_val, max_val);
    } else if (sel_control_value == "yes") {
        min_val.value = parseInt(min + 1);
        if (parseInt(max_val.value) == max || parseInt(max_val.value) == min)
            max_val.value = parseInt(max);
        if (parseInt(max_val.value) == parseInt(min_val.value))
            max_val.value = parseInt(min_val.value) + 1;
        min_val.min = parseInt(min + 1);
        min_val.max = parseInt(max - 1);
        max_val.min = parseInt(min + 2);
        max_val.max = parseInt(max);
        enableDisableMinMax(sel_control_value, min_val, max_val);
    } else if (sel_control_value == "no") {
        min_val.value = parseInt(min);
        max_val.value = parseInt(min);
        min_val.min = parseInt(min);
        min_val.max = parseInt(min);
        max_val.min = parseInt(min);
        max_val.max = parseInt(min);
        enableDisableMinMax(sel_control_value, min_val, max_val);
    }
}

/**
 * enableDisableMinMax enables disables min, max value controls.
 * @param {string} sel_control_value - select control value.
 * @param {object} min_val - min value control.
 * @param {object} max_val - max value control.
 * */
function enableDisableMinMax(sel_control_value, min_val, max_val) {
    if (sel_control_value == "maybe") {
        min_val.readOnly = true;
        max_val.readOnly = false;
    } else if (sel_control_value == "yes") {
        min_val.readOnly = false;
        max_val.readOnly = false;
    } else if (sel_control_value == "no") {
        min_val.readOnly = true;
        max_val.readOnly = true;
    }
}

/**
 * getResidueDiv gets html for residue div.
 * @param {string} name - residue name.
 * @param {string} residue - residue id.
 * @param {int} min - max value.
 * @param {int} max - max value.
 * */
function getResidueDiv(name, residue, min, max) {
    var residueDiv =
        '<div class="col-sm-12"> \
        <label class="control-label col-sm-5 text-left" for="comp_search">' +
        name + ': ' +
        '</label> \
        <div class="col-sm-3">' +
        '<select id=' + 'comp_' + residue + '_sel' +
        ' onchange="setResidueMinMaxValue(this, comp_' + residue + '_min, comp_' + residue + '_max)"> \
                <option value="maybe">Maybe</option> \
                <option value="yes">Yes</option> \
                <option value="no">No</option> \
            </select> \
        </div> \
        <div class="col-sm-2"> \
            <input type="number"  \
             min=' + min +
        ' max=' + parseInt(max - 1) +
        ' class="form-control"' +
        ' id=' + 'comp_' + residue + '_min' +
        ' value=' + min +
        ' onblur="onResidueMinMoveOut(this, comp_' + residue + '_max, comp_' + residue + '_sel)"> \
        </div> \
        <div class="col-sm-2"> \
            <input type="number" \
            min=' + parseInt(min + 1) +
        ' max=' + max +
        ' class="form-control"' +
        ' id=' + 'comp_' + residue + '_max' +
        ' value=' + max +
        ' onblur="onResidueMaxMoveOut(this, comp_' + residue + '_min, comp_' + residue + '_sel)"> \
        </div> \
    </div >';
    return residueDiv;
}

/**
 * onResidueMinMoveOut sets min control value based on select option value.
 * @param {object} inputMin - min value control.
 * @param {object} inputMax - max value control.
 * @param {object} selOption - select control.
 * */
function onResidueMinMoveOut(inputMin, inputMax, selOption) {
    if (inputMin.value != "") {
        if (parseInt(inputMin.value) < parseInt(inputMin.min)) {
            inputMin.value = inputMin.min;
        }
        if ((parseInt(inputMin.value) >= parseInt(inputMax.value)) && (selOption.value != "no")) {
            inputMin.value = parseInt(inputMax.value) - 1;
        }
    } else if (inputMin.value == "") {
        if (selOption.value == "maybe") {
            inputMin.value = inputMin.min;
        } else if (selOption.value == "yes") {
            inputMin.value = inputMin.min;
        } else if (selOption.value == "no") {
            inputMin.value = inputMin.min;
        }
    }
}

/**
 * onResidueMaxMoveOut sets max control value based on select option value.
 * @param {string} inputMax - max value control.
 * @param {string} inputMin - min value control.
 * @param {string} selOption - select control.
 * */
function onResidueMaxMoveOut(inputMax, inputMin, selOption) {
    if (inputMax.value != "") {
        if (parseInt(inputMax.value) > parseInt(inputMax.max)) {
            inputMax.value = inputMax.max;
        }
        if ((parseInt(inputMax.value) <= parseInt(inputMin.value)) && (selOption.value != "no")) {
            inputMax.value = parseInt(inputMin.value) + 1;
        }
    } else if (inputMax.value == "") {
        if (selOption.value == "maybe") {
            inputMax.value = inputMax.max;
        } else if (selOption.value == "yes") {
            inputMax.value = inputMax.max;
        } else if (selOption.value == "no") {
            inputMax.value = inputMax.min;
        }
    }
}
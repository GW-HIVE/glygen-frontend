//@author: Rupali Mahadik
// @description: UO1 Version-1.1.
//@update:6 June 2018
//@update: 26 June 2018-web services changes updated
// @update on July 25 2018 - Gaurav Agarwal - added code for loading gif.
// @update on Aug 12, 2018 - Gaurav Agarwal - added ajax timeout and error handling functions

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
$(document).ready(function () {
    $(".glycosylated_aa").chosen({
            // max_selected_options: 10,
            placeholder_text_multiple: "Choose Amino Acid"
        })
        .bind("chosen:maxselected2", function () {
            window.alert("You reached your limited number of selections which is 2 selections!");
        });

    $.ajax({
        dataType: "json",
        url: getWsUrl("search_init_protein"),
        timeout: getTimeout("search_init_protein"),
        error: searchInitFailure,
        success: function (result) {
            searchInitValues = result;

            var orgElement = $("#species").get(0);
            result.organism.sort(sortDropdown);
            for (var x = 0; x < result.organism.length; x++) {
                createOption(orgElement, result.organism[x].name, result.organism[x].id);
            }
            // Sorting Simple search 
            var categoryType = $("#simplifiedCategory").get(0);
            result.simple_search_category.sort(sortDropdownSimple);
            for (var x = 0; x < result.simple_search_category.length; x++) {
                createOption(categoryType, result.simple_search_category[x].id, result.simple_search_category[x].id);
            }

            var mass_max = result.protein_mass.max;
            var mass_min = result.protein_mass.min;
            // mass(mass_min, mass_max);
            // check for ID to see if we need to load search values
            // please do not remove this code as it is required prepopulate search values
            var id = getParameterByName('id') || id;
            if (id) {
                LoadProteinSearchvalues(id);
            }

            new Sliderbox({
                target: '.sliderbox',

                start: [435, 3906488.00], // Handle start position

                connect: true, // Display a colored bar between the handles
                behaviour: 'tap-drag', // Move handle on tap, bar is draggable
                range: { // Slider can select '0' to '100'
                    'min': mass_min,
                    '1%': mass_max / 1024,
                    '10%': mass_max / 512,
                    '20%': mass_max / 256,
                    '30%': mass_max / 128,
                    '40%': mass_max / 64,
                    '50%': mass_max / 32,
                    '60%': mass_max / 16,
                    '70%': mass_max / 8,
                    '80%': mass_max / 4,
                    '90%': mass_max / 2,
                    'max': mass_max
                    // 'min': 435,
                    // 'max': 3906488.00
                }
            });
            var id = getParameterByName('id');
            if(id){
                LoadDataList(id);
            }
        }
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

    //
});

function createOption(ddl, text, value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    ddl.options.add(opt);
}


/** On submit, function forms the JSON and submits to the search web services
 */
function ajaxProteinSearchSuccess() {
    // displays the loading gif when the ajax call starts
    $('#loading_image').fadeIn();
    var query_type = "search_protein";
    var mass_slider = document.getElementById("sliderbox-slider").noUiSlider.get(0);
    var selected_species = document.getElementById("species");
    var organism = {
        "id": parseInt(selected_species.value),
        "name": selected_species.options[selected_species.selectedIndex].text
    };
    var uniprot_id = $("#protein").val();
    var refseq_id = $("#refseq").val();
    var gene_name = $("#gene_name").val();
    var protein_name = $("#protein_name").val();
    var pathway_id = $("#pathway").val();
    var sequence = $("#sequences").val().replace(/\n/g, "");
    var formObject = searchJson(query_type, mass_slider[0], mass_slider[1], organism, uniprot_id, refseq_id, gene_name, protein_name, pathway_id, sequence)
    var json = "query=" + JSON.stringify(formObject);
    $.ajax({
        type: 'post',
        url: getWsUrl("search_protein"),
        data: json,
        timeout: getTimeout("search_protein"),
        error: ajaxSearchFailure,

        success: function (results) {
            if (results.error_code) {
                displayErrorByCode(results.error_code);
                // activityTracker("error", "", results.error_code);
                activityTracker("error", "", "no result found for " + json);
                $('#loading_image').fadeOut();
            } else if ((results.list_id !== undefined) && (results.list_id.length === 0)) {
                displayErrorByCode('no-results-found');
                activityTracker("user", "", "no result found");
                $('#loading_image').fadeOut();
            } else {
                window.location = './protein_list.html?id=' + results.list_id;
                $('#loading_image').fadeOut();
            }
        }
    });
    //     success: function (results) {
    //         if (results.list_id) {
    //             window.location = './protein_list.html?id=' + results.list_id;
    //             $('#loading_image').fadeOut();
    //         } else {
    //             displayErrorByCode("server-down");
    //             activityTracker("error", "", "no result found for " + json);
    //             $('#loading_image').fadeOut();
    //         }
    //
    //     }
    // });
}
function searchJson(input_query_type, mass_min, mass_max, input_organism, input_protein_id,
    input_refseq_id, input_gene_name, input_protein_name, input_pathway_id, input_sequence) {

    var sequences = {}
    if (input_sequence) {
        sequences = {
            "type": "exact",
            "aa_sequence": input_sequence
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
        sequence: sequences,
        organism: organisms,
        refseq_ac: input_refseq_id,
        protein_name: input_protein_name,
        gene_name: input_gene_name,
        pathway_id: input_pathway_id,
        uniprot_canonical_ac: input_protein_id
    };
    return formjson;
}
// to resizing choosen field

$(window).on('resize', function () {
    var $element = $('.chosen-container');
    $element.width($element.parent().width());

})

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
 * sorting drop down list in simplified search page.
 * @author Tatiana Williamson
 * @date October 11, 2018
 */
function sortDropdownSimple(c, d) {
    if (c.id < d.id) {
        return -1;
    } else if (d.id < c.id) {
        return 1;
    }
    return 0;
}

function searchProteinSimple() {
    // Get values from form fields
    var query_type = "protein_search_simple";
    var term_category = document.getElementById("simplifiedCategory").value;
    var term = document.getElementById("simplifiedSearch").value;
    var formObjectSimple = searchjsonSimpleP(query_type, term_category, term);
    var json = "query=" + JSON.stringify(formObjectSimple);
    // call web services 
    $.ajax({
        type: 'post',
        url: getWsUrl("protein_search_simple"),
        data: json,
        timeout: getTimeout("search_simple_protein"),
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
                window.location = './protein_list.html?id=' + results.list_id;
                $('#loading_image').fadeOut();
            }
        }
    });
}
//formjason from form submit 
function searchjsonSimpleP(input_query_type, input_category, input_term) {
    var formjsonSimple = {
        "operation": "AND",
        query_type: input_query_type,
        term: input_term,
        term_category: input_category
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

 * @param {string} id - The protein id to load
 * */
function LoadDataList(id) {

    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("protein_list"),
        data: getListPostData(id, 1,'mass', 'asc',10),
        method: 'POST',
        timeout: getTimeout("list_protein"),
        success: ajaxListSuccess,
        error: ajaxListFailure
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

    if (data.code) {
        console.log(data.code);
        displayErrorByCode(data.code);
        activityTracker("error", id, "error code: " + data.code +" (page: "+ page+", sort: "+ sort+", dir: "+ dir+", limit: "+ limit +")");
    } else {


        if (data.query)
        {
            if(data.query.query_type ==="protein_search_simple"){
                $('.nav-tabs a[href="#tab_default_1"]').tab('show');
                $("#simplifiedCategory").val(data.query.term_category);
                $("#simplifiedSearch").val(data.query.term);

            }
            else{
                $('.nav-tabs a[href="#tab_default_2"]').tab('show');
            }
        }


        activityTracker("user", id, "successful response (page: "+ page+", sort: "+ sort+", dir: "+ dir+", limit: "+ limit +")");

    }

}



/// ajaxFailure is the callback function when ajax to GWU service fails
function ajaxListFailure(jqXHR, textStatus, errorThrown) {
    // getting the appropriate error message from this function in utility.js file
    var err = decideAjaxError(jqXHR.status, textStatus);
    displayErrorByCode(err);
    activityTracker("error", id, err + ": " + errorThrown + " (page: "+ page+", sort: "+ sort+", dir: "+ dir+", limit: "+ limit +")");
    // $('#loading_image').fadeOut();
}
/* ----------------------
 End-Prepopulating search results after clicking modify button on protein list summary section
 * @author Rupali Mahadik
 * @date October 18, 2018
------------------------- */
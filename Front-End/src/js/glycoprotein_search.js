

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

function sortDropdown(a, b)
{
    if (a.name < b.name)
    {
        return -1;
    }
    else if (b.name < a.name)
    {
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
        // placeholder_text_multiple: "Choose Amino Acid"
        placeholder_text_multiple: "Click to highlight multiple selections"
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

            var orgElement = $(".organism").get(0);
            result.organism.sort(sortDropdown);
            for (var x = 0; x < result.organism.length; x++)
            {
                createOption(orgElement, result.organism[x].name, result.organism[x].name);
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

                start: [ 435, 3906488.00 ], // Handle start position

                connect: true, // Display a colored bar between the handles
                behaviour: 'tap-drag', // Move handle on tap, bar is draggable
                range: { // Slider can select '0' to '100'
                    'min': mass_min,
                    '1%':mass_max/1024,
                    '10%': mass_max/512,
                    '20%': mass_max/256,
                    '30%': mass_max/128,
                    '40%': mass_max/64,
                    '50%': mass_max/32,
                    '60%': mass_max/16,
                    '70%': mass_max/8,
                    '80%': mass_max/4,
                    '90%': mass_max/2,
                    'max': mass_max
                    // 'min': 435,
                    // 'max': 3906488.00
                }
            });


        }
    });


///New slider

    Sliderbox = function(options) {

        this.options = options;

        this.init();

    };

    Sliderbox.prototype.init = function() {

        var box = document.querySelectorAll(this.options.target),
            len = box.length,
            i = 0;

        for (; i < len; i++) {

            this.handler(box[i]);

        }

    };

    Sliderbox.prototype.handler = function(target) {

        var slider = target.querySelector('.sliderbox-slider'),
            inpMin = target.querySelector('.sliderbox-input-min'),
            inpMax = target.querySelector('.sliderbox-input-max');

        noUiSlider.create(slider, this.options);

        slider.noUiSlider.on('update', function( values, handle ) {
            if ( handle ) {
                inpMax.value = addCommas(parseInt(values[handle]));
            } else {
                inpMin.value = addCommas(parseInt(values[handle]));
            }
        });

        target.addEventListener('change', function(e) {

            if (e.target === inpMin) {

                slider.noUiSlider.set([e.target.value]);

            }
            else {

                slider.noUiSlider.set([null, e.target.value]);

            }

        });

    };

//
});

/** Mass range function
 * @param {numeric} mass_min - minimum value of the mass range
 * @param {numeric} mass_max - maximum value of the mass range
 */
// function mass(mass_min, mass_max) {
//     var nonLinearSlider = document.getElementById('slider');
//     noUiSlider.create(nonLinearSlider, {
//         connect: true,
//         behaviour: 'tap',
//
//         start: [mass_min, mass_max],
//         range: {
//             'min': mass_min,
//             'max': mass_max
//         }
//     });
//     // nonLinearSlider.noUiSlider.set([mass_min, mass_max]);
//     var nodes = [
//         document.getElementById('lower-value'), // 0
//         document.getElementById('upper-value') // 1
//     ];
//     // Display the slider value and how far the handle moved
//     // from the left edge of the slider.
//     nonLinearSlider.noUiSlider.on('update', function (values, handle) {
//         nodes[handle].innerHTML = addCommas(values[handle]);
//     });
//
// }

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

    var organism = $("#organism").val();
    var uniprot_id = $("#protein").val();
    var refseq_id = $("#refseq").val();
    var mass_slider = document.getElementById("sliderbox-slider").noUiSlider.get();
    // var mass_slider =$(".sliderbox-slider").val();
    var mass_min = mass_slider[0];
    var mass_max = mass_slider[1];
    var gene_name = $("#gene_name").val();
    var protein_name = $("#protein_name").val();
    var pathway_id = $("#pathway").val();
    var sequence = $("#sequences").val();
    var glycan_id = $("#glycan_id").val();
    var glycan_relation = $("#glycan_relation").val();
    var glycosylated_aa = $(".glycosylated_aa").val();
    var glycosylation_evidence = $("#glycosylation_evidence").val();

    var formObject = {
        operation: "AND",
        query_type: "search_protein",
        tax_id: organism ? parseInt(organism) : '',
        uniprot_canonical_ac: uniprot_id,
        refseq_ac: refseq_id,
        mass: { "min": parseInt(mass_min),
            "max": parseInt(mass_max)
        },
        protein_name: protein_name,
        gene_name: gene_name,
        pathway_id: pathway_id,
        sequence: {
            type: "exact",
            aa_sequence: sequence
        },
        glycan: {
            relation: glycan_relation,
            glytoucan_ac: glycan_id
        },
        glycosylated_aa: glycosylated_aa,
        glycosylation_evidence: glycosylation_evidence

    };
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
                activityTracker("error", "", "no result found for "+json);
                $('#loading_image').fadeOut();
            } else if ((results.list_id !== undefined) && (results.list_id.length === 0)) {
                displayErrorByCode('no-results-found');
                activityTracker("user", "", "no result found");
                $('#loading_image').fadeOut();
            } else {
                window.location = './glycoprotein_list.html?id=' + results.list_id;
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
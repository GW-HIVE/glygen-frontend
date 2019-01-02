//@author: Rupali Mahadik
// @description: UO1 Version-1.1.
//@Date:19th Feb 2018. with dummy web service
//@update: 3-April 2018. with real web service
//@update: June 26-2018- with web service changes
// @update: July 5, 2018 - Gaurav Agarwal - Error and page visit logging
// @update on July 25 2018 - Gaurav Agarwal - added code for loading gif.
// @update on Aug 28 2018 - Gaurav Agarwal - updated ajaxFailure function
// @update: Oct 22, 2018 - Gaurav Agarwal - added downloadPrompt() which gets selected creteria for downloading data.

/**
 * Prints a number with commas as thousands separator
 * @param {object} nStr 
 * @return {integer} - returns number with comma ex. 1,000
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

var glytoucan_ac;
/**
 * Handling a succesful call to the server for details page
 * @param {Object} data - the data set returned from the server on success
 */
function ajaxSuccess(data) {
    if (data.error_code) {
        activityTracker("error", glytoucan_ac, data.error_code);
        alertify.alert('Error occured', data.error_code);
    }
    else {
        activityTracker("user", glytoucan_ac, "successful response");

        var template = $('#item_template').html();
        data.hasMotifs = (data.motifs && (data.motifs.length > 0));
        data.hasGlycosylate = (data.glycosylate && (data.glycosylate.length > 0));
        data.imagePath = getWsUrl('glycan_image', data.glytoucan.glytoucan_ac);

        if (data.imagePath && data.hasMotifs ) {
            for (var i = 0; i < data.motifs.length; i++) {
                if(data.motifs[i].id) {
                    data.motifs[i].imagePath = getWsUrl('glycan_image', data.motifs[i].id);
                }
            }
        }

        //check data.
        if (data.species) {

            for (var i = 0; i < data.species.length; i++) {
                var speciesitem = data.species[i];
                var databases = [];
                for(var j = 0; j < speciesitem.evidence.length; j++){
                    var evidenceitem = speciesitem.evidence[j];
                    var found = '';
                    for(var x = 0; x < databases.length; x++){
                        var databaseitem = databases[x];
                        if(databaseitem.database === evidenceitem.database){
                            found = true;
                            databaseitem.links.push({
                                url:  evidenceitem.url,
                                id: evidenceitem.id
                            });
                        }
                    }
                    if(!found){
                        databases.push({
                            database: evidenceitem.database,
                            color: databasecolor(evidenceitem.database),
                            links: [{
                                url: evidenceitem.url,
                                id: evidenceitem.id
                            }]
                        })
                    }
                }

                data.species[i].databases = databases;

            }

        }

        console.log(data.species);




        //Adding breaklines
        if (data.glycoct){
         data.glycoct = data.glycoct.replace(/ /g, '<br>');}
         data.wurcs = data.wurcs.replace(/ /g, '<br>');
        if (data.mass){
         data.mass = addCommas(data.mass);}
        var html = Mustache.to_html(template, data);
        var $container = $('#content');
        var items = data.enzyme ? data.enzyme : [];

        $container.html(html);
        $container.find('.open-close-button').each(function (i, element) {
            $(element).on('click', function () {
                var $this = $(this);
                var buttonText = $this.text();

                if (buttonText === '+') {
                    $this.text('-');
                    $this.parent().next().show();
                } else {
                    $this.text('+');
                    $this.parent().next().hide();
                }
            });
        });

        $('#glycosylation-table').bootstrapTable({
            columns: [{
                field: 'uniprot_canonical_ac',
                title: 'UniProtKB Accession',
                sortable: true,
                formatter: function (value, row, index, field) {
                    return "<a href='protein_detail.html?uniprot_canonical_ac=" + value + "'>" + value + "</a>"
                }
            },

            {
                field: 'gene',
                title: 'Gene Name',
                sortable: true,
                formatter: function (value, row, index, field) {
                    return "<a href='" + row.gene_link + " ' target='_blank'>" + value + "</a>"
                }
            },

            {
                field: 'protein_name',
                title: 'Protein Name',
                sortable: true
            }],
            pagination: 10,
            data: items,

        });

        //Table view for found glycoproteins
        items = data.glycoprotein ? data.glycoprotein : [];
        $('#tbl_found_glycoproteins').bootstrapTable({
            columns: [
                {
                    field: 'protein_name',
                    title: 'Protein Name',
                    sortable: true
                },
                {
                    field: 'uniprot_canonical_ac',
                    title: 'UniProtKB Accession',
                    sortable: true,
                    formatter: function (value, row, index, field) {
                        return "<a href='protein_detail.html?uniprot_canonical_ac=" + value + "'>" + value + "</a>"
                    }
                },
                {
                    field: 'position',
                    title: 'Position',
                    sortable: false
                }
                // {
                //     field: 'evidence',
                //     title: 'Evidence',
                //     sortable: true,
                //     formatter: function (value, row, index, field) {
                //         var evidence_list = "";
                //         value.forEach(function (e) {
                //             evidence_list += e.database + ": <a class='panelcontent' href='" + e.url + "' target='_blank'>" + e.id + "</a><br>";
                //         });
                //         return evidence_list;
                //     }
                // }
            ],
            pagination: 10,
            data: items,
            detailView: true,
            detailFormatter: function (index, row) {
                var detail_view = "";
                row.evidence.forEach(function (e) {
                    detail_view += "<div class='row'>";                    
                    detail_view += "<div><li class='list-group-indent'>" + e.database + ":<a href=' " + e.url + " ' target='_blank'>" + e.id + "</a></li></div>";
                    detail_view += "</div>";
                });
                return detail_view;
            }
        });
    }
    $('#loading_image').fadeOut();
}

/**
 * @param {data} the callback function to GWU service if fails
 * Returns the GWU services fails.
 */

function ajaxFailure(jqXHR, textStatus, errorThrown) {
    // getting the appropriate error message from this function in utility.js file
    var err = decideAjaxError(jqXHR.status, textStatus);
    var errorMessage = JSON.parse(jqXHR.responseText).error_list[0].error_code || err;
    displayErrorByCode(errorMessage);
    activityTracker("error", glytoucan_ac, err + ": " + errorMessage);
    $('#loading_image').fadeOut();
}

/**
 * @param {id} the LoadData function to configure and start the request to GWU service
 * Returns the GWU services.
 */

function LoadData(glytoucan_ac) {
    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("glycan_detail", glytoucan_ac),
        // data: getDetailPostData(id),
        // url: test.json, glytoucan_ac),
        method: 'POST',
        timeout: getTimeout("detail_glycan"),
        success: ajaxSuccess,
        error: ajaxFailure
    };

    // calls the service
    $.ajax(ajaxConfig);
}


function show_evidence(species, database){
    $(".evidence_links").addClass("hidden");
    $("#evidence_" + species + "_" + database).removeClass("hidden");
}

/**
 * getParameterByName function to extract query parametes from url
 * @param {name} string for the name of the variable variable to extract from query string
 * @param {url} string with the complete url with query string values
 * Returns the GWU services.
 */

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function () {
    glytoucan_ac = getParameterByName('glytoucan_ac');
    document.title = glytoucan_ac + " Detail - glygen";   //updates title with the glycan ID
    LoadData(glytoucan_ac);
});

/**
 * Gets the values selected in the download dropdown 
 * and sends to the downloadFromServer() function in utility.js
 * @author Gaurav Agarwal
 * @since Oct 22, 2018.
 */
function downloadPrompt() {
    var page_type = "glycan_detail";
    var format = $('#download_format').val();
    var IsCompressed = $('#download_compression').is(':checked');
    downloadFromServer(glytoucan_ac, format, IsCompressed, page_type);
}
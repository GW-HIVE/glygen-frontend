// @author: Tatiana Williamson
// @description: UO1 Version-1.2.0
// @Date: November 30, 2018


var query;
/**
 * Handling a succesful call to the server for details page
 * @param {Object} data - the data set returned from the server on success
 */
function ajaxSuccess(data) {
    if (data.error_code) {
        activityTracker("error", query, data.error_code);
        alertify.alert('Error occured', data.error_code);
    }
    else {
        activityTracker("user", query, "successful response");

        var templateDetail = $('#item_template_detail').html();
        var templatePubl = $('#item_template_publ').html();
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

        //Adding breaklines
        if (data.glycoct){
         data.glycoct = data.glycoct.replace(/ /g, '<br>');}
         data.wurcs = data.wurcs.replace(/ /g, '<br>');
        if (data.mass){
         data.mass = addCommas(data.mass);}
        var htmlDetail = Mustache.to_html(templateDetail, data);
        var htmlPubl = Mustache.to_html(templatePubl, data);
        var $containerDetail = $('#content_detail');
        var $containerPubl = $('#content_publ');
        var items = data.enzyme ? data.enzyme : [];

        $containerDetail.html(htmlDetail);
        $containerPubl.html(htmlPubl);

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
        url: getWsUrl("motif_detail", glytoucan_ac),
        // data: getDetailPostData(id),
        // url: test.json, glytoucan_ac),
        method: 'POST',
        timeout: getTimeout("detail_motif"),
        success: ajaxSuccess,
        error: ajaxFailure
    };

    // calls the service
    $.ajax(ajaxConfig);
}

/**
 * getParameterByName function to extract query parametes from url
 * @param {name} string for the name of the variable to extract from query string
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
    query = getParameterByName('glytoucan_ac');
    document.title = query + " Motif details - glygen";   //updates title with the glycan ID
    LoadData(query);
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

//  --- Glycan List Table ----


String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
    };
var id = '';
var page = 1;
var sort = 'glytoucan_ac';
var dir = 'asc';
var url = getWsUrl('glycan_list') + "?action=get_user";
var limit = 20;

/**
 * it creates user interface for summary
 * @param {Object} queryInfo - the dataset of pagination info is retun from server
 * @param {string} queryInfo.execution_time - The queryInfo.execution_time gives execution_time of query in the form of date.
 * @param {integer} paginationInfo.limit - The paginationInfo.limit givesrecords per page from pagination object
 */

//function buildSummary(queryInfo) {
//    var summaryTemplate = $('#summary-template').html();
//    queryInfo.execution_time = moment().format('MMMM Do YYYY, h:mm:ss a')
//    var summaryHtml = Mustache.render(summaryTemplate, queryInfo);
//    $('#summary-table').html(summaryHtml);
//}

/**
 * Format function of getting total result for each search   [+]
 * @param {total_length} paginationInfo.total_length -
 */

function totalNoSearch(total_length) {
    $('.searchresult').html("\"" + total_length + " glycans were found\"");
}

/**
 * Format function to create link to the details page
 * @param {object} value - The data binded to that particular cell.
 * @return - Details particular Glycan Id
 */
function pageFormat(value, row, index, field) {
    return "<a href='glycan_detail.html?glytoucan_ac=" + value + "'>" + value + "</a>";
}

/**
 * Format function for column that contains the cartoon
 * @param {object} value - The data binded to that particular cell.
 * @param {object} row - The data binded to that particular row.
 * @return- Glycanimage
 */

// For Image Column
function imageFormat(value, row, index, field) {
    var url = getWsUrl('glycan_image', row.glytoucan_ac);
    return "<div class='img-wrapper'><img class='img-cartoon' src='" + url + "' alt='Cartoon' /></div>";
}

/**
 * Format function for column "MASS"
 * @param {object} value - The data binded to that particular cell.
 * @return- Glycan Mass if available else NA
 */

function massFormatter(value) {
    if (value) {
        var mass = value;
        return value;
    } else {
        return "NA";
    }
}

/**
 * updateSearch function of the detail table when opening each row [+]
 * @param {int} index - The row clicked
 * @param {object} row - The data object binded to the row
 * @return- detail view with IUPAC AND GLYCOCT
 */

var lastSearch;

function editMotifSearch() {
    {
        window.location.replace("glycan_search.html?id=" + id);
        activityTracker("user", id, "edit search");
    }
}

function backGlycanDetail() {
    {
        window.location.replace("glycan_detail.html?glytoucan_ac=" + id);
        activityTracker("user", id, "edit search");
    }
}
/**
 * Handling a succesful call to the server for list page
 * @param {Object} data - the data set returned from the server on success
 * @param {Array} data.results - Array of individual results
 * @param {Object} data.pagination - the dataset for pagination info
 * @param {Object} data.query - the dataset for query
 */

function ajaxListSuccess(data) {
    // console.log(data);
    //console.log(data.code);
    if (data.code) {
        console.log(data.code);
        displayErrorByCode(data.code);
        activityTracker("error", id, "error code: " + data.code + " (page: " + page + ", sort: " + sort + ", dir: " + dir + ", limit: " + limit + ")");
    } else {
        var $table = $('#gen-table');
        var items = [];
        if (data.results) {
            for (var i = 0; i < data.results.length; i++) {
                var glycan = data.results[i];
                items.push({
                    glytoucan_ac: glycan.glytoucan_ac,
//                    mass: glycan.mass,
//                    number_proteins: glycan.number_proteins,
//                    number_enzymes: glycan.number_enzymes,
//                    number_monosaccharides: glycan.number_monosaccharides,
//                    iupac: glycan.iupac,
//                    glycoct: glycan.glycoct
                });
            }
        }
        if (data.query.organism && (data.query.organism.id === 0)) {
            data.query.organism.name = "All";
        }
        $table.bootstrapTable('removeAll');
        $table.bootstrapTable('append', items);
        buildPages(data.pagination);
        buildSummary(data.query);
        // buildSummary(data.query, question);
        // document.title='glycan-list';
        lastSearch = data;
        activityTracker("user", id, "successful response (page: " + page + ", sort: " + sort + ", dir: " + dir + ", limit: " + limit + ")");
    }
}

/// ajaxFailure is the callback function when ajax to GWU service fails
function ajaxListFailure(jqXHR, textStatus, errorThrown) {
    // getting the appropriate error message from this function in utility.js file
    var err = decideAjaxError(jqXHR.status, textStatus);
    var errorMessage = JSON.parse(jqXHR.responseText).error_list[0].error_code || err;
    displayErrorByCode(errorMessage);
    activityTracker("error", id, err + ": " + errorMessage + " (page: "+ page+", sort: "+ sort+", dir: "+ dir+", limit: "+ limit +")");
    // $('#loading_image').fadeOut();
}

/**
 * LoadDataList function to configure and start the request to GWU  service
 * @param {string} id - The glycan id to load
 * */
function LoadDataList() {
    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("glycan_list"),
        data: getListPostData(id, page, sort, dir, limit),
        method: 'POST',
        timeout: getTimeout("list_glycan"),
        success: ajaxListSuccess,
        error: ajaxListFailure
    };
    // make the server call
    $.ajax(ajaxConfig);
}

/**
 * getParameterByName function to EXtract query parametes from url
 * @param {string} name - The name of the variable variable to extract from query string
 * @param {string} url- The complete url with query string values
 * @return- A new string representing the decoded version of the given encoded Uniform Resource Identifier (URI) component.
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

var id = getParameterByName('id');
LoadDataList(id);

/**
 * hides the loading gif and displays the page after the results are loaded.
 * @author Gaurav Agarwal
 * @date July 25, 2018
 */
$(document).ajaxStop(function () {
    $('#loading_image').fadeOut();
});



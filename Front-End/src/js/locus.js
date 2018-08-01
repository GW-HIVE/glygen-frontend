//@author: Rupali Mahadik
// @description: UO1 Version-1.1.
//31st july



/**

 * Adding function to String prototype to shortcut string to a desire length.

 * @param {int} n - The length of the string
 * @returns {int} -Short String
 */

String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
    };
var id = '';
var page = 1;
var sort = 'uniprot_canonical_ac';
var dir = $('.dir-select').val();
var url = getWsUrl('loci_list') + "?action=get_user";
var limit = 10;

/**
 * Reads a new limit and reloads the data.
 * @param {domNode} element - The element from which we take the new limit value
 */
function xlimit(element) {
    limit = $(element).val();
    $('.limit-select').val(limit);
    LoadDataList();
    activityTracker("user", id, "page limit: " + limit);
}

/**
 * Loads the next page of results
 */
function next() {
    page = page + 1;
    $(".page-select").val(page);
    LoadDataList();
    activityTracker("user", id, "page: " + page);
}

/**
 * Loads the Previous page of results
 */
function prev() {
    if (page > 1) {
        page = page - 1;
        $(".page-select").val(page);
        LoadDataList();
        activityTracker("user", id, "page: " + page);
    }
}

/**
 * Reads a new page and reloads the data.
 * @param {domNode} element - The element from which we take the new page value
 */
function xpage(element) {
    page = parseInt($(element).val(), 10);
    $('.page-select').val(page);
    LoadDataList();
    activityTracker("user", id, "page: " + page);
}

/**
 * Reads a new sort and reloads the data.
 * @param {domNode} element - The element from which we take the new sort value
 */

function xsort(element) {
    sort = $(element).val();
    $('.sort-select').val(sort);
    LoadDataList();
    activityTracker("user", id, "sort: " + sort);
}

/**
 * Reads a new asc/dec dirction for data  and reloads the data.
 * @param {domNode} element - The element from which we take the new direction value
 */

function xdir(element) {
    dir = $(element).val();
    $('.dir-select').val(dir);
    LoadDataList();
    activityTracker("user", id, "sort direction: " + dir);
}

/**
 * its calculate no of pages using limit and total_length.
 * @param {integer} total_length - The total_length is total number of records
 * @param {integer} limit - The limit is records per page
 * @returns {number} Number of pages
 */
function noOfPage(total_length, limit) {
    var size = Math.ceil(total_length / limit);
    return size;
}


/**
 * totalNoSearch show user total search result.
 * @param {integer} paginationInfo.total_length - The paginationInfo.total_length gives total number of records from pagination object
 */
function totalNoSearch(total_length) {
    $('.searchresult').html(" You Found  " + total_length + " results of glycan");

}


/**
 * it creates user interface for pagination for dropdown
 * @param {Object} paginationInfo - the dataset of pagination info is retun from server
 * @param {integer} paginationInfo.total_length - The paginationInfo.total_length gives total number of records from pagination object
 * @param {integer} paginationInfo.limit - The paginationInfo.limit givesrecords per page from pagination object
 */

function buildPages(paginationInfo) {
    var total_length = noOfPage(paginationInfo.total_length, paginationInfo.limit);
    var pageSelectors = $(".page-select");
    pageSelectors.empty();
    for (var i = 1; i <= total_length; i++) {
        pageSelectors.append($("<option></option>").attr("value", i).text(i));
    }
    pageSelectors.val(page);
    /**
     * this works for Showing user how many results they found .

     */
    totalNoSearch(paginationInfo.total_length);
    /**
     * this works for enabling and disable prev and next button.

     */
    $(".prevbutton").attr("disabled", (page == 1));
    $(".nextbutton").attr("disabled", (page == total_length));
}




/**

 * Format function to create link to the details page

 * @param {object} value - The data binded to that particular cell.
 @return -Details particular Glycan Id
 */
function pageFormat(value, row, index, field) {
    return "<a href='protein_detail.html?uniprot_canonical_ac=" + value + "'>" + value + "</a>";
}

function pageFormat1(value, row, index, field) {
    return "<a href='" + row.gene_link + " ' target='_blank'>" + value + "</a>"
}







/**

 * Format function of the detail table when opening each row [+]

 * @param {int} index - The row clicked

 * @param {object} row - The data object binded to the row
 * @return- detail view with IUPAC AND GLYCOCT
 */


function detailFormat(index, row) {
    var html = [];
    // var glyco = row.start_pos.replace(/ /g, '\n');
    html.push('<li>Chromosome:' + row.chromosome + '</li>');
    html.push('<li>Start Position:' + row.start_pos + '</li>');
    html.push('<li>End Position:' + row.end_pos + '</li>');


    activityTracker("user", id, "Detail view of " + row.uniprot_canonical_ac);
    return html.join('');
}



function editSearch() {
    {
        window.location.replace("glycan_search.html?id=" + id);
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
        activityTracker("error", id, "error code: " + data.code +" (page: "+ page+", sort:"+ sort+", dir: "+ dir+", limit: "+ limit +")");
    } else {


        var $table = $('#gen-table');
        var items = [];
        if (data.results) {
            for (var i = 0; i < data.results.length; i++) {
                var glycan = data.results[i];
                items.push({
                    uniprot_canonical_ac: glycan.uniprot_canonical_ac,
                    gene_link: glycan.gene_link,
                    gene_name: glycan.gene_name,
                    protein_name: glycan.protein_name,
                    organism: glycan.organism,
                    chromosome: glycan.chromosome,
                    start_pos: glycan.start_pos,
                    end_pos: glycan.end_pos,
                    tax_id: glycan.tax_id
                });
            }
        }

        $table.bootstrapTable('removeAll');
        $table.bootstrapTable('append', items);

        buildPages(data.pagination);

        // buildSummary(data.query);



        activityTracker("user", id, "successful response (page: "+ page+", sort:"+ sort+", dir: "+ dir+", limit: "+ limit +")");
    }

}

/// ajaxFailure is the callback function when ajax to GWU service fails
function ajaxListFailure() {
//  $('#error-message').show();
    displayErrorByCode('server_down');
    activityTracker("error", id, "server down (page: "+ page+", sort:"+ sort+", dir: "+ dir+", limit: "+ limit +")");
}

/**

 * LoadDataList function to configure and start the request to GWU  service

 * @param {string} id - The glycan id to load
 * */
function LoadDataList() {

    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("loci_list"),
        data: getListPostData(id, page, sort, dir, limit),
        method: 'POST',
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


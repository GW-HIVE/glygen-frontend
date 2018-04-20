//@author: Rupali Mahadik

// @description: UO1 Version-1.1.

//@Date:19th Feb 2018.

//@update:3 April 2018.

/**

 * Adding function to String prototype to shortcut string to a desire length.

 * @param {int} n - The length of the string

 */

String.prototype.trunc = String.prototype.trunc ||
 function(n) {
 return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
 };

var page = 1;
var sort = 'id';
var dir = 'asc';
var url = getWsUrl('list') + "?action=get_user";
var limit = 10;

function xlimit(element) {
 limit = $(element).val();
 $('.limit-select').val(limit);
 LoadData();
}

function next() {
page = page + 1;
  $(".page-select").val(page);
  LoadData();
}

function prev() {
  if (page > 1) {
    page = page - 1;
    $(".page-select").val(page);
    LoadData();
  }
}

function xpage(element) {
 page = $(element).val();
 $('.page-select').val(page);
 LoadData();
}

function xsort(element) {
 sort = $(element).val();
 $('.sort-select').val(sort);
 LoadData();
}

function xdir(element) {
 dir = $(element).val();
 $('.dir-select').val(dir);
 LoadData();
}

function noOfPage(total_length,limit){
 var size = Math.ceil(total_length / limit);
 return size;
}

function buildPages(paginationInfo){
 var total_length = noOfPage(paginationInfo.total_length, paginationInfo.limit);
 var pageSelectors = $(".page-select");
 pageSelectors.empty();
 for(var i=1; i <= total_length; i++){
 pageSelectors.append($("<option></option>").attr("value", i).text(i));
 }

 pageSelectors.val(page);
}

function buildSummary (queryInfo) {
 var summaryTemplate = $('#summary-template').html();
 queryInfo.execution_time = moment(queryInfo.execution_time).format("MM-DD-YYYY");

 var summaryHtml = Mustache.render(summaryTemplate, queryInfo);
 $('#summary-table').html(summaryHtml);
}

function redirectPage1()
         {
         window.location.replace("http://glycomics.ccrc.uga.edu/ggtest/gui/index.html");
         }
          function redirectPage2()
         {
         window.location.href = "http://glycomics.ccrc.uga.edu/ggtest/gui/glycan_searchpage.html";
         } 
         
         
         $(document).ready(function(){
    $("demosearch").tooltip();
}); 

function editSearch(){
  {
    window.location.replace("http://glycomics.ccrc.uga.edu/ggtest/gui/glycan_searchpage.html?id="+id);
    }
}
/**

 * Format function to create link to the details page

 * @param {object} value - The data binded to that particular cell.
 @return -Details particular Glycan Id 
 */
function PageFormat(value, row, index, field) {
 return "<a href='details.html?id=" + value + "'>" + value + "</a>";
}

/**

 * Format function for column that contains the cartoon

 * @param {object} value - The data binded to that particular cell.

 * @param {object} row - The data binded to that particular row.
 * @return- Glycanimage
 */

// For Image Column
function ImageFormat(value, row, index, field) {
//  var url = getImageWsUrl(row.ID);
var url = getWsUrl('image_service', row.id);
 return "<div class='img-wrapper'><img class='img-cartoon' src='" + url + "' alt='Cartoon' /></div>";
}


/**

 * Format function for column "MASS"

 * @param {object} value - The data binded to that particular cell.
 * @return- Glycan Mass if available else NA
 */

function MassFormatter(value) {
 if (value) {
 var mass = value;
 return value;


 } else {
 return "NA";
 }
}


/**

 * Format function of the detail table when opening each row [+]

 * @param {int} index - The row clicked

 * @param {object} row - The data object binded to the row
 * @return- detail view with IUPAC AND GLYCOCT
 */


function DetailFormat(index, row) {
 var html = [];
 var glyco = row.glycoct.replace(/ /g, '\n');
 html.push('<div class="row"><div class="col-md-2 col-xs-12"><strong>IUPAC</strong></div><div class="col-md-10 col-xs-12"><pre>' + row.iupac + '</pre></div></div>');
 html.push('<div class="row"><div class="col-md-2 col-xs-12"><strong>GlycoCT</strong></div><div class="col-md-10 col-xs-12"><pre>' + glyco + '</pre></div></div>');
 return html.join('');
}









// var lastSearch;


// function searchAgain() {
//   console.log(lastSearch.query);
//   $.ajax({
//     method: 'GET',
//     dataType: "json",
//     url: 'http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search?query=' + JSON.stringify(lastSearch.query),
//     success: function (result) {
//       if (result.search_results_id) {
//         console.log(result);
//         window.location = 'listpage.html?id=' + result.search_results_id;
//       } else {
//         // handle if no results
//       }
//     },
//     error: ajaxFailure
//   });
// }




// var updateSearch;

// function editSearch() {
//   console.log(updateSearch.query);
//   $.ajax({
//     method: 'GET',
//     dataType: "json",
//     url: 'http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/list?query=' + JSON.stringify(updateSearch.query),
//     success: function (result){
//     if (result.edit_results_id) {
//       console.log(result);
//       // window.location = "http://glycomics.ccrc.uga.edu/ggtest/gui/glycan_searchpage.html?id="+id;
//       window.location.replace("http://glycomics.ccrc.uga.edu/ggtest/gui/glycan_searchpage.html?id="+id);
//     } else {
//       // handle if no results
//     }
//   },
//   error: ajaxFailure
// });
// }

function editSearch() {
  {
    window.location.replace("glycan_searchpage.html?id="+id);
    }
}

/**

 * Call server for data

 * @param {int} id - The id of the user

 */

function ajaxSuccess(data) {
 var $table = $('#gen-table');
 var items = [];
 //number of elements
 // console.log(data);
 if (data.results) {
 for (var i = 0; i < data.results.length; i++) {
 var glycan = data.results[i];

 items.push({
 id: glycan.id,
 mass: glycan.mass,
 number_proteins: glycan.number_proteins,
 number_enzymes: glycan.number_enzymes,
 number_sugar: glycan.number_sugar,
 iupac: glycan.iupac,
 glycoct: glycan.glycoct
 });
 }
//  buildSummary(data.query);
 $table.bootstrapTable('removeAll');
 $table.bootstrapTable('append', items);

 //$('[data-toggle="popover"]').popover();

 $('#error-message').hide();
 }

 buildPages(data.pagination);

 buildSummary(data.query);

 lastSearch = data;
 updateSearch=data;
}


function ajaxFailure() {
 $('#error-message').show();
}

function LoadData() {

 var ajaxConfig = {
 dataType: "json",
 url: getWsUrl("list"),
 data: getListPostData(id, page, sort, dir, limit),
 method: 'POST',
 success: ajaxSuccess,
 error: ajaxFailure
 };
 // make the server call
 $.ajax(ajaxConfig);
}

function getParameterByName(name, url) {
 if (!url) url = window.location.href;
 name = name.replace(/[\[\]]/g, "\\$&");
 var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
 results = regex.exec(url);
 if (!results) return null;
 if (!results[2]) return '';
 return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var id = getParameterByName('id') || id;


LoadData(id);
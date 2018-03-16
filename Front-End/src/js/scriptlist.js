

/**

 * Adding function to String prototype to shortcut string to a desire length.

 * @param {int} n - The length of the string

 */

String.prototype.trunc = String.prototype.trunc ||
  function (n) {
    return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
  };

var id = 4;
var page = 1;
var sort = 'ID';
var dir = 'ASC';
var url = getWsUrl('list') + "?action=get_user";



function next() {
  page = page + 1;
  if (page > 1122) {
    page = 1122;
  }
  $("#page-select").val(page);
  LoadData();
}

function prev() {
  page = page - 1;
  if (page < 1) {
    page = 1;
  }
  $("#page-select").val(page);
  LoadData();
}

function xpage() {
  page = $("#page-select").val();
  LoadData();
}

function xsort() {
  sort = $("#sort-select").val();
  LoadData();
}

function xdir() {
  dir = $("#dir-select").val();
  LoadData();
}
/**

 * Format function to create link to the details page

 * @param {object} value - The data binded to that particular cell.

 */
function PageFormat(value, row, index, field) {
  return "<a href='details.html?id=" + value + "'>" + value + "</a>";
}

/**

 * Format function for column that contains the cartoon

 * @param {object} value - The data binded to that particular cell.

 * @param {object} row - The data binded to that particular row.

 */

//  For Image Column
function ImageFormat(value, row, index, field) {
  var url = getImageWsUrl(row.ID);
  return "<div class='img-wrapper'><img class='img-cartoon'  src='" + url + "' alt='Cartoon' /></div>"
}
/**

 * Format function for column "MASS"

 * @param {object} value - The data binded to that particular cell.

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

 */


function DetailFormat(index, row) {
  var html = [];
  var glyco = row.GlycoCT.replace(/ /g, '\n');
  html.push('<div class="row"><div class="col-md-2 col-xs-12"><strong>IUPAC</strong></div><div class="col-md-10 col-xs-12"><pre>' + row.IUPAC + '</pre></div></div>');
  html.push('<div class="row"><div class="col-md-2 col-xs-12"><strong>GlycoCT</strong></div><div class="col-md-10 col-xs-12"><pre>' + glyco + '</pre></div></div>');
  return html.join('');
}

/**

 * Call server for data

 * @param {int} id - The id of the user

 */


function LoadData() {
  var $table = $('#gen-table');
  var $service = url;


  $service = getListWsUrl(id, page, sort, dir, 10);

  // alert($service);       just for testing:

  // Define ajax settings
  var ajaxConfig = {
    dataType: "json",
    url: $service,
    // data: data,
    success: ajaxSuccess,
    error: ajaxFailure
  };

  function ajaxFailure() {
    $('#error-message').show();
  }

  // make the server call
  $.ajax(ajaxConfig);

  function ajaxSuccess(data) {
    var items = new Array();
    //number of elements
    // console.log(data);
    if (data.results) {
      for (var i = 0; i < data.results.length; i++) {
        var glycan = data.results[i];

        items.push({
          ID: glycan.ID,
          Mass: glycan.mass,
          number_proteins: glycan.number_proteins,
          number_enzymes: glycan.number_enzymes,
          Classification: glycan.classification,
          IUPAC: glycan.IUPAC,
          GlycoCT: glycan.GlycoCT
        })
      }
    }


    $table.bootstrapTable('removeAll');
    $table.bootstrapTable('append', items);

    $('[data-toggle="popover"]').popover();

    $('#error-message').hide();
  }

  $.getJSON($service, ajaxSuccess);
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


var id = getParameterByName('id');

 
LoadData();

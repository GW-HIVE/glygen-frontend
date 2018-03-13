//@author: Rupali Mahadik 
// @description: UO1 Version-1.1.
//@Date:19th Feb 2018.



// function (trunc) to string prototype
/**
   * Returns 
   */
String.prototype.trunc = String.prototype.trunc ||
function(n){
    return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
};

var id = 4;
    var page = 1;
    var sort = 'ID';
    var dir = 'ASC';
    var url = "http://glycomics.ccrc.uga.edu/ggtest/service/listpage_json.php?action=get_user";



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

//  For ID column
function PageFormat(value, row, index, field){
  return "<a href='details.html?id=" + value + "'>" + value +  "</a>";
}


//  For Image Column
function ImageFormat(value, row, index, field){
   var url = 'http://glycomics.ccrc.uga.edu/ggtest/service/newimageservice.php?action=get_user&id=' + row.ID;
   return "<div class='img-wrapper'><img class='img-cartoon'  src='"  + url + "' alt='Cartoon' /></div>"
}
//  For Mass column

function MassFormatter(value) {
  if(value){
    var mass = value;
    return  value + ' Da';

    
  }
  else {
    return "NA";
  }
}


//  For detail view of IUPAC AND Glycoct
function DetailFormat(index, row){
    var html = [];
    var glyco = row.GlycoCT.replace(/ /g, '\n');
    html.push('<div class="row"><div class="col-md-2 col-xs-12"><strong>IUPAC</strong></div><div class="col-md-10 col-xs-12"><pre>' + row.IUPAC + '</pre></div></div>');
    html.push('<div class="row"><div class="col-md-2 col-xs-12"><strong>GlycoCT</strong></div><div class="col-md-10 col-xs-12"><pre>' + glyco + '</pre></div></div>');
    return html.join('');
}

    

    function LoadData() {
      var $table = $('#gen-table');
      var $service = url;
      $service = $service + "&id=" + id;

  //real offset (initial record page x 10)
    //  $service = $service + "&offset=" + ((page -1) * 10);

//test offset = Page
      $service = $service + "&offset=" + page;

      $service = $service + "&limit=10";
      $service = $service + "&sort=" + sort;
      $service = $service + "&order=" + dir;

      alert($service);

      $.getJSON($service,
        function(data) {

          var items = new Array();
          //number of elements
          console.log(data);
          if (data.results) {
            for (var i = 0; i < data.results.length; i++) {
              var glycan = data.results[i];

               items.push({
                ID: glycan.ID,
                Mass:glycan.mass,
                number_proteins:glycan.number_proteins,
                number_enzymes:glycan.number_enzymes,
                Classification: glycan.classification,
                IUPAC: glycan.IUPAC,
                GlycoCT: glycan.GlycoCT
              })
            }
          }


          $table.bootstrapTable('removeAll');
          $table.bootstrapTable('append', items);

          $('[data-toggle="popover"]').popover();

        }
      );
    }
//I am getting query string values in JavaScript here



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
      LoadData(id);
   

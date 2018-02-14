
// function (trunc) to string prototype
String.prototype.trunc = String.prototype.trunc ||
function(n){
    return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
};
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

    return mass;
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

// I am calling parameter from serviceURL here in table

function LoadData(id){
   var $table = $('#gen-table');
   $.getJSON("http://glycomics.ccrc.uga.edu/ggtest/service/restapi_bigjson.php?action=get_user&id=" + id,
      function (data) {

          var items = new Array();
          //number of elements
          console.log(data);
          for(var i=0; i < data.results.length; i++){
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


       $(function () {
             var $table = $('#gen-table');
             var $selected = $("#gen-compare");
             $table.on('check.bs.table', function (e, row, $el) {
                 $selected.empty();
                 $.each(Selected(), function(i, item){
                     $selected.append("<li>" + item + "</li>");
                 });
             });
             $table.on('uncheck.bs.table', function (e, row, $el) {
                $selected.empty();
                $.each(Selected(), function(i, item){
                     $selected.append("<li>" + item + "</li>");
                 });
             });
             var id = getParameterByName('id');
             LoadData(id);
           });
           
           

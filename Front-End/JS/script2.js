


         String.prototype.trunc = String.prototype.trunc ||
         function(n){
             return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
         };

         function PageFormat(value, row, index, field){
           return "<a href='glygenpage.html?Id=" + value + "'>" + value +  "</a>";
         }

         function TypeFormat(value, row, index, field){
           return "<a href='" + value.URL +  "' >" + value.NAME + "</a>"
         }

         function ImageFormat(value, row, index, field){
            var url = 'http://glycomics.ccrc.uga.edu/ggtest/service/newimageservice.php?action=get_user&id=' + row.ID;
            return "<img src=' " + url + " ' class='cartoon' width=200px/>"
         }

         function LinkFormat(value, row, index, field){
             return "<a href='" + value + "'>" +  value + "</a>";
         }

         // function ShortFormat(value, row, index, field){
         //     var txt = value.trunc(20);
         //     return "<a data-toggle='popover' data-trigger='hover' data-content='" + value + "' data-placement='bottom' >" + txt + "</a>"
         //     return txt;
         // }   // showing popover

         function DetailFormat(index, row){
             var html = [];
             // var glyco = row.GlycoCT.replace(/ /g, '\n');
             html.push('<div class="row"><div class="col-md-2 col-xs-12"><strong>IUPAC</strong></div><div class="col-md-10 col-xs-12"><pre>' + row.IUPAC + '</pre></div></div>');
             // html.push('<div class="row"><div class="col-md-2 col-xs-12"><strong>GlycoCT</strong></div><div class="col-md-10 col-xs-12"><pre>' + glyco + '</pre></div></div>');
             html.push('<div class="row"><div class="col-md-2 col-xs-12"><strong>GlycoCT</strong></div><div class="col-md-10 col-xs-12"><pre>' + row.GlycoCT + '</pre></div></div>');

             return html.join('');
         }

         // function Selected() {
         //   var $table = $('#gen-table');
         //   return $.map($table.bootstrapTable('getSelections'), function (row) {
         //       return row.ID
         //   });
         // }               // if we go selection and compare box
         //
         // function TypeFormat(value, row, index, field){
         //   return "<a href='" + value.URL +  "' >" + value.NAME + "</a>"
         // }

         function LoadData(id){
            var $table = $('#gen-table');
            $.getJSON("http://glycomics.ccrc.uga.edu/ggtest/service/restapi_bigjson.php?action=get_user&id=" + id,
               function (data) {

                   var items = new Array();
                   //number of elements
                   console.log(data);
                   for(var i=0; i < data.results.length; i++){
                       items.push({
                         ID: data.results[i].ID,
                         //imageURL: data[1][i],
                         imageURL : data.results[i].imageURL,
                          type: data.results[i].type[0],

                         subtype: data.results[i].subtype[0],
                         IUPAC: data.results[i].IUPAC,
                         GlycoCT: data.results[i].GlycoCT
                       })
                   }


                   $table.bootstrapTable('removeAll');
                   $table.bootstrapTable('append', items);

                   $('[data-toggle="popover"]').popover();

               }
           );
         }
// progress bar




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

               LoadData(2);
           });


//
//            function getLoadingElement(){
//   var div = document.createElement('div');
//   div.setAttribute('class','loading-element');
//   div.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-50-50 100 100" height="100" width="100"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="#29358e"/><stop offset="0%" stop-color="#bce2c5"/><stop offset="100%" stop-color="#bce2c5"/></linearGradient></defs><circle transform="rotate(0)" cx="0" cy="0" r="50" fill="url(#g)"></circle></svg>';
//
//
//
//   div.stop = function(){
//     console.log('stop');
//     div.setAttribute('style','height:0px;')
//   }
//
//     div.start = function(){
//     console.log('start');
//     div.setAttribute('style','height:100px;')
//   }
//
// var stops = div.querySelectorAll('stop');
// var grad  = div.querySelector('#g');
// var circ  = div.querySelector('circle');
// var colors = [stops[0].getAttribute('stop-color'),stops[1].getAttribute('stop-color')];
//
// function step(t){
//   var oldStop = parseInt(stops[0].getAttribute('offset'));
//   var newStop = (Math.floor(t) % 500) / 5;
//   var rotation;
//   if(oldStop > newStop){
//     rotation = parseInt(circ.getAttribute('transform').replace(/[^\d]/g,'')) || 0;
//     rotation = (rotation + 90) % 360;
//     circ.setAttribute('transform', 'rotate(' + rotation + ')');
//     colors.reverse();
//     stops[0].setAttribute('stop-color',colors[0]);
//     stops[1].setAttribute('stop-color',colors[1]);
//     stops[2].setAttribute('stop-color',colors[1]);
//   }
//   stops[0].setAttribute('offset', newStop + '%');
//   stops[1].setAttribute('offset', newStop + '%');
//   window.requestAnimationFrame(step);
// }
//
// window.requestAnimationFrame(step);
//
//   div.start();
//   return div;
// }
//
// var d = getLoadingElement();
// document.body.appendChild(d);

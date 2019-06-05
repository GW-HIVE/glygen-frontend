
     var uniprot_canonical_ac = 'P07498-1';


     function setupProtvista(data) {
 
         var allTrackData = {};
         var colors = ["red", "blue", "green", "black"];
         var typeToColor = {};
         var colorPtr = -1;
         var shapes = ["catFace", "triangle", "circle"];
         var typeToShape = {};
         var shapePtr = -1;
         var displayStart = 1;
         var displayEnd = 120;
         var highlightStart = 10;
 
 $.each(data.glycosylation, function (i, glycosylationData) {
             if (!(glycosylationData.type in allTrackData)) {
                 allTrackData[glycosylationData.type] = {};
                 colorPtr += 1;
                 typeToColor[glycosylationData.type] = colors[colorPtr];
                 shapePtr += 1;
                 typeToShape[glycosylationData.type] = shapes[shapePtr];
             }
             var key = glycosylationData.position;
             var dataPoint = {
                 accession: data.uniprot.uniprot_canonical_ac,
                 start: glycosylationData.position,
                 end: glycosylationData.position,
                 color: typeToColor[glycosylationData.type],
                 shape: typeToShape[glycosylationData.type],
                 tooltipContent: glycosylationData.glytoucan_ac? "<img src='" + "https://api.glygen.org/glycan/image/" + glycosylationData.glytoucan_ac + "' />" : "<span>Glycosylation site without reported glycan</span>",
                 type: "Position",
                 tooltipCount : 1
 
             }
            
             if(key in allTrackData[glycosylationData.type]) {
                 var existingPoint = allTrackData[glycosylationData.type][key];
                 if(existingPoint.tooltipCount < 2) {
                     existingPoint.tooltipContent += dataPoint.tooltipContent ? "<br><br>" + dataPoint.tooltipContent : "";
                 }
                 else if(existingPoint.tooltipCount == 2) {
                     existingPoint.tooltipContent += "<br><br>Click marker show more";
                 }
                 if(dataPoint.tooltipContent) {
                     existingPoint.tooltipCount += 1;
                 }
             }
             else {
                 allTrackData[glycosylationData.type][key] = dataPoint;
             }
         });
         $.each(allTrackData, function(key, value){
             allTrackData[key] = Object.values(allTrackData[key])
         });
 
 
         var allTrackDataM = {};
         var colorsM = ["green", "red", "green", "black"];
         var typeToColorM = {};
         var colorPtrM = 1;
         var shapesM = ["catFace", "diamond", "triangle"];
         var typeToShapeM = {};
         var shapePtrM = 1;
         var displayStartM = 1;
         var displayEndM = 150;
         var highlightStartM = 100;
         $.each(data.mutation, function (i, mutationData) {
             var fixedType = mutationData.type.replace(/ /g, '-');
 
             if (!(fixedType in allTrackDataM)) {
                 allTrackDataM[fixedType] = [];
                 colorPtrM += 1;
                 typeToColorM[fixedType] = colorsM[colorPtrM];
                 shapePtrM += 1;
                 typeToShapeM[fixedType] = shapesM[shapePtrM];
             }
 
             var dataPoint = {
                 accession: data.uniprot.uniprot_canonical_ac,
                 start: mutationData.start_pos,
                 end: mutationData.end_pos,
                 color: typeToColorM[fixedType],
                 shape: typeToShapeM[fixedType],
                 type: "annotation",
                 tooltipContent: "<span>annotation</span>",
                
             }
             allTrackDataM[fixedType].push(dataPoint);
         });
 
         var navHTML = "<protvista-navigation length='" + data.uniprot.length + "' displaystart='" + displayStart + "' displayend='" + displayEnd + "' ></protvista-navigation>";
         $(navHTML).appendTo("#manager");
 
 
         var seqHTML = "<protvista-sequence id='seq1' class='nav-track 'length='" + data.uniprot.length + "' displaystart='" + displayStart + "' displayend='" + displayEnd + "' sequence='" + data.sequence.sequence + "'></protvista-sequence>";
         $(seqHTML).appendTo("#manager");
 
 
         var glycoHTML = "<protvista-track id='glycotrack'  class='nav-track ' length='" + data.uniprot.length + "' displaystart='" + displayStart + "' displayend='" + displayEnd + "' highlightStart='" + highlightStart + "'></protvista-track>";
         $(glycoHTML).appendTo("#manager");
 
         var mergedData = [];
            $.merge(mergedData, allTrackData["O-linked"] ? allTrackData["O-linked"] : []),
             $.merge(mergedData, allTrackData["N-linked"]? allTrackData["N-linked"] : []),
 
  
         
             document.querySelector("#glycotrack").data = mergedData
         var glycoHTML1 = "<protvista-track id='glycotrack1'   class='nav-track hidden ' length='" + data.uniprot.length + "' displaystart='" + displayStart + "' displayend='" + displayEnd + "' highlightStart='" + highlightStart + "'></protvista-track>";
         $(glycoHTML1).appendTo("#manager");
 
         var ntrachtml = "<protvista-track class='nav-track hidden' id='track_narray' length='" + data.uniprot.length + "' displaystart='" + displayStart + "' displayend='" + displayEnd + "' highlightStart='" + highlightStart + "' ></protvista-track>";
         $(ntrachtml).appendTo("#manager");
 
         document.querySelector("#track_narray").data = (allTrackData["N-linked"] ? allTrackData["N-linked"] : []);
         ;
 
         var otrachtml = "<protvista-track class='nav-track hidden' id='track_oarray' length='" + data.uniprot.length + "' displaystart='" + displayStart + "' displayend='" + displayEnd + "' highlightStart='" + highlightStart + "' ></protvista-track>";
         $(otrachtml).appendTo("#manager");
 
         document.querySelector("#track_oarray").data = (allTrackData["O-linked"] ? allTrackData["O-linked"] : []);
         $.each(allTrackDataM, function (trackTypeM, trackDataM) {
             var trackHTMLM = "<protvista-track  class='nav-track'id='track_" + trackTypeM + "' length='" + data.uniprot.length + "' displaystart='" + displayStartM + "' displayend='" + displayEndM + "' highlightStart='" + highlightStartM + "' ></protvista-track>";
             $(trackHTMLM).appendTo("#manager");
             document.querySelector("#track_" + trackTypeM).data = trackDataM ;
         });
 
         
         var features = $('g .feature-group');
         features.css( 'cursor', 'pointer' );
         features.on('click', function(){
             var start = $("#glycotrack").attr("highlightstart")
             window.location.href = 'https://www.google.com/?q=position ' + start;
         });
 
     }
 
 
     /**
      * Handling a succesful call to the server for details page
 * @param {Object} data - the data set returned from the server on success
         */
     function ajaxSuccess(data) {
         setupProtvista(data);
         // to change the svg position
         document.querySelectorAll('g.sequence-features').forEach((x) => {
             x.setAttribute('transform', 'translate(0, -15)');
         });
 
     }
 
     function navglycoclick() {
         if ($('#nglyco').hasClass('hidden')) {
             $('#nglyco').removeClass('hidden');
             $('#oglyco').removeClass('hidden');
             $('#track_narray').removeClass('hidden');
             $('#track_oarray').removeClass('hidden');
             $('#glycotrack1').removeClass('hidden');
             $('#glycotrack').addClass('hidden');
         }
         else {
             $('#nglyco').addClass('hidden');
             $('#oglyco').addClass('hidden');
             $('#track_narray').addClass('hidden');
             $('#track_oarray').addClass('hidden');
             $('#glycotrack1').addClass('hidden');
             $('#glycotrack').removeClass('hidden');
         }
 
     }
 
     /**
 * @param {id} the LoadData function to configure and start the request to GWU service
         * Returns the GWU services.
         */
 
     // $(document).ready(function () {
 
     //     var uniprot_canonical_ac = getParameterByName("uniprot_canonical_ac", document.location.href);
     //     if(uniprot_canonical_ac){
     //     LoadData(uniprot_canonical_ac);
     //     }
     //     else{
     //         alert("ouch no uniprot....");
     //     }
 
     // });
 
        $(document).ready(function () {
         // var uniprot_canonical_ac = 'P14210-1';
         LoadData(uniprot_canonical_ac);
 
     });
 
     function LoadData(uniprot_canonical_ac) {
         var ajaxConfig = {
             dataType: "json",
             //url: getWsUrl("protein_detail", uniprot_canonical_ac),
             //url: "http://api.glygen.org/protein/detail/" + uniprot_canonical_ac,
            // url: "https://api.tst.glygen.org/protein/detail/P16150-1",
             url: "https://api.tst.glygen.org/protein/detail/P14210-1",
             //url: "https://api.tst.glygen.org/protein/detail/P07498-1",
             method: 'GET',
             timeout: 1000,
             success: ajaxSuccess
         };
 
         // calls the service
         $.ajax(ajaxConfig);
     }
 
 /**
  * getParameterByName function to Extract query parameters from url
  * @param {string} name - The name of the variable to extract from query string
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
 
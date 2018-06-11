//quick search by glucan 2nd question

function glycanx() {
    var inputglycan_id = document.getElementById("search2").value;
    var formObject = {relation:"attached", glycan_id: inputglycan_id};
    var json = 'query={"glycan"'+":" + JSON.stringify(formObject)+"}";
   // alert(json)
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-tst.biochemistry.gwu.edu/api/protein/search',
        data: json,
        success: function (results) {
            //var result = JSON.parse(results);
            if (results.search_results_id) {
             //   alert(results.search_results_id)
                window.location = './protein-list.html?id=' + results.search_results_id;
            }
            else {
               // alert(results.search_results_id)
            }

        }
    });
}
//quick search by enzyme 6th question
function enzymex() {
    var query_type = "search_glycan";
    var organism = "Mus musculus";
    var enzyme = document.getElementById("enzyme").value;
    var formObject = {organism:organism, enzyme: enzyme}; 
   // var formObject = searchjson(query_type, glycan_id, mass_slider[0], mass_slider[1], organism, glycantype, glycansubtype, enzyme, proteinid, motif);
    var json = "query=" + JSON.stringify(formObject);
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan/search',
        data: json,
        success: function (results) {
            //var result = JSON.parse(results);
           // alert(results.search_results_id)
            if (results.search_results_id) {
                window.location = './glycan-list.html?id=' + results.search_results_id;
            }
            else {
            //  alert(results.search_results_id)
            }

        }
    });
}

//quick search by species 9th question
function speciesx() {
    var speciesorganism = "Mus musculus";
   // var speciestype = document.getElementById("type").value;
   //var speciestype = "Calculated";
   // var formObject = {organism:speciesorganism, type: speciestype};
   var formObject = {organism:speciesorganism};
    var json = "query=" + JSON.stringify(formObject);
    alert(json)
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-tst.biochemistry.gwu.edu/api/protein/search',
        data: json,
        success: function (results) {
          // var result = JSON.parse(results);
          //alert(result.search_results_id)
            if (results.search_results_id) {
                window.location = './protein-list.html?id=' + results.search_results_id;
            }
            else {
              //  alert(results.search_results_id)
            }

        }
    });
}

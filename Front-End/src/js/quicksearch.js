//quick search by glucan 2nd question

function glycanx() {
    var inputglycan_id = document.getElementById("search2").value;
    var formObject = {relation:"attached", glycan_id: inputglycan_id};
    var json = 'query={"glycan"'+":" + JSON.stringify(formObject)+"}";
    alert(json)
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-tst.biochemistry.gwu.edu/api/protein/search',
        data: json,
        success: function (results) {
            var result = JSON.parse(results);
            if (result.search_results_id) {
                window.location = './protein-list.html?id=' + result.search_results_id;
            }
            else {
                alert(results.search_results_id)
            }

        }
    });
}




//quick search by enzyme 6th question

function enzymex() {
    var enzyme = document.getElementById("enzyme").value;
    var formObject = {relation:"attached", enzyme: enzyme};
    var json = 'query={"glycan"'+":" + JSON.stringify(formObject)+"}";
    alert(json)
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-tst.biochemistry.gwu.edu/api/protein/search',
        data: json,
        success: function (results) {
            var result = JSON.parse(results);
            if (result.search_results_id) {
                window.location = './protein-list.html?id=' + result.search_results_id;
            }
            else {
                alert(results.search_results_id)
            }

        }
    });
}

function enzymex() {
    var query_type = "search_glycan";
    var glycan_id = "";
    var mass_slider = "";
    // var sugar_slider = document.getElementById("slider1").noUiSlider.get();
    var glycan_id = "";
    var organism = "Mus musculus";
    var glycantype = "";
    var glycansubtype = "";
    var proteinid = "";
    var enzyme = document.getElementById("enzyme").value;
    var motif = "";
    var formObject = searchjson(query_type, glycan_id, mass_slider[0], mass_slider[1], organism, glycantype, glycansubtype, enzyme, proteinid, motif);
    var json = "query=" + JSON.stringify(formObject);
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-prod.biochemistry.gwu.edu/api/glycan/search',
        data: json,
        success: function (results) {
            var result = JSON.parse(results);
            if (result.search_results_id) {
                window.location = './glycan-list.html?id=' + result.search_results_id;
            }
            else {
                displayErrorByCode("1")
            }

        }
    });
}

//quick search by species 9th question

function speciesx() {
    var operation = "AND";
    var query_type = "search_protein";
    var organism = "Mus musculus";
    var protein_id = "";
    var mass_slider = "";
    // var mass_slider = document.getElementById("slider").noUiSlider.get();
    var gene_name = "";
    var protein_name_long = "";
    var pathway_id = "";
    var sequence = "";
    var glycosylated_aa = "";
    var glycosylation_evidence = "";
    var formObject = getProteinSearchPostdata(operation, query_type, organism, mass_slider[0], mass_slider[1], protein_id, gene_name, protein_name_long, pathway_id, sequence, glycosylated_aa, glycosylation_evidence);
    // , protein_name_long,gene_name);
    var json = "query=" + JSON.stringify(formObject);
 
    $.ajax({
        type: 'post',
        url: 'http://glygen-vm-tst.biochemistry.gwu.edu/api/protein/search',
        data: json,
        success: function (results) {
            if (results.search_results_id) {
                window.location = './protein-list.html?id=' + results.search_results_id;
            }
            else {
                displayErrorByCode("server-down")
            }

        }
    });
}

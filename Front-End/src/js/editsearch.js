/**
 * .setting the Form Values based on object data
 * @param {object} data - The data is object with query value
 * @param {object} data.query -
 *
 */

function setFormValues(data) {
   
    if (data.query) {
        $("#glycan_id").val(data.query.glycan_id);
        if (data.query.mass) {
            var massSlider = document.getElementById('slider');
            massSlider.noUiSlider.set([data.query.mass.min, data.query.mass.max]);
        }
        $("#organism").val(data.query.organism);
        $("#ddl").val(data.query.glycantype);
       var types = document.getElementById('ddl');
        var subtypes = document.getElementById('ddl2');
        // create subtypes
        configureDropDownLists(types, subtypes, function() {
            $("#ddl2").val(data.query.glycansubtype);
        });
        $("#enzyme").val(data.query.enzyme);
        $("#protein").val(data.query.proteinid);
        $("#motif").val(data.query.motif);
    }
}

/**
 * .setting the Form Values based on object data
 * @param {object} data - The data is object with query value
 * @param {object} data.query -
 *
 */
function setproteinFormValues(data) {
//alert(data.results.protein_id)
  //data1 = JSON.parse(data);
    if (data.query) {
        $("#protein").val(data.query.protein_id);
        if (data.query.mass) {
            var massSlider = document.getElementById('slider');
            massSlider.noUiSlider.set([data.query.mass.min, data.query.mass.max]);
        }
        $("#organism").val(data.query.organism);
        $("#gene_name").val(data.query.gene_name);
        $("#protein_name_long").val(data.query.protein_name_long);
        $("#pathway").val(data.query.pathway_id);
        $("#sequences").val(data.query.sequence);
        $("#glycosylated_aa").val(data.query.glycosylated_aa);
        $("#glycosylation_evidence").val(data.query.glycosylation_evidence);  
    }
}

/**
 * fail to to get search data
* @param {object} data - The Retreive data
*
*
*/
function failToRetreiveSearch(data) {
    displayErrorByCode('server_down');
}
/**
 * Loading data from protein list service
 * @param {string} id - The serach id
 *
 *
 */
function LoadproteinSearchvalues(id) {
    var ajaxConfig = {
        dataType: "json",
        url: "http://glygen-vm-tst.biochemistry.gwu.edu/api/protein/list",
        data: getListPostData(id, 1, 'protein_id', 'asc', 1),
        method: 'POST',
        success: setproteinFormValues,
        error: failToRetreiveSearch
    };
    // make the server call
    $.ajax(ajaxConfig);
}

/**
 * Loading data from glycan list service
 * @param {string} id - The serach id
 *
 *
 */
function LoadSearchvalues(id) {
    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("list"),
        data: getListPostData(id, 1, 'id', 'asc', 1),
        method: 'POST',
        success: setFormValues,
        error: failToRetreiveSearch
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


/**
 * @description ajax calls for the try me questions with static values on the index page.
 * @author Gaurav Agarwal
 * @since Aug 2, 2018
 */

function tryBioEnzyme() {
    var id = "G55220VL";    // Man5 glycan ID
    $.ajax({
        type: 'POST',
        url: getWsUrl("search_bioenzyme", id),
        success: function (results) {
            if (results.list_id) {
                window.location = './protein_list.html?id=' + results.list_id;
                activityTracker("user", id, "Try me - Q1 - Man5 BioEnzyme");
            }
            else {
                displayErrorByCode('no-results-found');
                activityTracker("error", id, "Try me - Q1 - Man5 BioEnzyme: no result found");
            }
        }
    })
}
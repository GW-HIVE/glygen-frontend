//
// //@author:Rupali Mahadik.
//
//
//
// $("#protein2").autocomplete({
//     source: function (request, response) {
//
//         var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("uniprot_canonical_ac", request.term);
//         $.getJSON(queryUrl, function (suggestions) {
//             suggestions.length = Math.min(suggestions.length, 5);
//
//             // if only one suggestion, and suggestion matches value
//            // if ((suggestions.length === 1) && (suggestions[0].toLowerCase() === request.term.toLowerCase())) {
//
//            // }
//
//             // if suggestions.length > 0 then show exact match text
//
//             response(suggestions);
//         });
//     },
//     minLength: 1,
//     select: function (event, ui) {
//         console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
//
//     }
// });
//
//
//
//
//
// function myProteinDetail(){
//
//    var id = $("#protein2").val();
//
//
//    $.ajax({
//         type: 'post',
//         url: getWsUrl("protein_detail",id),
//         success: function (results) {
//             if (results.error_code && (results.error_code === 'non-existent-record')) {
//             } else if (results.error_code) {
//                     displayErrorByCode("Invalid ID");
//             }
//             else {
//                 window.location = "protein_detail.html?uniprot_canonical_ac=" + id +'#basics5';
//             }
//         }
//
//     })
// }


$("#proteinfunction").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("uniprot_canonical_ac", request.term);
        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 5);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});





function proteinFunction(){

    var id = $("#proteinfunction").val();
    $.ajax({
        type: 'post',
        url: getWsUrl("protein_detail",id),
        // data: json,
        success: function (results) {
            if (results.error_code) {
                displayErrorByCode("Invalid ID")
            }
            else {
                window.location = "protein_detail.html?uniprot_canonical_ac=" + id +'#basics5';
            }

        }

    })
}
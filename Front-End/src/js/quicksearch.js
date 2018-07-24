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






//Q.1- What are the enzymes involved in the biosynthesis of glycan X in human?

$("#bioenzyme").autocomplete({
    source: function (request, response) {

        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("glytoucan_ac", request.term);


        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 10);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});



function bioEnzyme(){

    var id = $("#bioenzyme").val();
 //
    //it seems  need that taxID m can we just set it to 10090 ?
    $.ajax({
        type: 'POST',
        // url: getWsUrl("search_bioenzyme",id),
        url:'http://glygen-vm-dev.biochemistry.gwu.edu/api/usecases/glycan_to_biosynthesis_enzymes/9606/' + id,
        // data: json,
        success: function(results) {
            if (results.list_id) {
                window.location = './protein_list.html?id=' + results.list_id;
            }
            else {
               alert("No valid List ID returned");
            }

        }

    })
}

//Q.1-END.



//Q.2- Which proteins have been shown to bear glycan X and which site is this glycan attached to?

$("#glycansite").autocomplete({
    source: function (request, response) {

        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("glytoucan_ac", request.term);


        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 10);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});



function glycanSite(){

    var id = $("#glycansite").val();
    //
    //it seems  need that taxID m can we just set it to 10090 ?
    $.ajax({
        type: 'POST',
        // url: getWsUrl("search_bioenzyme",id),
        url:'http://glygen-vm-dev.biochemistry.gwu.edu/api/usecases/glycan_to_glycoproteins/9606/' + id,
        // data: json,
        success: function(results) {
            if (results.list_id) {
                window.location = './protein_list.html?id=' + results.list_id;
            }
            else {
                alert("No valid List ID returned");
            }

        }

    })
}
//end


//Q.3 What are the gene locations of the enzymes involved in the biosynthesis of glycan X in human?



$("#glycangene").autocomplete({
    source: function (request, response) {

        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("glytoucan_ac", request.term);


        $.getJSON(queryUrl, function (suggestions) {
            suggestions.length = Math.min(suggestions.length, 10);

            response(suggestions);
        });
    },
    minLength: 1,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " aka " + ui.item.id);
    }
});



function glycanGene(){

    var id = $("#glycangene").val();
    //
    //it seems  need that taxID m can we just set it to 10090 ?
    $.ajax({
        type: 'POST',
        // url: getWsUrl("search_bioenzyme",id),
        url:'http://glygen-vm-dev.biochemistry.gwu.edu/api/usecases/glycan_to_glycoproteins/9606/' + id,
        // data: json,
        success: function(results) {
            if (results.list_id) {
                window.location = './protein_list.html?id=' + results.list_id;
            }
            else {
                alert("No valid List ID returned");
            }

        }

    })
}
//end



//Q4.What are the orthologues of protein X in different species?
$("#proteinorthologues").autocomplete({
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





function proteinOrthologues(){

    var id = $("#proteinorthologues").val();
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

//Q.5- What are the functions of protein X?
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


//Q.5- Which glycans might have been synthesized in mouse using enzyme X?

$("#glycanenzyme").autocomplete({
    source: function (request, response) {
        var queryUrl = getWsUrl("type-ahead") + "?" + getSearchtypeheadData("enzyme_uniprot_canonical_ac", request.term);
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





function glycanEnzyme(){

    var id = $("#glycanenzyme").val();
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





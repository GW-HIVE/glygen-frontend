/**
 * Add example text in input onclick.
 * @author Tatiana Williamson
 * @date August 29, 2018
 */
//function textExample(id, ex){
//    $("#"+id).val(ex);
//}

//$('.textExample2 a').click(function(){
//    $('#glycan_id2').val($('#glycan_id').val()+$(this).html());
//    return false;
//});

// select already you input element for re-use
var $tagsInputGlycan = $('.glycan');
// bind a click event to links within ".textExample" element
$('.textExampleGlycan a').click(function() {
    // append link text to the input field value
    $tagsInputGlycan[0].value = $(this).text();
//        $('.textExample a').click(function() {
//             $tagsInput[0].removeClass('.glycan');
//        });
    return false;
});

// append link text to the input field value for Protein
var $tagsInputProtein = $('.protein');
$('.textExampleProtein a').click(function() {
    $tagsInputProtein[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Motif
var $tagsInputMotif = $('.motif');
$('.textExampleMotif a').click(function() {
    $tagsInputMotif[0].value = $(this).text();
    return false;
});

// append link text to the input field value for Enzyme
var $tagsInputEnzyme = $('.enzyme');
$('.textExampleEnzyme a').click(function() {
    $tagsInputEnzyme[0].value = $(this).text();
    return false;
});

//button to toggle between hiding and showing the advanced search
function advancedSearchButton() {
    var x = document.getElementById("advanced");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

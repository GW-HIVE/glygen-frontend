function ajaxSuccess(data) {

}


function ajaxFailure() {

}

function LoadData() {
    console.log(limit);
    var ajaxConfig = {
        dataType: "json",
        url: getWsUrl("list"),
        data: getListPostData(id, 1, 'id', 'asc', 1),
        method: 'POST',
        success: ajaxSuccess,
        error: ajaxFailure
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

var id = getParameterByName('id');


if(id){LoadData();}
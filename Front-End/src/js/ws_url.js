function getWsUrl(request){

    var ws_base       = "http://glycomics.ccrc.uga.edu/ggtest/service/";
    var ws_logging     = ws_base+"Logging.php";
    var ws_userID        = ws_logging;
    var ws_image_service = ws_base + 'newimageservice.php';

    var ws_list = ws_base + 'listpage_json.php';
    var ws_detail = ws_base + 'detailpage.php';
    
    switch (request) {
        case "generate_ID":
            return ws_userID;
            break;
        case "log_activity":
            return ws_logging;
            break;
        case "image_service":
            return ws_image_service;
            break;
        case "list":
            return ws_list;
            break;
            case "detail":
            return ws_detail;
            break;
    
        default:
            return "";
            break;
    }
}

// Example creating an image url
// getWsUrl('image_service') + '?action=get_user&id='

function getImageWsUrl(id) {
    return getWsUrl('image_service') + '?action=get_user&id=' + id;
}

function getListWsUrl(id, page, sort, dir, limit) {
    var url = getWsUrl('list') + "?action=get_user";

    url = url + "&id=" + id;
    url = url + "&offset=" + ((page -1) * limit);
    url = url + "&limit=" + limit;
    url = url+ "$sort=" + sort;
    url = url + "&order=" + dir;

    return url;
}
    function getDetailWsUrl(id) {
       
        var url = getWsUrl('detail') +  "?action=get_user";
        url = url + "&id=" + id;
        return url;
    }

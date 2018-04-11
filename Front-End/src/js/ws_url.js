function getWsUrl(request){

    // var ws_base = "http://glygen-vm-prd.biochemistry.gwu.edu/api";
    var ws_base ="http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan";
    var ws_logging = ws_base+"Logging.php";
    var ws_userID = ws_logging;
     var ws_image_service = ws_base + 'newimageservice.php';
   
    switch (request) {
    case "generate_ID":
    return ws_userID;
    break;
    case "log_activity":
    return ws_logging;
    break;
    // case "image_service":
    // return ws_image_service;
     case "image_service":
    return ws_base + "/image";
    
    break;
    case "list":
    return ws_base + "/list";
    break;
    case "detail":
    return ws_base +"/detail/";
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
   
   
   function getListPostData(id, page, sort, dir, limit)
   {
    var query = {};
    query.id = id;
    query.offset = ((page - 1) * limit) + 1;
    query.sort = sort;
    query.limit = parseInt(limit);
    query.order = dir;
   
    return "query=" + JSON.stringify(query);
   }
   

//       function getDetailPostData()
//    {
//     var data = "";
    
//     // data = data+ "/id="+id;

//     return data;
//    }
 
//    function getDetailPostData(id)
//    {
//     var query = {};
//     query.id = id;
//     return "query=" + JSON.stringify(query);
//    }
   function getDetailPostData(id)
   {
    // var data = {};
   var data= getWsUrl("detail");
    // data.id = id;
    data = data + "?id=" + id;
    return "data=" + JSON.stringify(data);
   }
   
   function getListWsUrl(id, page, sort, dir, limit) {
    var url = getWsUrl("list");
   
    url = url + "&id=" + id;
    url = url + "&offset=" + ((page) * limit);
    url = url + "&limit=" + limit;
    url = url+ "$sort=" + sort;
    url = url + "&order=" + dir;
   
    return url;
   }
//    function getDetailPostData(id) {
   
//     var url = getWsUrl("detail");
//      url = url + "?id=" + id;
//     return url;
//     }
    
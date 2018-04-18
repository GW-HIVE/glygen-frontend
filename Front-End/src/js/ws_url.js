function getWsUrl(request, id){
    
    
    var ws_base ="http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan";
    var ws_logging = ws_base+"Logging.php";
    var ws_userID = ws_logging;
    
   
    switch (request) {
    case "generate_ID":
    return ws_userID;
    break;
    case "log_activity":
    return ws_logging;
    break;
     case "image_service":
    return ws_base + "/image/" + id; 
    break;
    case "list":
    return ws_base + "/list";
    break;
    case "detail":
    return ws_base +"/detail/" + id;
    break;
    default:
    return "";
    break;
    }
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
   


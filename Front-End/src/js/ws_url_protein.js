function getWsUrl(request, id){
        
    var ws_base ="http://glygen-vm-tst.biochemistry.gwu.edu/api/protein";
    var ws_logging = ws_base+"/auth/logging";
    var ws_userID = ws_base+"/auth/userid";
    
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
    case "typehead":
    return ws_base +"/typehead";
    break;
    case "search_init":
    return ws_base +"/search_init";
    break;
    default:
    return "";
    break;
    }
   }
   


   /**
    * getListPostData  function that returns the string with the correct format the GWU service need to get the list for a specific Id
 
     * @param {string} id -  serach ID
  */
   
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
   


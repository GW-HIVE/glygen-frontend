//@author: Rupali Mahadik

// @description: UO1 Version-1.1.

//@update:6 June 2018


function getWsUrl(request, id){
        
    var ws_base_glycan ="http://glygen-vm-prd.biochemistry.gwu.edu/api/glycan";
    var ws_base_protein ="http://glygen-vm-tst.biochemistry.gwu.edu/api/protein";
    var ws_base_typeahead ="http://glygen-vm-tst.biochemistry.gwu.edu/api/typeahead";
    var ws_logging = "http://glygen-vm-prd.biochemistry.gwu.edu/api/auth/logging";
    var ws_userID = "http://glygen-vm-prd.biochemistry.gwu.edu/api/auth/userid";
    
    switch (request) {

        //Auth Webservices.
    case "generate_ID":
    return ws_userID;
    break;
    case "log_activity":
    return ws_logging;
    break;


        //Typeahead webservices

        case "typehead":
            return ws_base_typeahead;

        //Protein webservices
        case "Search_protein":
            return ws_base_protein +"/search";
            break;

        case "search_init_protein":
            return ws_base_protein +"/search_init";
            break;
        default:
            return "";
            break;


        //Protein webservices
        //Glycan webservices
        case "image_service":
            return ws_base_glycan + "/image/" + id;
            break;
        case "list":
            return ws_base_glycan + "/list";
            break;
        case "detail":
            return ws_base_glycan +"/detail/" + id;
            break;

        //Glycan webservices
     case "image_service":
    return ws_base_glycan + "/image/" + id;
    break;
    case "list":
    return ws_base_glycan + "/list";
    break;
    case "detail":
    return ws_base_glycan +"/detail/" + id;
    break;


    case "search_init":
    return ws_base_glycan +"/search_init";
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
    query.offset = parseInt(page);
    query.sort = sort;
    // query.offset = ((page - 1) * limit) + 1;
    query.limit = parseInt(limit);
    query.order = dir;
   
    return "query=" + JSON.stringify(query);
   }


    function getSearchtypeheadData(field, value){
        var query = {};
       query.field = field;
       query.value = value;
       return "query=" + JSON.stringify(query);
   }




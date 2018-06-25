//@author: Rupali Mahadik

// @description: UO1 Version-1.1.

//@update:6 June 2018


function getWsUrl(request, id) {

    var ws_base_glycan = "http://glygen-vm-tst.biochemistry.gwu.edu/api/glycan";
    var ws_base_protein = "http://glygen-vm-tst.biochemistry.gwu.edu/api/protein";
    var ws_base_typeahead = "http://glygen-vm-tst.biochemistry.gwu.edu/api/typeahead";
    var ws_logging = "http://glygen-vm-prd.biochemistry.gwu.edu/api/auth/logging";
    var ws_userID = "http://glygen-vm-prd.biochemistry.gwu.edu/api/auth/userid";

    switch (request.toLowerCase()) {

        //Auth Webservices.
        case "generate_ID":
            return ws_userID;
            break;
        case "log_activity":
            return ws_logging;
            break;



            //Glycan webservices
        case "search_init":
            return ws_base_glycan + "/search_init";
            break;

        case "search_glycan":
            return ws_base_glycan + "/search";
            break;
        case "image_service":
            return ws_base_glycan + "/image/" + id;
            break;
        case "list":
            return ws_base_glycan + "/list";
            break;
        case "glycan-detail":
            return ws_base_glycan + "/detail/" + id;
            break;



            //Protein webservices
        case "search_init_protein":
            return ws_base_protein + "/search_init";
            break;
        case "search_protein":
            return ws_base_protein + "/search";
            break;
        case "protein_image_service":
            return ws_base_glycan + "/image/" + id;
            break;
        case "protein_list":
            return ws_base_glycan + "/list";
            break;
        case "protein_details":
            return ws_base_protein + "/detail/" + id;
            break;


            //Typeahead webservices

        case "type-ahead":
            return ws_base_typeahead;
        default:
            return "WWW.GOOGLE.COM";
            break;

    }
}


/**
    * getListPostData  function that returns the string with the correct format the GWU service need to get the list for a specific Id
 
     * @param {string} id -  serach ID
  */

function getListPostData(id, page, sort, dir, limit) {
    var query = {};
    query.id = id;
    query.offset = parseInt(page);
    query.sort = sort;
    //query.offset = ((page - 1) * limit) + 1;
    query.limit = parseInt(limit);
    query.order = dir;

    return "query=" + JSON.stringify(query);
}


function getSearchtypeheadData(field, value) {
    var query = {};
    query.field = field;
    query.value = value;
    return "query=" + JSON.stringify(query);
}
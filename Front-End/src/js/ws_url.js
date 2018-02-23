function getWsUrl(request){

    var ws_base       = "http://glycomics.ccrc.uga.edu/ggtest/service/";
    var ws_logging     = ws_base+"Logging.php";
    var ws_userID        = ws_logging;
    
    switch (request) {
        case "generate_ID":
            return ws_userID;
            break;
        case "log_activity":
            return ws_logging;
            break;
    
        default:
            return "";
            break;
    }
}
function getWsUrl(request){

    var logging_ws       = "http://glycomics.ccrc.uga.edu/ggtest/service/Logging.php";
    var userID_ws        = logging_ws+"?action=get_id";
    
    switch (request) {
        case "generate_ID":
            return userID_ws;
            break;
        case "log_activity":
            return logging_ws;
            break;
    
        default:
            return "";
            break;
    }
}
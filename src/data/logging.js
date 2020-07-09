import { getJson } from "./api";
import routeConstants from './json/routeConstants';


/**
 * This is the main function which logs the events.
 * It sends logs to the web service in the defined format.
 * @param {string} type the log type - whether an error or normal access.
 * @param {string} id the ID of the glycan/protein/glycoprotein - list/detail page.
 * @param {string} message descriptive message of the log.
 */
export const logActivity = (type, id, message) => {
    var user = localStorage.getItem("ID");
    var pagePath = window.location.pathname;
    var curPage = pagePath.split("/")[1] || routeConstants.home.replace(/\//g, "");;

    type = type || "user";
    id = id || "";
    message = message || "page access";

    if (user == null) {
        /* defining the users who have not yet decided an option of activity logging. */
        user = "Undecided";
    }

    var data = {
        "id": id,                         //  "glycan/search ID"
        "user": user,
        "type": type,                     //    "user" or "error"
        "page": curPage,
        "message": message
    };
    const url = "/log/logging?query=" + JSON.stringify(data);
    console.log(url);

   return getJson(url);
}

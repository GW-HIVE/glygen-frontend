import { getJson} from "./api";

/**
 * This is the main function which logs the events.
 * It sends logs to the web service in the defined format.
 * @param {string} page current route/page or component.
 * @param {string} type the log type - whether an error or normal access.
 * @param {string} id the ID of the glycan/protein/glycoprotein - list/detail page.
 * @param {string} message descriptive message of the log.
 */
export const logActivity = (page, type, id, message) => {
    var user = localStorage.getItem("ID");
    var curPage = page.replace(/\//g, "");

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
    console.log(data);
    //const url = "/log/logging?query=" + JSON.stringify(data);

    // getJson(url)
    // .then((response) => {
    //     if (!response.data) {
    //         console.log(response);
    //     }
    // })
    // .catch(function (error) {
    //     if (!error.response) {
    //         console.log(error);
    //     } else if (error.response && !error.response.data) {
    //         console.log(error.response);
    //     } else if (error.response.data && error.response.data["error_list"]) {
    //         console.log(error.response.data["error_list"]);
    //     }
    // });
}
import { getJson, postTo } from "./api";
import routeConstants from './json/routeConstants';
import { GLYGEN_BASENAME } from "../envVariables";

/**
 * This basically checks the browser support for Web storage (i.e. localStorage)
 * and also logs the page visit activity.
 */
export const tracking = () => {
    var txt = '';
    var track_banner = document.getElementById("tracking_banner");
    track_banner.style.display = "none";
    /* Check browser support */
    if (typeof (Storage) !== "undefined") {
        if (!localStorage.getItem("ID")) {
            /* If nothing in the local storage then give the user a choice. */
            track_banner.style.display = "block";
        }
        logActivity("user");
    } else {
        txt = "Please update your browser to the latest version in order to access all our website features.";
        displayBannerMsg(txt);
    }
}

/**
 * This is called when the user selects to be logged.
 * Gets the ID from Web Service and stores in the localStorage of the browser.
 */
export const logID = () => {
    var txt = "We will log your actions to improve the user experience. You can always change this setting in <strong>My GlyGen</strong>.";
    var user_id = "No ID assigned";

    const url = "/auth/userid";
    console.log(url);

    postTo(url).then((response) => {
        if (response.data.error_code) {
                console.log(response.data.error_code);
            } else {
                user_id = response.data.user;
                localStorage.setItem("ID", user_id);     //Store the ID from the webservice
                console.log(user_id);
                displayBannerMsg(txt);
                logActivity("user", null, "Enabled Logging");
            }
    })
    .catch(function (error) {
        console.log("Log user ID generation failure: " + error);
    });
}

/**
 * This is called when the user chooses not to be logged.
 * Stores the ID as "Anonymous" in the localStorage of the browser.
 */
export const doNotLog = () => {
    localStorage.setItem("ID", "Anonymous");
    var txt = "We will not log your actions. You can always change this setting in <strong>My GlyGen</strong>.";
    displayBannerMsg(txt);
    logActivity("user", null, "Disabled Logging");
}

/**
 * This is called when the user chooses not to be logged.
 * Stores the ID as "Anonymous" in the localStorage of the browser.
 */
export const isLoggingUserActivity = () => {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("ID")) {
            var userID = localStorage.getItem("ID");
            if (userID === "Anonymous")
                return false;
            return true;    
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * clears the localStorage i.e. it removes the stored ID.
 */
export const clearLocalStore = () => {
    localStorage.removeItem("ID");
}

/**
 * Just displays the appropriate message in the banner 
 * and automatically makes it dissapear after the set time.
 * @param {string} txt The message to be displayed in the tracking prompt banner.
 */
export const displayBannerMsg = (txt) => {
    var track_banner = document.getElementById("tracking_banner");
    track_banner.style.display = "block";
    track_banner.innerHTML = "<span>" + txt + "</span><span id='close_banner' style='float: right'>&times;</span>";
    var close = function () {
        track_banner.style.display = "none";
    };
    setTimeout(close, 10000);
    document.getElementById("close_banner").onclick = close;
}

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
    var curPage = GLYGEN_BASENAME === "/" ? pagePath.split("/")[1] || routeConstants.home.replace(/\//g, "") : pagePath.split("/")[2] || routeConstants.home.replace(/\//g, "");

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

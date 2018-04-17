// @author: Gaurav Agarwal
// @description: assigns ID and tracks user activity.
function tracking() {
    var txt = '';
    var track_banner = document.getElementById("tracking_banner");
    var $checkbox = $('[name="manageSettingsEnabled"]');
    // track_banner.style.display = "none";
    if (typeof (Storage) !== "undefined") {                  // Check browser support
        if (localStorage.getItem("ID") == "NO") {             // if user selected not to be tracked.
            $checkbox.attr('checked', false);
            $('#manageSettingsDisabled').css('display', 'block');
            $('#manageSettingsEnabled').css('display', 'none');
        }
        else if (localStorage.getItem("ID")) {                // if an ID exists other than "NO" so continue Logging activity.
            $checkbox.attr('checked', true);
            $('#manageSettingsDisabled').css('display', 'none');
            $('#manageSettingsEnabled').css('display', 'block');
            activityTracker();                              //pass the stored ID to web service
        }
        else {                                               // If nothing in the local storage then give the user a choice.
            track_banner.style.display = "block";

        }
    } else {
        txt = "Sorry, your browser does not support modern features... Please update it to the latest version";
        displayBannerMsg(txt);
    }
}

function logID() {
    var txt = "We will log your actions to improve the user experience. You can always change this setting in <strong>My GlyGen</strong>.";
    var data = "No ID assigned";
    $.get(getWsUrl("generate_ID")+"?action=get_id", function (response) {              //$.get("http://localhost:8080/Logging.php?action=get_id", function(response) {
        data = response.user_id;
        localStorage.setItem("ID", data);                           //Store the ID from the webservice
        txt += " Your ID is:" + localStorage.getItem("ID");     // Retrieve ID from localStorage
        displayBannerMsg(txt);
        activityTracker();
    });
}

function doNotLog() {
    localStorage.setItem("ID", "NO");
    var txt = "We will not log your actions. You can always change this setting in <strong>My GlyGen</strong>.";
    displayBannerMsg(txt);
}

function clearLocalStore() {
    localStorage.removeItem("ID");
}

function displayBannerMsg(txt) {
    document.getElementById("tracking_banner").innerHTML = "<span>"+txt+"</span><span id='close_banner' style='float: right'>&times;</span>";
    var close = function() {
        document.getElementById("tracking_banner").style.display = "none";
    };
    setTimeout(close, 10000);
    document.getElementById("close_banner").onclick = close;
}

function activityTracker() {
    var data = {
        user_id: localStorage.getItem("ID"),
        page: window.location.pathname,
        type: "user",                       //we can pass this value from onclick function
        id: "search/glycan ID",             //we can get the value either from the url or from the web service.
        message: "some message"
    };
    $.post(getWsUrl("log_activity"), { log: data });
}
// End @author: Gaurav Agarwal


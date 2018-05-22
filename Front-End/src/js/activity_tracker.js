// @author: Gaurav Agarwal
// @description: assigns ID and tracks user activity.
//@modified: Pradeep Kumar on 10 May 2018
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
            activityTracker("user", "", "some message");           //pass the stored ID to web service
        }
        else {                                               // If nothing in the local storage then give the user a choice.
            track_banner.style.display = "block";

        }
    } else {
        txt = "Sorry, your browser does not support modern features... Please update it to the latest version";
        displayBannerMsg(txt);
    }
}

function logID()
{
    var txt = "We will log your actions to improve the user experience. You can always change this setting in <strong>My GlyGen</strong>.";
    var data = "No ID assigned";
    $.ajax({
        type: 'post',
        url: getWsUrl("generate_ID"),
        data: 'json',
        success: function (results) {
            data = results.user;
            localStorage.setItem("ID", data);                           //Store the ID from the webservice
            txt += " Your ID is:" + localStorage.getItem("ID");     // Retrieve ID from localStorage
            displayBannerMsg(txt);
            activityTracker("user", "", "some message");

        }
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
    var track_banner = document.getElementById("tracking_banner");
    track_banner.style.display = "block";
    track_banner.innerHTML = "<span>" + txt + "</span><span id='close_banner' style='float: right'>&times;</span>";
    var close = function () {
        track_banner.style.display = "none";
    };
    setTimeout(close, 10000);
    document.getElementById("close_banner").onclick = close;
}

function activityTracker(type, id, message) {
    var data = {
        user_id: localStorage.getItem("ID"),
        page: window.location.pathname,
        type: type,                       //we can pass this value from onclick function "user"
        id: id,             //we can get the value either from the url or from the web service. "glycan/search ID"
        message: message
    };
    $.post(getWsUrl("log_activity"), { log: data });
}
// End @author: Gaurav Agarwal


// @author: Gaurav Agarwal
// @description: assigns ID and tracks user activity.
//@modified: Pradeep Kumar on 10 May 2018
// @update: July 5, 2018 - Gaurav Agarwal - Anonymous user logging for those users who opt out.
// @update: July 16, 2018 - Gaurav Agarwal - javascript errors and exception logging
function tracking() {
    var txt = '';
    var track_banner = document.getElementById("tracking_banner");
    var $checkbox = $('[name="manageSettingsEnabled"]');
    // track_banner.style.display = "none";
    if (typeof (Storage) !== "undefined") {                  // Check browser support
        if (localStorage.getItem("ID") == "NO") {             // if user selected not to be tracked.
            $checkbox.attr('checked', false);
            $('#textManageSettingsDisabled').css('display', 'block');
            $('#textManageSettingsEnabled').css('display', 'none');
            $('#manageSettingsDisabled').css('display', 'block');
            $('#manageSettingsEnabled').css('display', 'none');
            activityTracker("user", "", "");
        }
        else if (localStorage.getItem("ID")) {                // if an ID exists other than "NO" so continue Logging activity.
            $checkbox.attr('checked', true);
            $('#textManageSettingsDisabled').css('display', 'none');
            $('#textManageSettingsEnabled').css('display', 'block');
            $('#manageSettingsDisabled').css('display', 'none');
            $('#manageSettingsEnabled').css('display', 'block');
            activityTracker("user", "", "");
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
    $.ajax({
        type: 'post',
        url: getWsUrl("generate_ID"),
        data: 'json',
        success: function (results) {
            data = results.user;
            localStorage.setItem("ID", data);                           //Store the ID from the webservice
            txt += " Your ID is:" + localStorage.getItem("ID");     // Retrieve ID from localStorage
            displayBannerMsg(txt);
            activityTracker("user", "", "");

        },
        failure: console.log(data.error_code)
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
    var user = localStorage.getItem("ID");
    if (user == "NO" || user == null) {
        // logging the user's who have opted out of activity logging as Anonymous users.
        user = "Anonymous";
    }
    var data = {
        "id": id,                         //  "glycan/search ID"
        "user": user,
        "type": type,                     //    "user" or "error"
        "page": window.location.pathname,
        "message": message
    };
    console.log(data);
    $.post(getWsUrl("log_activity"), { query: JSON.stringify(data) })
        .done(function (resp) {
            console.log(resp);
        })
        .fail(function (resp) {
            console.log(resp);
        });
    // $.ajax({
    //     dataType: "json",
    //     method: "POST",
    //     url: getWsUrl("log_activity"),
    //     data: data,
    //     success: function(resp){console.log(resp); console.log(data);},
    //     error: function(resp){console.log(resp)}
    //   });
}

//to get the attribute value from the url, modified to give only one attribute value.
function getUrlVars() {
    var vars = {};
    var attr="";
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
        attr = value;
    });
    return attr;
    // return vars;
};

//javascript errors and exceptions
window.onerror = function (msg, url, line, col, error) {
    // Note that col & error are new to the HTML 5 spec and may not be 
    // supported in every browser.  It worked for me in Chrome.
    //    var extra = !col ? '' : '\ncolumn: ' + col;
    //    extra += !error ? '' : '\nerror: ' + error;
    activityTracker("error", getUrlVars(), "Error: " + msg + "\nurl: " + url + "\nline: " + line);

    // var suppressErrorAlert = true;
    // If you return true, then error alerts (like in older versions of 
    // Internet Explorer) will be suppressed.
    // return suppressErrorAlert;
};
// End @author: Gaurav Agarwal


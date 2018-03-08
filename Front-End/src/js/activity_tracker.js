function tracking() {
    var txt = '';
    var track_banner = document.getElementById("tracking_banner");
    // track_banner.style.display = "none";
    if (typeof (Storage) !== "undefined") {                  // Check browser support
        if (localStorage.getItem("ID") == "NO") {             // if user selected not to be tracked.
            var changeTo = "log";
            txt = "You have chosen NOT to record your activity.\nWant to -> <button onclick='clearLocalStore(\""+changeTo+"\")'>Start Logging</button>";
            displayBannerMsg(txt);
        }
        else if (localStorage.getItem("ID")) {                // if an ID exists other than "NO" so continue Logging activity.
            var changeTo = "NoLog";
            txt = "Your activity on this website is being tracked.\nWant to -> <button onclick='clearLocalStore(\""+changeTo+"\")'>Stop Logging</button>";
            txt += "<br/>Your ID is:" + localStorage.getItem("ID");
            displayBannerMsg(txt);
            activityTracker();                              //pass the stored ID to web service
        }
        else {                                               // If nothing in the local storage then give the user a choice.
            track_banner.style.display = "block";
            document.getElementById("close_banner").onclick = function() {
                track_banner.style.display = "none";
            }
        }
    } else {
        txt = "Sorry, your browser does not support Web Storage... Please update it to the latest version";
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

function clearLocalStore(changeTo) {
    localStorage.removeItem("ID");
    if (changeTo == "log")
        logID();
    else
        doNotLog();
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


// @author: Tatiana Williamson
// @description: UO1 Version-1.1.
// @Date: 8th Mar 2018.
	
function switchHandler(el) {
    $(document).ready(function() {
        var $checkbox = $('[name="manageSettingsEnabled"]');
        if(!$checkbox.is(':checked')) {
            $checkbox.attr('checked', false);
            $('#manageSettingsDisabled').css('display', 'block');
            $('#manageSettingsEnabled').css('display', 'none');
        } else {
            $checkbox.attr('checked', true);
            $('#manageSettingsDisabled').css('display', 'none');
            $('#manageSettingsEnabled').css('display', 'block');
        }
    });
}

function setNavItemAsCurrent(itemText) {
    $('.nav > li > a').each(function() {
        if($(this).text().indexOf(itemText) >= 0) {
            $(this).parent().addClass('current');
        }
    });
}

$(document).ready(function(){
    var url = window.location.pathname;
    var fullFilename = url.substring(url.lastIndexOf('/')+1);
    var filename = fullFilename.substring(0, fullFilename.lastIndexOf('.'));
    var navItemText = filename.replace('_', ' ').toUpperCase();
    //alert(navItemText);
    if(navItemText == 'INDEX') {
        navItemText = 'HOME';
    } else if(navItemText == 'GLYCAN SEARCHPAGE') {
        navItemText = 'EXPLORE';
    }
    $('.nav > li').removeClass('current');
    setNavItemAsCurrent(navItemText);
});

// End @author: Tatiana Williamson

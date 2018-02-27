function tracking() {
    var txt = '';
    var track_banner = document.getElementById("tracking_banner");
    track_banner.style.display = "none";
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
    var txt = "Good choice! You can change this setting at any time under <strong>My GlyGen</strong> tab.";
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
    var txt = "You <strong>Declined</strong> the offer! However, you can change this setting at any time under <strong>My GlyGen</strong> tab.";
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
    document.getElementById("close_banner").onclick = function() {
        document.getElementById("tracking_banner").style.display = "none";
    }
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
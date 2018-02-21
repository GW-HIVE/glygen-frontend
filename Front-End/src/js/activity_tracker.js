function tracking() {
    var txt = '';
    if (typeof (Storage) !== "undefined") {                  // Check browser support
        if (localStorage.getItem("ID") == "NO") {             // if user selected not to be tracked.
            var changeTo = "log";
            txt = "You have chosen NOT to record your activity.\nWant to -> <button onclick='clearLocalStore(\""+changeTo+"\")'>Start Logging</button>";
            displayMsg(txt);
        }
        else if (localStorage.getItem("ID")) {                // if an ID exists other than "NO" so continue Logging activity.
            var changeTo = "NoLog";
            txt = "Your activity on this website is being tracked.\nWant to -> <button onclick='clearLocalStore(\""+changeTo+"\")'>Stop Logging</button>";
            txt += "<br/>Your ID is:" + localStorage.getItem("ID");
            displayMsg(txt);
            activityTracker();                              //pass the stored ID to web service
        }
        else {                                               // If nothing in the local storage then give the user a choice.
            var choice = "Do you want to allow us to track your usage on this website?\n";
            choice += "<button onclick='logID()'>Yes</button> <button onclick='doNotLog()'>No</button>";
            document.getElementById("result").innerHTML = choice;
        }
    } else {
        txt = "Sorry, your browser does not support Web Storage... Please update it to the latest version";
        displayMsg(txt);
    }
}

function logID() {
    var txt = "Good choice!";
    var data = "No ID assigned";
    $.get(getWsUrl("generate_ID"), function (response) {                        //$.get("http://localhost:8080/Logging.php?action=get_id", function(response) {
        data = response.user_id;
        localStorage.setItem("ID", data);                           //Store the ID from the webservice
        txt += "<br/>Your ID is:" + localStorage.getItem("ID");     // Retrieve ID from localStorage
        displayMsg(txt);
        activityTracker();
    });
}

function doNotLog() {
    localStorage.setItem("ID", "NO");
    var txt = "You chose not to be tracked!";
    displayMsg(txt);
}

function clearLocalStore(changeTo) {
    localStorage.removeItem("ID");
    if (changeTo == "log")
        logID();
    else
        doNotLog();
}

function displayMsg(txt) {
    document.getElementById("result").innerHTML = txt;
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
$.ajax({
            dataType: "json",
            url: getWsUrl("home_init"),
            timeout: getTimeout("home_init"),
            success: displayHomeInitData,
            error: displayFailHomeInitData

});

function displayHomeInitData(jsonResponse) {
//        alert(jsonResponse.version[1].release_date);
    $("#version_data_component").text(jsonResponse.version[0].component.replace(/\b\w/g, function(l){ return l.toUpperCase() }));
    $("#version_data_number").text(jsonResponse.version[0].version);
    $("#version_data_date").text(jsonResponse.version[0].release_date); 
    
    $("#version_software_component").text(jsonResponse.version[1].component.replace(/\b\w/g, function(l){ return l.toUpperCase() }));
    $("#version_software_number").text(jsonResponse.version[1].version);
    $("#version_software_date").text(jsonResponse.version[1].release_date);
    $("#version_api_component").text(jsonResponse.version[2].component.toUpperCase());
    $("#version_api_number").text(jsonResponse.version[2].version);
    $("#version_api_date").text(jsonResponse.version[2].release_date);
    };

    function displayFailHomeInitData() {
//        $("version").text("Say something!")
        alert("Error"); 
    } 


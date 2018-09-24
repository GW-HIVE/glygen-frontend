$.ajax({
            dataType: "json",
            url: getWsUrl("home_init"),
            timeout: getTimeout("home_init"),
            success: displayHomeInitData,
            error: displayFailHomeInitData

});

//All SUcsess functions go here 
function displayHomeInitData(jsonResponse) {
    $("#version_data_component").text(jsonResponse.version[0].component.replace(/\b\w/g, function(l){ return l.toUpperCase() }));
    $("#version_data_number").text(jsonResponse.version[0].version);
    $("#version_data_date").text(jsonResponse.version[0].release_date); 
    $("#version_data_date").text(moment(jsonResponse.version[0].release_date).format('MMMM Do YYYY'));  
    $("#version_software_component").text(jsonResponse.version[1].component.replace(/\b\w/g, function(l){ return l.toUpperCase() }));
    $("#version_software_number").text(jsonResponse.version[1].version);
    $("#version_software_date").text(moment(jsonResponse.version[1].release_date).format('MMMM Do YYYY'));
    
    $("#version_api_component").text(jsonResponse.version[2].component.toUpperCase());
    $("#version_api_number").text(jsonResponse.version[2].version);
    $("#version_api_date").text(moment(jsonResponse.version[2].release_date).format('MMMM Do YYYY'));
    
    var statisticsDisplay = document.getElementById('statistics-display');

    jsonResponse.statistics.forEach(function (statistic) {
    var header = document.createElement('h5');

    header.className = 'text-left';
    header.innerHTML = statistic.species;

    statisticsDisplay.appendChild(header);

    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
//    table.className = 'table-hover table col-sm-3';
    tbody.className = 'statistics-table';

    var row1 = document.createElement('tr');
    var row2 = document.createElement('tr');
    var row3 = document.createElement('tr');

    var row1cell1 = document.createElement('td');
    var row1cell2 = document.createElement('td');
    // var row3ce = document.createElement('tr');
    row1cell1.innerHTML = 'Glycans';
    row1cell2.innerHTML = statistic.glycans;
    row1.appendChild(row1cell1);
    row1.appendChild(row1cell2);

    var row2cell1 = document.createElement('td');
    var row2cell2 = document.createElement('td');
    // var row3ce = document.createElement('tr');
    row2cell1.innerHTML = 'Proteins';
    row2cell2.innerHTML = statistic.proteins;
    row2.appendChild(row2cell1);
    row2.appendChild(row2cell2);

    var row3cell1 = document.createElement('td');
    var row3cell2 = document.createElement('td');
    // var row3ce = document.createElement('tr');
    row3cell1.innerHTML = 'Glycoproteins';
    row3cell2.innerHTML = statistic.glycoproteins;
    row3.appendChild(row3cell1);
    row3.appendChild(row3cell2);

    tbody.appendChild(row1);
    tbody.appendChild(row2);
    tbody.appendChild(row3);
    table.appendChild(tbody);
    statisticsDisplay.appendChild(table);

    }
    )};


    function displayFailHomeInitData() {
        displayErrorByCode();
    } 

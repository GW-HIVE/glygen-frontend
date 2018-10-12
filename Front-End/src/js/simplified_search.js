// @author: Tatiana Williamson
// @description: UO1 Version-1.1.0
// @created: September 12, 2018

/**
 * function hideSimplSearchButton hides simplified search div by clicking the Advanced Search button
 * @param {string} strings of characters
 * @display {none} Hides div by id
 */

function hideSimplSearchButton() {
    var x = document.getElementById("simplifiedSearch");
    var y = document.getElementById("advancedSearch");
        x.style.display = "none";
        y.style.display = "block";    
}

/**
 * function hideSimplSearchButton hides simplified search div by clicking the Advanced Search button
 * @param {string} strings of characters
 * @display {none} Hides div by id
 */

function hideAdvSearchButton() {
    var x = document.getElementById("advancedSearch");
    var y = document.getElementById("simplifiedSearch");
    x.style.display = "none";
    y.style.display = "block";
}

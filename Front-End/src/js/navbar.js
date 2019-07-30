// @author: Tatiana Williamson
// @description: UO1 Version-1.1.
// @Date: 8th of March 2018.

/**
 * Represents a navbar.
 * @param {string} itemText - Selected text on navigation bar.
 */

function setNavItemAsCurrent(itemText) {
    $('.nav > li > a').each(function() {
        if($(this).text().indexOf(itemText) >= 0) {
            $(this).parent().addClass('current');
        }
    });
}

$(document).ready(function(){
    var url = window.location.href;
    var fullFilename = url.substring(url.lastIndexOf('/')+1);
    var filename = fullFilename.substring(0, fullFilename.lastIndexOf('.'));
    var navItemText = filename.replace(/_/g, ' ').toUpperCase(); 
    
    if(navItemText == '') {
        navItemText = 'HOME';
    } else if(navItemText == 'INDEX') {
        navItemText = 'HOME';
    } else if(navItemText == 'GLYCAN SEARCH') {
        navItemText = 'EXPLORE';
    } else if(navItemText == 'PROTEIN SEARCH') {
        navItemText = 'EXPLORE';
    } else if(navItemText == 'GLYCOPROTEIN SEARCH') {
        navItemText = 'EXPLORE';
    } else if(navItemText == 'QUICK SEARCH') {
        navItemText = 'QUICK SEARCH'; 
    } else if(navItemText == 'FEEDBACK') {
        navItemText = 'HELP';
    } else if(navItemText == 'CONTACT') {
        navItemText = 'HELP';
    } else if(navItemText == 'HOW TO CITE') {
        navItemText = 'HELP';
    } else if(navItemText == 'ABOUT') {
        navItemText = 'HELP';
    } else if(navItemText == 'RESOURCES') {
        navItemText = 'MORE';
    } else if(navItemText == 'MEDIA') {
        navItemText = 'MORE';
    } else if(navItemText == 'FRAMEWORKS') {
        navItemText = 'MORE';
    } else if(navItemText == 'GLYGEN SETTINGS') {
        navItemText = 'MY GLYGEN';
    }
    
    if (url.includes('//data.')){
        navItemText = 'DATA';
    } else if(url.includes('//sparql.')){
        navItemText = 'SPARQL';
    }
  
    $('.nav > li').removeClass('current');
    setNavItemAsCurrent(navItemText);
});

// End @author: Tatiana Williamson






function getErrorMessage(errorCode) {
    switch(errorCode) {
        case 'GLIST01':
            return {
                message: 'Entry Error has occurred. Please Provide valid ID in URL.',
                title: "Invalid"
            };
            break;
        case 'GLIST02':
            return {
                message: 'Display error occurred.we are looking into problem',
                title: "Unexpected error"
            };
            break;
        case 'GLIST03':
            return {
                message: 'Display error occurred.we are looking into problem',
                title: "Unexpected error"
            };
            break;
        case 'GLIST04':
            return {
                message: 'Display error occurred.we are looking into problem',
                title: "Unexpected error"
            };
            break;
        case 'GLIST05':
            return 'Entry Error has occurred. Please Provide valid ID.';
            break;
        case 'LIBGLIST01':
            return 'Selection Error has occurred.'
                   'Please choose a different number of records per page.';
            break;
        case 'server_down':
            return 'sorry server is down';
            break;
    }

    return 'Unknown error.';
}
/**
 * Display Error message using alertify


 */
function displayError(message,title){
    alertify.alert(title, message).set('modal', false);
}

function displayErrorByCode(errorCode) {
    var error = getErrorMessage(errorCode);
    displayError(error.message,error.title);
}


/**
 * Js load for adding header and footer file into each page


 */
$(document).ready(function(){
    $( "#footer" ).load( "footer.html" );
    $( "#header" ).load( "header.html" );
});
//@author: Rupali Mahadik
// @update: Aug 6, 2018 - Gaurav Agarwal - added ajax error cases.


function getErrorMessage(errorCode) {
    var contactUsMsg = " If the problem persists then you may <a href='contact.html' >contact us</a>";
    switch (errorCode) {
        case 'invalid-query-json':
            return {
                message: "This is not a valid entry. Please try again.",
                title: "Invalid Entry Error"
                //                message: "This is not a valid JSON query. Please try again.",
                //                title: "Invalid Submission"
            };
            break;
        case 'open-connection-failed':
            return {
                message: "Sorry, we couldn't connect to database.",
                title: "Unexpected Error"
            };
            break;
        case 'unexpected-field-in-query':
            return {
                message: "This is unexpected field entry. Please try again",
                title: "Unexpected Field Entry Error"
                //                message: "Unexpected field in query JSON.",
                //                title: "Unexpected Error"
            };
            break;
        case 'invalid-parameter-value-length':
            return {
                message: "Please adjust length of your entry and try again.",
                title: "Invalid Value Length Error"
                //                message: "Display error occurred. We are looking into this problem.",
                //                title: "Unexpected Error"
            };
            break;
        case 'no-search-criteria-submitted':
            return {
                message: "Entry error occurred. Please provide a valid ID.",
                title: "Unexpected Error"
            };
            break;
        case 'non-existent-record':
            return {
                message: "Please choose a different number of records per page.",
                title: "Selection Error"
            };
            break;
        case 'invalid-parameter-value':
            return {
                message: "Please choose a different number of records per page.",
                title: "Selection Error"
            };
            break;
        case 'non-existent-search-result':
            return {
                message: "Please choose a different number of records per page.",
                title: "Selection Error"
            };
            break;
        case 'missing parameter':
            return {
                message: "Please choose a different number of records per page.",
                title: "Selection Error"
            };
            break;
        case 'no-results-found':
            return {
                message: "Sorry, we couldn't find any data matching your entry. Please change your parameters and try again.",
                title: "No Results Found"
                //                message: "Sorry, we couldn't find any results matching your selection.",
                //                title: "Selection Error"
            };

            break;

        case 'timeout':
            return {
                message: "Sorry, the server didn't respond. Please try again later." + contactUsMsg,
                title: "TimeOut Error"
            };

        case 'parsererror':
            return {
                message: "There was an error in the data received. We are looking into it." + contactUsMsg,
                title: "Parsing Error"
            };

        case 'abort':
            return {
                message: "Sorry, your requested was aborted. Please try again." + contactUsMsg,
                title: "Request Aborted"
            };

        case 0:
            return {
                message: "Could not connect to the server." + contactUsMsg,
                title: "Not Connected"
            };

        case 404:
            return {
                message: "Could not connect to the server." + contactUsMsg,
                title: "Server not found"
            };

        case 500:
            return {
                message: "An Internal server error occured. We are doing our best to resolve it." + contactUsMsg,
                title: "Server error"
            };

        default:
            return {
                message: "Oops, something went wrong. Please try again later." + contactUsMsg,
                title: "Unexpected Error"
            };


    }
}

/**
 * Display Error message using alertify
 */
function displayError(message, title) {
    alertify.alert(title, message).set('modal', false);
}

function displayErrorByCode(errorCode) {
    var error = getErrorMessage(errorCode);
    displayError(error.message, error.title);
}


// /**
//  * Js load for adding header and footer file into each page
//
//
//  */
// $(document).ready(function () {
//     $("#footer").load("footer.html");
//     $("#header").load("header.html");
// });
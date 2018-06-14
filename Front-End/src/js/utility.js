




function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'invalid-query-json':
            return {
                message: 'Submitted query JSON is not valid.',
                title: "Invalid"
            };
            break;
        case 'open-connection-failed':
            return {
                message: 'Unable to connect to database.',
                title: "Unexpected error"
            };
            break;
        case 'unexpected-field-in-query':
            return {
                message: 'Unexpected field in query JSON',
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
            return {
                message: 'Entry Error has occurred. Please Provide valid ID.',
                title: "Unexpected error"
            };
            break;
        case 'LIBGLIST01':
            return {
                message: 'Please choose a different number of records per page.',
                title: "selection error"
            };
        case 'server_down':
            return 'sorry server is down';
            break;
    }

    return {
        message: 'Display error occurred.we are looking into problem',
        title: "Unexpected error"
    };

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
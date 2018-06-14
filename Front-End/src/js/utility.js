




function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'open-connection-failed':
            return {
                message: 'Display error occurred.we are looking into problem.',
                title: "Unexpected error"
            };
            break;
        case 'invalid-query-json':
            return {
                message: 'Display error occurred.we are looking into problem',
                title: "Unexpected error"
            };
            break;
        case 'unexpected-field-in-query':
            return {
                message: 'Display error occurred.we are looking into problem',
                title: "Unexpected error"
            };
            break;
        case 'invalid-parameter-value':
            return {
                message: 'Display error occurred.we are looking into problem',
                title: "Unexpected error"
            };
            break;
        case 'invalid-parameter-value-length':
            return {
                message: 'Display error occurred.we are looking into problem',
                title: "Unexpected error"
            };
            break;
        case 'no-search-criteria-submitted':
            return {
                message: 'Display error occurred.we are looking into problem',
                title: "Unexpected error"
            };
            break;
        case 'non-existent-record':
            return {
                message: 'Display error occurred.we are looking into problem',
                title: "Unexpected error"
            };
            break;

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
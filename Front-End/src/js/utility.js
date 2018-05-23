




function getErrorMessage(errorCode) {
    switch (errorCode) {
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


    /**
     * Js load for adding header and footer file into each page


     */
    $(document).ready(function () {
        $("#footer").load("footer.html");
        $("#header").load("header.html");
    });
}
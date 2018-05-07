$(function () {

    // init the validator

    $('#contact-form').validator();


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            e.preventDefault();
            var url = getWsUrl("contact");

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serializeArray(),
                success: function (data) {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    contactReply(messageAlert, messageText);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-danger';
                    var messageText = "Oops, something went wrong! We did not receive your message. Please try again later. " + errorThrown;
                    contactReply(messageAlert, messageText);
                    activityTracker("error", "", textStatus+": "+errorThrown);
                }
            });
            return false;
        }
    })

    function contactReply(messageAlert, messageText) {
        // let's compose Bootstrap alert box HTML
        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

        // If we have messageAlert and messageText
        if (messageAlert && messageText) {
            // inject the alert to .messages div in our form
            $('#contact-form').find('.messages').html(alertBox);
            // empty the form
            $('#contact-form')[0].reset();
        }
    }
});
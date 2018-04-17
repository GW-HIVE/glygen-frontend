// @author: Tatiana Williamson
// @description: UO1 Version-1.1.
// @Date: 8th Mar 2018.

function switchHandler(el) {
    $(document).ready(function() {
        var $checkbox = $('[name="manageSettingsEnabled"]');
        if(!$checkbox.is(':checked')) {
            $checkbox.attr('checked', false);
            $('#manageSettingsDisabled').css('display', 'block');
            $('#manageSettingsEnabled').css('display', 'none');
            clearLocalStore();
            doNotLog();
        } else {
            $checkbox.attr('checked', true);
            $('#manageSettingsDisabled').css('display', 'none');
            $('#manageSettingsEnabled').css('display', 'block');
            clearLocalStore();
            logID();
        }
    });
}
// End @author: Tatiana Williamson
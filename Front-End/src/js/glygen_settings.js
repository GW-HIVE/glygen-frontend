// @author: Tatiana Williamson
// @description: UO1 Version-1.1.
// @Date: March 08, 2018.

/**
 * Represents a switch handler in glygen settings.
 * @param {string} el - Managing GlyGen settings. The user can enable or disable cookies. 
 */

function switchHandler(el) {
    $(document).ready(function() {
        var $checkbox = $('[name="manageSettingsEnabled"]');
        if(!$checkbox.is(':checked')) {
            $checkbox.attr('checked', false);
            $('#manageSettingsDisabled').css('display', 'block');
            $('#manageSettingsEnabled').css('display', 'none');
            $('#textManageSettingsDisabled').css('display', 'block');
            $('#textManageSettingsEnabled').css('display', 'none');
            clearLocalStore();
            doNotLog();
        } else {
            $checkbox.attr('checked', true);
            $('#manageSettingsDisabled').css('display', 'none');
            $('#manageSettingsEnabled').css('display', 'block');
            $('#textManageSettingsDisabled').css('display', 'none');
            $('#textManageSettingsEnabled').css('display', 'block');
            clearLocalStore();
            logID();
        }
    });
}
// End @author: Tatiana Williamson
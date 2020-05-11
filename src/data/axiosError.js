
import stringConstants from './json/stringConstants';
import {logActivity} from './logging';

export const axiosError = (error, msg, setPageLoading, setAlertDialogInput) => {
    console.log(error);
    let message = msg || "";
    if (!error.response) {
        logActivity("error", "", "Network error. " + message);
        (setPageLoading && setPageLoading(false));
        (setAlertDialogInput && setAlertDialogInput({"show": true, "id": stringConstants.errors.networkError.id}));
    } else if (error.response && !error.response.data) {
        logActivity("error", "", error.response.status + " error status. " + message);
        (setPageLoading && setPageLoading(false));
        (setAlertDialogInput && setAlertDialogInput({"show": true, "id": error.response.status}));
    } else if (error.response.data && error.response.data["error_list"]) {
        logActivity("error", "", error.response.data["error_list"][0].error_code + " error code. " + message);
        (setPageLoading && setPageLoading(false));
        (setAlertDialogInput && setAlertDialogInput({"show": true, "id": error.response.data["error_list"][0].error_code}));
    }
}
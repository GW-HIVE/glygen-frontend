import React from "react";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from '@material-ui/lab';

export default function SearchAlert(props) {

  return (
    <>
    {props.searchError && <div>
      <Alert severity="error">
         <AlertTitle>{props.alertTitle}</AlertTitle>
            {props.alertText}
        </Alert>
    </div>}
    </>

  );
}

SearchAlert.propTypes = {
  searchError: PropTypes.bool,
  alertTitle: PropTypes.string,
  alertText: PropTypes.string,
};

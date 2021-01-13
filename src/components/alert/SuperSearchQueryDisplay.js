import React from "react";
import PropTypes from "prop-types";
import stringConstants from '../../data/json/stringConstants';
import Button from 'react-bootstrap/Button';
import { Dialog } from "@material-ui/core";

/**
 * Dialog alert component to show error messages.
 */
export default function SuperSearchQueryDisplay(props) {

  return (
        <Dialog
            open={props.show}
            // classes= {{
            //     paper: "alert-dialog",
            //     root: "alert-dialog-root"
            // }}
            disableScrollLock
            onClose={() => props.setOpen(false)} 
        >    
            <h5 className= "alert-dialog-title">{props.title}</h5>
            <div className="alert-dialog-content">
                <div 
                    className="alert-dialog-content-text"
                >
                        {JSON.stringify(props.query)}
                </div>
                <Button
                    className= "gg-btn-outline"
                    style={{ float: "right" }}
                    onClick={() => props.setOpen(false)}
                >
                    Ok
                </Button>
            </div>
        </Dialog>
  );
}

SuperSearchQueryDisplay.propTypes = {
  show: PropTypes.bool,
  query: PropTypes.object,
  setOpen: PropTypes.func
};
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
            style={{padding:40}}
            disableScrollLock
            onClose={() => props.setOpen(false)} 
        >    
            <div 
            id="contents"
            style={{margin:40, content:'center', height: '500px', width: '600' }}
             class = "gf-content-div"
             >
            <h5 className= "alert-dialog-title">{props.title}</h5>
            <div className="alert-dialog-content">
                <div 
                    // className="alert-dialog-content-text"
                    style={{overflow: 'scroll', content:'center', height: '400px', width: '500px' }}
                >
                        <div><pre>{JSON.stringify(props.query, null, 2)}</pre></div>
                </div>
                <Button
                    className= "gg-btn-outline"
                    style={{marginTop: "20px", float: "right" }}
                    onClick={() => props.setOpen(false)}
                >
                    Ok
                </Button>
                </div>
            </div>
        </Dialog>
  );
}

SuperSearchQueryDisplay.propTypes = {
  show: PropTypes.bool,
  query: PropTypes.object,
  setOpen: PropTypes.func
};
import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { Dialog } from "@material-ui/core";

/**
 * Dialog component to show query.
 */
export default function SuperSearchQueryDisplay(props) {

  return (
        <Dialog
            open={props.show}
            classes= {{
                paper: "alert-dialog",
                root: "alert-dialog-root"
            }}
            style={{padding:40}}
            disableScrollLock
            onClose={() => props.setOpen(false)} 
        >    
            <div 
                id="contents"
                style={{margin:40, content:'center'}}
                class = "gf-content-div"
             >
            <h5 className= "alert-dialog-title">{props.title}</h5>
            <div className="alert-dialog-content">
                <div 
                    style={{overflow: 'scroll', paddingRight:40, content:'center', maxHeight: '400px', minWidth: '500px' }}
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
  query: PropTypes.array,
  title: PropTypes.string,
  setOpen: PropTypes.func
};
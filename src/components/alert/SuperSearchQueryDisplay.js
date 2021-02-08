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
            style={{margin:40}}
            disableScrollLock
            onClose={() => props.setOpen(false)} 
        >    
            <div id="contents" class = "gf-content-div">
                <h5 className= "alert-dialog-title">{props.title}</h5>
                <div clas1sName="alert-dialog-content"
                    style={{padding:40, content:'center'}}
                >
                    <div 
                        style={{overflow: 'scroll', paddingRight:40, content:'center', maxHeight: '400px', minWidth: '500px' }}
                    >
                        <div><pre>{JSON.stringify(props.query, null, 2)}</pre></div>
                    </div>
                    <div style={{paddingBottom:60}}>
                        <Button
                            className= "gg-btn-outline"
                            style={{marginTop: "20px", float: "right" }}
                            onClick={() => props.setOpen(false)}
                        >
                            Ok
                        </Button>
                    </div>
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
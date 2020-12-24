import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router-dom';
import '../../css/Search.css';
import stringConstants from '../../data/json/stringConstants';
import { load } from 'data-loader';
import {select, selectAll, forceSimulation, forceManyBody, forceLink } from 'd3';
import SuperSearchInputcontrol from '../input/SuperSearchInputcontrol';
import { Dialog } from "@material-ui/core";
import Button from 'react-bootstrap/Button';


/**
 * Glycan search component for showing glycan search tabs.
 */
const SuperSearchControl = (props) => {

    const [controlArray, setControlArray] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        setControlArray([]);
        var tempArray = [];
        for (var i = 0; i < 4; i++){
            tempArray.push({order:i, value: i})
        }
        setControlArray(tempArray);
    }, [props.selectedNode])

    /**
	 * Function to set binding protein id value.
	 * @param {string} inputGlyBindingIdProtein - input binding protein id value.
	 **/
	function supSearchDeleteQuery(order) {
        var tempArray = controlArray.filter(query => query.order !== order);
        tempArray.map((value, index, arr) => {
            if (value.order > order) {
                value.order = value.order - 1;
            }
            return value;
        }) 
        setControlArray(tempArray);
    }

    /**
	 * Function to set binding protein id value.
	 * @param {string} inputGlyBindingIdProtein - input binding protein id value.
	 **/
	function supSearchAddQuery(order) {
        var tempArray = controlArray.slice();
        tempArray.map((value, index, arr) => {
            if (value.order >= order) {
                value.order = value.order + 1;
            }
            return value;
        }) 
        tempArray.push({order:order, value: order});
        setControlArray(tempArray);
    }

    /**
	 * Function to set binding protein id value.
	 * @param {string} inputGlyBindingIdProtein - input binding protein id value.
	 **/
	function supSearchMoveUpQuery(currOrder, prevOrder) {
        var tempArray = controlArray.slice();
        var currQuery = tempArray.filter(query => query.order === currOrder)[0];
        var prevQuery = tempArray.filter(query => query.order === prevOrder)[0];

        var updatedArray = tempArray.filter(query => query.order !== currOrder && query.order !== prevOrder);

        currQuery.order = prevOrder;
        prevQuery.order = currOrder;

        updatedArray.push(prevQuery);
        updatedArray.push(currQuery);

        setControlArray(updatedArray);
    }

    /**
	 * Function to set binding protein id value.
	 * @param {string} inputGlyBindingIdProtein - input binding protein id value.
	 **/
	function supSearchMoveDownQuery(currOrder, nextOrder) {
        var tempArray = controlArray.slice();
        var currQuery = tempArray.filter(query => query.order === currOrder)[0];
        var nextQuery = tempArray.filter(query => query.order === nextOrder)[0];

        var updatedArray = tempArray.filter(query => query.order !== currOrder && query.order !== nextOrder);

        currQuery.order = nextOrder;
        nextQuery.order = currOrder;

        updatedArray.push(currQuery);
        updatedArray.push(nextQuery);

        setControlArray(updatedArray);
    }

    return (
		<>            
                <Dialog
            open={props.data.id !== undefined}
            // open={open}
            fullWidth={true}
        maxWidth={'lg'}
            // classes= {{
            //     paper: "alert-dialog",
            //     root: "alert-dialog-root"
            // }}
            disableScrollLock
            onClose={() => props.setSelectedNode(undefined)} 
        >  
            <div 
            id="contents"
            style={{margin:40, content:'center', height: '400px', width: '1200px' }}
             class = "gf-content-div"
             >
                <h5 className= "alert-dialog-title"><center>Add {props.data.id} properties to search</center></h5>
                {/* <label><center>Selected node: {props.data.id}</center></label> */}
                <p><span id='display'></span></p>
                <form id ="queryForm">
                    <div style={{overflow: 'scroll', content:'center', height: '250px', width: '1200px' }}>
                <center>
                    {controlArray.sort((query1, query2) => query1.order - query2.order).map((query, index, cntArr ) =>
                        <SuperSearchInputcontrol query={query} prevOrderId={index - 1 === -1 ? undefined : cntArr[index - 1].order} nextOrderId={index + 1 === controlArray.length ? undefined : cntArr[index + 1].order}
                        supSearchDeleteQuery={supSearchDeleteQuery} supSearchAddQuery={supSearchAddQuery}
                        supSearchMoveUpQuery={supSearchMoveUpQuery} supSearchMoveDownQuery={supSearchMoveDownQuery}
                        data={props.data} selectedNode={props.selectedNode}/>
                    )}
                    </center>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <Button
                        className='gg-btn-outline mr-3 mb-3'
                        // disabled={undoDisabled}
                        style={{ float: "right" }}
                        onClick={() => props.setSelectedNode(undefined)}
                        >
                        Cancel
                    </Button>
                    <Button
                        className='gg-btn-blue mr-3 mb-3'
                        style={{ float: "right" }}
                        // disabled={undoDisabled}
                        >
                        
                        Search
                    </Button>
                </div>
                </form><br/>
                <p><span id='display2'></span></p>
            </div>
            </Dialog>
        </>
	);
};

export default SuperSearchControl;
import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router-dom';
import '../../css/Search.css';
import stringConstants from '../../data/json/stringConstants';
import superSearchSVGData from '../../data/json/superSearchSVGData';
import { load } from 'data-loader';
import { getSuperSearch } from '../../data/supersearch';
import {select, selectAll, forceSimulation, forceManyBody, forceLink } from 'd3';
import SuperSearchInputcontrol from '../input/SuperSearchInputcontrol';
import { Dialog } from "@material-ui/core";
import Button from 'react-bootstrap/Button';
import {logActivity} from '../../data/logging';
import {axiosError} from '../../data/axiosError';


/**
 * Glycan search component for showing glycan search tabs.
 */
const SuperSearchControl = (props) => {

    let fieldTypes = superSearchSVGData.fieldTypes;

    const [controlArray, setControlArray] = useState([
        {
            "order":0,
            "aggregator":"",
            "field":"",
            "fieldType":"",
            "operation":"",
            "value":"",
            "operationEnum":[],
            "selectEnum":[]
        }]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        setControlArray([]);
        var tempArray = [];
        for (var i = 0; i < 4; i++){
            tempArray.push(
                {
                    order:i, 
                    aggregator:"",
                    field:"",
                    fieldType:"",
                    operation:"",
                    value:"",
                    operationEnum:[],
                    selectEnum:[]
                })
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
        tempArray.push({
            order:order,
            aggregator:"",
            field:"",
            fieldType:"",
            operation:"",
            value:"",
            operationEnum:[],
            selectEnum:[]
        });
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

    /**
	 * Function to set binding protein id value.
	 * @param {string} inputGlyBindingIdProtein - input binding protein id value.
	 **/
	function supSearchUpdateQuery(currOrder, field, value) {
        var tempArray = controlArray.slice();
        var currQuery = tempArray.filter(query => query.order === currOrder)[0];

        var updatedArray = tempArray.filter(query => query.order !== currOrder);
        //alert(currQuery[field]);

        currQuery[field] = value;

        //alert(value);
        //alert(currQuery[field]);

        updatedArray.push(currQuery);

        setControlArray(updatedArray);
    }

    /**
	 * Function to set binding protein id value.
	 * @param {string} inputGlyBindingIdProtein - input binding protein id value.
	 **/
	function supSearchSubmitQuery() {
        props.setPageLoading(true);

        var tempArray = controlArray.slice();
        var concept = props.selectedNode;
        var searchQuery = {
            concept: concept, 
            query:{
                aggregator: "",
                aggregated_list: [],
                unaggregated_list: []
            } 
        };

        var tempArray1 = tempArray.filter((query) => query.field !== "")
                        .sort((que1, que2) => que1.order - que2.order);
        var currentQuery = searchQuery.query;
        
        for (var i = 0; i < tempArray1.length; i++){
            if (i === 0){
                currentQuery.aggregator = tempArray1[i].aggregator;
                //let pathArr = tempArray1[i].field.split(".");

                let temp = {
                    //path: pathArr[pathArr.length - 1],
                    path: tempArray1[i].field,
                    operator: tempArray1[i].operation,
                    [fieldTypes[tempArray1[i].fieldType]]: tempArray1[i].fieldType === "number" ? Number(tempArray1[i].value) : tempArray1[i].value, 
                }
                currentQuery.unaggregated_list.push(temp);
            } else {
                if (currentQuery.aggregator === tempArray1[i].aggregator) {
                    //let pathArr = tempArray1[i].field.split(".");

                    let temp = {
                        //path: pathArr[pathArr.length - 1],
                        path: tempArray1[i].field,
                        operator: tempArray1[i].operation,
                        [fieldTypes[tempArray1[i].fieldType]]: tempArray1[i].fieldType === "number" ? Number(tempArray1[i].value) : tempArray1[i].value, 
                    }
                    currentQuery.unaggregated_list.push(temp);
                } else {
                    let query = {
                        aggregator: tempArray1[i].aggregator,
                        aggregated_list: [],
                        unaggregated_list: []
                    } 

                    //let pathArr = tempArray1[i].field.split(".");

                    let temp = {
                        //path: pathArr[pathArr.length - 1],
                        path: tempArray1[i].field,
                        operator: tempArray1[i].operation,
                        [fieldTypes[tempArray1[i].fieldType]]: tempArray1[i].fieldType === "number" ? Number(tempArray1[i].value) : tempArray1[i].value
                    }
                    query.unaggregated_list.push(temp);
                    currentQuery.aggregated_list.push(query);
                    currentQuery = query;
                }
            }
        }

        let finalSearchQuery = props.queryData.filter((query) => query.concept !== props.selectedNode);

        finalSearchQuery.push(searchQuery);
        alert(JSON.stringify(searchQuery));
        getSuperSearch(finalSearchQuery).then((response) => {
            let searchData = response.data;
            props.setPageLoading(false);
            alert(JSON.stringify(searchData));
            props.updateNodeData(searchData.results_summary);
            props.setQueryData(finalSearchQuery);
            props.setSelectedNode(undefined)
        })
        .catch(function (error) {
            let message = "supersearch api call";
            axiosError(error, "", message, props.setPageLoading, props.setAlertDialogInput);
        });
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
                        supSearchUpdateQuery={supSearchUpdateQuery}
                        data={props.data} selectedNode={props.selectedNode}/>
                    )}
                    </center>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                    <Button
                        className='gg-btn-blue mr-3 mb-3'
                        style={{ float: "right" }}
                        // disabled={undoDisabled}
                        onClick={supSearchSubmitQuery}
                        >
                        Search
                    </Button>
                    <Button
                        className='gg-btn-outline mr-3 mb-3'
                        // disabled={undoDisabled}
                        style={{ float: "right" }}
                        onClick={() => props.setSelectedNode(undefined)}
                        >
                        Clear Fields
                    </Button>
                    <Button
                        className='gg-btn-outline mr-3 mb-3'
                        // disabled={undoDisabled}
                        style={{ float: "right" }}
                        onClick={() => props.setSelectedNode(undefined)}
                        >
                        Cancel
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
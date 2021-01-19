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
            "maxlength":100,
            "operationEnum":[],
            "selectEnum":[]
        }]);

    useEffect(() => {
        setControlArray([]);
        var tempArray = [];

        let queryDataTemp = props.queryData.filter((value) => value.concept === props.selectedNode);

        queryDataTemp && supSearchQueryDataToArray(queryDataTemp, tempArray)

        tempArray.sort((que1, que2) => que1.order - que2.order);

        let lastOrder = 0;
        if  (tempArray.length > 0){
            lastOrder = tempArray[tempArray.length - 1].order;
        }
        let len = lastOrder > 4 ? lastOrder : 4;
        for (let i = 0; i < len; i++){
            let curOrder = tempArray.find((que) => {return que.order === i});

            if (curOrder) {
                continue;
            }

            tempArray.push(
                {
                    order: i, 
                    aggregator:"",
                    field:"",
                    fieldType:"",
                    operation:"",
                    value:"",
                    maxlength:100,
                    operationEnum:[],
                    selectEnum:[]
                })
        }
        setControlArray(tempArray);
    }, [props.selectedNode])


    function supSearchQueryDataToArray(queryData, tempArray) {

        for (let i = 0; queryData && i < queryData.length && props.data.fields && props.data.fields.length > 0 ; i++){

            let curQuery = queryData[i].query ? queryData[i].query : queryData[i];

            for (let j = 0; curQuery.unaggregated_list && j < curQuery.unaggregated_list.length; j++){

                let query = curQuery.unaggregated_list[j];
                let curfield = props.data.fields.filter((value)=> value.id === query.path)[0];
                tempArray.push(
                    {
                        order: query.order, 
                        aggregator: curQuery.aggregator,
                        field: query.path,
                        fieldType: curfield.type,
                        operation: query.operator,
                        value: query[fieldTypes[curfield.type]],
                        maxlength: curfield.maxlength,
                        operationEnum: curfield.oplist,
                        selectEnum: curfield.enum
                    })
            }
            supSearchQueryDataToArray(curQuery.aggregated_list, tempArray);
        }
    }

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
            maxlength:100,
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

        currQuery[field] = value;

        updatedArray.push(currQuery);

        setControlArray(updatedArray);
    }

    /**
	 * Function to set binding protein id value.
	 **/
	function supSearchSubmitQuery() {
        props.setPageLoading(true);

        var tempArray = controlArray.slice();
        var concept = props.selectedNode;
        var searchQuery = {
            concept: concept, 
            query:{} 
        };

        var tempArray1 = tempArray.filter((query) => query.field !== "")
                        .sort((que1, que2) => que1.order - que2.order);
        var currentQuery;
        
        for (var i = 0; i < tempArray1.length; i++){
            if (i === 0){
                searchQuery.query = {
                    aggregator: "",
                    aggregated_list: [],
                    unaggregated_list: []
                };
                currentQuery = searchQuery.query;
                currentQuery.aggregator = tempArray1.length > 1 ? tempArray1[i+1].aggregator : tempArray1[i].aggregator;

                let temp = {
                    path: tempArray1[i].field,
                    order: tempArray1[i].order, 
                    operator: tempArray1[i].operation,
                    [fieldTypes[tempArray1[i].fieldType]]: tempArray1[i].fieldType === "number" ? Number(tempArray1[i].value) : tempArray1[i].value, 
                }
                currentQuery.unaggregated_list.push(temp);
            } else {
                if (currentQuery.aggregator === tempArray1[i].aggregator) {

                    let temp = {
                        path: tempArray1[i].field,
                        order: tempArray1[i].order, 
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

                    let temp = {
                        path: tempArray1[i].field,
                        order: tempArray1[i].order, 
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

        if (tempArray1.length > 0) {
            finalSearchQuery.push(searchQuery);
        }

        if (finalSearchQuery.length === 0) {
            props.setPageLoading(false);
            props.setQueryData(finalSearchQuery);
            props.updateNodeData(undefined);
            props.setSelectedNode(undefined)
        }

        finalSearchQuery.length > 0 && getSuperSearch(finalSearchQuery).then((response) => {
            let searchData = response.data;
            props.setPageLoading(false);
            props.setQueryData(finalSearchQuery);
            props.updateNodeData(searchData.results_summary);
            props.setSelectedNode(undefined)
        })
        .catch(function (error) {
            let message = "supersearch api call";
            axiosError(error, "", message, props.setPageLoading, props.setAlertDialogInput);
        });
    }

    /**
	 * Function to clear input field values.
	 **/
	const clearSuperSearchFields = () => {
        var tempArray = controlArray.slice();

        for (let i = 0; i < tempArray.length; i++){
            tempArray[i].aggregator = "";
            tempArray[i].field = "";
            tempArray[i].fieldType = "";
            tempArray[i].operation = "";
            tempArray[i].value = "";
            tempArray[i].maxlength = 100;
            tempArray[i].operationEnum = [];
            tempArray[i].selectEnum = [];
        }
        setControlArray(tempArray);
	};

    return (
		<>            
                <Dialog
            open={props.data.id !== undefined}
            // open={open}
            // fullWidth={true}
            style={{margin:40}}
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
            style={{padding:40, content:'center', height: '520px', width: '1200px' }}
             class = "gf-content-div"
             >
                <h5 className= "alert-dialog-title"><center>Add {props.data.label ? props.data.label.toLowerCase() : props.data.label} properties to search</center></h5>
                <p><span id='display'></span></p>
                <form id ="queryForm">
                    <div style={{paddingTop: '20px', overflow: 'scroll', content:'center', height: '290px', width: '1120px' }}>
                    {controlArray.sort((query1, query2) => query1.order - query2.order).map((query, index, cntArr ) =>
                        <SuperSearchInputcontrol query={query} prevOrderId={index - 1 === -1 ? undefined : cntArr[index - 1].order} nextOrderId={index + 1 === controlArray.length ? undefined : cntArr[index + 1].order}
                        supSearchDeleteQuery={supSearchDeleteQuery} supSearchAddQuery={supSearchAddQuery}
                        supSearchMoveUpQuery={supSearchMoveUpQuery} supSearchMoveDownQuery={supSearchMoveDownQuery}
                        supSearchUpdateQuery={supSearchUpdateQuery}
                        data={props.data} selectedNode={props.selectedNode}/>
                    )}
                    </div>
                    <div style={{ marginTop: "20px" }}>
                    <Button
                        className='gg-btn-blue mr-3 mb-3'
                        style={{ float: "right" }}
                        onClick={supSearchSubmitQuery}
                        >
                        Search
                    </Button>
                    <Button
                        className='gg-btn-outline mr-3 mb-3'
                        style={{ float: "right" }}
                        onClick={clearSuperSearchFields}
                        >
                        Clear Fields
                    </Button>
                    <Button
                        className='gg-btn-outline mr-3 mb-3'
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
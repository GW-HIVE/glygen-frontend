import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router-dom';
import '../../css/Search.css';
import stringConstants from '../../data/json/stringConstants';
import { load } from 'data-loader';
import global_var from '../../data/json/data';
import {select, selectAll, forceSimulation, forceManyBody, forceLink } from 'd3';



/**
 * Glycan search component for showing glycan search tabs.
 */
const SuperSearchControl = (props) => {

    return (
		<>            
            <div id="contents" class = "gf-content-div">
                <h3><center>Click on a node to get its properties</center><br></br></h3>
                <label><center>Contents of node: {props.selectedNode}</center></label>
                <p><span id='display'></span></p>
                <form id ="queryForm">
                </form><br/>
                <p><span id='display2'></span></p>
            </div>
        </>
	);
};

export default SuperSearchControl;
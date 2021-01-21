import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import PageLoader from '../components/load/PageLoader';
import TextAlert from '../components/alert/TextAlert';
import DialogAlert from '../components/alert/DialogAlert';
import SuperSearchQueryDisplay from '../components/alert/SuperSearchQueryDisplay';
import GlycanAdvancedSearch from '../components/search/GlycanAdvancedSearch';
import CompositionSearchControl from '../components/search/CompositionSearchControl';
import SimpleSearchControl from '../components/search/SimpleSearchControl';
import GlycanTutorial from '../components/tutorial/GlycanTutorial';
import { Tab, Tabs, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../css/Search.css';
import Grid from '@material-ui/core/Grid';
import glycanSearchData from '../data/json/glycanSearch';
import stringConstants from '../data/json/stringConstants';
import routeConstants from '../data/json/routeConstants';
import {logActivity} from '../data/logging';
import {axiosError} from '../data/axiosError';
import { getSuperSearch, getSuperSearchList, getSuperSearchInit} from '../data/supersearch';
import FeedbackWidget from "../components/FeedbackWidget";
import { load } from 'data-loader';
import global_var from '../data/json/superSearchSVGData';
import {select, selectAll, forceSimulation, forceManyBody, forceLink } from 'd3';
import SuperSearchSVG from '../components/search/SuperSearchSVG';
import SuperSearchControl from '../components/search/SuperSearchControl';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

/**
 * Glycan search component for showing glycan search tabs.
 */
const SuperSearch = (props) => {
  let { id } = useParams("");

//   const [nodeData, setNodeData] = useState([]);
  const [initData, setInitData] = useState([]);
  const [svgData, setSVGData] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");
  const [queryData, setQueryData] = useState([]);
  const [supSearchShowQuery, setSupSearchShowQuery] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);

  useEffect(() => {
	setPageLoading(true);
	logActivity();
	
	getSuperSearchInit().then((response) => {
		let initData = response.data;
		setInitData(initData);
		var initSvgData = getInitSVGData(initData);
		setSVGData(initSvgData);
		if (id === undefined) setPageLoading(false);

		id &&
		getSuperSearchList(id, 1).then(({ data }) => {
				logActivity("user", id, "Search modification initiated");
				setQueryData(data.cache_info.query);
				updateNodeData(data.cache_info.result_summary, initSvgData);
				setPageLoading(false);
			})
			.catch(function (error) {
				let message = "list api call";
				axiosError(error, "", message, setPageLoading, setAlertDialogInput);
			});
	})
	.catch(function (error) {
		let message = "search_init api call";
		axiosError(error, "", message, setPageLoading, setAlertDialogInput);
	});

  }, [])

  function getInitSVGData(initData) {
	var initSvgData = initData.map((node) => {
		return {
			description: node.description,
			record_count: node.record_count,
			id: node.id,
			label: node.label,
			list_id: node.list_id ? node.list_id : "",
		}
	  });
	  return initSvgData;
  }

  function updateNodeData(searchData, initSvgData){
	  var updatedData = [];
	  if (searchData) {
		let tempData = initSvgData ? initSvgData.slice() : svgData.slice();
		updatedData = tempData.map((node) => {
			let id = node.id;
			node.record_count = searchData[id] ? searchData[id].result_count : 0;
			node.list_id = searchData[id] ? searchData[id].list_id : "";
			return node;
		});
	} else {
		updatedData = getInitSVGData(initData);
	}
	  setSVGData(updatedData);
  }

  function goToListPage(listID, currentNode){
	let message = "Super Search " + currentNode + " list page. query=" + JSON.stringify(queryData);
	logActivity(
		"user",
		(id || "") + ">" + listID,
		message
	)
	currentNode !== "site" && props.history.push(
		getListPageRoute(currentNode) + listID + "/sups"
	);
  }

  function getListPageRoute(currentNode) {
	if (currentNode === "glycan") {
		return routeConstants.glycanList;
	} else if (currentNode === "protein") {
		return routeConstants.proteinList;
	} else if (currentNode === "site") {
		return routeConstants.siteList;
	}
  }

  function resetSuperSearchQuery() {
	updateNodeData();
	setQueryData([]);
  }

    return (
		<>
      <Helmet>
				{getTitle('superSearch')}
				{getMeta('superSearch')}
			</Helmet>
			<FeedbackWidget />
			<div className='lander'>
				<Container>
					<PageLoader pageLoading={pageLoading} />
					<DialogAlert
						alertInput={alertDialogInput}
						setOpen={(input) => {
							setAlertDialogInput({"show": input})
						}}
					/>

						<h5 style={{ marginTop: "20px" }}><center>Click on a node to get its properties</center><br></br></h5>

				{svgData.length !== 0 && <SuperSearchSVG svgData={svgData} setSelectedNode={setSelectedNode}
										  goToListPage={goToListPage}
				></SuperSearchSVG>}

				<SuperSearchControl data={initData.filter((value) => value.id === selectedNode)[0] ? initData.filter((value) => value.id === selectedNode)[0] : []} 
					selectedNode={selectedNode} setSelectedNode={setSelectedNode} setPageLoading={setPageLoading} setAlertDialogInput={setAlertDialogInput}
					updateNodeData={updateNodeData} queryData={queryData} setQueryData={setQueryData}
					></SuperSearchControl>

				<SuperSearchQueryDisplay
					show={supSearchShowQuery}
					query={queryData}
					title={"Super Search Query"}
					setOpen={(input) => {
						setSupSearchShowQuery(input)
					}}
				/>	

				<div>
				  	<Button
                        className='gg-btn-outline'
						style={{ marginRight:"60px", marginBottom:"20px",  float: "right" }}
						disabled={queryData.length <= 0}
                        onClick={() => setSupSearchShowQuery(true)}
                        >
                        Show Query
                    </Button>
					<Button
                        className='gg-btn-outline'
						style={{ marginRight:"20px", marginBottom:"20px",  float: "right" }}
						disabled={queryData.length <= 0}
                        onClick={resetSuperSearchQuery}
                        >
                        Reset Query
                    </Button>
                </div>
        	</Container>
      </div>
        </>
	);
};

export default SuperSearch;
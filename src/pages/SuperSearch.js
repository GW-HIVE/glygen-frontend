import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import PageLoader from '../components/load/PageLoader';
import DialogAlert from '../components/alert/DialogAlert';
import SuperSearchQueryDisplay from '../components/alert/SuperSearchQueryDisplay';
import SuperSearchSampleQuery from '../components/search/SuperSearchSampleQuery';
import { Tab, Tabs, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../css/Search.css';
import Grid from '@material-ui/core/Grid';
import superSearchData from '../data/json/superSearchData';
import routeConstants from '../data/json/routeConstants';
import {logActivity} from '../data/logging';
import {axiosError} from '../data/axiosError';
import { getSuperSearchList, getSuperSearchInit} from '../data/supersearch';
import FeedbackWidget from "../components/FeedbackWidget";
import SuperSearchSVG from '../components/search/SuperSearchSVG';
import SuperSearchControl from '../components/search/SuperSearchControl';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { getSuperSearch } from '../data/supersearch';

/**
 * Super search component for showing super search tabs.
 */
const SuperSearch = (props) => {
  let superSearchJSONData = superSearchData.super_search;
  let superSearchTutorialData = superSearchData.tutorial;
  let superSearchCommonData = superSearchData.common;


  let { id } = useParams("");
  let { searchId } = useParams();

  const [initData, setInitData] = useState([]);
  const [svgData, setSVGData] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");
  const [queryData, setQueryData] = useState([]);
  const [supSearchShowQuery, setSupSearchShowQuery] = useState(false);
  const [supSearchSampleQuery, setSupSearchSampleQuery] = useState(false);
  const [supSearchActTabKey, setSupSearchActTabKey] = useState('Super-Search');
  const [superSearchQuerySelect, setSuperSearchQuerySelect] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);

  /**
	* useEffect for retriving data from api and showing page loading effects.
  */
  useEffect(() => {
	setPageLoading(true);
	logActivity();
	getSuperSearchInit().then((response) => {
		let initData = response.data;
		setInitData(initData);
		var initSvgData = getInitSVGData(initData);
		setSVGData(initSvgData);
		const anchorElement = props.history.location.hash;
		if (anchorElement) {
			setSupSearchActTabKey(anchorElement.substr(1));	
		} else {
			setSupSearchActTabKey("Super-Search");
		}
		if (id === undefined) setPageLoading(false);

		id &&
		getSuperSearchList(id, 1).then(({ data }) => {
				logActivity("user", id, "Super Search modification initiated");
				// Keep this above updateNodeData function so that all the state variables are assigned values before svg is rendered/generated.
				// Otherwise svg function goToListPage will have old value of superSearchQuerySelect.
				let queryID = searchId && searchId.includes("_") ? searchId.replace("sups_", "") : "";
				if (queryID && queryID !== "") {
					let selQuery = superSearchJSONData.query_select.query_list.find(option => option.id === queryID);
					setSuperSearchQuerySelect(selQuery && selQuery.id ? selQuery.id : "");
				}
				setQueryData(data.cache_info.query);
				updateNodeData(data.cache_info.result_summary, initSvgData);
				setSupSearchActTabKey("Super-Search");
				setPageLoading(false);
			})
			.catch(function (error) {
				let message = "super search list api call";
				axiosError(error, "", message, setPageLoading, setAlertDialogInput);
			});
	})
	.catch(function (error) {
		let message = "super search_init api call";
		axiosError(error, "", message, setPageLoading, setAlertDialogInput);
	});

  }, [id, searchId])

 

  /**
    * Function to get svg init data.
	* @param {object} initData - init data.
  **/
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

  /**
    * Function to update svg node data.
	* @param {object} searchData - search data.
	* @param {array} initSvgData - init svg data.
  **/
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

  /**
    * Function to go to list page based on node click.
	* @param {string} listID - list id.
	* @param {string} currentNode - current node id.
  **/
  function goToListPage(listID, currentNode){
	let message = "Super Search " + currentNode + " list page. query=" + JSON.stringify(queryData);
	logActivity(
		"user",
		(id || "") + ">" + listID,
		message
	)
	.finally(() => {	
		props.history.push(
			getListPageRoute(currentNode) + listID + "/sups"
		);
	});
  }

  /**
    * Function to return route constant based on current node id.
	* @param {string} currentNode - current node id.
  **/
  function getListPageRoute(currentNode) {
	if (currentNode === superSearchJSONData.glycan.id) {
		return routeConstants.glycanList;
	} else if (currentNode === superSearchJSONData.protein.id) {
		return routeConstants.proteinList;
	} else if (currentNode === superSearchJSONData.site.id) {
		return routeConstants.siteList;
	}
  }

  /**
    * Function to reset node data and query data.
  **/
  function resetSuperSearchQuery() {
	updateNodeData();
	setQueryData([]);
	setSuperSearchQuerySelect("");
  }

  /**
    * Function to execute super search query.
	* @param {array} superSearchQuery - query object.
	* @param {boolean} selected - true if sample query is executed.
  **/
 function executeSuperSearchQuery(superSearchQuery) {

	if (superSearchQuery.length === 0) {
		setQueryData(superSearchQuery);
		updateNodeData();
		setSelectedNode("");
	}

	if (superSearchQuery.length > 0){
		setPageLoading(true);
		setSuperSearchQuerySelect("");
		let message = "Super Search query=" + JSON.stringify(superSearchQuery);
		logActivity("user", "", "Performing Super Search. " + message);
		getSuperSearch(superSearchQuery).then((response) => {
			let searchData = response.data;
			setPageLoading(false);
			setQueryData(superSearchQuery);
			updateNodeData(searchData.results_summary);
			setSelectedNode("");
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	}
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
					<SuperSearchControl data={initData.filter((value) => value.id === selectedNode)[0] ? initData.filter((value) => value.id === selectedNode)[0] : []} 
						selectedNode={selectedNode} 
						executeSuperSearchQuery={executeSuperSearchQuery}
						setSelectedNode={setSelectedNode} 
						queryData={queryData} 
					/>
					<SuperSearchSampleQuery
						show={supSearchSampleQuery}
						executeSuperSearchQuery={executeSuperSearchQuery}
						title={superSearchCommonData.sampleQueryDialog.title}
						setOpen={(input) => {
							setSupSearchSampleQuery(input)
						}}
					/>
					<SuperSearchQueryDisplay
						show={supSearchShowQuery}
						query={queryData}
						title={superSearchCommonData.queryDialog.title}
						setOpen={(input) => {
							setSupSearchShowQuery(input)
						}}
					/>	
					<div className='content-box-md'>
						<h1 className='page-heading'>{superSearchData.pageTitle}</h1>
					</div>
					<Tabs
						defaultActiveKey='Super-Search'
						transition={false}
						activeKey={supSearchActTabKey}
						mountOnEnter={true}
						unmountOnExit={true}
						onSelect={(key) => setSupSearchActTabKey(key)}>
						<Tab
							eventKey='Super-Search'
							className='tab-content-padding'
							title={superSearchJSONData.tabTitle}>
							<Container className='tab-content-border'>
								<Grid
									container
									style={{ margin: '0  auto' }}
									spacing={3}
									justify='center'>
									<Grid item xs={12} sm={12}>
									<h5><br></br><center>{superSearchData.super_search.message}</center></h5>
										{svgData.length !== 0 && <SuperSearchSVG 
											svgData={svgData} setSelectedNode={setSelectedNode}
											goToListPage={goToListPage}
										/>}
									</Grid>

									{/* Buttons */}
									<Grid item xs={11} sm={11}>
										<Row className="gg-align-right mr-3">
											<Button className="gg-btn-outline mr-4" 
												onClick={() => setSupSearchSampleQuery(true)}			
											>
												Try Sample Query
											</Button>
											<Button className="gg-btn-outline mr-4"
												disabled={queryData.length <= 0}
												onClick={resetSuperSearchQuery}
											>
												Reset Query
											</Button>
											<Button className="gg-btn-outline" 
												disabled={queryData.length <= 0}
												onClick={() => setSupSearchShowQuery(true)}			
											>
												Show Query
											</Button>
										</Row>
									</Grid>
								</Grid>
							</Container>
						</Tab>
						<Tab
							eventKey='Tutorial'
							title={superSearchTutorialData.tabTitle}
							className='tab-content-padding'>
							<Container className='tab-content-border'>
								<h2><center>Coming Soon...</center></h2>
							</Container>
						</Tab>
					</Tabs>
        		</Container>
      		</div>
        </>
	);
};

export default SuperSearch;
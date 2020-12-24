import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import PageLoader from '../components/load/PageLoader';
import TextAlert from '../components/alert/TextAlert';
import DialogAlert from '../components/alert/DialogAlert';
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

/**
 * Glycan search component for showing glycan search tabs.
 */
const SuperSearch = (props) => {
  let { id } = useParams("");

  const [nodeData, setNodeData] = useState([]);
  const [initData, setInitData] = useState([]);
  const [svgData, setSVGData] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");


  const [pageLoading, setPageLoading] = useState(true);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);

  useEffect(() => {
    console.log("SuperSearch");
    //setNodeData([1,2]);
	setPageLoading(false);
	setInitData([{id:"glycan"}]);

	
	getSuperSearchInit().then((response) => {
		let initData = response.data;
		setInitData(initData);
		setNodeData(initData);
		
		if (id === undefined) setPageLoading(false);

		id &&
		getSuperSearchList(id, 1).then(({ data }) => {
				logActivity("user", id, "Search modification initiated");
				
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

    return (
		<>
      <Helmet>
				{getTitle('glycanSearch')}
				{getMeta('glycanSearch')}
			</Helmet>
			<FeedbackWidget />
			<div className='lander'>
      {/* <Container> */}
        <div style={{height:"600px", width:"2000px"}}>

					<PageLoader pageLoading={pageLoading} />
					<DialogAlert
						alertInput={alertDialogInput}
						setOpen={(input) => {
							setAlertDialogInput({"show": input})
						}}
					/>

          {/* <Grid
						// container
						style={{ margin: '0  auto' }}
						justify='center'>
							<Grid item 
							// md={8}
							> */}
							<Row>
								<div style={{height:"800px", width:"1000px"}}>
                {nodeData.length !== 0 && <SuperSearchSVG nodeData={nodeData} setSelectedNode={setSelectedNode}></SuperSearchSVG>}
				</div>
			  {/* </Grid> */}
						  {/* <Grid item 
						//   md={8}
						  > */}
				<div style={{height:"600px", width:"1200px"}}>

				<SuperSearchControl data={initData.filter((value) => value.id === selectedNode)[0] ? initData.filter((value) => value.id === selectedNode)[0] : []} 
					selectedNode={selectedNode} setSelectedNode={setSelectedNode}
					></SuperSearchControl>
				</div>

				</Row>
			  {/* </Grid>
					</Grid> */}
        </div>
        {/* </Container> */}
      </div>
        </>
	);
};

export default SuperSearch;
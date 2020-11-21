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
import { getGlycanSearch, getGlycanSimpleSearch,  getGlycanList, getGlycanInit} from '../data/glycan';
import FeedbackWidget from "../components/FeedbackWidget";
import { load } from 'data-loader';
import global_var from '../data/json/superSearchSVGData';
import {select, selectAll, forceSimulation, forceManyBody, forceLink } from 'd3';
import SuperSearchSVG from '../components/search/SuperSearchSVG';
import SuperSearchControl from '../components/search/SuperSearchControl';

/**
 * Glycan search component for showing glycan search tabs.
 */
const SuperSearch = (props) => {

  const [nodeData, setNodeData] = useState([]);
  const [svgData, setSVGData] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");


  const [pageLoading, setPageLoading] = useState(true);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);

  useEffect(() => {
    console.log("SuperSearch");
    setNodeData([1,2]);
    setPageLoading(false);
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
        <div style={{height:"600px", width:"1200px"}}>

					<PageLoader pageLoading={pageLoading} />
					<DialogAlert
						alertInput={alertDialogInput}
						setOpen={(input) => {
							setAlertDialogInput({"show": input})
						}}
					/>

          <Grid
						container
						style={{ margin: '0  auto' }}
						justify='center'>
							<Grid item md={8}>
                <SuperSearchSVG nodeData={nodeData} setSelectedNode={setSelectedNode}></SuperSearchSVG>
              </Grid>
						  <Grid item md={4}>
                <SuperSearchControl selectedNode={selectedNode}></SuperSearchControl>
              </Grid>
					</Grid>
        </div>
        {/* </Container> */}
      </div>
        </>
	);
};

export default SuperSearch;
import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import PageLoader from '../components/load/PageLoader';
import GlobalSearchCard from '../components/cards/GlobalSearchCard';
import GlobalSearchDualCard from '../components/cards/GlobalSearchDualCard';
import DialogAlert from '../components/alert/DialogAlert';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../css/Search.css';
import routeConstants from '../data/json/routeConstants';
import {logActivity} from '../data/logging';
import {axiosError} from '../data/axiosError';
import FeedbackWidget from "../components/FeedbackWidget";
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Navbar} from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { getGlobalSearch} from '../data/commonApi';


const GlobalSearchResult = (props) => {
	let { id } = useParams("");

	const [pageLoading, setPageLoading] = useState(true);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);
	const [globalSearchData, setGlobalSearchData] = useState({});

	function onGlobalSearchClick(route, listId){
		let message = "Global Search term=" + id;
		logActivity("user", (id || "") + ">" + listId, message);
		props.history.push(route + listId);
	}

    useEffect(() => {
		setPageLoading(true);
		logActivity();
		getGlobalSearch(id).then(({ data }) => {
		logActivity("user", (id || ""), "Global search term=" + id);
		setGlobalSearchData(data);
		setPageLoading(false);
	})
	.catch(function (error) {
		let message = "global search api call term=" + id;
		axiosError(error, id, message, setPageLoading, setAlertDialogInput);
	});
}, [id]);
    
	return (
		<>
			<Helmet>
				{getTitle('globalSearchResult')}
				{getMeta('globalSearchResult')}
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

                    <Paper className={"gs-result-paper"}>
                        <div className="gs-panel-heading gs-panel">
                            <h2><strong>Search result for <span style={{ color: "#2F78B7" }}>{id}</span></strong></h2>
                        </div>

						<Typography className={"gs-exact-match"} variant="h6"> 	
							{globalSearchData.exact_match && globalSearchData.exact_match.map((searchMatch) => 
									<li key={searchMatch.id} align="center">
										<span>A {searchMatch.type} exactly matching </span>
										<Navbar.Text
											as={Link}
											className={"gs-exact-match-link"}
											to={searchMatch.type === "glycan" ? routeConstants.glycanDetail + searchMatch.id : routeConstants.proteinDetail + searchMatch.id}
											>
										{id}
										</Navbar.Text>
										<span> was found.</span>
									</li>
								)}
						</Typography>
					<Grid
						container
						style={{ margin: '0  auto' }}
						justify='center'>
							<Grid item md={4}>
								{globalSearchData.other_matches && <GlobalSearchCard
									cardTitle="Glycan(s)"
									setInputValue={(listId) => onGlobalSearchClick(routeConstants.glycanList, listId)}
									term={id}
									allCount={globalSearchData.other_matches.glycan.all.count}
									allListId={globalSearchData.other_matches.glycan.all.list_id}
									colHeading1={"Database"}
									colHeading2={"Glycan"}
									searchItems={Object.keys(globalSearchData.other_matches.glycan)
										.map((searchItem)  => {return {name: searchItem, count: globalSearchData.other_matches.glycan[searchItem].count, list_id : globalSearchData.other_matches.glycan[searchItem].list_id}})}
								/>}
							</Grid>
							<Grid item md={6}>
								{globalSearchData.other_matches && <GlobalSearchDualCard
									cardTitle1="Protein(s)"
									cardTitle2="Glycoprotein(s)"
									setInputValue={(listId) => onGlobalSearchClick(routeConstants.proteinList, listId)}
									term={id}
									allCount1={globalSearchData.other_matches.protein.all.count}
									allListId1={globalSearchData.other_matches.protein.all.list_id}
									allCount2={globalSearchData.other_matches.glycoprotein.all.count}
									allListId2={globalSearchData.other_matches.glycoprotein.all.list_id}
									colHeading1={"Database"}
									colHeading2={"Protein"}
									colHeading3={"Glycoprotein"}
									searchItems={Object.keys(globalSearchData.other_matches.protein)
										.map((searchItem)  => {return {name: searchItem, count1: globalSearchData.other_matches.protein[searchItem].count, list_id1 : globalSearchData.other_matches.protein[searchItem].list_id,
																count2: globalSearchData.other_matches.glycoprotein[searchItem].count, list_id2 : globalSearchData.other_matches.glycoprotein[searchItem].list_id}})}
								/>}
							</Grid>
						</Grid>
                    </Paper>
                </Container>
            </div>
		</>
	);
};

export default GlobalSearchResult;
import React, { useEffect, useReducer, useState } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import Container from "@material-ui/core/Container";
import VerticalHeading from "../components/headings/VerticalHeading";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Sidebar from "../components/navigation/Sidebar";
import PageLoader from '../components/load/PageLoader';
import DialogAlert from '../components/alert/DialogAlert';
import { logActivity } from "../data/logging";
import { getGlycanInit } from '../data/glycan';
import { getGlycanToBiosynthesisEnzymes,  getGlycanToGlycoproteins, getGlycanToEnzymeGeneLoci } from '../data/usecases';
import {axiosError} from '../data/axiosError';
import stringConstants from "../data/json/stringConstants";
import routeConstants from "../data/json/routeConstants";
import SearchByGlycan from "../components/quickSearch/SearchByGlycan";
import SearchByProtein from "../components/quickSearch/SearchByProtein";
import SearchBySpecies from "../components/quickSearch/SearchBySpecies";
import SearchByDisease from "../components/quickSearch/SearchByDisease";

const QuickSearch = (props) => {
	let { id } = useParams("");
	let quickSearch = stringConstants.quick_search;

	const vertHeadQuickSearch = {
		h5VerticalText: "Searches",
		h2textTop: "Perform",
		h2textBottom: "A",
		h2textBottomStrongAfter: "Quick Search",
	};

	const items = [
		{ label: "Search By Glycan", id: "glycan" },
		{ label: "Search By Protein", id: "protein" },
		{ label: "Search By Species", id: "species" },
		{ label: "Search By Disease", id: "disease" },
	];

	const [glycanInitData, setGlycanInitData] = useState({});
	const [pageLoading, setPageLoading] = useState(true);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);

	const [alertText, setAlertText] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			question: "",
			input:{show: false, id: ""},
			default:{show: false, id: ""}
		}
	);

	const [searchByGlycanInput, setSearchByGlycanInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			question_1: "",
			question_2: "",
			question_3: "",
		}
	);

	const [searchByProteinInput, setSearchByProteinInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			question_4: "",
			question_5: "",
			question_6: "",
			question_7: "",
		}
	);

	const [searchBySpeciesInput, setSearchBySpeciesInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			question_8: "",
			question_9: "",
			question_10: {organism: "", glycosylation_evidence: ""}
		}
	);

	const [searchByDiseaseInput, setSearchByDiseaseInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			question_11: "",
		}
	);

	const searchQuestion1 = () => {
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_1 = /9606/"+ searchByGlycanInput.question_1;
		getGlycanToBiosynthesisEnzymes(9606, searchByGlycanInput.question_1)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_1.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	}

	const searchQuestion2 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_2 = /0/"+ searchByGlycanInput.question_2;
		getGlycanToGlycoproteins(0, searchByGlycanInput.question_2)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_2.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion3 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_3 = /9606/"+ searchByGlycanInput.question_3;
		getGlycanToEnzymeGeneLoci(9606, searchByGlycanInput.question_3)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_3.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion4 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_3 = /9606/"+ searchByGlycanInput.question_3;
		getGlycanToEnzymeGeneLoci(9606, searchByGlycanInput.question_3)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_3.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion5 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_3 = /9606/"+ searchByGlycanInput.question_3;
		getGlycanToEnzymeGeneLoci(9606, searchByGlycanInput.question_3)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_3.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion6 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_3 = /9606/"+ searchByGlycanInput.question_3;
		getGlycanToEnzymeGeneLoci(9606, searchByGlycanInput.question_3)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_3.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion7 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_3 = /9606/"+ searchByGlycanInput.question_3;
		getGlycanToEnzymeGeneLoci(9606, searchByGlycanInput.question_3)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_3.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion8 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_3 = /9606/"+ searchByGlycanInput.question_3;
		getGlycanToEnzymeGeneLoci(9606, searchByGlycanInput.question_3)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_3.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion9 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_3 = /9606/"+ searchByGlycanInput.question_3;
		getGlycanToEnzymeGeneLoci(9606, searchByGlycanInput.question_3)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_3.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion10 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_3 = /9606/"+ searchByGlycanInput.question_3;
		getGlycanToEnzymeGeneLoci(9606, searchByGlycanInput.question_3)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_3.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion11 = () => {		
		setPageLoading(true);
		logActivity("user", id, "Performing Quick Search");
		let message = "Quick Search Question_3 = /9606/"+ searchByGlycanInput.question_3;
		getGlycanToEnzymeGeneLoci(9606, searchByGlycanInput.question_3)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_3.id, input:{"show": true, "id": stringConstants.errors.quickSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	useEffect(() => {
		setPageLoading(true);
		logActivity();

		document.addEventListener('click', () => {
			setAlertText({question: "", input:{"show": false, "id": ""}})
		});
		
		getGlycanInit().then((response) => {
			setGlycanInitData(response.data);
			setPageLoading(false);
		})
		.catch(function (error) {
			let message = "search_init api call";
			setPageLoading(false);
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	}, []);

	return (
		<>
			<Helmet>
				{getTitle("quickSearch")}
				{getMeta("quickSearch")}
			</Helmet>

			<div id="top-heading"></div>
			<Row className="gg-baseline5">
				<Col sm={12} md={12} lg={12} xl={3} className="sidebar-col">
					<Sidebar items={items} />
				</Col>
				<Col sm={12} md={12} lg={12} xl={9} className="sidebar-page">
					<Container maxWidth="md">
						<VerticalHeading
							post={vertHeadQuickSearch}
							style={{ margin: "0 auto" }}
						/>
					<PageLoader pageLoading={pageLoading} />
					<DialogAlert
						alertInput={alertDialogInput}
						setOpen={(input) => {
							setAlertDialogInput({"show": input})
						}}
					/>
						<SearchByGlycan 
							setSearchByGlycanInput={setSearchByGlycanInput} 
							searchByGlycanInput={searchByGlycanInput} 
							searchQuestion1={searchQuestion1} 
							searchQuestion2={searchQuestion2} 
							searchQuestion3={searchQuestion3} 
							alertText={alertText} 
							id="glycan"
						/>
						<SearchByProtein 
							setSearchByProteinInput={setSearchByProteinInput} 
							searchByProteinInput={searchByProteinInput} 
							alertText={alertText} 
							id="protein" 
						/>
						<SearchBySpecies 
							setSearchBySpeciesInput={setSearchBySpeciesInput} 
							searchBySpeciesInput={searchBySpeciesInput} 
							glycanInitData={glycanInitData} 
							alertText={alertText} 
							id="species" 
						/>
						<SearchByDisease 
							setSearchByDiseaseInput={setSearchByDiseaseInput} 
							searchByDiseaseInput={searchByDiseaseInput} 
							alertText={alertText} 
							id="disease" 
						/>
					</Container>
				</Col>
			</Row>
		</>
	);
};
export default QuickSearch;

import React, { useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ListGroup from "react-bootstrap/ListGroup";
import glycanSearchData from '../../data/json/glycanSearch';
import stringConstants from '../../data/json/stringConstants';
import PageLoader from '../load/PageLoader';
import DialogAlert from '../alert/DialogAlert';
import TextAlert from "../alert/TextAlert";
import routeConstants from "../../data/json/routeConstants";
import {axiosError} from '../../data/axiosError';
import { logActivity } from "../../data/logging";
import { getGlycanSearch } from '../../data/glycan';
import { getGlycanToBiosynthesisEnzymes,  getGlycanToGlycoproteins } from '../../data/usecases';
import { useHistory } from "react-router-dom";
// import { Container } from 'react-bootstrap';
// import Container from "@material-ui/core/Container";
// import questions from "../../data/json/questions.json";

const useStyles = makeStyles((theme) => ({
	cardAction: {
		display: "inline-flex",
	},
	card: {
		// display: 'flex'
		// maxWidth: 345
	},
	cardTitle: {
		textAlign: "center",
		paddingBottom: "8px",
	},
	cardDetails: {
		flex: 1,
	},
	selected: {
		color: "#2F78B7",
	},
}));

export default function TryMeCard(props) {
	let glycanData = stringConstants.glycan;
	let commonGlycanData = glycanData.common;
	let quickSearch = stringConstants.quick_search;

	const classes = useStyles();
	const history = useHistory();

	const [pageLoading, setPageLoading] = useState(false);
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

	const searchQuestion1 = () => {
		setPageLoading(true);
		logActivity("user", "", "Performing Try Me Search");
		let message = "Try Me Search Question_1 = /9606/G55220VL";
		getGlycanToBiosynthesisEnzymes(9606, "G55220VL").then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", response.data['list_id'], message);
				history.push(routeConstants.proteinList + response.data['list_id'] + "/" + quickSearch.question_tryMe1.tryMeId);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_tryMe1.tryMeId, input:{"show": true, "id": stringConstants.errors.tryMeSerarchError.id}})
			}			
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	}

	const searchQuestion2 = () => {		
		setPageLoading(true);
		logActivity("user", "", "Performing Try Me Search");
		let message = "Try Me Search Question_2 = /0/G77252PU";
		getGlycanToGlycoproteins(0, "G77252PU").then((response) => {
			if (response.data['list_id'] !== '') {
				setPageLoading(false);
				logActivity("user", response.data['list_id'], message);
				history.push(routeConstants.proteinList + response.data['list_id'] + "/" + quickSearch.question_tryMe2.tryMeId);
			} else {
				setPageLoading(false);
				logActivity("user", "", "No results. " + message);
				setAlertText({question: quickSearch.question_tryMe2.tryMeId, input:{"show": true, "id": stringConstants.errors.tryMeSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	const searchQuestion3 = () => {
		setPageLoading(true);
		var formObject = {
			[commonGlycanData.operation.id]: 'AND',
			[glycanData.advanced_search.query_type.id]: glycanData.advanced_search.query_type.name,
			[commonGlycanData.enzyme.id]: { "type": "gene", "id": "Mgat1" },
			[commonGlycanData.organism.id]: {"organism_list":[{"id": 10090,"name": "Mus musculus"}],"operation":"and"}  ,
		};
		logActivity("user", "", "Performing Try Me Search");
		let message = "Try Me Search Question_3 = " + JSON.stringify(formObject);
		getGlycanSearch(formObject).then((response) => {
			if (response.data['list_id'] !== '') {
				logActivity("user", response.data['list_id'], message);
				history.push(routeConstants.glycanList + response.data['list_id'] + "/" + quickSearch.question_tryMe3.tryMeId);
				setPageLoading(false);
			} else {
				logActivity("user", "", "No results. " + message);
				setPageLoading(false);
				setAlertText({question: quickSearch.question_tryMe3.tryMeId, input:{"show": true, "id": stringConstants.errors.tryMeSerarchError.id}})
			}
		})
		.catch(function (error) {
			axiosError(error, "", message, setPageLoading, setAlertDialogInput);
		});
	};

	useEffect(() => {
		document.addEventListener('click', () => {
			setAlertText({question: "", input:{"show": false, "id": ""}})
		});
	}, []);

	return (
		<div id={props.id}>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<PageLoader pageLoading={pageLoading} />
				<DialogAlert
					alertInput={alertDialogInput}
					setOpen={(input) => {
						setAlertDialogInput({"show": input})
					}}
				/>
				<Card className="card">
					<div className={classes.cardDetails}>
						<CardContent>
							<h4 className={classes.cardTitle}>Try Me</h4>
							<ListGroup as="p">
								<ListGroup.Item action onClick={searchQuestion1}>
									What are the enzymes involved in the biosynthesis of{" "}
									<span className={classes.selected}> Man5-(G55220VL) </span> in
									human?
									<div style={{paddingBottom: "10px"}}></div>
									<TextAlert alertInput={alertText.question === quickSearch.question_tryMe1.tryMeId ? alertText.input : alertText.default} />
								</ListGroup.Item>
								<ListGroup.Item action onClick={searchQuestion2}>
									Which proteins have been shown to bear{" "}
									<span className={classes.selected}>
										{" "}
										a bi-antennary fully sialylated N-Glycan-(G77252PU){" "}
									</span>{" "}
									and which site is this glycan attached to?
									<div style={{paddingBottom: "10px"}}></div>
									<TextAlert alertInput={alertText.question === quickSearch.question_tryMe2.tryMeId ? alertText.input : alertText.default} />
								</ListGroup.Item>
								<ListGroup.Item action onClick={searchQuestion3}>
									Which glycans might have been synthesized in mouse using{" "}
									<span className={classes.selected}> Mgat1 </span>?
									<div style={{paddingBottom: "10px"}}></div>
									<TextAlert alertInput={alertText.question === quickSearch.question_tryMe3.tryMeId ? alertText.input : alertText.default} />
								</ListGroup.Item>
							</ListGroup>
						</CardContent>
					</div>
				</Card>
			</Grid>
		</div>
	);
}

TryMeCard.propTypes = {
	post: PropTypes.object,
};

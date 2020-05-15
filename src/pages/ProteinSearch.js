import React, { useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import PageLoader from '../components/load/PageLoader';
import TextAlert from '../components/alert/TextAlert';
import DialogAlert from '../components/alert/DialogAlert';
import SimpleSearchControl from '../components/search/SimpleSearchControl';
import { Tab, Tabs, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../css/Search.css';
import proteinSearchData from '../data/json/proteinSearch';
import stringConstants from '../data/json/stringConstants';
import routeConstants from '../data/json/routeConstants';
import {logActivity} from '../data/logging';
import {axiosError} from '../data/axiosError';
import { getProteinSearch, getProteinSimpleSearch,  getProteinList, getProteinInit} from '../data/protein';
import FeedbackWidget from "../components/FeedbackWidget";


const ProteinSearch = (props) => {
	let { id } = useParams("");
	const [initData, setInitData] = useState({
	});

	const [proSimpleSearchCategory, setProSimpleSearchCategory] = useState('any');
	const [proSimpleSearchTerm, setProSimpleSearchTerm] = useState('');
	const [proAdvSearchData, setProAdvSearchData] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
		}
	);
	const [proActTabKey, setProActTabKey] = useState('simple_search');
	const [pageLoading, setPageLoading] = useState(true);
	const [alertTextInput, setAlertTextInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);

	let simpleSearch = proteinSearchData.simple_search;
	let advancedSearch = proteinSearchData.advanced_search;
	let proteinData = stringConstants.protein;
	let commonProteinData = proteinData.common;

	useEffect(() => {
		setPageLoading(true);
		logActivity();
		document.addEventListener('click', () => {
			if (alertTextInput.show)
				setAlertTextInput({"show": false})
		});
		getProteinInit().then((response) => {
			let initData = response.data;
			setProAdvSearchData({

			});

			setInitData(initData);
			setProActTabKey("simple_search");
			if (id === undefined) setPageLoading(false);

			id &&
				getProteinList(id, 1).then(({ data }) => {
					logActivity("user", id, "Search modification initiated");
					if (data.query.query_type === proteinData.simple_search.query_type.name) {
						setProSimpleSearchCategory(
							data.query.term_category ? data.query.term_category : 'any'
						);
						setProSimpleSearchTerm(data.query.term ? data.query.term : '');
						setProActTabKey("simple_search");
						setPageLoading(false);
					} else {
						setProAdvSearchData({
							
						});

						setProActTabKey("advanced_search");
						setPageLoading(false);
					}
				})
				.catch(function (error) {
					let message = "list api call";
					axiosError(error, message, setPageLoading, setAlertDialogInput);
				});
		})
		.catch(function (error) {
			let message = "search_init api call";
			axiosError(error, message, setPageLoading, setAlertDialogInput);
		});
	}, [id, proteinData, alertTextInput]);

	const proteinSimpleSearch = () => {
		var formjsonSimple = {
			[commonProteinData.operation.id]: 'AND',
			[proteinData.simple_search.query_type.id]: proteinData.simple_search.query_type.name,
			[commonProteinData.term.id]: proSimpleSearchTerm,
			[commonProteinData.term_category.id]: proSimpleSearchCategory,
		};
		logActivity("user", id, "Performing Simple Search");
		let message = "Simple Search query=" + JSON.stringify(formjsonSimple);
		getProteinSimpleSearch(formjsonSimple)
		.then((response) => {
			if (response.data['list_id'] !== '') {
				logActivity("user", (id || "") + ">" + response.data['list_id'], message);
				props.history.push(routeConstants.proteinList + response.data['list_id']);
				setPageLoading(false);
			} else {
				logActivity("user", "", "No results. " + message);
				setPageLoading(false);
				setAlertTextInput({"show": true, "id": stringConstants.errors.simpleSerarchError.id})
				window.scrollTo(0, 0);
			}
		})
		.catch(function (error) {
			axiosError(error, message, setPageLoading, setAlertDialogInput);
		});
	};

	const proteinAdvSearch = () => {
		let formObject;
		logActivity("user", id, "Performing Advanced Search");
		let message = "Advanced Search query=" + JSON.stringify(formObject);
		getProteinSearch(formObject)
			.then((response) => {
				if (response.data['list_id'] !== '') {
					logActivity("user", (id || "") + ">" + response.data['list_id'], message);
					props.history.push(routeConstants.proteinList + response.data['list_id']);
					setPageLoading(false);
				} else {
					logActivity("user", "", "No results. " + message);
					setPageLoading(false);
					setAlertTextInput({"show": true, "id": stringConstants.errors.advSerarchError.id})
					window.scrollTo(0, 0);
				}
			})
			.catch(function (error) {
				axiosError(error, message, setPageLoading, setAlertDialogInput);
			});
	};

	const searchProteinAdvClick = () => {
		setPageLoading(true);
		proteinAdvSearch();
	};

	const searchProteinSimpleClick = () => {
		setPageLoading(true);
		proteinSimpleSearch();
	};

	return (
		<>
			<Helmet>
				{getTitle('proteinSearch')}
				{getMeta('proteinSearch')}
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
					<div className='content-box-md'>
						<h1 className='page-heading'>{proteinSearchData.pageTitle}</h1>
					</div>
					<Tabs
						defaultActiveKey='advanced_search'
						transition={false}
						activeKey={proActTabKey}
						mountOnEnter={true}
						unmountOnExit={true}
						onSelect={(key) => setProActTabKey(key)}>
						<Tab
							eventKey='simple_search'
							className='tab-content-padding'
							title={simpleSearch.tabTitle}>
							<TextAlert
								alertInput={alertTextInput}
							/>
							<div style={{paddingBottom: "20px"}}></div>
							<Container className='tab-content-border'>
								{initData.simple_search_category && (
									<SimpleSearchControl
										simpleSearchCategory={proSimpleSearchCategory}
										simpleSearchCategoryLabel={commonProteinData.term_category.name}
										simpleSearchTerm={proSimpleSearchTerm}
										simple_search_category={initData.simple_search_category}
										simple_search={simpleSearch.categories}
										searchSimpleClick={searchProteinSimpleClick}
										setSimpleSearchCategory={setProSimpleSearchCategory}
										setSimpleSearchTerm={setProSimpleSearchTerm}
										length={simpleSearch.length}
										errorText={simpleSearch.errorText}
									/>
								)}
							</Container>
						</Tab>
						<Tab
							eventKey='advanced_search'
							className='tab-content-padding'
							title={advancedSearch.tabTitle}>
							<TextAlert
								alertInput={alertTextInput}
							/>
							<Container className='tab-content-border'>
								{/* {initData && (
									<GlycanAdvancedSearch
										searchGlycanAdvClick={searchGlycanAdvClick}
										inputValue={glyAdvSearchData}
										initData={initData}
										setGlyAdvSearchData={setGlyAdvSearchData}
									/>
								)} */}
							</Container>
						</Tab>
						<Tab
							eventKey='tutorial'
							title={proteinSearchData.tutorial.tabTitle}
							className='tab-content-padding'>
							<Container className='tab-content-border'>
								{/* <GlycanTutorial /> */}
							</Container>
						</Tab>
					</Tabs>
				</Container>
			</div>
		</>
	);
};

export default ProteinSearch;
import React, { useEffect, useReducer, useState } from 'react';
import { getJson } from '../data/api';
import compositionSearchData from '../data/json/compositionSearch';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import PageLoader from '../components/load/PageLoader';
import SearchAlert from '../components/alert/SearchAlert';
import GlycanAdvancedSearch from '../components/search/GlycanAdvancedSearch';
import CompositionSearchControl from '../components/search/CompositionSearchControl';
import SimpleSearchControl from '../components/search/SimpleSearchControl';
import GlycanTutorial from '../components/tutorial/GlycanTutorial';
import { Tab, Tabs, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import '../css/Search.css';
import glycanSearchData from '../data/json/glycanSearch';

const useStyles = makeStyles((theme) => ({
	// tabs: {
	// 	borderColor: '#FFFFFF',
	// 	width: '650px',
	// },
	// tab: {
	// 	borderRadius: 4,
	// 	borderColor: '#80bdff',
	// 	boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
	// 	width: '1000px',
	// 	height: '1250px',
	// 	alignItems: 'center',
	// 	fontColor: '#2F78B7',
	// 	backgroundColor: '#FFFFFF',
	// },
	// tabCompostionSearch: {
	// 	borderRadius: 4,
	// 	borderColor: '#80bdff',
	// 	boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
	// 	width: '1000px',
	// 	height: '1000px',
	// 	alignItems: 'center',
	// 	fontColor: '#2F78B7',
	// 	backgroundColor: '#FFFFFF',
	// },
	// tabSimpleSearch: {
	// 	borderRadius: 4,
	// 	borderColor: '#80bdff',
	// 	boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
	// 	width: '1000px',
	// 	height: '400px',
	// 	alignItems: 'center',
	// 	fontColor: '#2F78B7',
	// 	backgroundColor: '#FFFFFF',
	// },
	// con: {
	// 	width: '730px',
	// 	height: '1300px',
	// 	alignItems: 'center',
	// },
	// con1: {
	// 	width: '1000px',
	// 	height: '1400px',
	// 	alignItems: 'center',
	// 	marginBottom: '80px',
	// },
	// conSimple: {
	// 	alignItems: 'center',
	// 	paddingTop: '100px',
	// },
}));

const GlycanSearch = (props) => {
	let { id } = useParams();
	const [initData, setInitData] = useState({});
	const classes = useStyles();
	const [glySimpleSearchCategory, setGlySimpleSearchCategory] = useState('any');
	const [glySimpleSearchTerm, setGlySimpleSearchTerm] = useState('');
	const [glyAdvSearchData, setGlyAdvSearchData] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			glycanId: '',
			glyMassType: 'Native',
			glyMass: [149, 6751],
			glyMassInput: [149, 6751],
			glyMassRange: [149, 6751],
			glyNumSugars: [1, 37],
			glyNumSugarsRange: [1, 37],
			glyNumSugarsInput: [1, 37],
			glyOrganisms: [],
			glyOrgOperation: 'or',
			glyType: '',
			glySubType: '',
			glySubTypeIsHidden: true,
			glyProt: '',
			glyMotif: '',
			glyBioEnz: '',
			glyPubId: '',
			glyAdvSearchValError: [false, false, false, false, false],
		}
	);
	const [glyCompData, setGlyCompData] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{}
	);
	const [glyActTabKey, setGlyActTabKey] = useState('advanced_search');
	const [pageLoading, setPageLoading] = useState(true);
	const [glySearchError, setGlySearchError] = useState(false);

	function glyCompChange(glyComp) {
		setGlyCompData(glyComp);
	}

	const getGlycanInit = () => {
		const url = `/glycan/search_init`;
		return getJson(url);
	};

	/**
	 * getSelectionValue returns selection control value based on min, max.
	 * @param {object} min - min value.
	 * @param {object} max - max value.
	 * @param {object} residue_min - residue min value.
	 * @param {object} residue_max - residue max value.
	 **/
	function getSelectionValue(cur_min, cur_max, residue_min, residue_max) {
		var selection = 'maybe';

		if (cur_min === residue_min && cur_max === residue_min) {
			selection = 'no';
		} else if (cur_min === residue_min && cur_max <= residue_max) {
			selection = 'maybe';
		} else if (cur_min > residue_min && cur_max <= residue_max) {
			selection = 'yes';
		}

		return selection;
	}

	useEffect(() => {
		setPageLoading(true);
		document.addEventListener('click', () => {
			setGlySearchError(false);
		});
		getGlycanInit().then((response) => {
			let initData = response.data;

			setGlyAdvSearchData({
				glyMassType: initData.glycan_mass.native.name,
				glyMass: [
					Math.floor(initData.glycan_mass.native.min),
					Math.ceil(initData.glycan_mass.native.max),
				],
				glyMassInput: [
					Math.floor(initData.glycan_mass.native.min),
					Math.ceil(initData.glycan_mass.native.max),
				],
				glyMassRange: [
					Math.floor(initData.glycan_mass.native.min),
					Math.ceil(initData.glycan_mass.native.max),
				],
				glyNumSugars: [
					initData.number_monosaccharides.min,
					initData.number_monosaccharides.max,
				],
				glyNumSugarsRange: [
					initData.number_monosaccharides.min,
					initData.number_monosaccharides.max,
				],
				glyNumSugarsInput: [
					initData.number_monosaccharides.min,
					initData.number_monosaccharides.max,
				],
				glyOrgOperation: 'or',
				glySubTypeIsHidden: true,
				glyAdvSearchValError: [false, false, false, false, false],
			});

			const getGlycanList = (glycanListId, limit = 20, offset = 1) => {
				const url = `/glycan/list?query={"id":"${glycanListId}","offset":${offset},"limit":${limit},"order":"asc"}`;
				return getJson(url);
			};

			let compositionData = initData.composition;
			let compStateData = {};

			for (let x = 0; x < compositionData.length; x++) {
				compositionData[x].orderId =
					compositionSearchData[compositionData[x].residue].order_id;
				compositionData[x].subtext =
					compositionSearchData[compositionData[x].residue].subtext;
				compositionData[x].name =
					compositionSearchData[compositionData[x].residue].name;
				compositionData[x].shortName =
					compositionSearchData[compositionData[x].residue].short_name;
				compStateData[compositionData[x].residue] = {
					min: compositionData[x].min,
					selectValue: getSelectionValue(
						compositionData[x].min,
						compositionData[x].max,
						compositionData[x].min,
						compositionData[x].max
					),
					max: compositionData[x].max,
				};
			}
			initData.glycan_mass.native.min = Math.floor(
				initData.glycan_mass.native.min
			);
			initData.glycan_mass.native.max = Math.ceil(
				initData.glycan_mass.native.max
			);
			initData.glycan_mass.permethylated.min = Math.floor(
				initData.glycan_mass.permethylated.min
			);
			initData.glycan_mass.permethylated.max = Math.ceil(
				initData.glycan_mass.permethylated.max
			);

			initData.composition = compositionData.sort(function (res1, res2) {
				return parseInt(res1.orderId) - parseInt(res2.orderId);
			});
			setGlyCompData(compStateData);
			setInitData(initData);
			if (id === undefined) setPageLoading(false);

			id &&
				getGlycanList(id, 1).then(({ data }) => {
					if (data.query.composition !== undefined) {
						let queryCompData = {};
						for (let x = 0; x < data.query.composition.length; x++) {
							let resVal = initData.composition.filter(function (res) {
								return data.query.composition[x].residue === res.residue;
							})[0];
							queryCompData[data.query.composition[x].residue] = {
								min: data.query.composition[x].min,
								selectValue: getSelectionValue(
									parseInt(data.query.composition[x].min),
									parseInt(data.query.composition[x].max),
									parseInt(resVal.min),
									parseInt(resVal.max)
								),
								max: data.query.composition[x].max,
							};
						}
						setGlyCompData(queryCompData);
						setGlyActTabKey('composition_search');
						setPageLoading(false);
					} else if (data.query.query_type === 'glycan_search_simple') {
						setGlySimpleSearchCategory(
							data.query.term_category ? data.query.term_category : 'any'
						);
						setGlySimpleSearchTerm(data.query.term ? data.query.term : '');
						setGlyActTabKey('simple_search');
						setPageLoading(false);
					} else {
						setGlyAdvSearchData({
							glycanId:
								data.query.glytoucan_ac === undefined
									? ''
									: data.query.glytoucan_ac,
							glyMassType:
								data.query.mass_type === undefined
									? initData.glycan_mass.native.name
									: data.query.mass_type,
							glyMass:
								data.query.mass === undefined
									? data.query.mass_type === undefined ||
									  data.query.mass_type === initData.glycan_mass.native.name
										? [
												Math.floor(initData.glycan_mass.native.min),
												Math.ceil(initData.glycan_mass.native.max),
										  ]
										: [
												Math.floor(initData.glycan_mass.permethylated.min),
												Math.ceil(initData.glycan_mass.permethylated.max),
										  ]
									: [data.query.mass.min, data.query.mass.max],
							glyMassInput:
								data.query.mass === undefined
									? data.query.mass_type === undefined ||
									  data.query.mass_type === initData.glycan_mass.native.name
										? [
												Math.floor(initData.glycan_mass.native.min),
												Math.ceil(initData.glycan_mass.native.max),
										  ]
										: [
												Math.floor(initData.glycan_mass.permethylated.min),
												Math.ceil(initData.glycan_mass.permethylated.max),
										  ]
									: [data.query.mass.min, data.query.mass.max],
							glyMassRange:
								data.query.mass_type === undefined ||
								data.query.mass_type === initData.glycan_mass.native.name
									? [
											Math.floor(initData.glycan_mass.native.min),
											Math.ceil(initData.glycan_mass.native.max),
									  ]
									: [
											Math.floor(initData.glycan_mass.permethylated.min),
											Math.ceil(initData.glycan_mass.permethylated.max),
									  ],
							glyNumSugars:
								data.query.number_monosaccharides === undefined
									? [
											initData.number_monosaccharides.min,
											initData.number_monosaccharides.max,
									  ]
									: [
											data.query.number_monosaccharides.min,
											data.query.number_monosaccharides.max,
									  ],
							glyNumSugarsInput:
								data.query.number_monosaccharides === undefined
									? [
											initData.number_monosaccharides.min,
											initData.number_monosaccharides.max,
									  ]
									: [
											data.query.number_monosaccharides.min,
											data.query.number_monosaccharides.max,
									  ],
							glyOrgOperation:
								data.query.organism === undefined
									? 'or'
									: data.query.organism.operation,
							glyOrganisms:
								data.query.organism === undefined
									? []
									: data.query.organism.organism_list,
							glyType:
								data.query.glycan_type === undefined
									? ''
									: data.query.glycan_type,
							glySubType:
								data.query.glycan_subtype === undefined
									? ''
									: data.query.glycan_subtype,
							glySubTypeIsHidden:
								data.query.glycan_type === undefined ? true : false,
							glyProt:
								data.query.protein_identifier === undefined
									? ''
									: data.query.protein_identifier,
							glyMotif:
								data.query.glycan_motif === undefined
									? ''
									: data.query.glycan_motif,
							glyBioEnz:
								data.query.enzyme === undefined ? '' : data.query.enzyme.id,
							glyPubId: data.query.pmid === undefined ? '' : data.query.pmid,
							glyAdvSearchValError: [false, false, false, false, false],
						});

						setGlyActTabKey('advanced_search');
						setPageLoading(false);
					}
				});
		});
	}, [id]);

	function searchjson(
		input_query_type,
		input_glycan_id,
		input_mass_type,
		input_mass_min,
		input_mass_max,
		input_sugar_min,
		input_sugar_max,
		input_organism,
		input_organism_operation,
		input_glycantype,
		input_glycansubtype,
		input_enzyme,
		input_proteinid,
		input_motif,
		input_pmid,
		input_residue_comp
	) {
		var enzymes = {};
		if (input_enzyme) {
			enzymes = {
				id: input_enzyme,
				type: 'gene',
			};
		}

		var monosaccharides = undefined;
		if (input_sugar_min && input_sugar_max) {
			if (
				input_sugar_min !== initData.number_monosaccharides.min ||
				input_sugar_max !== initData.number_monosaccharides.max
			) {
				monosaccharides = {
					min: parseInt(input_sugar_min),
					max: parseInt(input_sugar_max),
				};
			}
		}

		var input_mass = undefined;
		if (input_mass_min && input_mass_max) {
			if (input_mass_type === 'Native') {
				if (
					input_mass_min !== initData.glycan_mass.native.min ||
					input_mass_max !== initData.glycan_mass.native.max
				) {
					input_mass = {
						min: parseInt(input_mass_min),
						max: parseInt(input_mass_max),
					};
				}
			} else {
				if (
					input_mass_min !== initData.glycan_mass.permethylated.min ||
					input_mass_max !== initData.glycan_mass.permethylated.max
				) {
					input_mass = {
						min: parseInt(input_mass_min),
						max: parseInt(input_mass_max),
					};
				}
			}
		}

		var organisms = undefined;
		if (input_organism && input_organism.length > 0) {
			organisms = {
				organism_list: input_organism,
				operation: input_organism_operation,
			};
		}

		var glycan_id = input_glycan_id;
		if (glycan_id) {
			glycan_id = glycan_id.trim();
			glycan_id = glycan_id.replace(/\u200B/g, '');
			glycan_id = glycan_id.replace(/\u2011/g, '-');
			glycan_id = glycan_id.replace(/\s+/g, ',');
			glycan_id = glycan_id.replace(/,+/g, ',');
			var index = glycan_id.lastIndexOf(',');
			if (index > -1 && index + 1 === glycan_id.length) {
				glycan_id = glycan_id.substr(0, index);
			}
		}

		var formjson = {
			operation: 'AND',
			query_type: input_query_type,
			mass_type: input_mass_type,
			mass: input_mass,
			number_monosaccharides: monosaccharides,
			enzyme: enzymes,
			glytoucan_ac: glycan_id,
			organism: organisms,
			glycan_type: input_glycantype,
			glycan_subtype: input_glycansubtype,
			protein_identifier: input_proteinid,
			glycan_motif: input_motif,
			pmid: input_pmid,
			composition: input_residue_comp,
		};
		return formjson;
	}

	const glycanSimpleSearch = () => {
		var formjsonSimple = {
			operation: 'AND',
			query_type: 'glycan_search_simple',
			term: glySimpleSearchTerm,
			term_category: glySimpleSearchCategory,
		};

		var json = 'query=' + JSON.stringify(formjsonSimple);
		const url = '/glycan/search_simple?' + json;
		return getJson(url);
	};

	const glycanSearch = () => {
		let formObject = searchjson(
			'search_glycan',
			glyAdvSearchData.glycanId,
			glyAdvSearchData.glyMassType,
			glyAdvSearchData.glyMass[0],
			glyAdvSearchData.glyMass[1],
			glyAdvSearchData.glyNumSugars[0],
			glyAdvSearchData.glyNumSugars[1],
			glyAdvSearchData.glyOrganisms,
			glyAdvSearchData.glyOrgOperation,
			glyAdvSearchData.glyType,
			glyAdvSearchData.glySubType,
			glyAdvSearchData.glyBioEnz,
			glyAdvSearchData.glyProt,
			glyAdvSearchData.glyMotif,
			glyAdvSearchData.glyPubId,
			undefined
		);

		var json = 'query=' + JSON.stringify(formObject);
		const url = '/glycan/search?' + json;
		return getJson(url);
	};

	const glycanCompSearch = () => {
		let compSearchData = [];

		var count = 0;
		for (let residue in glyCompData) {
			compSearchData[count] = {
				residue: residue,
				min: glyCompData[residue].min,
				max: glyCompData[residue].max,
			};
			count++;
		}

		let formObject = searchjson(
			'search_glycan',
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			compSearchData
		);

		var json = 'query=' + JSON.stringify(formObject);
		const url = '/glycan/search?' + json;
		return getJson(url);
	};

	const searchGlycanAdvClick = () => {
		setPageLoading(true);

		glycanSearch()
			.then((response) => {
				if (response.data['list_id'] !== '') {
					props.history.push('/glycan-list/' + response.data['list_id']);
					setPageLoading(false);
				} else {
					setPageLoading(false);
					setGlySearchError(true);
					window.scrollTo(0, 0);
				}
			})
			.catch(function (error) {
				console.log(error);
				setPageLoading(false);
				setGlySearchError(true);
				window.scrollTo(0, 0);
			});
	};

	const searchGlycanCompClick = () => {
		setPageLoading(true);
		glycanCompSearch()
			.then((response) => {
				if (response.data['list_id'] !== '') {
					props.history.push('/glycan-list/' + response.data['list_id']);
					setPageLoading(false);
				} else {
					setPageLoading(false);
					setGlySearchError(true);
					window.scrollTo(0, 0);
				}
			})
			.catch(function (error) {
				console.log(error);
				setPageLoading(false);
				setGlySearchError(true);
				window.scrollTo(0, 0);
			});
	};

	const searchGlycanSimpleClick = () => {
		setPageLoading(true);
		glycanSimpleSearch()
			.then((response) => {
				if (response.data['list_id'] !== '') {
					props.history.push('/glycan-list/' + response.data['list_id']);
					setPageLoading(false);
				} else {
					setPageLoading(false);
					setGlySearchError(true);
					window.scrollTo(0, 0);
				}
			})
			.catch(function (error) {
				console.log(error);
				setPageLoading(false);
				setGlySearchError(true);
				window.scrollTo(0, 0);
			});
	};

	return (
		<>
			<Helmet>
				{getTitle('glycanSearch')}
				{getMeta('glycanSearch')}
			</Helmet>
			<div className='lander'>
				<Container className={classes.con1}>
					<PageLoader pageLoading={pageLoading} />
					<div className='content-box-md'>
						<h1 className='page-heading'>Glycan Search</h1>
					</div>
					<Tabs
						defaultActiveKey='advanced_search'
						transition={false}
						// className={classes.tabs}
						activeKey={glyActTabKey}
						mountOnEnter={true}
						unmountOnExit={true}
						onSelect={(key) => setGlyActTabKey(key)}>
						<Tab
							eventKey='simple_search'
							className='tab-content-padding'
							// className={classes.tabSimpleSearch}
							title='Simple Search'>
							<SearchAlert
								searchError={glySearchError}
								alertTitle='Simple Search Error - No Results Found'
								alertText="Sorry, we couldn't find any data matching your input. Please change your search term and try again."
							/>
							{/* <Container className={classes.conSimple}> */}
							<Container className='tab-content-border'>
								{initData.simple_search_category && (
									<SimpleSearchControl
										simpleSearchCategory={glySimpleSearchCategory}
										simpleSearchTerm={glySimpleSearchTerm}
										simple_search_category={initData.simple_search_category}
										simple_search={glycanSearchData.simple_search.categories}
										searchSimpleClick={searchGlycanSimpleClick}
										setSimpleSearchCategory={setGlySimpleSearchCategory}
										setSimpleSearchTerm={setGlySimpleSearchTerm}
										length={glycanSearchData.simple_search.length}
										errorText={glycanSearchData.simple_search.errorText}
									/>
								)}
							</Container>
						</Tab>
						<Tab
							eventKey='advanced_search'
							// className={classes.tab}
							className='tab-content-padding'
							title='Advanced Search'>
							<SearchAlert
								searchError={glySearchError}
								alertTitle='Advanced Search Error - No Results Found'
								alertText="Sorry, we couldn't find any data matching your input. Please change your search term and try again."
							/>
							{/* <Container className={classes.con}> */}
							<Container className='tab-content-border'>
								{initData && (
									<GlycanAdvancedSearch
										searchGlycanAdvClick={searchGlycanAdvClick}
										inputValue={glyAdvSearchData}
										initData={initData}
										setGlyAdvSearchData={setGlyAdvSearchData}
									/>
								)}
							</Container>
						</Tab>
						<Tab
							eventKey='composition_search'
							title='Composition Search'
							// className={classes.tabCompostionSearch}
							className='tab-content-padding'>
							<SearchAlert
								searchError={glySearchError}
								alertTitle='Composition Search Error - No Results Found'
								alertText="Sorry, we couldn't find any data matching your input. Please change your search term and try again."
							/>
							{/* <Container className='p-5'> */}
							{/* <Container> */}
							<Container className='tab-content-border'>
								{initData.composition && (
									<CompositionSearchControl
										compositionInitMap={initData.composition}
										inputValue={glyCompData}
										setInputValue={glyCompChange}
										searchGlycanCompClick={searchGlycanCompClick}
										getSelectionValue={getSelectionValue}
										step={1}
									/>
								)}
							</Container>
						</Tab>
						<Tab
							eventKey='tutorial'
							title='Tutorial'
							className='tab-content-padding'>
							<Container className='tab-content-border'>
								<GlycanTutorial />
							</Container>
						</Tab>
					</Tabs>
				</Container>
			</div>
		</>
	);
};

export default GlycanSearch;

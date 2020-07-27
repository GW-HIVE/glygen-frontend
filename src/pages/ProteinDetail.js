/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from "react";
import { getProteinDetail } from "../data/protein";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { Grid } from "@material-ui/core";
import { Navbar, Col, Row } from "react-bootstrap";
import { FiBookOpen } from "react-icons/fi";
import { groupEvidences, groupSpeciesEvidences } from "../data/data-format";
import EvidenceList from "../components/EvidenceList";
import ClientPaginatedTable from "../components/ClientPaginatedTable";
import "../css/detail.css";
import "../css/Responsive.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import DownloadButton from "../components/DownloadButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import PublicationsMenu from '../components/PublicationsMenu';
import DetailTooltips from "../data/json/detailTooltips.json";
import HelpTooltip from "../components/tooltip/HelpTooltip";
import FeedbackWidget from "../components/FeedbackWidget";
import { Tab, Tabs, Container } from "react-bootstrap";
// import ReactCopyClipboard from'../components/ReactCopyClipboard';
import routeConstants from "../data/json/routeConstants";
import FunctionList from "../components/FunctionList";
// import GoannotationList from "../components/Goannotationlist";
import ProteinSequenceDisplay from "../components/ProteinSequenceDisplay";
import SequenceDisplay from "../components/SequenceDisplay";
import stringConstants from "../data/json/stringConstants";
import { getGlycanImageUrl } from "../data/glycan";
import Button from "react-bootstrap/Button";
import AlignmentDropdown from "../components/AlignmentDropdown";
import ProtvistaNav from "../components/navigation/ProtvistaNav";
import { FaSearchPlus } from "react-icons/fa";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import { axiosError } from "../data/axiosError";
import { Link } from "react-router-dom";

const proteinStrings = stringConstants.protein.common;

const items = [
	{ label: "General", id: "general" },
	{ label: "Species", id: "species" },
	{ label: "Function", id: "function" },
	{ label: "Go Annotation", id: "go_annotation" },
	{ label: "Glycosylation", id: "glycosylation" },
	{ label: "Sequence", id: "sequence" },
	{ label: "Pathway", id: "pathway" },
	{ label: "Isoforms", id: "isoforms" },
	{ label: "Homologs", id: "homologs" },
	{ label: "Disease", id: "disease" },
	{ label: "Mutation", id: "mutation" },
	{ label: "Expression Tissue", id: "expressionT" },
	{ label: "Expression Disease", id: "expressionD" },
	{ label: "Cross References", id: "crossRef" },
	{ label: "Publications", id: "publication" },
];

function addCommas(nStr) {
	nStr += "";
	var x = nStr.split(".");
	var x1 = x[0];
	var x2 = x.length > 1 ? "." + x[1] : "";
	var rgx = /(\d+)(\d{3})/;

	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, "$1" + "," + "$2");
	}
	return x1 + x2;
}

/**
 * This function opens the Sequence page.
 */
function openProtvistaPage(uniprot_canonical_ac) {
	var str = uniprot_canonical_ac;
	//    str = str.substring(0, str.length - 2);
	str = str.substring(0, str.indexOf("-"));
	var url = "https://www.uniprot.org/uniprot/" + str + "/protvista";
	window.open(url);
}

const getItemsPathway = (data) => {
	let itemspathway = [];

	//check data.
	if (data.pathway) {
		for (let pathwayitem of data.pathway) {
			let found = "";
			for (let resourceitem of itemspathway) {
				if (resourceitem.resource === pathwayitem.resource) {
					found = true;
					resourceitem.links.push({
						url: pathwayitem.url,
						id: pathwayitem.id,
						name: pathwayitem.name,
					});
				}
			}
			if (!found) {
				itemspathway.push({
					resource: pathwayitem.resource,
					links: [
						{
							url: pathwayitem.url,
							id: pathwayitem.id,
							name: pathwayitem.name,
						},
					],
				});
			}
		}
	}
	return itemspathway;
};

const getItemsCrossRef = (data) => {
	let itemscrossRef = [];

	//check data.
	if (data.crossref) {
		for (let crossrefitem of data.crossref) {
			let found = "";
			for (let databaseitem of itemscrossRef) {
				if (databaseitem.database === crossrefitem.database) {
					found = true;
					databaseitem.links.push({
						url: crossrefitem.url,
						id: crossrefitem.id,
					});
				}
			}
			if (!found) {
				itemscrossRef.push({
					database: crossrefitem.database,
					links: [
						{
							url: crossrefitem.url,
							id: crossrefitem.id,
						},
					],
				});
			}
		}
	}
	return itemscrossRef;
};

const ProteinDetail = (props) => {
	let { id } = useParams();

	const [detailData, setDetailData] = useState({});
	const [itemsCrossRef, setItemsCrossRef] = useState([]);
	const [itemsPathway, setItemsPathway] = useState([]);
	const [showIsoformSequences, setShowIsoformSequences] = useState(false);
	const [showhomologSequences, setShowhomologSequences] = useState(false);
	const [glycosylationTabSelected, setGlycosylationTabSelected] = useState(
		"with_glycanId"
	);
	const [glycosylationWithImage, setGlycosylationWithImage] = useState([]);
	const [glycosylationWithoutImage, setGlycosylationWithoutImage] = useState(
		[]
	);
	const [pageLoading, setPageLoading] = useState(true);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{ show: false, id: "" }
	);

	useEffect(() => {
		setPageLoading(true);
		logActivity("user", id);
		const getProteinDetailData = getProteinDetail(id);

		getProteinDetailData.then(({ data }) => {
			if (data.code) {
				let message = "Detail api call";
				logActivity("user", id, "No results. " + message);
				setPageLoading(false);
			} else {
				setItemsCrossRef(getItemsCrossRef(data));
				setItemsPathway(getItemsPathway(data));
				setDetailData(data);
				setPageLoading(false);
			}

			const anchorElement = props.history.location.hash;
			if (anchorElement && document.getElementById(anchorElement.substr(1))) {
				document
					.getElementById(anchorElement.substr(1))
					.scrollIntoView({ behavior: "auto" });
			}
		});

		getProteinDetailData.catch(({ response }) => {
			let message = "list api call";
			axiosError(response, id, message, setPageLoading, setAlertDialogInput);
		});
	}, []);

	useEffect(() => {
		if (detailData.glycosylation) {
			const withImage = detailData.glycosylation.filter(
				(item) => item.glytoucan_ac
			);
			const withoutImage = detailData.glycosylation.filter(
				(item) => !item.glytoucan_ac
			);
			setGlycosylationWithImage(withImage);
			setGlycosylationWithoutImage(withoutImage);

			setGlycosylationTabSelected(
				withImage.length > 0 ? "with_glycanId" : "without_glycanId"
			);
		}
	}, [detailData]);

	useEffect(() => {
		// Need to call it second time due to glycosylationWithImage and glycosylationWithoutImage table loading time.
		setTimeout(() => {
			const anchorElement = props.history.location.hash;
			if (anchorElement && document.getElementById(anchorElement.substr(1))) {
				document
					.getElementById(anchorElement.substr(1))
					.scrollIntoView({ behavior: "auto" });
			}
		}, 1000);
	}, [
		detailData,
		glycosylationWithImage,
		glycosylationWithoutImage,
		props.history.location.hash,
	]);

	const {
		mass,
		recommendedname,
		uniprot,
		gene,
		species,
		taxid,
		publication,
		isoforms,
		orthologs,
		glycosylation,
		expression_tissue,
		expression_disease,
		mutation,
		refseq,
		disease,
		sequence,
		go_annotation,
		site_annotation,
		function: functions,
	} = detailData;

	const speciesEvidence = groupSpeciesEvidences(species);
	const glycoSylationColumns = [
		{
			dataField: "evidence",
			text: "Sources",

			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
					width: "25%",
				};
			},
			formatter: (cell, row) => {
				return (
					<EvidenceList
						key={row.position + row.glytoucan_ac}
						evidences={groupEvidences(cell)}
					/>
				);
			},
		},
		{
			dataField: "type",
			text: "Type",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
		},

		{
			dataField: "glytoucan_ac",
			text: "GlyTouCan Accession",
			defaultSortField: "glytoucan_ac",
			sort: true,
			headerStyle: (column, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
			formatter: (value, row) => (
				<Link to={routeConstants.glycanDetail + row.glytoucan_ac}></Link>
			),
		},

		{
			dataField: "glytoucan_ac",
			text: "Glycan Image",
			sort: false,
			selected: true,
			formatter: (value, row) => (
				<div className="img-wrapper">
					<img
						className="img-cartoon-list-page img-cartoon"
						src={getGlycanImageUrl(row.glytoucan_ac)}
						alt="Cartoon"
					/>
				</div>
			),
			headerStyle: (colum, colIndex) => {
				return {
					width: "35%",
					textAlign: "left",
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
		},
		{
			dataField: "position",
			text: "Position",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
			formatter: (value, row) => (
				<Link to={`${routeConstants.siteview}${id}/${row.position}`}></Link>
			),
		},
	];
	const mutationColumns = [
		{
			dataField: "evidence",
			text: "Sources",

			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
					width: "20%",
				};
			},
			formatter: (cell, row) => {
				return (
					<EvidenceList
						key={row.disease.doid}
						evidences={groupEvidences(cell)}
					/>
				);
			},
		},
		{
			dataField: "annotation",
			text: "Annotation Name",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
					width: "20%",
				};
			},
		},
		{
			dataField: "disease",
			text: "Disease",
			defaultSortField: "disease",
			sort: true,
			headerStyle: (column, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
					width: "16%",
				};
			},
			formatter: (value, row) => (
				<>
					{value.name}{" "}
					<span className="nowrap">
						(DOID:{" "}
						<Navbar.Text as={NavLink} to={value.url}>
							{value.doid}
						</Navbar.Text>
						)
					</span>
				</>
			),
		},
		{
			dataField: "start_pos",
			text: "Start pos",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
		},
		{
			dataField: "end_pos",
			text: "End pos",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
		},

		{
			dataField: "sequence",
			text: "Sequence",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
			formatter: (value, row) => (
				<>
					{row.sequence_org} → {row.sequence_mut}
				</>
			),
		},

		{
			dataField: "type",
			text: "Type",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
		},
	];
	const expressionTissueColumns = [
		{
			dataField: "evidence",
			text: "Sources",
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
			formatter: (cell, row) => {
				return (
					<EvidenceList
						key={row.tissue.uberon}
						evidences={groupEvidences(cell)}
					/>
				);
			},
		},

		{
			dataField: "tissue",
			text: "Tissue",
			defaultSortField: "tissue",
			sort: true,
			headerStyle: (column, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
			formatter: (value, row) => (
				<>
					{value.name}{" "}
					<span className="nowrap">
						(UBERON:{" "}
						<Navbar.Text as={NavLink} to={value.url}>
							{value.uberon}
						</Navbar.Text>
						)
					</span>
				</>
			),
		},

		{
			dataField: "present",
			text: "Present",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
		},
	];
	const expressionDiseaseColumns = [
		{
			dataField: "evidence",
			text: "Sources",

			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
			formatter: (cell, row) => {
				return (
					<EvidenceList
						key={row.disease.doid}
						evidences={groupEvidences(cell)}
					/>
				);
			},
		},
		{
			dataField: "disease",
			text: "Disease",
			defaultSortField: "disease",
			sort: true,
			headerStyle: (column, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
			formatter: (value, row) => (
				<>
					{value.name}{" "}
					<span className="nowrap">
						(DOID:{" "}
						<Navbar.Text as={NavLink} to={value.url}>
							{value.doid}
						</Navbar.Text>
						)
					</span>
				</>
			),
		},
		{
			dataField: "trend",
			text: "Expression Trend",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
		},
		{
			dataField: "significant",
			text: "Significant",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return {
					backgroundColor: "#4B85B6",
					color: "white",
				};
			},
		},
	];
	// ==================================== //
	/**
	 * Adding toggle collapse arrow icon to card header individualy.
	 * @param {object} uniprot_canonical_ac- uniprot accession ID.
	 **/
	const [collapsed, setCollapsed] = useReducer(
		(state, newState) => ({
			...state,
			...newState,
		}),
		{
			general: true,
			species: true,
			function: true,
			go_annotation: true,
			glycosylation: true,
			seqence: true,
			pathway: true,
			isoforms: true,
			homomlogs: true,
			disease: true,
			mutation: true,
			expressionT: true,
			expressionD: true,
			crossref: true,
			publication: true,
		}
	);

	function toggleCollapse(name, value) {
		setCollapsed({ [name]: !value });
	}
	const expandIcon = <ExpandMoreIcon fontSize="large" />;
	const closeIcon = <ExpandLessIcon fontSize="large" />;
	// ===================================== //

	/**
	 * Redirect and opens uniprot_canonical_ac in a GO Term List Page
	 * @param {object} uniprot_canonical_ac- uniprot accession ID.
	 **/
	function handleOpenGOTermListPage(uniprot_canonical_ac) {
		var url =
			"https://www.ebi.ac.uk/QuickGO/annotations?geneProductId=" +
			uniprot_canonical_ac;
		window.open(url);
	}

	return (
		<>
			<Row className="gg-baseline">
				<Col sm={12} md={12} lg={12} xl={3} className="sidebar-col">
					<Sidebar items={items} />
				</Col>

				<Col
					sm={12}
					md={12}
					lg={12}
					xl={9}
					className="sidebar-page sidebar-page-mb">
					<div className="sidebar-page-mb">
						<div className="content-box-md">
							<Row>
								<Grid item xs={12} sm={12} className="text-center">
									<div className="horizontal-heading">
										<h5>Look At</h5>
										<h2>
											{" "}
											<span>
												Details for Protein
												<strong>
													{uniprot && uniprot.uniprot_canonical_ac && (
														<> {uniprot.uniprot_canonical_ac}</>
													)}
												</strong>
											</span>
										</h2>
									</div>
								</Grid>
							</Row>
						</div>
						<div className="gg-download-btn-width">
							<DownloadButton
								types={[
									{
										display: " Protein data (*.json)",
										type: "json",
										data: "protein_detail",
									},
									{
										display: " Protein data (*.FASTA)",
										type: "fasta",
										data: "protein_detail",
									},
								]}
								dataId={id}
								itemType="protein"
							/>
						</div>
						<React.Fragment>
							<Helmet>
								{getTitle("proteinDetail", {
									uniprot_canonical_ac:
										uniprot && uniprot.uniprot_canonical_ac
											? uniprot.uniprot_canonical_ac
											: "",
								})}
								{getMeta("proteinDetail")}
							</Helmet>
							<FeedbackWidget />
							<PageLoader pageLoading={pageLoading} />
							<DialogAlert
								alertInput={alertDialogInput}
								setOpen={(input) => {
									setAlertDialogInput({ show: input });
								}}
							/>
							{/* general */}
							<Accordion
								id="general"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.general.title}
												text={DetailTooltips.protein.general.text}
												urlText={DetailTooltips.protein.general.urlText}
												url={DetailTooltips.protein.general.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">General</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("general", collapsed.general)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.general ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<div
												style={{
													marginBottom: "5px",
												}}>
												{gene && (
													<tbody className="table-body">
														{gene.map((genes, genesname) => (
															<td key={genesname}>
																<div>
																	<strong>
																		{proteinStrings.gene_name.name}:
																	</strong>{" "}
																	<Link
																		href={genes.url}
																		target="_blank"
																		rel="noopener noreferrer">
																		{genes.name}
																	</Link>
																</div>

																<div>
																	<strong>
																		{proteinStrings.gene_location.name}:
																	</strong>{" "}
																	Chromosome: {""}
																	{genes.locus.chromosome} {""} (
																	{genes.locus.start_pos} -{" "}
																	{genes.locus.end_pos})
																</div>

																<EvidenceList
																	evidences={groupEvidences(
																		genes.locus.evidence
																	)}
																/>
															</td>
														))}
													</tbody>
												)}
												{!gene && (
													<p className="no-data-msg-publication">
														No data available.
													</p>
												)}
											</div>

											<p>
												{uniprot && uniprot.uniprot_canonical_ac && (
													<>
														<div>
															<strong>
																{proteinStrings.uniprot_id.name}:{" "}
															</strong>
															<Link
																href={uniprot.url}
																target="_blank"
																rel="noopener noreferrer">
																{uniprot.uniprot_id}{" "}
															</Link>
														</div>
														<div>
															<strong>
																{proteinStrings.uniprot_accession.name}:{" "}
															</strong>
															<Link
																href={uniprot.url}
																target="_blank"
																rel="noopener noreferrer">
																{uniprot.uniprot_canonical_ac}
															</Link>
														</div>
														<div>
															<strong>
																{proteinStrings.sequence_length.name}:{" "}
															</strong>
															<Link
																href={`https://www.uniprot.org/uniprot/${uniprot.uniprot_canonical_ac}/#sequences`}
																target="_blank"
																rel="noopener noreferrer">
																{uniprot.length}
															</Link>
														</div>
														<div>
															<strong>
																{proteinStrings.recommendedname.name}:{" "}
															</strong>{" "}
															{recommendedname.full}{" "}
														</div>
														<div>
															<strong>
																{proteinStrings.chemical_mass.name}:{" "}
															</strong>
															{addCommas(mass.chemical_mass)} Da
														</div>
														<div>
															<strong>{proteinStrings.refseq_ac.name}: </strong>{" "}
															<Link
																href={refseq.url}
																target="_blank"
																rel="noopener noreferrer">
																{" "}
																{refseq.ac}{" "}
															</Link>{" "}
														</div>
														<div>
															{" "}
															<strong>
																{proteinStrings.refSeq_name.name}:{" "}
															</strong>{" "}
															{refseq.name}{" "}
														</div>{" "}
													</>
												)}
											</p>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/* Species */}
							<Accordion
								id="species"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.species.title}
												text={DetailTooltips.protein.species.text}
												urlText={DetailTooltips.protein.species.urlText}
												url={DetailTooltips.protein.species.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Species</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("species", collapsed.species)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.species ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<Row>
												{speciesEvidence &&
													// For every species object
													Object.keys(speciesEvidence).map((speEvi) => (
														// For every database for current species object
														<Col xs={12} sm={12} md={4} lg={4} xl={4}>
															<>
																<strong className="nowrap">{speEvi}</strong>{" "}
																{"["}
																<a
																	href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${speciesEvidence[speEvi].taxid}`}
																	target="_blank"
																	rel="noopener noreferrer">
																	{speciesEvidence[speEvi].taxid}
																</a>
																{"]"}
																<EvidenceList
																	evidences={speciesEvidence[speEvi].evidence}
																/>
															</>
														</Col>
													))}
												{!species && (
													<p className="no-data-msg">No data available.</p>
												)}
											</Row>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  function */}
							<Accordion
								id="function"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.function.title}
												text={DetailTooltips.protein.function.text}
												urlText={DetailTooltips.protein.function.urlText}
												url={DetailTooltips.protein.function.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Function</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("function", collapsed.function)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.function ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body className="card-padding-zero">
											<Table hover fluid>
												<FunctionList functions={functions} />
												{!functions && (
													<p className="no-data-msg-publication">
														No data available.
													</p>
												)}
											</Table>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  goannotation */}
							<Accordion
								id="go_annotation"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.goannotation.title}
												text={DetailTooltips.protein.goannotation.text}
												urlText={DetailTooltips.protein.goannotation.urlText}
												url={DetailTooltips.protein.goannotation.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">GO Annotation</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse(
														"go_annotation",
														collapsed.go_annotation
													)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.go_annotation ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<div>
												{go_annotation &&
													go_annotation.categories &&
													go_annotation.categories.map((category) => (
														<>
															<h6>{category.name}</h6>
															{category.go_terms &&
																category.go_terms.map((term) => (
																	<Row>
																		<Col
																			sm={6}
																			md={6}
																			style={{ paddingTop: "15px" }}>
																			<Link
																				href={term.url}
																				target="_blank"
																				rel="noopener noreferrer">
																				{term.name} ({term.id})
																			</Link>
																		</Col>
																		<Col sm={6} md={5}>
																			<EvidenceList
																				evidences={groupEvidences(
																					term.evidence
																				)}
																			/>
																		</Col>
																	</Row>
																))}
															<strong>
																<p className="go-annotation-total">
																	Total{" "}
																	<a
																		// eslint-disable-next-line
																		href="javascript:void(0)"
																		onClick={() => {
																			handleOpenGOTermListPage(
																				uniprot &&
																					uniprot.uniprot_canonical_ac.split(
																						"-"
																					)[0]
																			);
																		}}
																		// onclick="openGOTermListPage()"
																		target="_blank"
																		rel="noopener noreferrer">
																		{category.total} in {category.name}
																	</a>{" "}
																	category.
																</p>
															</strong>
														</>
													))}
												{!go_annotation && (
													<p className="no-data-msg">No data available.</p>
												)}
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  Glycosylation */}
							<Accordion
								id="glycosylation"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.glycosylations.title}
												text={DetailTooltips.protein.glycosylations.text}
												urlText={DetailTooltips.protein.glycosylations.urlText}
												url={DetailTooltips.protein.glycosylations.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Glycosylation</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse(
														"glycosylation",
														collapsed.glycosylation
													)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.glycosylation ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											{glycosylation && glycosylation.length && (
												<Tabs
													defaultActiveKey={
														glycosylationWithImage &&
														glycosylationWithImage.length > 0
															? "with_glycanId"
															: "without_glycanId"
													}
													transition={false}
													activeKey={glycosylationTabSelected}
													mountOnEnter={true}
													unmountOnExit={true}
													onSelect={(key) => setGlycosylationTabSelected(key)}>
													<Tab
														eventKey="with_glycanId"
														// className='tab-content-padding'
														title="With Reported Glycan"
														//disabled={(!glycosylationWithImage || (glycosylationWithImage.length === 0))}
													>
														<Container
															style={{
																paddingTop: "20px",
																paddingBottom: "30px",
															}}>
															{glycosylationWithImage &&
																glycosylationWithImage.length > 0 && (
																	<ClientPaginatedTable
																		data={glycosylationWithImage}
																		columns={glycoSylationColumns}
																		onClickTarget={"#glycosylation"}
																	/>
																)}
															{!glycosylationWithImage.length && (
																<p>No data available.</p>
															)}
														</Container>
													</Tab>
													<Tab
														eventKey="without_glycanId"
														className="tab-content-padding"
														title="Without Reported Glycan"
														// disabled={(!glycosylationWithoutImage || (glycosylationWithoutImage.length === 0))}
													>
														<Container>
															{glycosylationWithoutImage &&
																glycosylationWithoutImage.length > 0 && (
																	<ClientPaginatedTable
																		data={glycosylationWithoutImage}
																		columns={glycoSylationColumns.filter(
																			(column) =>
																				column.dataField !== "glytoucan_ac"
																		)}
																		onClickTarget={"#glycosylation"}
																	/>
																)}
															{!glycosylationWithoutImage.length && (
																<p>No data available.</p>
															)}
														</Container>
													</Tab>
												</Tabs>
											)}

											{!glycosylation && <p>No data available.</p>}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  Sequence */}
							<Accordion
								id="sequence"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.sequence.title}
												text={DetailTooltips.protein.sequence.text}
												urlText={DetailTooltips.protein.sequence.urlText}
												url={DetailTooltips.protein.sequence.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Sequence</h3>
										<div className="float-right">
											<span>
												<NavLink to={`${routeConstants.protVista}${id}`}>
													<Button
														type="button"
														style={{ marginLeft: "5px" }}
														className="gg-btn-blue">
														<FaSearchPlus /> Protvista
													</Button>
												</NavLink>
											</span>

											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("sequence", collapsed.sequence)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.sequence ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<div>
												<ProteinSequenceDisplay
													sequenceObject={sequence}
													glycosylation={glycosylation}
													mutation={mutation}
													siteAnnotation={site_annotation}
												/>
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  Pathway */}
							<Accordion
								id="pathway"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.pathway.title}
												text={DetailTooltips.protein.pathway.text}
												urlText={DetailTooltips.protein.pathway.urlText}
												url={DetailTooltips.protein.pathway.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Pathway</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("pathway", collapsed.pathway)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.pathway ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											{itemsPathway && itemsPathway.length ? (
												<ul className="list-style-none">
													{itemsPathway.map((pathway) => (
														<li>
															<strong>
																{pathway.id} {pathway.resource}
															</strong>

															<ul style={{ marginBottom: "10px" }}>
																<Row>
																	{pathway.links.map((link) => (
																		<Col xs={12} sm={12}>
																			<li>
																				{link.name}{" "}
																				<a
																					href={link.url}
																					target="_blank"
																					rel="noopener noreferrer">
																					{link.id}
																				</a>
																			</li>
																		</Col>
																	))}
																</Row>
															</ul>
														</li>
													))}
												</ul>
											) : (
												<p>No data available.</p>
											)}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  isoforms */}
							<Accordion
								id="isoforms"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.isoforms.title}
												text={DetailTooltips.protein.isoforms.text}
												urlText={DetailTooltips.protein.isoforms.urlText}
												url={DetailTooltips.protein.isoforms.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Isoforms</h3>
										<div className="float-right">
											<NavLink
												to={`${routeConstants.isoAlignment}${id}/isoformset-uniprotkb`}>
												<Button type="button" className="gg-btn-blue">
													Alignment
												</Button>
											</NavLink>
											<Button
												type="button"
												style={{
													marginLeft: "10px",
												}}
												className="gg-btn-blue"
												onClick={() =>
													setShowIsoformSequences(!showIsoformSequences)
												}>
												{showIsoformSequences
													? "Hide Sequences"
													: "Show  Sequences"}
											</Button>
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("isoforms", collapsed.isoforms)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.isoforms ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<p>
												{isoforms && (
													<Grid container className="table-body">
														{isoforms.map((isoformsS, isoformIndex) => (
															<Grid item xs={12} key={isoformIndex}>
																<div>
																	<strong>UniProtKB Isoform Accession: </strong>
																	<Link
																		href={isoformsS.url}
																		target="_blank"
																		rel="noopener noreferrer">
																		{isoformsS.isoform_ac}
																	</Link>
																</div>
																{sequence && sequence.length && (
																	<div>
																		<strong> Isoform length: </strong>
																		{sequence.length}
																	</div>
																)}

																<div>
																	Chromosome: {""}
																	{isoformsS.locus.chromosome} {""}(
																	{isoformsS.locus.start_pos} -{" "}
																	{isoformsS.locus.end_pos})
																</div>
																<Grid className="badge-grid" xs={12}>
																	<EvidenceList
																		evidences={groupEvidences(
																			isoformsS.locus.evidence
																		)}
																	/>
																</Grid>
																{showIsoformSequences && (
																	<Grid style={{ paddingBottom: "40px" }}>
																		{/* <IsoformSequenceDisplay
                                    sequenceData={isoformsS.sequence}
                                  /> */}
																		<div className="sequnce_highlight">
																			{" "}
																			<SequenceDisplay
																				sequenceData={isoformsS.sequence.sequence
																					.split("")
																					.map((a) => ({
																						character: a,
																					}))}
																			/>
																		</div>
																	</Grid>
																)}
															</Grid>
														))}
													</Grid>
												)}

												{!isoforms && (
													<p classisoforms_ac="no-data-msg-publication">
														No data available.
													</p>
												)}
											</p>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/* Homologs / orthologs */}
							<Accordion
								id="homologs"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.homologs.title}
												text={DetailTooltips.protein.homologs.text}
												urlText={DetailTooltips.protein.homologs.urlText}
												url={DetailTooltips.protein.homologs.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Homologs</h3>
										<div className="float-right">
											{orthologs && orthologs.length && (
												<>
													<AlignmentDropdown
														types={[
															{
																display: " Homolog-oma",
																type: "Homolog-oma",
																data: "protein_detail",
															},
															{
																display: " Homolog-mgi",
																type: "homolog-mgi",
																data: "protein_detail",
															},
														]}
														dataType="protein_detail"
														dataId={id}
													/>

													<Button
														style={{
															marginLeft: "10px",
														}}
														type="button"
														className="gg-btn-blue"
														onClick={() =>
															setShowhomologSequences(!showhomologSequences)
														}>
														{showhomologSequences
															? "Hide Sequences"
															: "Show  Sequences"}
													</Button>
												</>
											)}

											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("orthologs", collapsed.orthologs)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.orthologs ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											{orthologs && (
												<Grid container classorthologs_ac="table-body">
													{orthologs.map(
														(orthologsS, orthologsSuniprot_canonical_ac) => (
															<Grid
																item
																xs={12}
																key={orthologsSuniprot_canonical_ac}>
																<div>
																	<strong>UniProtKB Isoform Accession: </strong>
																	{/* <Link
																		href={orthologsS.url}
																		target="_blank"
																		rel="noopener noreferrer"> */}
																	{orthologsS.uniprot_canonical_ac}
																	{/* </Link> */}
																</div>
																<div>
																	<strong>Organism: </strong>
																	{orthologsS.organism}
																</div>

																<Grid className="badge-grid" xs={12}>
																	<EvidenceList
																		evidences={groupEvidences(
																			orthologsS.evidence
																		)}
																	/>
																</Grid>
																{showhomologSequences && (
																	<Grid style={{ paddingBottom: "40px" }}>
																		<div className="sequnce_highlight">
																			{" "}
																			<SequenceDisplay
																				sequenceData={orthologsS.sequence.sequence
																					.split("")
																					.map((a) => ({
																						character: a,
																					}))}
																			/>
																		</div>
																	</Grid>
																)}
															</Grid>
														)
													)}
												</Grid>
											)}

											{!orthologs && (
												<p classorthologs_ac="no-data-msg-publication">
													No data available.
												</p>
											)}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  disease */}
							<Accordion
								id="disease"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.disease.title}
												text={DetailTooltips.protein.disease.text}
												urlText={DetailTooltips.protein.disease.urlText}
												url={DetailTooltips.protein.disease.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Disease</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("disease", collapsed.disease)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.disease ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<p>
												{disease && (
													<Grid container classorthologs_ac="table-body">
														{disease.map((diseaseS, diseaseSdoid) => (
															<Grid item xs={12} key={diseaseSdoid}>
																<div>
																	<strong> {diseaseS.name}</strong>

																	<p>
																		{" "}
																		(ICD10: {diseaseS.icd10} DOID:
																		<Link
																			href={diseaseS.url}
																			target="_blank"
																			rel="noopener noreferrer">
																			{diseaseS.doid})
																		</Link>
																	</p>
																</div>

																<Grid xs={9}>
																	<EvidenceList
																		evidences={groupEvidences(
																			diseaseS.evidence
																		)}
																	/>
																</Grid>
															</Grid>
														))}
													</Grid>
												)}

												{!disease && (
													<p classorthologs_ac="no-data-msg-publication">
														No data available.
													</p>
												)}
											</p>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  Mutation */}
							<Accordion
								id="mutation"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.mutation.title}
												text={DetailTooltips.protein.mutation.text}
												urlText={DetailTooltips.protein.mutation.urlText}
												url={DetailTooltips.protein.mutation.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Mutation</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("mutation", collapsed.mutation)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.mutation ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											{mutation && mutation.length !== 0 && (
												<ClientPaginatedTable
													data={mutation}
													defaultSortField={"annotation"}
													columns={mutationColumns}
													onClickTarget={"#mutation"}
												/>
											)}
											{!mutation && <p>No data available.</p>}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  Expression Tissue */}
							<Accordion
								id="expressionT"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.expression_tissue.title}
												text={DetailTooltips.protein.expression_tissue.text}
												urlText={
													DetailTooltips.protein.expression_tissue.urlText
												}
												url={DetailTooltips.protein.expression_tissue.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline"> Expression Tissue</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse(
														"expression_tissue",
														collapsed.expression_tissue
													)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.expression_tissue ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											{expression_tissue && expression_tissue.length !== 0 && (
												<ClientPaginatedTable
													data={expression_tissue}
													columns={expressionTissueColumns}
													onClickTarget={"#expression_tissue"}
													defaultSortField={"tissue"}
												/>
											)}
											{!expression_tissue && <p>No data available.</p>}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/*  Expression Disease */}
							<Accordion
								id="expressionD"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.expression_disease.title}
												text={DetailTooltips.protein.expression_disease.text}
												urlText={
													DetailTooltips.protein.expression_disease.urlText
												}
												url={DetailTooltips.protein.expression_disease.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline"> Expression Disease</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse(
														"expression_disease",
														collapsed.expression_disease
													)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.expression_disease
														? closeIcon
														: expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											{expression_disease &&
												expression_disease.length !== 0 && (
													<ClientPaginatedTable
														data={expression_disease}
														columns={expressionDiseaseColumns}
														onClickTarget={"#expression_disease"}
														defaultSortField={"disease"}
													/>
												)}
											{!expression_disease && <p>No data available.</p>}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/* crossref */}
							<Accordion
								id="crossRef"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.crossReferences.title}
												text={DetailTooltips.protein.crossReferences.text}
												urlText={DetailTooltips.protein.crossReferences.urlText}
												url={DetailTooltips.protein.crossReferences.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Cross References</h3>
										<div className="float-right">
											<Accordion.Toggle
												eventKey="0"
												onClick={() =>
													toggleCollapse("crossref", collapsed.crossref)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.crossref ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											{itemsCrossRef && itemsCrossRef.length ? (
												<p>
													<ul className="list-style-none">
														{/* <Row> */}
														{itemsCrossRef.map((crossRef) => (
															<li>
																{/* <Col> */}
																<strong>{crossRef.database}:</strong>
																<ul style={{ marginBottom: "10px" }}>
																	<Row>
																		{crossRef.links.map((link) => (
																			<Col xs={12} sm={4}>
																				<li>
																					<a
																						href={link.url}
																						target="_blank"
																						rel="noopener noreferrer">
																						{link.id}
																					</a>
																				</li>
																			</Col>
																		))}
																	</Row>
																</ul>
															</li>
														))}
													</ul>
												</p>
											) : (
												<p>No data available.</p>
											)}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							{/* publication */}
							<Accordion
								id="publication"
								defaultActiveKey="0"
								className="panel-width"
								style={{ padding: "20px 0" }}>
								<Card>
									<Card.Header className="panelHeadBgr">
										<span className="gg-green d-inline">
											<HelpTooltip
												title={DetailTooltips.protein.publications.title}
												text={DetailTooltips.protein.publications.text}
												urlText={DetailTooltips.protein.publications.urlText}
												url={DetailTooltips.protein.publications.url}
												helpIcon="gg-helpicon-detail"
											/>
										</span>
										<h3 className="gg-green d-inline">Publications</h3>
										<div className="float-right">
											{/* <span className='gg-align-middle card-icon-space'>
										<PublicationsMenu />
									</span> */}
											<Accordion.Toggle
												// as={Card.Header}
												eventKey="0"
												onClick={() =>
													toggleCollapse("publication", collapsed.publication)
												}
												className="gg-green arrow-btn">
												<span>
													{collapsed.publication ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0" out={!collapsed.publication}>
										<Card.Body className="card-padding-zero">
											<Table hover fluid>
												{publication && (
													<tbody className="table-body">
														{publication.map((pub, pubIndex) => (
															<tr className="table-row">
																<td key={pubIndex}>
																	<p>
																		<div>
																			<h5
																				style={{
																					marginBottom: "3px",
																				}}>
																				<strong>{pub.title}</strong>
																			</h5>
																		</div>
																		<div>{pub.authors}</div>
																		<div>
																			{pub.journal} <span>&nbsp;</span>(
																			{pub.date})
																		</div>
																		<div>
																			<FiBookOpen />
																			<span
																				style={{
																					paddingLeft: "15px",
																				}}>
																				PMID:
																			</span>{" "}
																			<a
																				href={pub.url}
																				target="_blank"
																				rel="noopener noreferrer">
																				{pub.pmid}
																			</a>
																		</div>
																		<EvidenceList
																			evidences={groupEvidences(pub.evidence)}
																		/>
																	</p>
																</td>
															</tr>
														))}
													</tbody>
												)}
												{!publication && (
													<p className="no-data-msg-publication">
														No data available.
													</p>
												)}
											</Table>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						</React.Fragment>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default ProteinDetail;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from 'react';
import { getGlycanDetail } from '../data/glycan';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import { Link,Typography } from '@material-ui/core';
import { Navbar, Col, Row, Image } from 'react-bootstrap';
import { FiBookOpen } from 'react-icons/fi';
import { groupEvidences, groupSpeciesEvidences } from '../data/data-format';
import EvidenceList from '../components/EvidenceList';
import ClientPaginatedTable from '../components/ClientPaginatedTable';
import '../css/detail.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import DownloadButton from '../components/DownloadButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PublicationsMenu from '../components/SeeMoreVertBtn';
import relatedGlycansIcon from '../images/icons/related-glycans-icon.svg';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutline from '@material-ui/icons/HelpOutline';
import { withStyles } from '@material-ui/core/styles';


const items = [
	{ label: 'General', id: 'general' },
	{ label: 'Species', id: 'species' },
	{ label: 'Motif', id: 'motif' },
	{ label: 'Associated Glycoproteins', id: 'glycoprotein' },
	{ label: 'Biosynthetic Enzymes', id: 'biosyntheticenzymes' },
	{ label: 'Digital Sequence', id: 'Dseqence' },
	{ label: 'Cross References', id: 'crossref' },
	{ label: 'Publication', id: 'publication' },
];

const CompositionDisplay = (props) => {
	return (
		<>
			{props.composition.map((item) => (
				<>
					{item.url ? (
						<>
							<a href={item.url} target='_blank' rel='noopener noreferrer'>
								{item.residue}
							</a>
							<sub>{item.count} </sub>
							{'  '}
						</>
					) : (
						<sub>{item.count} </sub>
					)}
				</>
			))}
		</>
	);
};

function addCommas(nStr) {
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;

	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

const getItemsCrossRef = (data) => {
	let itemscrossRef = [];

	//check data.
	if (data.crossref) {
		// for (let i = 0; i < data.crossref.length; i++) {
		// let crossrefitem = data.crossref[i];
		for (let crossrefitem of data.crossref) {
			let found = '';
			// for (let j = 0; j < itemscrossRef.length; j++) {
			//   let databaseitem = itemscrossRef[j];
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

const GlycanDetail = (props) => {
	let { id } = useParams();

	const [detailData, setDetailData] = useState({});
	const [itemsCrossRef, setItemsCrossRef] = useState([]);

	useEffect(() => {
		const getGlycanDetailData = getGlycanDetail(id);

		getGlycanDetailData.then(({ data }) => {
			if (data.code) {
				console.log(data.code);
			} else {
				setItemsCrossRef(getItemsCrossRef(data));

				setDetailData(data);
			}
		});

		getGlycanDetailData.catch(({ response }) => {
			alert(JSON.stringify(response));
		});
		// eslint-disable-next-line
	}, []);

	if (detailData.mass) {
		detailData.mass = addCommas(detailData.mass);
	}
	if (detailData.glycoct) {
		detailData.glycoct = detailData.glycoct.replace(/\\n/g, '\n');
	}

	if (detailData.composition) {
		var mapComp = { hex: 1, hexnac: 2, dhex: 3, neuac: 4, neugc: 5, other: 7 };

		detailData.composition = detailData.composition.sort(function (a, b) {
			var resVal1 = mapComp[a.residue.toLowerCase()];
			var resVal2 = mapComp[b.residue.toLowerCase()];

			if (!resVal1) resVal1 = 6;

			if (!resVal2) resVal2 = 6;

			return resVal1 - resVal2;
		});

		// Replacing residue names with the ones to be displayed.
		for (var i = 0; i < detailData.composition.length; i++) {
			if (detailData.composition[i].residue === 'hex') {
				detailData.composition[i].residue = 'Hex';
			} else if (detailData.composition[i].residue ==='hexnac') {
				detailData.composition[i].residue = 'HexNAc';
			} else if (detailData.composition[i].residue === 'dhex') {
				detailData.composition[i].residue = 'dHex';
			} else if (detailData.composition[i].residue ==='neuac') {
				detailData.composition[i].residue = 'NeuAc';
			} else if (detailData.composition[i].residue === 'neugc') {
				detailData.composition[i].residue = 'NeuGc';
			} else if (detailData.composition[i].residue === 'other') {
				detailData.composition[i].residue = '(+x other residues)';
			}
		}
	}
	const {
		mass,
		glytoucan,
		inchi_key,
		species,
		composition,
		motifs,
		iupac,
		glycam,
		smiles_isomeric,
		inchi,
		classification,
		glycoprotein,
		glycoct,
		publication,
		wurcs,
		enzyme,
		mass_pme,
	} = detailData;

	const speciesEvidence = groupSpeciesEvidences(species);

	const glycanImageUrl = 'https://api.glygen.org/glycan/image/';

	const glycoProtienColumns = [
		{
			dataField: 'uniprot_canonical_ac',
			text: 'Protein ID',
			sort: true,

			headerStyle: (column, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},
			formatter: (value, row) => (
				<Navbar.Text
					as={NavLink}
					to={`/protein-detail/${row.uniprot_canonical_ac}`}>
					{row.uniprot_canonical_ac}
				</Navbar.Text>
			),
		},

		{
			dataField: 'evidence',
			text: 'Sources',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},
			formatter: (cell, row) => {
				return (
					<EvidenceList
						key={row.position + row.uniprot_canonical_ac}
						evidences={groupEvidences(cell)}
					/>
				);
			},
		},
		{
			dataField: 'position',
			text: 'Position',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},
			formatter: (value, row) => (
				<Navbar.Text
					as={NavLink}
					to={`/site-specific/${row.position}`}>
					{row.position}
				</Navbar.Text>
			),
		},
		{
			dataField: 'protein_name',
			text: 'Protein Name',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},
		},
	];
	const bioEnzymeColumns = [
		{
			dataField: 'uniprot_canonical_ac',
			text: 'UniProtKB Accession',
			sort: true,

			headerStyle: () => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},
			formatter: (value, row) => (
				<Navbar.Text
					as={NavLink}
					to={`/protein-detail/${row.uniprot_canonical_ac}`}>
					{row.uniprot_canonical_ac}
				</Navbar.Text>
			),
		},
		{
			dataField: 'gene',
			text: 'Gene Name',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},

			formatter: (value, row) => <a href={row.gene_link} target='_blank'
			rel='noopener noreferrer'>{value}</a>,
		},

		{
			dataField: 'protein_name',
			text: 'Protein_Name',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},
		},
		
		{
			dataField: 'tax_name',
			text: 'Species',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},
		},
	];

	// ==================================== //
	/**
	 * Adding toggle collapse arrow icon to card header individualy.
	 * @param {object} glytoucan_ac- glytoucan accession ID.
	 **/
	const [collapsed, setCollapsed] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			general: true,
			species: true,
			motif: true,
			glycoprotein: true,
			bioEnzyme: true,
			digitalSeq: true,
			crossref: true,
			publication: true,
		}
	);

	function toggleCollapse(name, value) {
		setCollapsed({ [name]: !value });
	}
	const expandIcon = <ExpandMoreIcon fontSize='large' />;
	const closeIcon = <ExpandLessIcon fontSize='large' />;
	// ===================================== //

	/**
	 * Redirect and opens glytoucan_ac in a subsumption browser
	 * @param {object} glytoucan_ac- glytoucan accession ID.
	 **/
	function handleOpenSubsumptionBrowse(glytoucan_ac) {
		var url =
			'https://raw.githack.com/glygen-glycan-data/GNOme/GlyGen_DEV/restrictions/GNOme_GlyGen.browser.html?focus=' +
			glytoucan_ac;
		window.open(url);
	}
	const HtmlTooltip = withStyles((theme) => ({
		tooltip: {
			backgroundColor: '#f5f5f9',
			color: 'rgba(0, 0, 0, 0.87)',
			maxWidth: 220,
			// fontSize: theme.typography.pxToRem(16),
			border: '1px solid #dadde9',
		},
	}))(Tooltip);

	return (
		<>
			<Row>
				<Col sm={12} md={12} lg={12} xl={3} className='sidebar-col'>
					<Sidebar items={items} />
				</Col>

				<Col sm={12} md={12} lg={12} xl={9} className='sidebar-page'>
					<div className='content-box-md'>
						<h1 className='page-heading'>
							Details for glycan
						{glytoucan && glytoucan.glytoucan_ac && (
								<> {glytoucan.glytoucan_ac}</>
							)}
						
						</h1>
					</div>
					<DownloadButton
						types={[
							{ type: 'Glycan image (*.png)', data: 'glycan_image' },
							{ type: 'Glycan data (*.json)', data: 'glycan_detail' },
						]}
						dataType='glycan_detail'
						dataId={id}
					/>
					<React.Fragment>
						<Helmet>
							{getTitle('glycanDetail', {
								glytoucan_ac:
									glytoucan && glytoucan.glytoucan_ac
										? glytoucan.glytoucan_ac
										: '',
							})}
							{getMeta('glycanDetail')}
						</Helmet>
						{/* <ToggleCardlTemplate /> */}
						{/* general */}
						<Accordion
							id='general'
							defaultActiveKey='0'
							className='panel-width'
							style={{ padding: '20px 0' }}>
							<Card>
								<Card.Header className='panelHeadBgr'>
									<Typography variant='h4' component='h3' className='d-inline'>
										<HtmlTooltip
											// placement='top'
											disableTouchListener
											interactive
											title={
												<React.Fragment>
													<Typography
														variant='h6'
														component='h5'
														color='inherit'>
														General:
													</Typography>
													<Typography color='inherit'>
														{'General information about your selected glycan.'}
														<br /> {'Explore'}{' '}
														<a
															href='https://wiki.glygen.org/index.php/Main_Page'
															target='_blank'
															rel='noopener noreferrer'>
															{'General'}
														</a>
													</Typography>
												</React.Fragment>
											}>
											<HelpOutline />
										</HtmlTooltip>
										<h3 className='gg-green d-inline pl-3'>General</h3>
										<div className='float-right'>
											{/* <span className='gg-align-middle5 card-icon-space5 pr-3'>
												<Tooltip title='Help' placement='top'>
													<a
														href='https://wiki.glygen.org/index.php/Main_Page'
														target='_blank'
														rel='noopener noreferrer'>
														<Image
															className='iconHover'
															src={helpCircleIcon}
															alt='Help icon'
														/>
													</a>
												</Tooltip>
											</span> */}
											<span className='pr-3'>
												<Tooltip
													placement='top'
													title={
														<>
															<Typography color='inherit'>
																Related glycans
															</Typography>
														</>
													}>
													<a
														href='javascript:void(0)'
														onClick={() => {
															handleOpenSubsumptionBrowse(
																glytoucan && glytoucan.glytoucan_ac
															);
														}}>
														<Image
															src={relatedGlycansIcon}
															alt='Related glycans'
														/>
													</a>
												</Tooltip>
											</span>
											<Accordion.Toggle
												eventKey='0'
												onClick={() =>
													toggleCollapse('general', collapsed.general)
												}
												className='panelHeadBgr5 panelHeadText5 gg-green arrow-btn'>
												<span>
													{collapsed.general ? closeIcon : expandIcon}
												</span>
											</Accordion.Toggle>
										</div>
									</Typography>
								</Card.Header>
								<Accordion.Collapse eventKey='0'>
									<Card.Body>
										<p>
											{glytoucan && glytoucan.glytoucan_ac && (
												<>
													<p>
														<img
															className='img-cartoon'
															src={glycanImageUrl + glytoucan.glytoucan_ac}
															alt='Cartoon'
														/>
													</p>
													<div>
														<strong>GlyToucan Accession: </strong>
														<Link
															href={glytoucan.glytoucan_url}
															target="_blank"  rel="noopener noreferrer">
															{glytoucan.glytoucan_ac}
														</Link>
													</div>
													<div>
														<strong>Monoisotopic Mass: </strong>
														{mass} Da <strong>(Permethylated Mass:</strong>
														{mass_pme} Da)
													</div>
												</>
											)}
											{composition && (
												<div>
													<strong>Composition</strong>:{' '}
													<CompositionDisplay composition={composition} />
												</div>
											)}

											{classification && classification.length && (
												<div>
													<strong>Glycan Type / Subtype :  </strong>

													{classification.map((Formatclassification) => (
														<>
															<Link
																href={Formatclassification.type.url}
																target="_blank" rel="noopener noreferrer">
																{Formatclassification.type.name}
															</Link>
															&nbsp; <b>/</b> &nbsp;
															<Link
																href={Formatclassification.subtype.url}
																target="_blank"  rel="noopener noreferrer">
																{Formatclassification.subtype.name}
															</Link>
														</>
													))}
												</div>
											)}
											{inchi_key && inchi_key.key && (
												<>
													<div>
														<strong>Inchy key: </strong>
														<Link
															href={inchi_key.url}
															target="_blank" rel="noopener noreferrer">
															{inchi_key.key}
														</Link>
													</div>
												</>
											)}
										</p>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
						{/*  species */}
						<Accordion
							id='species'
							defaultActiveKey='0'
							className='panel-width'
							style={{ padding: '20px 0' }}>
							<Card>
								<Card.Header className='panelHeadBgr arrow'>
									<h3 className='panelHeadText'>Species</h3>
									<Accordion.Toggle
										eventKey='0'
										onClick={() => toggleCollapse('species', collapsed.species)}
										className='panelHeadBgr panelHeadText arrow-btn'>
										<span>{collapsed.species ? closeIcon : expandIcon}</span>
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey='0'>
									<Card.Body>
										<Row>
											{speciesEvidence &&
												// For every species object
												Object.keys(speciesEvidence).map((species) => (
													// For every database for current species object
													<Col xs={12} sm={12} md={6} lg={6} xl={6}>
														<p>
															<>
																<Row>
																	<Col align='right'>
																		<strong>{species}:</strong>
																	</Col>
																	<Col align='left'>
																		<EvidenceList
																			evidences={speciesEvidence[species]}
																		/>
																	</Col>
																</Row>
															</>
														</p>
													</Col>
												))}
												{ !species && (
											<p className="NoDatamessage">No data available.</p>
										)}
										</Row>
									</Card.Body>
									

									
								</Accordion.Collapse>
							</Card>
						</Accordion>
						{/* motif */}
						<Accordion
							defaultActiveKey='0'
							className='panel-width'
							style={{ padding: '20px 0' }}>
							<Card>
								<Card.Header className='panelHeadBgr arrow'>
									<h3 className='panelHeadText'>Motif</h3>
									<Accordion.Toggle
										id='motif'
										eventKey='0'
										onClick={() => toggleCollapse('motif', collapsed.motif)}
										className='panelHeadBgr panelHeadText arrow-btn'>
										<span>{collapsed.motif ? closeIcon : expandIcon}</span>
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey='0'>
									<Card.Body>
										{motifs && (
											<>
												<Row>
													{motifs.map((motif) => (
														<Col>
															<p>
																<div key={motif.id} className='img-wrapper'>
																	<img
																		className='img-cartoon'
																		src={glycanImageUrl + motif.id}
																		alt='Cartoon'
																	/>
																</div>
																<span>
																	<a href={''}>{motif.name}</a>
																</span>
															</p>
														</Col>
													))}
												</Row>
											</>
										)}
										{ !motifs && (
											<p>No data available.</p>
										)}

									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
						{/* GlycoProtien */}
						<Accordion
							id='glycoprotein'
							defaultActiveKey='0'
							className='panel-width'
							style={{ padding: '20px 0' }}>
							<Card>
								<Card.Header className='panelHeadBgr arrow'>
									<h3 className='panelHeadText'>Found Glycoproteins</h3>
									<Accordion.Toggle
										eventKey='0'
										onClick={() =>
											toggleCollapse('glycoprotein', collapsed.glycoprotein)
										}
										className='panelHeadBgr panelHeadText arrow-btn'>
										<span>
											{collapsed.glycoprotein ? closeIcon : expandIcon}
										</span>
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey='0'>
									<Card.Body>
										{glycoprotein && glycoprotein.length !== 0 && (
											<ClientPaginatedTable
												data={glycoprotein}
												columns={glycoProtienColumns}
												defaultSortField={'protein_id'}
											/>
										)}
										{!glycoprotein && (
											<p>No data available.</p>
			
											)}
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
						{/* Biosynthetic Enzyme */}
						<Accordion
							id='biosyntheticenzymes'
							defaultActiveKey='0'
							className='panel-width'
							style={{ padding: '20px 0' }}>
							<Card>
								<Card.Header className='panelHeadBgr arrow'>
									<h3 className='panelHeadText'>Biosynthetic Enzyme</h3>
									<Accordion.Toggle
										eventKey='0'
										onClick={() =>
											toggleCollapse('bioEnzyme', collapsed.bioEnzyme)
										}
										className='panelHeadBgr panelHeadText arrow-btn'>
										<span>{collapsed.bioEnzyme ? closeIcon : expandIcon}</span>
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey='0'>
									<Card.Body>
										{enzyme && enzyme.length !== 0 && (
											<ClientPaginatedTable
												data={enzyme}
												columns={bioEnzymeColumns}
												defaultSortField={'gene'}
											/>
										)}
										{!enzyme && (
											<p>No data available.</p>
			
											)}
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
						{/* Digital Sequence */}
						<Accordion
							id='Dseqence'
							defaultActiveKey='0'
							className='panel-width'
							style={{ padding: '20px 0' }}>
							<Card>
								<Card.Header className='panelHeadBgr arrow'>
									<h3 className='panelHeadText'>Digital Sequence</h3>
									<Accordion.Toggle
										eventKey='0'
										onClick={() =>
											toggleCollapse('digitalSeq', collapsed.digitalSeq)
										}
										className='panelHeadBgr panelHeadText arrow-btn'>
										<span>{collapsed.digitalSeq ? closeIcon : expandIcon}</span>
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey='0'>
									<Card.Body className='text-responsive'>
									<p>
									
                                            {iupac ?  (
											
											<><strong>IUPAC</strong> <p className='text-overflow'>{iupac} </p></>
                                            ) : (
                                               <p> </p>
                                            )}
										

                                    
                                            {wurcs ? (
												
												<><strong>WURCS</strong><p className='text-overflow'>{wurcs} </p> </>
                                            ) : (
                                                <p> </p>
											)}
							
							             
                                            {glycoct ?  (
											
											
											<><strong>GlycoCT</strong><p className='text-overflow'>{glycoct} </p> </>
                                            ) : (
                                                <p></p>
											)}
										
                                           
                                            {inchi ? (
                                              <> <strong>InChI</strong>  <p className='text-overflow'>{inchi}</p> </>
                                            ) : (
                                                <p></p>
                                            )}

                                          
                                            {glycam ? (
                                               <>  <strong>GLYCAM IUPAC</strong> <p className='text-overflow'>{glycam}</p> </>
                                            ) : (
                                                <p></p>
                                            )}
                                    
                                           
                                        
                                            {smiles_isomeric ? (
                                                <><strong>Isomeric SMILES</strong> <p className='text-overflow'>{smiles_isomeric}</p> </>
                                            ) : (
                                                <p></p>
                                            )}
                                        </p>


									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
						{/* crossref */}
						<Accordion
							id='crossref'
							defaultActiveKey='0'
							className='panel-width'
							style={{ padding: '20px 0' }}>
							<Card>
								<Card.Header className='panelHeadBgr arrow'>
									<h3 className='panelHeadText'>Cross References</h3>
									<Accordion.Toggle
										eventKey='0'
										onClick={() =>
											toggleCollapse('crossref', collapsed.crossref)
										}
										className='panelHeadBgr panelHeadText arrow-btn'>
										<span>{collapsed.crossref ? closeIcon : expandIcon}</span>
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey='0'>
									<Card.Body>
										{(itemsCrossRef && itemsCrossRef.length) ? (
											<p>
												<ul className='list-style-none'>
													{/* <Row> */}
													{itemsCrossRef.map((crossRef) => (
														<li>
															{/* <Col> */}
															<strong>{crossRef.database}:</strong>
															<ul>
																<Row>
																	{crossRef.links.map((link) => (
																		<Col>
																			<li>
																				<a
																					href={link.url}
																					target='_blank'
																					rel='noopener noreferrer'>
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
							id='publication'
							defaultActiveKey='0'
							className='panel-width'
							style={{ padding: '20px 0' }}>
							<Card>
								<Card.Header className='panelHeadBgr arrow'>
									<h3 className='panelHeadText'>Publications</h3>
									<span className='gg-align-middle card-icon-space'>
										<PublicationsMenu />
									</span>
									<Accordion.Toggle
										// as={Card.Header}
										eventKey='0'
										onClick={() =>
											toggleCollapse('publication', collapsed.publication)
										}
										className='panelHeadBgr panelHeadText arrow-btn'>
										{/* <h3>Publications</h3> */}
										<span>
											{collapsed.publication ? closeIcon : expandIcon}
										</span>
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey='0' out={!collapsed.publication}>
									<Card.Body className='publication-card-padding'>
										<Table hover fluid>
											{publication && (
												<tbody className='table-body'>
													{publication.map((pub, pubIndex) => (
														<tr className='table-row'>
															<td key={pubIndex}>
																<p>
																	<div>
																		<strong>{pub.title}</strong>
																	</div>
																	<div>{pub.authors}</div>
																	<div>
																		{pub.journal} <span>&nbsp;</span>({pub.date}
																		)
																	</div>
																	<div>
																		<FiBookOpen />
																		<span style={{ paddingLeft: '15px' }}>
																			PMID:
																		</span>{' '}
																		<a
																			href={pub.url}
																			target='_blank'
																			rel='noopener noreferrer'>
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
											{ !publication && (
										<p style={{ marginTop: '20px' }}className="NoDatamessage">No data available.</p>
										)}

										</Table>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					</React.Fragment>
				</Col>
			</Row>
		</>
	);
};

export default GlycanDetail;

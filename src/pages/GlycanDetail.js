import React, { useState, useEffect, useReducer } from 'react';
import { getGlycanDetail } from '../data/glycan';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import { Link, rgbToHex } from '@material-ui/core';
import { Navbar, Col, Row, Image } from 'react-bootstrap';
// import { FaReadme } from 'react-icons/fa';
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
import helpCircleIcon from '../images/icons/help-circle-icon.svg';
import relatedGlycansIcon from '../images/icons/related-glycans-icon.svg';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const items = [
	{ label: 'General', id: 'general' },
	{ label: 'Species', id: 'species' },
	{ label: 'Motif', id: 'motif' },
	{ label: 'Found Glycoproteins', id: 'glycoprotein' },
	{ label: 'Biosynthetic Enzymes', id: 'biosyntheticenzymes' },
	{ label: 'Digital Seqeunce', id: 'Dseqence' },
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
							<a href={item.url} target='_blank'>
								{item.residue}
							</a>
							<sub>{item.count}</sub>
						</>
					) : (
						<sub>{item.count}</sub>
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
			text: 'Protein ID',
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
			dataField: 'protein_name',
			text: 'Protein_Name',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},
		},
		{
			dataField: 'gene',
			text: 'Gene',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},

			formatter: (value, row) => <a href={row.gene_link}>{value}</a>,
		},
		{
			dataField: 'tax_name',
			text: 'Species Name',
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
	const expandIcon = (
		<ExpandMoreIcon fontSize='large' className='expand-arrow' />
	);
	const closeIcon = (
		<ExpandLessIcon
			fontSize='large'
			className={'expand-arrow' + ' expand-arrow-expanded'}
		/>
	);
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
							{ type: 'png', data: 'glycan_image' },
							{ type: 'json', data: 'glycan_detail' },
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
								<Card.Header className='panelHeadBgr arrow'>
									<h3 className='panelHeadText'>General</h3>
									<span className='gg-align-middle card-icon-space'>
										<Tooltip title='Help' placement='top'>
											<a
												href='https://wiki.glygen.org/index.php/Main_Page'
												target='_blank'
												rel='noopener noreferrer'>
												<Image
													className='iconHover'
													src={helpCircleIcon}
													alt='Related glycans'
												/>
											</a>
										</Tooltip>
									</span>
									<span className='gg-align-middle card-icon-space'>
										<Tooltip title='Related glycans' placement='top'>
											<a
												href='javascript:void(0)'
												onClick={() => {
													handleOpenSubsumptionBrowse(
														glytoucan && glytoucan.glytoucan_ac
													);
												}}>
												<Image src={relatedGlycansIcon} alt='Related glycans' />
											</a>
										</Tooltip>
									</span>
									<Accordion.Toggle
										// as={Card.Header}
										eventKey='0'
										onClick={() => toggleCollapse('general', collapsed.general)}
										className='panelHeadBgr panelHeadText arrow-btn'>
										{/* <h3>General</h3> */}
										{/* <div> */}
										<span>{collapsed.general ? closeIcon : expandIcon}</span>
										{/* </div> */}
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey='0' out={!collapsed.general}>
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
															target='noopener noreferrer _blank'>
															{glytoucan.glytoucan_ac}
														</Link>
													</div>
													<div>
														<strong>Monoisotopic Mass: </strong>
														{mass} Da <strong>(Permethylated Mass:</strong>{' '}
														{mass} Da)
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
													<strong>Glycan Type/Subtype: </strong>

													{classification.map((Formatclassification) => (
														<>
															<Link
																href={Formatclassification.type.url}
																target='noopener noreferrer _blank'>
																{Formatclassification.type.name}
															</Link>
															&nbsp;
															<Link
																href={Formatclassification.subtype.url}
																target='noopener noreferrer _blank'>
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
															target='noopener noreferrer _blank'>
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
								<Accordion.Toggle
									as={Card.Header}
									eventKey='0'
									onClick={() => toggleCollapse('species', collapsed.species)}
									className='panelHeadBgr panelHeadText arrow'>
									<h3>Species</h3>
									<span>{collapsed.species ? closeIcon : expandIcon}</span>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey='0' out={!collapsed.species}>
									<Card.Body>
										<Row>
											{speciesEvidence &&
												// For every species object
												Object.keys(speciesEvidence).map((species) => (
													// For every database for current species object
													<Col md={6} xs={6}>
														<p>
															<>
																<Row className='gg-align-middle'>
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
								<Accordion.Toggle
									id='motif'
									as={Card.Header}
									eventKey='0'
									onClick={() => toggleCollapse('motif', collapsed.motif)}
									className='panelHeadBgr panelHeadText arrow'>
									<h3>Motif</h3>
									<span className={'text-right'}>
										{collapsed.motif ? closeIcon : expandIcon}
									</span>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey='0' out={!collapsed.motif}>
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
								<Accordion.Toggle
									as={Card.Header}
									eventKey='0'
									onClick={() =>
										toggleCollapse('glycoprotein', collapsed.glycoprotein)
									}
									className='panelHeadBgr panelHeadText arrow'>
									<h3>Found Glycoproteins</h3>
									<span>{collapsed.glycoprotein ? closeIcon : expandIcon}</span>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey='0' out={!collapsed.glycoprotein}>
									<Card.Body>
										{glycoprotein && glycoprotein.length !== 0 && (
											<ClientPaginatedTable
												data={glycoprotein}
												columns={glycoProtienColumns}
											/>
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
								<Accordion.Toggle
									// id='biosyntheticenzymes'
									as={Card.Header}
									eventKey='0'
									onClick={() =>
										toggleCollapse('bioEnzyme', collapsed.bioEnzyme)
									}
									className='panelHeadBgr panelHeadText arrow'>
									<h3>Biosynthetic Enzyme</h3>
									<span>{collapsed.bioEnzyme ? closeIcon : expandIcon}</span>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey='0' out={!collapsed.bioEnzyme}>
									<Card.Body>
										{enzyme && enzyme.length !== 0 && (
											<ClientPaginatedTable
												data={enzyme}
												columns={bioEnzymeColumns}
											/>
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
								<Accordion.Toggle
									as={Card.Header}
									eventKey='0'
									onClick={() =>
										toggleCollapse('digitalSeq', collapsed.digitalSeq)
									}
									className='panelHeadBgr panelHeadText arrow'>
									<h3>Digital Sequence</h3>
									<span>{collapsed.digitalSeq ? closeIcon : expandIcon}</span>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey='0' out={!collapsed.digitalSeq}>
									<Card.Body className='text-responsive'>
										<p>
											<strong>IUPAC</strong>
											<p className='text-overflow'>{iupac}</p>
											<strong>WURCS</strong>
											<p className='text-overflow'>{wurcs}</p>
											<strong>GlycoCT</strong>
											<p className='text-overflow'>{glycoct}</p>
											<strong>InChI</strong>
											<p className='text-overflow'>{inchi}</p>
											<strong>GLYCAM IUPAC</strong>
											<p className='text-overflow'>{glycam}</p>
											<strong>Isomeric SMILES</strong>
											<p className='text-overflow'>{smiles_isomeric}</p>
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
								<Accordion.Toggle
									as={Card.Header}
									eventKey='0'
									onClick={() => toggleCollapse('crossref', collapsed.crossref)}
									className='panelHeadBgr panelHeadText arrow'>
									<h3>Cross References</h3>
									<span>{collapsed.crossref ? closeIcon : expandIcon}</span>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey='0' out={!collapsed.crossref}>
									<Card.Body>
										{itemsCrossRef ? (
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
																		<Col md={3}>
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
															{/* </Col> */}
														</li>
													))}
													{/* </Row> */}
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

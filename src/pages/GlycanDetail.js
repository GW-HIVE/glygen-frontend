import React, { useState, useEffect } from 'react';
import { getGlycanDetail } from '../data/glycan';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Helmet from 'react-helmet';
import { head, getMeta } from '../utils/head';
import { Link } from '@material-ui/core';
import { Navbar, Col, Row } from 'react-bootstrap';
import { FaReadme } from 'react-icons/fa';
import {
	groupEvidences,
	groupSpeciesEvidences,
	
} from '../data/data-format';
import EvidenceList from '../components/EvidenceList';

import ClientPaginatedTable from '../components/ClientPaginatedTable';
import '../css/detail.css';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const items = [
	{ label: 'General', id: 'general' },
	{ label: 'Species', id: 'species' },
	{ label: 'Motif', id: 'motif' },
	{ label: 'Found Glycoprotein', id: 'glycoprotein' },
	{ label: 'Biosynthetic Enzymes', id: 'biosyntheticenzymes' },
	{ label: 'Digital Seqeunce', id: 'Dseqence' },
	{ label: 'Cross References', id: 'crossref' },
	{ label: 'Publication', id: 'publication' }
];
function autoResize(frame) {
	frame.height = frame.contentWindow.document.body.scrollHeight + 'px';
	frame.width = frame.contentWindow.document.body.scrollWidth + 'px';
}

const CompositionDisplay = props => {
	return (
		<>
			{props.composition.map(item => (
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

const getItemsCrossRef = data => {
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
						id: crossrefitem.id
					});
				}
			}
			if (!found) {
				itemscrossRef.push({
					database: crossrefitem.database,
					links: [
						{
							url: crossrefitem.url,
							id: crossrefitem.id
						}
					]
				});
			}
		}
	}
	return itemscrossRef;
};

const GlycanDetail = props => {
	let { id } = useParams();

	const [detailData, setDetailData] = useState({});
	const [itemsCrossRef, setItemsCrossRef] = useState([]);

	useEffect(() => {
		const getGlycanDetailData = getGlycanDetail(id);

		getGlycanDetailData.then(({ data }) => {
			if (data.code) {
				console.log(data.code);
				// displayErrorByCode(data.code);
				// activityTracker("error", id, "error code: " + data.code + " (page: " + page + ", sort: " + sort + ", dir: " + dir + ", limit: " + limit + ")");
			} else {
				setItemsCrossRef(getItemsCrossRef(data));

				setDetailData(data);
			}
		});

		getGlycanDetailData.catch(({ response }) => {
			alert(JSON.stringify(response));
		});
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
		enzyme
	} = detailData;

	const speciesEvidence = groupSpeciesEvidences(species);

	const glycanImageUrl = 'https://api.glygen.org/glycan/image/';

	const glycoProtienColumns = [
		{
			dataField: 'uniprot_canonical_ac',
			text: 'protein ID',
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
			)
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
			}
		},
		{
			dataField: 'position',
			text: 'Position',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			}
		},
		{
			dataField: 'protein_name',
			text: 'Protein Name',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			}
		}
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
			)
		},

		{
			dataField: 'protein_name',
			text: 'Protein_Name',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			}
		},
		{
			dataField: 'gene',
			text: 'Gene',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			},

			formatter: (value, row) => (
				<a href={row.gene_link}>{value}</a>
				//<Navbar.Text as={NavLink} to={row.gene_link}>
				//  {value}
				//</Navbar.Text>
			)
		},
		{
			dataField: 'tax_name',
			text: 'Species Name',
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { backgroundColor: '#4B85B6', color: 'white' };
			}
		}
	];

	return (
		<>
			<Row>
				<Col sm={12} md={12} lg={12} xl={3} className='sidebar-col'>
					<Sidebar items={items} />
				</Col>

				<Col sm={12} md={12} lg={12} xl={9} className='sidebar-page'>
					<h2 className='page-heading'>
						<center>
							<strong>
								Details for glycan
								{glytoucan && glytoucan.glytoucan_ac && (
									<> {glytoucan.glytoucan_ac}</>
								)}
							</strong>
						</center>
					</h2>
					
					<React.Fragment>
						<Helmet>
							<title>{head.glycanDetail.title}</title>
							{getMeta(head.glycanDetail)}
						</Helmet>
		{/* general */}				
		<Accordion
								defaultActiveKey='0'
								id='general'
								className='panel-width'
								style={{ padding: '20px 0' }}>
								<Card>
									<Accordion.Toggle
										as={Card.Header}
										eventKey='0'
										className='panelHeadBgr panelHeadText btn-up'>
										<h3>General</h3>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey='0'>
										<Card.Body>
												{glytoucan && glytoucan.glytoucan_ac && (
													<>
														<p>
															<img
																className='img-cartoon'
																src={glycanImageUrl + glytoucan.glytoucan_ac}
																alt='Cartoon'
															/>
														</p>
														<p>
															<b>GlyToucan Accession: </b>
															<Link
																href={glytoucan.glytoucan_url}
																target='noopener noreferrer _blank'>
																{glytoucan.glytoucan_ac}
															</Link>
														</p>
														<p>
															<b>Monoisotopic Mass: </b>
															{mass} Da <strong>(Permethylated Mass:</strong>{' '}
															{mass} Da)
														</p>
													</>
												)}
												{composition && (
													<p>
														<b>Composition</b>:{' '}
														<CompositionDisplay composition={composition} />
													</p>
												)}

												{classification && classification.length && (
													<p>
														<b>Glycan Type/Subtype: </b>

														{classification.map(Formatclassification => (
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
													</p>
												)}

												{inchi_key && inchi_key.key && (
													<>
														<p>
															<b>Inchy key: </b>
															<Link
																href={inchi_key.url}
																target='noopener noreferrer _blank'>
																{inchi_key.key}
															</Link>
														</p>
													</>
												)}
											</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
			
         {/*  species*/}
		<Accordion
defaultActiveKey='0'
className='panel-width'
id='species'
style={{ padding: '20px 0' }}>
<Card>
	<Accordion.Toggle
		as={Card.Header}
		eventKey='0'
		className='panelHeadBgr panelHeadText btn-up'>
		<h3>Species</h3>
	</Accordion.Toggle>
	<Accordion.Collapse eventKey='0'>
		<Card.Body>
<Row>
				<Col md={12} xs={12} className='Species'>
					{speciesEvidence &&
						// For every species object
						Object.keys(speciesEvidence).map(species => (
							// For every database for current species object
							<>
								{/* s represents keys of evidences i.e. Species name, evidences[s] represents object of databases for that species */}
								{species}:
								<EvidenceList
									evidences={speciesEvidence[species]}
								/>
							</>
						))}
				</Col>
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
										className='panelHeadBgr panelHeadText btn-up'>
										<h3>Motif</h3>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey='0'>
										<Card.Body>
											{motifs && (
												<>
													<Row>
														{motifs.map(motif => (
															<Col>
																<div
																	key={motif.id}
																	className='img-motif-wrapper'>
																	<img
																		className='img-motif'
																		src={glycanImageUrl + motif.id}
																		alt='Cartoon'
																	/>
																</div>
																<span>
																	<a href={''}>{motif.name}</a>
																</span>
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
		<Accordion id='biosyntheticenzymes'
			defaultActiveKey='0'
			className='panel-width'
			style={{ padding: '20px 0' }}>
			<Card>
				<Accordion.Toggle
					as={Card.Header}
					eventKey='0'
					className='panelHeadBgr panelHeadText btn-up'>
					<h3>Found Glycoproteins</h3>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey='0'>
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
		</Accordion>;
		<Accordion
	defaultActiveKey='0'
	className='panel-width'
	style={{ padding: '20px 0' }}>
	<Card>
		<Accordion.Toggle
		id='biosyntheticenzymes'
			as={Card.Header}
			eventKey='0'
			className='panelHeadBgr panelHeadText btn-up'>
			<h3>Biosynthetic Enzyme</h3>
		</Accordion.Toggle>
		<Accordion.Collapse eventKey='0'>
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
	{/* digital seq */}
	<Accordion 	id='Dseqence'
								defaultActiveKey='0'
								className='panel-width'
								style={{ padding: '20px 0' }}>
								<Card>
									<Accordion.Toggle
										as={Card.Header}
										eventKey='0'
										className='panelHeadBgr panelHeadText btn-up'>
										<h3>Digital Sequence</h3>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey='0'>
										<Card.Body className='text-responsive '>
											<strong>IUPAC</strong>
											<pre className= 'text-overflow'>{iupac}</pre>
											<strong>WURCS</strong>
											<pre className= 'text-overflow'>{wurcs}</pre>
											<strong>GlycoCT</strong>
											<pre className= 'text-overflow'>{glycoct}</pre>
											<strong>InChI</strong>
											<pre className= 'text-overflow'>{inchi}</pre>
											<strong>GLYCAM IUPAC</strong>
											<pre className= 'text-overflow'>{glycam}</pre>
											<strong>Isomeric SMILES</strong>
											<pre className= 'text-overflow'>{smiles_isomeric}</pre>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
		;
	{/* crossref */}
	<Accordion
defaultActiveKey='0'
className='panel-width'
id='crossref'
style={{ padding: '20px 0' }}>
<Card>
	<Accordion.Toggle
		as={Card.Header}
		eventKey='0'
		className='panelHeadBgr panelHeadText btn-up'>
		<h3>Cross Reference</h3>
	</Accordion.Toggle>
	<Accordion.Collapse eventKey='0'>
		<Card.Body>
			{itemsCrossRef ? (
				<ul>
					{itemsCrossRef.map(crossRef => (
						<li class='list-group2'>
							<strong>{crossRef.database}:</strong>
							<ul>
								{crossRef.links.map(link => (
									<li class='list-group-indent'>
										<a
											class='panelcontent'
											href={link.url}
											target='_blank'
											rel='noopener noreferrer'>
											{link.id}
										</a>
									</li>
								))}
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
	{/* publication */}
	<Accordion
	defaultActiveKey='0'
	className='panel-width'
	id='publication'
	style={{ padding: '20px 0' }}>
	<Card>
		<Accordion.Toggle
			as={Card.Header}
			eventKey='0'
			className='panelHeadBgr panelHeadText btn-up'>
			<h3>Publication</h3>
		</Accordion.Toggle>
		<Accordion.Collapse eventKey='0'>
			<Card.Body>
				{publication && (
				<ul>
					{publication.map((pub, pubIndex) => (
						<li key={pubIndex}>
							<p><strong>{pub.title}</strong></p>
							<h3 style={{ fontSize: '15px',marginTop:'-10px' }}>{pub.authors}</h3>
							<h2  style={{ fontSize: '15px',marginTop:'-10px' }}>{pub.journal} <span>&nbsp;</span>({pub.date})</h2>
							<h2 style={{ fontSize: '14px',marginTop:'-10px' }}><FaReadme />
						
						                 <a
										class='panelcontent'
										href={pub.url}
										target='_blank'
										rel='noopener noreferrer'>
										{pub.pmid}
									</a></h2>

							<EvidenceList style={{ fontSize: '1px',marginTop:'-10px' }}
								evidences={groupEvidences(pub.evidence)}
							/>
						</li>
					))}
				</ul>
			)}
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

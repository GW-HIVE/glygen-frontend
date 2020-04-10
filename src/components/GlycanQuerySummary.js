import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Row, Col } from 'react-bootstrap';
import { getDateMMDDYYYY } from '../utils/common';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const GlycanQuerySummary = (props) => {
	const title = 'Glycan Search Summary';

	const { data, onModifySearch } = props;

	const executionTime = data.execution_time
		? getDateMMDDYYYY(data.execution_time)
		: '';
	const {
		glytoucan_ac,
		mass,
		mass_type,
		number_monosaccharides,
		organism,
		glycan_type,
		glycan_subtype,
		protein_identifier,
		glycan_motif,
		enzyme,
		pmid,
	} = data;

	const formatOrganisms = (organism) => {
		const organismNames = organism.organism_list.map((item) => item.name);

		return organismNames.join(` ${organism.operation} `);
	};
	return (
		<>
			<Card className='text-center summary-panel'>
				<Card.Header as='h3' className='panelHeadBgr panelHeadText'>
					{title}
				</Card.Header>
				<Card.Body>
					<Card.Title>Performed on: {executionTime} (EST)</Card.Title>
					<Card.Text>
						{/* glycan typeahead */}
						{glytoucan_ac && (
							<Row className='summary-table-col' sm={12}>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									Glycan Id:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{glytoucan_ac}
								</Col>
							</Row>
						)}
						{/* glycan mass */}
						{mass && mass.min && (
							<Row className='summary-table-col'>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									Mass:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{mass.min}&#8209;{mass.max}&nbsp;Da&nbsp;({mass_type})
								</Col>
							</Row>
						)}
						{/* glycan sugar */}
						{number_monosaccharides && number_monosaccharides.min && (
							<Row className='summary-table-col'>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									Sugar:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{number_monosaccharides.min}&#8209;
									{number_monosaccharides.max}&nbsp;Da&nbsp;
								</Col>
							</Row>
						)}
						{/* Oraganism */}
						{organism && (
							<Row className='summary-table-col'>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									Organism:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{formatOrganisms(organism)}
								</Col>
							</Row>
						)}
						{glycan_type && (
							<Row className='summary-table-col'>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									Glycan Type:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{glycan_type}
								</Col>
							</Row>
						)}
						{glycan_subtype && (
							<Row className='summary-table-col'>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									Glycan SubType:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{glycan_subtype}
								</Col>
							</Row>
						)}
						{protein_identifier && (
							<Row className='summary-table-col'>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									Protein Identifier:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{protein_identifier}
								</Col>
							</Row>
						)}
						{enzyme && enzyme.id && (
							<Row className='summary-table-col'>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									Synthesizing Enzyme:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{enzyme.id}
								</Col>
							</Row>
						)}
						{glycan_motif && (
							<Row className='summary-table-col'>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									Motif:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{glycan_motif}
								</Col>
							</Row>
						)}
						{pmid && (
							<Row className='summary-table-col'>
								<Col align='right' xs={6} sm={6} md={6} lg={6}>
									PMID:
								</Col>
								<Col align='left' xs={6} sm={6} md={6} lg={6}>
									{pmid}
								</Col>
							</Row>
						)}
					</Card.Text>
					<div className='pb-3'>
						<Button
							type='button'
							className='gg-btn-outline mr-4'
							onClick={() => {
								window.location.reload();
							}}>
							Update Results
						</Button>
						<Button
							type='button'
							className='gg-btn-blue'
							onClick={onModifySearch}>
							Modify Search
						</Button>
					</div>
					<Card.Text>
						** To perform the same search again using the current version of the
						database, click <strong>“Update Results”</strong>.
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};

export default GlycanQuerySummary;

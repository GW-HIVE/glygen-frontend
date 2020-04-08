import React from 'react';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';
import VerticalHeadingLogo from '../components/headings/VerticalHeadingLogo';
import PanelHowToCite from '../components/PanelHowToCite';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import howToCiteData from '../data/json/howToCiteData';
import { Row, Col } from 'react-bootstrap';
import Sidebar from '../components/navigation/Sidebar';

import '../css/detail.css';
import ToggleCardlTemplate from '../components/cards/ToggleCardTemplate';

const HowToCite = (props) => {
	const vertHeadHowToCite = {
		h5VerticalText: 'CITATIONS',
		h2textTop: 'Our',
		h2textBottomStrongBefore: 'Publications & Citations',
	};

	const items = [
		{ label: 'How To Cite', id: 'howToCite' },
		{ label: 'Our Papers', id: 'ourPapers' },
		{ label: 'Related Papers', id: 'relatedPapers' },
		{ label: 'Website Citation', id: 'websiteCitation' },
	];

	return (
		<>
			<Helmet>
				{/* <title>{head.nowToCite.title}</title>
				{getMeta(head.nowToCite)} */}
				{getTitle('howToCite')}
				{getMeta('howToCite')}
			</Helmet>

			<CssBaseline />
			<div id='top-heading'></div>
			{/* <Container maxWidth='xl' className='ggContainer'> */}
			<Row>
				{/* <Col> */}
				<Col sm={12} md={12} lg={12} xl={3} className='sidebar-col'>
					<Sidebar items={items} />
				</Col>
				<Col sm={12} md={12} lg={12} xl={9} className='sidebar-page'>
					<VerticalHeadingLogo post={vertHeadHowToCite} />

					<ToggleCardlTemplate />
					<PanelHowToCite id='howToCite' data={howToCiteData.howToCite} />
					<PanelHowToCite id='ourPapers' data={howToCiteData.ourPapers} />
					<PanelHowToCite
						id='relatedPapers'
						data={howToCiteData.relatedPapers}
					/>
					<PanelHowToCite
						id='websiteCitation'
						data={howToCiteData.websiteCitation}
					/>
				</Col>
			</Row>
			{/* </Container> */}
		</>
	);
};
export default HowToCite;

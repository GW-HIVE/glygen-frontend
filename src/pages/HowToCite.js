import React from 'react';
import Helmet from 'react-helmet';
import { head, getMeta } from '../utils/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import VerticalHeadingLogo from '../components/headings/VerticalHeadingLogo';
import PanelHowToCite from '../components/PanelHowToCite';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import howToCiteData from '../data/json/howToCiteData';
import { Row, Col } from 'react-bootstrap';
import Sidebar from '../components/navigation/Sidebar';
// import ToTopArrow from '../components/ToTopArrow';

const HowToCite = props => {
	const vertHeadHowToCite = {
		h5VerticalText: 'CITATIONS',
		h2textTop: 'Our',
		h2textBottomStrongBefore: 'Publications & Citations'
	};

	const items = [
		{ label: 'How To Cite', id: 'howToCite' },
		{ label: 'Our Papers', id: 'ourPapers' },
		{ label: 'Related Papers', id: 'relatedPapers' },
		{ label: 'Website Citation', id: 'websiteCitation' }
	];

	return (
		<React.Fragment>
			<Helmet>
				<title>{head.nowToCite.title}</title>
				{getMeta(head.nowToCite)}
			</Helmet>

			<CssBaseline />
			<div id='top-heading'></div>
			<Container maxWidth='xl' className='ggContainer'>
				<Row>
					<Col>
						<Sidebar items={items} />
					</Col>
					<Col sm={12} md={10} lg={10}>
						<VerticalHeadingLogo post={vertHeadHowToCite} />
						<PanelHowToCite
							id='howToCite'
							data={howToCiteData.howToCite}
						/>{' '}
						{/* <ToTopArrow /> */}
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
			</Container>
		</React.Fragment>
	);
};
export default HowToCite;

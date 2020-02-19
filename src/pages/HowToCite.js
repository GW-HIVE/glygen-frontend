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

const HowToCite = () => {
	const vertHeadHowToCite = {
		h5VerticalText: 'CITATIONS',
		h2textTop: 'Our',
		h2textBottomStrongBefore: 'Publications & Citations'
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{head.nowToCite.title}</title>
				{getMeta(head.nowToCite)}
			</Helmet>

			<CssBaseline />
			<Container maxWidth='xl' className='ggContainer'>
				<VerticalHeadingLogo post={vertHeadHowToCite} />
				<PanelHowToCite data={howToCiteData.howToCite} />
				<PanelHowToCite data={howToCiteData.ourPapers} />
				<PanelHowToCite data={howToCiteData.relatedPapers} />
				<PanelHowToCite data={howToCiteData.websiteCitation} />
			</Container>
		</React.Fragment>
	);
};
export default HowToCite;

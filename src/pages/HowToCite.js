import React from 'react';
import Helmet from 'react-helmet';
import { head, getMeta } from '../utils/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import VerticalHeading from '../components/headings/VerticalHeading';
import PanelText from '../components/PanelText';
import PanelButst from '../components/PanelBoots';
import PanelTemplate from '../components/PanelTemplate';
import SummaryTemplate from '../components/SummaryTemplate';

// import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import howToCiteData from '../data/json/howToCiteData';
// import howToCiteData from '../data/json/howToCiteData';

const HowToCite = () => {
	const vertHeadHowToCite = {
		h5VerticalText: 'CITATIONS',
		h2textTop: 'Our',
		h2textBottomStrongBefore: 'Publications & Citations'
	};
	const howToCite = {
		headTitle: 'How To Cite',
		tableBodyTitle:
			'GlyGen: Computational and Informatics Resources for Glycoscience.',
		tableBody1:
			'William S York, Raja Mazumder, Rene Ranzinger, Nathan Edwards, Robel Kahsay, Kiyoko F AokiKinoshita, Matthew P Campbell, Richard D Cummings, Ten Feizi, Maria Martin, Darren A Natale, Nicolle H Packer, Robert J Woods, Gaurav Agarwal, Sena Arpinar, Sanath Bhat, Judith Blake, Leyla Jael Garcia Castro, Brian Fochtman, Jeffrey Gildersleeve, Radoslav Goldman, Xavier Holmes, Vinamra Jain, Sujeet Kulkarni, Rupali Mahadik, Akul Mehta, Reza Mousavi, Sandeep Nakarakommula, Rahi Navelkar, Nagarajan Pattabiraman, Michael J Pierce, Karen Ross, Preethi Vasudev, Jeet Vora, Tatiana Williamson, and Wenjin Zhang.'
		// image: GitHubIcon,
		// href: 'https://data.glygen.org/',
		// target: '_blank'
		// icon: GitHubIcon
	};
	// const dhowToCiteCols = {
	// 	dataField: 'howtocite',
	// 	text: 'How To Cite'
	// };

	return (
		<React.Fragment>
			<Helmet>
				<title>{head.resources.title}</title>
				{getMeta(head.resources)}
			</Helmet>

			<CssBaseline />
			<Container
				maxWidth='xl'
				className='ggContainer'
				// style={{ backgroundColor: '#fff' }}
			>
				<VerticalHeading post={vertHeadHowToCite} />
				{/* <BootstrapTable
					bootstrap4
					striped
					hover
					headerClasses='panelHeadBgr panelHeadText'
					keyField='id'
					data={howToCiteData.dataResourcesData}
					columns={dhowToCiteCols}
				/> */}
				<br />
				<br />
				<PanelText post={howToCite} />
				<br />
				<br />
        <PanelButst data={howToCiteData.howToCite} />
        <br />
        <br />
        <PanelTemplate />
        <br />
        <SummaryTemplate />
			</Container>
		</React.Fragment>
	);
};
export default HowToCite;

import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainFeaturedCard from '../components/cards/MainFeaturedCard';
import FeaturedCard from '../components/cards/FeaturedCard';
// import QuickSearchCard from '../components/cards/QuickSearchCard';
import TryMeCard from '../components/cards/TryMeCard';
import InfoCard from '../components/cards/InfoCard';
import VersionCard from '../components/cards/VersionCard';
import StatDBCard from '../components/cards/StatDBCard';
import TwitterCard from '../components/cards/TwitterCard';
import { Row } from 'react-bootstrap';
import card3 from '../images/home/featuredImg-10.jpg';
import feedback from '../images/home/feedback.svg';
import resources from '../images/home/resources.svg';
// import glycanImg from '../images/home/glycan-img.svg';
import proteinImg from '../images/home/protein-img.svg';
import enzymeImg from '../images/home/enzyme.png';
// import featuredImg from '../images/home/featuredImg-7.jpg';
import glycanImg from '../images/home/glycan.png';
import Helmet from 'react-helmet';
import { getTitle, getMeta } from '../utils/head';
import { getSystemData } from '../data';

const mainFeaturedCard = {
	title: 'Computational and Informatics Resources for Glycoscience',
	description:
		'GlyGen is a data integration and dissemination project for carbohydrate and glycoconjugate related data. GlyGen retrieves information from multiple international data sources and integrates and harmonizes this data. This web portal allows exploring this data and performing unique searches that cannot be executed in any of the integrated databases alone.',
	image: card3,
	imgText: 'main image description',
	linkText: 'Learn More…',
	href: '/About'
};
const featuredCards = [
	{
		title: 'Glycan',
		description:
			'Search for glycan structures based on their chemical and structural properties.',
		image: glycanImg,
		imageText: 'Glycan',
		href: '#'
	},
	{
		title: 'Protein',
		description:
			'Search for proteins based on their sequences, accessions, and annotations.',
		image: proteinImg,
		// image: enzymeImg,
		imageText: 'Protein',
		href: '#'
	},
	{
		title: 'Enzyme',
		description:
			'Search for enzymes based on protein accession, gene name, and glycan.',
		image: enzymeImg,
		imageText: 'Enzyme Function',
		href: '#'
	},
	{
		title: 'Quick Search',
		description:
			'Search data using queries prepared to provide answers to complex biological questions.',
		image: glycanImg,
		imageText: 'Quick Search',
		href: '#'
	},
	{
		title: 'Composition Search',
		description:
			'Composition search based on their residue. Add some text here.',
		image: glycanImg,
		imageText: 'Composition Search',
		href: '#'
	},
	{
		title: 'Data',
		description:
			'Search data using queries prepared to provide answers to complex biological questions.',
		image: glycanImg,
		imageText: 'Data',
		href: 'https://data.glygen.org/',
		target: '_blank'
	},
	{
		title: 'API',
		description:
			'Composition search based on their residue. Add some text here.',
		image: glycanImg,
		imageText: 'API',
		href: 'https://api.glygen.org/',
		target: '_blank'
	},
	{
		title: 'SPARQL',
		description:
			'GlyGen data visualization via charts, diagrams, and chart bars.',
		image: glycanImg,
		imageText: 'SPARQL',
		href: 'https://sparql.glygen.org/',
		target: '_blank'
	}
];
const feedbackCard = {
	title: 'Your Opinion Matters',
	description:
		'Please provide feedback and suggestions to help us improve the GlyGen portal and make it more useful for the community.',
	image: feedback,
	imageText: 'Feedback',
	button: 'LEAVE FEEDBACK',
	href: '/Feedback'
};
const resourcesCard = {
	title: 'Explore Other Resources',
	description:
		'GlyGen is pleased to provide users with a variety of resources in glycobiology.',
	image: resources,
	imageText: 'Resources',
	button: 'EXPLORE',
	href: '/Resources'
};

export default function Home() {
	const [homeData, setHomeData] = useState({ statistics: [], version: [] });
	const [pageLoading, setPageLoading] = React.useState(true);

	useEffect(() => {
		setPageLoading(true);
		getSystemData().then(response => setHomeData(response.data));
		setTimeout(()=> {
			setPageLoading(false);
		}, 500)

	}, []);

	return (
		<React.Fragment>
			<Helmet>
				{getTitle("home")}
				{getMeta("home")}
			</Helmet>

			<CssBaseline />
			<MainFeaturedCard post={mainFeaturedCard} />
			<Container maxWidth='xl' className='ggContainer'>
				<Row className='show-grid'>
					<Grid container spacing={4}>
						<Grid item xs={12} md={8} lg={9}>
							<Grid
								container
								spacing={4}
								style={{
									justifyContent: 'center'
								}}>
								{featuredCards.map(post => (
									<FeaturedCard key={post.title} post={post} />
								))}
								<TryMeCard id='try-me' />
							</Grid>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Grid
								container
								spacing={4}
								style={{
									justifyContent: 'center'
								}}>
								<VersionCard data={homeData.version} pageLoading={pageLoading}/>
								<InfoCard post={feedbackCard} />
								<StatDBCard data={homeData.statistics} pageLoading={pageLoading}/>
								<InfoCard post={resourcesCard} />
								<TwitterCard />
							</Grid>
						</Grid>
					</Grid>
				</Row>
			</Container>
		</React.Fragment>
	);
}

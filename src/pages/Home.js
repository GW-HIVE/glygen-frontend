import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainFeaturedCard from '../components/cards/MainFeaturedCard';
import FeaturedCard from '../components/cards/FeaturedCard';
import InfoCard from '../components/cards/InfoCard';
import VersionCard from '../components/cards/VersionCard';
import StatDBCard from '../components/cards/VersionCard';
import TwitterCard from '../components/cards/VersionCard';
import { Row } from 'react-bootstrap';
// import card from '../images/home/featuredImg-7.jpg';
// import card2 from '../images/home/featuredImg-8.jpg';
import card3 from '../images/home/featuredImg-10.jpg';
import feedback from '../images/home/feedback.svg';
import resources from '../images/home/resources.svg';
import glycanImg from '../images/home/glycan-img.svg';
import proteinImg from '../images/home/protein-img.svg';

// const useStyles = makeStyles(theme => ({
// 	mainGrid: {
// 		marginLeft: theme.spacing(3)
// 	}
// }));

const mainFeaturedCard = {
	title: 'Computational and Informatics Resources for Glycoscience',
	description:
		'GlyGen is a data integration and dissemination project for carbohydrate and glycoconjugate related data. GlyGen retrieves information from multiple international data sources and integrates and harmonizes this data. This web portal allows exploring this data and performing unique searches that cannot be executed in any of the integrated databases alone.',
	image: card3,
	imgText: 'main image description',
	linkText: 'Learn More…'
};
const featuredCards = [
	{
		title: 'Glycan',
		description:
			'Search for glycan structures based on their chemical and structural properties.',
		image: glycanImg,
		imageText: 'Glycan'
	},
	{
		title: 'Protein',
		description:
			'Search for proteins based on their sequences, accessions, and annotations.',
		image: proteinImg,
		imageText: 'Protein'
	},
	{
		title: 'Enzyme',
		description:
			'Search for enzymes based on protein accession, gene name, and glycan.',
		image: glycanImg,
		imageText: 'Image Text'
	},
	{
		title: 'Quick Search',
		description:
			'Search data using queries prepared to provide answers to complex biological questions.',
		image: glycanImg,
		imageText: 'Quick Search'
	},
	{
		title: 'Composition Search',
		description: 'Composition search based on their residue.',
		image: glycanImg,
		imageText: 'Composition Search'
	},
	// {
	// 	title: 'Statistics',
	// 	description:
	// 		'GlyGen data visualization via charts, diagrams, and chart bars.',
	// 	image: glycanImg,
	// 	imageText: 'Image Text'
	// },
	{
		title: 'Data',
		description:
			'Search data using queries prepared to provide answers to complex biological questions.',
		image: glycanImg,
		imageText: 'Quick Search'
	},
	{
		title: 'API',
		description: 'Composition search based on their residue.',
		image: glycanImg,
		imageText: 'Composition Search'
	},
	{
		title: 'SPARQL',
		description:
			'GlyGen data visualization via charts, diagrams, and chart bars.',
		image: glycanImg,
		imageText: 'Image Text'
	}
];
const infoCards = [
	{
		title: 'Your Opinion Matters',
		description:
			'Please provide feedback and suggestions to help us improve the GlyGen portal and make it more useful for the community.',
		image: feedback,
		imageText: 'Feedback',
		button: 'LEAVE FEEDBACK'
	},
	{
		title: 'Explore Other Resources',
		description:
			'GlyGen is pleased to provide users with a variety of resources in glycobiology.',
		image: resources,
		imageText: 'Resources',
		button: 'EXPLORE'
	}
];
const versionCard = {
	title: 'Version',
	text1: 'Portal:',
	textData1: 'Data1',
	text2: 'Webservice:',
	textData2: 'Data2',
	text3: 'Data:',
	textData3: 'Data3'
};
const statDBCard = {
	title: 'Database Statistics'
};
const twitterCard = {
	title: 'News'
};

export default function Home() {
	// const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<MainFeaturedCard post={mainFeaturedCard} />

			<Container maxWidth='xl'>
				<main>
					<Row className='show-grid'>
						<Grid container spacing={3}>
							<Grid item xs={12} md={9}>
								<Grid container spacing={2}>
									{featuredCards.map(post => (
										<FeaturedCard key={post.title} post={post} />
									))}
								</Grid>
							</Grid>
							<Grid item xs={12} md={3}>
								<Grid container spacing={2}>
									<VersionCard post={versionCard} />
									<StatDBCard post={statDBCard} />
									{infoCards.map(post => (
										<InfoCard key={post.title} post={post} />
									))}
									<TwitterCard post={twitterCard} />
								</Grid>
							</Grid>
						</Grid>
					</Row>
				</main>
			</Container>
		</React.Fragment>
	);
}

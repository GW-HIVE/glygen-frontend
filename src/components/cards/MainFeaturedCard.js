import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
// import { Nav } from 'react-bootstrap';

const useStyles = makeStyles(theme => ({
	mainFeaturedCard: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		// backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)'
	},
	mainFeaturedCardContent: {
		position: 'relative',
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0
		}
	},
	linkText: {
		color: '#fff',
		fontWeight: '600',
		'&:hover': {
			color: '#57affa'
		}
	}
}));

export default function MainFeaturedCard(props) {
	const classes = useStyles();
	const { post } = props;

	return (
		<Paper
			className={classes.mainFeaturedCard}
			style={{ backgroundImage: `url(${post.image})` }}>
			{/* Increase the priority of the hero background image */}
			{
				<img
					style={{ display: 'none' }}
					src={post.image}
					alt={post.imageText}
				/>
			}
			<div className={classes.overlay} />
			<Grid container>
				<Grid item sm={12} md={11} lg={6}>
					<div className={classes.mainFeaturedCardContent}>
						<Typography
							component='h1'
							variant='h3'
							color='inherit'
							gutterBottom>
							{post.title}
						</Typography>
						<Typography variant='h5' color='inherit' paragraph>
							{post.description}
						</Typography>
						<Link
							variant='subtitle1'
							href={post.href}
							className={classes.linkText}>
							{post.linkText}
						</Link>
					</div>
				</Grid>
			</Grid>
		</Paper>
	);
}

MainFeaturedCard.propTypes = {
	post: PropTypes.object
};

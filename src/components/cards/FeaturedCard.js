import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
	cardAction: {
		display: 'inline-flex'
	},
	card: {
		// display: 'flex'
		// maxWidth: 345
	},
	cardDetails: {
		flex: 1
	},
	cardMedia: {
		// width: 160
		height: 275,
		// width: '70%',
		margin: '0 auto'
	},
	divider: {
		margin: theme.spacing(1, 1)
	}
}));

export default function FeaturedCard(props) {
	const classes = useStyles();
	const { post } = props;

	return (
		<Grid item xs={12} sm={6} md={6} lg={4}>
			{/* <Card className={classes.card}> */}
			<CardActionArea
				className={classes.cardAction}
				component='a'
				href={post.href}
				target={post.target}
				rel='noopener noreferrer'>
				<Card className='card'>
					<Hidden xsDown>
						<CardMedia
							component='img'
							className={classes.cardMedia}
							image={post.image}
							title={post.imageText}
						/>
					</Hidden>
					<div className={classes.cardDetails}>
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								{post.title}
							</Typography>
							<Typography variant='p' color='textSecondary' paragraph>
								{post.description}
							</Typography>
							<Divider className={classes.divider} />
							<Typography
								variant='subtitle1'
								color='primary'
								className='text-center'
								style={{ fontWeight: 'bold', color: '#2f78b7' }}>
								EXPLORE
							</Typography>
						</CardContent>
					</div>
				</Card>
			</CardActionArea>
			{/* </Card> */}
		</Grid>
	);
}

FeaturedCard.propTypes = {
	post: PropTypes.object
};
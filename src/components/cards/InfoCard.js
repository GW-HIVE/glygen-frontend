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
	card: {
		// display: 'flex'
		maxWidth: 345
	},
	cardTitle: {
		textAlign: 'center'
	},
	cardDetails: {
		flex: 1
	},
	cardMedia: {
		// width: 160
		height: 140
	},
	divider: {
		margin: theme.spacing(3, 0)
	}
}));

export default function InfoCard(props) {
	const classes = useStyles();
	const { post } = props;

	return (
		<Grid item xs={12} md={12}>
			{/* <Card className={classes.card}> */}
			<CardActionArea component='a' href='#'>
				<Card className={classes.card}>
					<div className={classes.cardDetails}>
						<CardContent>
							<Typography
								gutterBottom
								variant='h5'
								component='h2'
								className={classes.cardTitle}>
								{post.title}
							</Typography>
							<Hidden xsDown>
								<CardMedia
									className={classes.cardMedia}
									image={post.image}
									title={post.imageTitle}
								/>
							</Hidden>
							<Typography variant='subtitle1' color='textSecondary' paragraph>
								{post.description}
							</Typography>
							<Divider className={classes.divider} />
							<Typography
								variant='subtitle1'
								color='primary'
								className='text-center'>
								{post.button}
							</Typography>
						</CardContent>
					</div>
				</Card>
			</CardActionArea>
		</Grid>
	);
}

InfoCard.propTypes = {
	post: PropTypes.object
};

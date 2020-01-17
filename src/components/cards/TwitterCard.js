import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
// import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const useStyles = makeStyles(theme => ({
	cardAction: {
		display: 'inline-flex'
	},
	card: {
		display: 'flex',
		maxWidth: 345
	},
	cardTitle: {
		textAlign: 'center'
	},
	cardDetails: {
		flex: 1
	}
}));

export default function TwitterCard(props) {
	const classes = useStyles();
	const { post } = props;

	return (
		<Grid item xs={12} sm={6} md={12}>
			<Card className={classes.card}>
				<CardActionArea className={classes.cardAction} component='a' href='#'>
					{/* <Card className={classes.card}> */}
					<div className={classes.cardDetails}>
						<CardContent>
							<Typography
								gutterBottom
								variant='h5'
								component='h2'
								className={classes.cardTitle}>
								{post.title}
							</Typography>
						</CardContent>
					</div>
					{/* </Card> */}
				</CardActionArea>
			</Card>
		</Grid>
	);
}

TwitterCard.propTypes = {
	post: PropTypes.object
};

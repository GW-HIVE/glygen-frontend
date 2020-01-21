import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
	cardAction: {
		display: 'inline-flex'
	},
	card: {
		// display: 'flex'
		// maxWidth: 345
		// width: '100%'
	},
	cardTitle: {
		textAlign: 'center'
	},
	cardDetails: {
		flex: 1
	}
}));

export default function VersionCard(props) {
	const classes = useStyles();
	const { post } = props;

	return (
		<Grid item xs={12} sm={6} md={12}>
			{/* <Card className={classes.card}> */}
			<CardActionArea className={classes.cardAction} component='a' href='#'>
				<Card className='card'>
					<div className={classes.cardDetails}>
						<CardContent>
							<Typography
								gutterBottom
								variant='h5'
								component='h2'
								className={classes.cardTitle}>
								{post.title}
							</Typography>
							<Typography variant='subtitle1' color='textPrimary'>
								<Box>
									<span>
										<strong>{post.text1}</strong>
									</span>{' '}
									{post.textData1}
									<br />
									<span>
										<strong>{post.text2}</strong>
									</span>{' '}
									{post.textData2}
									<br />
									<span>
										<strong>{post.text3}</strong>
									</span>{' '}
									{post.textData3}
								</Box>
							</Typography>
						</CardContent>
					</div>
				</Card>
			</CardActionArea>
			{/* </Card> */}
		</Grid>
	);
}

VersionCard.propTypes = {
	post: PropTypes.object
};

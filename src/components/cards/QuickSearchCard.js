import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import ListGroup from 'react-bootstrap/ListGroup';

const useStyles = makeStyles(theme => ({
	cardAction: {
		display: 'inline-flex'
	},
	card: {
		// display: 'flex'
		// maxWidth: 345
	},
	cardTitle: {
		textAlign: 'center'
	},
	cardDetails: {
		flex: 1
	},
	selected: {
		color: '#2F78B7'
	}
}));

export default function QuickSearchCard(props) {
	const classes = useStyles();
	function alertClicked() {
		alert('You clicked the ListGroupItem');
	}

	return (
		<Grid item xs={12} sm={12} md={12}>
			<Card className='card'>
				<div className={classes.cardDetails}>
					<CardContent>
						<Typography
							gutterBottom
							variant='h5'
							component='h2'
							className={classes.cardTitle}>
							Quick Search
						</Typography>
						<ListGroup as='h6'>
							<ListGroup.Item action onClick={alertClicked} href='#'>
								What are the enzymes involved in the biosynthesis of{' '}
								<span className={classes.selected}> glycan X </span> in human?
							</ListGroup.Item>
							<ListGroup.Item action onClick={alertClicked}>
								Which proteins have been shown to bear{' '}
								<span className={classes.selected}> glycan X </span> and which
								site is this glycan attached to?
							</ListGroup.Item>
							<ListGroup.Item action onClick={alertClicked}>
								What are the orthologues of{' '}
								<span className={classes.selected}> protein X </span> in
								different species?
							</ListGroup.Item>
							<ListGroup.Item action onClick={alertClicked}>
								Which glycans might have been synthesized in mouse using{' '}
								<span className={classes.selected}> enzyme X? </span>
							</ListGroup.Item>
							<ListGroup.Item action onClick={alertClicked}>
								What are the glycosyltransferases in{' '}
								<span className={classes.selected}> species X </span>?
							</ListGroup.Item>
							<ListGroup.Item action onClick={alertClicked}>
								Which glycosyltransferases are known to be involved in{' '}
								<span className={classes.selected}> disease X? </span>
							</ListGroup.Item>
						</ListGroup>
						<CardActionArea
							className={classes.cardAction}
							component='a'
							href='#'>
							<Typography
								variant='subtitle1'
								color='primary'
								className='text-center'
								style={{
									marginTop: '20px',
									fontWeight: 'bold',
									color: '#2f78b7'
								}}>
								SEE ALL
							</Typography>
						</CardActionArea>
					</CardContent>
				</div>
			</Card>
		</Grid>
	);
}

QuickSearchCard.propTypes = {
	post: PropTypes.object
};

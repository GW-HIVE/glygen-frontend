import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { Row } from 'react-bootstrap';

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
	}
}));

export default function StatDBCard(props) {
	const classes = useStyles();
	// const [statisticsData, setStatisticsData] = useState({});

	// useEffect(() => {
	// 	var statData = {};
	// 	// props.data.forEach(statObj => {
	// 	// 	statData[statObj.species] = {
	// 	// 		glycans: statObj.glycans,
	// 	// 		proteins: statObj.proteins,
	// 	// 		glycoproteins: statObj.glycoproteins
	// 	// 	};
	// 	// });
	// 	setStatisticsData(props.data);
	// }, [props.data]);

	return (
		<Grid item xs={12} sm={6} md={12}>
			{/* <Card className={classes.card}> */}
			<CardActionArea className={classes.cardAction} component='a' href='#'>
				<Card className='card'>
					<div className={classes.cardDetails}>
						<CardContent style={{ padding: '30px' }}>
							<Typography
								gutterBottom
								variant='h5'
								component='h2'
								className={classes.cardTitle}>
								Database Statistics
							</Typography>
							{props.data.map(obj => (
								<>
									<Row>
										<Typography variant='h6'>
											<strong>{obj.species}</strong>
										</Typography>
									</Row>
									<Typography>
										<Row>
											<Grid
												container
												item
												xs={9}
												md={9}
												lg={9}
												style={{ paddingLeft: '15px' }}>
												Glycans
											</Grid>
											<Grid item xs={3} md={3} lg={3}>
												{obj.glycans}
											</Grid>
										</Row>
										<Row>
											<Grid
												container
												item
												xs={9}
												md={9}
												lg={9}
												style={{ paddingLeft: '15px' }}>
												Proteins
											</Grid>
											<Grid item xs={3} md={3} lg={3}>
												{obj.proteins}
											</Grid>
										</Row>
										<Row>
											<Grid
												container
												item
												xs={9}
												md={9}
												lg={9}
												style={{ paddingLeft: '15px' }}>
												Glycoproteins
											</Grid>
											<Grid item xs={3} md={3} lg={3}>
												{obj.glycoproteins}
											</Grid>
										</Row>
									</Typography>
								</>
							))}
						</CardContent>
					</div>
				</Card>
			</CardActionArea>
			{/* </Card> */}
		</Grid>
	);
}

StatDBCard.propTypes = {
	data: PropTypes.object
};

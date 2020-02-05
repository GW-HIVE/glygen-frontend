import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { getDateMMDDYYYY } from '../../utils/common';

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
	const [versionData, setVersionData] = useState({});

	useEffect(() => {
		var verData = {};
		props.data.forEach(verObj => {
			verData[verObj.component] = {
				releaseDate: verObj.release_date,
				version: verObj.version
			};
		});
		setVersionData(verData);
	}, [props.data]);

	return (
		<Grid item xs={12} sm={6} md={12}>
			<CardActionArea className={classes.cardAction} component='a' href='#'>
				<Card className='card'>
					<div className={classes.cardDetails}>
						<CardContent>
							<Typography
								gutterBottom
								variant='h5'
								component='h2'
								className={classes.cardTitle}>
								Version
							</Typography>
							<Typography variant='subtitle1' color='textPrimary'>
								<Box>
									<span>
										<strong>Portal:</strong>
									</span>{' '}
									{versionData.software &&
										versionData.software.version +
											' (' +
											getDateMMDDYYYY(versionData.software.releaseDate) +
											')'}
									<br />
									<span>
										<strong>Webservice:</strong>
									</span>{' '}
									{versionData.api &&
										versionData.api.version +
											' (' +
											getDateMMDDYYYY(versionData.api.releaseDate) +
											')'}
									<br />
									<span>
										<strong>Data:</strong>
									</span>{' '}
									{versionData.data &&
										versionData.data.version +
											' (' +
											getDateMMDDYYYY(versionData.data.releaseDate) +
											')'}
								</Box>
							</Typography>
						</CardContent>
					</div>
				</Card>
			</CardActionArea>
		</Grid>
	);
}

VersionCard.propTypes = {
	data: PropTypes.object
};

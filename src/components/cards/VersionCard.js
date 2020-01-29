import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import { getSystemData } from '../../data'

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
	
	const [versionCard, setVersionCard] = useState({
		title: 'Version',
		text1: 'Portal:',
		textData1: 'Data1',
		text2: 'Webservice:',
		textData2: 'Data2',
		text3: 'Data:',
		textData3: 'Data3'
	})

	useEffect(() => {

		getSystemData().then(({ data }) => {
			const { version } = data

			const versionByComponent = version.reduce((byComponent, version) => ({
				...byComponent,
				[version.component]: {
					version: version.version,
					release_date: version.release_date,
					component: version.component
				}
			}), 
			{});

			

			setVersionCard({
				...versionCard,
			
				 textData1: JSON.stringify(versionByComponent.api.version ),
				//textData1: JSON.stringify(versionByComponent.api.version.release_date),
				textData2: JSON.stringify(versionByComponent.data),
				textData3: JSON.stringify(versionByComponent.software)
			})
		})		
	}, [])


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
								{versionCard.title}
							</Typography>
							<Typography variant='subtitle1' color='textPrimary'>
								<Box>
                <span><strong>{versionCard.text1}</strong></span>{' '}
									{versionCard.textData1}
									
									<br />
                  <span><strong>{versionCard.text2}</strong></span>{' '}
                  {versionCard.textData2}
									<br />
                  <span><strong>{versionCard.text3}</strong></span>{' '}
                  {versionCard.textData3}
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



import React from 'react';
import Grid from '@material-ui/core/Grid';
import HorizontalHeading from '../headings/HorizontalHeading';
import Iframe from 'react-iframe';
import { Typography } from '@material-ui/core';

export default function GlycanTutorial(props) {
	const horHeadSimpleOne = {
		h5VerticalText: 'SIMPLE SEARCH',
		h2textTopStrongBefore: 'How To',
		h2textTop: 'Use',
		h2textTopStrongAfter: 'Simple',
		h2textTop2: 'Glycan Search',
	};

	return (
		<>
			<HorizontalHeading post={horHeadSimpleOne} />
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={4}>
					<Iframe
						src='//www.slideshare.net/slideshow/embed_code/key/1Gk9i2RWn1D9wV'
						width='100%'
						height='230'
						frameborder='0'
						marginwidth='0'
						marginheight='0'
						scrolling='no'
						style={{
							border: '1px solid #CCC',
							borderWidth: '1px',
							marginBottom: '5px',
							maxWidth: '100%',
						}}
						allowfullscreen>
						{' '}
					</Iframe>
				</Grid>
				<Grid item xs={12} sm={6} className='tutorial-text-middle'>
					<Typography>
						You can search for glycans by specifying their GlyTouCan accession
						numbers, their specific structures or the specific biochemical
						contexts within which they are found.
					</Typography>
					<br />
					<Typography>
						This tutorial was created using a portal version: 1.0.1
						(09/19/2018).
					</Typography>
				</Grid>
			</Grid>
		</>
	);
}

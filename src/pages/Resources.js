import React from 'react';
import Helmet from 'react-helmet';
import { head, getMeta } from '../utils/head';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const Resources = () => {
	return (
		<>
			<CssBaseline />
			<Helmet>
				<title>{head.resources.title}</title>
				{getMeta(head.resources)}
			</Helmet>

			<Container maxWidth='xl' className='ggContainer'>
				<h1>Resources</h1>
			</Container>
		</>
	);
};

export default Resources;

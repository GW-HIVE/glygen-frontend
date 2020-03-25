import React from 'react';
import Helmet from 'react-helmet';
import { head, getMeta } from '../utils/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import HorizontalHeading from '../components/headings/HorizontalHeading';
import { Col } from 'react-bootstrap';
import Iframe from 'react-iframe';

export default function Feedback() {
	const horizontalHeadingFeedback = {
		h5VerticalText: 'feedback',
		h2textTop: 'Your Opinion Matters',
		h2textBottom: 'Leave',
		h2textBottomStrongAfter: 'Feedback'
	};

	return (
		<>
			<Helmet>
				<title>{head.feedback.title}</title>
				{getMeta(head.feedback)}
			</Helmet>

			<CssBaseline />
			<Container maxWidth='xl' className='ggContainer'>
				<HorizontalHeading post={horizontalHeadingFeedback} />
				<Col>
					<Iframe
						src='https://docs.google.com/forms/d/e/1FAIpQLSehYoalCh_Q9fonINNpWpONDKjQnmO0d3meyJYiZyTqmCxPbQ/viewform?embedded=true'
						width='100%'
						height='1700'
						frameborder='0'
						marginheight='0'
						marginwidth='0'
						frameBorder='0'>
						Loading...
					</Iframe>
				</Col>
			</Container>
		</>
	);
}

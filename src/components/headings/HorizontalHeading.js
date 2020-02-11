import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Row } from 'react-bootstrap';
import Container from '@material-ui/core/Container';

export default function HorizontalHeading(props) {
	const { post } = props;

	return (
		<div className='content-box-md'>
			<Container maxWidth='xl'>
				<Row>
					<Grid item xs={12} sm={12} md={12} lg={12} className='text-center'>
						<div className='horizontal-heading'>
							<Typography variant='h5'>{post.h5VerticalText}</Typography>
							<Typography variant='h2'>
								<span>
									<strong>{post.h2textTopStrongBefore}</strong>
								</span>{' '}
								{post.h2textTop}{' '}
								<span>
									<strong>{post.h2textTopStrongAfter}</strong>
								</span>
								<br />
								<span>
									<strong>{post.h2textBottomStrongBefore}</strong>
								</span>{' '}
								{post.h2textBottom}{' '}
								<span>
									<strong>{post.h2textBottomStrongAfter}</strong>
								</span>
							</Typography>
							<Typography variant='p' style={{ fontSize: '18px' }}>
								{post.pText}
							</Typography>
						</div>
					</Grid>
				</Row>
			</Container>
		</div>
	);
}

HorizontalHeading.propTypes = {
	post: PropTypes.object
};

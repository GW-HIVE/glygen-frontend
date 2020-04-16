import React from 'react';
import PropTypes from 'prop-types';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
import { Row, Col } from 'react-bootstrap';
import Container from '@material-ui/core/Container';

export default function VerticalHeading(props) {
	const { post } = props;

	return (
		<div className='content-box-md'>
			<Container maxWidth='xl'>
				<Row>
					<Col>
						<div className='vertical-heading'>
							<h5>{post.h5VerticalText}</h5>
							<h2>
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
							</h2>
							<br />
							<p>{post.pText}</p>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

VerticalHeading.propTypes = {
	post: PropTypes.object,
};

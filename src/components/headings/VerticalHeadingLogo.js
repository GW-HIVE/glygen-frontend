import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Grid, Link } from '@material-ui/core';
import { Row } from 'react-bootstrap';
import Container from '@material-ui/core/Container';
import glygenLogoDownload from '../../images/glygen_logos/logo-glygen-blue-36.svg';
import CardMedia from '@material-ui/core/CardMedia';

export default function VerticalHeadingLogo(props) {
	const { post } = props;

	return (
		<div className='content-box-md'>
			<Container maxWidth='xl'>
				<Row>
					<Grid item xs={8} sm={8} md={8} lg={8}>
						<div className='vertical-heading'>
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
							<Typography
								variant='p'
								style={{ fontSize: '18px', margin: '0 0 0 35px' }}>
								{post.pText}
							</Typography>
						</div>
					</Grid>
					<Grid item xs={4} sm={4} md={4} lg={4}>
						<Row>
							<Link
								className='align-logo-bottom'
								align='bottom'
								href='https://github.com/glygener/glygen-frontend/tree/master/src/GlyGen-logos'
								target='_blank'>
								DOWNLOAD
								<CardMedia
									component='img'
									image={glygenLogoDownload}
									title='Download GlyGen Logo'
								/>
							</Link>
						</Row>
					</Grid>
				</Row>
			</Container>
		</div>
	);
}

VerticalHeadingLogo.propTypes = {
	post: PropTypes.object
};

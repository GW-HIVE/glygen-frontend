import React from 'react';
import Helmet from 'react-helmet';
import { head, getMeta } from '../utils/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import VerticalHeading from '../components/headings/VerticalHeading';
import { Row, Col } from 'react-bootstrap';
import { decomposeColor } from '@material-ui/core';

const PrivacySettings = props => {
	const vertHeadDisclaimer = {
		h5VerticalText: 'Settings',
		h2textTop: 'Manage',
		h2textBottom: 'Your',
		h2textBottomStrongAfter: 'Privacy Settings'
	};

	return (
		<>
			<Helmet>
				<title>{head.privacySettings.title}</title>
				{getMeta(head.privacySettings)}
			</Helmet>

			<CssBaseline />
			<Container
				maxWidth='md'
				className='card'
				style={{ marginTop: '20px', marginBottom: '20px' }}>
				<VerticalHeading post={vertHeadDisclaimer} />
				<Row>
					<Col style={{ paddingBottom: '40px' }}>
						<Col md={10} className='contact-right' style={{ margin: '0 auto' }}>
							<p id='textManageSettingsEnabled'>
								GlyGen is monitoring your searches to improve/streamline your
								interaction with our system.{' '}
								<a
									href='https://github.com/glygener/glygen-frontend/wiki/Logging-user-activity'
									target='_blank'
									rel='noopener noreferrer'>
									Learn more.
								</a>
							</p>

							<p id='textManageSettingsDisabled'>
								GlyGen is NOT currently monitoring your searches; you can
								improve/streamline your searches by allowing GlyGen to monitor
								your interaction with our system. For example, your searches can
								be recorded so you can review them at a later date.{' '}
								<a
									href='https://github.com/glygener/glygen-frontend/wiki/Logging-user-activity'
									target='_blank'
									rel='noopener noreferrer'>
									Learn more.
								</a>
							</p>
							<hr />

							<Row>
								<Col sm={10} className='text-left'>
									User Selection
									<br />
									<span
										id='manageSettingsDisabled'
										style={{ color: '#999999' }}>
										Disabled
									</span>
									<span
										id='manageSettingsEnabled'
										style={{ color: '#3277b7', display: 'none' }}>
										Enabled
									</span>
								</Col>

								<Col sm={2} className='text-right'>
									{/* <label class="switch">
                        <input name="manageSettingsEnabled" type="checkbox">
                        <span class="slider round" id="slider-round" onclick="return switchHandler(this);"></span>
                    </label> */}
								</Col>
							</Row>
						</Col>
					</Col>
				</Row>
			</Container>
		</>
	);
};
export default PrivacySettings;

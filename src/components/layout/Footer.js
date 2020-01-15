import React from 'react';
import './Header.css';
import './Footer.css';
import logoFooter from '../../images/glygen_logos/glygen-logoW-top.svg';
import ugaLogo from '../../images/univ_logos/logo-uga.svg';
import gwuLogo from '../../images/univ_logos/logo-gwu.svg';
import { Navbar, Col, Nav, Image, Row } from 'react-bootstrap';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import '../../App.css';

const Footer = () => (
	<React.Fragment className='fixed-bottom'>
		<Navbar sticky='bottom' className='gg-bg-blue text-center footer'>
			<Container
				maxWidth='xl'
				className='themed-container container-fluid justify-content-center'>
				<Row className='text-center'>
					<Col>
						<Navbar.Brand href='#home'>
							<img
								href='#home'
								src={logoFooter}
								alt='Glygen'
								className='justify-content-center'
							/>
						</Navbar.Brand>
					</Col>
					<Box display='flex' alignItems='center' className='box-footer'>
						<Col>
							<Nav className='justify-content-center'>
								<Nav.Link to='/license'>License</Nav.Link>
								<Nav.Link to='/privacy_policy'>Privacy&nbsp;Policy</Nav.Link>
								<Nav.Link href='disclaimer.js'>Disclaimer</Nav.Link>
								<Nav.Link href='contact'>Contact&nbsp;Us</Nav.Link>
							</Nav>
						</Col>
					</Box>
					<Box display='flex' alignItems='center' className='box-footer'>
						<Col>
							<Navbar.Text>
								Funded by{' '}
								<a
									href='https://commonfund.nih.gov/glycoscience'
									target='_blank'
									rel='noopener noreferrer'
									className='footer-link'>
									NIH Glycoscience Common Fund
								</a>
							</Navbar.Text>
						</Col>
					</Box>
					<Box display='flex' alignItems='center' className='box-footer'>
						<Col>
							<Navbar.Text>
								Grant #
								<a
									href='https://projectreporter.nih.gov/project_info_details.cfm?aid=9391499&icde=0'
									target='_blank'
									rel='noopener noreferrer'
									className='footer-link'>
									1U01GM125267&nbsp;-&nbsp;01
								</a>
							</Navbar.Text>
						</Col>
					</Box>

					<Col>
						<a
							href='https://www.ccrc.uga.edu/'
							target='_blank'
							rel='noopener noreferrer'>
							<Image src={ugaLogo} className='univ-logo' />
						</a>
						<a
							href='https://smhs.gwu.edu/'
							target='_blank'
							rel='noopener noreferrer'>
							<Image src={gwuLogo} className='univ-logo' />
						</a>
					</Col>
				</Row>
			</Container>
		</Navbar>
	</React.Fragment>
);
export default Footer;

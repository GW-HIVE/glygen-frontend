import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import logoFooter from '../../images/glygen_logos/glygen-logoW-top.svg';
import ugaLogo from '../../images/univ_logos/logo-uga.svg';
import gwuLogo from '../../images/univ_logos/logo-gwu.svg';
import { Navbar, Col, Image, Row } from 'react-bootstrap';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css';

const useStyles = makeStyles(theme => ({
	navbarText: {
		color: '#fff !important'
	},
	link: {
		color: '#afd9fd !important',
		'&:hover': {
			color: '#57affa !important'
		}
	},
	univLogo: {
		padding: '5px 10px 0 10px'
	}
}));

export default function Header() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar className='gg-blue text-center gg-footer'>
				<Container maxWidth='xl' className='justify-content-center'>
					<Row className='text-center justify-content-center'>
						<Col md={'auto'}>
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
							<Col md={'auto'}>
								<Navbar.Text
									as={Link}
									to='/license'
									className={classes.link}
									style={{ marginRight: '15px' }}>
									License
								</Navbar.Text>{' '}
								<Navbar.Text
									as={Link}
									to='/privacy_policy'
									className={classes.link}
									style={{ marginRight: '15px' }}>
									Privacy&nbsp;Policy
								</Navbar.Text>{' '}
								<Navbar.Text
									as={Link}
									to='/disclaimer'
									className={classes.link}
									style={{ marginRight: '15px' }}>
									Disclaimer
								</Navbar.Text>{' '}
								<Navbar.Text
									as={Link}
									to='/contact_us'
									className={classes.link}
									style={{ marginRight: '15px' }}>
									Contact Us
								</Navbar.Text>{' '}
							</Col>
						</Box>
						<Box display='flex' alignItems='center' className='box-footer'>
							<Col md={'auto'}>
								<Navbar.Text className={classes.navbarText}>
									Funded by{' '}
									<a
										href='https://commonfund.nih.gov/glycoscience'
										target='_blank'
										rel='noopener noreferrer'
										className={classes.link}>
										NIH Glycoscience Common Fund
									</a>
								</Navbar.Text>
							</Col>
						</Box>
						<Box display='flex' alignItems='center' className='box-footer'>
							<Col md={'auto'}>
								<Navbar.Text className={classes.navbarText}>
									Grant #{' '}
									<a
										href='https://projectreporter.nih.gov/project_info_details.cfm?aid=9391499&icde=0'
										target='_blank'
										rel='noopener noreferrer'
										className={classes.link}>
										1U01GM125267&nbsp;-&nbsp;01
									</a>
								</Navbar.Text>
							</Col>
						</Box>
						<Col md={'auto'}>
							<a
								href='https://www.ccrc.uga.edu/'
								target='_blank'
								rel='noopener noreferrer'>
								<Image src={ugaLogo} className={classes.univLogo} />
							</a>
							<a
								href='https://smhs.gwu.edu/'
								target='_blank'
								rel='noopener noreferrer'>
								<Image src={gwuLogo} className={classes.univLogo} />
							</a>
						</Col>
					</Row>
				</Container>
			</Navbar>
		</React.Fragment>
	);
}

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import logo from '../../images/glygen_logos/glygen-logoW.svg';
import { NavDropdown, Navbar, Nav, Row, Col } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import Container from '@material-ui/core/Container';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

const useStyles = makeStyles(theme => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.25),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.35)
		},
		marginLeft: 0,
		marginRight: 15,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto'
		}
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 2),
		transition: theme.transitions.create('width'),
		width: '100%',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: '20px',
		[theme.breakpoints.up('sm')]: {
			maxWidth: 180
			// '&:focus': {
			// 	width: 200
			// }
		}
	},
	navbarText: {
		color: '#2f78b7 !important',
		fontWeight: '600',
		'&:hover': {
			color: '#57affa !important'
		}
	}
}));

export default function Header() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<Navbar className='gg-top-header' expand='xl'>
				<Container maxWidth='xl'>
					<Row className='show-grid'>
						<Col xs={4} sm={3} md={7} lg={9}>
							<div className='text-right'>
								<Navbar.Text className={classes.navbarText}>
									<a href='/glygen' className={classes.navbarText}>
										<span>
											<PersonIcon />
										</span>{' '}
										MY GLYGEN
									</a>
								</Navbar.Text>
							</div>
						</Col>
						<Col xs={5} sm={3} md={2} lg={1}>
							<div className=' text-right mr-sm-4'>
								<Navbar.Text>
									<a
										href='https://beta.glygen.org/'
										target='_blank'
										rel='noopener noreferrer'
										className={classes.navbarText}>
										<span>
											<DeveloperBoardIcon />
										</span>{' '}
										BETA TESTING
									</a>
								</Navbar.Text>{' '}
							</div>
						</Col>
						<Col xs={3} sm={6} md={3} lg={2}>
							<div className='text-right mt-sm-2 ml-lg-5 pl-sm-2'>
								<a
									href='https://www.youtube.com/channel/UCqfvlu86I7n71iqCG5yx8bg/'
									target='_blank'
									rel='noopener noreferrer'
									className={classes.navbarText}>
									<YouTubeIcon className='mr-sm-3' />
								</a>
								<a
									href='https://twitter.com/gly_gen'
									target='_blank'
									rel='noopener noreferrer'
									className={classes.navbarText}>
									<TwitterIcon className='mr-sm-3' />
								</a>
								<a
									href='https://github.com/glygener'
									target='_blank'
									rel='noopener noreferrer'
									className={classes.navbarText}>
									<GitHubIcon className='mr-sm-3' />
								</a>
							</div>
						</Col>
					</Row>
				</Container>
			</Navbar>
			<Navbar className='gg-blue' expand='xl'>
				<Col sm={'auto'}>
					<Navbar.Brand href='/home'>
						<img src={logo} alt='Glygen' />
					</Navbar.Brand>
				</Col>
				<Navbar.Toggle
					aria-controls='basic-navbar-nav'
					className='navbar-dark'
				/>
				<Navbar.Collapse className='gg-blue' id='basic-navbar-nav'>
					<Col>
						<Nav>
							<Nav.Link href='/home'>HOME</Nav.Link>
							<NavDropdown title='EXPLORE' id='basic-nav-dropdown'>
								<NavDropdown.Item href='/glycan-search'>
									Glycan Search
								</NavDropdown.Item>
								<NavDropdown.Item href='/protein-search'>
									Protein Search
								</NavDropdown.Item>
								<NavDropdown.Item href='/enzyme-search'>
									Enzyme Search
								</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link href='/quick-search'>QUICK&nbsp;SEARCH</Nav.Link>
							<Nav.Link href='/try-me'>TRY&nbsp;ME</Nav.Link>
							<NavDropdown title='DATA' id='basic-nav-dropdown'>
								<NavDropdown.Item
									href='https://data.glygen.org/'
									target='_blank'
									rel='noopener noreferrer'>
									Data
								</NavDropdown.Item>
								<NavDropdown.Item
									href='https://api.glygen.org/'
									target='_blank'
									rel='noopener noreferrer'>
									API
								</NavDropdown.Item>
								<NavDropdown.Item
									href='https://sparql.glygen.org/'
									target='_blank'
									rel='noopener noreferrer'>
									SPARQL
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title='HELP' id='basic-nav-dropdown'>
								<NavDropdown.Item href='/about'>About</NavDropdown.Item>
								<NavDropdown.Item href='/contact-us'>
									Contact Us
								</NavDropdown.Item>
								<NavDropdown.Item href='/feedback'>Feedback</NavDropdown.Item>
								<NavDropdown.Item href='/how-to-cite'>
									How to Cite
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown title='MORE' id='basic-nav-dropdown'>
								<NavDropdown.Item href='/media'>Media</NavDropdown.Item>
								<NavDropdown.Item href='/resources'>Resources</NavDropdown.Item>
								<NavDropdown.Item href='/frameworks'>
									Frameworks
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Col>
					<Col md={'auto'}>
						<div className={classes.search}>
							<IconButton aria-label='search'>
								<SearchIcon style={{ color: '#fff' }} />
							</IconButton>
							<InputBase
								placeholder='Search…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
					</Col>
				</Navbar.Collapse>
			</Navbar>
		</React.Fragment>
	);
}

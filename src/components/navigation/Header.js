import React from 'react';
import logo from '../../images/glygen_logos/glygen-logoW.svg';
import {
	// Form,
	NavDropdown,
	Navbar,
	Nav
	// FormControl,
	// Button
} from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
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
			width: 140,
			'&:focus': {
				width: 200
			}
		}
	}
}));

export default function Header() {
	const classes = useStyles();
	return (
		// const Header = () => (
		<React.Fragment>
			<Navbar className='gg-blue' expand='xl'>
				<Navbar.Brand href='#home'>
					<img src={logo} alt='Glygen' className='d-inline-block align-top' />
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='basic-navbar-nav'
					className='navbar-dark'
				/>
				<Navbar.Collapse className='gg-blue' id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Nav.Link href='#home'>HOME</Nav.Link>
						<NavDropdown title='EXPLORE' id='basic-nav-dropdown'>
							<NavDropdown.Item href='/glycan_search'>
								Glycan Search
							</NavDropdown.Item>
							<NavDropdown.Item href='/protein_search'>
								Protein Search
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link href='/quick_search'>QUICK&nbsp;SEARCH</Nav.Link>
						<Nav.Link href='/try_me'>TRY&nbsp;ME</Nav.Link>
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
							<NavDropdown.Item href='/contact_us'>Contact Us</NavDropdown.Item>
							<NavDropdown.Item href='/feedback'>Feedback</NavDropdown.Item>
							<NavDropdown.Item href='/how_to_cite'>
								How to Cite
							</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title='MORE' id='basic-nav-dropdown'>
							<NavDropdown.Item href='/media'>Media</NavDropdown.Item>
							<NavDropdown.Item href='/resources'>Resources</NavDropdown.Item>
							<NavDropdown.Item href='/frameworks'>Frameworks</NavDropdown.Item>
						</NavDropdown>
						{/* <Form inline>
							<FormControl
								type='text'
								placeholder='Search...'
								className='mr-sm-0 ml-sm-1'
							/>
							<Button variant='light'>
								<SearchIcon />
							</Button>
						</Form> */}
					</Nav>
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
					<Nav className='justify-content-end'>
						{/* <Nav.Link href='/glygen'>Beta Testing</Nav.Link> */}

						<Nav.Link href='/glygen'>
							<span>
								<PersonIcon />
							</span>{' '}
							MY GLYGEN
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</React.Fragment>
	);
}
// export default Header;

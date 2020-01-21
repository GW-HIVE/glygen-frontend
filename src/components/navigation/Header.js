import React from 'react';
import './Header.css';
import logo from '../../images/glygen_logos/glygen-logoW.svg';
import {
	Form,
	NavDropdown,
	Navbar,
	Nav,
	FormControl,
	Button
} from 'react-bootstrap';

const Header = () => (
	<React.Fragment>
		<Navbar className='gg-bg-blue' expand='lg'>
			<Navbar.Brand href='#home'>
				<img src={logo} alt='Glygen' className='d-inline-block align-top' />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse className='gg-bg-blue' id='basic-navbar-nav'>
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
					<Nav.Link href='/data'>DATA</Nav.Link>
					<NavDropdown title='HELP' id='basic-nav-dropdown'>
						<NavDropdown.Item href='/about'>About</NavDropdown.Item>
						<NavDropdown.Item href='/contact_us'>Contact Us</NavDropdown.Item>
						<NavDropdown.Item href='/feedback'>Feedback</NavDropdown.Item>
						<NavDropdown.Item href='/how_to_cite'>How to Cite</NavDropdown.Item>
					</NavDropdown>
					<NavDropdown title='MORE' id='basic-nav-dropdown'>
						<NavDropdown.Item href='/media'>Media</NavDropdown.Item>
						<NavDropdown.Item href='/resources'>Resources</NavDropdown.Item>
						<NavDropdown.Item href='/frameworks'>Frameworks</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<FormControl
						type='text'
						placeholder='Search...'
						className='mr-sm-2'
					/>
					&nbsp;
					<Button variant='outline-light'>Search</Button>
				</Form>
				<Nav className='justify-content-end'>
					<Nav.Link href='/glygen'>Beta Testing</Nav.Link>
					<Nav.Link href='/glygen'>MY GLYGEN</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	</React.Fragment>
);

export default Header;

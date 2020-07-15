import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import logo from "../../images/glygen_logos/glygen-logoW.svg";
import { Link, NavLink } from "react-router-dom";
import { NavDropdown, Navbar, Nav, Row, Col } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import Container from "@material-ui/core/Container";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import GlobalSearchControl from "../search/GlobalSearchControl";
import UserTrackingBanner from "../alert/UserTrackingBanner";

import Button from 'react-bootstrap/Button';
import { logID, doNotLog, tracking } from "../../data/logging";

import {
	GLYGEN_API,
	GLYGEN_BETA,
	GLYGEN_DATA,
	GLYGEN_SPARQL,
	GLYGEN_ENV
} from "../../envVariables";
import routeConstants from "../../data/json/routeConstants.json";

const useStyles = makeStyles((theme) => ({
	navbarText: {
		color: "#2f78b7 !important",
		fontWeight: "600",
		"&:hover": {
			color: "#57affa !important",
		},
	},
}));

export default function Header(props) {
	const classes = useStyles();
		return (
		<React.Fragment>
			<CssBaseline />
			<UserTrackingBanner {...props} />
			<Navbar className="gg-top-header" expand="xl">
				<Container maxWidth="xl">
					<Row className="justify-content-end">
						<div className="mr-4">
							<Navbar.Text
								as={Link}
								to={routeConstants.privacySettings}
								className={classes.navbarText}>
								<span>
									<PersonIcon />
								</span>{" "}
								MY GLYGEN
							</Navbar.Text>
						</div>
						{GLYGEN_ENV !== "beta" && (
							<div className="mr-4">
								<Navbar.Text>
									<a
										href={GLYGEN_BETA}
										target="_blank"
										rel="noopener noreferrer"
										className={classes.navbarText}>
										<span>
											<DeveloperBoardIcon />
										</span>{" "}
										BETA TESTING
									</a>
								</Navbar.Text>{" "}
							</div>
						)}
						<div>
							<Navbar.Text>
								<a
									href="https://twitter.com/gly_gen"
									target="_blank"
									rel="noopener noreferrer"
									className={classes.navbarText}>
									<TwitterIcon className="mr-3" />
								</a>
								<a
									href="https://www.youtube.com/channel/UCqfvlu86I7n71iqCG5yx8bg/"
									target="_blank"
									rel="noopener noreferrer"
									className={classes.navbarText}>
									<YouTubeIcon className="mr-3" />
								</a>
								<a
									href="https://github.com/glygener"
									target="_blank"
									rel="noopener noreferrer"
									className={classes.navbarText}>
									<GitHubIcon className="mr-3" />
								</a>
							</Navbar.Text>
						</div>
					</Row>
				</Container>
			</Navbar>

			<Navbar className="gg-blue" expand="xl">
				<Col xs={"auto"}>
					<Navbar.Brand as={Link} to={routeConstants.home}>
						<img src={logo} alt="Glygen" className="logo-nav" />
					</Navbar.Brand>
				</Col>
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					className="navbar-dark"
				/>
				<Navbar.Collapse className="gg-blue" id="basic-navbar-nav">
					<Col>
						<Nav>
							<Nav.Link
								className="gg-nav-link"
								as={NavLink}
								to={routeConstants.home}>
								HOME
							</Nav.Link>
							<NavDropdown
								className="gg-dropdown-navbar"
								title="EXPLORE"
								id="basic-nav-dropdown">
								<NavDropdown.Item as={NavLink} to={routeConstants.glycanSearch}>
									Glycan Search
								</NavDropdown.Item>
								<NavDropdown.Item
									as={NavLink}
									to={routeConstants.proteinSearch}>
									Protein Search
								</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link
								className="gg-nav-link"
								as={NavLink}
								to={routeConstants.quickSearch}>
								QUICK&nbsp;SEARCH
							</Nav.Link>
							<Nav.Link
								className="gg-nav-link"
								as={NavLink}
								to={routeConstants.tryMe}
								// href='#try-me'
							>
								TRY&nbsp;ME
							</Nav.Link>
							<NavDropdown
								className="gg-dropdown-navbar"
								title="DATA"
								id="basic-nav-dropdown">
								<NavDropdown.Item
									href={GLYGEN_DATA}
									target="_blank"
									rel="noopener noreferrer">
									Data
								</NavDropdown.Item>
								<NavDropdown.Item
									href={GLYGEN_API}
									target="_blank"
									rel="noopener noreferrer">
									API
								</NavDropdown.Item>
								<NavDropdown.Item
									href={GLYGEN_SPARQL}
									target="_blank"
									rel="noopener noreferrer">
									SPARQL
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown
								className="gg-dropdown-navbar"
								title="HELP"
								id="basic-nav-dropdown">
								<NavDropdown.Item as={NavLink} to={routeConstants.about}>
									About
								</NavDropdown.Item>
								<NavDropdown.Item as={NavLink} to={routeConstants.contactUs}>
									Contact Us
								</NavDropdown.Item>
								<NavDropdown.Item as={NavLink} to={routeConstants.feedback}>
									Feedback
								</NavDropdown.Item>
								<NavDropdown.Item as={NavLink} to={routeConstants.howToCite}>
									How to Cite
								</NavDropdown.Item>
							</NavDropdown>
							<NavDropdown
								className="gg-dropdown-navbar"
								title="MORE"
								id="basic-nav-dropdown">
								<NavDropdown.Item as={NavLink} to={routeConstants.media}>
									Media
								</NavDropdown.Item>
								<NavDropdown.Item as={NavLink} to={routeConstants.resources}>
									Resources
								</NavDropdown.Item>
								<NavDropdown.Item as={NavLink} to={routeConstants.frameworks}>
									Frameworks
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Col>
					<Col md={3}>
						<GlobalSearchControl />
					</Col>
				</Navbar.Collapse>
			</Navbar>
		</React.Fragment>
	);
}

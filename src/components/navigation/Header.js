import React from "react";
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
import { useLocation } from "react-router-dom";
import { ReactComponent as MediaWikiIcon } from "../../images/icons/mediaWikiIcon.svg";

import {
  GLYGEN_API,
  GLYGEN_BETA,
  GLYGEN_DATA,
  GLYGEN_SPARQL,
  GNOME_BROWSER,
  GLYCOMOTIF_WIKI,
  GLYGEN_SANDBOX,
  GLYGEN_ENV,
  GLYCAN_SEQ_LOOKUP,
} from "../../envVariables";
import routeConstants from "../../data/json/routeConstants.json";
import betaWatermarkImg from "../../images/icons/beta-watermark.svg";

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
  const location = useLocation();

  return (
    <React.Fragment>
      <CssBaseline />
      <UserTrackingBanner {...props} />

      <Navbar
        className="gg-top-header"
        expand="xl"
        style={
          GLYGEN_ENV === "beta"
            ? {
                backgroundImage: `url(${betaWatermarkImg})`,
                backgroundRepeat: "space",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <Container maxWidth="xl">
          <Row className="justify-content-end">
            <div className="mr-4">
              <Link to={routeConstants.privacySettings} className={classes.navbarText}>
                <span>
                  <PersonIcon />
                </span>{" "}
                MY GLYGEN
              </Link>
            </div>
            {GLYGEN_ENV !== "beta" && (
              <div className="mr-4">
                <a
                  href={GLYGEN_BETA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.navbarText}
                >
                  <span>
                    <DeveloperBoardIcon />
                  </span>{" "}
                  BETA TESTING
                </a>{" "}
              </div>
            )}
            <div>
              <a
                href="https://twitter.com/gly_gen"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.navbarText}
              >
                <TwitterIcon className="mr-3" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCqfvlu86I7n71iqCG5yx8bg/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.navbarText}
              >
                <YouTubeIcon className="mr-3" />
              </a>
              <a
                href="https://github.com/glygener"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.navbarText}
              >
                <GitHubIcon className="mr-3" />
              </a>
              <a
                href="https://wiki.glygen.org/index.php/Main_Page"
                target="_blank"
                rel="noopener noreferrer"
                className="media-wiki-icon"
              >
                <MediaWikiIcon className="mr-3" />
              </a>
            </div>
          </Row>
        </Container>
      </Navbar>

      <Navbar className="gg-blue" expand="xl">
        <Navbar.Brand as={Link} to={routeConstants.home}>
          <img src={logo} alt="Glygen" className="logo-nav" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark" />
        <Navbar.Collapse className="gg-blue" id="basic-navbar-nav">
          <Col xs={12} sm={12} md={12} lg={12} xl={8} className="mr-3">
            <Nav>
              <Nav.Link className="gg-nav-link" as={NavLink} to={routeConstants.home}>
                HOME
              </Nav.Link>
              <NavDropdown
                className={
                  location.pathname.includes(routeConstants.glycanSearch) ||
                  location.pathname.includes(routeConstants.proteinSearch) ||
                  location.pathname.includes(routeConstants.siteSearch) ||
                  location.pathname.includes(routeConstants.superSearch) ||
                  location.pathname === routeConstants.motifList
                    ? "gg-dropdown-navbar gg-dropdown-navbar-active"
                    : "gg-dropdown-navbar"
                }
                title="EXPLORE"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={NavLink} to={routeConstants.glycanSearch}>
                  Glycan Search
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={routeConstants.proteinSearch}>
                  Protein Search
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={routeConstants.siteSearch}>
                  Site Search
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={routeConstants.superSearch}>
                  Super Search
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={routeConstants.motifList}>
                  List of Motifs
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="gg-nav-link" as={NavLink} to={routeConstants.quickSearch}>
                QUICK&nbsp;SEARCH
              </Nav.Link>
              <Nav.Link className="gg-nav-link" as={NavLink} to={routeConstants.tryMe}>
                TRY&nbsp;ME
              </Nav.Link>
              <NavDropdown className="gg-dropdown-navbar" title="DATA" id="basic-nav-dropdown">
                <NavDropdown.Item href={GLYGEN_DATA} target="_blank" rel="noopener noreferrer">
                  Data
                </NavDropdown.Item>
                <NavDropdown.Item href={GLYGEN_API} target="_blank" rel="noopener noreferrer">
                  API
                </NavDropdown.Item>
                <NavDropdown.Item href={GLYGEN_SPARQL} target="_blank" rel="noopener noreferrer">
                  SPARQL
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                className={
                  location.pathname === routeConstants.idMapping
                    ? "gg-dropdown-navbar gg-dropdown-navbar-active"
                    : "gg-dropdown-navbar"
                }
                title="TOOLS"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href={GLYCOMOTIF_WIKI} target="_blank" rel="noopener noreferrer">
                  GlycoMotif Wiki
                </NavDropdown.Item>
                <NavDropdown.Item href={GLYGEN_SANDBOX} target="_blank" rel="noopener noreferrer">
                  GlyGen SandBox
                </NavDropdown.Item>
                <NavDropdown.Item href={GNOME_BROWSER} target="_blank" rel="noopener noreferrer">
                  GNOME Subsumption Browser
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={routeConstants.idMapping}>
                  GlyGen Mapper
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={GLYCAN_SEQ_LOOKUP}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Glycan Sequence Lookup
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                className={
                  location.pathname === routeConstants.about ||
                  location.pathname === routeConstants.contactUs ||
                  location.pathname === routeConstants.feedback ||
                  location.pathname === routeConstants.howToCite
                    ? "gg-dropdown-navbar gg-dropdown-navbar-active"
                    : "gg-dropdown-navbar"
                }
                title="HELP"
                id="basic-nav-dropdown"
              >
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
                className={
                  location.pathname === routeConstants.media ||
                  location.pathname === routeConstants.resources ||
                  location.pathname === routeConstants.frameworks
                    ? "gg-dropdown-navbar gg-dropdown-navbar-active"
                    : "gg-dropdown-navbar"
                }
                title="MORE"
                id="basic-nav-dropdown"
              >
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
          <Col xs={12} sm={12} md={12} lg={12} xl={4}>
            <GlobalSearchControl />
          </Col>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
}

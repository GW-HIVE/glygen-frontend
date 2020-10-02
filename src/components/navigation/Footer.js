import React from "react";
import { Link } from "react-router-dom";
// import CssBaseline from "@material-ui/core/CssBaseline";
import logoFooter from "../../images/glygen_logos/glygen-logoW-top.svg";
import ugaLogo from "../../images/univ_logos/logo-uga.svg";
import gwuLogo from "../../images/univ_logos/logo-gwu.svg";
import { Navbar, Col, Image, Row } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import "../../App.css";
import routeConstants from "../../data/json/routeConstants.json";
// import GitHubIcon from "@material-ui/icons/GitHub";
// import YouTubeIcon from "@material-ui/icons/YouTube";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import {
//   GLYGEN_API,
//   GLYGEN_BETA,
//   GLYGEN_DATA,
//   GLYGEN_SPARQL,
//   GLYGEN_ENV,
// } from "../../envVariables";

const useStyles = makeStyles((theme) => ({
  navbarText: {
    color: "#fff !important",
  },
  link: {
    color: "#afd9fd !important",
    "&:hover": {
      color: "#57affa !important",
    },
  },
  univLogo: {
    padding: "10px",
  },
  footerUnivLogo: {
    padding: "20px 20px 20px 0",
  },
  icons: {
    color: "#2f78b7 !important",
    fontWeight: "600",
    "&:hover": {
      color: "#57affa !important",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      {/* <div
        className="footer-color gg-align-center gg-footer"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <Container maxWidth="xl" className="justify-content-center">
          <Row className="text-center justify-content-center">
         
            <Col md={"auto"} className="text-left">
              <h6 className="text-uppercase">Get Started</h6>
              <div>
                <Link to={routeConstants.glycanSearch}>Glycan Search</Link>
              </div>
              <div>
                <Link to={routeConstants.proteinSearch}>Protein&nbsp;Search</Link>
              </div>
              <div>
                <Link to={routeConstants.quickSearch}>Quick&nbsp;Search</Link>
              </div>
              <div>
                <Link to={routeConstants.motifList}>List&nbsp;of&nbsp;Motifs</Link>
              </div>
              <div>
                <Link to={routeConstants.tryMe}>Try&nbsp;Me</Link>
              </div>
            </Col>
         
            <Col md={"auto"} className="text-left">
              <h6 className="text-uppercase">Data</h6>
              <div>
                <a href={GLYGEN_DATA} target="_blank" rel="noopener noreferrer">
                  Data
                </a>
              </div>
              <div>
                <a href={GLYGEN_API} target="_blank" rel="noopener noreferrer">
                  API
                </a>
              </div>
              <div>
                <a href={GLYGEN_SPARQL} target="_blank" rel="noopener noreferrer">
                  SPARQL
                </a>
              </div>
            </Col>
       
            <Col md={"auto"} className="text-left">
              <h6 className="text-uppercase">My GlyGen</h6>
              <div>
                <Link to={routeConstants.license}>License</Link>
              </div>
              <div>
                <Link to={routeConstants.privacyPolicy}>Privacy&nbsp;Policy</Link>
              </div>
              <div>
                <Link to={routeConstants.disclaimer}>Disclaimer</Link>
              </div>
              <div>
                <Link to={routeConstants.contactUs}>Contact Us</Link>
              </div>
            </Col>
        
            <Col md={"auto"} className="text-left">
              <h6 className="text-uppercase">Resources</h6>
            </Col>
            
            <Col md={"auto"} className="text-left">
              <div>
                <a
                  href="https://twitter.com/gly_gen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.icons}
                >
                  <TwitterIcon className="mr-3" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCqfvlu86I7n71iqCG5yx8bg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.icons}
                >
                  <YouTubeIcon className="mr-3" />
                </a>
                <a
                  href="https://github.com/glygener"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.icons}
                >
                  <GitHubIcon className="mr-3" />
                </a>
              </div>
              <div>
                <a href="https://www.ccrc.uga.edu/" target="_blank" rel="noopener noreferrer">
                  <Image src={ugaLogo} className={classes.footerUnivLogo} />
                </a>
                <a href="https://smhs.gwu.edu/" target="_blank" rel="noopener noreferrer">
                  <Image src={gwuLogo} className={classes.footerUnivLogo} />
                </a>
              </div>
            </Col>
          </Row>
          <Row className="text-center justify-content-center">
            <Col md={"auto"}>
              <Navbar.Brand href={routeConstants.home}>
                <img
                  href={routeConstants.home}
                  src={logoFooter}
                  alt="Glygen"
                  className="justify-content-center"
                />
              </Navbar.Brand>
            </Col>
            <Box display="flex" alignItems="center" className="box-footer">
              <Col md={"auto"}>
                <Navbar.Text>
                  GlyGen is supported and funded by the{" "}
                  <a
                    href="https://commonfund.nih.gov/glycoscience"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NIH Glycoscience Common Fund Program
                  </a>
                </Navbar.Text>
              </Col>
            </Box>
            <Box display="flex" alignItems="center" className="box-footer">
              <Col md={"auto"}>
                <Navbar.Text>
                  Under the grant #{" "}
                  <a
                    href="https://projectreporter.nih.gov/project_info_details.cfm?aid=9391499&icde=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    1U01GM125267&nbsp;-&nbsp;01
                  </a>
                </Navbar.Text>
              </Col>
            </Box>
          </Row>
        </Container>
      </div> */}

      <div className="gg-blue gg-align-center gg-footer">
        <Container maxWidth="xl" className="justify-content-center">
          <Row className="text-center justify-content-center">
            <Col md={"auto"}>
              <Navbar.Brand href={routeConstants.home}>
                <img
                  href={routeConstants.home}
                  src={logoFooter}
                  alt="Glygen"
                  className="justify-content-center"
                />
              </Navbar.Brand>
            </Col>
            <Box display="flex" alignItems="center" className="box-footer">
              <Col md={"auto"}>
                <Navbar.Text
                  as={Link}
                  to={routeConstants.license}
                  className={classes.link}
                  style={{ marginRight: "15px" }}
                >
                  License
                </Navbar.Text>{" "}
                <Navbar.Text
                  as={Link}
                  to={routeConstants.privacyPolicy}
                  className={classes.link}
                  style={{ marginRight: "15px" }}
                >
                  Privacy&nbsp;Policy
                </Navbar.Text>{" "}
                <Navbar.Text
                  as={Link}
                  to={routeConstants.disclaimer}
                  className={classes.link}
                  style={{ marginRight: "15px" }}
                >
                  Disclaimer
                </Navbar.Text>{" "}
                <Navbar.Text
                  as={Link}
                  to={routeConstants.contactUs}
                  className={classes.link}
                  style={{ marginRight: "15px" }}
                >
                  Contact Us
                </Navbar.Text>{" "}
              </Col>
            </Box>
            <Box display="flex" alignItems="center" className="box-footer">
              <Col md={"auto"}>
                <Navbar.Text className={classes.navbarText}>
                  Funded by{" "}
                  <a
                    href="https://commonfund.nih.gov/glycoscience"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    NIH Glycoscience Common Fund
                  </a>
                </Navbar.Text>
              </Col>
            </Box>
            <Box display="flex" alignItems="center" className="box-footer">
              <Col md={"auto"}>
                <Navbar.Text className={classes.navbarText}>
                  Grant #{" "}
                  <a
                    href="https://projectreporter.nih.gov/project_info_details.cfm?aid=9391499&icde=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    1U01GM125267&nbsp;-&nbsp;01
                  </a>
                </Navbar.Text>
              </Col>
            </Box>
            <Col
              // xs={"auto"}
              // sm={"auto"}
              md={"auto"}
              className="gg-align-middle gg-align-center"
            >
              <a href="https://www.ccrc.uga.edu/" target="_blank" rel="noopener noreferrer">
                <Image src={ugaLogo} className={classes.univLogo} />
              </a>
              <a href="https://smhs.gwu.edu/" target="_blank" rel="noopener noreferrer">
                <Image src={gwuLogo} className={classes.univLogo} />
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

import React from "react";
import Container from "@material-ui/core/Container";
import { Row, Col } from "react-bootstrap";
import VerticalHeading from "../../components/headings/VerticalHeading";
import "../../css/Media.css";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { autoPlay } from "react-swipeable-views-utils";
import Iframe from "react-iframe";
import beilstein2019Pdf from "../../images/media/slides/3-Beilstein_symposium-GlyGen-2019.06.27.pdf";
import sfg2018Pdf from "../../images/media/slides/4-GlyGen-sfg2018.pdf";
import warrenWorkshopPdf from "../../images/media/slides/5-glygen-warren-workshop.pdf";
import lifeScience2018Pdf from "../../images/media/slides/6-Life_science_workshop-GlyGen-2018.03.05.pdf";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

const OurTalks = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	const vertHeadTalks = {
		h5VerticalText: "What we do",
		h2textTopStrongBefore: "Talks",
		h2textBottom: "About GlyGen",
	};
	return (
		<React.Fragment>
			<Container maxWidth="lg">
				<VerticalHeading post={vertHeadTalks} />
			</Container>
			<section className="content-box-md about-section-bg">
				<Container maxWidth="lg">
					<Row className="gg-align-middle gg-align-center">
						<div className={classes.root}>
							<Row>
								<Col xs={12}>
									<Tabs
										className="materials-tabs"
										value={value}
										onChange={handleChange}
										indicatorColor="primary"
										textColor="primary"
										centered
										aria-label="full width tabs example">
										<Tab label="Beilstein Symposium" {...a11yProps(0)} />
										<Tab label="SFG" {...a11yProps(1)} />
										<Tab label="Warren Workshop" {...a11yProps(2)} />
										<Tab label="Life Science Workshop" {...a11yProps(3)} />
									</Tabs>
								</Col>
							</Row>
							<Container maxWidth="md">
								<AutoPlaySwipeableViews
									axis={theme.direction === "rtl" ? "x-reverse" : "x"}
									index={value}
									onChangeIndex={handleChangeIndex}>
									<TabPanel value={value} index={0} dir={theme.direction}>
										<div className="materials">
											<Row>
												<Col md={6}>
													<Iframe
														src="//www.slideshare.net/slideshow/embed_code/key/kQoygEJTH5G2n1"
														width="432"
														height="380"
														frameborder="0"
														marginwidth="0"
														marginheight="0"
														scrolling="no"
														style={{
															border: "1px solid #CCC",
															borderWidth: "1px",
															marginBottom: "5px",
															maxWidth: "100%",
														}}
														allowfullscreen>
														{" "}
													</Iframe>
													<div
														className="text-center"
														style={{ marginBottom: "5px" }}>
														{" "}
														<strong>
															{" "}
															<a
																href="//www.slideshare.net/GlyGen/glygen-beilstein-symposium"
																title="GlyGen Beilstein symposium"
																target="_blank"
																rel="noopener noreferrer">
																GlyGen Beilstein Symposium
															</a>{" "}
														</strong>{" "}
														from{" "}
														<strong>
															<a
																href="//www.slideshare.net/GlyGen"
																target="_blank"
																rel="noopener noreferrer">
																GlyGen
															</a>
														</strong>{" "}
													</div>
												</Col>
												<Col md={6}>
													<div className="tab-bg">
														<h2>01</h2>
														<h3>Beilstein Symposium.</h3>
														<p>
															Beilstein Glyco-Bioinformatics Symposium, Limburg,
															Germany.
															<br />
															<span>
																<i>by Rene Ranzinger, June 2019</i>
															</span>
														</p>
														<div>
															<a
																className="btn btn-general btn-blue"
																role="button"
																href={beilstein2019Pdf}
																download="GlyGen-Beilstein-symposium.pdf">
																DOWNLOAD
															</a>
														</div>
													</div>
												</Col>
											</Row>
										</div>
									</TabPanel>
									<TabPanel value={value} index={1} dir={theme.direction}>
										<div className="materials">
											<Row>
												<Col md={6}>
													<Iframe
														src="//www.slideshare.net/slideshow/embed_code/key/wZN06HVHyNPxoV"
														width="432"
														height="380"
														frameborder="0"
														marginwidth="0"
														marginheight="0"
														scrolling="no"
														style={{
															border: "1px solid #CCC",
															borderWidth: "1px",
															marginBottom: "5px",
															maxWidth: "100%",
														}}
														allowfullscreen>
														{" "}
													</Iframe>
													<div
														className="text-center"
														style={{ marginBottom: "5px" }}>
														{" "}
														<strong>
															{" "}
															<a
																href="//www.slideshare.net/GlyGen/glygen-sfg-glycobioinformatics-satellite-meeting"
																title="GlyGen sfg Glyco-Bioinformatics satellite meeting"
																target="_blank"
																rel="noopener noreferrer">
																Glyco-Bioinformatics Satellite Meeting
															</a>{" "}
														</strong>{" "}
														from{" "}
														<strong>
															<a
																href="//www.slideshare.net/GlyGen"
																target="_blank"
																rel="noopener noreferrer">
																GlyGen
															</a>
														</strong>{" "}
													</div>
												</Col>
												<Col md={6}>
													<div className="tab-bg">
														<h2>02</h2>
														<h3>SFG Bioinformatics Satellite.</h3>
														<p>
															SFG Glyco-Bioinformatics satellite meeting, New
															Orleans, USA.
															<br />
															<span>
																<i>
																	by Will York and Raja Mazumder, November 2018
																</i>
															</span>
														</p>
														<div>
															<a
																className="btn btn-general btn-blue"
																role="button"
																href={sfg2018Pdf}
																download="GlyGen-sfg.pdf">
																DOWNLOAD
															</a>
														</div>
													</div>
												</Col>
											</Row>
										</div>
									</TabPanel>
									<TabPanel value={value} index={2} dir={theme.direction}>
										<div className="materials">
											<Row>
												<Col md={6}>
													<Iframe
														src="//www.slideshare.net/slideshow/embed_code/key/2KjesVIioyX0s4"
														width="432"
														height="380"
														frameborder="0"
														marginwidth="0"
														marginheight="0"
														scrolling="no"
														style={{
															border: "1px solid #CCC",
															borderWidth: "1px",
															marginBottom: "5px",
															maxWidth: "100%",
														}}
														allowfullscreen>
														{" "}
													</Iframe>
													<div
														className="text-center"
														style={{ marginBottom: "5px" }}>
														{" "}
														<strong>
															{" "}
															<a
																href="//www.slideshare.net/GlyGen/glygen-warren-workshop"
																title="GlyGen Warren Workshop in Boston"
																target="_blank"
																rel="noopener noreferrer">
																GlyGen Warren Workshop in Boston
															</a>{" "}
														</strong>{" "}
														from{" "}
														<strong>
															<a
																href="//www.slideshare.net/GlyGen"
																target="_blank"
																rel="noopener noreferrer">
																GlyGen
															</a>
														</strong>{" "}
													</div>
												</Col>
												<Col md={6}>
													<div className="tab-bg">
														<h2>03</h2>
														<h3>GlyGen Warren Workshop VII.</h3>
														<p>
															GlyGen Warren Workshop VII in Boston, MA, USA.
															<br />
															<span>
																<i>by Will York, August 2018</i>
															</span>
														</p>
														<div>
															<a
																className="btn btn-general btn-blue"
																role="button"
																href={warrenWorkshopPdf}
																download="GlyGen-warren-workshop.pdf">
																DOWNLOAD
															</a>
														</div>
													</div>
												</Col>
											</Row>
										</div>
									</TabPanel>
									<TabPanel value={value} index={3} dir={theme.direction}>
										<div className="materials">
											<Row>
												<Col md={6}>
													<Iframe
														src="//www.slideshare.net/slideshow/embed_code/key/BMDHYFxPzJdamF"
														width="432"
														height="380"
														frameborder="0"
														marginwidth="0"
														marginheight="0"
														scrolling="no"
														style={{
															border: "1px solid #CCC",
															borderWidth: "1px",
															marginBottom: "5px",
															maxWidth: "100%",
														}}
														allowfullscreen>
														{" "}
													</Iframe>
													<div
														className="text-center"
														style={{ marginBottom: "5px" }}>
														{" "}
														<strong>
															{" "}
															<a
																href="//www.slideshare.net/GlyGen/glygen-life-science-workshop"
																title="GlyGen Life Science Workshop"
																target="_blank"
																rel="noopener noreferrer">
																GlyGen Life Science Workshop
															</a>{" "}
														</strong>{" "}
														from{" "}
														<strong>
															<a
																href="//www.slideshare.net/GlyGen"
																target="_blank"
																rel="noopener noreferrer">
																GlyGen
															</a>
														</strong>{" "}
													</div>
												</Col>
												<Col md={6}>
													<div className="tab-bg">
														<h2>04</h2>
														<h3>GlyGen Life Science Workshop.</h3>
														<p>
															GlyGen Life Science Workshop, Tokyo, Japan.
															<br />
															<span>
																<i>by Rene Ranzinger, March 2018</i>
															</span>
														</p>
														<div>
															<a
																className="btn btn-general btn-blue"
																role="button"
																href={lifeScience2018Pdf}
																download="GlyGen-Life-science-workshop.pdf">
																DOWNLOAD
															</a>
														</div>
													</div>
												</Col>
											</Row>
										</div>
									</TabPanel>
								</AutoPlaySwipeableViews>
							</Container>
						</div>
					</Row>
				</Container>
			</section>
		</React.Fragment>
	);
};
export default OurTalks;

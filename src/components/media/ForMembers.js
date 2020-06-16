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
import generalSlidesPptx from "../../images/media/slides/pptx/GlyGen-general-slides.pptx";
import oneSlidePptx from "../../images/media/slides/pptx/GlyGen-one-slide.pptx";
import slidesTemplatePptx from "../../images/media/slides/pptx/GlyGen-slides-template.pptx";
import letterTemplateSvg from "../../images/media/portfolio/letter-template/letter-template.svg";
import letterTemplateDocx from "../../images/media/portfolio/letter-template/letter-template.docx";
import letterTemplate2Svg from "../../images/media/portfolio/letter-template/letter-template-2.svg";
import letterTemplate2Docx from "../../images/media/portfolio/letter-template/letter-template-2.docx";

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

const ForMembers = (props) => {
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
		h5VerticalText: "Materials",
		h2textTop: "For GlyGen",
		h2textBottomStrongBefore: "Members",
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
										<Tab label="General" {...a11yProps(0)} />
										<Tab label="One Slide" {...a11yProps(1)} />
										<Tab label="Template" {...a11yProps(2)} />
										<Tab label="Letter Template" {...a11yProps(3)} />
										<Tab label="Letter Template 2" {...a11yProps(4)} />
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
														src="//www.slideshare.net/slideshow/embed_code/key/sGtDp6L5n6Dw6S"
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
																href="//www.slideshare.net/GlyGen/about-glygen-slides-235063199"
																title="About GlyGen slides"
																target="_blank"
																rel="noopener noreferrer">
																About GlyGen slides
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
														<h3>General Presentation About GlyGen.</h3>
														<p>
															Computational and Informatics Resources for
															Glycoscience.
															<br />
															<span>
																<i>
																	by Jeet Vora and Tatiana Williamson, June 2019
																</i>
															</span>
														</p>
														<div>
															<a
																className="btn btn-general btn-blue"
																role="button"
																href={generalSlidesPptx}
																download="GlyGen-general-slides.pptx">
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
														src="//www.slideshare.net/slideshow/embed_code/key/I109rxasAdPHe2"
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
																href="//www.slideshare.net/GlyGen/glygen-one-slide-for-advocates"
																title="GlyGen one slide."
																target="_blank"
																rel="noopener noreferrer">
																GlyGen one slide
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
														<h3>GlyGen One Slide.</h3>
														<p>
															Computational and Informatics Resources for
															Glycoscience.
															<br />
															<span>
																<i>by Jeet Vora, June 2019</i>
															</span>
														</p>
														<div>
															<a
																className="btn btn-general btn-blue"
																role="button"
																href={oneSlidePptx}
																download="GlyGen-one-slide.pptx">
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
														src="//www.slideshare.net/slideshow/embed_code/key/FVrqWtF3Blputk"
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
																href="//www.slideshare.net/GlyGen/glygen-ppt-template-235064806"
																title="GlyGen ppt Template"
																target="_blank"
																rel="noopener noreferrer">
																GlyGen ppt Template
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
														<h3>GlyGen Power Points Template.</h3>
														<p>
															You can use this template to create your own
															presentation.
															<br />
															<span>
																<i>by Tatiana Williamson, June 2019</i>
															</span>
														</p>
														<div>
															<a
																className="btn btn-general btn-blue"
																role="button"
																href={slidesTemplatePptx}
																download="GlyGen-slides-template.pptx">
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
													<img src={letterTemplateSvg} alt="letter template" />
												</Col>
												<Col md={6}>
													<div className="tab-bg">
														<h2>04</h2>
														<h3>Letter Template.</h3>
														<p>
															This is an official GlyGen letter template.
															<br />
															<span>
																<i>by Tatiana Williamson, July 2019</i>
															</span>
														</p>
														<div>
															<a
																className="btn btn-general btn-blue"
																role="button"
																href={letterTemplateDocx}
																download="letter-template.docx">
																DOWNLOAD
															</a>
														</div>
													</div>
												</Col>
											</Row>
										</div>
									</TabPanel>
									<TabPanel value={value} index={4} dir={theme.direction}>
										<div className="materials">
											<Row>
												<Col md={6}>
													<img src={letterTemplate2Svg} alt="letter template" />
												</Col>
												<Col md={6}>
													<div className="tab-bg">
														<h2>04</h2>
														<h3>Letter Template 2.</h3>
														<p>
															This is an official GlyGen letter template.
															<br />
															<span>
																<i>by Tatiana Williamson, July 2019</i>
															</span>
														</p>
														<div>
															<a
																className="btn btn-general btn-blue"
																role="button"
																href={letterTemplate2Docx}
																download="letter-template.docx">
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
export default ForMembers;
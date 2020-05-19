import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import VerticalHeading from "../components/headings/VerticalHeading";
import { Row, Col } from "react-bootstrap";
import RoomIcon from "@material-ui/icons/Room";
import GoogleMap from "../components/contactUs/GoogleMap";
import ContactForm from "../components/contactUs/ContactForm";
import { logActivity } from "../data/logging";

const mapStyles = {
	position: "relative",
	width: "100%",
	height: "350px",
	paddingLeft: "15px",
};

const ContactUs = (props) => {
	const vertHeadContactUs = {
		h5VerticalText: "MESSAGES",
		// h5VerticalText: 'WHO WE ARE',
		h2textTop: "Get",
		h2textBottom: "In",
		h2textBottomStrongAfter: "Touch",
		pText:
			"We always welcome questions, comments, and suggestions regarging our website and information we provide in general. We will make every effort to respond to you within a reasonable amount of time.",
	};
	useEffect(() => {
		logActivity();
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				{/* <title>{head.contactUs.title}</title>
				{getMeta(head.contactUs)} */}
				{getTitle("contactUs")}
				{getMeta("contactUs")}
			</Helmet>

			<CssBaseline />
			<Container maxWidth="lg" className="gg-container">
				<Row>
					{/* Contact Left*/}
					<Col sm={12} md={6} lg={6}>
						<VerticalHeading post={vertHeadContactUs} />
						{/* <p>
							We always welcome questions, comments, and suggestions regarding
							our website and information we provide in general. We will make
							every effort to respond to you within a reasonable amount of time.
						</p> */}

						{/* <div> */}
						<Row style={{ paddingTop: "20px" }}>
							<Col sm={12} md={6} lg={6}>
								<h3>
									<span>
										<RoomIcon style={{ fontSize: 30, color: "#444" }} />
									</span>{" "}
									UGA Location
								</h3>
								<h5>University of Georgia</h5>
								<ul className="office-details">
									<li>
										<strong>Complex Carbohydrate Research Center</strong>
									</li>
									<li>315 Riverbend Road Athens,</li>
									<li>Georgia 30602 USA </li>
								</ul>
							</Col>
							<Col sm={12} md={6} lg={6}>
								<h3>
									<span>
										<RoomIcon style={{ fontSize: 30, color: "#444" }} />
									</span>{" "}
									GW Location
								</h3>
								<h5>The George Washington University</h5>
								<ul className="office-details">
									<li>
										<strong>School of Medicine and Health Sciences</strong>
									</li>
									<li>2300 Eye Street N.W.,</li>
									<li>Washington, DC 20037 USA </li>
								</ul>
							</Col>
						</Row>
						{/* </div> */}
					</Col>
					{/* Contact Right */}
					<Col sm={12} md={6} lg={6} className="content-box-md">
						<div className="contact-right">
							<ContactForm />
						</div>
					</Col>
				</Row>
			</Container>
			<Row style={mapStyles}>
				<GoogleMap />
			</Row>
		</React.Fragment>
	);
};
export default ContactUs;

import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Container from "@material-ui/core/Container";
import { Row, Col } from "react-bootstrap";
import OurTalks from "../components/media/OurTalks";
import Portfolio from "../components/media/Portfolio";
import ForMembers from "../components/media/ForMembers";
import { logActivity } from "../data/logging";

const Media = (props) => {
	useEffect(() => {
		logActivity();
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				{getTitle("media")}
				{getMeta("media")}
			</Helmet>

			<CssBaseline />
			{/* <Container maxWidth="lg" className="gg-container"> */}
			<Row>
				<Col sm={12} md={12} lg={12}>
					<OurTalks />
					<Portfolio />
					<ForMembers />
				</Col>
			</Row>
			{/* </Container> */}
		</React.Fragment>
	);
};
export default Media;
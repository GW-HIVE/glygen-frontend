import React from "react";
import Container from "@material-ui/core/Container";
import { Row, Image } from "react-bootstrap";
import VerticalHeading from "../../components/headings/VerticalHeading";
// import ugaImg from "../../images/about/univ-logo/uga.png";
import "../../css/Media.css";

const OurTalks = (props) => {
	const vertHeadTalks = {
		h5VerticalText: "What we do",
		h2textTopStrongBefore: "Talks",
		h2textBottom: "About GlyGen",
	};
	return (
		<React.Fragment>
			{/* University logos */}

			<Container maxWidth="lg">
				<VerticalHeading post={vertHeadTalks} />
			</Container>
			<section className="content-box-md about-section-bg">
				<Container maxWidth="lg">
					<Row className="gg-align-middle gg-align-center">
						{/* University 01 */}
						<div>
							<p>presentations</p>
							{/* <Image
								src={ugaImg}
								className="univ-logo img-responsive"
								alt="uga university logo"
							/> */}
						</div>
					</Row>
				</Container>
			</section>
		</React.Fragment>
	);
};
export default OurTalks;

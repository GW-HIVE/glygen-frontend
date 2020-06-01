import React from "react";
import Container from "@material-ui/core/Container";
import { Row, Image } from "react-bootstrap";
import VerticalHeading from "../../components/headings/VerticalHeading";
// import ugaImg from "../../images/about/univ-logo/uga.png";
import "../../css/Media.css";

const ForMembers = (props) => {
	const vertHeadTalks = {
		h5VerticalText: "Materials",
		h2textTop: "For GlyGen",
		h2textBottomStrongBefore: "Members",
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
export default ForMembers;

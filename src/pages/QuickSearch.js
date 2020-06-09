import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import Container from "@material-ui/core/Container";
import VerticalHeading from "../components/headings/VerticalHeading";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../components/navigation/Sidebar";
import { logActivity } from "../data/logging";
import SearchByGlycan from "../components/quickSearch/SearchByGlycan";
import SearchByProtein from "../components/quickSearch/SearchByProtein";
import SearchBySpecies from "../components/quickSearch/SearchBySpecies";
import SearchByDisease from "../components/quickSearch/SearchByDisease";

const QuickSearch = (props) => {
	const vertHeadQuickSearch = {
		h5VerticalText: "Searches",
		h2textTop: "Perform",
		h2textBottom: "A",
		h2textBottomStrongAfter: "Quick Search",
	};

	const items = [
		{ label: "Search By Glycan", id: "glycan" },
		{ label: "Search By Protein", id: "protein" },
		{ label: "Search By Species", id: "species" },
		{ label: "Search By Disease", id: "disease" },
	];
	useEffect(() => {
		logActivity();
	}, []);

	return (
		<>
			<Helmet>
				{getTitle("quickSearch")}
				{getMeta("quickSearch")}
			</Helmet>

			<div id="top-heading"></div>
			<Row className="gg-baseline5">
				<Col sm={12} md={12} lg={12} xl={3} className="sidebar-col">
					<Sidebar items={items} />
				</Col>
				<Col sm={12} md={12} lg={12} xl={9} className="sidebar-page">
					<Container maxWidth="md">
						<VerticalHeading
							post={vertHeadQuickSearch}
							style={{ margin: "0 auto" }}
						/>
						<SearchByGlycan id="glycan" />
						<SearchByProtein id="protein" />
						<SearchBySpecies id="species" />
						<SearchByDisease id="disease" />
					</Container>
				</Col>
			</Row>
			{/* </Container> */}
		</>
	);
};
export default QuickSearch;

// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useEffect } from "react";
// import Helmet from "react-helmet";
// import { getTitle, getMeta } from "../utils/head";
// import Sidebar from "../components/navigation/Sidebar";
// import { logActivity } from "../data/logging";
// import HorHeadQuickSearch from "../components/headings/HorizontalHeading";

// import { Col, Row } from "react-bootstrap";

// import FeedbackWidget from "../components/FeedbackWidget";

// const QuickSearch = (props) => {
// 	const items = [
// 		{ label: "Glycan", id: "glycan" },
// 		{ label: "Protein", id: "protein" },
// 		{ label: "Species", id: "species" },
// 		{ label: "Disease", id: "disease" },
// 	];
// 	useEffect(() => {
// 		logActivity();
// 	}, []);

// 	const horHeadQuickSearch = {
// 		h5VerticalText: "ADVANCED SEARCH",
// 		h2textTopStrongBefore: "How To",
// 		h2textTop: "Use",
// 		h2textTopStrongAfter: "Advanced",
// 		h2textTop2: "Glycan Search",
// 	};
// 	return (
// 		<>
// 			<Helmet>
// 				{getTitle("quickSearch")}
// 				{getMeta("quickSearch")}
// 			</Helmet>
// 			<FeedbackWidget />

// 			<Row className="gg-baseline">
// 				<Col sm={12} md={12} lg={12} xl={3} className="sidebar-col">
// 					<Sidebar items={items} />
// 				</Col>
// 				<Col sm={12} md={12} lg={12} xl={9} className="sidebar-page">
// 					<HorHeadQuickSearch post={horHeadQuickSearch} />
// 					<PanelHowToCite id="howToCite" data={howToCiteData.howToCite} />
// 				</Col>
// 			</Row>
// 		</>
// 	);
// };

// export default QuickSearch;

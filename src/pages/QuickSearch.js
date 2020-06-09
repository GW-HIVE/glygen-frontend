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
		</>
	);
};
export default QuickSearch;

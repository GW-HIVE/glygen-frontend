import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
// import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";
// import MainFeaturedCard from '../components/cards/MainFeaturedCard';
import VerticalHeading from "../components/headings/VerticalHeading";
// import HorizontalHeading from '../components/headings/HorizontalHeading';
// import featuredImg from '../images/home/featuredImg-7.jpg';
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import resourcesData from "../data/json/resourcesData";
import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "../css/Responsive.css";
import Sidebar from "../components/navigation/Sidebar";
import { Row, Col } from "react-bootstrap";
import { logActivity } from "../data/logging";

const useStyles = makeStyles((theme) => ({
	tableHeader: {
		backgroundColor: "#4B85B6",
		color: theme.palette.common.white,
		height: "60px",
	},
}));

// const mainFeaturedCard = {
// 	pageName: 'Resources',
// 	title: "GlyGen's online resources for glycobiology research.",
// 	description:
// 		' A library of Glycobiology resources, including databases, informatics tools, learning material and tutorials are provided.',
// 	image: featuredImg,
// 	imgText: 'main image description',
// };
const verticalHeadingData = {
	h5VerticalText: "LOOK AT",
	h2textTopStrongAfter: "Data",
	h2textBottom: "Resources",
	pText:
		"A list of publicly available databases, repositories and knowledgebases providing glycan-related information.",
};
const verticalHeadingTools = {
	h5VerticalText: "collection",
	h2textTopStrongBefore: "Tools",
	h2textBottom: "Resources",
	pText:
		"A list of tools, tool collections or link pages to glycomics related tools.",
};
const verticallHeadingOrganiz = {
	h5VerticalText: "CONNECT",
	h2textTop: "Resources",
	h2textBottom: "of",
	h2textBottomStrongAfter: "Organizations",
	pText: "List of glycomics related organizations.",
};
const verticalHeadingLearn = {
	h5VerticalText: "EDUCATION",
	h2textTopStrongBefore: "Learn",
	h2textBottom: "Glycobiology",
	pText:
		"There is still a great deal to learn about essentials of Glycobiology.",
};

const Resources = () => {
	const items = [
		{ label: "Data", id: "data" },
		{ label: "Tools", id: "tools" },
		{ label: "Organizations", id: "organizations" },
		{ label: "Learn", id: "learn" },
	];
	// data.sort((a, b) =>
	// 	a.col1 > b.col1 ? 1 : a.col1 === b.col1 ? (a.col2 > b.col2 ? 1 : -1) : -1
	// );
	const dataResourcesCols = [
		{
			dataField: "category",
			text: "Category",
			sort: true,
		},
		{
			dataField: "website",
			text: "Website",
			// sort: true,
			formatter: (cell) => (
				<Link href={cell.url} target="_blank" rel="noopener noreferrer">
					{cell.name}
				</Link>
			),
			// onSort: (field, order) => {
			// 	// a.col1 > b.col1 ? 1 : a.col1 === b.col1 ? (a.col2 > b.col2 ? 1 : -1) : -1
			// },
		},
		{
			dataField: "description",
			text: "Description",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { width: "40%" };
			},
		},
		{
			dataField: "contains_publ",
			text: "Contains Publications",
			sort: true,
		},
		{
			dataField: "experimental_data",
			text: "Experimental Data",
			sort: true,
		},
		{
			dataField: "curated",
			text: "Curated",
			sort: true,
		},
	];
	const toolsResourcesCols = [
		{
			dataField: "category",
			text: "Category",
			sort: true,
		},
		{
			dataField: "website",
			text: "Website",
			// sort: true,
			formatter: (cell) => (
				<Link href={cell.url} target="_blank" rel="noopener noreferrer">
					{cell.name}
				</Link>
			),
		},
		{
			dataField: "description",
			text: "Description",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { width: "40%" };
			},
		},
		{
			dataField: "experimental_data",
			text: "Experimental Data",
			sort: true,
		},
		{
			dataField: "availability",
			text: "Availability",
			sort: true,
		},
	];
	const organizResourcesCols = [
		{
			dataField: "category",
			text: "Category",
			sort: true,
		},
		{
			dataField: "website",
			text: "Website",
			// sort: true,
			formatter: (cell) => (
				<Link href={cell.url} target="_blank" rel="noopener noreferrer">
					{cell.name}
				</Link>
			),
		},
		{
			dataField: "description",
			text: "Description",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { width: "40%" };
			},
		},
		{
			dataField: "domain",
			text: "Domain",
			sort: true,
		},
	];
	const learnResourcesCols = [
		{
			dataField: "name",
			text: "Name",
			sort: true,
		},
		{
			dataField: "type",
			text: "Type",
			// sort: true,
			formatter: (cell) => (
				<Link href={cell.url} target="_blank" rel="noopener noreferrer">
					{cell.name}
				</Link>
			),
		},
		{
			dataField: "description",
			text: "Description",
			sort: true,
			headerStyle: (colum, colIndex) => {
				return { width: "40%" };
			},
		},
		{
			dataField: "glycan",
			text: "Glycan",
			sort: true,
		},
		{
			dataField: "protein",
			text: "Protein",
			sort: true,
		},
		{
			dataField: "glycoprotein",
			text: "Glycoprotein",
			sort: true,
		},
	];
	const classes = useStyles();
	useEffect(() => {
		logActivity();
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				{/* <title>{head.resources.title}</title>
				{getMeta(head.resources)} */}
				{getTitle("resources")}
				{getMeta("resources")}
			</Helmet>

			<CssBaseline />
			<div id="top-heading"></div>
			{/* <MainFeaturedCard post={mainFeaturedCard} /> */}
			{/* <Container
				maxWidth='lg'
				className='gg-container'
				style={{ backgroundColor: '#fff' }}> */}
			<Row className="gg-baseline">
				<Col sm={12} md={12} lg={12} xl={3} className="sidebar-col">
					<Sidebar items={items} />
				</Col>
				<Col sm={12} md={12} lg={12} xl={9} className="sidebar-page">
					<VerticalHeading post={verticalHeadingData} id="data" />
					<BootstrapTable
						bootstrap4
						striped
						hover
						headerClasses={classes.tableHeader}
						keyField="id"
						data={resourcesData.dataResourcesData}
						columns={dataResourcesCols}
						defaultSorted={[
							{
								dataField: "category",
								order: "asc",
							},
						]}
					/>
					<div className="goToTop">
						<a href="#top-heading">
							to Top
							<span>
								<ArrowUpwardIcon />
							</span>
						</a>
					</div>

					<VerticalHeading post={verticalHeadingTools} id="tools" />
					<BootstrapTable
						bootstrap4
						striped
						hover
						headerClasses={classes.tableHeader}
						keyField="id"
						data={resourcesData.toolsResourcesData}
						columns={toolsResourcesCols}
						defaultSorted={[
							{
								dataField: "category",
								order: "asc",
							},
						]}
					/>
					<div className="goToTop">
						<a href="#top-heading">
							to Top
							<span>
								<ArrowUpwardIcon />
							</span>
						</a>
					</div>

					<VerticalHeading post={verticallHeadingOrganiz} id="organizations" />
					<BootstrapTable
						bootstrap4
						striped
						hover
						headerClasses={classes.tableHeader}
						keyField="id"
						data={resourcesData.organizResourcesData}
						columns={organizResourcesCols}
						defaultSorted={[
							{
								dataField: "category",
								order: "asc",
							},
						]}
					/>
					<div className="goToTop">
						<a href="#top-heading">
							to Top
							<span>
								<ArrowUpwardIcon />
							</span>
						</a>
					</div>
					<p>
						*** If you want to see your tools and/or data resources on our
						website, please contact us <a href="/contact_us"> here</a>.***
					</p>

					<VerticalHeading post={verticalHeadingLearn} id="learn" />
					<BootstrapTable
						bootstrap4
						striped
						hover
						headerClasses={classes.tableHeader}
						keyField="id"
						data={resourcesData.learnResourcesData}
						columns={learnResourcesCols}
						defaultSorted={[
							{
								dataField: "name",
								order: "asc",
							},
						]}
					/>
					<div className="goToTop">
						<a href="#top-heading">
							to Top
							<span>
								<ArrowUpwardIcon />
							</span>
						</a>
					</div>
					<p>
						*** If you want to see your tools and/or data resources on our
						website, please contact us <a href="/contact_us"> here</a>.***
					</p>
				</Col>
			</Row>
			{/* </Container> */}
		</React.Fragment>
	);
};

export default Resources;

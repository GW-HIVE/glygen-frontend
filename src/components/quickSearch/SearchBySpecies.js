import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import quickSearchData from "../../data/json/quickSearch.json";

const SearchBySpecies = (props) => {
	return (
		<>
			<div id={props.id}>
				<section className="content-box-sm" style={{ margin: "0 auto" }}>
					<div className="quick-search-heading">
						<h4>Search by Species</h4>
					</div>
					<div className="quick-search">
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon className="gg-blue-color" />}
								aria-controls="panel1bh-content"
								id="panel1bh-header">
								<Typography className="gg-blue-color">
									{quickSearchData.searchBySpecies.question_1.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>
									Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
									feugiat. Aliquam eget maximus est, id dignissim quam.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon className="gg-blue-color" />}
								aria-controls="panel2bh-content"
								id="panel2bh-header">
								<Typography className="gg-blue-color">
									{quickSearchData.searchBySpecies.question_2.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>
									Donec placerat, lectus sed mattis semper, neque lectus feugiat
									lectus, varius pulvinar diam eros in elit. Pellentesque
									convallis laoreet laoreet.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon className="gg-blue-color" />}
								aria-controls="panel3bh-content"
								id="panel3bh-header">
								<Typography className="gg-blue-color">
									{quickSearchData.searchBySpecies.question_3.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography className="small-text">
									** Select both options <strong>Species</strong> and{" "}
									<strong>Type.</strong>
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
				</section>
			</div>
		</>
	);
};
export default SearchBySpecies;

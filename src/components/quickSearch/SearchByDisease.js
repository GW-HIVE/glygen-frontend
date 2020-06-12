import React, {useState, useReducer} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import quickSearchData from "../../data/json/quickSearch.json";
import AutoTextInput from '../input/AutoTextInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import TextAlert from "../alert/TextAlert";
import DialogAlert from "../alert/DialogAlert";
import ExampleExploreControl from '../example/ExampleExploreControl';
import glycanSearchData from '../../data/json/glycanSearch';
import stringConstants from '../../data/json/stringConstants';

const SearchByGlycan = (props) => {
	let commonGlycanData = stringConstants.glycan.common;
	let advancedSearch = glycanSearchData.advanced_search;
	let searchByDisease = quickSearchData.searchByDisease;

	const [proDisease, setDisease] = useState('');
	const [alertTextInput, setAlertTextInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
	);

	return (
		<>
			<div id={props.id}>
				<section className="content-box-sm" style={{ margin: "0 auto" }}>
					<div className="quick-search-heading">
						<h4>Search by Disease</h4>
					</div>
					<div className="quick-search">
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon className="gg-blue-color" />}
								aria-controls="panel1bh-content"
								id="panel1bh-header">
								<Typography className="gg-blue-color">
									{quickSearchData.searchByDisease.question_11.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
							<TextAlert alertInput={alertTextInput} />
							<Grid container>
								<Grid item md={8} className="quick-search-control">
								<FormControl fullWidth variant='outlined'>
									<Typography className="qs-search-lbl" gutterBottom>
										{searchByDisease.common.label}
									</Typography>
									<AutoTextInput
										inputValue={proDisease}
										setInputValue={setDisease}
										placeholder={searchByDisease.common.placeholder}
										typeahedID={searchByDisease.common.typeahedID}
										length={searchByDisease.common.length}
										errorText={searchByDisease.common.errorText}
									/>
									<ExampleExploreControl
										setInputValue={setDisease}
										inputValue={searchByDisease.common.examples}
									/>
								</FormControl>
								</Grid>
								<Grid item>
									<Typography gutterBottom>
										&nbsp;
									</Typography>
									<Button
										className='gg-btn-blue'
										onClick={props.searchGlycanAdvClick}
										disabled={proDisease.trim().length === 0}
									>
										Search
									</Button>
								</Grid>
							</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
				</section>
			</div>
		</>
	);
};
export default SearchByGlycan;

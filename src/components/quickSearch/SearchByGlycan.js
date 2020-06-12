import React, { useEffect, useReducer, useState } from "react";
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
	let quickSearch = stringConstants.quick_search;
	let searchByGlycan = quickSearchData.searchByGlycan;

	return (
		<>
			<div id={props.id}>
				<section className="content-box-sm" style={{ margin: "0 auto" }}>
					<div className="quick-search-heading">
						<h4>Search by Glycan</h4>
					</div>
					<div className="quick-search">
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon className="gg-blue-color" />}
								aria-controls="panel1bh-content"
								id="panel1bh-header">
								<Typography className="gg-blue-color">
									{quickSearch.question_1.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
							<Grid container>
								<Grid item md={12}>
									<TextAlert alertInput={props.alertText.question === quickSearch.question_1.id ? props.alertText.input : props.alertText.default} />
								</Grid>
								<Grid item md={8} className="quick-search-control">
								<FormControl fullWidth variant='outlined'>
									<Typography className="qs-search-lbl" gutterBottom>
										{searchByGlycan.common.label}
									</Typography>
									<AutoTextInput
										inputValue={props.searchByGlycanInput.question_1}
										setInputValue={(input)=> props.setSearchByGlycanInput({question_1: input})}
										placeholder={searchByGlycan.common.placeholder}
										typeahedID={searchByGlycan.common.typeahedID}
										length={searchByGlycan.common.length}
										errorText={searchByGlycan.common.errorText}
									/>
									<ExampleExploreControl
										setInputValue={(input)=> props.setSearchByGlycanInput({question_1: input})}
										inputValue={searchByGlycan.common.examples}
									/>
								</FormControl>
								</Grid>
								<Grid item>
									<Typography gutterBottom>
										&nbsp;
									</Typography>
									<Button
										className='gg-btn-blue'
										onClick={props.searchQuestion1}
										disabled={props.searchByGlycanInput.question_1.trim().length === 0}
									>
										Search
									</Button>
								</Grid>
							</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon className="gg-blue-color" />}
								aria-controls="panel2bh-content"
								id="panel2bh-header">
								<Typography className="gg-blue-color">
									{quickSearch.question_2.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
							<Grid container>
								<Grid item md={12}>
									<TextAlert alertInput={props.alertText.question === quickSearch.question_2.id ? props.alertText.input : props.alertText.default} />
								</Grid>
								<Grid item md={8} className="quick-search-control">
								<FormControl fullWidth variant='outlined'>
									<Typography className="qs-search-lbl" gutterBottom>
										{searchByGlycan.common.label}
									</Typography>
									<AutoTextInput
										inputValue={props.searchByGlycanInput.question_2}
										setInputValue={(input)=> props.setSearchByGlycanInput({question_2: input})}
										placeholder={searchByGlycan.common.placeholder}
										typeahedID={searchByGlycan.common.typeahedID}
										length={searchByGlycan.common.length}
										errorText={searchByGlycan.common.errorText}
									/>
									<ExampleExploreControl
										setInputValue={(input)=> props.setSearchByGlycanInput({question_2: input})}
										inputValue={searchByGlycan.question_2.examples}
									/>
								</FormControl>
								</Grid>
								<Grid item>
									<Typography gutterBottom>
										&nbsp;
									</Typography>
									<Button
										className='gg-btn-blue'
										onClick={props.searchQuestion2}
										disabled={props.searchByGlycanInput.question_2.trim().length === 0}
									>
										Search
									</Button>
								</Grid>
							</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon className="gg-blue-color" />}
								aria-controls="panel3bh-content"
								id="panel3bh-header">
								<Typography className="gg-blue-color">
									{quickSearch.question_3.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
							<Grid container>
								<Grid item md={12}>
									<TextAlert alertInput={props.alertText.question === quickSearch.question_3.id ? props.alertText.input : props.alertText.default} />
								</Grid>
								<Grid item md={8} className="quick-search-control">
								<FormControl fullWidth variant='outlined'>
									<Typography className="qs-search-lbl" gutterBottom>
										{searchByGlycan.common.label}
									</Typography>
									<AutoTextInput
										inputValue={props.searchByGlycanInput.question_3}
										setInputValue={(input)=> props.setSearchByGlycanInput({question_3: input})}
										placeholder={searchByGlycan.common.placeholder}
										typeahedID={searchByGlycan.common.typeahedID}
										length={searchByGlycan.common.length}
										errorText={searchByGlycan.common.errorText}
									/>
									<ExampleExploreControl
										setInputValue={(input)=> props.setSearchByGlycanInput({question_3: input})}
										inputValue={searchByGlycan.common.examples}
									/>
								</FormControl>
								</Grid>
								<Grid item>
									<Typography gutterBottom>
										&nbsp;
									</Typography>
									<Button
										className='gg-btn-blue'
										onClick={props.searchQuestion3}
										disabled={props.searchByGlycanInput.question_3.trim().length === 0}
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

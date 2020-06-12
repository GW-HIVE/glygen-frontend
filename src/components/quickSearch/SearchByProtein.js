import React, {useState} from "react";
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
import ExampleExploreControl from '../example/ExampleExploreControl';
import glycanSearchData from '../../data/json/glycanSearch';
import stringConstants from '../../data/json/stringConstants';

const SearchByProtein = (props) => {
	let commonGlycanData = stringConstants.glycan.common;
	let advancedSearch = glycanSearchData.advanced_search;
	let searchByProtein = quickSearchData.searchByProtein;

	const [proX, setProX] = useState('');


	return (
		<>
			<div id={props.id}>
				<section className="content-box-sm" style={{ margin: "0 auto" }}>
					<div className="quick-search-heading">
						<h4>Search by Protein</h4>
					</div>
					<div className="quick-search">
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon className="gg-blue-color" />}
								aria-controls="panel1bh-content"
								id="panel1bh-header">
								<Typography className="gg-blue-color">
									{searchByProtein.question_4.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
							<Grid container>
								<Grid item md={8} className="quick-search-control">
								<FormControl fullWidth variant='outlined'>
									<Typography className="qs-search-lbl" gutterBottom>
										{searchByProtein.common.label}
									</Typography>
									<AutoTextInput
										inputValue={proX}
										setInputValue={setProX}
										placeholder={searchByProtein.common.placeholder}
										typeahedID={searchByProtein.common.typeahedID}
										length={searchByProtein.common.length}
										errorText={searchByProtein.common.errorText}
									/>
									<ExampleExploreControl
										setInputValue={setProX}
										inputValue={searchByProtein.common.examples}
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
										disabled={proX.trim().length === 0}
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
									{searchByProtein.question_5.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
							<Grid container>
								<Grid item md={8} className="quick-search-control">
								<FormControl fullWidth variant='outlined'>
									<Typography className="qs-search-lbl" gutterBottom>
										{searchByProtein.common.label}
									</Typography>
									<AutoTextInput
										inputValue={proX}
										setInputValue={setProX}
										placeholder={searchByProtein.common.placeholder}
										typeahedID={searchByProtein.common.typeahedID}
										length={searchByProtein.common.length}
										errorText={searchByProtein.common.errorText}
									/>
									<ExampleExploreControl
										setInputValue={setProX}
										inputValue={searchByProtein.common.examples}
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
										disabled={proX.trim().length === 0}
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
									{searchByProtein.question_6.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
							<Grid container>
								<Grid item md={8} className="quick-search-control">
								<FormControl fullWidth variant='outlined'>
									<Typography className="qs-search-lbl" gutterBottom>
										{searchByProtein.question_6.label}
									</Typography>
									<AutoTextInput
										inputValue={proX}
										setInputValue={setProX}
										placeholder={searchByProtein.common.placeholder}
										typeahedID={searchByProtein.common.typeahedID}
										length={searchByProtein.common.length}
										errorText={searchByProtein.common.errorText}
									/>
									<ExampleExploreControl
										setInputValue={setProX}
										inputValue={searchByProtein.question_6.examples}
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
										disabled={proX.trim().length === 0}
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
								aria-controls="panel1bh-content"
								id="panel1bh-header">
								<Typography className="gg-blue-color">
									{searchByProtein.question_7.text}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
							<Grid container>
								<Grid item md={8} className="quick-search-control">
								<FormControl fullWidth variant='outlined'>
									<Typography className="qs-search-lbl" gutterBottom>
										{searchByProtein.common.label}
									</Typography>
									<AutoTextInput
										inputValue={proX}
										setInputValue={setProX}
										placeholder={searchByProtein.common.placeholder}
										typeahedID={searchByProtein.common.typeahedID}
										length={searchByProtein.common.length}
										errorText={searchByProtein.common.errorText}
									/>
									<ExampleExploreControl
										setInputValue={setProX}
										inputValue={searchByProtein.common.examples}
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
										disabled={proX.trim().length === 0}
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
export default SearchByProtein;

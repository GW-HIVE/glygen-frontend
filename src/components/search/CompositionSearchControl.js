import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import HelpTooltip from '../tooltip/HelpTooltip';

const useStyles = makeStyles({
	// input: {
	// 	height: 34,
	// 	borderRadius: 4,
	// 	position: 'relative',
	// 	fontSize: 16,
	// 	paddingLeft: '15px',
	// 	paddingRight: '15px',
	// },
	// span2: {
	// 	fontSize: 12,
	// 	fontStyle: 'italic',
	// 	fontWeight: 'bold',
	// 	margin: 0,
	// },
	// br: {
	// 	height: 1,
	// 	padding: 0,
	// 	margin: 0,
	// },
	// label: {
	// 	fontSize: 16,
	// 	fontWeight: 'bold',
	// 	margin: 0,
	// },
	labelHeader: {
		// fontSize: 16,
		fontWeight: 'bold',
		margin: 0,
		color: '#2F78B7',
	},
	// select: {
	// 	height: '34px',
	// 	paddingLeft: '15px',
	// 	paddingRight: '15px',
	// },
	label1: {
		//fontSize: "14px",
		//color: "#4A4A4A",
		//fontWeight: "bold",
		marginLeft: -27,
	},
	label2: {
		fontSize: '12px !important',
		fontWeight: 'bold',
		fontStyle: 'italic',
	},
});

export default function CompositionSearchControl(props) {
	const classes = useStyles();
	const [undoStack, setUndoStack] = useState([]);
	const [redoStack, setRedoStack] = useState([]);
	const [undoVal, setUndoVal] = useState({});
	const [redoDisabled, setRedoDisabled] = useState(true);
	const [undoDisabled, setUndoDisabled] = useState(true);
	const [searchDisabled, setSearchDisabled] = useState(false);

	const minInputChange = (event) => {
		let compositionData = JSON.parse(JSON.stringify(props.inputValue));
		let comp = {
			min: event.target.value,
			selectValue: compositionData[event.target.name].selectValue,
			max: compositionData[event.target.name].max,
		};
		props.setInputValue({ [event.target.name]: comp });
	};

	const maxInputChange = (event) => {
		let compositionData = JSON.parse(JSON.stringify(props.inputValue));
		let comp = {
			min: compositionData[event.target.name].min,
			selectValue: compositionData[event.target.name].selectValue,
			max: event.target.value,
		};
		props.setInputValue({ [event.target.name]: comp });
	};

	/**
	 * onSelControlChange sets min, max values based on user selection.
	 * @param {object} select_control - Select control.
	 * @param {object} min_val - min value control.
	 * @param {object} max_val - max value control.
	 * @param {string} residue - residue id.
	 * */
	function onSelControlChange(sel_control_value, min_val, max_val, residue) {
		compSearchRedoReset();
		saveResidueStateToUndoList(
			residue,
			sel_control_value,
			parseInt(min_val),
			parseInt(max_val)
		);

		let comp = {
			min: parseInt(min_val),
			selectValue: sel_control_value,
			max: parseInt(max_val),
		};

		var min = undefined;
		var max = undefined;
		var sel_residue = props.compositionInitMap.filter(function (res) {
			return residue === res.residue;
		})[0];
		if (sel_residue) {
			min = parseInt(sel_residue.min);
			max = parseInt(sel_residue.max);
		}
		if (sel_control_value === 'maybe') {
			comp.selectValue = 'maybe';
			comp.min = parseInt(min);
			if (parseInt(max_val) === max || parseInt(max_val) === min)
				comp.max = parseInt(max);
		} else if (sel_control_value === 'yes') {
			comp.selectValue = 'yes';
			comp.min = parseInt(min + 1);
			if (parseInt(max_val) === max || parseInt(max_val) === min)
				comp.max = parseInt(max);
		} else if (sel_control_value === 'no') {
			comp.selectValue = 'no';
			comp.min = parseInt(min);
			comp.max = parseInt(min);
		}
		props.setInputValue({ [residue]: comp });

		let compositionData = JSON.parse(JSON.stringify(props.inputValue));
		compositionData[residue] = comp;
		if (allNoTrue(compositionData)) {
			setSearchDisabled(true);
		} else {
			setSearchDisabled(false);
		}
	}

	/**
	 * onResidueMinMoveOut sets min control value based on select option value.
	 * @param {object} inputMin - min value.
	 * @param {object} inputMax - max value.
	 * @param {object} selOption - select option.
	 * @param {string} residue - residue.
	 * */
	function onResidueMinMoveOut(
		inputMin,
		inputMax,
		min,
		max,
		selOption,
		residue
	) {
		if (
			undoVal.residue === residue &&
			parseInt(undoVal.min) !== parseInt(inputMin) &&
			inputMin !== ''
		) {
			compSearchRedoReset();
			saveResidueStateToUndoList(
				undoVal.residue,
				selOption,
				parseInt(undoVal.min),
				parseInt(undoVal.max)
			);
		}
		if (inputMin !== '') {
			if (parseInt(inputMin) < parseInt(min)) {
				inputMin = parseInt(min);
			}
			if (parseInt(inputMin) > parseInt(inputMax) && selOption !== 'no') {
				if (parseInt(inputMin) < parseInt(max)) {
					inputMin = parseInt(inputMin);
					inputMax = parseInt(inputMin);
				} else {
					inputMin = parseInt(max);
					inputMax = parseInt(max);
				}
			} else if (parseInt(inputMin) > parseInt(min) && selOption === 'no') {
				if (parseInt(inputMin) > parseInt(max)) {
					inputMin = parseInt(max);
					inputMax = parseInt(max);
				} else {
					inputMax = parseInt(inputMin);
				}
			}
		} else if (inputMin === '') {
			if (selOption === 'maybe') {
				inputMin = parseInt(min);
			} else if (selOption === 'yes') {
				inputMin = parseInt(min) + 1;
			} else if (selOption === 'no') {
				inputMin = parseInt(min);
			}
		}
		let comp = {
			min: parseInt(inputMin),
			selectValue: props.getSelectionValue(
				parseInt(inputMin),
				parseInt(inputMax),
				parseInt(min),
				parseInt(max)
			),
			max: parseInt(inputMax),
		};
		props.setInputValue({ [residue]: comp });

		let compositionData = JSON.parse(JSON.stringify(props.inputValue));
		compositionData[residue] = comp;
		if (allNoTrue(compositionData)) {
			setSearchDisabled(true);
		} else {
			setSearchDisabled(false);
		}
	}

	/**
	 * onResidueMaxMoveOut sets max control value based on select option value.
	 * @param {string} inputMax - max value.
	 * @param {string} inputMin - min value.
	 * @param {string} selOption - select value.
	 * @param {string} residue - residue.
	 * */
	function onResidueMaxMoveOut(
		inputMax,
		inputMin,
		max,
		min,
		selOption,
		residue
	) {
		if (
			undoVal.residue === residue &&
			parseInt(undoVal.max) !== parseInt(inputMax) &&
			inputMax !== ''
		) {
			compSearchRedoReset();
			saveResidueStateToUndoList(
				undoVal.residue,
				selOption,
				parseInt(undoVal.min),
				parseInt(undoVal.max)
			);
		}
		if (inputMax !== '') {
			if (parseInt(inputMax) > parseInt(max)) {
				inputMax = parseInt(max);
			}
			if (parseInt(inputMax) < parseInt(inputMin) && selOption !== 'yes') {
				if (parseInt(inputMax) > parseInt(min)) {
					inputMax = parseInt(inputMax);
					inputMin = parseInt(inputMax);
				} else {
					inputMax = parseInt(min);
					inputMin = parseInt(min);
				}
			} else if (
				parseInt(inputMax) < parseInt(inputMin) &&
				selOption === 'yes'
			) {
				if (parseInt(inputMax) < parseInt(min)) {
					inputMin = parseInt(min);
					inputMax = parseInt(min);
				} else {
					inputMin = parseInt(inputMax);
				}
			}
		} else if (inputMax === '') {
			if (selOption === 'maybe') {
				inputMax = parseInt(max);
			} else if (selOption === 'yes') {
				inputMax = parseInt(max);
			} else if (selOption === 'no') {
				inputMax = parseInt(min);
			}
		}

		let comp = {
			min: parseInt(inputMin),
			selectValue: props.getSelectionValue(
				parseInt(inputMin),
				parseInt(inputMax),
				parseInt(min),
				parseInt(max)
			),
			max: parseInt(inputMax),
		};
		props.setInputValue({ [residue]: comp });

		let compositionData = JSON.parse(JSON.stringify(props.inputValue));
		compositionData[residue] = comp;
		if (allNoTrue(compositionData)) {
			setSearchDisabled(true);
		} else {
			setSearchDisabled(false);
		}
	}

	/**
	 * saveResidueStateToUndoList saves residue state to undo list.
	 * @param {string} residue - residue id.
	 * @param {int} min - min value.
	 * @param {int} max - max value.
	 * */
	function saveResidueStateToUndoList(residue, selOption, min, max) {
		var sel_residue = props.compositionInitMap.filter(function (res) {
			return residue === res.residue;
		})[0];
		let compData = {};
		compData[residue] = {
			min: parseInt(min),
			selectValue: props.getSelectionValue(
				parseInt(min),
				parseInt(max),
				parseInt(sel_residue.min),
				parseInt(sel_residue.max)
			),
			max: parseInt(max),
		};

		let undoResStack = undoStack;
		undoResStack.push(compData);

		setUndoStack(undoResStack);
		if (undoStack.length > 0) {
			setUndoDisabled(false);
		}
	}

	/**
	 * saveCurrentResidueStatesToUndoList saves current residue states to undo list.
	 *  * @param {array} updated_res_list - residue list.
	 */
	function saveCurrentResidueStatesToUndoList(updated_res_list) {
		let compositionStateData = JSON.parse(JSON.stringify(props.inputValue));
		let undoResStack = undoStack;
		undoResStack.push(compositionStateData);
		setUndoStack(undoResStack);
		if (undoResStack.length > 0) {
			setUndoDisabled(false);
		}
	}

	/**
	 * onMinMaxFocus sets residue values to undo_residue_val.
	 * @param {object} minVal - min value.
	 * @param {object} maxVal - max value.
	 * @param {string} residue - residue id.
	 * */
	function onMinMaxFocus(selOption, minVal, maxVal, residue) {
		let undoResidue = {
			residue: residue,
			selectValue: selOption,
			min: parseInt(minVal),
			max: parseInt(maxVal),
		};
		setUndoVal(undoResidue);
	}

	/**
	 * compSearchUndoRedo undo or redo button handler.
	 * @param {string} option specifies "undo" or "redo" option.
	 */
	function compSearchUndoRedo(option) {
		var pre_state = undefined;
		var cur_state = undefined;
		if (option === 'undo') {
			pre_state = undoStack.pop();
			cur_state = JSON.parse(JSON.stringify(props.inputValue));
			let redoResStack = redoStack;
			redoResStack.push(cur_state);
			setRedoStack(redoResStack);
		}
		if (option === 'redo') {
			pre_state = redoStack.pop();
			cur_state = JSON.parse(JSON.stringify(props.inputValue));
			let undoResStack = undoStack;
			undoResStack.push(cur_state);
			setUndoStack(undoResStack);
		}

		props.setInputValue(pre_state);

		if (undoStack.length > 0) {
			setUndoDisabled(false);
		} else {
			setUndoDisabled(true);
		}
		if (redoStack.length > 0) {
			setRedoDisabled(false);
		} else {
			setRedoDisabled(true);
		}

		let compositionData = JSON.parse(JSON.stringify(props.inputValue));
		for (let residue in pre_state) {
			compositionData[residue].min = pre_state[residue].min;
			compositionData[residue].selectValue = pre_state[residue].selectValue;
			compositionData[residue].max = pre_state[residue].max;
		}

		if (allNoTrue(compositionData)) {
			setSearchDisabled(true);
		} else {
			setSearchDisabled(false);
		}
	}

	/**
	 * compSearchRedoReset resets redo list.
	 */
	function compSearchRedoReset() {
		while (redoStack.length > 0) {
			redoStack.pop();
		}

		if (redoStack.length < 1) {
			setRedoDisabled(true);
		}
	}

	/**
	 * compSearchStateChanged checks if current residue states are changed compared to values in residue list.
	 * @param {array} residue_state_list - residue list.
	 * */
	function compSearchStateChanged(compositionData, inputCompStateData) {
		var stateChanged = false;

		let compositionStateData = undefined;
		if (inputCompStateData !== undefined) {
			compositionStateData = inputCompStateData;
		} else {
			compositionStateData = props.inputValue;
		}

		for (let residue in compositionData) {
			if (
				parseInt(compositionStateData[residue].min) !==
				parseInt(compositionData[residue].min)
			) {
				stateChanged = true;
				break;
			}
			if (
				parseInt(compositionStateData[residue].max) !==
				parseInt(compositionData[residue].max)
			) {
				stateChanged = true;
				break;
			}
		}

		return stateChanged;
	}

	const allYes = () => {
		var compositionData = JSON.parse(JSON.stringify(props.inputValue));

		for (var x = 0; x < props.compositionInitMap.length; x++) {
			compositionData[props.compositionInitMap[x].residue].min = 1;
			compositionData[props.compositionInitMap[x].residue].selectValue = 'yes';
			compositionData[props.compositionInitMap[x].residue].max =
				props.compositionInitMap[x].max;
		}
		if (compSearchStateChanged(compositionData)) {
			compSearchRedoReset();
			saveCurrentResidueStatesToUndoList(compositionData);
		}
		props.setInputValue(compositionData);
		setSearchDisabled(false);
	};

	const allNo = () => {
		var compositionData = JSON.parse(JSON.stringify(props.inputValue));

		for (let residue in compositionData) {
			compositionData[residue].min = 0;
			compositionData[residue].selectValue = 'no';
			compositionData[residue].max = 0;
		}

		if (compSearchStateChanged(compositionData)) {
			compSearchRedoReset();
			saveCurrentResidueStatesToUndoList(compositionData);
		}
		props.setInputValue(compositionData);
		setSearchDisabled(true);
	};

	const allNoTrue = (inputCompStateData) => {
		var compositionData = JSON.parse(JSON.stringify(props.inputValue));

		for (let residue in compositionData) {
			compositionData[residue].min = 0;
			compositionData[residue].selectValue = 'no';
			compositionData[residue].max = 0;
		}

		if (compSearchStateChanged(compositionData, inputCompStateData)) {
			return false;
		}
		return true;
	};

	const clearCompSearch = () => {
		var compositionData = JSON.parse(JSON.stringify(props.inputValue));

		for (var x = 0; x < props.compositionInitMap.length; x++) {
			compositionData[props.compositionInitMap[x].residue].min =
				props.compositionInitMap[x].min;
			compositionData[props.compositionInitMap[x].residue].selectValue =
				'maybe';
			compositionData[props.compositionInitMap[x].residue].max =
				props.compositionInitMap[x].max;
		}

		if (compSearchStateChanged(compositionData)) {
			compSearchRedoReset();
			saveCurrentResidueStatesToUndoList(compositionData);
		}
		props.setInputValue(compositionData);
		setSearchDisabled(false);
	};

	return (
		<div>
			<Grid
				container
				// fullWidth
				// xs={12}
				// className={'col-sm-12'}
				style={{ margin: 0 }}
				spacing={2}
				justify='center'>
				{/* <Grid item className={'col-sm-5'}> */}
				<Grid item xs={4} sm={4} md={4}>
					<Typography className={classes.labelHeader} gutterBottom>
						Residue
					</Typography>
				</Grid>
				{/* <Grid item className={'col-sm-2'}> */}
				<Grid item xs={4} sm={3} md={2}>
					<Typography
						className={classes.labelHeader}
						gutterBottom
						align='center'>
						Contains
					</Typography>
				</Grid>
				{/* <Grid item className={'col-sm-2'}> */}
				<Grid item xs={2}>
					<Typography
						className={classes.labelHeader}
						gutterBottom
						align='center'>
						Min
					</Typography>
				</Grid>
				{/* <Grid item className={'col-sm-2'}> */}
				<Grid item xs={2}>
					<Typography
						className={classes.labelHeader}
						gutterBottom
						align='center'>
						Max
					</Typography>
				</Grid>
			</Grid>
			{props.compositionInitMap &&
				props.compositionInitMap.map((key, index) => (
					<Grid
						container
						// xs={12}
						// md={10}
						// className={'col-sm-12'}
						style={{ margin: '0  auto' }}
						spacing={2}
						justify='center'>
						<Grid item xs={12} sm={4}>
							{/* <Grid item className={'col-sm-5'}> */}
							{/* <Typography className={classes.label} gutterBottom>
								{key.name}
								<br className={classes.br}></br>
								<span className={classes.span2}>{key.subtext} </span>
							</Typography> */}
							<Typography className={classes.label1}>
								<HelpTooltip
									title={key.name}
									text='Explore'
									urlText={key.name}
									// url = ""
								/>
								<strong>{key.name}</strong>
							</Typography>
							<Typography className={classes.label2}>{key.subtext}</Typography>
						</Grid>
						<Grid item xs={6} sm={3} md={2}>
							{/* <Grid item className={'col-sm-2'}> */}
							{/* <FormControl fullWidth className={classes.margin}> */}
							<FormControl fullWidth>
								<Select
									variant='outlined'
									defaultValue={'maybe'}
									name={key.residue}
									value={props.inputValue[key.residue].selectValue}
									onChange={(event) =>
										onSelControlChange(
											event.target.value,
											props.inputValue[key.residue].min,
											props.inputValue[key.residue].max,
											event.target.name
										)
									}
									margin='dense'
									// className={classes.select}
									// classes={{
									// 	outlined: classes.selectOutlined,
									// 	// root: 'select-menu',
									// }}
								>
									<MenuItem value={'maybe'}>Maybe</MenuItem>
									<MenuItem value={'yes'}>Yes</MenuItem>
									<MenuItem value={'no'}>No</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3} sm={2}>
							{/* <Grid item className={'col-sm-2'}> */}
							{/* <FormControl fullWidth className={classes.margin}> */}
							<FormControl fullWidth>
								<OutlinedInput
									variant='outlined'
									name={key.residue}
									// className={classes.input}
									margin='dense'
									value={props.inputValue[key.residue].min}
									onChange={minInputChange}
									onBlur={() =>
										onResidueMinMoveOut(
											props.inputValue[key.residue].min,
											props.inputValue[key.residue].max,
											key.min,
											key.max,
											props.inputValue[key.residue].selectValue,
											key.residue
										)
									}
									onFocus={() =>
										onMinMaxFocus(
											props.inputValue[key.residue].selectValue,
											props.inputValue[key.residue].min,
											props.inputValue[key.residue].max,
											key.residue
										)
									}
									defaultValue={Number(key.min)}
									inputProps={{
										step: props.step,
										min: key.min,
										max: key.max,
										type: 'number',
										'aria-labelledby': 'input-slider',
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={3} sm={2}>
							{/* <Grid item className={'col-sm-2'}> */}
							{/* <FormControl fullWidth className={classes.margin}> */}
							<FormControl fullWidth>
								<OutlinedInput
									variant='outlined'
									// className={classes.input}
									margin='dense'
									name={key.residue}
									value={props.inputValue[key.residue].max}
									onChange={maxInputChange}
									onBlur={() =>
										onResidueMaxMoveOut(
											props.inputValue[key.residue].max,
											props.inputValue[key.residue].min,
											key.max,
											key.min,
											props.inputValue[key.residue].selectValue,
											key.residue
										)
									}
									onFocus={() =>
										onMinMaxFocus(
											props.inputValue[key.residue].selectValue,
											props.inputValue[key.residue].min,
											props.inputValue[key.residue].max,
											key.residue
										)
									}
									defaultValue={Number(key.max)}
									inputProps={{
										step: props.step,
										min: key.min,
										max: key.max,
										type: 'number',
										'aria-labelledby': 'input-slider',
									}}
								/>
							</FormControl>
						</Grid>
					</Grid>
				))}

			<Row className='gg-align-center pt-5'>
				<Button className='gg-btn-outline mr-4 mb-3' onClick={allYes}>
					All Yes
				</Button>
				<Button className='gg-btn-outline mr-4 mb-3' onClick={allNo}>
					All No
				</Button>
				<Button className='gg-btn-outline mr-4 mb-3' onClick={clearCompSearch}>
					Clear Fields
				</Button>
				<Button
					className='gg-btn-outline mr-4 mb-3'
					disabled={undoDisabled}
					onClick={() => compSearchUndoRedo('undo')}>
					Undo
				</Button>
				<Button
					className='gg-btn-outline mr-4 mb-3'
					disabled={redoDisabled}
					onClick={() => compSearchUndoRedo('redo')}>
					Redo
				</Button>
				<Button
					className='gg-btn-blue mb-3'
					disabled={searchDisabled}
					onClick={props.searchGlycanCompClick}>
					Search Glycan
				</Button>
			</Row>
		</div>
	);
}

CompositionSearchControl.propTypes = {
	step: PropTypes.number,
	inputValue: PropTypes.array,
	compositionInitMap: PropTypes.array,
	setCompositionData: PropTypes.func,
	getSelectionValue: PropTypes.func,
};

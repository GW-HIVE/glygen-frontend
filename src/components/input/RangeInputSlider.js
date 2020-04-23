import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
	// root: {
	// 	width: 480,
	// },
	input: {
		width: '80px',
		// height: 34,
		// borderRadius: 4,
		// position: 'relative',
		// fontSize: 16,
		// backgroundColor: '#FFFFFF',
	},
	// label3: {
	// 	fontSize: '16px',
	// 	fontWeight: 'bold',
	// },
});

function valuetext(value) {
	return `${value}`;
}

export default function RangeInputSlider(props) {
	const classes = useStyles();

	const sliderChange = (event, newValue) => {
		props.setSliderInputValue(newValue);
		props.setInputValue(newValue);
	};

	const minInputChange = (event) => {
		var val = [event.target.value, props.inputValue[1]];
		props.setInputValue(val);
	};

	const maxInputChange = (event) => {
		var val = [props.inputValue[0], event.target.value];
		props.setInputValue(val);
	};

	const onMinMoveOut = () => {
		let val = [props.inputValue[0], props.inputValue[1]];
		if (Number(props.inputValue[0]) < Number(props.min)) val[0] = props.min;
		else if (props.inputValue[0] === '') val[0] = props.min;
		else if (Number(props.inputValue[0]) > Number(props.inputValue[1]))
			val[0] = props.inputValue[1];

		props.setInputValue(val);
		props.setSliderInputValue(val);
	};

	const onMaxMoveOut = () => {
		let val = [props.inputValue[0], props.inputValue[1]];
		if (Number(props.inputValue[1]) > Number(props.max)) val[1] = props.max;
		else if (props.inputValue[1] === '') val[1] = props.max;
		else if (Number(props.inputValue[1]) < Number(props.inputValue[0]))
			val[1] = props.inputValue[0];

		props.setInputValue(val);
		props.setSliderInputValue(val);
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={2} alignItems='center'>
				<Grid item>
					<FormControl fullWidth className={classes.margin} variant='outlined'>
						<InputLabel className={classes.label3}>
							<strong>Min</strong>
						</InputLabel>
						<OutlinedInput
							className={classes.input}
							value={props.inputValue[0]}
							margin='dense'
							id='demo-label1'
							onChange={minInputChange}
							onBlur={onMinMoveOut}
							labelWidth={40}
							inputProps={{
								step: props.step,
								min: props.min,
								max: props.max,
								type: 'number',
								'aria-labelledby': 'input-slider',
							}}
						/>
					</FormControl>
				</Grid>
				<Grid item xs>
					<Slider
						value={props.inputValueSlider}
						step={props.step}
						min={props.min}
						max={props.max}
						scale={(x) => x}
						onChange={sliderChange}
						valueLabelDisplay='auto'
						aria-labelledby='range-slider'
						getAriaValueText={valuetext}
						helperText='Mass Range'
					/>
				</Grid>
				<Grid item>
					<FormControl fullWidth className={classes.margin} variant='outlined'>
						<InputLabel className={classes.label3}>
							<strong>Max</strong>
						</InputLabel>
						<OutlinedInput
							className={classes.input}
							value={props.inputValue[1]}
							margin='dense'
							onChange={maxInputChange}
							onBlur={onMaxMoveOut}
							labelWidth={40}
							inputProps={{
								step: props.step,
								min: props.min,
								max: props.max,
								type: 'number',
								'aria-labelledby': 'input-slider',
							}}
						/>
					</FormControl>
				</Grid>
			</Grid>
		</div>
	);
}

RangeInputSlider.propTypes = {
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	inputValueSlider: PropTypes.array,
	setSliderInputValue: PropTypes.func,
	inputValue: PropTypes.array,
	setInputValue: PropTypes.func,
};

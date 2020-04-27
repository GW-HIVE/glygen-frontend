import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	// root: {
	//   width: 480,
	//   "& > * + *": {
	//     marginTop: theme.spacing(1)
	//   }
	// },
	// input: {
	//   borderRadius: 4,
	//   position: "relative",
	//   backgroundColor: theme.palette.background.paper,
	//   //fontSize: 14,
	//   "& > span": {
	//     marginRight: 10,
	//     //fontSize: 14,
	//     padding: 2
	//   },
	//   width: "480px"
	// },
	// inputRoot: {
	//   borderRadius: 4,
	//   position: "relative",
	//   backgroundColor: theme.palette.background.paper,
	//   width: "480px",
	//   padding: "4px !important",
	//   paddingRight: "60px !important"
	// },
	// inputAuto: {
	//   borderRadius: 4,
	//   height: "18px  !important",
	//   position: "relative",
	//   backgroundColor: theme.palette.background.paper,
	//   width: "480px",
	//   paddingLeft: "10px !important",
	//   padding: "4px !important"
	// },
	// option: {
	//   //fontSize: 14,
	//   "& > span": {
	//     marginRight: 10
	//     //fontSize: 14
	//   }
	// },
	// inputBase: {
	//   width: "100%",
	//   padding: "0px !important",
	//   "& input": {
	//     //fontSize: 14
	//   }
	// }
}));

export default function MultiselectTextInput(props) {
	const classes = useStyles();

	const handleChange = (event, value, reason) => {
		props.setInputValue(value);
	};

	return (
		<div className={classes.root}>
			<Autocomplete
				multiple
				id='tags-outlined'
				options={props.options}
				getOptionLabel={(option) => option.name}
				// classes={{
				//   option: classes.option,
				//   inputRoot: classes.inputRoot,
				//   input: classes.inputAuto
				// }}
				filterSelectedOptions
				value={props.inputValue}
				onChange={handleChange}
				renderInput={(params) => (
					<TextField
						{...params}
						margin='dense'
						variant='outlined'
						// classes={{
						//   root: classes.inputBase
						// }}
						placeholder={props.placeholder}
					/>
				)}
			/>
		</div>
	);
}

MultiselectTextInput.propTypes = {
	inputValue: PropTypes.array,
	placeholder: PropTypes.string,
	options: PropTypes.array,
	setInputValue: PropTypes.func,
};

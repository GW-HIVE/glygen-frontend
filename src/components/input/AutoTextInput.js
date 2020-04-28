import React from 'react';
import TextField from '@material-ui/core/TextField';
import { getJson } from '../../data/api';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import '../../css/Search.css';

const useStyles = makeStyles((theme) => ({
	// input: {
	//   borderRadius: 4,
	//   position: "relative",
	//   backgroundColor: theme.palette.background.paper,
	//   height: 28,
	//   "& > span": {
	//     marginRight: 10,
	//     padding: 2
	//   },
	//   width: "700px"
	// },
	// inputRoot: {
	//   borderRadius: 4,
	//   position: "relative",
	//   backgroundColor: theme.palette.background.paper,
	//   width: "700px",
	//   height: "34px",
	//   paddingLeft: "10px !important",
	//   padding: "0px !important",
	//   paddingRight: "39px !important"
	// },
	// inputAuto: {
	//   borderRadius: 4,
	//   position: "relative",
	//   backgroundColor: theme.palette.background.paper,
	//   width: "700px",
	//   height: "26px",
	//   padding: "4px !important",
	//   paddingBottom: "4px !important"
	// },
	// option: {
	//   "& > span": {
	//     marginRight: 10
	//   }
	// },
	// inputBase: {
	//   width: "100%",
	//   height: 34,
	//   padding: "0px !important"
	// },
	errorText: {
		fontSize: '14px  !important',
		marginRight: 0,
		marginLeft: 0,
	},
}));

export default function AutoTextInput(props) {
	const classes = useStyles();
	const [options, setOptions] = React.useState([]);

	const handleChange = (event, value, reason) => {
		if (!(event === null && value === "" && reason === "reset")){
      props.setInputValue(value);
		}
	};

	React.useEffect(() => {
		let active = true;
		setOptions([]);
		if (props.inputValue && props.inputValue === '') {
			setOptions([]);
			return undefined;
		}

		if (props.inputValue && active) {
			const url = `/typeahead?query={"field":"${props.typeahedID}","value":"${props.inputValue}","limit":100}`;
			getJson(url).then((response) => setOptions(response.data));
		}

		return () => {
			active = false;
		};
	}, [props.inputValue, props.typeahedID]);

	return (
		<>
			<Autocomplete
				freeSolo
				getOptionLabel={(option) => option}
				classes={{
				 	option: 'auto-option',
				 	inputRoot: 'auto-input-root',
				 	input: 'input-auto'
				}}
				options={options}
				autoHighlight={true}
				inputValue={props.inputValue}
				onInputChange={handleChange}
				onClose={(event, reason) => setOptions([])}
				renderInput={(params) => (
					<TextField
						{...params}
						//margin='dense'
						// classes={{
						// 	root: classes.inputBase,
						// }}
						variant='outlined'
						placeholder={props.placeholder}
						error={props.inputValue.length > props.length}
					/>
				)}
			/>
			{props.inputValue.length > props.length && (
				<FormHelperText className={classes.errorText} error>
					{props.errorText}
				</FormHelperText>
			)}
		</>
	);
}

AutoTextInput.propTypes = {
	inputValue: PropTypes.string,
	placeholder: PropTypes.string,
	typeahedID: PropTypes.string,
	errorText: PropTypes.string,
	length: PropTypes.number,
	setInputValue: PropTypes.func,
};

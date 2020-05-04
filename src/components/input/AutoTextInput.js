import React from 'react';
import TextField from '@material-ui/core/TextField';
import { getJson } from '../../data/api';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import '../../css/Search.css';

const useStyles = makeStyles((theme) => ({
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

import React from "react";
import TextField from "@material-ui/core/TextField";
import { getJson } from "../../data/api";
import matchSorter from "match-sorter";
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import '../../css/Search.css';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue.substring(inputValue.lastIndexOf(",") + 1));
  
  const useStyles = makeStyles(theme => ({
    errorText: {
      fontSize:"14px  !important",
      marginRight:0,
      marginLeft:0,
    }
  }));

export default function MultilineAutoTextInput(props) {
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
    if (props.inputValue && props.inputValue.substring(props.inputValue.lastIndexOf(",") + 1) === "") {
      setOptions([]);
      return undefined;
    }

    if (props.inputValue && active) {
        const url = `/typeahead?query={"field":"${props.typeahedID}","value":"${props.inputValue.substring(
            props.inputValue.lastIndexOf(",") + 1
        )}","limit":100}`;
        getJson(url).then(response => setOptions(response.data));
    }

    return () => {
      active = false;
    };
  }, [props.inputValue, props.typeahedID]);

  return (
    <>
    <Autocomplete
      freeSolo
      getOptionLabel={option => props.inputValue.substring(0, props.inputValue.lastIndexOf(",") + 1) + option}
      filterOptions={filterOptions}
      options={options}
      classes={{
        option: 'auto-option',
        inputRoot: 'auto-input-root',
        input: 'input-auto'
      }}
      autoHighlight={true}
      inputValue={props.inputValue}
      onClose={(event, reason) => setOptions([])}
      renderOption={option => option}
      onInputChange={handleChange}
      renderInput={params => (
        <TextField
          {...params}
          multiline
          rows="3"
          variant="outlined"
          placeholder={props.placeholder}
          error={
            props.inputValue.length > props.length
          }
        />
      )}
    />
    {props.inputValue.length > props.length && <FormHelperText 
      className={classes.errorText} error>
      {props.errorText}
      </FormHelperText>}
    </>
  );
}

MultilineAutoTextInput.propTypes = {
    inputValue: PropTypes.string,
    placeholder: PropTypes.string,
    typeahedID: PropTypes.string,
    errorText: PropTypes.string,
    length: PropTypes.number,
    setInputValue: PropTypes.func,
  };
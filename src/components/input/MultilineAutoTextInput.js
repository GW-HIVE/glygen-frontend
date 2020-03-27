import React from "react";
import TextField from "@material-ui/core/TextField";
import { getJson } from "../../data/api";
import matchSorter from "match-sorter";
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from 'prop-types';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue.substring(inputValue.lastIndexOf(",") + 1));
  
  const useStyles = makeStyles(theme => ({
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      height: 74,
  
      fontSize: 14,
      "& > span": {
        marginRight: 10,
        fontSize: 14,
        padding: 2
      },
      width: "700px"
    },
    inputRoot: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      width: "700px",
      height: "74px",
      padding: "4px !important",
      paddingLeft: "10px !important",
      paddingRight: "39px !important"
    },
    inputAuto: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      width: "700px",
      height: "60px",
      padding: "4px !important"
    },
    option: {
      fontSize: 14,
      "& > span": {
        marginRight: 10,
        fontSize: 14
      }
    },
    inputBase: {
      width: "100%",
      height: 56,
      padding: "4px !important",
      paddingLeft: "0px !important",
      paddingRight: "0px !important",
      "& input": {
        fontSize: 14
      }
    }
  }));

export default function MultilineAutoTextInput(props) {
  const classes = useStyles();

  const [options, setOptions] = React.useState([]);

  const handleChange = (event, value, reason) => {
        props.setInputValue(value);
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
    <Autocomplete
      id="filter-demo"
      freeSolo
      autoComplete={false}
      getOptionLabel={option => props.inputValue.substring(0, props.inputValue.lastIndexOf(",") + 1) + option}
      filterOptions={filterOptions}
      options={options}
      style={{ width: 700 }}
      classes={{
        option: classes.option,
        inputRoot: classes.inputRoot,
        input: classes.inputAuto,
      }}
      inputValue={props.inputValue}
      onClose={(event, reason) => setOptions([])}
      disableOpenOnFocus
      renderOption={option => option}
      onInputChange={handleChange}
      renderInput={params => (
        <TextField
          {...params}
          multiline
          rows="3"
          variant="outlined"
          placeholder={props.placeholder}
        />
      )}
    />
  );
}

MultilineAutoTextInput.propTypes = {
    inputValue: PropTypes.string,
    placeholder: PropTypes.string,
    typeahedID: PropTypes.string,
    setInputValue: PropTypes.func,
  };
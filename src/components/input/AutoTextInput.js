import React from "react";
import TextField from "@material-ui/core/TextField";
import { getJson } from "../../data/api";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    height: 28,

    // fontSize: 14,
    "& > span": {
      marginRight: 10,
      //fontSize: 14,
      padding: 2
    },
    width: "700px"
  },
  inputRoot: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    width: "700px",
    height: "34px",
    paddingLeft: "10px !important",
    padding: "0px !important",
    paddingRight: "39px !important"
  },
  inputAuto: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    width: "700px",
    height: "26px",
    padding: "4px !important",
    paddingBottom: "4px !important"
  },
  option: {
    // fontSize: 14,
    "& > span": {
      marginRight: 10
      //fontSize: 14
    }
  },
  inputBase: {
    width: "100%",
    height: 34,
    padding: "0px !important"
    // "& input": {
    //     fontSize: 14
    // }
  }
}));

export default function AutoTextInput(props) {
  const classes = useStyles();
  const [options, setOptions] = React.useState([]);

  const handleChange = (event, value, reason) => {
    props.setInputValue(value);
  };

  React.useEffect(() => {
    let active = true;
    setOptions([]);
    if (props.inputValue && props.inputValue === "") {
      setOptions([]);
      return undefined;
    }

    if (props.inputValue && active) {
      const url = `/typeahead?query={"field":"${props.typeahedID}","value":"${props.inputValue}","limit":100}`;
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
      getOptionLabel={option => option}
      classes={{
        option: classes.option,
        inputRoot: classes.inputRoot,
        input: classes.inputAuto
      }}
      options={options}
      autoHighlight={true}
      inputValue={props.inputValue}
      onInputChange={handleChange}
      onClose={(event, reason) => setOptions([])}
      disableOpenOnFocus
      renderInput={params => (
        <TextField
          {...params}
          classes={{
            root: classes.inputBase
          }}
          variant="outlined"
          placeholder={props.placeholder}
        />
      )}
    />
  );
}

AutoTextInput.propTypes = {
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  typeahedID: PropTypes.string,
  setInputValue: PropTypes.func
};
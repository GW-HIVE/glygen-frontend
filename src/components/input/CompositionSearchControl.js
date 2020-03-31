import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Button from "react-bootstrap/Button";

const useStyles = makeStyles({
  root: {
    // width: 480
  },
  input: {
    // width: "120px",
    height: 34,
    borderRadius: 4,
    position: "relative",
    fontSize: 16,
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  span1: {
    fontSize: 16,
    fontWeight: "bold",
    height: 16,
    margin:0
  },
  span2: {
    fontSize: 12,
    //height: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    margin:0
  },
  br: {
    height: 1,
    padding: 0,
    margin:0
  },
  label: {
    // width: "100%",
    //height: "50px",
    // padding: "15px",
    fontSize: 16,
    fontWeight: "bold",
    margin:0,
    // marginTop: 10,

    // paddingLeft: "15px",
    // paddingRight: "15px"
  },
  labelHeader: {
    // width: "100%",
    //height: "50px",
    // padding: "15px",
    fontSize: 16,
    fontWeight: "bold",
    margin:0,
    color: "#2F78B7",
    // marginTop: 10,

    // paddingLeft: "15px",
    // paddingRight: "15px"
  },
  select: {
    // width: "180px",
    // width: "100%",
    height: "34px",
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  selectOutlined: {
    paddingTop: "4px !important",
    paddingBottom: "4px !important",
    backgroundColor: "white"
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 16,
    // marginRight: 16,
    //marginLeft: 16,
    backgroundColor: "#2f78b7"
  },
  clearButton: {
    marginTop: 16,
    marginBottom: 16,
    // marginRight: 16,
    //marginLeft: 16,
    backgroundColor: "#fff",
    borderColor: "#337ab7",
    color: "#337ab7"
  },
  allYes: {
    marginTop: 16,
    marginBottom: 16,
    // marginRight: 16,
    // marginLeft: 16,
    backgroundColor: "#fff",
    borderColor: "#337ab7",
    color: "#337ab7"
  }
});

export default function CompositionSearchControl(props) {
  const classes = useStyles();
  //const [compSel, setCompSel] = React.useState([]);
  let compSel = {};


  const minInputChange = event => {
    let compositionData = props.inputValue;
    let comp = {
      "min" : event.target.value,
      "max" : compositionData[event.target.name].max
    }
    props.setInputValue({[event.target.name] : comp});
  };

  const maxInputChange = event => {
    let compositionData = props.inputValue;
    let comp = {
      "min" : compositionData[event.target.name].min,
      "max" : event.target.value
    }
    props.setInputValue({[event.target.name] : comp});
  };

  /**
 * getSelectionValue returns selection control value based on min, max.
 * @param {object} min - min value.
 * @param {object} max - max value.
 * @param {object} residue_min - residue min value.
 * @param {object} residue_max - residue max value.
 **/
function getSelectionValue(residue, cur_min, cur_max, residue_min, residue_max) {
  var selection = "maybe";
  
  if (cur_min === residue_min && cur_max === residue_min){
      selection = "no";
  } else if (cur_min === residue_min && cur_max <= residue_max){
      selection = "maybe";
  } else if (cur_min > residue_min && cur_max <= residue_max){
      selection = "yes";
  }

  //setCompSel({[residue]: selection})
  compSel[residue] = selection;
  return selection;
}

/**
 * onSelControlChange sets min, max values based on user selection.
 * @param {object} select_control - Select control.
 * @param {object} min_val - min value control.
 * @param {object} max_val - max value control.
 * @param {string} residue - residue id.
 * */
function onSelControlChange(sel_control_value, min_val, max_val, residue) {
    //compSearchRedoReset();
    //saveResidueStateToUndoList(residue, parseInt(min_val.value), parseInt(max_val.value));
    //var sel_control_value = select_control.value;
    //var sel_id = select_control.id;

    let comp = {
      "min" : 0,
      "max" : 1
    }

    var min = undefined;
    var max = undefined;
    var sel_residue = props.compositionInitMap.filter(function (res) { return residue ===  res.residue })[0];
    if (sel_residue) {
        min = parseInt(sel_residue.min);
        max = parseInt(sel_residue.max);
    }
    if (sel_control_value === "maybe") {
      comp.min = parseInt(min);
        if (parseInt(max_val) === max || parseInt(max_val) === min)
        comp.max = parseInt(max);
    } else if (sel_control_value === "yes") {
      comp.min = parseInt(min + 1);
        if (parseInt(max_val) === max || parseInt(max_val) === min)
        comp.max = parseInt(max);
    } else if (sel_control_value === "no") {
      comp.min = parseInt(min);
      comp.max = parseInt(min);
    }
    props.setInputValue({[residue] : comp});

    //setResidueMinMaxValue(min_val, max_val, min, max);
}


/**
 * onResidueMinMoveOut sets min control value based on select option value.
 * @param {object} inputMin - min value.
 * @param {object} inputMax - max value.
 * @param {object} selOption - select option.
 * @param {string} residue - residue.
 * */
function onResidueMinMoveOut(inputMin, inputMax, min, max, selOption, residue) {
  //compSearchRedoReset();
  // if (undo_residue_val.residue == residue && parseInt(undo_residue_val.min) != parseInt(inputMin.value)) {
  //     saveResidueStateToUndoList(undo_residue_val.residue, parseInt(undo_residue_val.min), parseInt(undo_residue_val.max));
  // }
  if (inputMin !== "") {
      if (parseInt(inputMin) < parseInt(min)) {
          inputMin = parseInt(min);
      }
      if (parseInt(inputMin) > parseInt(inputMax) && selOption !== "no") {
          if (parseInt(inputMin) < parseInt(max)) {
              inputMin = parseInt(inputMin);
              inputMax = parseInt(inputMin);
          } else {
              inputMin = parseInt(max);
              inputMax = parseInt(max);
          }
      } else if (parseInt(inputMin) > parseInt(min) && selOption === "no") {
          if (parseInt(inputMin) > parseInt(max)) {
              inputMin = parseInt(max);
              inputMax = parseInt(max);
          } else {
              inputMax = parseInt(inputMin);
          }
      }
  } else if (inputMin === "") {
      if (selOption === "maybe") {
          inputMin = parseInt(min);
      } else if (selOption === "yes") {
          inputMin = parseInt(min) + 1;
      } else if (selOption === "no") {
          inputMin = parseInt(min);
      }
  }
  let comp = {
    "min" : parseInt(inputMin),
    "max" : parseInt(inputMax)
  }
  props.setInputValue({[residue] : comp});

  //selOption.value = getSelectionValue(parseInt(inputMin.value), parseInt(inputMax.value), parseInt(inputMin.min), parseInt(inputMax.max));
}

/**
 * onResidueMaxMoveOut sets max control value based on select option value.
 * @param {string} inputMax - max value.
 * @param {string} inputMin - min value.
 * @param {string} selOption - select value.
 * @param {string} residue - residue.
 * */
function onResidueMaxMoveOut(inputMax, inputMin, max, min, selOption, residue) {
  // compSearchRedoReset();
  // if (undo_residue_val.residue == residue && parseInt(undo_residue_val.max) != parseInt(inputMax.value)) {
  //     saveResidueStateToUndoList(undo_residue_val.residue, parseInt(undo_residue_val.min), parseInt(undo_residue_val.max));
  // }
  if (inputMax !== "") {
      if (parseInt(inputMax) > parseInt(max)) {
          inputMax = parseInt(max);
      }
      if (parseInt(inputMax) < parseInt(inputMin)  && selOption !== "yes") {
          if (parseInt(inputMax) > parseInt(min)) {
              inputMax = parseInt(inputMax);
              inputMin = parseInt(inputMax);
          } else {
              inputMax = parseInt(min);
              inputMin = parseInt(min);
          }
      } else if (parseInt(inputMax) < parseInt(inputMin)  &&  selOption === "yes") {
          if (parseInt(inputMax) < parseInt(min)) {
              inputMin = parseInt(min);
              inputMax = parseInt(min);
          } else {
              inputMin.value = parseInt(inputMax.value);
          }
      }
  } else if (inputMax === "") {
      if (selOption === "maybe") {
          inputMax = parseInt(max);
      } else if (selOption === "yes") {
          inputMax = parseInt(max);
      } else if (selOption === "no") {
          inputMax = parseInt(min);
      }
  }

  let comp = {
    "min" : parseInt(inputMin),
    "max" : parseInt(inputMax)
  }
  props.setInputValue({[residue] : comp});

  //selOption.value = getSelectionValue(parseInt(inputMin.value), parseInt(inputMax.value), parseInt(inputMin.min), parseInt(inputMax.max));
}

  const allYes = () => {
    let compositionData = props.inputValue;
    for (var x = 0; x < props.compositionInitMap.length; x++){
      compositionData[props.compositionInitMap[x].residue].min  = 1;
      compositionData[props.compositionInitMap[x].residue].max  = props.compositionInitMap[x].max;
    }
    props.setInputValue(compositionData);
  };


  const allNo = () => {
    let compositionData = props.inputValue;
    for (let residue in compositionData){
      compositionData[residue].min  = 0;
      compositionData[residue].max  = 0;
    }
    props.setInputValue(compositionData);
  };

  const clearCompSearch = () => {
    let compositionData = props.inputValue;
    for (var x = 0; x < props.compositionInitMap.length; x++){
      compositionData[props.compositionInitMap[x].residue].min  = props.compositionInitMap[x].min;
      compositionData[props.compositionInitMap[x].residue].max  = props.compositionInitMap[x].max;
    }
    props.setInputValue(compositionData);
  };

  return (
    <div className={classes.root}>
      <Grid container className={"col-sm-12"} style={{margin:0}} spacing={2} justify="center">
        <Grid item className={"col-sm-5"}>
          <Typography className={classes.labelHeader} gutterBottom>
            Residue
          </Typography>
        </Grid>
        <Grid item className={"col-sm-2"}>
          <Typography className={classes.labelHeader} gutterBottom align="center">
            Contains
          </Typography>
        </Grid>
        <Grid item className={"col-sm-2"}>
          <Typography className={classes.labelHeader} gutterBottom align="center">
            Min
          </Typography>
        </Grid>
        <Grid item className={"col-sm-2"}>
          <Typography className={classes.labelHeader} gutterBottom align="center">
            Max
          </Typography>
        </Grid>
      </Grid>
      {props.compositionInitMap &&
        props.compositionInitMap.map((key, index) => (
          <Grid container className={"col-sm-12"} style={{margin:0}} spacing={2} justify="center">
            <Grid item className={"col-sm-5"}>
              <Typography className={classes.label} gutterBottom>
                {key.name}
                {<br className={classes.br}></br>}<span className={classes.span2}>{key.subtext} </span>
              </Typography>
            </Grid>
            <Grid item className={"col-sm-2"} >
              <FormControl fullWidth className={classes.margin}>
                <Select
                  variant="outlined"
                  defaultValue={"maybe"}
                  name={key.residue}
                  value={ 
                    getSelectionValue(key.residue, Number(props.inputValue[key.residue].min), Number(props.inputValue[key.residue].max), 
                      Number(key.min), Number(key.max))
                  }
                  onChange={event => onSelControlChange(event.target.value, props.inputValue[key.residue].min, props.inputValue[key.residue].max, event.target.name)}
                  className={classes.select}
                  classes={{
                    outlined: classes.selectOutlined,
                    root: 'select-menu', 
                  }}
                >
                  <MenuItem value={"maybe"}>
                    Maybe
                  </MenuItem>
                  <MenuItem value={"yes"}>
                    Yes
                  </MenuItem>
                  <MenuItem value={"no"}>
                    No
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={"col-sm-2"}>
              <FormControl fullWidth className={classes.margin}>
                <OutlinedInput
                  variant="outlined"
                  name={key.residue}
                  className={classes.input}
                  margin="dense"
                  value={props.inputValue[key.residue].min}
                  onChange={minInputChange}
                  onBlur={() => onResidueMinMoveOut(props.inputValue[key.residue].min, props.inputValue[key.residue].max, key.min, key.max, compSel[key.residue], key.residue)}                
                  defaultValue={Number(key.min)}
                  inputProps={{
                    step: props.step,
                    min: key.min,
                    max: key.max,
                    type: "number",
                    "aria-labelledby": "input-slider"
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item className={"col-sm-2"}> 
              <FormControl fullWidth className={classes.margin}>
                <OutlinedInput
                  variant="outlined"
                  className={classes.input}
                  margin="dense"
                  name={key.residue}
                  value={props.inputValue[key.residue].max}
                  onChange={maxInputChange}
                  onBlur={() => onResidueMaxMoveOut(props.inputValue[key.residue].max, props.inputValue[key.residue].min, key.max, key.min, compSel[key.residue], key.residue)}                
                  defaultValue={Number(key.max)}
                  inputProps={{
                    step: props.step,
                    min: key.min,
                    max: key.max,
                    type: "number",
                    "aria-labelledby": "input-slider"
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        ))}
      <Grid container className={"col-sm-12"} style={{margin:0}} spacing={2} justify="center" alignItems="center">
        {/* <ButtonToolbar justifyContent="center" className={classes.marginButToolbarCompoSearch}> */}
        <Grid item>
          <Button
            className={classes.allYes}
            variant="secondary"
            size="lg"
            onClick={allYes}
          >
            All Yes
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.clearButton}
            variant="secondary"
            size="lg"
            onClick={allNo}
          >
            All No
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.clearButton}
            variant="secondary"
            size="lg"
            onClick={clearCompSearch}
          >
            Clear Fields
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.clearButton}
            variant="secondary"
            size="lg"
            // onClick={unDo}
          >
            Undo
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.clearButton}
            variant="secondary"
            size="lg"
            // onClick={reDo}
          >
            Redo
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.submitButton}
            variant="primary"
            size="lg"
            onClick={props.searchGlycanCompClick}
          >
            Search Glycan
          </Button>
        </Grid>
        {/* </ButtonToolbar> */}
      </Grid>
    </div>
  );
}

CompositionSearchControl.propTypes = {
  step: PropTypes.number,
  inputValue: PropTypes.array,
  compositionInitMap: PropTypes.array,
  setCompositionData: PropTypes.func

};

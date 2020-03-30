import React from "react";
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

function valuetext(value) {
  return `${value}°C`;
}

export default function CompositionSearchControl(props) {
  const classes = useStyles();

  const minInputChange = event => {
    // var val = [Number(event.target.value), props.inputValue[1]];
    // if (event.target.value < props.min)
    //     val[0] = props.min;
    // else if (event.target.value > props.inputValue[1])
    //     val[0] = props.inputValue[1];
    // props.setInputValue(val);
  };

  const maxInputChange = event => {
    // var val = [props.inputValue[0], Number(event.target.value)];
    // if (event.target.value > props.max)
    //     val[1] = props.max;
    // else if (event.target.value < props.inputValue[0])
    //     val[1] = props.inputValue[0];
    // props.setInputValue(val);
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
                  className={classes.input}
                  margin="dense"
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
            // onClick={allYes}
          >
            All Yes
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.clearButton}
            variant="secondary"
            size="lg"
            // onClick={allNo}
          >
            All No
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.clearButton}
            variant="secondary"
            size="lg"
            onClick={props.clearGlycan}
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
            onClick={props.searchGlycanClick}
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
  compositionInitMap: PropTypes.array
};

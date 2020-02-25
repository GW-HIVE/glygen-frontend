import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from 'prop-types';


const useStyles = makeStyles({
  root: {
    width: 480
  },
  input: {
    width: 100,
    height: 34,
    borderRadius: 4,
    position: "relative",
    fontSize: 16,
  },
  label3: {
    fontSize: "16px",
    fontWeight: "bold",
  }
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([props.intValue[0], props.intValue[1]]);
  const [minVal, setMin] = React.useState(props.intValue[0]);
  const [maxVal, setMax] = React.useState(props.intValue[1]);




  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMin(newValue[0]);
    setMax(newValue[1]);

    props.handleSetNumSugars(newValue);
  };



  const handleInputChange1 = event => {
    var val = [Number(event.target.value), value[1]];
    if (event.target.value < props.min)
        val[0] = props.min;
    else if (event.target.value > value[1])
        val[0] = value[1];

    setValue(val);  
    setMin(val[0]);
    props.handleSetNumSugars(val);

    //setValue(event.target.value < 0 ? [0, value[1]] : [Number(event.target.value), value[1]]);
  };

  const handleInputChange2 = event => {

    var val = [value[0], Number(event.target.value)];
    if (event.target.value > props.max)
        val[1] = props.max;
    else if (event.target.value < value[0])
        val[1] = value[0];

    setMax(val[1]);
    setValue(val);
    props.handleSetNumSugars(val);

    //setValue(event.target.value > 100 ? [value[0], 100] : [value[0], Number(event.target.value)]);
  };

  // const handleBlur1 = () => {
  //   if (value < 0) {
  //     setValue([0, 100]);
  //   } else if (value > 100) {
  //     setValue([0, 100]);
  //   }
  // };

  // const handleBlur2 = () => {
  //   if (value < 0) {
  //     setValue([0, 100]);
  //   } else if (value > 100) {
  //     setValue([0, 100]);
  //   }
  // };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel className={classes.label3} htmlFor="demo-label1">
              <strong>Min</strong>
            </InputLabel>
            <OutlinedInput
              className={classes.input}
              value={minVal}
              //value={props.inputProps[0]}
              margin="dense"
              id="demo-label1"
              onChange={handleInputChange1}
              // onBlur={handleBlur1}
              labelWidth={40}
              inputProps={{
                step: props.step,
                min: props.min,
                max: props.max,
                type: "number",
                "aria-labelledby": "input-slider"
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs>
            <Slider
              value={value}
              //value={props.intValue}
              step={props.step}
              min={props.min}
              max={props.max}
              scale={x => x}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              helperText="Mass Range"
            />
        </Grid>
        <Grid item>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel className={classes.label3} id="demo-label3">
              <strong>Max</strong>
            </InputLabel>
            <OutlinedInput
              className={classes.input}
              value={maxVal}
              //value={props.inputProps[1]}
              margin="dense"
              onChange={handleInputChange2}
              // onBlur={handleBlur2}
              labelWidth={40}
              inputProps={{
                step: props.step,
                min: props.min,
                max: props.max,
                type: "number",
                "aria-labelledby": "input-slider"
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}


RangeSlider.propTypes = {
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  intValue: PropTypes.array,

};
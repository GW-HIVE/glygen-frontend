import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { downloadFromServer } from "../utils/download";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  margin: {
    // margin: theme.spacing(2)
    marginBottom: 16,
    width: 700
  },

  marginSimple: {
    // margin: theme.spacing(2)
    marginTop: 16,
    marginBottom: 16
    //width: 1100
  },

  marginButToolbarCompoSearch: {
    justifyContent: "center"
    // marginRight: 0,
    // width: 920
  },
  marginLeft: {
    justifyContent: "flex-end"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 200
  },
  form1: {
    width: 770
  },
  label5: {
    fontSize: 16,
    width: "100px",
    height: "18px"
  },
  label: {
    fontSize: 16,
    width: "100px",
    height: "18px",
    shrink: false
  },
  label1: {
    fontSize: "14px",
    color: "#4A4A4A",
    fontWeight: "bold",
    marginLeft: -27
    // height: "25px"
  },
  label4: {
    fontSize: "15px",
    color: "#4A4A4A",
    fontWeight: "bold"
    // height: "25px"
  },
  label2: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#4A4A4A"
  },
  label3: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    width: "700px",
    height: "34px"
  },
  inputt: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    width: "700px",
    height: "10px"
  },
  input1: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    width: "700px",
    height: "74px"
  },
  tabs: {
    borderColor: "#FFFFFF",
    width: "558px"
  },
  tab: {
    borderRadius: 4,
    borderColor: "#80bdff",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    width: "1000px",
    height: "1150px",
    alignItems: "center",
    fontColor: "#2F78B7",
    backgroundColor: "#FFFFFF"
  },
  tabCompostionSearch: {
    borderRadius: 4,
    borderColor: "#80bdff",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    width: "1000px",
    height: "900px",
    alignItems: "center",
    fontColor: "#2F78B7",
    backgroundColor: "#FFFFFF"
  },
  tabSimpleSearch: {
    borderRadius: 4,
    borderColor: "#80bdff",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    width: "1000px",
    height: "300px",
    alignItems: "center",
    fontColor: "#2F78B7",
    backgroundColor: "#FFFFFF"
  },
  con: {
    width: "730px",
    height: "1100px",
    alignItems: "center"
  },
  con1: {
    width: "1000px",
    height: "1250px",
    alignItems: "center",
    marginBottom: "80px"
  },
  conSimple: {
    alignItems: "center",
    // marginTop: "150px",
    // marginBottom: "100px",
    paddingTop: "100px"
    //paddingBottom: "100px",
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120
  },
  select: {
    width: "200px",
    height: "34px"
  },
  select1: {
    width: "700px",
    height: "34px"
  },
  select113: {
    width: "70px"
  },
  selectOutlined: {
    paddingTop: "4px !important",
    paddingBottom: "4px !important",
    backgroundColor: "white"
  },
  col1: {
    margin: 0,
    width: "25px"
  },
  row1: {
    margin: 0,
    marginRight: 15,
    width: "25px"
  },
  help1: {
    lineWidth: 1
  },
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    // fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  },
  helpicon: {
    fontSize: "18px",
    marginRight: 8
  },

  large: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  root1: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  rootProgress: {
    width: "1000px",
    paddingBottom: "20px",
    paddingTop: "20px",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const DownloadButton = props => {
  const { types, dataId } = props;

  const [show, setShow] = useState(false);
  const [format, setFormat] = useState(props.format || props.types[0].type);
  const [compressed, setCompressed] = useState(props.compressed || false);

  const handleDownload = async () => {
    const dataType = types.find(typeItem => typeItem.type === format).data;

    await downloadFromServer(dataId, format, compressed, dataType);

    setShow(false);
  };
  const classes = useStyles();
  return (
    <div className="dropdown gg-download text-right">
      <button
        className="btn btn-link btn-link-detail dropdown-toggle"
        type="button"
        id="download"
        alt="Download results"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => {
          setShow(!show);
        }}
      >
        <i className="glyphicon glyphicon-save"></i> DOWNLOAD
        <span className="caret"></span>
      </button>
      <div
        className={
          "dropdown-menu dropdown-menu-box dropdown-menu-right" +
          (show ? " open show" : "")
        }
        aria-labelledby="download"
      >
        <Grid item>
          <FormControl variant="outlined">
            <InputLabel className={classes.label3}>Download</InputLabel>
            <Select
              value={format}
              onChange={e => {
                setFormat(e.target.value);
              }}
              highlight={false}
              classes={{
                outlined: classes.selectOutlined,
                root: "select-menu"
              }}
              className={classes.select}
              labelWidth={100}
            >
              {types.map(typeItem => (
                <MenuItem value={typeItem.type}>
                  {typeItem.type.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <div className="row">
          <div className="col-md-7">
            <label>Compressed: </label>
          </div>
          <div className="col-md-5">
            <input
              type="checkbox"
              id="download_compression"
              checked={compressed}
              onClick={e => {
                setCompressed(e.target.checked);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-7"></div>
          <div className="col-md-5 text-right">
            <button className="btn-default" onClick={handleDownload}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DownloadButton;

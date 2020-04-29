import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { downloadFromServer } from "../utils/download";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import { height } from "@material-ui/system";
import Button from "react-bootstrap/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Link } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from "@material-ui/icons/Close";
const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    minWidth: "40px",
    border: "1px solid #ced4da",
    padding: "7px 26px 7px 12px"
  }
}))(InputBase);

const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      minHeight: 25,
      marginRight: 65
    }
  })
);

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
  const clearForm = () => {
    setFormat(props.format || props.types[0].type);
    setCompressed(props.compressed || false);
  };
  const classes = useStyles();
  return (
    <div className="dropdown gg-download text-right">
      <Link>
        <button
          className="btn btn-link gg-download-btn dropdown-toggle"
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
          <GetAppIcon /> DOWNLOAD
          <span style={{ marginRight: "0px" }} className="caret"></span>
        </button>
      </Link>
      <div
        className={
          "dropdown-menu dropdown-menu-box dropdown-menu-right" +
          (show ? " open show" : "")
        }
        aria-labelledby="download"
      >
        <Row>
          <Col>
            <button
              type="button"
              style={{
                float: "right",
                border: "none",
                backgroundColor: "inherit"
              }}
              onClick={() => {
                clearForm();
                setShow(!show);
              }}
            >
              {" "}
              <CloseIcon />
            </button>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <FormControl
              margin="dense"
              variant="outlined"
              className={classes.formControl}
            >
              <Row>
                <div className="col-md-7" style={{ paddingTop: "16px" }}>
                  <strong>Format:</strong>
                </div>

                <div className="col-md-5 " style={{ paddingTop: "10px" }}>
                  <Select
                    input={<BootstrapInput />}
                    value={format}
                    onChange={e => {
                      setFormat(e.target.value);
                    }}
                  >
                    {types.map(typeItem => (
                      <MenuItem value={typeItem.type}>
                        {typeItem.type.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Row>
            </FormControl>
          </Col>
        </Row>

        <Row>
          <div className="col-md-5" style={{ paddingLeft: "22px" }}>
            <strong>Compress file:</strong>
          </div>
          <div className="col-md-7" style={{ paddingLeft: "50px" }}>
            <input
              style={{ fontSize: "xx-large" }}
              type="checkbox"
              id="download_compression"
              checked={compressed}
              onClick={e => {
                setCompressed(e.target.checked);
              }}
            />
          </div>
        </Row>
        <div className="row">
          <div className="col-md-7"></div>
          <div className="col-md-5 text-right">
            <Button
              type="button"
              style={{ marginRight: "10px", marginTop: "7px" }}
              className="gg-btn-blue"
              onClick={handleDownload}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DownloadButton;

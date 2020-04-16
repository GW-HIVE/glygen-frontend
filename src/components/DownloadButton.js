import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { downloadFromServer } from "../utils/download";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { height } from "@material-ui/system";
import Button from "react-bootstrap/Button";
const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      minHeight: 25
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
        style={{ Width: "1px" }}
      >
        <Row>
          <Col sm={12} md={6} lg={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Row>
                <div className="col-md-5" style={{ paddingTop: "10px" }}>
                  <strong>Type: </strong>
                </div>

                <div className="col-md-7">
                  <Select
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
          <div className="col-md-7">
            <strong>Compressed:</strong>
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
        </Row>
        <div className="row">
          <div className="col-md-7"></div>
          <div className="col-md-5 text-right">
            <Button
              type="button"
              style={{ marginRight: "10px" }}
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

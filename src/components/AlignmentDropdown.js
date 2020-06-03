import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Dropdown } from "react-bootstrap";
import { downloadFromServer } from "../utils/download";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import InputBase from "@material-ui/core/InputBase";
import SelectControl from "./select/SelectControl";

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

const AlignmentDropdown = props => {
  const { types, dataId } = props;

  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(
    props.dropdown || props.types[0].type
  );

  const handleDownload = async () => {
    debugger;
    const dataType = types.find(typeItem => typeItem.type === dropdown).data;

    await downloadFromServer(dataId, dropdown, dataType);

    setShow(false);
  };
  const clearForm = () => {
    setDropdown(props.types[0].type);
  };

  return (
    <>
      <FormControl margin="dense" variant="outlined">
        <SelectControl
          style={{ marginTop: "-15px" }}
          inputValue={dropdown}
          menu={types.map(typeItem => {
            return { id: typeItem.type, name: typeItem.display };
          })}
          setInputValue={value => {
            setDropdown(value);
          }}
        />
      </FormControl>
      <Button
        type="button"
        style={{ marginLeft: "5px", marginTop: "5px" }}
        className="gg-btn-blue"
        onClick={handleDownload}
      >
        Alignment
      </Button>
    </>
  );
};
export default AlignmentDropdown;

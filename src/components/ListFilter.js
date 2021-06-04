import React, { useState, useEffect } from "react";
import { Checkbox, Collapse } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Row, Col, div } from "react-bootstrap";
import "../css/detail.css";
import proteinSearchData from "../data/json/proteinSearch";
import SelectControl from "../components/select/SelectControl";
import Iframe from "react-iframe";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const BlueCheckbox = withStyles({
  root: {
    color: "#979797",
    "&$checked": {
      color: "#2f78b7",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

let advancedSearch = proteinSearchData.advanced_search;
const ListFilterOptionGroup = ({ type, onFilterChange }) => {
  const [optionState, setOptionState] = useState(type.options);
  const [annotationOperation, setAnnotationOperation] = useState(type.operator || "OR");
  // sort by order field
  optionState.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (b.order < a.order) return 1;
    return 0;
  });

  const handleOptionChange = (event) => {
    // get the value (which option) and checked state
    const { checked, value } = event.target;
    const newOptionState = [...optionState];
    newOptionState.find((item) => item.id === value).selected = checked;
    setOptionState(newOptionState);
    // if (newOptionState) {
    //   setAnnotationOperation();
    // }
  };

  useEffect(() => {
    if (!(annotationOperation && optionState)) {
      return;
    }

    const filter = {
      id: type.id,
      operator: annotationOperation,
      selected: optionState.filter((item) => item.selected).map((item) => item.id),
    };

    onFilterChange(filter);
  }, [annotationOperation, optionState]);

  return (
    <>
      {/* <div className="leftCol"> */}
      <div className="pb-1">
        <div className="sidebar-header">
          <h6 className="color-white nowrap d-inline-block">{type.label}</h6>
          <select
            className="select-dropdown float-right pt-0"
            value={annotationOperation}
            onChange={(event) => setAnnotationOperation(event.target.value)}
          >
            <option value="OR">OR</option>
            <option value="AND">AND</option>
          </select>
        </div>
        {/* <div className="parentElement">{type.label}</div> */}
        <ul className="list-unstyled mt-0 mb-0 pt-1">
          {optionState.map((option) => (
            <li key={option.id}>
              <FormControlLabel
                className="pl-2 mt-0 mb-0 pt-0 pb-0"
                control={
                  <BlueCheckbox
                    value={option.id}
                    checked={option.selected}
                    onChange={handleOptionChange}
                    size="small"
                    className="pt-1 pb-1"
                  />
                }
                label={`${option.label} (${option.count})`}
              />
              {/* <BlueCheckbox
                // className="checkboxCss"
                value={option.id}
                checked={option.selected}
                onChange={handleOptionChange}
              />
              <label>
                {option.label}{" "}({option.count})
              </label> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ListFilter = ({ availableOptions = [], selectedOptions = [], onFilterChange }) => {
  // If nothing available, exit
  if (!availableOptions.length) {
    return <></>;
  }

  // create new array, holding integrated available / selected data
  const filterGroupData = availableOptions.map((group) => {
    // See if there is an entry in the selected values for this type
    const selectGroup = selectedOptions.find((selected) => selected.id === group.id);

    // create a return that is the same except for selection
    return {
      ...group,
      options: group.options.map((option) => ({
        ...option,
        // false if no matching group in selection, or see if its in the selection
        selected: selectGroup ? selectGroup.selected.indexOf(option.id) > -1 : false,
      })),
    };
  });

  return (
    <div className="parentlist">
      {filterGroupData.map((type) => (
        <div>
          <ListFilterOptionGroup type={type} onFilterChange={onFilterChange} />
        </div>
      ))}
    </div>
  );
};

export default ListFilter;

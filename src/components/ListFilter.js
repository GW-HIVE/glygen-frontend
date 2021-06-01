import React, { useState, useEffect } from "react";
import { Checkbox, Collapse } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Row, Col, div } from "react-bootstrap";
import "../css/detail.css";
import proteinSearchData from "../data/json/proteinSearch";
import SelectControl from "../components/select/SelectControl";
import Iframe from "react-iframe";

let advancedSearch = proteinSearchData.advanced_search;
const ListFilterOptionGroup = ({ type, onFilterChange }) => {
  const [optionState, setOptionState] = useState(type.options);
  const [annotationOperation, setAnnotationOperation] = useState(
    type.operator || "OR"
  );
  // sort by order field
  optionState.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (b.order < a.order) return 1;
    return 0;
  });

  const handleOptionChange = event => {
    // get the value (which option) and checked state
    const { checked, value } = event.target;
    const newOptionState = [...optionState];
    newOptionState.filter(item => item.id === value).selected = checked;
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
      selected: optionState.filter(item => item.selected).map(item => item.id)
    };

    onFilterChange(filter);
  }, [annotationOperation, optionState]);

  return (
    <>
      {/* <div className="leftCol"> */}
      <div className="dropdownx">
        <h6 className="parentElement">
          {type.label}{" "}
          <select
            class="select-dropdown"
            value={annotationOperation}
            onChange={event => setAnnotationOperation(event.target.value)}
          >
            <option value="OR">OR</option>
            <option value="AND">AND</option>
          </select>
        </h6>
        {/* <div className="parentElement">{type.label}</div> */}
        <ul className="filterlist">
          {optionState.map(option => (
            <li key={option.id}>
              <label className="labeltype">
                <Checkbox
                  className="checkboxCss"
                  // value={option.id}
                  checked={option.selected}
                  onChange={handleOptionChange}
                />
                {option.label}({option.count})
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ListFilter = ({
  availableOptions = [],
  selectedOptions = [],
  onFilterChange
}) => {
  // If nothing available, exit
  if (!availableOptions.length) {
    return <></>;
  }

  // create new array, holding integrated available / selected data
  const filterGroupData = availableOptions.map(group => {
    // See if there is an entry in the selected values for this type
    const selectGroup = selectedOptions.find(
      selected => selected.id === group.id
    );

    // create a return that is the same except for selection
    return {
      ...group,
      options: group.options.map(option => ({
        ...option,
        // false if no matching group in selection, or see if its in the selection
        selected: selectGroup
          ? selectGroup.selected.indexOf(option.id) > -1
          : false
      }))
    };
  });

  return (
    <div className="parentlist">
      {filterGroupData.map(type => (
        <div>
          <ListFilterOptionGroup type={type} onFilterChange={onFilterChange} />
        </div>
      ))}
    </div>
  );
};

export default ListFilter;

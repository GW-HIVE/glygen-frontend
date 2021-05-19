import React, { useState } from "react";
import { Checkbox, Collapse } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Row, Col, div } from "react-bootstrap";
import "../css/detail.css";

const ListFilterOptionGroup = ({ type, onFilterChange }) => {
  // sort by order field
  type.options.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (b.order < a.order) return 1;
    return 0;
  });

  const handleChange = event => {
    // get the value (which option) and checked state
    const { checked, value } = event.target;

    // tell the containing page which group and option changed, and what state its in now
    onFilterChange(type.id, value, checked);
  };

  return (
    <>
      {/* <div className="leftCol"> */}
      <div className="dropdownx">
        <h6 className="parentElement">{type.label}</h6>
        {/* <div className="parentElement">{type.label}</div> */}
        <ul className="filterlist" rlist left-side-nav__upper>
          {type.options.map(option => (
            <li key={option.id}>
              <label className="labeltype">
                <Checkbox
                  className="checkboxCss"
                  value={option.id}
                  checked={option.selected}
                  onChange={handleChange}
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

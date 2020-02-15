import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import {
  GLYCAN_COLUMNS,
  getUserSelectedColumns,
  setUserSelectedColumns
} from "../data/glycan";

const GlycanListEditColumns = () => {
  let { id } = useParams();
  const [columns, setColumns] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const selected = getUserSelectedColumns();
    const selectedColumns = GLYCAN_COLUMNS.map(column => ({
      ...column,
      selected: selected.includes(column.text)
    }));

    setColumns(selectedColumns);
    setSelectedCount(selected.length);
  }, []);

  const onColumnSelection = event => {
    const checkbox = event.target;
    const changedColumn = checkbox.getAttribute("data-column");

    const newColumns = columns.map(column => ({
      ...column,
      selected:
        column.text === changedColumn ? event.target.checked : column.selected
    }));

    const newSelectedColumns = newColumns.filter(column => column.selected);

    setColumns(newColumns);

    // setSelectedColumns(newSelectedColumns);

    const selectedFields = newSelectedColumns.map(column => column.text);
    setUserSelectedColumns(selectedFields);
    setSelectedCount(newSelectedColumns.length);

    // localStorage.setItem('glycan-columns', JSON.stringify(['key1', 'key2']))
    // JSON.parse(localStorage.getItem('glycan-columns'))
  };

  return (
    <>
      <h1>Columns</h1>
      <ul>
        {columns.map(column => (
          <li key={column.text}>
            <label>
              <input
                data-column={column.text}
                type="checkbox"
                checked={column.selected}
                onChange={onColumnSelection}
              />
              <span>{column.text}</span>
            </label>
          </li>
        ))}
      </ul>
      <Button
        className="btn btn-primary"
        component={Link}
        to={`/glycan-list/${id}`}
        variant="contained"
        disabled={selectedCount === 0}
      >
        Back to Glycan List
      </Button>
    </>
  );
};

export default GlycanListEditColumns;

import React, { useState, useEffect } from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import { GLYCAN_COLUMNS, getUserSelectedColumns, setUserSelectedColumns } from '../data/glycan'

const GlycanListEditColumns = () => {

    let { id } = useParams();
    const [columns, setColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);

    useEffect(() => {

        const selected = getUserSelectedColumns();
        const selectedColumns = GLYCAN_COLUMNS.map((column) => ({
            ...column,
            selected: selected.includes(column.dataField)
        }));
        
        setColumns(selectedColumns);

        setSelectedColumns(GLYCAN_COLUMNS.filter(column => column.selected));
    }, []);

    const onColumnSelection = (event) => {
        const checkbox = event.target;
        const changedColumn = checkbox.getAttribute('data-column');

        const newColumns = columns.map(column => ({
            ...column,
            selected: (column.dataField === changedColumn) ? event.target.checked : column.selected
        }));

        const newSelectedColumns = newColumns.filter(column => column.selected)

        setColumns(newColumns);
        setSelectedColumns(newSelectedColumns);

        const selectedFields = newSelectedColumns.map(column => column.dataField)
        setUserSelectedColumns(selectedFields)


        // localStorage.setItem('glycan-columns', JSON.stringify(['key1', 'key2']))
        // JSON.parse(localStorage.getItem('glycan-columns'))
    }

	return (
		<>
            <h1>Columns</h1>

            {JSON.stringify(columns)}
            <ul>
                {columns.map(column => (
                    <li key={column.text}>
                        <label>
                            <input data-column={column.dataField} type="checkbox" checked={column.selected} onChange={onColumnSelection} />
                            <span>{column.text}</span>
                        </label>
                    </li>
                ))}
            </ul>
            <Link to={`/glycan-list/${id}`}>Back to Glycan List</Link>
        </>
	);
}

export default GlycanListEditColumns;


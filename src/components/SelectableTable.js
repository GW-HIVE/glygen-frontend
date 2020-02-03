import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import PaginationControl from "./PaginationControl";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Navbar, Col, Nav, Image, Row } from 'react-bootstrap';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const SelectableTable = (props) => {


    const [columns, setColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);

    useEffect(() => {
        setColumns(props.columns);
        setSelectedColumns(props.columns.filter(column => column.selected));
    }, []);

    const onColumnSelection = (event) => {
        const checkbox = event.target;
        const changedColumn = checkbox.getAttribute('data-column');

        const newColumns = columns.map(column => ({
            ...column,
            selected: (column.dataField === changedColumn) ? event.target.checked : column.selected
        }));

        setColumns(newColumns);
        setSelectedColumns(newColumns.filter(column => column.selected));
    }

    return (
        <>

<Grid container>
            <Grid item xs={6} sm={3}>
                <h1>Column Options</h1>
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
      </Grid>
      <Grid item xs={12} sm={8}>
                <h1>Table</h1>
                {selectedColumns && selectedColumns.length &&
                    <BootstrapTable bootstrap4 keyField={ props.keyField } data={ props.data } columns={ selectedColumns } pagination={ paginationFactory()}/>
                }
 
            </Grid>
        </Grid>
        </>
    )
}


export default SelectableTable;
import React, { useState, useEffect } from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import { getGlycanList } from '../data';
import { GLYCAN_COLUMNS, getUserSelectedColumns } from '../data/glycan'
import QuerySummary from "../components/QuerySummary";



const GlycanList = (props) => {

  let { id } = useParams();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);


  useEffect(() => {
    const selected = getUserSelectedColumns();
    const userSelectedColumn = GLYCAN_COLUMNS.filter(column => selected.includes(column.dataField));
    setSelectedColumns(userSelectedColumn);


    getGlycanList('9cc698050e82aed8c33696685da1ee1d').then(({ data }) => {
      // place to change values before rendering

      setData(data.results);
      setQuery(data.query);
      setPagination(data.pagination);
    });

  
  }, []);

	return (
		<>
      <section>
      <QuerySummary data={query}/>
      </section>

      <Link to={`/glycan-list/${id}/edit`}>Edit Columns</Link>
      {/* <a href={`/glycan-list/${props.id}/edit`}>Edit Columns</a> */}

      {selectedColumns && selectedColumns.length &&
          <BootstrapTable bootstrap4 keyField="dataField" data={data} columns={ selectedColumns } pagination={ paginationFactory()}/>
      }
    </>
	);
}

export default GlycanList;


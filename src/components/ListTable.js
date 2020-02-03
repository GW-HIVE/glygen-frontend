import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


const ListTable= (props)=>{


    return(
<section>
<h1>Table</h1>
{props.selectedColumns && props.selectedColumns.length && 
    <BootstrapTable bootstrap4 keyField='glytoucan_ac' data={ props.data } columns={ props.selectedColumns } />
} 
</section>
    )
}

export default ListTable
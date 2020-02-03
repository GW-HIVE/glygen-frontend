import React, { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import { getProtienList } from '../data';
import SelectableTable from "../components/SelectableTable";




const ProteinList = (props) => {


    const [data, setData] = useState([]);

    useEffect(() => {
        getProtienList('96729ced790bc5e300144422dd900bf3').then(({ data }) => {
          // place to change values before rendering
    
          setData(data.results);
         // setQuery(data.query);
        // setPagination(data.pagination);
        });
      }, 
      []);

    

    //   {
    //     "uniprot_canonical_ac": "P14210-1", 
    //     "mass": 83134.0, 
    //     "protein_name_short": "", 
    //     "refseq_ac": "NP_000592.3", 
    //     "refseq_name": "hepatocyte growth factor isoform 1 preproprotein", 
    //     "organism": "Homo sapiens", 
    //     "gene_name": "HGF", 
    //     "protein_name_long": "Hepatocyte growth factor"
    //   }
    const columnDefinition = [
        { dataField: 'uniprot_canonical_ac', text: 'Protein ID',sort: true, selected:true},
        // { dataField: 'mass', text: 'Mass', sort: true, selected:true},
        // { dataField: 'iupac', text: 'iupac',sort: true, selected:true},
        // { dataField: 'glycoct', text: 'glycoct',sort: true},
        // { dataField: 'mass_pme', text: 'mass_pme',sort: true}
      ];

	return (
		<>
             <SelectableTable columns={columnDefinition} data={data} keyField='uniprot_canonical_ac'/>
            {/* <ListTable selectedColumns={columns.selected} data={data}  />  */}
        </>
	);
}

export default ProteinList;


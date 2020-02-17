import React, { useState, useEffect } from "react";
import { getGlycanDetail } from "../data/glycan";

const GlycanDetail = props => {
  const [protienListId, setProtienListId] = useState("");
  const [accessionId, setAccessionId] = useState("");

  // const [data, setData] = useState([]);

  // const [query, setQuery] = useState({});
  // const [pagination, setPagination] = useState({});

  useEffect(() => {
    setProtienListId(props.protienListId);
    setAccessionId(props.accessionId);

    const getProtienDetailData = getGlycanDetail(props.accessionId);

    getProtienDetailData.then(({ data }) => {
      if (data.code) {
        console.log(data.code);
        // displayErrorByCode(data.code);
        // activityTracker("error", id, "error code: " + data.code + " (page: " + page + ", sort: " + sort + ", dir: " + dir + ", limit: " + limit + ")");
      } else {
        // place to change values before rendering
        // setData(data.results);
        // setQuery(data.query);
        // setPagination(data.pagination);
      }
    });

    getProtienDetailData.catch(({ response }) => {
      alert(JSON.stringify(response));
    });
  }, []);

  // const columnDefinition = [
  //   { dataField: 'uniprot_canonical_ac', text: 'Protein ID',sort: true},
  //   { dataField: 'mass', text: 'Mass'},
  //   { dataField: 'protein_name_short', text: 'Protein Name'},
  //   { dataField: 'refseq_ac', text: 'Refseq Acc'},
  //   { dataField: 'refseq_name', text: 'Refseq Name'},
  //   { dataField: 'organism', text: 'Organism'},
  //   { dataField: 'gene_name', text: 'Gene Name'},
  //   { dataField: 'protein_name_long', text: 'Protein Name'}
  // ];

  return (
    <>
      <h1>Glycan Detail</h1>

      <a href={`/protien-list/${protienListId}`}>Protein List</a>

      {/* <QuerySummary data={query} />
      <DataTable pagination={pagination} data={data} columnDefinition={columnDefinition} /> */}
    </>
  );
};

export default GlycanDetail;

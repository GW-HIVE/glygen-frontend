import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { getTitle } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProteinList } from "../data";
import { PROTEIN_COLUMNS, getUserSelectedColumns } from "../data/protein";
// import GlycanQuerySummary from "../components/GlycanQuerySummary";
import PaginatedTable from "../components/PaginatedTable";
import Container from "@material-ui/core/Container";
// import DownloadButton from "../components/DownloadButton";
import FeedbackWidget from "../components/FeedbackWidget";
import stringConstants from "../data/json/stringConstants.json";
import ReactHtmlParser from "react-html-parser";
import routeConstants from "../data/json/routeConstants";

const proteinStrings = stringConstants.protein.common;

const ProteinList = props => {
  let { id } = useParams();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(PROTEIN_COLUMNS);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();

  useEffect(() => {
    getProteinList(id).then(({ data }) => {
      setData(data.results);

      setPagination(data.pagination);
      const currentPage = (data.pagination.offset - 1) / sizePerPage + 1;
      setPage(currentPage);
      setTotalSize(data.pagination.total_length);
    });
  }, []);

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setPage(page);
    setSizePerPage(sizePerPage);

    getProteinList(
      id,
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      sortField,
      sortOrder
    ).then(({ data }) => {
      // place to change values before rendering

      setData(data.results);

      setPagination(data.pagination);

      setTotalSize(data.pagination.total_length);
    });
  };

  function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? "red" : "blue" };
  }

  return (
    <>
      <Helmet>
        {getTitle("proteinList")}
        {getTitle("proteinList")}
      </Helmet>

      <FeedbackWidget />
      <Container maxWidth="xl" className="ggContainer">
        <section className="content-box-md">
          {/* <section style={{ paddingTop: "20px" }}> */}
          {/* <GlycanQuerySummary
            data={query}
            onModifySearch={handleModifySearch}
          /> */}
        </section>
        <section>
          {/* <DownloadButton
            types={[
              { display: "Glycan data (*.csv)", type: "csv", data: "glycan" },
              { display: "Glycan data (*.json)", type: "json", data: "glycan" }
            ]}
            dataId={id}
          /> */}
          {selectedColumns && selectedColumns.length !== 0 && (
            <PaginatedTable
              trStyle={rowStyleFormat}
              data={data}
              columns={selectedColumns}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={totalSize}
              onTableChange={handleTableChange}
              defaultSortField="uniprot_canonical_ac"
              idField="uniprot_canonical_ac"
            />
          )}
        </section>
      </Container>
    </>
  );
};

export default ProteinList;

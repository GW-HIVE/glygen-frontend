import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { getTitle } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGlycanList } from "../data";
import { GLYCAN_COLUMNS, getUserSelectedColumns } from "../data/glycan";
import GlycanQuerySummary from "../components/GlycanQuerySummary";
import PaginatedTable from "../components/PaginatedTable";
import Container from "@material-ui/core/Container";
import DownloadButton from "../components/DownloadButton";
import FeedbackWidget from "../components/FeedbackWidget";
import residueMap from "../data/json/stringConstants.json";

const GlycanList = props => {
  let { id } = useParams();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();

  const fixResidueToShortNames = query => {
    const result = { ...query };

    if (result.composition) {
      result.composition = result.composition
        .sort((a, b) => {
          if (residueMap[a.residue].orderID < residueMap[b.residue].orderID) {
            return -1;
          } else if (
            residueMap[a.residue].orderID < residueMap[b.residue].orderID
          ) {
            return 1;
          }
          return 0;
        })
        .map(item => ({
          ...item,
          residue: residueMap[item.residue].short_name
        }));
    }

    return result;
  };

  useEffect(() => {
    const selected = getUserSelectedColumns();
    const userSelectedColumn = GLYCAN_COLUMNS.filter(column =>
      selected.includes(column.text)
    );
    setSelectedColumns(userSelectedColumn);

    getGlycanList(id).then(({ data }) => {
      setData(data.results);
      setQuery(fixResidueToShortNames(data.query));
      setPagination(data.pagination);
      const currentPage = (data.pagination.offset - 1) / sizePerPage + 1;
      setPage(currentPage);
      //   setSizePerPage()
      setTotalSize(data.pagination.total_length);
    });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setPage(page);
    setSizePerPage(sizePerPage);

    getGlycanList(
      id,
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      sortField,
      sortOrder
    ).then(({ data }) => {
      // place to change values before rendering

      setData(data.results);
      setQuery(fixResidueToShortNames(data.query));
      setPagination(data.pagination);

      //   setSizePerPage()
      setTotalSize(data.pagination.total_length);
    });
  };

  function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? "red" : "blue" };
  }
  const handleModifySearch = () => {
    props.history.push(`/glycan-search/${id}`);
  };

  return (
    <>
      <Helmet>
        {getTitle("glycanList")}
        {getTitle("glycanList")}
      </Helmet>

      <FeedbackWidget />
      <Container maxWidth="xl" className="ggContainer">
        <section className="content-box-md">
          {/* <section style={{ paddingTop: "20px" }}> */}
          <GlycanQuerySummary
            data={query}
            onModifySearch={handleModifySearch}
          />
        </section>
        <section>
          <DownloadButton
            types={[
              { type: "Glycan data (*.csv)", data: "glycan" },
              { type: "Glycan data (*.json)", data: "glycan" }
            ]}
            dataId={id}
          />
          {selectedColumns && selectedColumns.length !== 0 && (
            <PaginatedTable
              trStyle={rowStyleFormat}
              data={data}
              columns={selectedColumns}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={totalSize}
              onTableChange={handleTableChange}
            />
          )}
        </section>
      </Container>
    </>
  );
};

export default GlycanList;

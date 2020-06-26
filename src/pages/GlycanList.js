import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGlycanList } from "../data";
import { GLYCAN_COLUMNS, getUserSelectedColumns } from "../data/glycan";
import GlycanQuerySummary from "../components/GlycanQuerySummary";
import PaginatedTable from "../components/PaginatedTable";
import Container from "@material-ui/core/Container";
import DownloadButton from "../components/DownloadButton";
import FeedbackWidget from "../components/FeedbackWidget";
import stringConstants from "../data/json/stringConstants.json";
import ReactHtmlParser from "react-html-parser";
import routeConstants from "../data/json/routeConstants";

const GlycanList = props => {
  let { id } = useParams();
  let { searchId } = useParams();
  let quickSearch = stringConstants.quick_search;

  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(GLYCAN_COLUMNS);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();

  const fixResidueToShortNames = query => {
    const residueMap = stringConstants.glycan.common.composition;
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
          residue: ReactHtmlParser(residueMap[item.residue].name.bold())
        }));
    }

    return result;
  };

  useEffect(() => {
    // const selected = getUserSelectedColumns();
    // const userSelectedColumn = GLYCAN_COLUMNS.filter(column =>
    //   selected.includes(column.dataField)
    // );
    // setSelectedColumns(userSelectedColumn);

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
    if (searchId === "gs")
      props.history.push(routeConstants.globalSearchResult + query.term);
    else if (quickSearch[searchId] !== undefined)
      props.history.push(routeConstants.quickSearch + id + "/" +  quickSearch[searchId].id + "#" + quickSearch[searchId].id);
    else 
      props.history.push(routeConstants.glycanSearch + id);
  };

  return (
    <>
      <Helmet>
        {getTitle("glycanList")}
        {getMeta("glycanList")}
      </Helmet>

      <FeedbackWidget />
      <Container maxWidth="xl" className="gg-container">
        <section className="content-box-md">
          {/* <section style={{ paddingTop: "20px" }}> */}
          <GlycanQuerySummary
            data={query}
            question={quickSearch[searchId]}
            onModifySearch={handleModifySearch}
          />
        </section>
        <section>
          <DownloadButton
            types={[
              {
                display: "Glycan data (*.csv)",
                type: "csv",
                data: "glycan_list"
              },
              {
                display: "Glycan data (*.json)",
                type: "json",
                data: "glycan_list"
              }
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
              defaultSortField="glytoucan_ac"
              idField="glytoucan_ac"
            />
          )}
        </section>
      </Container>
    </>
  );
};

export default GlycanList;

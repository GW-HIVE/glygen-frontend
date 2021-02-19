import React, { useState, useEffect, useReducer } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSuperSearchList } from "../data/supersearch";
import SitequerySummary from "../components/SitequerySummary";
import { SITE_COLUMNS } from "../data/supersearch";
import PaginatedTable from "../components/PaginatedTable";
import Container from "@material-ui/core/Container";
import FeedbackWidget from "../components/FeedbackWidget";
import stringConstants from "../data/json/stringConstants.json";
import ReactHtmlParser from "react-html-parser";
import routeConstants from "../data/json/routeConstants";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import { axiosError } from "../data/axiosError";
import { GLYGEN_BASENAME } from "../envVariables";

const proteinStrings = stringConstants.protein.common;

const SiteList = props => {
  let { id } = useParams();
  let { searchId } = useParams();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [timestamp, setTimeStamp] = useState();
  const [pagination, setPagination] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(SITE_COLUMNS);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );

  useEffect(() => {
    setPageLoading(true);
    logActivity("user", id);
    getSuperSearchList(id)
      .then(({ data }) => {
        if (data.error_code) {
          let message = "list api call";
          logActivity("user", id, "No results. " + message);
          setPageLoading(false);
        } else {
          setData(data.results);
          setQuery(data.cache_info.query);
          setTimeStamp(data.cache_info.ts);
          setPagination(data.pagination);
          const currentPage = (data.pagination.offset - 1) / sizePerPage + 1;
          setPage(currentPage);
          setTotalSize(data.pagination.total_length);
          setPageLoading(false);
        }
      })
      .catch(function(error) {
        let message = "list api call";
        axiosError(error, id, message, setPageLoading, setAlertDialogInput);
      });
  }, []);

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setPage(page);
    setSizePerPage(sizePerPage);

    getSuperSearchList(
      id,
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      sortField,
      sortOrder
    ).then(({ data }) => {
      // place to change values before rendering
      if (!data.error_code) {
        setData(data.results);
        setTimeStamp(data.cache_info.ts);
        setPagination(data.pagination);
        setTotalSize(data.pagination.total_length);
      }
    });
  };

  const handleModifySearch = () => {
    if (searchId === "sups") {
      props.history.push(routeConstants.superSearch + id);
    } else {
      props.history.push(routeConstants.siteSearch + id);
    }
  };

  function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? "red" : "blue" };
  }

  return (
    <>
      <Helmet>
        {getTitle("siteList")}
        {getMeta("siteList")}
      </Helmet>

      <FeedbackWidget />
      <Container maxWidth="xl" className="gg-container">
        <PageLoader pageLoading={pageLoading} />
        <DialogAlert
          alertInput={alertDialogInput}
          setOpen={input => {
            setAlertDialogInput({ show: input });
          }}
        />
        <section className="content-box-md">
          {query && (
            <SitequerySummary
              data={query}
              timestamp={timestamp}
              searchId={searchId}
              onModifySearch={handleModifySearch}
            />
          )}
        </section>
        <section>
          {/* {selectedColumns && selectedColumns.length !== 0 && ( */}
          {data && data.length && (
            <PaginatedTable
              trStyle={rowStyleFormat}
              data={data}
              columns={selectedColumns}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={totalSize}
              onTableChange={handleTableChange}
              defaultSortField="hit_score"
              defaultSortOrder="asc"
              idField="uniprot_canonical_ac"
            />
          )}
          {/* )} */}
        </section>
      </Container>
    </>
  );
};

export default SiteList;
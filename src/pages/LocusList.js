import React, { useState, useEffect, useReducer } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LOCUS_COLUMNS, getGeneLocusList} from '../data/usecases';
import ProteinQuerySummary from "../components/ProteinQuerySummary";
import PaginatedTable from "../components/PaginatedTable";
import Container from "@material-ui/core/Container";
import FeedbackWidget from "../components/FeedbackWidget";
import stringConstants from "../data/json/stringConstants.json";
import routeConstants from "../data/json/routeConstants";
import { logActivity } from "../data/logging";
import PageLoader from '../components/load/PageLoader';
import DialogAlert from '../components/alert/DialogAlert';
import {axiosError} from '../data/axiosError';
import { GLYGEN_BASENAME } from "../envVariables";

const proteinStrings = stringConstants.protein.common;

/**
 * Locus list page component for showing list table.
 */
const LocusList = props => {
  let { id } = useParams();
  let { searchId } = useParams();
  let quickSearch = stringConstants.quick_search;

  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [timestamp, setTimeStamp] = useState();
  const [pagination, setPagination] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(LOCUS_COLUMNS);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();
  const [pageLoading, setPageLoading] = useState(true);
	const [alertDialogInput, setAlertDialogInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{show: false, id: ""}
  );

  /**
	 * useEffect for retriving data from api and showing page loading effects.
	 */
  useEffect(() => {
    setPageLoading(true);
		logActivity("user", id);
    getGeneLocusList(id).then(({ data }) => {
      if (data.error_code) {
        let message = "list api call";
        logActivity("user", id, "No results. " + message);
        setPageLoading(false);
      } else {
        setData(data.results);
        setQuery(data.query);
        setTimeStamp(data.query.execution_time);
        setPagination(data.pagination);
        const currentPage = (data.pagination.offset - 1) / sizePerPage + 1;
        setPage(currentPage);
        setTotalSize(data.pagination.total_length);
        setPageLoading(false);
      }
    })
    .catch(function (error) {
			let message = "list api call";
			axiosError(error, id, message, setPageLoading, setAlertDialogInput);
    });

  }, []);

   /**
	 * Function to handle table change event. Retrives data from api to reflect new state of table.
   * @param {string} type - event type.
   * @param {object} {} - object specifying new state of table.
   */
  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setPage(page);
    setSizePerPage(sizePerPage);

    getGeneLocusList(
      id,
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      sortField,
      sortOrder
    ).then(({ data }) => {
      // place to change values before rendering
      if (!data.error_code) {
        setData(data.results);
        setTimeStamp(data.query.execution_time);
        setPagination(data.pagination);
        setTotalSize(data.pagination.total_length);
      }
    });
  };

  /**
	 * Function to handle modify search button click.
   */
  const handleModifySearch = () => {
    if (quickSearch[searchId] !== undefined) {
      const basename = GLYGEN_BASENAME === "/" ? "" : GLYGEN_BASENAME;
      window.location = basename + routeConstants.quickSearch + id + "/" + quickSearch[searchId].id + "#" + quickSearch[searchId].id;
    } else {
      props.history.push(routeConstants.proteinSearch + id);
    }
  };

  /**
	 * Function to define row style format.
   * @param {object} row - row.
   * @param {number} rowIdx - row index.
   */
  function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? "red" : "blue" };
  }

  return (
    <>
      <Helmet>
        {getTitle("locusList")}
        {getMeta("locusList")}
      </Helmet>

      <FeedbackWidget />
      <Container maxWidth="xl" className="gg-container">
        <PageLoader pageLoading={pageLoading} />
					<DialogAlert
						alertInput={alertDialogInput}
						setOpen={(input) => {
							setAlertDialogInput({"show": input})
						}}
					/>
        <section className="content-box-md">
          {query && (
            <ProteinQuerySummary
              data={query}
              question={quickSearch[searchId]}
              timestamp={timestamp}
              onModifySearch={handleModifySearch}
            />
          )}
        </section>
        <section>
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

export default LocusList;

import React, { useState, useEffect, useReducer } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getMappingList } from "../data";
import { ID_MAPPING_RESULT, ID_MAP_REASON } from "../data/mapping";
import PaginatedTable from "../components/PaginatedTable";
import Container from "@material-ui/core/Container";
// import DownloadButton from "../components/DownloadButton";
import FeedbackWidget from "../components/FeedbackWidget";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import { axiosError } from "../data/axiosError";
import { Row } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import routeConstants from "../data/json/routeConstants";
import BootstrapTable from "react-bootstrap-table-next";
import idMappingData from "../data/json/idMapping";

const IdMappingResult = (props) => {
  let { id } = useParams();
  // let { searchId } = useParams();

  const [data, setData] = useState([]);
  const [dataReason, setDataReason] = useState([]);
  const [legends, setLegends] = useState([]);
  const [legendsReason, setLegendsReason] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [idMapResult, setIdMapResult] = useState(ID_MAPPING_RESULT);
  const [idMapReason, setIdMapReason] = useState(ID_MAP_REASON);
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
    getMappingList(id, "mapped")
      .then(({ data }) => {
        if (data.error_code) {
          let message = "list api call";
          logActivity("user", id, "No results. " + message);
          setPageLoading(false);
        } else {
          setData(data.results);
          setLegends(data.cache_info.legends);
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
    getMappingList(id, "unmapped")
      .then(({ data }) => {
        if (data.error_code) {
          let message = "list api call";
          logActivity("user", id, "No results. " + message);
          setPageLoading(false);
        } else {
          setDataReason(data.results);
          setLegendsReason(data.cache_info.legends);
          setPageLoading(false);
        }
      })
      .catch(function (error) {
        let message = "list api call";
        axiosError(error, id, message, setPageLoading, setAlertDialogInput);
      });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    // setPage(page);
    // setSizePerPage(sizePerPage);
    data.sort((a, b) => {
      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      } else if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      return 0;
    });

    getMappingList(id, (page - 1) * sizePerPage + 1, sizePerPage, sortField, sortOrder).then(
      ({ data }) => {
        // place to change values before rendering
        if (!data.error_code) {
          setLegends(data.legends);
          setData(data.results);
          setPagination(data.pagination);
          setTotalSize(data.pagination.total_length);
        }
      }
    );
  };

  const handleModifySearch = () => {
    props.history.push(routeConstants.idMapping + id);
  };

  function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? "red" : "blue" };
  }

  return (
    <>
      <Helmet>
        {getTitle("idMappingResult")}
        {getMeta("idMappingResult")}
      </Helmet>

      <FeedbackWidget />
      <Container maxWidth="xl" className="gg-container">
        <PageLoader pageLoading={pageLoading} />
        <DialogAlert
          alertInput={alertDialogInput}
          setOpen={(input) => {
            setAlertDialogInput({ show: input });
          }}
        />

        <div className="content-box-md">
          <Row>
            <Grid item xs={12} sm={12} className="text-center">
              <div className="horizontal-heading">
                <h2>
                  {idMappingData.pageTitleIdMapResult}{" "}
                  <strong>{idMappingData.pageTitleIdMapResultBold}</strong>
                </h2>
              </div>
            </Grid>
          </Row>
        </div>
        <section style={{ width: "95%", margin: "0 auto" }}>
          {/* Button */}
          <div className="text-right mb-4">
            {/* <Link to={routeConstants.idMapping}> */}
            <Button type="button" className="gg-btn-blue" onClick={handleModifySearch}>
              Modify Search
            </Button>
            {/* </Link> */}
          </div>

          {idMapResult && idMapResult.length !== 0 && (
            <PaginatedTable
              trStyle={rowStyleFormat}
              data={data}
              columns={idMapResult}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={totalSize}
              onTableChange={handleTableChange}
              pagination={pagination}
              defaultSortField="from"
              defaultSortOrder="asc"
            />
          )}
          {!idMapResult && <p>No data available.</p>}
          {/* Button */}
          <div className="text-right" style={{ marginTop: "48px" }}>
            {/* <Link to={routeConstants.idMapping}> */}
            <Button type="button" className="gg-btn-blue" onClick={handleModifySearch}>
              Modify Search
            </Button>
            {/* </Link> */}
          </div>
        </section>
        <div className="content-box-md">
          <h1 className="page-heading">{idMappingData.pageTitleIdMapReason}</h1>
        </div>
        <section>
          {idMapReason && idMapReason.length !== 0 && (
            <BootstrapTable
              bootstrap4
              striped
              hover
              wrapperClasses="table-responsive mapping-reason-tbl"
              // headerClasses={classes.tableHeader}
              keyField="id"
              data={dataReason}
              columns={idMapReason}
              defaultSorted={[
                {
                  dataField: "input_id",
                  order: "asc",
                },
              ]}
            />
          )}
          {!idMapReason && <p>No data available.</p>}
        </section>
      </Container>
    </>
  );
};

export default IdMappingResult;

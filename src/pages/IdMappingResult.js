import React, { useState, useEffect, useReducer } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getIdMappingResult } from "../data";
import { ID_MAPPING_RESULT, ID_MAP_REASON } from "../data/mapping";
import PaginatedTable from "../components/PaginatedTable";
import Container from "@material-ui/core/Container";
// import DownloadButton from "../components/DownloadButton";
import FeedbackWidget from "../components/FeedbackWidget";
import stringConstants from "../data/json/stringConstants.json";
import ReactHtmlParser from "react-html-parser";
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

  const [data, setData] = useState([]);
  const [dataReason, setDataReason] = useState([]);
  // const [query, setQuery] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [idMappingResult, setIdMappingResult] = useState(ID_MAPPING_RESULT);
  const [idMapReason, setIdMapReason] = useState(ID_MAP_REASON);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );

  // const fixResidueToShortNames = (query) => {
  //   const residueMap = stringConstants.glycan.common.composition;
  //   const result = { ...query };

  //   if (result.composition) {
  //     result.composition = result.composition
  //       .sort((a, b) => {
  //         if (residueMap[a.residue].orderID < residueMap[b.residue].orderID) {
  //           return -1;
  //         } else if (residueMap[a.residue].orderID < residueMap[b.residue].orderID) {
  //           return 1;
  //         }
  //         return 0;
  //       })
  //       .map((item) => ({
  //         ...item,
  //         residue: ReactHtmlParser(residueMap[item.residue].name.bold()),
  //       }));
  //   }

  //   return result;
  // };

  useEffect(() => {
    setPageLoading(true);
    logActivity("user", id);

    getIdMappingResult(id)
      .then(({ data }) => {
        if (data.error_code) {
          let message = "list api call";
          logActivity("user", id, "No results. " + message);
          setPageLoading(false);
        } else {
          setData(data.results);
          // setQuery(fixResidueToShortNames(data.query));
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

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    setPage(page);
    setSizePerPage(sizePerPage);

    getIdMappingResult(id, (page - 1) * sizePerPage + 1, sizePerPage, sortField, sortOrder).then(
      ({ data }) => {
        // place to change values before rendering

        setData(data.results);
        // setQuery(fixResidueToShortNames(data.query));
        setPagination(data.pagination);

        //   setSizePerPage()
        setTotalSize(data.pagination.total_length);
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
        <section>
          {/* Button */}
          <div className="text-right mb-4">
            <Link to={routeConstants.idMapping}>
              <Button type="button" className="gg-btn-blue" onClick={handleModifySearch}>
                Modify Search
              </Button>
            </Link>
          </div>

          {idMappingResult && idMappingResult.length !== 0 && (
            <PaginatedTable
              trStyle={rowStyleFormat}
              data={data}
              columns={idMappingResult}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={totalSize}
              onTableChange={handleTableChange}
              // defaultSortField="glycan_count"
              defaultSortField="input_idlist"
              defaultSortOrder="desc"
            />
          )}
          {/* Button */}
          <div className="text-right" style={{ marginTop: "48px" }}>
            <Link to={routeConstants.idMapping}>
              <Button type="button" className="gg-btn-blue">
                Modify Search
              </Button>
            </Link>
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
                  dataField: "input_idlist",
                  order: "asc",
                },
              ]}
            />
          )}
        </section>
      </Container>
    </>
  );
};

export default IdMappingResult;

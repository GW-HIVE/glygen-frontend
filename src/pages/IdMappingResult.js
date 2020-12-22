import React, { useState, useEffect, useReducer } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ID_MAP_REASON, getMappingList, getMappingListUnmapped } from "../data/mapping";
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
import routeConstants from "../data/json/routeConstants";
import idMappingData from "../data/json/idMapping";
import stringConstants from "../data/json/stringConstants";
const mappedStrings = stringConstants.id_mapping.common.mapped;

const IdMappingResult = (props) => {
  let { id } = useParams();

  const [data, setData] = useState([]);
  const [dataReason, setDataReason] = useState([]);
  const [legends, setLegends] = useState([]);
  const [legendsReason, setLegendsReason] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [paginationReason, setPaginationReason] = useState([]);
  const [idMapReason, setIdMapReason] = useState(ID_MAP_REASON);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();
  const [totalSizeReason, setTotalSizeReason] = useState();
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
    getMappingListUnmapped(id, "unmapped")
      .then(({ data }) => {
        if (data.error_code) {
          let message = "list api call";
          logActivity("user", id, "No results. " + message);
          setPageLoading(false);
        } else {
          setLegendsReason(data.cache_info.legends);
          setDataReason(data.results);
          setPaginationReason(data.pagination);
          const currentPage = (data.pagination.offset - 1) / sizePerPage + 1;
          setPage(currentPage);
          setTotalSizeReason(data.pagination.total_length);
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
          setLegends(data.cache_info.legends);
          setData(data.results);
          setPagination(data.pagination);
          setTotalSize(data.pagination.total_length);
          setPage(page);
          setSizePerPage(sizePerPage);
        }
      }
    );
  };

  const handleTableChangeReason = (type, { page, sizePerPage, sortField, sortOrder }) => {
    dataReason.sort((a, b) => {
      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      } else if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      return 0;
    });

    getMappingListUnmapped(
      id,
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      sortField,
      sortOrder
    ).then(({ data }) => {
      // place to change values before rendering
      if (!data.error_code) {
        setLegendsReason(data.cache_info.legends);
        setDataReason(data.results);
        setPaginationReason(data.pagination);
        setTotalSizeReason(data.pagination.total_length);
        setPage(page);
        setSizePerPage(sizePerPage);
      }
    });
  };

  const handleModifySearch = () => {
    props.history.push(routeConstants.idMapping + id);
  };

  const idMapResultColumns = [
    {
      dataField: mappedStrings.from.shortName,
      text: mappedStrings.from.name,
      sort: true,
      selected: true,
      headerStyle: (colum, colIndex) => {
        return { width: "33%" };
      },
      headerFormatter: (column, colIndex, { sortElement }) => {
        return (
          <div>
            {column.text} / {legends.from}
            {sortElement}
          </div>
        );
      },
    },
    {
      dataField: mappedStrings.anchor.shortName,
      text: mappedStrings.anchor.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: "33%" };
      },
      headerFormatter: (column, colIndex, { sortElement }) => {
        return (
          <div>
            {column.text} / {legends.anchor}
            {sortElement}
          </div>
        );
      },
    },
    {
      dataField: mappedStrings.to.shortName,
      text: mappedStrings.to.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: "33%" };
      },
      headerFormatter: (column, colIndex, { sortElement }) => {
        return (
          <div>
            {column.text} / {legends.to}
            {sortElement}
          </div>
        );
      },
    },
  ];

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
            <Button type="button" className="gg-btn-blue" onClick={handleModifySearch}>
              Modify Search
            </Button>
          </div>

          <PaginatedTable
            data={data}
            columns={idMapResultColumns}
            page={page}
            sizePerPage={sizePerPage}
            totalSize={totalSize}
            onTableChange={handleTableChange}
            pagination={pagination}
            defaultSortField="from"
            defaultSortOrder="asc"
            noDataIndication={"No data available."}
            // rowStyle={rowStyle}
          />
          {/* Button */}
          <div className="text-right" style={{ marginTop: "48px" }}>
            <Button type="button" className="gg-btn-blue" onClick={handleModifySearch}>
              Modify Search
            </Button>
          </div>
        </section>
        <div className="content-box-md">
          <h1 className="page-heading">{idMappingData.pageTitleIdMapReason}</h1>
        </div>
        <section>
          <PaginatedTable
            data={dataReason}
            columns={idMapReason}
            page={page}
            sizePerPage={sizePerPage}
            totalSize={totalSizeReason}
            onTableChange={handleTableChangeReason}
            pagination={paginationReason}
            defaultSortField="input_id"
            defaultSortOrder="asc"
            noDataIndication={"No data available."}
          />
          {/* Button */}
          <div className="text-right" style={{ marginTop: "48px" }}>
            <Button type="button" className="gg-btn-blue" onClick={handleModifySearch}>
              Modify Search
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
};

export default IdMappingResult;

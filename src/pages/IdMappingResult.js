import React, { useState, useEffect, useReducer } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ID_MAP_REASON, getMappingList } from "../data/mapping";
import PaginatedTable from "../components/PaginatedTable";
import Container from "@material-ui/core/Container";
import DownloadButton from "../components/DownloadButton";
import FeedbackWidget from "../components/FeedbackWidget";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import { axiosError } from "../data/axiosError";
import Button from "react-bootstrap/Button";
import routeConstants from "../data/json/routeConstants";
import idMappingData from "../data/json/idMapping";
import stringConstants from "../data/json/stringConstants";
import IdMappingQuerySummary from "../components/IdMappingQuerySummary";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DownloadAllButton from "../components/DownloadAllButton";
const mappedStrings = stringConstants.id_mapping.common.mapped;

const IdMappingResult = (props) => {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [dataUnmap, setDataUnmap] = useState([]);
  const [legends, setLegends] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [paginationUnmap, setPaginationUnmap] = useState([]);
  const [idMapUnmap, setIdMapUnmap] = useState(ID_MAP_REASON);
  const [query, setQuery] = useState([]);
  const [timestamp, setTimeStamp] = useState();
  const [page, setPage] = useState(1);
  const [pageUnmap, setPageUnmap] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [sizePerPageUnmap, setSizePerPageUnmap] = useState(20);
  const [totalSize, setTotalSize] = useState();
  const [totalSizeUnmap, setTotalSizeUnmap] = useState();
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
          setQuery(data.cache_info.query);
          setTimeStamp(data.cache_info.ts);
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
    getMappingList(id, "unmapped", 1, 20, "input_id")
      .then(({ data }) => {
        if (data.error_code) {
          let message = "list api call";
          logActivity("user", id, "No results. " + message);
          setPageLoading(false);
        } else {
          setDataUnmap(data.results);
          setQuery(data.cache_info.query);
          setTimeStamp(data.cache_info.ts);
          setPaginationUnmap(data.pagination);
          const currentPageUnmap = (data.pagination.offset - 1) / sizePerPageUnmap + 1;
          setPageUnmap(currentPageUnmap);
          setTotalSizeUnmap(data.pagination.total_length);
          setPageLoading(false);
        }
      })
      .catch(function (error) {
        let message = "list api call";
        axiosError(error, id, message, setPageLoading, setAlertDialogInput);
      });
    // eslint-disable-next-line
  }, [id]);

  function handleTableChange(type, { page, sizePerPage, sortField, sortOrder }) {
    setPage(page);
    setSizePerPage(sizePerPage);

    getMappingList(
      id,
      "mapped",
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      sortField,
      sortOrder
    ).then(({ data }) => {
      // place to change values before rendering
      // if (!data.error_code) {
      setLegends(data.cache_info.legends);
      setData(data.results);
      setTimeStamp(data.cache_info.ts);
      setPagination(data.pagination);
      setTotalSize(data.pagination.total_length);
      // }
    });
  }

  function handleTableChangeUnmapped(type, { page, sizePerPage, sortField, sortOrder }) {
    setPageUnmap(page);
    setSizePerPageUnmap(sizePerPage);

    getMappingList(
      id,
      "unmapped",
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      sortField,
      sortOrder
    ).then(({ data }) => {
      // place to change values before rendering
      if (!data.error_code) {
        setDataUnmap(data.results);
        setTimeStamp(data.cache_info.ts);
        setPaginationUnmap(data.pagination);
        setTotalSizeUnmap(data.pagination.total_length);
      }
    });
  }

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
            {column.text} {legends.from}
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
            {column.text} {legends.anchor}
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
            {column.text} {legends.to}
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
        <div id="To-Top"></div>
        <section className="content-box-md">
          {query && (
            <IdMappingQuerySummary
              data={query}
              totalSize={totalSize}
              totalSizeUnmap={totalSizeUnmap}
              timestamp={timestamp}
              onModifySearch={handleModifySearch}
            />
          )}
        </section>

        <DownloadAllButton
          types={[
            {
              display: stringConstants.download.idmapping_list_all_csvdata.displayname,
              type: "csv",
              data: "idmapping_list_all",
            },
          ]}
          dataId={id}
          itemType="idMappingAll"
        />

        <div id="Mapped-Table"></div>
        <DownloadButton
          types={[
            {
              display: stringConstants.download.idmapping_mapped_csvdata.displayname,
              type: "csv",
              data: "idmapping_list_mapped",
            },
          ]}
          dataId={id}
          itemType="idMappingMapped"
        />

        <section>
          {/* Mapped Table */}
          {idMapResultColumns && idMapResultColumns.length !== 0 && (
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
            />
          )}

          {/* Button */}
          <div className="text-right" style={{ marginTop: "48px" }}>
            <Button type="button" className="gg-btn-blue" onClick={handleModifySearch}>
              Modify Request
            </Button>
          </div>
          <br />
          <div className="id-mapping-go-to-top">
            <a href="#To-Top">
              to Top
              <span>
                <ArrowUpwardIcon />
              </span>
            </a>
          </div>
        </section>
        <div id="Unmapped-Table"></div>
        <div className="content-box-sm">
          <h1 className="page-heading">{idMappingData.pageTitleIdMapReason}</h1>
        </div>
        <section>
          <DownloadButton
            types={[
              {
                display: stringConstants.download.idmapping_unmapped_csvdata.displayname,
                type: "csv",
                data: "idmapping_list_unmapped",
              },
            ]}
            dataId={id}
            itemType="idMappingUnmapped"
          />
        </section>
        <section>
          {/* Unmapped Table */}
          {idMapUnmap && idMapUnmap.length !== 0 && (
            <PaginatedTable
              data={dataUnmap}
              columns={idMapUnmap}
              page={pageUnmap}
              sizePerPage={sizePerPageUnmap}
              totalSize={totalSizeUnmap}
              onTableChange={handleTableChangeUnmapped}
              pagination={paginationUnmap}
              defaultSortField="input_id"
              defaultSortOrder="asc"
              noDataIndication={"No data available."}
            />
          )}
          {/* Button */}
          <div className="text-right" style={{ marginTop: "48px" }}>
            <Button type="button" className="gg-btn-blue" onClick={handleModifySearch}>
              Modify Request
            </Button>
          </div>
        </section>
        <br />
        <div className="id-mapping-go-to-top">
          <a href="#To-Top">
            to Top
            <span>
              <ArrowUpwardIcon />
            </span>
          </a>
        </div>
      </Container>
    </>
  );
};

export default IdMappingResult;

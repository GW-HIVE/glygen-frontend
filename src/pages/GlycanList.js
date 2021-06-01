import React, { useState, useEffect, useReducer } from "react";
import Helmet from "react-helmet";
import { Div } from "react-bootstrap";
import { getTitle, getMeta } from "../utils/head";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGlycanList } from "../data";
import { GLYCAN_COLUMNS } from "../data/glycan";
import GlycanQuerySummary from "../components/GlycanQuerySummary";
import PaginatedTable from "../components/PaginatedTable";
import Container from "@material-ui/core/Container";
import DownloadButton from "../components/DownloadButton";
import FeedbackWidget from "../components/FeedbackWidget";
import stringConstants from "../data/json/stringConstants.json";
import ReactHtmlParser from "react-html-parser";
import routeConstants from "../data/json/routeConstants";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import { axiosError } from "../data/axiosError";
import { GLYGEN_BASENAME } from "../envVariables";
// import CheckBox from "../components/CheckBox";
import { Checkbox } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import ListFilter from "../components/ListFilter";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const GlycanList = props => {
  let { id } = useParams();
  let { searchId } = useParams();
  let quickSearch = stringConstants.quick_search;
  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [timestamp, setTimeStamp] = useState();
  const [pagination, setPagination] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(GLYCAN_COLUMNS);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );

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
    setPageLoading(true);
    logActivity("user", id);
    getGlycanList(
      id,
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      "hit_score",
      "desc",
      appliedFilters
    )
      .then(({ data }) => {
        if (data.error_code) {
          let message = "list api call";
          logActivity("user", id, "No results. " + message);
          setPageLoading(false);
        } else {
          setData(data.results);
          if (
            data.cache_info.query.glycan_identifier &&
            data.cache_info.query.glycan_identifier.glycan_id
          ) {
            data.cache_info.query.glycan_identifier.glycan_id_short =
              data.cache_info.query.glycan_identifier.glycan_id.split(",")
                .length > 9
                ? data.cache_info.query.glycan_identifier.glycan_id
                    .split(",")
                    .slice(0, 9)
                    .join(",")
                : "";
          }
          setQuery(fixResidueToShortNames(data.cache_info.query));
          setTimeStamp(data.cache_info.ts);
          setPagination(data.pagination);
          setAvailableFilters(data.filters.available);
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
  }, [appliedFilters]);

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
      sortOrder,
      appliedFilters
    ).then(({ data }) => {
      // place to change values before rendering

      setData(data.results);
      setTimeStamp(data.cache_info.ts);
      setPagination(data.pagination);
      setAvailableFilters(data.filters.available);
      setTotalSize(data.pagination.total_length);
    });
  };

  const handleFilterChange = newFilter => {
    debugger;
    console.log(newFilter);

    const existingFilter = appliedFilters.find(
      filter => filter.id === newFilter.id
    );

    if (
      existingFilter &&
      existingFilter.selected &&
      newFilter &&
      newFilter.selected &&
      (newFilter.selected.length || existingFilter.selected.length)
    ) {
      const otherFilters = appliedFilters.filter(
        filter => filter.id !== newFilter.id
      );

      if (newFilter.selected.length) {
        setAppliedFilters([...otherFilters, newFilter]);
      } else {
        setAppliedFilters(otherFilters);
      }
    } else if (newFilter.selected.length) {
      setAppliedFilters([...appliedFilters, newFilter]);
    }
  };

  function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? "red" : "blue" };
  }
  const handleModifySearch = () => {
    if (searchId === "gs") {
      props.history.push(routeConstants.globalSearchResult + query.term);
    } else if (searchId === "sups") {
      props.history.push(routeConstants.superSearch + id);
    } else if (quickSearch[searchId] !== undefined) {
      const basename = GLYGEN_BASENAME === "/" ? "" : GLYGEN_BASENAME;
      window.location =
        basename +
        routeConstants.quickSearch +
        id +
        "/" +
        quickSearch[searchId].id +
        "#" +
        quickSearch[searchId].id;
    } else {
      props.history.push(routeConstants.glycanSearch + id);
    }
  };

  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <Helmet>
        {getTitle("glycanList")}
        {getMeta("glycanList")}
      </Helmet>

      <FeedbackWidget />
      {/* <Container maxWidth="xl" className="gg-container5"> */}
      <Row className="gg-container">
        <Col sm={12} md={12} lg={12} xl={3} className="sidebar-col-listpage">
          <div className="CollapsableSidebarContainer ">
            <div
              className={
                "CollapsableSidebarContainer__sidebar" +
                (sidebar ? "" : " closed")
              }
            >
              <ListFilter
                availableOptions={availableFilters}
                selectedOptions={appliedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div
              className="CollapsableSidebarContainer__opener"
              onClick={() => setSidebar(!sidebar)}
            >
              {/* <ArrowLeftIcon className="gg-align-middle" fontSize="large" /> */}
            </div>
          </div>
        </Col>

        <Col sm={12} md={12} lg={12} xl={9} className="sidebar-page">
          <div class="CollapsableSidebarContainer__main">
            <PageLoader pageLoading={pageLoading} />
            <DialogAlert
              alertInput={alertDialogInput}
              setOpen={input => {
                setAlertDialogInput({ show: input });
              }}
            />

            <section className="content-box-md">
              <GlycanQuerySummary
                data={query}
                question={quickSearch[searchId]}
                searchId={searchId}
                timestamp={timestamp}
                onModifySearch={handleModifySearch}
              />
            </section>

            <section>
              <DownloadButton
                types={[
                  {
                    display:
                      stringConstants.download.glycan_csvdata.displayname,
                    type: "csv",
                    data: "glycan_list"
                  },
                  {
                    display:
                      stringConstants.download.glycan_jsondata.displayname,
                    type: "json",
                    data: "glycan_list"
                  }
                ]}
                dataId={id}
              />
              {data && data.length !== 0 && (
                <PaginatedTable
                  trStyle={rowStyleFormat}
                  data={data}
                  columns={selectedColumns}
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={totalSize}
                  onTableChange={handleTableChange}
                  defaultSortField="hit_score"
                  defaultSortOrder="desc"
                  idField="glytoucan_ac"
                />
              )}
            </section>
          </div>
        </Col>
      </Row>
      {/* </Container> */}
    </>
  );
};

export default GlycanList;

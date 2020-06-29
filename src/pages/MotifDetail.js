/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from "react";
import { getGlycanImageUrl } from "../data/glycan";
import { useParams } from "react-router-dom";
import { getMotifList } from "../data/motif";
import PaginatedTable from "../components/PaginatedTable";
import { MOTIF_COLUMNS } from "../data/motif";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { Link, Typography, Grid } from "@material-ui/core";
import { Navbar, Col, Row, Image, Container } from "react-bootstrap";
import { FiBookOpen } from "react-icons/fi";
import { groupEvidences, groupSpeciesEvidences } from "../data/data-format";
import EvidenceList from "../components/EvidenceList";
import ClientPaginatedTable from "../components/ClientPaginatedTable";
import "../css/detail.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import DownloadButton from "../components/DownloadButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import DetailTooltips from "../data/json/detailTooltips.json";
// import HelpTooltip from '../components/tooltip/HelpTooltip';
import HelpTooltip from "../components/tooltip/HelpTooltip";
// import LineTooltip from "../components/tooltip/LineTooltip";
import FeedbackWidget from "../components/FeedbackWidget";

import routeConstants from "../data/json/routeConstants";

const items = [
  { label: "General", id: "general" },
  { label: "Glycans", id: "glycans" },
  { label: "Publications", id: "publication" }
];

function addCommas(nStr) {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}

const MotifDetail = props => {
  let { id } = useParams();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [publication, setPublication] = useState([]);
  const [glytoucan, setGlytoucan] = useState([]);
  const [mass, setMass] = useState([]);
  const [classification, setClassification] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(MOTIF_COLUMNS);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [totalSize, setTotalSize] = useState();

  useEffect(() => {
    const getMotifListdata = getMotifList(id);
    getMotifList(id).then(({ data }) => {
      debugger;
      setData(data.results);

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

    getMotifList(
      id,
      (page - 1) * sizePerPage + 1,
      sizePerPage,
      sortField,
      sortOrder
    ).then(({ data }) => {
      // place to change values before rendering

      setData(data.results);
      setPublication(data.publication);
      setGlytoucan(data.glytoucan);
      setPagination(data.pagination);
      setMass(data.mass);
      setClassification(
        data.classification.filter(
          classif =>
            !(classif.type.name === "Other" && classif.subtype.name === "Other")
        )
      );

      //   setSizePerPage()
      setTotalSize(data.pagination.total_length);
    });
  };
  function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx % 2 === 0 ? "red" : "blue" };
  }
  if (data.mass) {
    data.mass = addCommas(data.mass);
  }

  // ==================================== //
  /**
   * Adding toggle collapse arrow icon to card header individualy.
   * @param {object} glytoucan_ac- glytoucan accession ID.
   **/
  const [collapsed, setCollapsed] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      general: true,
      glycans: true,
      publication: true
    }
  );

  function toggleCollapse(name, value) {
    setCollapsed({ [name]: !value });
  }
  const expandIcon = <ExpandMoreIcon fontSize="large" />;
  const closeIcon = <ExpandLessIcon fontSize="large" />;
  // ===================================== //

  return (
    <>
      <Row className="gg-baseline">
        <Col sm={12} md={12} lg={12} xl={3} className="sidebar-col">
          <Sidebar items={items} />
        </Col>

        <Col sm={12} md={12} lg={12} xl={9} className="sidebar-page">
          <div className="content-box-md">
            <Row>
              <Grid item xs={12} sm={12} className="text-center">
                <div className="horizontal-heading">
                  <h5>Look At</h5>
                  <h2>
                    {" "}
                    <span>
                      Motif Details for
                      <strong>
                        {glytoucan && glytoucan.glytoucan_ac && (
                          <> {glytoucan.glytoucan_ac}</>
                        )}
                      </strong>
                    </span>
                  </h2>
                </div>
              </Grid>
            </Row>
          </div>
          <div className="gg-download-btn-width">
            <DownloadButton
              types={[
                {
                  display: "Motif Image (*.png)",
                  type: "png",
                  data: "glycan_image"
                },
                {
                  display: " Motif data (*.csv)",
                  type: "json",
                  data: "motif_detail"
                },
                {
                  display: "Motif data (*.json)",
                  type: "json",
                  data: "motif_detail"
                }
              ]}
              dataId={id}
              dataType="motif_detail"
            />
          </div>

          <React.Fragment>
            {/* <Helmet>
              {getTitle("motifDetail", {
                glytoucan_ac:
                  glytoucan && glytoucan.glytoucan_ac
                    ? glytoucan.glytoucan_ac
                    : ""
              })}
              {getMeta("glycanDetail")}
            </Helmet> */}
            <FeedbackWidget />
            {/* <ToggleCardlTemplate /> */}
            {/* general */}
            <Accordion
              id="general"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.motif.general.title}
                      text={DetailTooltips.motif.general.text}
                      urlText={DetailTooltips.motif.general.urlText}
                      url={DetailTooltips.motif.general.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h3 className="gg-green d-inline">General</h3>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() =>
                        toggleCollapse("general", collapsed.general)
                      }
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.general ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>
                      {glytoucan && glytoucan.glytoucan_ac && (
                        <>
                          <p>
                            <img
                              className="img-cartoon"
                              src={getGlycanImageUrl(glytoucan.glytoucan_ac)}
                              alt="Cartoon"
                            />
                          </p>
                          <div>
                            <strong>GlyToucan Accession: </strong>
                            <Link
                              href={glytoucan.glytoucan_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {glytoucan.glytoucan_ac}
                            </Link>
                          </div>
                          <div>
                            <strong>Monoisotopic Mass: </strong>
                            {mass} Da
                          </div>
                        </>
                      )}
                      {classification && classification.length > 0 && classification[0].type.name !== "Other" && (
                        <div>
                          <strong>Glycan Type / Subtype : </strong>

                          {classification.map(Formatclassification => (
                            <>
                              <Link
                                href={Formatclassification.type.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {Formatclassification.type.name}
                              </Link>
                              &nbsp; <b>/</b> &nbsp;
                              <Link
                                href={Formatclassification.subtype.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {Formatclassification.subtype.name}
                              </Link>
                            </>
                          ))}
                        </div>
                      )}
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* Glycans Containing This Motif */}
            <Accordion
              id="glycans"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.motif.glycans.title}
                      text={DetailTooltips.motif.glycans.text}
                      urlText={DetailTooltips.motif.glycans.urlText}
                      url={DetailTooltips.motif.glycans.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h3 className="gg-green d-inline">
                    Glycans Containing This Motif
                  </h3>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() =>
                        toggleCollapse("glycans", collapsed.glycans)
                      }
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.glycans ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
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
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* publication */}
            <Accordion
              id="publication"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.motif.publications.title}
                      text={DetailTooltips.motif.publications.text}
                      urlText={DetailTooltips.motif.publications.urlText}
                      url={DetailTooltips.motif.publications.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h3 className="gg-green d-inline">Publications</h3>
                  <div className="float-right">
                    {/* <span className='gg-align-middle card-icon-space'>
										<PublicationsMenu />
									</span> */}
                    <Accordion.Toggle
                      // as={Card.Header}
                      eventKey="0"
                      onClick={() =>
                        toggleCollapse("publication", collapsed.publication)
                      }
                      className="gg-green arrow-btn"
                    >
                      <span>
                        {collapsed.publication ? closeIcon : expandIcon}
                      </span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0" out={!collapsed.publication}>
                  <Card.Body className="card-padding-zero">
                    <Table hover fluid>
                      {publication && (
                        <tbody className="table-body">
                          {publication.map((pub, pubIndex) => (
                            <tr className="table-row">
                              <td key={pubIndex}>
                                <p>
                                  <div>
                                    <h5 style={{ marginBottom: "3px" }}>
                                      <strong>{pub.title}</strong>
                                    </h5>
                                  </div>
                                  <div>{pub.authors}</div>
                                  <div>
                                    {pub.journal} <span>&nbsp;</span>({pub.date}
                                    )
                                  </div>
                                  <div>
                                    <FiBookOpen />
                                    <span style={{ paddingLeft: "15px" }}>
                                      PMID:
                                    </span>{" "}
                                    <a
                                      href={pub.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {pub.pmid}
                                    </a>
                                  </div>
                                  <EvidenceList
                                    evidences={groupEvidences(pub.evidence)}
                                  />
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                      {!publication && (
                        <p className="no-data-msg-publication">
                          No data available.
                        </p>
                      )}
                    </Table>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </React.Fragment>
        </Col>
      </Row>
    </>
  );
};

export default MotifDetail;

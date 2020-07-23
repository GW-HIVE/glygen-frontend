/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from "react";
import { getIsoAlignment } from "../data/protein";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { Link, Typography, Grid } from "@material-ui/core";
import { Navbar, Col, Row, Image } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import DownloadButton from "../components/DownloadButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DetailTooltips from "../data/json/detailTooltips.json";
import HelpTooltip from "../components/tooltip/HelpTooltip";
import LineTooltip from "../components/tooltip/LineTooltip";
import FeedbackWidget from "../components/FeedbackWidget";
import routeConstants from "../data/json/routeConstants";
import stringConstants from "../data/json/stringConstants";
import Alignment from "../components/Alignment";
import Button from "react-bootstrap/Button";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import { axiosError } from "../data/axiosError";

// const proteinStrings = stringConstants.protein.common;

const items = [
  { label: "Alignment", id: "alignment" },
  { label: "Summary", id: "summary" }
];

const ProteinAlignment = () => {
  let { id, alignment } = useParams();

  const [data, setData] = useState({});

  const isIsoform = alignment === "isoformset-uniprotkb";
  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  useEffect(() => {
    setPageLoading(true);
    logActivity("user", id);
    const getData = getIsoAlignment(id, alignment);
    getData.then(({ data }) => {
      if (data.code) {
        let message = "Alignment api call";
        logActivity("user", id, "No results. " + message);
        setPageLoading(false);
      } else {
        setData(data);
        setPageLoading(false);
      }
    });

    getData.catch(({ response }) => {
      let message = "alignment api call";
      axiosError(response, id, message, setPageLoading, setAlertDialogInput);
    });
    // eslint-disable-next-line
  }, []);

  const perLine = 60;
  // ==================================== //
  /**
   * Adding toggle collapse arrow icon to card header individualy.
   * @param {object} uniprot_canonical_ac- uniprot accession ID.
   **/
  const [collapsed, setCollapsed] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      alignment: true,
      summary: true
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
          <div className="sidebar-page-mb">
            <div className="content-box-md">
              <Row>
                <Grid item xs={12} sm={12} className="text-center">
                  <div className="horizontal-heading">
                    <h5>Look At</h5>
                    <h2>
                      {" "}
                      <span>
                        {isIsoform ? "Isoform" : "Homolog"} Alignment for
                        protein <strong className="nowrap">{id}</strong>
                      </span>
                    </h2>
                  </div>
                </Grid>
              </Row>
            </div>
            <React.Fragment>
              <Helmet>
                {getTitle("proteinAlignment", {
                  uniprot_canonical_ac: id && id ? id : ""
                })}
                {getMeta("proteinAlignment")}
              </Helmet>
              <FeedbackWidget />
              <PageLoader pageLoading={pageLoading} />
              <DialogAlert
                alertInput={alertDialogInput}
                setOpen={input => {
                  setAlertDialogInput({ show: input });
                }}
              />
              {/* Button */}
              <div className="text-right gg-download-btn-width">
                <NavLink to={`${routeConstants.proteinDetail}${id}`}>
                  <Button
                    type="button"
                    style={{ marginLeft: "5px" }}
                    className="gg-btn-blue"
                  >
                    Back To details
                  </Button>
                </NavLink>
              </div>
              {/* Alignment */}
              <Accordion
                id="alignment"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.alignment.Isoalignment.title}
                        text={DetailTooltips.alignment.Isoalignment.text}
                        urlText={DetailTooltips.alignment.Isoalignment.urlText}
                        url={DetailTooltips.alignment.Isoalignment.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h3 className="gg-green d-inline">Alignment</h3>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("alignment", collapsed.alignment)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.alignment ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0" out={!collapsed.alignment}>
                    <Card.Body className="card-padding-zero">
                      {data && data.sequences && (
                        <Alignment alignmentData={data} perLine={perLine} />
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/* Summary */}
              <Accordion
                id="summary"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.alignment.Isoalignment.title}
                        text={DetailTooltips.alignment.Isoalignment.text}
                        urlText={DetailTooltips.alignment.Isoalignment.urlText}
                        url={DetailTooltips.alignment.Isoalignment.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h3 className="gg-green d-inline">Summary</h3>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("summary", collapsed.summary)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.summary ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0" out={!collapsed.summary}>
                    <Card.Body className="card-padding-zero">
                      <Table hover fluid>
                        <tbody className="table-body">
                          <div className="trclass">
                            <strong>Date: </strong>
                            {data.date}
                          </div>
                          <hr></hr>
                          {data && data.algorithm && (
                            <div className="trclass">
                              {" "}
                              <strong>Algorithm: </strong>
                              <Link
                                href={data.algorithm.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {data.algorithm.name}
                              </Link>
                            </div>
                          )}
                          <hr></hr>
                          <div className="trclass">
                            {" "}
                            <strong>Identity Position: </strong>{" "}
                            {data.identical_positions}
                          </div>
                          <hr></hr>
                          <div className="trclass">
                            {" "}
                            <strong>Similar Position: </strong>{" "}
                            {data.similar_positions}
                          </div>
                          <hr></hr>
                          <div className="trclass">
                            {" "}
                            <strong>Cluster ID: </strong> {data.cls_id}
                          </div>
                          <hr></hr>
                          <div className="trclass">
                            {" "}
                            <strong>Identity: </strong> {data.identity}
                          </div>
                          <hr></hr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/* Button */}
              <div className="text-right gg-download-btn-width">
                <NavLink to={`${routeConstants.proteinDetail}${id}`}>
                  <Button
                    type="button"
                    style={{ marginLeft: "5px" }}
                    className="gg-btn-blue"
                  >
                    Back To details
                  </Button>
                </NavLink>
              </div>
            </React.Fragment>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProteinAlignment;

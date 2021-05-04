import React, { useEffect, useState, useReducer } from "react";
import { getPublicationDetail } from "../data/publication";
import { useParams, Link } from "react-router-dom";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../components/navigation/Sidebar";
import { logActivity } from "../data/logging";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import HelpTooltip from "../components/tooltip/HelpTooltip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DetailTooltips from "../data/json/detailTooltips.json";
import stringConstants from "../data/json/stringConstants";
import DownloadButton from "../components/DownloadButton";
import { Grid } from "@material-ui/core";
import FeedbackWidget from "../components/FeedbackWidget";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import { axiosError } from "../data/axiosError";
import EvidenceList from "../components/EvidenceList";
import { groupEvidences } from "../data/data-format";
import Button from "react-bootstrap/Button";
import { FiBookOpen } from "react-icons/fi";

const items = [
  { label: "Gleneral", id: "General" },
  { label: "Glycosylation", id: "Glycosylation" },
  { label: "Phosphorylation", id: "Phosphorylation" },
  { label: "Referenced Proteins", id: "Referenced-Proteins" },
  { label: "Referenced Glycans", id: "Referenced-Glycans" },
];
const Publication = (props) => {
  let { id } = useParams();
  let { publType } = useParams();

  const [detailData, setDetailData] = useState({});
  const [refProteins, setRefProteins] = useState([]);
  const [refGlycans, setRefGlycans] = useState([]);

  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  useEffect(() => {
    setPageLoading(true);
    logActivity("user", id);
    const getPublData = getPublicationDetail(id, publType);

    getPublData.then(({ data }) => {
      if (data.code) {
        let message = "Publication api call";
        logActivity("user", id, "No results. " + message);
        setPageLoading(false);
      } else {
        setDetailData(data);
        setRefProteins(data);
        setRefGlycans(data);
        setPageLoading(false);
      }
    });

    getPublData.catch(({ response }) => {
      let message = "Publication api call";
      axiosError(response, id, message, setPageLoading, setAlertDialogInput);
    });
  }, [id, publType]);
  const {
    date,
    title,
    journal,
    evidence,
    authors,
    record_id,
    abstract,
    referenced_proteins,
    referenced_glycans,
  } = detailData;
  /**
   * Adding toggle collapse arrow icon to card header individualy.
   * @param {object} uniprot_canonical_ac- uniprot accession ID.
   **/
  const [collapsed, setCollapsed] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      general: true,
      glycosylation: true,
      phosphorylation: true,
      referenced_proteins: true,
      referenced_glycans: true,
    }
  );

  /**
   * Adding toggle collapse arrow icon to card header individualy.
   * @param {object} name
   *  * @param {object} value
   **/
  function toggleCollapse(name, value) {
    setCollapsed({ [name]: !value });
  }
  const expandIcon = <ExpandMoreIcon fontSize="large" />;
  const closeIcon = <ExpandLessIcon fontSize="large" />;
  return (
    <>
      <Helmet>
        {getTitle("publicationDetail")}
        {getMeta("publicationDetail")}
      </Helmet>
      <CssBaseline />
      <div id="top-heading"></div>
      <Row className="gg-baseline">
        <Col sm={12} md={12} lg={12} xl={3} className="sidebar-col">
          <Sidebar items={items} />
        </Col>
        <Col sm={12} md={12} lg={12} xl={9} className="sidebar-page">
          <div className="sidebar-page-mb">
            <div className="content-box-md5 mt-5">
              <Row>
                <Grid item xs={12} sm={12} className="text-center">
                  <div className="horizontal-heading">
                    <h5>Look At</h5>
                    <h2>
                      <span>
                        <strong className="nowrap">Publication</strong> Specific Detail
                        <strong className="nowrap"> {record_id}</strong>
                      </span>
                    </h2>
                  </div>
                </Grid>
              </Row>
            </div>
            {props.history && props.history.length > 1 && (
              <div className="text-right gg-download-btn-width pb-3">
                <Button
                  type="button"
                  className="gg-btn-blue"
                  onClick={() => {
                    props.history.goBack();
                  }}
                >
                  Back
                </Button>
              </div>
            )}
            <div className="gg-download-btn-width">
              <DownloadButton
                types={[
                  {
                    display: stringConstants.download.publication_jsondata.displayname,
                    type: "json",
                    data: "publication_detail",
                  },
                  {
                    display: stringConstants.download.publication_csvdata.displayname,
                    type: "csv",
                    data: "publication_detail",
                  },
                ]}
                dataId={id}
                itemType="publication"
              />
            </div>
            <FeedbackWidget />
            <PageLoader pageLoading={pageLoading} />
            <DialogAlert
              alertInput={alertDialogInput}
              setOpen={(input) => {
                setAlertDialogInput({ show: input });
              }}
            />
            {/* General */}
            <Accordion
              id="General"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.publication.general.title}
                      text={DetailTooltips.publication.general.text}
                      urlText={DetailTooltips.publication.general.urlText}
                      url={DetailTooltips.publication.general.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.general.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("general", collapsed.general)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.general ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {detailData && (
                      <>
                        <div>
                          <h5 style={{ marginBottom: "3px" }}>
                            <strong>{title}</strong>
                          </h5>
                        </div>
                        <div>{authors}</div>
                        <div>
                          {journal} <span>&nbsp;</span>({date})
                        </div>
                        <FiBookOpen />
                        <span style={{ paddingLeft: "15px" }}>
                          {record_id}
                          {/* {glycanStrings.pmid.shortName}: */}
                          {/* {glycanStrings.referenceType[ref.type].shortName}: */}
                        </span>{" "}
                        {/* <Link to={`${routeConstants.publication}${ref.id}/pmid`}>
                          <>{ref.id}</>
                        </Link> */}
                        <EvidenceList inline={true} evidences={groupEvidences(evidence)} />
                        <div className={"mt-2"}>
                          <strong>Abstract:</strong>
                        </div>
                        <div>{abstract}</div>
                      </>
                    )}
                    {!detailData && <p className="no-data-msg-publication">No data available.</p>}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* glycosylation */}
            <Accordion
              id="Glycosylation"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.publication.glycosylation.title}
                      text={DetailTooltips.publication.glycosylation.text}
                      urlText={DetailTooltips.publication.glycosylation.urlText}
                      url={DetailTooltips.publication.glycosylation.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.glycosylation.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("glycosylation", collapsed.glycosylation)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.glycosylation ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Glycosylation Data</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* Phosphorylation */}
            <Accordion
              id="Phosphorylation"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.protein.phosphorylation.title}
                      text={DetailTooltips.protein.phosphorylation.text}
                      urlText={DetailTooltips.protein.phosphorylation.urlText}
                      url={DetailTooltips.protein.phosphorylation.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.phosphorylation.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("phosphorylation", collapsed.phosphorylation)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.phosphorylation ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Phosphorylation Data</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* Referenced-Proteins */}
            <Accordion
              id="Referenced-Proteins"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.publication.referenced_proteins.title}
                      text={DetailTooltips.publication.referenced_proteins.text}
                      urlText={DetailTooltips.publication.referenced_proteins.urlText}
                      url={DetailTooltips.publication.referenced_proteins.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.referenced_proteins.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() =>
                        toggleCollapse("referenced_proteins", collapsed.referenced_proteins)
                      }
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.referenced_proteins ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {referenced_proteins && (
                      <>
                        <div>
                          <ul className="list-style-none">
                            <Row>
                              {referenced_proteins.map((refProt) => (
                                <Col key={refProt} className="nowrap" xs={6} sm={4} lg={3} xl={2}>
                                  <li>{refProt}</li>
                                </Col>
                              ))}
                            </Row>
                          </ul>
                        </div>
                      </>
                    )}
                    {!referenced_proteins && <span>No data available.</span>}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* Referenced-Glycans */}
            <Accordion
              id="Referenced-Glycans"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.publication.referenced_glycans.title}
                      text={DetailTooltips.publication.referenced_glycans.text}
                      urlText={DetailTooltips.publication.referenced_glycans.urlText}
                      url={DetailTooltips.publication.referenced_glycans.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.referenced_glycans.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() =>
                        toggleCollapse("referenced_glycans", collapsed.referenced_glycans)
                      }
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.referenced_glycans ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {referenced_glycans && (
                      <>
                        <div>
                          <ul className="list-style-none">
                            <Row>
                              {referenced_glycans.map((refGlyc) => (
                                <Col key={refGlyc} className="nowrap" xs={6} sm={4} lg={3} xl={2}>
                                  <li>{refGlyc}</li>
                                </Col>
                              ))}
                            </Row>
                          </ul>
                        </div>
                      </>
                    )}
                    {!referenced_glycans && <span>No data available.</span>}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Publication;

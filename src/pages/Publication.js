import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import CssBaseline from "@material-ui/core/CssBaseline";
// import VerticalHeadingLogo from "../components/headings/VerticalHeadingLogo";
// import PanelHowToCite from "../components/PanelHowToCite";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import howToCiteData from "../data/json/howToCiteData";
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
// https://zbib.org/   to generate .RIS file

const items = [
  { label: "Gleneral", id: "General" },
  { label: "Glycosylation", id: "Glycosylation" },
  { label: "Cell Line/Tissue", id: "Cell-Line-Tissue" },
  { label: "Abundance", id: "Abundance" },
  { label: "Referenced Proteins", id: "Referenced-Proteins" },
  { label: "Referenced Glycans", id: "Referenced-Glycans" },
];
const Publication = (props) => {
  let { id } = useParams();
  // const vertHeadHowToCite = {
  //   h5VerticalText: "Look At",
  //   h2textTopStrongBefore: "Publication",
  //   h2textBottom: "Specific Detail",
  // };

  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const [collapsed, setCollapsed] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      general: true,
      glycosylation: true,
      cell_line_tissue: true,
      abundance: true,
      referenced_proteins: true,
      referenced_glycans: true,
    }
  );

  useEffect(() => {
    // setPageLoading(true);
    setPageLoading(false);
    logActivity("user", id);
  }, [id]);

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
            {/* <VerticalHeadingLogo
              post={vertHeadHowToCite}
            /> */}
            <div className="content-box-md">
              <Row>
                <Grid item xs={12} sm={12} className="text-center">
                  <div className="horizontal-heading">
                    <h5>Look At</h5>
                    <h2>
                      <span>
                        <strong className="nowrap">Publication</strong> Specific Detail
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
                  <Card.Body>General Data</Card.Body>
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
            {/* Cell-Line-Tissue */}
            <Accordion
              id="Cell-Line-Tissue"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.publication.cell_line_tissue.title}
                      text={DetailTooltips.publication.cell_line_tissue.text}
                      urlText={DetailTooltips.publication.cell_line_tissue.urlText}
                      url={DetailTooltips.publication.cell_line_tissue.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.cell_line_tissue.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("cell_line_tissue", collapsed.cell_line_tissue)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.cell_line_tissue ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Cell Line/Tissue Data</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* Abundance */}
            <Accordion
              id="Abundance"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.publication.abundance.title}
                      text={DetailTooltips.publication.abundance.text}
                      urlText={DetailTooltips.publication.abundance.urlText}
                      url={DetailTooltips.publication.abundance.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.abundance.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("abundance", collapsed.abundance)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.abundance ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Abundance Data</Card.Body>
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
                  <Card.Body>Referenced Proteins Data</Card.Body>
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
                  <Card.Body>Referenced Glycans Data</Card.Body>
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

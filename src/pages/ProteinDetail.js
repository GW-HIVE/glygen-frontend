/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from "react";
import { getProteinDetail, getGlycanImageUrl } from "../data/protein";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { Link, Typography, Grid } from "@material-ui/core";
import { Navbar, Col, Row, Image } from "react-bootstrap";
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
// import PublicationsMenu from '../components/PublicationsMenu';
import relatedGlycansIcon from "../images/icons/related-glycans-icon.svg";
// import { withStyles } from '@material-ui/core/styles';
import DetailTooltips from "../data/json/detailTooltips.json";
// import HelpTooltip from '../components/tooltip/HelpTooltip';
import HelpTooltip from "../components/tooltip/HelpTooltip";
import LineTooltip from "../components/tooltip/LineTooltip";
import FeedbackWidget from "../components/FeedbackWidget";
// import ReactCopyClipboard from'../components/ReactCopyClipboard';
import routeConstants from "../data/json/routeConstants";

import stringConstants from "../data/json/stringConstants";

const proteinStrings = stringConstants.protein.common;

const items = [
  { label: "General", id: "general" },
  { label: "Species", id: "species" },
  { label: "Function", id: "function" },
  { label: "Go Annotation", id: "go annotation" },
  { label: "Glycosylation", id: "glycosylation" },
  { label: "Sequence", id: "seqence" },
  { label: "Pathway", id: "pathway" },
  { label: "Isoforms", id: "isoforms" },
  { label: "Homologs", id: "homomlogs" },
  { label: "Disease", id: "disease" },
  { label: "Mutation", id: "mutation" },
  { label: "Expression Tissue", id: "expressionT" },
  { label: "Expression Disease", id: "expressionD" },
  { label: "Cross References", id: "crossRef" },
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

const getItemsCrossRef = data => {
  let itemscrossRef = [];

  //check data.
  if (data.crossref) {
    for (let crossrefitem of data.crossref) {
      let found = "";
      for (let databaseitem of itemscrossRef) {
        if (databaseitem.database === crossrefitem.database) {
          found = true;
          databaseitem.links.push({
            url: crossrefitem.url,
            id: crossrefitem.id
          });
        }
      }
      if (!found) {
        itemscrossRef.push({
          database: crossrefitem.database,
          links: [
            {
              url: crossrefitem.url,
              id: crossrefitem.id
            }
          ]
        });
      }
    }
  }
  return itemscrossRef;
};

const ProteinDetail = props => {
  let { id } = useParams();

  const [detailData, setDetailData] = useState({});
  const [itemsCrossRef, setItemsCrossRef] = useState([]);

  useEffect(() => {
    const getProteinDetailData = getProteinDetail(id);

    getProteinDetailData.then(({ data }) => {
      if (data.code) {
        console.log(data.code);
      } else {
        setItemsCrossRef(getItemsCrossRef(data));

        setDetailData(data);
      }
    });

    getProteinDetailData.catch(({ response }) => {
      alert(JSON.stringify(response));
    });
    // eslint-disable-next-line
  }, []);

  if (detailData.mass) {
    detailData.mass = addCommas(detailData.mass);
  }
  if (detailData.mass_pme) {
    detailData.mass_pme = addCommas(detailData.mass_pme);
  }

  const { mass, uniprot, species, publication } = detailData;

  const speciesEvidence = groupSpeciesEvidences(species);

  // ==================================== //
  /**
   * Adding toggle collapse arrow icon to card header individualy.
   * @param {object} uniprot_canonical_ac- uniprot accession ID.
   **/
  const [collapsed, setCollapsed] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      general: true,
      species: true,
      function: true,
      go_annotation: true,
      glycosylation: true,
      seqence: true,
      pathway: true,
      isoforms: true,
      homomlogs: true,
      disease: true,
      mutation: true,
      expressionT: true,
      expressionD: true,
      crossref: true,
      publication: true
    }
  );

  function toggleCollapse(name, value) {
    setCollapsed({ [name]: !value });
  }
  const expandIcon = <ExpandMoreIcon fontSize="large" />;
  const closeIcon = <ExpandLessIcon fontSize="large" />;
  // ===================================== //

  /**
   * Redirect and opens uniprot_canonical_ac in a subsumption browser
   * @param {object} uniprot_canonical_ac- uniprot accession ID.
   **/
  function handleOpenSubsumptionBrowse(uniprot_canonical_ac) {
    var url =
      "https://raw.githack.com/glygen-glycan-data/GNOme/GlyGen_DEV/restrictions/GNOme_GlyGen.browser.html?focus=" +
      uniprot_canonical_ac;
    window.open(url);
  }

  return (
    <>
      <Row>
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
                      Details for Glycan
                      <strong>
                        {uniprot && uniprot.uniprot_canonical_ac && (
                          <> {uniprot.uniprot_canonical_ac}</>
                        )}
                      </strong>
                    </span>
                  </h2>
                </div>
              </Grid>
            </Row>
          </div>
          {/* <div className='gg-download-btn-width'>
						<DownloadButton
							types={[
							
								{
									display: ' Protein data (*.csv)',
									type: 'json',
									data: 'protein_detail',
								},
							]}
							dataType='protein_detail'
							dataId={id}
						/>
					</div> */}

          <React.Fragment>
            <Helmet>
              {getTitle("proteinDetail", {
                uniprot_canonical_ac:
                  uniprot && uniprot.uniprot_canonical_ac
                    ? uniprot.uniprot_canonical_ac
                    : ""
              })}
              {getMeta("proteinDetail")}
            </Helmet>
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
                      title={DetailTooltips.glycan.general.title}
                      text={DetailTooltips.glycan.general.text}
                      urlText={DetailTooltips.glycan.general.urlText}
                      url={DetailTooltips.glycan.general.url}
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
                      {uniprot && uniprot.uniprot_canonical_ac && (
                        <>
                          <div>
                            <strong>
                              {proteinStrings.uniprot_accession.name}:{" "}
                            </strong>
                            <Link
                              href={uniprot.uniprot_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {uniprot.uniprot_canonical_ac}
                            </Link>
                          </div>
                        </>
                      )}
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {/* publication */}
          </React.Fragment>
        </Col>
      </Row>
    </>
  );
};

export default ProteinDetail;

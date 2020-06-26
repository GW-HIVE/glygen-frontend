/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from "react";
import { getProteinDetail } from "../data/protein";
import SequenceDisplay from "../components/SequenceDisplay";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Sidebar from "../components/navigation/Sidebar";
import Helmet from "react-helmet";
import Button from "react-bootstrap/Button";
import { getTitle, getMeta } from "../utils/head";
import { Link, Typography, Grid } from "@material-ui/core";
import { Navbar, Col, Row, Image } from "react-bootstrap";
import { groupEvidences, groupSpeciesEvidences } from "../data/data-format";
import EvidenceList from "../components/EvidenceList";
import "../css/detail.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import DownloadButton from "../components/DownloadButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import relatedGlycansIcon from "../images/icons/related-glycans-icon.svg";
import DetailTooltips from "../data/json/detailTooltips.json";
import HelpTooltip from "../components/tooltip/HelpTooltip";
import FeedbackWidget from "../components/FeedbackWidget";
import routeConstants from "../data/json/routeConstants";
import stringConstants from "../data/json/stringConstants";
import { getGlycanImageUrl } from "../data/glycan";

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

const proteinStrings = stringConstants.protein.common;

const items = [
  { label: "General", id: "general" },

  { label: "Sequence", id: "sequence" }
];

const ProteinDetail = props => {
  let { id } = useParams();

  const [detailData, setDetailData] = useState({});

  const [glycosylationTabSelected, setGlycosylationTabSelected] = useState(
    "with_glycanId"
  );
  const [glycosylationWithImage, setGlycosylationWithImage] = useState([]);
  const [glycosylationWithoutImage, setGlycosylationWithoutImage] = useState(
    []
  );

  useEffect(() => {
    const getProteinDetailData = getProteinDetail(id);

    getProteinDetailData.then(({ data }) => {
      if (data.code) {
        console.log(data.code);
      } else {
        setDetailData(data);
      }
    });

    getProteinDetailData.catch(({ response }) => {
      alert(JSON.stringify(response));
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (detailData.glycosylation) {
      const withImage = detailData.glycosylation.filter(
        item => item.glytoucan_ac
      );
      const withoutImage = detailData.glycosylation.filter(
        item => !item.glytoucan_ac
      );
      setGlycosylationWithImage(withImage);
      setGlycosylationWithoutImage(withoutImage);
    }

    if (detailData.sequence) {
      var originalSequence = detailData.sequence.sequence;
      detailData.sequence.sequence = originalSequence.split("");
    }
  }, [detailData]);

  const {
    uniprot,
    mass,
    recommendedname,
    gene,
    refseq,
    species,
    glycosylation,
    sequence,
    site_annotation
  } = detailData;

  // ==================================== //
  /**
   * Adding toggle collapse arrow icon to card header individualy.
   * @param {object} uniprot_canonical_ac- uniprot accession ID.
   **/
  const [collapsed, setCollapsed] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    {
      general: true,
      glycosylation: true,
      seqence: true
    }
  );

  function toggleCollapse(name, value) {
    setCollapsed({ [name]: !value });
  }
  const expandIcon = <ExpandMoreIcon fontSize="large" />;
  const closeIcon = <ExpandLessIcon fontSize="large" />;
  // ===================================== //

  /**
   * Redirect and opens uniprot_canonical_ac in a GO Term List Page
   * @param {object} uniprot_canonical_ac- uniprot accession ID.
   **/
  function handleOpenGOTermListPage(uniprot_canonical_ac) {
    var url =
      "https://www.ebi.ac.uk/QuickGO/annotations?geneProductId=" +
      uniprot_canonical_ac;
    window.open(url);
  }

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
                      Details for Protein
                      <strong>
                        {uniprot && uniprot.uniprot_canonical_ac && (
                          <> {uniprot.uniprot_canonical_ac}</>
                        )}
                      </strong>
                    </span>
                  </h2>
                  <Link href={`${routeConstants.proteinDetail}${id}`}>
                    <Button
                      type="button"
                      style={{ marginLeft: "5px" }}
                      className="gg-btn-blue"
                    >
                      Back To details
                    </Button>
                  </Link>
                </div>
              </Grid>
            </Row>
          </div>

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
                      title={DetailTooltips.protein.general.title}
                      text={DetailTooltips.protein.general.text}
                      urlText={DetailTooltips.protein.general.urlText}
                      url={DetailTooltips.protein.general.url}
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
                    <div
                      style={{
                        marginBottom: "5px"
                      }}
                    >
                      {gene && (
                        <tbody className="table-body">
                          {gene.map((genes, genesname) => (
                            <td key={genesname}>
                              <div>
                                <strong>
                                  {proteinStrings.gene_name.name}:
                                </strong>{" "}
                                <Link
                                  href={genes.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {genes.name}
                                </Link>
                              </div>

                              <div>
                                <strong>
                                  {proteinStrings.gene_location.name}:
                                </strong>{" "}
                                Chromosome: {""}
                                {genes.locus.chromosome} {""} (
                                {genes.locus.start_pos} - {genes.locus.end_pos})
                              </div>

                              <EvidenceList
                                evidences={groupEvidences(genes.locus.evidence)}
                              />
                            </td>
                          ))}
                        </tbody>
                      )}
                      {!gene && (
                        <p className="no-data-msg-publication">
                          No data available.
                        </p>
                      )}
                    </div>

                    <p>
                      {uniprot && uniprot.uniprot_canonical_ac && (
                        <>
                          <div>
                            <strong>{proteinStrings.uniprot_id.name}: </strong>
                            <Link
                              href={uniprot.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {uniprot.uniprot_id}{" "}
                            </Link>
                          </div>
                          <div>
                            <strong>
                              {proteinStrings.uniprot_accession.name}:{" "}
                            </strong>
                            <Link
                              href={uniprot.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {uniprot.uniprot_canonical_ac}
                            </Link>
                          </div>
                          <div>
                            <strong>
                              {proteinStrings.sequence_length.name}:{" "}
                            </strong>
                            <Link
                              href="https://www.uniprot.org/uniprot/#sequnce"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {uniprot.length}
                            </Link>
                          </div>
                          <div>
                            <strong>
                              {proteinStrings.recommendedname.name}:{" "}
                            </strong>{" "}
                            {recommendedname.full}{" "}
                          </div>
                          <div>
                            <strong>
                              {proteinStrings.chemical_mass.name}:{" "}
                            </strong>
                            {addCommas(mass.chemical_mass)} - Da
                          </div>
                          <div>
                            <strong>{proteinStrings.refseq_ac.name}: </strong>{" "}
                            <Link
                              href={refseq.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {" "}
                              {refseq.ac}{" "}
                            </Link>{" "}
                          </div>
                          <div>
                            {" "}
                            <strong>
                              {proteinStrings.refSeq_name.name}:{" "}
                            </strong>{" "}
                            {refseq.name}{" "}
                          </div>{" "}
                        </>
                      )}
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/*  Sequence */}
            <Accordion
              id="sequence"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.protein.sequence.title}
                      text={DetailTooltips.protein.sequence.text}
                      urlText={DetailTooltips.protein.sequence.urlText}
                      url={DetailTooltips.protein.sequence.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h3 className="gg-green d-inline">Sequence</h3>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() =>
                        toggleCollapse("sequence", collapsed.sequence)
                      }
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.sequence ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row>
                      <Col align="left">
                        <pre>hi</pre>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/*  Pathway */}
          </React.Fragment>
        </Col>
      </Row>
    </>
  );
};

export default ProteinDetail;

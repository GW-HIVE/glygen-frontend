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
import HelpTooltip from "../components/tooltip/HelpTooltip";
import LineTooltip from "../components/tooltip/LineTooltip";
import FeedbackWidget from "../components/FeedbackWidget";
// import ReactCopyClipboard from'../components/ReactCopyClipboard';
import routeConstants from "../data/json/routeConstants";
import FunctionList from "../components/FunctionList";
import GoannotationList from "../components/Goannotationlist";
import ProteinSequenceDisplay from "../components/ProteinSequenceDisplay";

import stringConstants from "../data/json/stringConstants";

const proteinStrings = stringConstants.protein.common;

const items = [
  { label: "General", id: "general" },
  { label: "Species", id: "species" },
  { label: "Function", id: "function" },
  { label: "Go Annotation", id: "go_annotation" },
  { label: "Glycosylation", id: "glycosylation" },
  { label: "Sequence", id: "sequence" },
  { label: "Pathway", id: "pathway" },
  { label: "Isoforms", id: "isoforms" },
  { label: "Homologs", id: "homologs" },
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

const getItemsPathway = data => {
  let itemspathway = [];

  //check data.
  if (data.pathway) {
    for (let pathwayitem of data.pathway) {
      let found = "";
      for (let resourceitem of itemspathway) {
        if (resourceitem.resource === pathwayitem.resource) {
          found = true;
          resourceitem.links.push({
            url: pathwayitem.url,
            id: pathwayitem.id
          });
        }
      }
      if (!found) {
        itemspathway.push({
          resource: pathwayitem.resource,
          links: [
            {
              url: pathwayitem.url,
              id: pathwayitem.id
            }
          ]
        });
      }
    }
  }
  return itemspathway;
};

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

// useEffect(() => {
//   const withImage = detailData.glycosylation.filter(
//     item => item.glytoucan_ac
//   );
//   const withoutImage = detailData.glycosylation.filter(
//     item => !item.glytoucan_ac
//   );
//   setGlycosylationWithImage(withImage);
//   setGlycosylationWithoutImage(withoutImage);
// }, [detailData]);

const ProteinDetail = props => {
  let { id } = useParams();

  const [detailData, setDetailData] = useState({});
  const [itemsCrossRef, setItemsCrossRef] = useState([]);
  const [itemsPathway, setItemsPathway] = useState([]);
  // const [glycosylationWithImage, setGlycosylationWithImage] = useState([]);
  // const [glycosylationWithoutImage, setGlycosylationWithoutImage] = useState(
  //   []
  // );

  useEffect(() => {
    const getProteinDetailData = getProteinDetail(id);

    getProteinDetailData.then(({ data }) => {
      if (data.code) {
        console.log(data.code);
      } else {
        setItemsCrossRef(getItemsCrossRef(data));
        setItemsPathway(getItemsPathway(data));
        setDetailData(data);
      }
    });

    getProteinDetailData.catch(({ response }) => {
      alert(JSON.stringify(response));
    });
    // eslint-disable-next-line
  }, []);
  // useEffect(() => {
  //   const withImage = detailData.glycosylation.filter(
  //     item => item.glytoucan_ac
  //   );
  //   const withoutImage = detailData.glycosylation.filter(
  //     item => !item.glytoucan_ac
  //   );
  //   setGlycosylationWithImage(withImage);
  //   setGlycosylationWithoutImage(withoutImage);
  // }, [detailData]);

  if (detailData.isoforms) {
    for (var i = 0; i < detailData.isoforms.length; i++) {
      // assign the newly result of running formatSequence() to replace the old value
      // detailData.isoforms[i].sequence.sequence = formatSequence(detailData.isoforms[i].sequence.sequence);
      detailData.isoforms[i].locus.start_pos = addCommas(
        detailData.isoforms[i].locus.start_pos
      );
      detailData.isoforms[i].locus.end_pos = addCommas(
        detailData.isoforms[i].locus.end_pos
      );
      if (
        detailData.isoforms[i].locus &&
        detailData.isoforms[i].locus.evidence
      ) {
        detailData.isoforms[i].evidence = detailData.isoforms[i].locus.evidence;
        groupEvidences([detailData.isoforms[i]]);
      }
    }
  }
  if (detailData.orthologs) {
    for (var i = 0; i < detailData.orthologs.length; i++) {
      // assign the newly result of running formatSequence() to replace the old value
      //detailData.orthologs[i].sequence.sequence = formatSequence(detailData.orthologs[i].sequence.sequence);
      if (detailData.orthologs[i] && detailData.orthologs[i].evidence) {
        detailData.orthologs[i].evidence = detailData.orthologs[i].evidence;
        groupEvidences([detailData.orthologs[i]]);
      }
    }
  }

  if (detailData.go_annotation && detailData.go_annotation.categories) {
    // Sorting Go term categories in specific order - 1. "MOLECULAR FUNCTION", 2. "BIOLOGICAL PROCESS", 3. "CELLULAR COMPONENT".
    // This will help mustache template to show categories in specific order.
    var mapGOTerm = {
      "MOLECULAR FUNCTION": 1,
      "BIOLOGICAL PROCESS": 2,
      "CELLULAR COMPONENT": 3
    };

    detailData.go_annotation.categories = detailData.go_annotation.categories.sort(
      function(a, b) {
        var resVal1 = mapGOTerm[a.name.toUpperCase()];
        var resVal2 = mapGOTerm[b.name.toUpperCase()];

        return resVal1 - resVal2;
      }
    );

    for (var i = 0; i < detailData.go_annotation.categories.length; i++) {
      // assign the newly result of running formatSequence() to replace the old value
      groupEvidences(detailData.go_annotation.categories[i].go_terms);
    }
  }

  const {
    mass,
    recommendedname,
    uniprot,
    gene,
    species,
    publication,
    isoforms,
    orthologs,
    glycosylation,
    expression_tissue,
    expression_disease,
    mutation,
    refseq,
    sequence,
    go_annotation,
    site_annotation,
    function: functions
  } = detailData;
  const speciesEvidence = groupSpeciesEvidences(species);
  const glycoSylationColumns = [
    {
      dataField: "evidence",
      text: "Sources",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },
      formatter: (cell, row) => {
        return (
          <EvidenceList
            key={row.position + row.glytoucan_ac}
            evidences={groupEvidences(cell)}
          />
        );
      }
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },
    {
      dataField: "glytoucan_ac",
      text: "GlyToucan Accession",
      defaultSortField: "glytoucan_ac",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },
      formatter: (value, row) => (
        <Navbar.Text
          as={NavLink}
          to={routeConstants.glycanDetail + row.glytoucan_ac}
        >
          {" "}
          {row.glytoucan_ac}{" "}
        </Navbar.Text>
      )
    },
    {
      dataField: "position",
      text: "Position",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },
      formatter: (value, row) => (
        <Navbar.Text as={NavLink} to={`/site-specific/${row.position}`}>
          {" "}
          {row.position}{" "}
        </Navbar.Text>
      )
    }
  ];
  const mutationColumns = [
    {
      dataField: "evidence",
      text: "Sources",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },
      formatter: (cell, row) => {
        return (
          <EvidenceList
            key={row.disease.doid}
            evidences={groupEvidences(cell)}
          />
        );
      }
    },
    {
      dataField: "annotation",
      text: "Annotation",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },
    {
      dataField: "end_pos",
      text: "End pos",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },

    {
      dataField: "start_pos",
      text: "Start pos",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },

    {
      dataField: "sequence",
      text: "Sequence",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },

    {
      dataField: "type",
      text: "Type",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },

    {
      dataField: "disease",
      text: "Disease",
      defaultSortField: "disease",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },
      formatter: (value, row) => (
        <Navbar.Text
          as={NavLink}
          to={routeConstants.glycanDetail + row.glytoucan_ac}
        >
          {" "}
          {row.disease.doid}
          {row.disease.name}
        </Navbar.Text>
      )
    }
  ];

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
                    <p>
                      {gene && (
                        <tbody className="table-body">
                          {gene.map((genes, genesname) => (
                            <td key={genesname}>
                              <div>
                                <strong>
                                  {proteinStrings.gene_name.name}:
                                </strong>
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
                                </strong>
                                Chromosome: {""}
                                {genes.locus.chromosome} {""}(
                                {genes.locus.start_pos}-{genes.locus.end_pos})
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
                    </p>

                    <p>
                      {uniprot && uniprot.uniprot_canonical_ac && (
                        <>
                          <div>
                            <strong>{proteinStrings.uniprot_id.name}: </strong>
                            <Link
                              href={uniprot.uniprot_url}
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
                              href={uniprot.uniprot_url}
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
                            {uniprot.length}{" "}
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
                            {addCommas(mass.chemical_mass)}
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
                          <div>
                            <strong>
                              {proteinStrings.refSeq_summary.name}:{" "}
                            </strong>
                            {refseq.summary}{" "}
                          </div>
                          {/* <div>
                            <strong>
                              {proteinStrings.chemical_mass.name}:{" "}
                            </strong>
                            {mass.chemical_mass}
                          </div> */}
                        </>
                      )}
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {/*  species */}
            <Accordion
              id="species"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.protein.species.title}
                      text={DetailTooltips.protein.species.text}
                      urlText={DetailTooltips.protein.species.urlText}
                      url={DetailTooltips.protein.species.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h3 className="gg-green d-inline">Species</h3>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() =>
                        toggleCollapse("species", collapsed.species)
                      }
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.species ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row>
                      {speciesEvidence &&
                        // For every species object
                        Object.keys(speciesEvidence).map(species => (
                          // For every database for current species object
                          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <p>
                              <>
                                <Row>
                                  <Col
                                    align="right"
                                    style={{
                                      paddingTop: "12px"
                                    }}
                                  >
                                    <strong>{species}:</strong>
                                  </Col>
                                  <Col
                                    align="left"
                                    style={{
                                      paddingLeft: "0",
                                      marginLeft: "0"
                                    }}
                                  >
                                    <EvidenceList
                                      evidences={speciesEvidence[species]}
                                    />
                                  </Col>
                                </Row>
                              </>
                            </p>
                          </Col>
                        ))}
                      {!species && (
                        <p className="no-data-msg">No data available.</p>
                      )}
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

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
                        toggleCollapse("species", collapsed.sequence)
                      }
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.sequence ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ProteinSequenceDisplay
                      sequenceObject={sequence}
                      glycosylation={glycosylation}
                      mutation={mutation}
                      siteAnnotation={site_annotation}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* crossref */}
            <Accordion
              id="crossref"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.protein.crossReferences.title}
                      text={DetailTooltips.protein.crossReferences.text}
                      urlText={DetailTooltips.protein.crossReferences.urlText}
                      url={DetailTooltips.protein.crossReferences.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h3 className="gg-green d-inline">Cross References</h3>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() =>
                        toggleCollapse("crossref", collapsed.crossref)
                      }
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.crossref ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {itemsCrossRef && itemsCrossRef.length ? (
                      <p>
                        <ul className="list-style-none">
                          {/* <Row> */}
                          {itemsCrossRef.map(crossRef => (
                            <li>
                              {/* <Col> */}
                              <strong>{crossRef.database}:</strong>
                              <ul>
                                <Row>
                                  {crossRef.links.map(link => (
                                    <Col>
                                      <li>
                                        <a
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {link.id}
                                        </a>
                                      </li>
                                    </Col>
                                  ))}
                                </Row>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </p>
                    ) : (
                      <p>No data available.</p>
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
                      title={DetailTooltips.protein.publications.title}
                      text={DetailTooltips.protein.publications.text}
                      urlText={DetailTooltips.protein.publications.urlText}
                      url={DetailTooltips.protein.publications.url}
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

export default ProteinDetail;

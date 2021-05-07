import React, { useEffect, useState, useReducer, useRef } from "react";
import { getPublicationDetail } from "../data/publication";
import { useParams, Link } from "react-router-dom";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import Button from "react-bootstrap/Button";
import { FiBookOpen } from "react-icons/fi";
import { Tab, Tabs, Container } from "react-bootstrap";
// import { groupEvidences } from "../data/data-format";
// import EvidenceList from "../components/EvidenceList";
import ClientPaginatedTable from "../components/ClientPaginatedTable";
import "../css/detail.css";
import "../css/Responsive.css";
import LineTooltip from "../components/tooltip/LineTooltip";
import routeConstants from "../data/json/routeConstants";
import { getGlycanImageUrl } from "../data/glycan";
import { addIndex } from "../utils/common";

const CollapsibleText = ({ text, lines = 5 }) => {
  const textRef = useRef();
  const [overflow, setOverflow] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    const scrollHeight = textRef.current.scrollHeight;
    const clientHeight = textRef.current.clientHeight;
    const scrollWidth = textRef.current.scrollWidth;
    const clientWidth = textRef.current.clientWidth;

    const isOverflow = scrollHeight > clientHeight || scrollWidth > clientWidth;
    setOverflow(isOverflow);
  }, [text]);
  return (
    <>
      <p
        ref={textRef}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: collapsed ? lines : "unset",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {text}
      </p>
      {overflow && collapsed && (
        <Button className={"lnk-btn"} variant="link" onClick={() => setCollapsed(false)}>
          Show More...
        </Button>
      )}
      {overflow && !collapsed && (
        <Button className={"lnk-btn"} variant="link" onClick={() => setCollapsed(true)}>
          Show Less...
        </Button>
      )}
    </>
  );
};

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

  const proteinStrings = stringConstants.protein.common;
  const glycanStrings = stringConstants.glycan.common;

  const [detailData, setDetailData] = useState({});
  const [glycosylationMining, setGlycosylationMining] = useState([]);
  const [glycosylationWithImage, setGlycosylationWithImage] = useState([]);
  const [glycosylationWithoutImage, setGlycosylationWithoutImage] = useState([]);
  const [glycosylationTabSelected, setGlycosylationTabSelected] = useState("reported_with_glycan");
  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );

  const maxItems = 30;
  const [allItems, setAllItems] = useState([]);
  // alert(JSON.stringify(allItems, null, 2));
  const [open, setOpen] = useState(false);
  const displayedItems = open ? allItems : allItems?.slice(0, maxItems);

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
        setAllItems(data.referenced_proteins);
        setPageLoading(false);
        if (data.glycosylation) {
          const mapOfGlycosylationCategories = data.glycosylation.reduce((collection, item) => {
            const category = item.site_category || logActivity("No results. ");
            return {
              ...collection,
              [category]: [...(collection[category] || []), item],
            };
          }, {});

          const withImage = mapOfGlycosylationCategories.reported_with_glycan || [];
          const withoutImage = mapOfGlycosylationCategories.reported || [];
          const mining = mapOfGlycosylationCategories.automatic_literature_mining || [];

          const selectTab = [
            "reported_with_glycan",
            "reported",
            "automatic_literature_mining",
          ].find(
            (category) =>
              mapOfGlycosylationCategories[category] &&
              mapOfGlycosylationCategories[category].length > 0
          );
          setGlycosylationWithImage(withImage);
          setGlycosylationWithoutImage(withoutImage);
          setGlycosylationMining(mining);
          setGlycosylationTabSelected(selectTab);
        }
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
    reference,
    authors,
    // record_id,
    abstract,
    glycosylation,
    phosphorylation,
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
  const glycoSylationColumns = [
    {
      dataField: "uniprot_canonical_ac",
      text: proteinStrings.uniprot_accession.name,
      // defaultSortField: "uniprot_canonical_ac",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          width: "15%",
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View protein details">
          <Link to={routeConstants.proteinDetail + row.uniprot_canonical_ac}>
            {row.uniprot_canonical_ac}
          </Link>
        </LineTooltip>
      ),
    },
    {
      dataField: "type",
      text: proteinStrings.type.name,
      sort: true,
    },
    {
      dataField: "glytoucan_ac",
      text: proteinStrings.glytoucan_ac.shortName,
      defaultSortField: "glytoucan_ac",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          width: "15%",
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View glycan details">
          <Link to={routeConstants.glycanDetail + row.glytoucan_ac}>{row.glytoucan_ac}</Link>
        </LineTooltip>
      ),
    },
    {
      dataField: "image",
      text: glycanStrings.glycan_image.name,
      sort: false,
      formatter: (value, row) => (
        <div className="img-wrapper">
          <img className="img-cartoon" src={getGlycanImageUrl(row.glytoucan_ac)} alt="Glycan img" />
        </div>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          textAlign: "left",
          backgroundColor: "#4B85B6",
          color: "white",
          whiteSpace: "nowrap",
        };
      },
    },
    {
      dataField: "start_pos",
      text: proteinStrings.residue.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
        };
      },
      formatter: (value, row) =>
        value ? (
          <LineTooltip text="View siteview details">
            <Link to={`${routeConstants.siteview}${row.uniprot_canonical_ac}/${row.start_pos}`}>
              {row.residue}
              {row.start_pos}
              {row.start_pos !== row.end_pos && (
                <>
                  to {row.residue}
                  {row.end_pos}
                </>
              )}
            </Link>
          </LineTooltip>
        ) : (
          "Not Reported"
        ),
    },
  ];
  const phosphorylationColumns = [
    // {
    //   dataField: "evidence",
    //   text: proteinStrings.evidence.name,
    //   headerStyle: (colum, colIndex) => {
    //     return {
    //       // width: "15%",
    //     };
    //   },
    //   formatter: (cell, row) => {
    //     return <EvidenceList evidences={groupEvidences(cell)} />;
    //   },
    // },
    {
      dataField: "kinase_uniprot_canonical_ac",
      text: proteinStrings.kinase_protein.name,
      sort: true,
      formatter: (value, row) =>
        value ? (
          <LineTooltip text="View protein details">
            <Link to={routeConstants.proteinDetail + row.kinase_uniprot_canonical_ac}>
              {row.kinase_uniprot_canonical_ac}
            </Link>
          </LineTooltip>
        ) : (
          "No data available"
        ),
    },
    {
      dataField: "kinase_gene_name",
      text: proteinStrings.kinase_gene_name.name,
      sort: true,
      formatter: (value, row) => (value ? <>{row.kinase_gene_name}</> : "No data available"),
    },
    {
      dataField: "start_pos",
      text: proteinStrings.residue.name,
      sort: true,
      formatter: (value, row) =>
        value ? (
          <LineTooltip text="View siteview details">
            <Link to={`${routeConstants.siteview}${row.uniprot_canonical_ac}/${row.start_pos}`}>
              {row.residue}
              {row.start_pos}
              {row.start_pos !== row.end_pos && (
                <>
                  to {row.residue}
                  {row.end_pos}
                </>
              )}
            </Link>
          </LineTooltip>
        ) : (
          "Not Reported"
        ),
    },
  ];
  const refGlycansColumns = [
    {
      dataField: "refGlyc",
      text: proteinStrings.glytoucan_ac.shortName,
      defaultSortField: "refGlyc",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          width: "30%",
          whiteSpace: "nowrap",
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View glycan details">
          <Link to={`${routeConstants.glycanDetail}${row.refGlyc}`}>{row.refGlyc}</Link>
        </LineTooltip>
      ),
    },
    {
      dataField: "image",
      text: glycanStrings.glycan_image.name,
      sort: false,
      formatter: (value, row) => (
        <div className="img-wrapper">
          <img className="img-cartoon" src={getGlycanImageUrl(row.refGlyc)} alt="Glycan img" />
        </div>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          textAlign: "left",
          backgroundColor: "#4B85B6",
          color: "white",
          whiteSpace: "nowrap",
        };
      },
    },
  ];

  function sortIgnoreCase(a, b) {
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    if (b.toLowerCase() > a.toLowerCase()) {
      return -1;
    }
    return 0;
  }
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
                        <strong className="nowrap">Publication</strong> Specific Detail for
                        {reference && (
                          <div>
                            {reference.type} <strong className="nowrap">{reference.id}</strong>
                          </div>
                        )}
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
                          {journal} <span>&nbsp;</span>
                          {date && (
                            <>
                              {"("}
                              {date}
                              {")"}
                            </>
                          )}
                        </div>
                        {reference && (
                          <div>
                            <FiBookOpen />
                            <span style={{ paddingLeft: "15px" }}>
                              {glycanStrings.pmid.shortName}:
                            </span>{" "}
                            <a href={reference.url} target="_blank" rel="noopener noreferrer">
                              <>{reference.id}</>
                            </a>{" "}
                          </div>
                        )}
                        {abstract && (
                          <div className={"mt-2"}>
                            <strong>Abstract:</strong>
                          </div>
                        )}
                        <CollapsibleText text={abstract} />
                      </>
                    )}
                    {!title && <p className="no-data-msg-publication">No data available.</p>}
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
                  <Card.Body>
                    {glycosylation && glycosylation.length && (
                      <Tabs
                        activeKey={glycosylationTabSelected}
                        transition={false}
                        mountOnEnter={true}
                        unmountOnExit={true}
                        onSelect={(key) => {
                          setGlycosylationTabSelected(key);
                        }}
                      >
                        <Tab eventKey="reported_with_glycan" title="Reported Sites with Glycan">
                          <Container
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "30px",
                            }}
                          >
                            {glycosylationWithImage && glycosylationWithImage.length > 0 && (
                              <ClientPaginatedTable
                                data={addIndex(
                                  glycosylationWithImage.sort((a, b) => {
                                    if (a.start_pos < b.start_pos) return -1;
                                    if (b.start_pos < a.start_pos) return 1;
                                    return 0;
                                  })
                                )}
                                columns={glycoSylationColumns}
                                onClickTarget={"#glycosylation"}
                                defaultSortField="start_pos"
                                defaultSortOrder="asc"
                                idField={"index"}
                              />
                            )}
                            {!glycosylationWithImage.length && <p>No data available.</p>}
                          </Container>
                        </Tab>
                        <Tab eventKey="reported" title="Reported Sites">
                          <Container
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "30px",
                            }}
                          >
                            {glycosylationWithoutImage && glycosylationWithoutImage.length > 0 && (
                              <ClientPaginatedTable
                                data={addIndex(glycosylationWithoutImage)}
                                columns={glycoSylationColumns.filter(
                                  (column) =>
                                    column.dataField !== "glytoucan_ac" &&
                                    column.dataField !== "image"
                                )}
                                onClickTarget={"#glycosylation"}
                                defaultSortField="start_pos"
                                defaultSortOrder="asc"
                                idField={"index"}
                              />
                            )}
                            {!glycosylationWithoutImage.length && <p>No data available.</p>}
                          </Container>
                        </Tab>
                        <Tab eventKey="automatic_literature_mining" title="Text Mining">
                          <Container
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "30px",
                            }}
                          >
                            {glycosylationMining && glycosylationMining.length > 0 && (
                              <ClientPaginatedTable
                                data={addIndex(glycosylationMining)}
                                columns={glycoSylationColumns.filter(
                                  (column) =>
                                    column.dataField !== "glytoucan_ac" &&
                                    column.dataField !== "image"
                                )}
                                onClickTarget={"#glycosylation"}
                                defaultSortField="start_pos"
                                defaultSortOrder="asc"
                                idField={"index"}
                              />
                            )}
                            {!glycosylationMining.length && <p>No data available.</p>}
                          </Container>
                        </Tab>
                      </Tabs>
                    )}

                    {!glycosylation && <p>No data available.</p>}
                  </Card.Body>
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
                  <Card.Body>
                    {phosphorylation && phosphorylation.length !== 0 && (
                      <ClientPaginatedTable
                        data={addIndex(phosphorylation)
                          .map((x) => ({
                            ...x,
                            start_pos: parseInt(x.start_pos),
                            end_pos: parseInt(x.end_pos),
                          }))
                          .sort((a, b) => {
                            if (a.start_pos < b.start_pos) return -1;
                            if (b.start_pos < a.start_pos) return 1;
                            return 0;
                          })}
                        columns={phosphorylationColumns}
                        onClickTarget={"#phosphorylation"}
                        defaultSortField={"start_pos"}
                        defaultSortOrder="asc"
                        idField={"index"}
                      />
                    )}
                    {!phosphorylation && <p>No data available.</p>}
                  </Card.Body>
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
                    {displayedItems && (
                      <>
                        <div>
                          <ul className="list-style-none">
                            <Row>
                              {displayedItems.sort(sortIgnoreCase).map((refProt) => (
                                <Col key={refProt} className="nowrap" xs={6} sm={4} lg={3} xl={2}>
                                  <LineTooltip text="View protein details">
                                    <Link to={`${routeConstants.proteinDetail}${refProt}`}>
                                      <li>{refProt}</li>
                                    </Link>
                                  </LineTooltip>
                                </Col>
                              ))}
                            </Row>
                            {allItems.length > maxItems && (
                              <>
                                {open ? (
                                  <Button
                                    style={{
                                      // marginLeft: "20px",
                                      marginTop: "5px",
                                    }}
                                    className={"lnk-btn"}
                                    variant="link"
                                    onClick={() => setOpen(false)}
                                  >
                                    Show Less...
                                  </Button>
                                ) : (
                                  <Button
                                    style={{
                                      // marginLeft: "20px",
                                      marginTop: "5px",
                                    }}
                                    className={"lnk-btn"}
                                    variant="link"
                                    onClick={() => setOpen(true)}
                                  >
                                    Show More...
                                  </Button>
                                )}
                              </>
                            )}
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
                      <ClientPaginatedTable
                        data={referenced_glycans
                          .sort(sortIgnoreCase)
                          .map((refGlyc) => ({ refGlyc }))}
                        columns={refGlycansColumns}
                        onClickTarget={"#referenced-glycans"}
                        defaultSortField="refGlyc"
                        defaultSortOrder="asc"
                        idField={"refGlyc"}
                      />
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

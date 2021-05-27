import React, { useEffect, useState, useReducer } from "react";
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
import ClientPaginatedTable from "../components/ClientPaginatedTable";
import "../css/detail.css";
import "../css/Responsive.css";
import LineTooltip from "../components/tooltip/LineTooltip";
import routeConstants from "../data/json/routeConstants";
import { getGlycanImageUrl } from "../data/glycan";
import { addIndex } from "../utils/common";
import CollapsibleText from "../components/CollapsibleText";

const items = [
  { label: stringConstants.sidebar.general.displayname, id: "General" },

  { label: stringConstants.sidebar.organism.displayname, id: "Organism" },
  {
    label: stringConstants.sidebar.glycosylation.displayname,
    id: "Glycosylation",
  },
  {
    label: stringConstants.sidebar.phosphorylation.displayname,
    id: "Phosphorylation",
  },
  {
    label: stringConstants.sidebar.glycation.displayname,
    id: "Glycation",
  },
  {
    label: stringConstants.sidebar.snv.displayname,
    id: "Single-Nucleotide-Variation",
  },
  { label: stringConstants.sidebar.mutagenesis.displayname, id: "Mutagenesis" },
  { label: stringConstants.sidebar.cell_line.displayname, id: "Cell-Line" },
  { label: stringConstants.sidebar.referenced_proteins.displayname, id: "Referenced-Proteins" },
  { label: stringConstants.sidebar.referenced_glycans.displayname, id: "Referenced-Glycans" },
];
const PublicationDetail = (props) => {
  let { id } = useParams();
  let { publType } = useParams();
  let { doi } = useParams();

  const proteinStrings = stringConstants.protein.common;
  const glycanStrings = stringConstants.glycan.common;

  const [detailData, setDetailData] = useState({});
  const [glycosylationMining, setGlycosylationMining] = useState([]);
  const [glycosylationWithImage, setGlycosylationWithImage] = useState([]);
  const [glycosylationWithoutImage, setGlycosylationWithoutImage] = useState([]);
  const [glycosylationTabSelected, setGlycosylationTabSelected] = useState("reported_with_glycan");
  const [mutataionWithdisease, setMutataionWithdisease] = useState([]);
  const [mutataionWithoutdisease, setMutataionWithoutdisease] = useState([]);
  const [mutataionTabSelected, setMutataionTabSelected] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const [sideBarData, setSidebarData] = useState(items);

  const maxItems = 30;
  const maxCellItems = 9;
  const [allItems, setAllItems] = useState([]);
  const [cellLineItems, setCellLineItems] = useState([]);
  // alert(JSON.stringify(allItems, null, 2));
  const [open, setOpen] = useState(false);
  const displayedItems = open ? allItems : allItems?.slice(0, maxItems);
  const displayedCellLineItems = open ? cellLineItems : cellLineItems?.slice(0, maxCellItems);

  useEffect(() => {
    setPageLoading(true);
    let publId = "";
    if (id && doi && publType) {
      publId = `${id}/${doi}`;
    } else {
      publId = id;
    }

    logActivity("user", publId);

    const getPublData = getPublicationDetail(publId, publType);

    getPublData.then(({ data }) => {
      if (data.code) {
        let message = "Publication api call";
        logActivity("user", id, "No results. " + message);
        setPageLoading(false);
      } else {
        setDetailData(data);
        setAllItems(data.referenced_proteins);
        setCellLineItems(data.cell_line);
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

        let detailDataTemp = data;
        //new side bar
        let newSidebarData = sideBarData;
        if (!detailDataTemp.general || detailDataTemp.general.length === 0) {
          newSidebarData = setSidebarItemState(newSidebarData, "General", true);
        }
        if (!detailDataTemp.species || detailDataTemp.species.length === 0) {
          newSidebarData = setSidebarItemState(newSidebarData, "Organism", true);
        }
        if (!detailDataTemp.glycosylation || detailDataTemp.glycosylation.length === 0) {
          newSidebarData = setSidebarItemState(newSidebarData, "Glycosylation", true);
        }
        if (!detailDataTemp.phosphorylation || detailDataTemp.phosphorylation.length === 0) {
          newSidebarData = setSidebarItemState(newSidebarData, "Phosphorylation", true);
        }
        if (!detailDataTemp.glycation || detailDataTemp.glycation.length === 0) {
          newSidebarData = setSidebarItemState(newSidebarData, "Glycation", true);
        }
        if (!detailDataTemp.snv || detailDataTemp.snv.length === 0) {
          newSidebarData = setSidebarItemState(newSidebarData, "Single-Nucleotide-Variation", true);
        }
        if (!detailDataTemp.mutagenesis || detailDataTemp.mutagenesis.length === 0) {
          newSidebarData = setSidebarItemState(newSidebarData, "Mutagenesis", true);
        }

        if (!detailDataTemp.cell_line || detailDataTemp.cell_line.length === 0) {
          newSidebarData = setSidebarItemState(newSidebarData, "Cell-Line", true);
        }
        if (
          !detailDataTemp.referenced_proteins ||
          detailDataTemp.referenced_proteins.length === 0
        ) {
          newSidebarData = setSidebarItemState(newSidebarData, "Referenced-Proteins", true);
        }
        if (!detailDataTemp.referenced_glycans || detailDataTemp.referenced_glycans.length === 0) {
          newSidebarData = setSidebarItemState(newSidebarData, "Referenced-Glycans", true);
        }

        setSidebarData(newSidebarData);
        if (data.snv) {
          const WithDisease = data.snv.filter((item) => item.keywords.includes("disease"));
          const Withoutdisease = data.snv.filter((item) => !item.keywords.includes("disease"));
          setMutataionWithdisease(WithDisease);
          setMutataionWithoutdisease(Withoutdisease);
          setMutataionTabSelected(WithDisease.length > 0 ? "with_disease" : "without_disease");
        }
      }
    });

    getPublData.catch(({ response }) => {
      let message = "Publication api call";
      axiosError(response, id, message, setPageLoading, setAlertDialogInput);
    });
    // eslint-disable-next-line
  }, [id, doi, publType]);

  const {
    date,
    title,
    journal,
    reference,
    authors,
    abstract,
    species,
    glycosylation,
    phosphorylation,
    glycation,
    snv,
    mutagenesis,
    cell_line,
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
      organism: true,
      glycosylation: true,
      phosphorylation: true,
      glycation: true,
      snv: true,
      mutagenesis: true,
      cell_line: true,
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
    {
      dataField: "comment",
      text: "Note",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          width: "35%",
        };
      },
      formatter: (value, row) => <CollapsibleText text={row.comment} lines={2} />,
    },
  ];
  const phosphorylationColumns = [
    {
      dataField: "uniprot_canonical_ac",
      text: proteinStrings.uniprot_accession.name,
      // defaultSortField: "uniprot_canonical_ac",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          // width: "25%",
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
    {
      dataField: "comment",
      text: "Note",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          width: "30%",
        };
      },
      formatter: (value, row) => <CollapsibleText text={row.comment} lines={2} />,
    },
  ];
  const mutationColumns = [
    {
      dataField: "uniprot_canonical_ac",
      text: proteinStrings.uniprot_accession.name,
      // defaultSortField: "uniprot_canonical_ac",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          // width: "25%",
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
      dataField: "comment",
      text: "Filter Annotations",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          width: "30%",
        };
      },
    },
    {
      dataField: "chr_id",
      text: "Genomic Locus",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "20%",
        };
      },
      formatter: (value, row) => (
        <>
          Chr{row.chr_id}:{row.chr_pos}
        </>
      ),
    },
    {
      dataField: "start_pos",
      text: proteinStrings.startpos.name,

      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View siteview details">
          <Link to={`${routeConstants.siteview}${row.uniprot_canonical_ac}/${row.start_pos}`}>
            {row.start_pos}
          </Link>
          {/* <Link to={`${routeConstants.siteview}${id}/${row.start_pos}`}>{row.start_pos}</Link> */}
        </LineTooltip>
      ),
    },
    {
      dataField: "end_pos",
      text: proteinStrings.endpos.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View siteview details">
          <Link to={`${routeConstants.siteview}${row.uniprot_canonical_ac}/${row.end_pos}`}>
            {row.end_pos}
          </Link>
          {/* <Link to={`${routeConstants.siteview}${id}/${row.end_pos}`}>{row.end_pos}</Link> */}
        </LineTooltip>
      ),
    },

    {
      dataField: "sequence",
      text: stringConstants.sidebar.sequence.displayname,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
        };
      },
      formatter: (value, row) => (
        <>
          {row.sequence_org} → {row.sequence_mut}
        </>
      ),
    },
    {
      dataField: "disease",
      text: stringConstants.sidebar.disease.displayname,
      style: { whiteSpace: "nowrap" },
      headerStyle: (column, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "25%",
        };
      },
      formatter: (value, row) => (
        <>
          {value.map((disease, index) => (
            <ul key={index} className="pl-3">
              <li key={disease.recommended_name.id}>
                {disease.recommended_name.name}{" "}
                <span className="nowrap">
                  (<a href={disease.recommended_name.url}>{disease.recommended_name.id}</a>){" "}
                </span>
              </li>
            </ul>
          ))}
        </>
      ),
    },
    {
      dataField: "minor_allelic_frequency",
      text: "MAF",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
        };
      },
    },
  ];
  const glycationColumns = [
    {
      dataField: "type",
      text: proteinStrings.type.name,
      sort: true,
      formatter: (value, row) => (value ? <>{row.type}</> : "No data available"),
    },
    {
      dataField: "relation",
      text: proteinStrings.relation.name,
      sort: true,
      formatter: (value, row) => (value ? <>{row.relation}</> : "No data available"),
    },
    {
      dataField: "start_pos",
      text: proteinStrings.residue.name,
      sort: true,
      formatter: (value, row) =>
        value ? (
          <LineTooltip text="View siteview details">
            <Link to={`${routeConstants.siteview}${id}/${row.start_pos}`}>
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
    {
      dataField: "comment",
      text: "Note",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          width: "35%",
        };
      },
      formatter: (value, row) => <CollapsibleText text={row.comment} lines={2} />,
    },
  ];
  const mutagenesisColumns = [
    {
      dataField: "uniprot_canonical_ac",
      text: proteinStrings.uniprot_accession.name,
      // defaultSortField: "uniprot_canonical_ac",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          // width: "25%",
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
      dataField: "start_pos",
      text: proteinStrings.startpos.name,
      sort: true,
      defaultSortField: "start_pos",
      sortFunc: (a, b, order, start_pos) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },
    },
    {
      dataField: "end_pos",
      text: proteinStrings.endpos.name,
      sort: true,
    },
    {
      dataField: "sequence",
      text: stringConstants.sidebar.sequence.displayname,
      sort: true,
      formatter: (value, row) => (
        <>
          {row.sequence_org && <span className="wrapword">{row.sequence_org}</span>}
          {!row.sequence_org && <span> (insertion)</span>}
          {row.sequence_org && row.sequence_mut && <> → </>}
          {row.sequence_mut && <>{row.sequence_mut}</>}
          {!row.sequence_mut && <span> (deletion)</span>}
        </>
      ),
    },
    {
      dataField: "comment",
      text: "Note",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          width: "35%",
        };
      },
      formatter: (value, row) => <CollapsibleText text={row.comment} lines={2} />,
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

  const setSidebarItemState = (items, itemId, disabledState) => {
    return items.map((item) => {
      return {
        ...item,
        disabled: item.id === itemId ? disabledState : item.disabled,
      };
    });
  };
  function sortIgnoreCase(a, b) {
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    if (b.toLowerCase() > a.toLowerCase()) {
      return -1;
    }
    return 0;
  }
  function sortDropdown(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (b.name < a.name) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      <Helmet>
        {getTitle("publicationDetail", {
          id:
            reference && `${reference.id}/${reference.type}`
              ? `${reference.id}/${reference.type}`
              : "",
        })}
        {getMeta("publicationDetail")}
      </Helmet>
      <CssBaseline />
      <div id="top-heading"></div>
      <Row className="gg-baseline">
        <Col sm={12} md={12} lg={12} xl={3} className="sidebar-col">
          <Sidebar items={sideBarData} />
        </Col>
        <Col sm={12} md={12} lg={12} xl={9} className="sidebar-page">
          <div className="sidebar-page-mb">
            <div>
              <Row>
                <Grid item xs={12} sm={12} className="text-center">
                  <div className="horizontal-heading">
                    <h5>Look At</h5>
                    <h2>
                      <span>
                        <strong className="nowrap">Publication</strong> Specific Detail for
                        {reference && (
                          <div>
                            <strong className="nowrap">
                              {reference.type}: {reference.id}
                            </strong>
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
                            <span style={{ paddingLeft: "15px" }}>{reference.type}:</span>{" "}
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
            {/*  species */}
            <Accordion
              id="Organism"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.glycan.organism.title}
                      text={DetailTooltips.glycan.organism.text}
                      urlText={DetailTooltips.glycan.organism.urlText}
                      url={DetailTooltips.glycan.organism.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.organism.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("organism", collapsed.organism)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.organism ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {species && (
                      <>
                        <div>
                          <Row>
                            {species.map((org) => (
                              <Col className="nowrap" xs={12} sm={6} key={org.name}>
                                <>
                                  <strong>{org.name}</strong>{" "}
                                  <span>
                                    {"("}
                                    {org.common_name}
                                    {")"}
                                  </span>{" "}
                                  {"["}
                                  <LineTooltip text="View details on NCBI">
                                    <a
                                      href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${org.taxid}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {org.taxid}
                                    </a>
                                  </LineTooltip>
                                  {"]"}{" "}
                                </>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      </>
                    )}
                    {!species && <span>No data available.</span>}
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
                      title={DetailTooltips.protein.glycosylation.title}
                      text={DetailTooltips.protein.glycosylation.text}
                      urlText={DetailTooltips.protein.glycosylation.urlText}
                      url={DetailTooltips.protein.glycosylation.url}
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
            {/* Glycation */}
            <Accordion
              id="Glycation"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.protein.glycation.title}
                      text={DetailTooltips.protein.glycation.text}
                      urlText={DetailTooltips.protein.glycation.urlText}
                      url={DetailTooltips.protein.glycation.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.glycation.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("glycation", collapsed.glycation)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.glycation ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {glycation && glycation.length !== 0 && (
                      <ClientPaginatedTable
                        data={glycation
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
                        columns={glycationColumns}
                        onClickTarget={"#glycation"}
                        defaultSortField={"start_pos"}
                        defaultSortOrder="asc"
                      />
                    )}
                    {!glycation && <p>No data available.</p>}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/*  SNV (Single-Nucleotide-Variation)*/}
            <Accordion
              id="Single-Nucleotide-Variation"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.protein.snv.title}
                      text={DetailTooltips.protein.snv.text}
                      urlText={DetailTooltips.protein.snv.urlText}
                      url={DetailTooltips.protein.snv.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">{stringConstants.sidebar.snv.displayname}</h4>

                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("mutation", collapsed.mutation)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.mutation ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {snv && snv.length !== 0 && (
                      <Tabs
                        // activeKey={mutataionTabSelected}
                        defaultActiveKey={
                          mutataionWithdisease && mutataionWithdisease.length > 0
                            ? "without_disease"
                            : "with_disease"
                        }
                        transition={false}
                        mountOnEnter={true}
                        unmountOnExit={true}
                      >
                        <Tab
                          eventKey="with_disease"
                          // className='tab-content-padding'
                          title="Disease associated
														Mutations"
                          //disabled={(!mutataionWithdisease || (mutataionWithdisease.length === 0))}
                        >
                          <Container
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "30px",
                            }}
                          >
                            {mutataionWithdisease && mutataionWithdisease.length > 0 && (
                              <ClientPaginatedTable
                                data={mutataionWithdisease}
                                columns={mutationColumns}
                                onClickTarget={"#mutation"}
                                defaultSortField="start_pos"
                                defaultSortOrder="asc"
                              />
                            )}
                            {!mutataionWithdisease.length && <p>No data available.</p>}
                          </Container>
                        </Tab>
                        <Tab
                          eventKey="without_disease"
                          className="tab-content-padding"
                          title="Non-disease associated
														Mutations "
                          // disabled={(!mutataionWithoutdisease || (mutataionWithoutdisease.length === 0))}
                        >
                          <Container>
                            {mutataionWithoutdisease && mutataionWithoutdisease.length > 0 && (
                              <ClientPaginatedTable
                                data={mutataionWithoutdisease}
                                columns={mutationColumns.filter(
                                  (column) => column.dataField !== "disease"
                                )}
                                onClickTarget={"#mutation"}
                                defaultSortField="start_pos"
                                defaultSortOrder="asc"
                              />
                            )}
                            {!mutataionWithoutdisease.length && <p>No data available.</p>}
                          </Container>
                        </Tab>
                      </Tabs>
                    )}

                    {!snv && <p>No data available.</p>}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/*  Mutagenesis */}
            <Accordion
              id="Mutagenesis"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.protein.mutagenesis.title}
                      text={DetailTooltips.protein.mutagenesis.text}
                      urlText={DetailTooltips.protein.mutagenesis.urlText}
                      url={DetailTooltips.protein.mutagenesis.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {" "}
                    {stringConstants.sidebar.mutagenesis.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("mutagenesis", collapsed.mutagenesis)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.mutagenesis ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {mutagenesis && mutagenesis.length !== 0 && (
                      <ClientPaginatedTable
                        data={addIndex(mutagenesis)}
                        columns={mutagenesisColumns}
                        idField={"index"}
                        onClickTarget={"#mutagenesis"}
                        defaultSortField={"start_pos"}
                        defaultSortOrder="asc"
                      />
                    )}
                    {!mutagenesis && <p>No data available.</p>}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            {/* Cell-Line */}
            <Accordion
              id="Cell-Line"
              defaultActiveKey="0"
              className="panel-width"
              style={{ padding: "20px 0" }}
            >
              <Card>
                <Card.Header className="panelHeadBgr">
                  <span className="gg-green d-inline">
                    <HelpTooltip
                      title={DetailTooltips.publication.cell_line.title}
                      text={DetailTooltips.publication.cell_line.text}
                      urlText={DetailTooltips.publication.cell_line.urlText}
                      url={DetailTooltips.publication.cell_line.url}
                      helpIcon="gg-helpicon-detail"
                    />
                  </span>
                  <h4 className="gg-green d-inline">
                    {stringConstants.sidebar.cell_line.displayname}
                  </h4>
                  <div className="float-right">
                    <Accordion.Toggle
                      eventKey="0"
                      onClick={() => toggleCollapse("cell_line", collapsed.cell_line)}
                      className="gg-green arrow-btn"
                    >
                      <span>{collapsed.cell_line ? closeIcon : expandIcon}</span>
                    </Accordion.Toggle>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {displayedCellLineItems && (
                      <>
                        <div>
                          <ul className="list-style-none">
                            <Row>
                              {displayedCellLineItems.map((cellLine) => (
                                <Col
                                  className="nowrap"
                                  xs={12}
                                  sm={4}
                                  key={cellLine.cellosaurus_id}
                                >
                                  <li>
                                    <strong>{cellLine.name}</strong>{" "}
                                    <LineTooltip text="View Cell Line details">
                                      <a
                                        href={cellLine.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {cellLine.cellosaurus_id}
                                      </a>
                                    </LineTooltip>
                                  </li>
                                </Col>
                              ))}
                            </Row>
                            {cellLineItems.length > maxCellItems && (
                              <>
                                {open ? (
                                  <Button
                                    style={{
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
                    {!cell_line && <span>No data available.</span>}
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
export default PublicationDetail;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useReducer } from "react";
import { getProteinDetail } from "../data/protein";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { Grid } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import { FiBookOpen } from "react-icons/fi";
import { groupEvidences, groupSpeciesEvidences } from "../data/data-format";
import EvidenceList from "../components/EvidenceList";
import ClientPaginatedTable from "../components/ClientPaginatedTable";
import "../css/detail.css";
import "../css/Responsive.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import DownloadButton from "../components/DownloadButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import PublicationsMenu from '../components/PublicationsMenu';
import DetailTooltips from "../data/json/detailTooltips.json";
import HelpTooltip from "../components/tooltip/HelpTooltip";
import FeedbackWidget from "../components/FeedbackWidget";
import { Tab, Tabs, Container } from "react-bootstrap";
// import ReactCopyClipboard from'../components/ReactCopyClipboard';
import routeConstants from "../data/json/routeConstants";
import FunctionList from "../components/FunctionList";
// import GoannotationList from "../components/Goannotationlist";
import ProteinSequenceDisplay from "../components/ProteinSequenceDisplay";
import SequenceDisplay from "../components/SequenceDisplay";
import stringConstants from "../data/json/stringConstants";
import { getGlycanImageUrl } from "../data/glycan";
import Button from "react-bootstrap/Button";
import AlignmentDropdown from "../components/AlignmentDropdown";
// import ProtvistaNav from "../components/navigation/ProtvistaNav";
import { FaSearchPlus } from "react-icons/fa";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import { axiosError } from "../data/axiosError";
import LineTooltip from "../components/tooltip/LineTooltip";
const glycanStrings = stringConstants.glycan.common;
const proteinStrings = stringConstants.protein.common;

const items = [
  { label: stringConstants.sidebar.general.displayname, id: "general" },
  {
    label: stringConstants.sidebar.glycosylation.displayname,
    id: "glycosylation"
  },
  {
    label: stringConstants.sidebar.names_synonyms.displayname,
    id: "names_synonyms"
  },

  { label: stringConstants.sidebar.function.displayname, id: "function" },
  {
    label: stringConstants.sidebar.glycan_ligands.displayname,
    id: "glycanLigands"
  },
  {
    label: stringConstants.sidebar.go_annotation.displayname,
    id: "go_annotation"
  },
  {
    label: stringConstants.sidebar.ptm_annotation.displayname,
    id: "ptm_annotation"
  },
  { label: stringConstants.sidebar.mutagenesis.displayname, id: "mutagenesis" },
  { label: stringConstants.sidebar.sequence.displayname, id: "sequence" },
  { label: stringConstants.sidebar.pathway.displayname, id: "pathway" },
  {
    label: stringConstants.sidebar.synthesized_glycans.displayname,
    id: "synthesized_glycans"
  },
  { label: stringConstants.sidebar.isoforms.displayname, id: "isoforms" },
  { label: stringConstants.sidebar.homologs.displayname, id: "homologs" },
  { label: stringConstants.sidebar.disease.displayname, id: "disease" },
  { label: stringConstants.sidebar.snv.displayname, id: "snv" },
  {
    label: stringConstants.sidebar.expression_Tissue.displayname,
    id: "expressionT"
  },
  {
    label: stringConstants.sidebar.expression_Disease.displayname,
    id: "expressionD"
  },
  { label: stringConstants.sidebar.cross_ref.displayname, id: "crossRef" },
  { label: stringConstants.sidebar.publication.displayname, id: "publication" }
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

/**
 * This function opens the Sequence page.
 */
function openProtvistaPage(uniprot_canonical_ac) {
  var str = uniprot_canonical_ac;
  //    str = str.substring(0, str.length - 2);
  str = str.substring(0, str.indexOf("-"));
  var url = "https://www.uniprot.org/uniprot/" + str + "/protvista";
  window.open(url);
}
const sortByPosition = function(a, b) {
  if (a.position < b.position) {
    return -1;
  } else if (b.position < a.position) {
    return 1;
  }
  return 0;
};
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
            id: pathwayitem.id,
            name: pathwayitem.name
          });
        }
      }
      if (!found) {
        itemspathway.push({
          resource: pathwayitem.resource,
          links: [
            {
              url: pathwayitem.url,
              id: pathwayitem.id,
              name: pathwayitem.name
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

const TYPE_RECOMMENDED = "recommended";

const ProteinDetail = props => {
  let { id } = useParams();
  let { select } = useParams();

  const [detailData, setDetailData] = useState({});
  const [itemsCrossRef, setItemsCrossRef] = useState([]);
  const [itemsPathway, setItemsPathway] = useState([]);
  const [showIsoformSequences, setShowIsoformSequences] = useState(false);
  const [showhomologSequences, setShowhomologSequences] = useState(false);
  const [glycosylationTabSelected, setGlycosylationTabSelected] = useState(
    "with_glycanId"
  );
  // const [glycosylationWithImage, setGlycosylationWithImage] = useState([]);
  // const [glycosylationWithImage, setGlycosylationWithImage] = useState([]);
  const [glycosylationWithImage, setGlycosylationWithImage] = useState([]);
  const [glycosylationWithoutImage, setGlycosylationWithoutImage] = useState(
    []
  );
  const [mutataionTabSelected, setmutataionTabSelected] = useState(
    "with_disease"
  );
  const [ptmAnnotation, setPtmAnnotation] = useState([]);
  const [mutataionWithdisease, setMutataionWithdisease] = useState([]);
  const [mutataionWithoutdisease, setMutataionWithoutdisease] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const [selectedHighlights, setSelectedHighlights] = useState({
    mutation: false,
    site_annotation: false,
    n_link_glycosylation: false,
    o_link_glycosylation: false
  });
  const [geneNames, setGeneName] = useState([]);
  const [proteinNames, setProteinNames] = useState([]);

  const recommendedGeneRows = geneNames.map(getRecommendedRows);
  const synonymGeneRows = geneNames.map(getSynonymRows);
  const recommendedProteinRows = proteinNames.map(getRecommendedRows);
  const synonymProteinRows = proteinNames.map(getSynonymRows);

  useEffect(() => {
    setPageLoading(true);
    logActivity("user", id);
    setSelectedHighlights({
      mutation: "mutation" === select,
      site_annotation: "site_annotation" === select,
      n_link_glycosylation: "n_link_glycosylation" === select,
      o_link_glycosylation: "o_link_glycosylation" === select
    });

    const getProteinDetailData = getProteinDetail(id);

    getProteinDetailData.then(({ data }) => {
      if (data.code) {
        let message = "Detail api call";
        logActivity("user", id, "No results. " + message);
        setPageLoading(false);
      } else {
        setItemsCrossRef(getItemsCrossRef(data));
        setItemsPathway(getItemsPathway(data));
        setDetailData(data);
        setPageLoading(false);
      }

      const anchorElement = props.history.location.hash;
      if (anchorElement && document.getElementById(anchorElement.substr(1))) {
        document
          .getElementById(anchorElement.substr(1))
          .scrollIntoView({ behavior: "auto" });
      }
    });

    getProteinDetailData.catch(({ response }) => {
      let message = "list api call";
      axiosError(response, id, message, setPageLoading, setAlertDialogInput);
    });
  }, []);

  useEffect(() => {
    if (detailData.gene_names) {
      setGeneName(formatNamesData(detailData.gene_names));
    }

    if (detailData.protein_names) {
      setProteinNames(formatNamesData(detailData.protein_names));
    }

    if (detailData.ptm_annotation) {
      const ptmEvidence = detailData.ptm_annotation.filter(
        item => item.annotation
      );
      setPtmAnnotation(ptmEvidence);
    }

    if (detailData.glycosylation) {
      const mapOfGlycosylationCategories = detailData.glycosylation.reduce(
        (collection, item) => {
          const [category] = item.site_category.split(".");

          return {
            ...collection,
            [category]: [...(collection[category] || []), item]
          };
        },
        {}
      );

      const withImage = mapOfGlycosylationCategories.reported_with_glycan || [];
      const withoutImage = mapOfGlycosylationCategories.reported || [];

      //   const predicted = detailData.glycosylation.filter(
      //     item => item.glytoucan_ac
      //   );
      //   const withoutImage = detailData.glycosylation.filter(
      //     item => !item.glytoucan_ac
      //   );
      setGlycosylationWithImage(withImage);
      setGlycosylationWithoutImage(withoutImage);

      setGlycosylationTabSelected(
        withImage.length > 0 ? "with_glycanId" : "without_glycanId"
      );
    }

    if (detailData.snv) {
      const WithDisease = detailData.snv.filter(item =>
        item.keywords.includes("disease")
      );
      const Withoutdisease = detailData.snv.filter(
        item => !item.keywords.includes("disease")
      );
      setMutataionWithdisease(WithDisease);
      setMutataionWithoutdisease(Withoutdisease);

      setmutataionTabSelected(
        WithDisease.length > 0 ? "with_disease" : "without_disease"
      );
    }
  }, [detailData]);

  useEffect(() => {
    // Need to call it second time due to glycosylationWithImage and glycosylationWithoutImage table loading time.
    setTimeout(() => {
      const anchorElement = props.history.location.hash;
      if (anchorElement && document.getElementById(anchorElement.substr(1))) {
        document
          .getElementById(anchorElement.substr(1))
          .scrollIntoView({ behavior: "auto" });
      }
    }, 1000);
  }, [
    detailData,
    glycosylationWithImage,
    glycosylationWithoutImage,
    props.history.location.hash
  ]);

  const {
    mass,
    uniprot,
    gene,
    species,
    publication,
    isoforms,
    orthologs,
    glycosylation,
    interactions,
    expression_tissue,
    expression_disease,
    snv,
    refseq,
    mutagenesis,
    disease,
    sequence,
    go_annotation,
    ptm_annotation,
    synthesized_glycans,
    site_annotation,
    protein_names,
    keywords,
    function: functions
  } = detailData;

  const uniprotNames = (protein_names || [])
    .filter(x => x.type === "recommended")
    .map(x => x.name);

  function formatNamesData(data) {
    let items = [];
    data.forEach(({ resource, name, type, url }) => {
      let found = false;
      for (let resourceItem of items) {
        if (resourceItem.resource === resource) {
          found = true;
          resourceItem.links.push({ name, type, url });
        }
      }
      if (!found) {
        items.push({
          resource,
          url,
          links: [{ name, type, url }]
        });
      }
    });
    return items;
  }

  function getRecommendedRows({ links, resource }) {
    return links
      .filter(({ type }) => type === TYPE_RECOMMENDED)
      .map(({ name, url }, index) => (
        <li key={index}>
          <span>{resource}:</span>{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </li>
      ));
  }

  function getSynonymRows({ links, resource, url }, index) {
    const name = links
      .filter(({ type }) => type !== TYPE_RECOMMENDED)
      .map(({ name }) => name)
      .join("; ");
    if (!name) return null;
    return (
      <li key={index}>
        <span>{resource}:</span>{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </li>
    );
  }

  const speciesEvidence = groupSpeciesEvidences(species);
  const glycoSylationColumns = [
    {
      dataField: "evidence",
      text: proteinStrings.evidence.name,

      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "25%"
        };
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
      text: proteinStrings.type.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      }
    },
    {
      dataField: "glytoucan_ac",
      text: proteinStrings.glytoucan_ac.shortName,
      defaultSortField: "glytoucan_ac",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "15%"
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View glycan details">
          <Link to={routeConstants.glycanDetail + row.glytoucan_ac}>
            {row.glytoucan_ac}
          </Link>
        </LineTooltip>
      )
      //testing
    },
    {
      dataField: "glytoucan_ac",
      text: glycanStrings.glycan_image.name,
      sort: false,
      selected: true,
      formatter: (value, row) => (
        <div className="img-wrapper">
          <img
            className="img-cartoon-list-page img-cartoon"
            src={getGlycanImageUrl(row.glytoucan_ac)}
            alt="Glycan img"
          />
        </div>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          width: "35%",
          textAlign: "left",
          backgroundColor: "#4B85B6",
          color: "white",
          whiteSpace: "nowrap"
        };
      }
    },
    {
      dataField: "position",
      text: proteinStrings.position.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View siteview details">
          <Link to={`${routeConstants.siteview}${id}/${row.position}`}>
            {row.residue} {row.position}
          </Link>
        </LineTooltip>
      )
    }
  ];
  const glycanLigandsColumns = [
    {
      dataField: "evidence",
      text: proteinStrings.evidence.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white", width: "25%" };
      },
      formatter: (cell, row) => {
        return (
          <EvidenceList
            key={row.interactor_id}
            evidences={groupEvidences(cell)}
          />
        );
      }
    },
    {
      dataField: "interactor_id",
      text: proteinStrings.glytoucan_ac.shortName,
      defaultSortField: "interactor_id",
      sort: true,

      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white", width: "15%" };
      },
      formatter: (value, row) => (
        <LineTooltip text="View glycan details">
          <Link to={routeConstants.glycanDetail + row.interactor_id}>
            {row.interactor_id}
          </Link>
        </LineTooltip>
      )
    },
    {
      dataField: "interactor_id",
      text: glycanStrings.glycan_image.name,
      sort: false,
      selected: true,
      formatter: (value, row) => (
        <div className="img-wrapper">
          <img
            className="img-cartoon-list-page img-cartoon"
            src={getGlycanImageUrl(row.interactor_id)}
            alt="Glycan img"
          />
        </div>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          width: "35%",
          textAlign: "left",
          backgroundColor: "#4B85B6",
          color: "white",
          whiteSpace: "nowrap"
        };
      }
    }
  ];
  const synthesizedGlycansColumns = [
    {
      dataField: "glytoucan_ac",
      text: proteinStrings.glytoucan_ac.shortName,
      defaultSortField: "glytoucan_ac",
      sort: true,

      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white", width: "15%" };
      },
      formatter: (value, row) => (
        <LineTooltip text="View glycan details">
          <Link to={routeConstants.glycanDetail + row.glytoucan_ac}>
            {row.glytoucan_ac}
          </Link>
        </LineTooltip>
      )
    },
    {
      dataField: "glytoucan_ac",
      text: glycanStrings.glycan_image.name,
      sort: false,
      selected: true,
      formatter: (value, row) => (
        <div className="img-wrapper">
          <img
            className="img-cartoon-list-page img-cartoon"
            src={getGlycanImageUrl(row.glytoucan_ac)}
            alt="Glycan img"
          />
        </div>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          width: "35%",
          textAlign: "left",
          backgroundColor: "#4B85B6",
          color: "white",
          whiteSpace: "nowrap"
        };
      }
    },
    {
      dataField: "type",
      text: proteinStrings.type.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      }
    },
    {
      dataField: "subtype",
      text: proteinStrings.subtype.name,
      sort: true,
      formatter: (value, row) => (
        <span className="text-capitalize"> {row.subtype}</span>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      }
    }
  ];
  const mutationColumns = [
    {
      dataField: "evidence",
      text: proteinStrings.evidence.name,

      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "20%"
        };
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
      text: proteinStrings.annotation_site.shortName,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "20%"
        };
      }
    },

    {
      dataField: "annotation",
      text: proteinStrings.annotation_site.shortName,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "20%"
        };
      }
    },
    {
      dataField: "disease",
      text: stringConstants.sidebar.disease.displayname,
      defaultSortField: "disease",
      headerStyle: (column, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "16%"
        };
      },
      formatter: (value, row) => (
        <>
          {value.map(disease => (
            <li key={disease.recommended_name.id}>
              {disease.recommended_name.name}{" "}
              <span className="nowrap">
                (DOID:{" "}
                <a href={disease.recommended_name.url}>
                  {disease.recommended_name.id}
                </a>
                )
              </span>
            </li>
          ))}
        </>
      )
    },
    {
      dataField: "start_pos",
      text: proteinStrings.startpos.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View siteview details">
          <Link to={`${routeConstants.siteview}${id}/${row.start_pos}`}>
            {row.start_pos}
          </Link>
        </LineTooltip>
      )
    },
    {
      dataField: "end_pos",
      text: proteinStrings.endpos.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View siteview details">
          <Link to={`${routeConstants.siteview}${id}/${row.end_pos}`}>
            {row.end_pos}
          </Link>
        </LineTooltip>
      )
    },

    {
      dataField: "sequence",
      text: stringConstants.sidebar.sequence.displayname,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      },
      formatter: (value, row) => (
        <>
          {row.sequence_org} → {row.sequence_mut}
        </>
      )
    }
  ];
  const mutagenesisColumns = [
    {
      dataField: "evidence",
      text: proteinStrings.evidence.name,

      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "20%"
        };
      },
      formatter: (cell, row) => {
        return <EvidenceList evidences={groupEvidences(cell)} />;
      }
    },

    {
      dataField: "start_pos",
      text: proteinStrings.startpos.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View siteview details">
          <Link to={`${routeConstants.siteview}${id}/${row.start_pos}`}>
            {row.start_pos}
          </Link>
        </LineTooltip>
      )
    },
    {
      dataField: "end_pos",
      text: proteinStrings.endpos.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      },
      formatter: (value, row) => (
        <LineTooltip text="View siteview details">
          <Link to={`${routeConstants.siteview}${id}/${row.end_pos}`}>
            {row.end_pos}
          </Link>
        </LineTooltip>
      )
    },

    {
      dataField: "sequence",
      text: stringConstants.sidebar.sequence.displayname,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      },
      formatter: (value, row) => (
        <>
          {row.sequence_org} → {row.sequence_mut}
        </>
      )
    },
    {
      dataField: "annotation",
      text: "Note",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "20%"
        };
      }
    }
  ];
  const expressionTissueColumns = [
    {
      dataField: "evidence",
      text: proteinStrings.evidence.name,

      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "25%"
        };
      },
      formatter: (cell, row) => {
        return (
          <EvidenceList
            key={row.tissue.uberon}
            evidences={groupEvidences(cell)}
          />
        );
      }
    },

    {
      dataField: "tissue",
      text: proteinStrings.tissue.name,
      defaultSortField: "tissue",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      },
      formatter: (value, row) => (
        <>
          {value.name}{" "}
          <span className="nowrap">
            ({proteinStrings.uberonN.name}:{" "}
            <a href={value.url}>{value.uberon}</a>)
          </span>
        </>
      )
    },

    {
      dataField: "present",
      text: "Present",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "15%"
        };
      }
    }
  ];
  const expressionDiseaseColumns = [
    {
      dataField: "evidence",
      text: proteinStrings.evidence.name,

      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "25%"
        };
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
      dataField: "disease",
      text: stringConstants.sidebar.disease.displayname,
      defaultSortField: "disease",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      },
      formatter: (value, row) => (
        <>
          {value.name}{" "}
          <span className="nowrap">
            ({proteinStrings.doid.name}: <a href={value.url}>{value.doid}</a>)
          </span>
        </>
      )
    },
    {
      dataField: "trend",
      text: proteinStrings.expression_trend.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "15%"
        };
      }
    },
    {
      dataField: "significant",
      text: proteinStrings.significantt.name,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "15%"
        };
      }
    }
  ];
  const ptmAnnotationColumns = [
    {
      dataField: "evidence",
      text: proteinStrings.evidence.name,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white",
          width: "20%"
        };
      },
      formatter: (cell, row) => {
        return (
          <EvidenceList key={row.annotation} evidences={groupEvidences(cell)} />
        );
      }
    },
    {
      dataField: "annotation",
      text: proteinStrings.annotation_site.shortName,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return {
          backgroundColor: "#4B85B6",
          color: "white"
        };
      }
    }
  ];
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
      names_synonyms: true,
      function: true,
      glycanLigands: true,
      go_annotation: true,
      ptm_annotation: true,
      glycosylation: true,
      sequence: true,
      pathway: true,
      synthesized_glycans: true,
      isoforms: true,
      homologs: true,
      disease: true,
      mutation: true,
      expression_tissue: true,
      expression_disease: true,
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
          <div className="sidebar-page-mb">
            <div className="content-box-md">
              <Row>
                <Grid item xs={12} sm={12} className="text-center">
                  <div className="horizontal-heading">
                    <h5>Look At</h5>
                    <h2>
                      {" "}
                      <span>
                        Details for{" "}
                        <span>{keywords ? "Glycoprotein" : "Protein"}</span>
                        <strong className="nowrap">
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
            <div className="gg-download-btn-width">
              <DownloadButton
                types={[
                  {
                    display:
                      stringConstants.download.protein_jsondata.displayname,
                    type: "json",
                    data: "protein_detail"
                  },
                  {
                    display:
                      stringConstants.download.protein_fastadata.displayname,
                    type: "fasta",
                    data: "protein_detail"
                  }
                ]}
                dataId={id}
                itemType="protein"
              />
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
              <PageLoader pageLoading={pageLoading} />
              <DialogAlert
                alertInput={alertDialogInput}
                setOpen={input => {
                  setAlertDialogInput({ show: input });
                }}
              />
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
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.general.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("general", collapsed.general)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.general ? closeIcon : expandIcon}
                        </span>
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
                          <>
                            {gene.map((genes, genesname) => (
                              <span key={genesname}>
                                <div>
                                  <strong>
                                    {proteinStrings.gene_name.name}:
                                  </strong>{" "}
                                  <a
                                    href={genes.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {genes.name}
                                  </a>
                                </div>

                                <div>
                                  <strong>
                                    {proteinStrings.gene_location.name}:
                                  </strong>{" "}
                                  {proteinStrings.chromosome.name}: {""}
                                  {genes.locus
                                    ? genes.locus.chromosome
                                    : "NA"}{" "}
                                  {""}(
                                  {genes.locus
                                    ? addCommas(genes.locus.start_pos)
                                    : "NA"}{" "}
                                  -{" "}
                                  {genes.locus
                                    ? addCommas(genes.locus.end_pos)
                                    : "NA"}
                                  )
                                </div>

                                <EvidenceList
                                  evidences={groupEvidences(
                                    genes.locus ? genes.locus.evidence : []
                                  )}
                                />
                              </span>
                            ))}
                          </>
                        )}
                        {!gene && (
                          <p className="no-data-msg-publication">
                            No data available.
                          </p>
                        )}
                      </div>

                      {uniprot && uniprot.uniprot_canonical_ac && (
                        <>
                          <div>
                            <strong>{proteinStrings.uniprot_id.name}: </strong>
                            <a
                              href={uniprot.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {uniprot.uniprot_id}{" "}
                            </a>
                          </div>
                          <div>
                            <strong>
                              {proteinStrings.uniprot_accession.name}:{" "}
                            </strong>
                            <a
                              href={uniprot.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {uniprot.uniprot_canonical_ac}
                            </a>
                          </div>
                          <div>
                            <strong>
                              {proteinStrings.sequence_length.name}:{" "}
                            </strong>
                            <a
                              href={`https://www.uniprot.org/uniprot/${uniprot.uniprot_canonical_ac}/#sequences`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {uniprot.length}
                            </a>
                          </div>
                          <div>
                            <strong>
                              {proteinStrings.recommendedname.name}:{" "}
                            </strong>{" "}
                            {/* {proteinStrings.protein_names_uniprotkb.shortName} */}
                            {uniprotNames}
                          </div>
                          <div>
                            <strong>
                              {proteinStrings.chemical_mass.name}:{" "}
                            </strong>
                            {addCommas(mass.chemical_mass)} Da
                          </div>

                          {refseq && (
                            <div>
                              <>
                                <strong>
                                  {proteinStrings.refseq_ac.name}:{" "}
                                </strong>{" "}
                                <a
                                  href={refseq.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {" "}
                                  {refseq.ac}{" "}
                                </a>{" "}
                                <div>
                                  {" "}
                                  <strong>
                                    {proteinStrings.refSeq_name.name}:{" "}
                                  </strong>{" "}
                                  {refseq.name}{" "}
                                </div>{" "}
                              </>
                            </div>
                          )}
                        </>
                      )}
                      <div>
                        {speciesEvidence &&
                          // For every species object
                          Object.keys(speciesEvidence).map(speEvi => (
                            // For every database for current species object
                            <div>
                              <>
                                <strong>{proteinStrings.species.name}: </strong>
                                {speEvi} {"["}
                                {/* <LineTooltip text="View details on NCBI"> */}
                                <a
                                  href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${speciesEvidence[speEvi].taxid}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {speciesEvidence[speEvi].taxid}
                                </a>
                                {/* </LineTooltip> */}
                                {"]"}
                                <EvidenceList
                                  evidences={speciesEvidence[speEvi].evidence}
                                />
                              </>
                            </div>
                          ))}
                        {/* {!species && (
													<p className="no-data-msg">No data available.</p>
												)} */}
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  Glycosylation */}
              <Accordion
                id="glycosylation"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.glycosylations.title}
                        text={DetailTooltips.protein.glycosylations.text}
                        urlText={DetailTooltips.protein.glycosylations.urlText}
                        url={DetailTooltips.protein.glycosylations.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.glycosylation.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse(
                            "glycosylation",
                            collapsed.glycosylation
                          )
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.glycosylation ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {glycosylation && glycosylation.length && (
                        <Tabs
                          defaultActiveKey={
                            glycosylationWithImage &&
                            glycosylationWithImage.length > 0
                              ? "with_glycanId"
                              : "without_glycanId"
                          }
                          transition={false}
                          activeKey={glycosylationTabSelected}
                          mountOnEnter={true}
                          unmountOnExit={true}
                          onSelect={key => setGlycosylationTabSelected(key)}
                        >
                          <Tab
                            eventKey="with_glycanId"
                            // className='tab-content-padding'
                            title="With Reported Glycan"
                            //disabled={(!glycosylationWithImage || (glycosylationWithImage.length === 0))}
                          >
                            <Container
                              style={{
                                paddingTop: "20px",
                                paddingBottom: "30px"
                              }}
                            >
                              {glycosylationWithImage &&
                                glycosylationWithImage.length > 0 && (
                                  <ClientPaginatedTable
                                    data={glycosylationWithImage}
                                    columns={glycoSylationColumns}
                                    onClickTarget={"#glycosylation"}
                                    defaultSortField="position"
                                  />
                                )}
                              {!glycosylationWithImage.length && (
                                <p>No data available.</p>
                              )}
                            </Container>
                          </Tab>
                          <Tab
                            eventKey="without_glycanId"
                            className="tab-content-padding"
                            title="Without Reported Glycan"
                            // disabled={(!glycosylationWithoutImage || (glycosylationWithoutImage.length === 0))}
                          >
                            <Container>
                              {glycosylationWithoutImage &&
                                glycosylationWithoutImage.length > 0 && (
                                  <ClientPaginatedTable
                                    data={glycosylationWithoutImage}
                                    columns={glycoSylationColumns.filter(
                                      column =>
                                        column.dataField !== "glytoucan_ac"
                                    )}
                                    onClickTarget={"#glycosylation"}
                                    defaultSortField="position"
                                  />
                                )}
                              {!glycosylationWithoutImage.length && (
                                <p>No data available.</p>
                              )}
                            </Container>
                          </Tab>
                        </Tabs>
                      )}

                      {!glycosylation && <p>No data available.</p>}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  names_synonyms */}
              <Accordion
                id="names_synonyms"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.names_synonyms.title}
                        text={DetailTooltips.protein.names_synonyms.text}
                        urlText={DetailTooltips.protein.names_synonyms.urlText}
                        url={DetailTooltips.protein.names_synonyms.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.names_synonyms.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse(
                            "names_synonyms",
                            collapsed.names_synonyms
                          )
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.names_synonyms ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {geneNames &&
                      geneNames.length &&
                      proteinNames &&
                      proteinNames.length ? (
                        <ul className="list-style-none">
                          <li>
                            <strong>
                              {proteinStrings.gene_name_recommended.name}
                            </strong>
                            <ul>{recommendedGeneRows}</ul>
                          </li>
                          <li>
                            <strong>
                              {proteinStrings.gene_name_synonym.name}
                            </strong>
                            <ul>{synonymGeneRows}</ul>
                          </li>
                          <li>
                            <strong>
                              {proteinStrings.protein_name_recommended.name}
                            </strong>
                            <ul>{recommendedProteinRows}</ul>
                          </li>
                          <li>
                            <strong>
                              {proteinStrings.protein_name_synonym.name}
                            </strong>
                            <ul>{synonymProteinRows}</ul>
                          </li>
                        </ul>
                      ) : (
                        <p>No data available.</p>
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  function */}
              <Accordion
                id="function"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.function.title}
                        text={DetailTooltips.protein.function.text}
                        urlText={DetailTooltips.protein.function.urlText}
                        url={DetailTooltips.protein.function.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.function.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("function", collapsed.function)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.function ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="card-padding-zero">
                      <Table hover fluid>
                        <FunctionList functions={functions} />
                        {!functions && (
                          <p className="no-data-msg-publication">
                            No data available.
                          </p>
                        )}
                      </Table>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/* Glycan Ligands */}
              <Accordion
                id="glycanLigands"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.glycan_ligands.title}
                        text={DetailTooltips.protein.glycan_ligands.text}
                        urlText={DetailTooltips.protein.glycan_ligands.urlText}
                        url={DetailTooltips.protein.glycan_ligands.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.glycan_ligands.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse(
                            "glycanLigands",
                            collapsed.glycanLigands
                          )
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.glycanLigands ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {interactions && interactions.length !== 0 && (
                        <ClientPaginatedTable
                          data={interactions}
                          columns={glycanLigandsColumns}
                          defaultSortField={"interactor_id"}
                          onClickTarget={"#glycanLigands"}
                        />
                      )}
                      {!interactions && <p>No data available.</p>}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  GO annotation */}
              <Accordion
                id="go_annotation"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.goannotation.title}
                        text={DetailTooltips.protein.goannotation.text}
                        urlText={DetailTooltips.protein.goannotation.urlText}
                        url={DetailTooltips.protein.goannotation.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.go_annotation.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse(
                            "go_annotation",
                            collapsed.go_annotation
                          )
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.go_annotation ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div>
                        {go_annotation &&
                          go_annotation.categories &&
                          go_annotation.categories.map(category => (
                            <>
                              <h6>{category.name}</h6>
                              {category.go_terms &&
                                category.go_terms.map(term => (
                                  <Row>
                                    <Col
                                      sm={6}
                                      md={6}
                                      style={{ paddingTop: "15px" }}
                                    >
                                      <a
                                        href={term.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {term.name} ({term.id})
                                      </a>
                                    </Col>
                                    <Col sm={6} md={5}>
                                      <EvidenceList
                                        evidences={groupEvidences(
                                          term.evidence
                                        )}
                                      />
                                    </Col>
                                  </Row>
                                ))}
                              <strong>
                                <p className="go-annotation-total">
                                  Total{" "}
                                  <a
                                    style={{ cursor: "pointer" }}
                                    // eslint-disable-next-line
                                    onClick={() => {
                                      handleOpenGOTermListPage(
                                        uniprot &&
                                          uniprot.uniprot_canonical_ac.split(
                                            "-"
                                          )[0]
                                      );
                                    }}
                                    // onclick="openGOTermListPage()"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {category.total} in {category.name}
                                  </a>{" "}
                                  category.
                                </p>
                              </strong>
                            </>
                          ))}
                        {!go_annotation && (
                          <p className="no-data-msg">No data available.</p>
                        )}
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  PTM annotation */}
              <Accordion
                id="ptm_annotation"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.ptmannotation.title}
                        text={DetailTooltips.protein.ptmannotation.text}
                        urlText={DetailTooltips.protein.ptmannotation.urlText}
                        url={DetailTooltips.protein.ptmannotation.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.ptm_annotation.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse(
                            "ptm_annotation",
                            collapsed.ptm_annotation
                          )
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.ptm_annotation ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {ptm_annotation && ptm_annotation.length !== 0 && (
                        <ClientPaginatedTable
                          data={ptmAnnotation}
                          columns={ptmAnnotationColumns}
                          onClickTarget={"#ptm_annotation"}
                          // defaultSortField={"annotation"}
                        />
                      )}
                      {!ptm_annotation && <p>No data available.</p>}
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
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.sequence.displayname}
                    </h4>
                    <div className="float-right">
                      <span>
                        <Link to={`${routeConstants.protVista}${id}`}>
                          <Button
                            type="button"
                            style={{ marginLeft: "5px" }}
                            className="gg-btn-blue"
                          >
                            <FaSearchPlus /> ProtVista
                          </Button>
                        </Link>
                      </span>

                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("sequence", collapsed.sequence)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.sequence ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div>
                        <ProteinSequenceDisplay
                          sequenceObject={sequence}
                          glycosylation={glycosylation}
                          mutation={snv}
                          siteAnnotation={site_annotation}
                          selectedHighlights={selectedHighlights}
                          setSelectedHighlights={setSelectedHighlights}
                        />
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  Mutagenesis */}
              <Accordion
                id="mutagenesis"
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
                        onClick={() =>
                          toggleCollapse("mutagenesis", collapsed.mutagenesis)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.mutagenesis ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {mutagenesis && mutagenesis.length !== 0 && (
                        <ClientPaginatedTable
                          data={mutagenesis}
                          columns={mutagenesisColumns}
                          onClickTarget={"#mutagenesis"}
                          defaultSortField={"disease"}
                        />
                      )}
                      {!mutagenesis && <p>No data available.</p>}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              {/*  Pathway */}
              <Accordion
                id="pathway"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.pathway.title}
                        text={DetailTooltips.protein.pathway.text}
                        urlText={DetailTooltips.protein.pathway.urlText}
                        url={DetailTooltips.protein.pathway.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.pathway.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("pathway", collapsed.pathway)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.pathway ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {itemsPathway && itemsPathway.length ? (
                        <ul className="list-style-none">
                          {itemsPathway.map(pathway => (
                            <li>
                              <strong>
                                {pathway.id} {pathway.resource}
                              </strong>

                              <ul style={{ marginBottom: "10px" }}>
                                <Row>
                                  {pathway.links.map(link => (
                                    <Col xs={12} sm={12}>
                                      <li>
                                        {link.name}{" "}
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
                      ) : (
                        <p>No data available.</p>
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  synthesized glycans */}
              <Accordion
                id="synthesized_glycans"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.synthesized_glycans.title}
                        text={DetailTooltips.protein.synthesized_glycans.text}
                        urlText={
                          DetailTooltips.protein.synthesized_glycans.urlText
                        }
                        url={DetailTooltips.protein.synthesized_glycans.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.synthesized_glycans.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse(
                            "synthesized_glycans",
                            collapsed.synthesized_glycans
                          )
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.synthesized_glycans
                            ? closeIcon
                            : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {synthesized_glycans &&
                        synthesized_glycans.length !== 0 && (
                          <ClientPaginatedTable
                            data={synthesized_glycans}
                            columns={synthesizedGlycansColumns}
                            defaultSortField={"glytoucan_ac"}
                            onClickTarget={"#synthesized_glycans"}
                          />
                        )}
                      {!synthesized_glycans && <p>No data available.</p>}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  isoforms */}
              <Accordion
                id="isoforms"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.isoforms.title}
                        text={DetailTooltips.protein.isoforms.text}
                        urlText={DetailTooltips.protein.isoforms.urlText}
                        url={DetailTooltips.protein.isoforms.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.isoforms.displayname}
                    </h4>
                    <div className="float-right">
                      <Link
                        to={`${routeConstants.isoAlignment}${id}/isoformset-uniprotkb`}
                      >
                        <Button type="button" className="gg-btn-blue">
                          Alignment
                        </Button>
                      </Link>
                      <Button
                        type="button"
                        style={{
                          marginLeft: "10px"
                        }}
                        className="gg-btn-blue"
                        onClick={() =>
                          setShowIsoformSequences(!showIsoformSequences)
                        }
                      >
                        {showIsoformSequences
                          ? "Hide Sequences"
                          : "Show  Sequences"}
                      </Button>
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("isoforms", collapsed.isoforms)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.isoforms ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <p>
                        {isoforms && (
                          <Grid container className="table-body">
                            {isoforms.map((isoformsS, isoformIndex) => (
                              <Grid item xs={12} key={isoformIndex}>
                                <div>
                                  <strong>
                                    {proteinStrings.isoform_acc.name}:{" "}
                                  </strong>
                                  <a
                                    href={isoformsS.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {isoformsS.isoform_ac}
                                  </a>
                                </div>
                                {sequence && sequence.length && (
                                  <div>
                                    <strong>
                                      {" "}
                                      {proteinStrings.isoform_length.name}:{" "}
                                    </strong>
                                    {sequence.length}
                                  </div>
                                )}
                                {isoformsS.locus && (
                                  <div>
                                    {proteinStrings.chromosome.name}: {""}
                                    {isoformsS.locus
                                      ? isoformsS.locus.chromosome
                                      : "NA"}{" "}
                                    {""}(
                                    {isoformsS.locus
                                      ? isoformsS.locus.start_pos
                                      : "NA"}{" "}
                                    -{" "}
                                    {isoformsS.locus
                                      ? isoformsS.locus.end_pos
                                      : "NA"}
                                    )
                                  </div>
                                )}
                                <Grid className="badge-grid" xs={12}>
                                  <EvidenceList
                                    evidences={groupEvidences(
                                      isoformsS.locus
                                        ? isoformsS.locus.evidence
                                        : []
                                    )}
                                  />
                                </Grid>
                                {showIsoformSequences && (
                                  <Grid style={{ paddingBottom: "40px" }}>
                                    {/* <IsoformSequenceDisplay
                                    sequenceData={isoformsS.sequence}
                                  /> */}
                                    <div className="sequnce_highlight">
                                      {" "}
                                      <SequenceDisplay
                                        sequenceData={isoformsS.sequence.sequence
                                          .split("")
                                          .map(a => ({
                                            character: a
                                          }))}
                                      />
                                    </div>
                                  </Grid>
                                )}
                              </Grid>
                            ))}
                          </Grid>
                        )}

                        {!isoforms && (
                          <p classisoforms_ac="no-data-msg-publication">
                            No data available.
                          </p>
                        )}
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/* Homologs / orthologs */}
              <Accordion
                id="homologs"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.homologs.title}
                        text={DetailTooltips.protein.homologs.text}
                        urlText={DetailTooltips.protein.homologs.urlText}
                        url={DetailTooltips.protein.homologs.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.homologs.displayname}
                    </h4>
                    <div className="float-right">
                      {orthologs && orthologs.length && (
                        <>
                          <AlignmentDropdown
                            types={
                              [
                                /*{
																display: " Homolog-oma",
																type: "Homolog-oma",
																data: "protein_detail",
															},
															{
																display: " Homolog-mgi",
																type: "homolog-mgi",
																data: "protein_detail",
															},*/
                              ]
                            }
                            dataType="protein_detail"
                            dataId={id}
                          />

                          <Button
                            style={{
                              marginLeft: "10px"
                            }}
                            type="button"
                            className="gg-btn-blue"
                            onClick={() =>
                              setShowhomologSequences(!showhomologSequences)
                            }
                          >
                            {showhomologSequences
                              ? "Hide Sequences"
                              : "Show  Sequences"}
                          </Button>
                        </>
                      )}

                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("homologs", collapsed.homologs)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.homologs ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {orthologs && (
                        <Grid container classorthologs_ac="table-body">
                          {orthologs.map(
                            (orthologsS, orthologsSuniprot_canonical_ac) => (
                              <Grid
                                item
                                xs={12}
                                key={orthologsSuniprot_canonical_ac}
                              >
                                <div>
                                  <strong>UniProtKB Homolog Accession: </strong>

                                  {/* <Link
																		href={orthologsS.url}
																		target="_blank"
																		rel="noopener noreferrer"> */}
                                  {orthologsS.uniprot_canonical_ac}
                                  {/* </Link> */}
                                </div>
                                <div>
                                  <strong>
                                    {glycanStrings.organism.name}:{" "}
                                  </strong>
                                  {orthologsS.organism}
                                </div>

                                <Grid className="badge-grid" xs={12}>
                                  <EvidenceList
                                    evidences={groupEvidences(
                                      orthologsS.evidence
                                    )}
                                  />
                                </Grid>
                                {showhomologSequences && (
                                  <Grid style={{ paddingBottom: "40px" }}>
                                    <div className="sequnce_highlight">
                                      {" "}
                                      <SequenceDisplay
                                        sequenceData={orthologsS.sequence.sequence
                                          .split("")
                                          .map(a => ({
                                            character: a
                                          }))}
                                      />
                                    </div>
                                  </Grid>
                                )}
                              </Grid>
                            )
                          )}
                        </Grid>
                      )}

                      {!orthologs && (
                        <p classorthologs_ac="no-data-msg-publication">
                          No data available.
                        </p>
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  disease */}
              <Accordion
                id="disease"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.disease.title}
                        text={DetailTooltips.protein.disease.text}
                        urlText={DetailTooltips.protein.disease.urlText}
                        url={DetailTooltips.protein.disease.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.disease.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("disease", collapsed.disease)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.disease ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <p>
                        {disease && disease.length && (
                          <Grid container classorthologs_ac="table-body">
                            {disease.map(thisDisease => (
                              <Grid item xs={12}>
                                <div>
                                  <strong>
                                    {" "}
                                    {thisDisease.recommended_name.name}
                                  </strong>

                                  <p>
                                    {" "}
                                    {/* ICD10: {disease.recommended_name.id} DOID:{" "} */}
                                    (
                                    <a
                                      href={thisDisease.recommended_name.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {thisDisease.recommended_name.resource}{" "}
                                      {thisDisease.recommended_name.id}
                                    </a>
                                    )
                                  </p>
                                </div>

                                <Grid xs={9}>
                                  <EvidenceList
                                    evidences={groupEvidences(
                                      thisDisease.evidence
                                    )}
                                  />
                                </Grid>
                              </Grid>
                            ))}
                          </Grid>
                        )}

                        {!disease && (
                          <p classorthologs_ac="no-data-msg-publication">
                            No data available.
                          </p>
                        )}
                      </p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  Mutation */}
              <Accordion
                id="snv"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.mutation.title}
                        text={DetailTooltips.protein.mutation.text}
                        urlText={DetailTooltips.protein.mutation.urlText}
                        url={DetailTooltips.protein.mutation.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.snv.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("mutation", collapsed.mutation)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.mutation ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {snv && snv.length !== 0 && (
                        <Tabs
                          defaultActiveKey={
                            mutataionWithdisease &&
                            mutataionWithdisease.length > 0
                              ? "with_disease"
                              : "without_disease"
                          }
                          transition={false}
                          activeKey={mutataionTabSelected}
                          mountOnEnter={true}
                          unmountOnExit={true}
                          onSelect={key => setmutataionTabSelected(key)}
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
                                paddingBottom: "30px"
                              }}
                            >
                              {mutataionWithdisease &&
                                mutataionWithdisease.length > 0 && (
                                  <ClientPaginatedTable
                                    data={mutataionWithdisease}
                                    columns={mutationColumns}
                                    onClickTarget={"#mutation"}
                                    defaultSortField="position"
                                  />
                                )}
                              {!mutataionWithdisease.length && (
                                <p>No data available.</p>
                              )}
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
                              {mutataionWithoutdisease &&
                                mutataionWithoutdisease.length > 0 && (
                                  <ClientPaginatedTable
                                    data={mutataionWithoutdisease}
                                    columns={mutationColumns.filter(
                                      column => column.dataField !== "disease"
                                    )}
                                    onClickTarget={"#mutation"}
                                    defaultSortField="position"
                                  />
                                )}
                              {!mutataionWithoutdisease.length && (
                                <p>No data available.</p>
                              )}
                            </Container>
                          </Tab>
                        </Tabs>
                      )}

                      {!snv && <p>No data available.</p>}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  Expression Tissue */}
              <Accordion
                id="expressionT"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.expression_tissue.title}
                        text={DetailTooltips.protein.expression_tissue.text}
                        urlText={
                          DetailTooltips.protein.expression_tissue.urlText
                        }
                        url={DetailTooltips.protein.expression_tissue.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.expression_Tissue.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse(
                            "expression_tissue",
                            collapsed.expression_tissue
                          )
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.expression_tissue ? closeIcon : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {expression_tissue && expression_tissue.length !== 0 && (
                        <ClientPaginatedTable
                          data={expression_tissue}
                          columns={expressionTissueColumns}
                          onClickTarget={"#expression_tissue"}
                          defaultSortField={"tissue"}
                        />
                      )}
                      {!expression_tissue && <p>No data available.</p>}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/*  Expression Disease */}
              <Accordion
                id="expressionD"
                defaultActiveKey="0"
                className="panel-width"
                style={{ padding: "20px 0" }}
              >
                <Card>
                  <Card.Header className="panelHeadBgr">
                    <span className="gg-green d-inline">
                      <HelpTooltip
                        title={DetailTooltips.protein.expression_disease.title}
                        text={DetailTooltips.protein.expression_disease.text}
                        urlText={
                          DetailTooltips.protein.expression_disease.urlText
                        }
                        url={DetailTooltips.protein.expression_disease.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {" "}
                      {stringConstants.sidebar.expression_Disease.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse(
                            "expression_disease",
                            collapsed.expression_disease
                          )
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.expression_disease
                            ? closeIcon
                            : expandIcon}
                        </span>
                      </Accordion.Toggle>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {expression_disease &&
                        expression_disease.length !== 0 && (
                          <ClientPaginatedTable
                            data={expression_disease}
                            columns={expressionDiseaseColumns}
                            onClickTarget={"#expression_disease"}
                            defaultSortField={"disease"}
                          />
                        )}
                      {!expression_disease && <p>No data available.</p>}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {/* crossref */}
              <Accordion
                id="crossRef"
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
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.cross_ref.displayname}
                    </h4>
                    <div className="float-right">
                      <Accordion.Toggle
                        eventKey="0"
                        onClick={() =>
                          toggleCollapse("crossref", collapsed.crossref)
                        }
                        className="gg-green arrow-btn"
                      >
                        <span>
                          {collapsed.crossref ? closeIcon : expandIcon}
                        </span>
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
                                <ul style={{ marginBottom: "10px" }}>
                                  <Row>
                                    {crossRef.links.map(link => (
                                      <Col xs={12} sm={4}>
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
                        title={DetailTooltips.motif.publications.title}
                        text={DetailTooltips.motif.publications.text}
                        urlText={DetailTooltips.motif.publications.urlText}
                        url={DetailTooltips.motif.publications.url}
                        helpIcon="gg-helpicon-detail"
                      />
                    </span>
                    <h4 className="gg-green d-inline">
                      {stringConstants.sidebar.publication.displayname}
                    </h4>
                    <div className="float-right">
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
                                      {pub.journal} <span>&nbsp;</span>(
                                      {pub.date})
                                    </div>
                                    <div>
                                      {pub.reference.map(ref => (
                                        <>
                                          <FiBookOpen />
                                          <span style={{ paddingLeft: "15px" }}>
                                            {glycanStrings.pmid.shortName}:
                                            {/* {glycanStrings.referenceType[ref.type].shortName}: */}
                                          </span>{" "}
                                          <a
                                            href={ref.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <>{ref.id}</>
                                          </a>
                                        </>
                                      ))}
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
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProteinDetail;

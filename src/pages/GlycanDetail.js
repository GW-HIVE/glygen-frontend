import React, { useState, useEffect } from "react";
import { getGlycanDetail } from "../data/glycan";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
//import GlygenBadge from "../components/GlygenBadge";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { Link } from "@material-ui/core";
import { Navbar, Col, Row } from "react-bootstrap";
import {
  groupEvidences,
  groupSpeciesEvidences,
  groupPublicationEvidences
} from "../data/data-format";
import EvidenceList from "../components/EvidenceList";

import ClientPaginatedTable from "../components/ClientPaginatedTable";
import "../css/detail.css";

const items = [
  { label: "General", id: "general" },
  { label: "Species", id: "species" },
  { label: "Motif", id: "motif" },
  { label: "Found Glycoprotein", id: "glycoprotein" },
  { label: "Biosynthetic Enzymes", id: "biosyntheticenzymes" },
  { label: "Digital Seqeunce", id: "Dseqence" },
  { label: "Cross References", id: "crossref" },
  { label: "Publication", id: "publication" }
];
function autoResize(frame) {
  frame.height = frame.contentWindow.document.body.scrollHeight + "px";
  frame.width = frame.contentWindow.document.body.scrollWidth + "px";
}

const CompositionDisplay = props => {
  return (
    <>
      {props.composition.map(item => (
        <>
          {item.url ? (
            <>
              <a href={item.url} target="_blank">
                {item.residue}
              </a>
              <sub>{item.count}</sub>
            </>
          ) : (
            <sub>{item.count}</sub>
          )}
        </>
      ))}
    </>
  );
};

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
    // for (let i = 0; i < data.crossref.length; i++) {
    // let crossrefitem = data.crossref[i];
    for (let crossrefitem of data.crossref) {
      let found = "";
      // for (let j = 0; j < itemscrossRef.length; j++) {
      //   let databaseitem = itemscrossRef[j];
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

const GlycanDetail = props => {
  let { id } = useParams();

  const [detailData, setDetailData] = useState({});
  const [itemsCrossRef, setItemsCrossRef] = useState([]);

  useEffect(() => {
    const getGlycanDetailData = getGlycanDetail(id);

    getGlycanDetailData.then(({ data }) => {
      if (data.code) {
        console.log(data.code);
        // displayErrorByCode(data.code);
        // activityTracker("error", id, "error code: " + data.code + " (page: " + page + ", sort: " + sort + ", dir: " + dir + ", limit: " + limit + ")");
      } else {
        setItemsCrossRef(getItemsCrossRef(data));

        setDetailData(data);
      }
    });

    getGlycanDetailData.catch(({ response }) => {
      alert(JSON.stringify(response));
    });
  }, []);

  if (detailData.mass) {
    detailData.mass = addCommas(detailData.mass);
  }
  if (detailData.glycoct) {
    detailData.glycoct = detailData.glycoct.replace(/\\n/g, "\n");
  }
  const {
    mass,
    glytoucan,
    inchi_key,
    species,
    composition,
    motifs,
    iupac,
    glycam,
    smiles_isomeric,
    inchi,
    classification,
    glycoprotein,
    glycoct,
    publication,
    wurcs,
    enzyme
  } = detailData;

  const speciesEvidence = groupSpeciesEvidences(species);
  const publicationEvidence = groupPublicationEvidences(publication);

  const glycanImageUrl = "https://api.glygen.org/glycan/image/";

  const PublicationColumns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,

      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },

    {
      dataField: "evidence",
      text: "Sources",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },
      formatter: (cell, row) => {
        return <EvidenceList key={row.pmid} evidences={groupEvidences(cell)} />;
      }
    },
    {
      dataField: "pmid",
      text: "PMID",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },
      formatter: (value, row) => (
        <Navbar.Text as={NavLink} to={`/glycan-detail/${row.pmid}`}>
          {row.pmid}
        </Navbar.Text>
      )
    },
    {
      dataField: "journal",
      text: "Journal",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    }
  ];
  const glycoProtienColumns = [
    {
      dataField: "uniprot_canonical_ac",
      text: "protein ID",
      sort: true,

      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },
      formatter: (value, row) => (
        <Navbar.Text
          as={NavLink}
          to={`/protein-detail/${row.uniprot_canonical_ac}`}
        >
          {row.uniprot_canonical_ac}
        </Navbar.Text>
      )
    },

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
            key={row.position + row.uniprot_canonical_ac}
            evidences={groupEvidences(cell)}
          />
        );
      }
    },
    {
      dataField: "position",
      text: "Position",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },
    {
      dataField: "protein_name",
      text: "Protein Name",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    }
  ];
  const bioEnzymeColumns = [
    {
      dataField: "uniprot_canonical_ac",
      text: "protein ID",
      sort: true,

      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },
      formatter: (value, row) => (
        <Navbar.Text
          as={NavLink}
          to={`/protein-detail/${row.uniprot_canonical_ac}`}
        >
          {row.uniprot_canonical_ac}
        </Navbar.Text>
      )
    },

    {
      dataField: "protein_name",
      text: "Protein_Name",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    },
    {
      dataField: "gene",
      text: "Gene",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      },

      formatter: (value, row) => (
        <a href={row.gene_link}>{value}</a>
        //<Navbar.Text as={NavLink} to={row.gene_link}>
        //  {value}
        //</Navbar.Text>
      )
    },
    {
      dataField: "tax_name",
      text: "Species Name",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
    }
  ];

  return (
    <>
      <Row>
        <Col sm={12} md={12} lg={12} xl={3} className="sidebar-col">
          <Sidebar items={items} />
        </Col>

        <Col sm={12} md={12} lg={12} xl={9} className="sidebar-page">
          <h2 className="page-heading">
            <center>
              <strong>
                Details for glycan
                {glytoucan && glytoucan.glytoucan_ac && (
                  <> {glytoucan.glytoucan_ac}</>
                )}
              </strong>
            </center>
          </h2>
          <React.Fragment>
            {/* general */}
            <Container
              id="general"
              maxWidth="xl"
              className="ggContainer"
              style={{
                paddingTop: "50px",
                fontFamily: "sans-serif",
                fontSize: "16px"
              }}
            >
              <Table bordered hover5 size="lg" className="panel-width">
                <thead className="panelHeadBgr panelHeadText">
                  <tr>
                    <th>
                      <h3>General</h3>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr className="table-row">
                    <td>
                      <ul>
                        {glytoucan && glytoucan.glytoucan_ac && (
                          <>
                            <p>
                              <img
                                className="img-cartoon"
                                src={glycanImageUrl + glytoucan.glytoucan_ac}
                                alt="Cartoon"
                              />
                            </p>
                            <p>
                              <b>GlyToucan Accession: </b>
                              <Link
                                href={glytoucan.glytoucan_url}
                                target="noopener noreferrer _blank"
                              >
                                {glytoucan.glytoucan_ac}
                              </Link>
                            </p>
                            <p>
                              <b>Monoisotopic Mass: </b>
                              {mass} Da <strong>(Permethylated Mass:</strong>{" "}
                              {mass} Da)
                            </p>
                          </>
                        )}
                        {composition && (
                          <p>
                            <b>Composition</b>:{" "}
                            <CompositionDisplay composition={composition} />
                          </p>
                        )}

                        {classification && classification.length && (
                          <p>
                            <b>Glycan Type/Subtype: </b>

                            {classification.map(Formatclassification => (
                              <>
                                <Link
                                  href={Formatclassification.type.url}
                                  target="noopener noreferrer _blank"
                                >
                                  {Formatclassification.type.name}
                                </Link>
                                &nbsp;
                                <Link
                                  href={Formatclassification.subtype.url}
                                  target="noopener noreferrer _blank"
                                >
                                  {Formatclassification.subtype.name}
                                </Link>
                              </>
                            ))}
                          </p>
                        )}

                        {inchi_key && inchi_key.key && (
                          <>
                            <p>
                              <b>Inchy key: </b>
                              <Link
                                href={inchi_key.url}
                                target="noopener noreferrer _blank"
                              >
                                {inchi_key.key}
                              </Link>
                            </p>
                          </>
                        )}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
            <CssBaseline />
            {/*  species*/}
            <Container id="species" maxWidth="xl" className="ggContainer">
              <Table bordered hover5 size="lg" className="panel-width">
                <thead className="panelHeadBgr panelHeadText">
                  <tr>
                    <th>
                      <h3>Species</h3>
                    </th>
                  </tr>
                </thead>
                <div className="row">
                  <div className="col-md-12 col-xs-12">
                    {speciesEvidence &&
                      // For every species object
                      Object.keys(speciesEvidence).map(species => (
                        // For every database for current species object
                        <>
                          {/* s represents keys of evidences i.e. Species name, evidences[s] represents object of databases for that species */}
                          {species}:
                          <EvidenceList evidences={speciesEvidence[species]} />
                        </>
                      ))}
                  </div>
                </div>
              </Table>
            </Container>
            <CssBaseline />
            {/* motif */}
            <Container
              id="motif"
              maxWidth="xl"
              className="ggContainer"
              style={{ paddingTop: "50px" }}
            >
              <Table bordered hover5 size="lg" className="panel-width">
                <thead className="panelHeadBgr panelHeadText">
                  <tr>
                    <th>
                      <h3>MOTIF</h3>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr className="table-row">
                    <td>
                      <Row>
                        <Col md={6} xs={6}>
                          {motifs && (
                            <>
                              <b> Motif image:</b>
                              {motifs.map(motif => (
                                <div key={motif.id}>
                                  <img
                                    className="img-cartoon"
                                    src={glycanImageUrl + motif.id}
                                    alt="Cartoon"
                                  />
                                  <a href={motif.url}>{motif.name}</a>
                                </div>
                              ))}
                            </>
                          )}
                        </Col>
                      </Row>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
            <CssBaseline />
            {/* found glycoprotein */}
            <Container id="glycoprotein" maxWidth="xl" className="ggContainer">
              <Table bordered hover5 size="lg" className="panel-width">
                <thead className="panelHeadBgr panelHeadText">
                  <tr>
                    <th>
                      <h3>Found Glycoprotien</h3>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr className="table-row makeStyles-tableHeader-232">
                    <td>
                      {glycoprotein && glycoprotein.length !== 0 && (
                        <ClientPaginatedTable
                          data={glycoprotein}
                          columns={glycoProtienColumns}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
            <CssBaseline />
            {/* biosynthetic enzyme */}
            <Container
              id="biosyntheticenzymes"
              maxWidth="xl"
              className="ggContainer"
            >
              <Table bordered hover5 size="lg" className="panel-width">
                <thead className="panelHeadBgr panelHeadText">
                  <tr>
                    <th>
                      <h3>Biosynthetic enzyme</h3>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr className="table-row">
                    <td>
                      {enzyme && enzyme.length !== 0 && (
                        <ClientPaginatedTable
                          data={enzyme}
                          columns={bioEnzymeColumns}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
            <CssBaseline />

            {/* digital seq */}
            <Container
              id="Dseqence"
              maxWidth="xl"
              className="ggContainer"
              style={{ paddingTop: "50px" }}
            >
              <Table bordered hover5 size="lg" className="panel-width">
                <thead className="panelHeadBgr panelHeadText">
                  <tr>
                    <th>
                      <h3>Digital Seq</h3>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr
                    className="table-row"
                    style={{ whiteSpace: "pre-line!important" }}
                  >
                    <td>
                      <strong>IUPAC</strong>
                      <pre
                        className="text-overflow"
                        style={{ whiteSpace: "pre-line!important" }}
                      >
                        {iupac}>
                      </pre>
                      <strong>WURCS</strong>
                      <pre className="text-overflow">{wurcs}</pre>
                      <strong>GlycoCT</strong>
                      <pre>{glycoct}</pre>
                      <strong>InChI</strong>
                      <pre className="text-overflow">{inchi}</pre>
                      <strong>GLYCAM IUPAC</strong>
                      <pre className="text-overflow">{glycam}</pre>
                      <strong>Isomeric SMILES</strong>
                      <pre className="text-overflow">{smiles_isomeric}</pre>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
            <CssBaseline />

            {/* crossref */}
            <Container
              id="crossref"
              maxWidth="xl"
              className="ggContainer"
              style={{ paddingTop: "50px" }}
            >
              <Table bordered hover5 size="lg" className="panel-width">
                <thead className="panelHeadBgr panelHeadText">
                  <tr>
                    <th>
                      <h3>crossref</h3>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr className="table-row">
                    <td>
                      {itemsCrossRef ? (
                        <ul>
                          {itemsCrossRef.map(crossRef => (
                            <li class="list-group2">
                              <strong>{crossRef.database}:</strong>
                              <ul>
                                {crossRef.links.map(link => (
                                  <li class="list-group-indent">
                                    <a
                                      class="panelcontent"
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {link.id}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No data available.</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Container>
            <CssBaseline />

            {/* publication */}
            <Container maxWidth="xl" className="ggContainer">
              <Table bordered hover5 size="lg" className="panel-width">
                <thead className="panelHeadBgr panelHeadText">
                  <tr>
                    <th>
                      <h3>Publication</h3>
                    </th>
                  </tr>
                </thead>

                <div className="row">
                  <div className="col-md-12 col-xs-12">
                    {publicationEvidence &&
                      // For every species object
                      Object.keys(publicationEvidence).map(pmid => (
                        // For every database for current species object
                        <>
                          {/* {publicationEvidence[pmid].title} */}
                          {/* {publicationEvidence[pmid].journal}
                          {publicationEvidence[pmid].date}
                          {publicationEvidence[pmid].authors} */}
                          {/* s represents keys of evidences i.e. Species name, evidences[s] represents object of databases for that species */}
                          <i className="fas fa-book"></i>
                          {pmid}

                          <EvidenceList evidences={publicationEvidence[pmid]} />
                        </>
                      ))}
                  </div>
                </div>
              </Table>
            </Container>
            <CssBaseline />
          </React.Fragment>
        </Col>
      </Row>
    </>
  );
};

export default GlycanDetail;

import React, { useState, useEffect } from "react";
import { getGlycanDetail } from "../data/glycan";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import GlygenBadge from "../components/GlygenBadge";
import { NavLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import { Navbar } from "react-bootstrap";
import { groupEvidences, groupSpeciesEvidences } from "../data/data-format";
import EvidenceList from "../components/EvidenceList";
import PaginatedTable from "../components/PaginatedTable";
import ClientPaginatedTable from "../components/ClientPaginatedTable";
import "../css/detail.css";

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
    classification,
    glycoprotein,
    glycoct,
    wurcs
  } = detailData;

  const speciesEvidence = groupSpeciesEvidences(species);

  const glycanImageUrl = "https://api.glygen.org/glycan/image/";

  const glycoProtienColumns = [
    {
      dataField: "uniprot_canonical_ac",
      text: "protein ID",
      sort: true,

      headerStyle: (column, colIndex) => {
        return { backgroundColor: "#4B85B6", color: "white" };
      }
      // formatter: (value, row) => (
      //   <Navbar.Text
      //     as={NavLink}
      //     to={`/glycan-list/${row.uniprot_canonical_ac}`}
      //   >
      //     {row.glytoucan_ac}
      //   </Navbar.Text>
      // )
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

  return (
    <React.Fragment>
      <Container
        maxWidth="xl"
        className="ggContainer"
        style={{ paddingTop: "50px" }}
      >
        <pre>{JSON.stringify(itemsCrossRef)}</pre>

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
                        <b>GlyToucan Accession:</b>
                        <Link
                          href={glytoucan.glytoucan_url}
                          target="noopener noreferrer _blank"
                        >
                          {glytoucan.glytoucan_ac}
                        </Link>
                      </p>
                      <p>
                        <b>Monoisotopic Mass:</b>
                        {mass}
                        (Permethylated Mass: {mass})
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
                      <b>Glycan Type/Subtype:</b>

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
                        <b>Inchy key:</b>
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

      <Container maxWidth="xl" className="ggContainer">
        <Table bordered hover5 size="lg" className="panel-width">
          <thead className="panelHeadBgr panelHeadText">
            <tr>
              <th>
                <h3>Found Glycoprotien</h3>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr className="table-row">
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

      <Container maxWidth="xl" className="ggContainer">
        <Table bordered hover5 size="lg" className="panel-width">
          <thead className="panelHeadBgr panelHeadText">
            <tr>
              <th>
                <h3>Species</h3>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr className="table-row">
              <td>
                <span>
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
                </span>
                {/* <EvidenceList evidences={speciesEvidence} /> */}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <CssBaseline />

      <Container
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
                <ul>
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
                          <a href={""}>{motif.name}</a>
                        </div>
                      ))}
                    </>
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <CssBaseline />
      <Container
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
            <tr className="table-row">
              <td>
                <span className="PanelContainHeading">
                  <strong>IUPAC</strong>
                </span>

                <pre className="text-overflow">{iupac}</pre>

                <strong>WURCS</strong>
                <pre className="text-overflow">{wurcs}</pre>
                <strong>GlycoCT</strong>
                <pre className="">{glycoct}</pre>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <CssBaseline />

      <Container
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
    </React.Fragment>
  );
};

export default GlycanDetail;

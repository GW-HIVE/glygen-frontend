import React, { useState, useEffect } from "react";
import { getGlycanDetail } from "../data/glycan";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import GlygenBadge from "../components/GlygenBadge";
import { Link } from "@material-ui/core";
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
const GlycanDetail = props => {
  let { id } = useParams();

  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const getGlycanDetailData = getGlycanDetail(id);

    getGlycanDetailData.then(({ data }) => {
      if (data.code) {
        console.log(data.code);
        // displayErrorByCode(data.code);
        // activityTracker("error", id, "error code: " + data.code + " (page: " + page + ", sort: " + sort + ", dir: " + dir + ", limit: " + limit + ")");
      } else {
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

  if (detailData.composition) {
    var mapComp = { hex: 1, hexnac: 2, dhex: 3, neuac: 4, neugc: 5, other: 7 };

    detailData.composition = detailData.composition.sort(function(a, b) {
      var resVal1 = mapComp[a.residue.toLowerCase()];
      var resVal2 = mapComp[b.residue.toLowerCase()];

      if (!resVal1) resVal1 = 6;

      if (!resVal2) resVal2 = 6;

      return resVal1 - resVal2;
    });

    // Replacing residue names with the ones to be displayed.
    for (var i = 0; i < detailData.composition.length; i++) {
      if (detailData.composition[i].residue == "hex") {
        detailData.composition[i].residue = "Hex";
      } else if (detailData.composition[i].residue == "hexnac") {
        detailData.composition[i].residue = "HexNAc";
      } else if (detailData.composition[i].residue == "dhex") {
        detailData.composition[i].residue = "dHex";
      } else if (detailData.composition[i].residue == "neuac") {
        detailData.composition[i].residue = "NeuAc";
      } else if (detailData.composition[i].residue == "neugc") {
        detailData.composition[i].residue = "NeuGc";
      } else if (detailData.composition[i].residue == "other") {
        detailData.composition[i].residue = "(+x other residues)";
      }
    }
  }
  const { mass, glytoucan, species, composition } = detailData;
  const evidences = groupEvidencesInSpecies(species);
  const glycanImageUrl = "https://api.glygen.org/glycan/image/";

  const formatComposition = composition => {
    const compositionNames = composition.map(item => item.name);
    return compositionNames;
  };

  function groupEvidencesInSpecies(species) {
    var groupedEvidences = {};

    if (!species) {
      return groupedEvidences;
    }

    for (const s of species) {
      groupedEvidences[s.name] = {};
      for (const e of s.evidence) {
        if (e.database in groupedEvidences[s.name]) {
          groupedEvidences[s.name][e.database].push({
            id: e.id,
            url: e.url
          });
        } else {
          groupedEvidences[s.name][e.database] = [
            {
              id: e.id,
              url: e.url
            }
          ];
        }
      }
    }
    return groupedEvidences;
  }

  return (
    <React.Fragment>
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
                        <b> GlyToucan image:</b>
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
                        (Permethylated Mass:{mass})
                      </p>
                    </>
                  )}
                  {composition && (
                    <p>
                      <b>Composition</b>:{formatComposition(composition)}
                      <sub>{composition.count}</sub>
                    </p>
                  )}
                  {/* {classification &&
                      classification.type &&
                      classification.subtype(
                        <p>
                          <b>Glycan Type/Subtype:</b>
                          <Link
                            href={classification.type.url}
                            target="noopener noreferrer _blank"
                          >
                            {classification.type.name}
                          </Link>
                          <Link
                            href={classification.subtype.url}
                            target="noopener noreferrer _blank"
                          >
                            {classification.subtype.name}
                          </Link>
                        </p>
                      )} */}
                </ul>
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

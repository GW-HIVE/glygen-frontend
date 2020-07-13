import React, { useState, useEffect, useRef, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getProteinDetail } from "../data/protein";
import ProtvistaSidebar from "../components/navigation/ProtvistaSidebar";
import "d3";
import ProtvistaManager from "protvista-manager";
import ProtvistaTooltip from "protvista-tooltip";
import ProtvistaNavigation from "protvista-navigation";
import ProtvistaSequence from "protvista-sequence";
import ProtvistaTrack from "protvista-track";
import routeConstants from "../data/json/routeConstants";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { Link } from "@material-ui/core";
import "../css/protvista.css";
import FeedbackWidget from "../components/FeedbackWidget";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import { axiosError } from "../data/axiosError";
window.customElements.define("protvista-manager", ProtvistaManager);
window.customElements.define("protvista-navigation", ProtvistaNavigation);
window.customElements.define("protvista-sequence", ProtvistaSequence);
window.customElements.define("protvista-track", ProtvistaTrack);
window.customElements.define("protvista-tooltip", ProtvistaTooltip);

const ProtVista = () => {
  let { id, Protvistadisplay } = useParams();

  const [data, setData] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );

  function setupProtvista(data) {
    var glycos = [
      {
        type: "N-Linked-With-Image",
        residues: [],
        color: "red",
        shape: "circle"
      },
      {
        type: "N-Linked-No-Image",
        residues: [],
        color: "red",
        shape: "triangle"
      },
      {
        type: "O-Linked-With-Image",
        residues: [],
        color: "blue",
        shape: "circle"
      },
      {
        type: "O-Linked-No-Image",
        residues: [],
        color: "blue",
        shape: "triangle"
      },
      {
        type: "Annotations",
        residues: [],
        color: "orange",
        shape: "square"
      }
    ];

    var mutations = {
      type: "Mutations",
      residues: [],
      color: "green",
      shape: "diamond"
    };
    for (let glyco of data.glycosylation) {
      // $.each(data.glycosylation, function (i, glyco) {
      if (glyco.type === "N-linked") {
        if (glyco.glytoucan_ac) {
          glycos[0].residues.push({
            start: glyco.position,
            end: glyco.position,
            color: glycos[0].color,
            shape: glycos[0].shape,
            accession: data.uniprot.uniprot_canonical_ac,
            type: glyco.residue,
            tooltipContent: "Test"
            // "<img src='https://api.glygen.org/glycan/image/" +
            // glyco.glytoucan_ac +
            // "' /><br/></br>"
          });
        } else {
          glycos[1].residues.push({
            start: glyco.position,
            end: glyco.position,
            color: glycos[1].color,
            shape: glycos[1].shape,
            accession: data.uniprot.uniprot_canonical_ac,
            type: glyco.residue,
            tooltipContent:
              "<span className=marker>Glycosylation site without reported glycan at " +
              glyco.position +
              "," +
              " Click to see site details. </span>"
          });
        }
      } else if (glyco.type === "O-linked") {
        if (glyco.glytoucan_ac) {
          glycos[2].residues.push({
            start: glyco.position,
            end: glyco.position,
            color: glycos[2].color,
            shape: glycos[2].shape,
            accession: data.uniprot.uniprot_canonical_ac,
            type: glyco.residue
            // tooltipContent:
            //   "<img src='https://api.glygen.org/glycan/image/" +
            //   glyco.glytoucan_ac +
            //   "' /><br/><br/><span className=marker>Click marker show more</span>"
          });
        } else {
          glycos[3].residues.push({
            start: glyco.position,
            end: glyco.position,
            color: glycos[3].color,
            shape: glycos[3].shape,
            accession: data.uniprot.uniprot_canonical_ac,
            type: glyco.residue,
            tooltipContent:
              "<span className=marker>Glycosylation site without reported glycan at " +
              glyco.position +
              "," +
              " Click to see site details. </span>"
          });
        }
      }
    } //);

    for (let mutation of data.mutation) {
      // $.each(data.mutation, function (i, mutation) {
      mutations.residues.push({
        start: mutation.start_pos,
        end: mutation.end_pos,
        color: mutations.color,
        shape: mutations.shape,
        accession: data.uniprot.uniprot_canonical_ac,
        type: "(" + mutation.sequence_org + " → " + mutation.sequence_mut + ")",
        tooltipContent:
          "<span className=marker> annotation " +
          mutation.annotation +
          "</span>"
      });
    } //);

    for (let site_annotation of data.site_annotation) {
      // $.each(data.site_annotation, function (i, site_annotation) {
      glycos[4].residues.push({
        start: site_annotation.start_pos,
        end: site_annotation.end_pos,
        color: glycos[4].color,
        shape: glycos[4].shape,
        accession: data.uniprot.uniprot_canonical_ac,
        type: "N-Glycan-Sequon"
        // tooltipContent:
        //   "<span className=marker>" + site_annotation.annotation + "</span>"
      });
    } //);

    // tO CHECK MULTILE GLYCOSYLATION AT SAME POINT
    let glycosCombined = [];

    for (let i in glycos) {
      // $.each(glycos, function (i, v) {
      var combinedResiduesMap = {};
      for (let v of glycos[i].residues) {
        // $.each(glycos[i].residues, function (i, v) {
        if (!combinedResiduesMap[v.start + ":" + v.end]) {
          v["count"] = 1;
          combinedResiduesMap[v.start + ":" + v.end] = v;
        } else {
          combinedResiduesMap[v.start + ":" + v.end].count += 1;
        }
      } //);
      glycosCombined.push(
        Object.values(combinedResiduesMap).map(function(v) {
          v["tooltipContent"] +=
            v["count"] > 1
              ? "<span className=marker>Click marker to show " +
                (v["count"] - 1) +
                " more at this site</span>"
              : "";
          return v;
        })
      );
    }

    return {
      nGlycanWithImage: glycosCombined[0],
      nGlycanWithoutImage: glycosCombined[1],
      oGlycanWithImage: glycosCombined[2],
      oGlycanWithoutImage: glycosCombined[3],
      nSequon: glycosCombined[4],
      mutationsData: mutations
    };
  }

  const [expanded, setExpanded] = useState(false);
  const [highlighted, setHighlighted] = useState(null);

  const nGlycanWithImage = useRef(null);
  const nGlycanWithoutImage = useRef(null);
  const oGlycanWithImage = useRef(null);
  const oGlycanWithoutImage = useRef(null);
  const nSequon = useRef(null);
  const mutationsData = useRef(null);
  const allTrack = useRef(null);

  useEffect(() => {
    setPageLoading(true);
    logActivity("user", id);
    const getData = getProteinDetail(id, Protvistadisplay);
    getData.then(({ data }) => {
      if (data.code) {
        let message = "Protvista Detail api call";
        logActivity("user", id, "No results. " + message);
        setPageLoading(false);
      } else {
        setData(data);
        setPageLoading(false);
        let formattedData = setupProtvista(data);
        if (nGlycanWithImage.current) {
          nGlycanWithImage.current.data = formattedData.nGlycanWithImage;
        }
        if (nGlycanWithoutImage.current) {
          nGlycanWithoutImage.current.data = formattedData.nGlycanWithoutImage;
        }
        if (oGlycanWithImage.current) {
          oGlycanWithImage.current.data = formattedData.oGlycanWithImage;
        }
        if (oGlycanWithoutImage.current) {
          oGlycanWithoutImage.current.data = formattedData.oGlycanWithoutImage;
        }
        if (nSequon.current) {
          nSequon.current.data = formattedData.nSequon;
        }

        if (allTrack && allTrack.current) {
          allTrack.current.data = [
            ...formattedData.nGlycanWithImage,
            ...formattedData.nGlycanWithoutImage,
            ...formattedData.oGlycanWithImage,
            ...formattedData.oGlycanWithoutImage,
            ...formattedData.nSequon
          ];
        }
        if (mutationsData.current) {
          mutationsData.current.data = formattedData.mutationsData.residues;
        }
      }
    });

    getData.catch(({ response }) => {
      let message = "motif  api call";
      axiosError(response, id, message, setPageLoading, setAlertDialogInput);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="ProtContainer">
      {/* Back to details button */}
      <Link href={`${routeConstants.proteinDetail}${id}`}>
        <Button
          type="button"
          style={{ marginLeft: "5px" }}
          className="gg-btn-blue"
        >
          Back To details
        </Button>
      </Link>
      <Row>
        <>
          <Col xs="3">
            <ProtvistaSidebar
              expanded={expanded}
              handleExpand={() => setExpanded(!expanded)}
            />
          </Col>
        </>

        <FeedbackWidget />
        <PageLoader pageLoading={pageLoading} />

        <DialogAlert
          alertInput={alertDialogInput}
          setOpen={input => {
            setAlertDialogInput({ show: input });
          }}
        />

        <Col xs="9" className="maincontent">
          {data && data.sequence && data.sequence.length && (
            <protvista-manager
              attributes="length displaystart displayend highlightstart highlightend variantfilters"
              id="manager"
            >
              <protvista-navigation
                class={`nav-track glycotrack`}
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
              />

              <protvista-sequence
                id="seq1"
                class="nav-track"
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
                sequence={data.sequence.sequence}
              />

              {/* Blank Track */}
              <protvista-track
                class={
                  `nav-track glycotrack emptytrack` +
                  (expanded ? "" : " hidden")
                }
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
                layout="non-overlapping"
              />
              <protvista-track
                class={
                  `nav-track nav-combinetrack hover-style glycotrack1` +
                  (expanded ? " hidden" : "")
                }
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
                layout="non-overlapping"
                ref={allTrack}
              />

              <protvista-track
                class={
                  `nav-track glycotrack ` +
                  (expanded ? "" : " hidden") +
                  (highlighted === "Ntrack_withImage" ? " highlight" : "")
                }
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
                layout="non-overlapping"
                ref={nGlycanWithImage}
              />
              <protvista-track
                class={
                  `nav-track glycotrack ` +
                  (expanded ? "" : " hidden") +
                  (highlighted === "Ntrack_withoutImage" ? " highlight" : "")
                }
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
                layout="non-overlapping"
                ref={nGlycanWithoutImage}
              />
              <protvista-track
                class={
                  `nav-track glycotrack` +
                  (expanded ? "" : " hidden") +
                  (highlighted === "Otrack_withImage" ? " highlight" : "")
                }
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
                layout="non-overlapping"
                ref={oGlycanWithImage}
              />

              <protvista-track
                class={
                  `nav-track glycotrack` +
                  (expanded ? "" : " hidden") +
                  (highlighted === "Otrack_withoutImage" ? " highlight" : "")
                }
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
                layout="non-overlapping"
                ref={oGlycanWithoutImage}
              />
              <protvista-track
                class={
                  `nav-track glycotrack` +
                  (expanded ? "" : " hidden") +
                  (highlighted === "SEQUON" ? " highlight" : "")
                }
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
                layout="non-overlapping"
                ref={nSequon}
              />

              <protvista-track
                class={
                  `nav-track glycotrack` +
                  (highlighted === "mutation" ? " highlight" : "")
                }
                length={data.sequence.length}
                displaystart={1}
                displayend={data.sequence.length}
                layout="non-overlapping"
                ref={mutationsData}
              />
            </protvista-manager>
          )}
        </Col>
      </Row>
      <div class="main-content">
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <ol class="legendlist">
              <li>
                <span
                  class="super1 hover"
                  onMouseEnter={() => setHighlighted("Ntrack_withImage")}
                >
                  &#9679;
                  <span class="superx">
                    <>N-Glycan</>
                  </span>
                </span>
              </li>
              <li>
                <span
                  class="super2 hover"
                  onMouseEnter={() => setHighlighted("Ntrack_withoutImage")}
                >
                  &#9650;
                  <span class="superx">
                    <>N-Glycan-Site</>
                  </span>
                </span>
              </li>
              <li>
                <span
                  class="super3 hover"
                  onMouseEnter={() => setHighlighted("Otrack_withImage")}
                >
                  &#9679;
                  <span class="superx">
                    <>O-Glycan</>
                  </span>
                </span>
              </li>
              <li>
                <span
                  class="super4 hover"
                  onMouseEnter={() => setHighlighted("Otrack_withoutImage")}
                >
                  &#9650;
                  <span class="superx">
                    <>O-Glycan-Site</>
                  </span>
                </span>
              </li>
              <li>
                <span
                  class="super6 hover"
                  onMouseEnter={() => setHighlighted("SEQUON")}
                >
                  &#9646;
                  <span class="superx">
                    <>N-Glycan-Sequon</>
                  </span>
                </span>
              </li>
              <li>
                <span
                  class="super5 hover"
                  onMouseEnter={() => setHighlighted("mutation")}
                >
                  &#9670;
                  <span class="superx">
                    <>Mutation</>
                  </span>
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtVista;

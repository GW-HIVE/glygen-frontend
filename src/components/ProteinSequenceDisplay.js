import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import "../css/proteinsequence.css";

const SEQUENCE_ROW_RUN_LENGTH = 10;
const SEQUENCE_SPACES_BETWEEN_RUNS = 1;

// /**
//  * get glycosylation data
//  * @param {array} glycosylationData
//  * @param {string} type
//  * @return an array of highlight info.
//  */
// function getGlycosylationHighlightData(glycosylationData, type) {
//   var result = [];
//   var positions = {};
//   for (var x = 0; x < glycosylationData.length; x++) {
//     if (
//       !positions[glycosylationData[x].position] &&
//       glycosylationData[x].type === type
//     ) {
//       positions[glycosylationData[x].position] = true;
//       result.push({
//         start: glycosylationData[x].position,
//         length: 1
//       });
//     }
//   }
//   return result;
// }

/**
 * Getting mutation data
 * @param {array} mutationData
 * @return an array of highlight info.
 */
function getMutationHighlightData(mutationData) {
  var result = [];
  if (mutationData && mutationData.length) {
    var positions = {};
    for (var x = 0; x < mutationData.length; x++) {
      if (!positions[mutationData[x].start_pos]) {
        positions[mutationData[x].start_pos] = true;
        result.push({
          start: mutationData[x].start_pos,
          length: mutationData[x].end_pos - mutationData[x].start_pos + 1
        });
      }
    }
  }
  return result;
}

/**
 * Getting sequon data
 * @param {array} sequonData
 * @return an array of highlight info.
 */
function getSequonHighlightData(sequonData) {
  var result = [];
  var positions = {};
  for (var x = 0; x < sequonData.length; x++) {
    if (!positions[sequonData[x].start_pos]) {
      positions[sequonData[x].start_pos] = true;
      result.push({
        start: sequonData[x].start_pos,
        length: sequonData[x].end_pos - sequonData[x].start_pos + 1
      });
    }
  }
  return result;
}
/**
 * checking is highlighted or not
 * @param {number} position
 * @param {array} selection
 * @return:boolean if position in the ranges
 */
function isHighlighted(position, selection) {
  var result = false;
  if (selection) {
    for (var x = 0; x < selection.length; x++) {
      var start = selection[x].start;
      var end = selection[x].start + selection[x].length - 1;

      if (start <= position && position <= end) {
        result = true;
        break;
      }
    }
    return result;
  }
  return false;
}

/**
 * building highlight
 * @param {string} sequence
 * @param {object} highlightData:
 * @returns an array of each charcter of the sequence and is highlighted by its each type
 */
function buildHighlightData(sequence, highlightData) {
  var result = [];
  if (sequence) {
    for (var x = 0; x < sequence.length; x++) {
      var position = x + 1;
      result.push({
        character: sequence[x],
        n_link_glycosylation: isHighlighted(
          position,
          highlightData.n_link_glycosylation
        ),
        o_link_glycosylation: isHighlighted(
          position,
          highlightData.o_link_glycosylation
        ),
        mutation: isHighlighted(position, highlightData.mutation),
        site_annotation: isHighlighted(position, highlightData.siteAnnotation)
      });
    }
    return result;
  }
  return [];
}

/**
 * building row
 * @param {array} rowData
 * @returns string of sequence
 */
function buildRowText(rowData) {
  var text = [];

  for (var x = 0; x < rowData.length; x++) {
    text.push(rowData[x].character);
  }
  return text.join("");
}

/**
 * building rowhighlight
 * @param {array} rowData
 * @param {string}type
 * @returns string of sequence
 */
const RowHighlight = ({ rowData, type, selectedHighlights }) => {
  const isSelected = selectedHighlights[type];

  if (!isSelected) {
    return <></>;
  }

  return (
    <span className="highlight-highlight" data-type={type}>
      {rowData.map(row => {
        if (row[type]) {
          return <span className="highlight-highlight-area">&nbsp;</span>;
        } else {
          return <>&nbsp;</>;
        }
      })}
    </span>
  );
};

/**
 * creating row
 * @param {number} start
 * @param {array} rowData
 * @returns jquery object of the row
 */
const HighlightRow = ({ rowData, start, selectedHighlights }) => {
  return (
    <div className="highlight-row">
      <span className="highlight-line-number">
        {("     " + (start + 1)).slice(-5) + " "}
      </span>
      <span className="highlight-section">
        <span
          className="highlight-text"
          dangerouslySetInnerHTML={{ __html: buildRowText(rowData) }}
        ></span>

        <RowHighlight
          rowData={rowData}
          type="mutation"
          selectedHighlights={selectedHighlights}
        />
        <RowHighlight
          rowData={rowData}
          type="site_annotation"
          selectedHighlights={selectedHighlights}
        />
        <RowHighlight
          rowData={rowData}
          type="n_link_glycosylation"
          selectedHighlights={selectedHighlights}
        />
        <RowHighlight
          rowData={rowData}
          type="o_link_glycosylation"
          selectedHighlights={selectedHighlights}
        />
      </span>
    </div>
  );
};

/**
 * creating UI perline
 * @param {object} highlightData
 * @param {number} perLine
 */
const HighlightUi = ({ highlightData, perLine, selectedHighlights }) => {
  const [rows, setRows] = useState([]);

  const space = "                 ";

  useEffect(() => {
    const sliceBy = (array, size) => {
      const result = [];
      for (let x = 0; x < array.length; x += size) {
        result.push(array.slice(x, x + size));
      }
      return result;
    };
    const rows = sliceBy(highlightData, perLine);
    const byChunks = rows.map(row => sliceBy(row, SEQUENCE_ROW_RUN_LENGTH));
    const reducedToRows = byChunks.map(row =>
      row.reduce(
        (all, chunk) => [
          ...all,
          ...chunk,
          {
            character: "&nbsp;",
            n_link_glycosylation: false,
            o_link_glycosylation: false,
            mutation: false,
            site_annotation: false
          }
        ],
        []
      )
    );

    setRows(reducedToRows);
  }, [highlightData, perLine]);

  return (
    <div className="highlight-display">
      <pre className="sequencePreClass">{space}+10 +20 +30 +40 +50</pre>
      <pre className="sequencePreClass">
        {space}|{space}|{space}|{space}|{space}|
      </pre>
      {rows.map((row, index) => (
        <HighlightRow
          rowData={row}
          start={index * perLine + 1}
          selectedHighlights={selectedHighlights}
        />
      ))}
    </div>
  );
};

// function createHighlightUi(highlightData, perLine) {
//   var $ui = $("");

//     var $row = createHighlightRow(x, rowData);
//     $ui.append($row);
//   }
//   document.querySelector("#sequnce_highlight").children.push($ui);
// }

// var uniprot_canonical_ac;

// /**
//  * Sequence formatting Function
//  * @param {string} sequenceString
//  * @return {string}
//  */

const HiglightSelecter = ({
  count = 0,
  selectedHighlights,
  type,
  label,
  onSelect
}) => {
  return (
    <label>
      <input
        type="checkbox"
        name="checkbox"
        id="seq_n_link"
        disabled={count < 1}
        checked={selectedHighlights[type]}
        onClick={() => onSelect(type)}
      />
      &nbsp;<span className="sequnce1">{label}</span>
      {count > 0 && <span className="badge badge-light">{count}</span>}
    </label>
  );
};

const FormattedSequence = ({ sequence }) => {
  function formatSequence(sequenceString) {
    var perLine = 60;
    var output = "";
    var seqTopIndex =
      "<pre style='border:0px; padding:0px; margin-bottom:0px; font-family:monospace; font-size: 14px;'>                +10        +20        +30        +40        +50</pre>";
    var seqTopIndexLines =
      "<pre style='border:0px; padding:0px; margin-bottom:0px; font-family:monospace;font-size: 14px;'>                 |          |          |          |          |</pre>";
    output += seqTopIndex;
    output += seqTopIndexLines;

    for (var x = 0; x < sequenceString.length; x += perLine) {
      //fix for IE 11 and lower where String.prototype.repeat() is not available
      var nSpacesBetweenRuns = "";
      for (var i = 0; i < SEQUENCE_SPACES_BETWEEN_RUNS; i++) {
        nSpacesBetweenRuns += " ";
      }
      var y = adjustSequenceRuns(sequenceString.substr(x, perLine)).join(
        nSpacesBetweenRuns
      );
      // var y = adjustSequenceRuns(sequenceString.substr(x, perLine)).join(' '.repeat(SEQUENCE_SPACES_BETWEEN_RUNS));
      output +=
        '<span className="non-selection">' +
        ("     " + (x + 1)).slice(-5) +
        " </span>" +
        y +
        "\n";
    }
    return output;
  }

  const resultHtml = formatSequence(sequence);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: resultHtml }}></div>
    </>
  );
};

// /**
//  * Adjusts a sequence array by splitting it into multiple arrays of max length defined by the constant SEQUENCE_ROW_RUN_LENGTH
//  * @author Sanath Bhat
//  * @since Nov 15, 2018.
//  */

function adjustSequenceRuns(sequence) {
  var y_arr = [];
  for (var i = 0; i < sequence.length; i += SEQUENCE_ROW_RUN_LENGTH) {
    y_arr.push(sequence.slice(i, i + SEQUENCE_ROW_RUN_LENGTH));
  }
  return y_arr;
}

// /**
//  * to check checkbox selected not selected
//  * @param {string} type
//  */
// function checkUncheck(type, element) {
//   var $elements = document.querySelectorAll('.highlight-highlight[data-type="' + type + '"]');

//   if (element.checked) {
//     $elements.show();
//   } else {
//     $elements.hide();
//   }
// }

const ProteinSequenceDisplay = ({
  sequenceObject,
  glycosylation = [],
  mutation,
  siteAnnotation
}) => {
  const [mutationHighlight, setMutationHighlight] = useState([]);
  const [nLinkGlycan, setNLinkGlycan] = useState([]);
  const [oLinkGlycan, setOLinkGlycan] = useState([]);
  const [sequenceData, setSequenceData] = useState([]);
  const [selectedHighlights, setSelectedHighlights] = useState({
    mutation: false,
    site_annotation: false,
    n_link_glycosylation: false,
    o_link_glycosylation: false
  });
  const perLine = window.innerWidth <= 500 ? 10 : 60;

  //   if (!sequence) {
  //     return <p>No Data Available.</p>;
  //   }

  useEffect(() => {
    const nLink = glycosylation.filter(item => item.type === "N-linked");
    const oLink = glycosylation.filter(item => item.type === "O-linked");

    setNLinkGlycan(nLink);
    setOLinkGlycan(oLink);
  }, [glycosylation]);

  useEffect(() => {
    setMutationHighlight(getMutationHighlightData(mutation));
  }, [mutation]);

  useEffect(() => {
    const highlight = {};

    if (mutation) {
      // Get data for sequence highlight
      highlight.mutation = getMutationHighlightData(mutation);
    }

    if (siteAnnotation) {
      highlight.site_annotation = getSequonHighlightData(siteAnnotation);
    }

    if (sequenceObject && sequenceObject.sequence) {
      setSequenceData(buildHighlightData(sequenceObject.sequence, highlight));
    }
  }, [sequenceObject, mutation, siteAnnotation]);

  const handleSelectHighlight = type => {
    setSelectedHighlights({
      ...selectedHighlights,
      [type]: !selectedHighlights[type]
    });
  };

  return (
    <Grid container>
      <Grid item xs={9} id="sequnce_highlight">
        <div className="highlight-display">
          {sequenceObject && (
            <HighlightUi
              highlightData={sequenceData}
              perLine={perLine}
              selectedHighlights={selectedHighlights}
            />
          )}
        </div>
        {/* <pre>{JSON.stringify(sequenceData, null, 2)}</pre> */}
      </Grid>
      <Grid item xs={3}>
        {/* <pre>{JSON.stringify(selectedHighlights)}</pre> */}
        <ul className="highlight-panel-categories">
          <li>
            <HiglightSelecter
              count={nLinkGlycan ? nLinkGlycan.length + 1 : 0}
              selectedHighlights={selectedHighlights}
              type="n_link_glycosylation"
              label="N-linked Sites"
              onSelect={handleSelectHighlight}
            />
            {/* <label>
              <input
                type="checkbox"
                name="checkbox"
                id="seq_n_link"
                disabled={nLinkGlycan.length === 0}
                checked={selectedHighlights.n_link_glycosylation}
                onClick={() => handleSelectHighlight("n_link_glycosylation")}
              />
              &nbsp;<span className="sequnce1">N-linked Sites</span>
              {nLinkGlycan && (
                <span className="badge badge-light">
                  {nLinkGlycan.length + 1}
                </span>
              )}
            </label> */}
          </li>
          <li>
            <HiglightSelecter
              count={oLinkGlycan ? oLinkGlycan.length + 1 : 0}
              selectedHighlights={selectedHighlights}
              type="o_link_glycosylation"
              label="O-linked Sites"
              onSelect={handleSelectHighlight}
            />
          </li>
          <li>
            <HiglightSelecter
              count={mutation ? mutation.length + 1 : 0}
              selectedHighlights={selectedHighlights}
              type="mutation"
              label="Mutations"
              onSelect={handleSelectHighlight}
            />
          </li>
          <li>
            <HiglightSelecter
              count={siteAnnotation ? siteAnnotation.length + 1 : 0}
              selectedHighlights={selectedHighlights}
              type="site_annotation"
              label="Site annotations"
              onSelect={handleSelectHighlight}
            />
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default ProteinSequenceDisplay;

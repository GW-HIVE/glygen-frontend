import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/proteinsequence.css";

const SEQUENCE_ROW_RUN_LENGTH = 10;

/**
 * building row
 * @param {array} rowData
 * @returns string of sequence
 */
function buildRowText(rowData) {
  var text = [];
  var len = rowData.length;

  if (len > 0 && rowData[rowData.length-1] && rowData[rowData.length-1].character === "&nbsp;"){
    len = rowData.length - 1;
  }

  for (var x = 0; x < len; x++) {
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
      {rowData.map((row) => {
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
const SequenceRow = ({ uniprot_id, uniprot_ac, clickThruUrl, rowData, start, selectedHighlights, multiSequence, tax_name, consensus, header }) => {
  
  const space = "           ";
  const space1 = "       ";
  const space2 = "          ";

  
  return (
    <div className="highlight-row aln-line sequncealign">

      {header && <>    
        {multiSequence && <>
          <span></span>
          <span></span>
        </>}
      
        {start === 0 && <>
          <span></span>
          <span><pre className="sequencePreClass">
          {space}+10{space1} +20{space1} +30{space1} +40 {space1}+50
          </pre></span> </>}

          {start === 1 && <>
          <span></span>
          <span>
          <pre className="sequencePreClass">
          {space}|{space2}|{space2}|{space2}|{space2}|
          </pre> </span></>}

        {multiSequence && <>
            <span></span>
          </>}
        
      </>}
      
      {!header && <>
        {multiSequence && <span className="aln-line-header"><Link to={clickThruUrl}>{uniprot_ac}</Link></span>}
        {multiSequence && <span className="aln-line-header">{uniprot_id}</span>}
        <span className="highlight-line-number aln-line-header">{(start === -1 ? ("  ") : (start + 1))}</span>

        <span className="highlight-section">
          <span
            className="highlight-text"
            dangerouslySetInnerHTML={{ __html: buildRowText(rowData) }}
          ></span>

          {selectedHighlights && (
            <>
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
              <RowHighlight
                rowData={rowData}
                type="phosphorylation"
                selectedHighlights={selectedHighlights}
              />
              <RowHighlight
                rowData={rowData}
                type="glycation"
                selectedHighlights={selectedHighlights}
              />
              <RowHighlight
                rowData={rowData}
                type="text_search"
                selectedHighlights={selectedHighlights}
              />
            </>
          )}
        </span>
        {multiSequence && <span className="highlight-line-number aln-line-header">{(start === -1 ? ('\xa0') : (start + 60))}</span>}
      </>}
    </div>
  );
};
const sliceBy = (array, size) => {
  const result = [];
  for (let x = 0; x < array.length; x += size) {
    result.push(array.slice(x, x + size));
  }
  return result;
};

const sliceRowBlock = (sequence, size) => {
  var sequenceBlocks = [];
  let sequenceObject = {}

  if (sequence.consensus !== undefined) {
   sequenceObject = {
    consensus: "",
    sequences: [sequence]
  }
} else {
  sequenceObject = {
    consensus: "",
    sequences: sequence.map(function (aln) {
      return aln;
    })
  }
}

  var maxSequenceLength = findMaxSequenceLength(sequenceObject);
  const result = [];
  for (let x = 0; x < maxSequenceLength; x += size) {
    for (let y = 0; y < sequenceObject.sequences.length; y++) {

      if (sequenceObject.sequences[y].consensus) {
        result.push({consensus : sequenceObject.sequences[y].consensus, clickThruUrl : "", uniprot_id : "", uniprot_ac: "", index : -1, seq : sequenceObject.sequences[y].seq.slice(x, x + size)});
      } else {
        result.push({consensus : sequenceObject.sequences[y].consensus, uniprot_id : sequenceObject.sequences[y].uniprot_id, 
          uniprot_ac: sequenceObject.sequences[y].uniprot_ac, clickThruUrl : sequenceObject.sequences[y].clickThruUrl, index : x, tax_name : sequenceObject.sequences[y].tax_name,
          seq : sequenceObject.sequences[y].seq.slice(x, x + size)});
      }
    }

    if (sequenceObject.sequences.length > 1)
      result.push({consensus : false, uniprot_id : "", uniprot_ac: "", index : -1, seq : []});
  }
  return result;
};

// finds the max length of all sequences or consensus
function findMaxSequenceLength(sequenceObject) {
  // get length of consensus
  var alignmentLength = sequenceObject.consensus.length;
  // get length of all sequences
  var sequenceLengths = sequenceObject.sequences.map(function (aln) {
     return aln.seq.length;
  });
  // sort aln length, from smallest to largest
  sequenceLengths.sort();
  // get the largest aln length
  var maxSequenceLength = sequenceLengths[sequenceLengths.length - 1];
  //   var uniprot_canonical_ac = getParameterByName("uniprot_canonical_ac");
  //log if consensus not equal to the longest sequence
  // activityTracker("error", uniprot_canonical_ac, "Longest seq length=" + maxSequenceLength + ", Consensus length=" + alignmentLength);
  // return whichever is larger
  return Math.max(alignmentLength, maxSequenceLength);
}

/**
 * creating UI perline
 * @param {object} sequenceData
 * @param {object} selectedHighlights
 */
const SequenceDataDisplay = ({ sequenceData, selectedHighlights, multiSequence }) => {
  const [rows, setRows] = useState([]);
  const perLine = window.innerWidth <= 500 ? 10 : 60;

  const space = "             ";
  const space1 = "       ";
  const space2 = "          ";

  useEffect(() => {
    if (sequenceData ) {
      const rows = sliceRowBlock(sequenceData, perLine);
      const byChunks = rows.map((row) => {return {uniprot_id : row.uniprot_id, uniprot_ac : row.uniprot_ac, 
        index: row.index, seq: sliceBy(row.seq, SEQUENCE_ROW_RUN_LENGTH),
        tax_name: row.tax_name, consensus : row.consensus, clickThruUrl: row.clickThruUrl}});
      const reducedToRows = byChunks.map((row) =>
       {return {
        index : row.index, 
        uniprot_id : row.uniprot_id,
        uniprot_ac : row.uniprot_ac,
        tax_name : row.tax_name,
        consensus : row.consensus,
        clickThruUrl : row.clickThruUrl,
        seq: row.seq.reduce(
          (all, chunk) => [
            ...all,
            ...chunk,
            {
              character: "&nbsp;",
              n_link_glycosylation: false,
              o_link_glycosylation: false,
              mutation: false,
              site_annotation: false,
              phosphorylation: false,
              glycation: false,
            },
          ],
          []
        )
       }}
      );
      setRows(reducedToRows);
    }
  }, [sequenceData, perLine]);

  return (
      <div className="aln-block">
      <SequenceRow
          header={true}
          multiSequence={multiSequence}
          start={0}
      />
        <SequenceRow
          header={true}
          multiSequence={multiSequence}
          start={1}
      />
      {rows.map((row, index) => (
        <>
        <SequenceRow
          key={index}
          header={false}
          multiSequence={multiSequence}
          consensus={row.consensus}
          uniprot_id={row.uniprot_id}
          uniprot_ac={row.uniprot_ac}
          clickThruUrl={row.clickThruUrl}
          tax_name={row.tax_name}
          rowData={row.seq}
          start={row.index}
          selectedHighlights={selectedHighlights}
        />
    </>
      ))}
      </div>
  );
};

export default SequenceDataDisplay;

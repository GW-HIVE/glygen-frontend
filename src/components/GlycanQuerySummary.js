import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getDateMMDDYYYY } from "../utils/common";

const useStyles = makeStyles(theme => ({
  panelHeading: {
    backgroundColor: "#e8e8e8",
    color: "#444"
  }
}));

const GlycanQuerySummary = props => {
  const title = "Query Summary";

  const { data } = props;

  const classes = useStyles();

  const executionTime = data.execution_time
    ? getDateMMDDYYYY(data.execution_time)
    : "";

  // var question = getParameterByName('question');
  // if (question) {
  //     queryInfo = { question: MESSAGES[question] };
  // }

  const { glytoucan_ac, mass, mass_type } = data;

  return (
    <div className="panel panel-default results-table-top">
      <div className="panel-heading">
        <center>
          <h3>{title}</h3>
        </center>
      </div>

      <center>{/* <b>{ question }</b> */}</center>
      <h6>
        <center>Performed on: {executionTime} (EST)</center>
      </h6>

      <div align="center">
        <table className="table table-hover">
          <tbody>
            {/* glycan typeahead */}
            {glytoucan_ac && (
              <tr>
                <td>Glycan Id:</td>
                <td>{glytoucan_ac}</td>
              </tr>
            )}

            {/* glycan mass */}

            {mass && mass.min && (
              <tr>
                <td>Mass:</td>
                <td>
                  {mass.min}&#8209;{mass.max}&nbsp;Da&nbsp;({mass_type})
                </td>
              </tr>
            )}

            {/*      <!--glycan sugar-->

              {#number_monosaccharides.max}
              <tr>
                  <td>No. of Sugars:</td>
                  <td>
                      {number_monosaccharides.min}-{number_monosaccharides.max}
                  </td>
              </tr>
              {/number_monosaccharides.max}

              <!--organism-->
              {#organism}
              <tr>
                  <td>Organism:</td>
                  <td>
                      {#organism.organism_list}
                          {.}
                      {/organism.organism_list}
                  </td>
              </tr>
              {/organism}

              <!--glycan type-->
              {#glycan_type}
              <tr>
                  <td>Glycan Type:</td>
                  <td>{glycan_type}</td>
              </tr>
              {/glycan_type}

              <!--glycan subtype-->
              {#glycan_subtype}
              <tr>
                  <td>Glycan SubType:</td>
                  <td>{glycan_subtype}</td>
              </tr>
              {/glycan_subtype}

              <!--protein accession-->
              {#protein_identifier}
              <tr>
                  <td>UniProtKB Accession:</td>
                  <td>{protein_identifier}</td>
              </tr>
              {/protein_identifier}
              <!--enzyme typeahead-->
              {#enzyme.id}
              <tr>
                  <td>Synthesizing Enzyme:</td>
                  <td>
                      {enzyme.id}
                  </td>
              </tr>
              {/enzyme.id}
              <!--glycanmotif typeahead-->
              {#glycan_motif}
              <tr>
                  <td>Motif:</td>
                  <td>{glycan_motif}</td>
              </tr>
              {/glycan_motif}
                <!--PMID-->
                {#pmid}
                <tr>
                    <td>PMID:</td>
                    <td>{pmid}</td>
                </tr>
                {/pmid}


              {#composition}
                  {#short_name}
                  <tr>
                      <td>{short_name}:</td>
                      <td>
                          {min} - {max}
                      </td>
                  </tr>
                  {/short_name}
              {/composition}

              {#term}
              <tr>
                  <td>Search Term:</td>
                  <td>{term}</td>
              </tr>
              {/term}
              
              {#term_category}
              <tr>
                  <td>Search Category:</td>
                  <td>{term_category}</td>
              </tr>
              {/term_category} */}
          </tbody>
        </table>
      </div>

      <div align="center">
        <button type="button" className="btn btn-primary-updateSearch">
          Update Results
        </button>
        &nbsp; &nbsp;
        <button type="button" className="btn btn-primary">
          Modify Search
        </button>
        <p className="small">
          ** To perform the same search again using the current version of the
          database, click <strong>“Update Results”</strong>.
        </p>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default GlycanQuerySummary;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getDateMMDDYYYY } from "../utils/common";
import { Col, Row } from "react-bootstrap";

const useStyles = makeStyles(theme => ({
  panelHeading: {
    backgroundColor: "#e8e8e8",
    color: "#444"
  },
  // resultsTableTop: {
  //   width: "50%",
  //   margin: "0 auto",
  //   overflow: "auto",
  //   marginBottom: "20px",
  //   marginLeft: "30px"
  // },
  resultsTableTop1: {
    marginLeft: "90% !important"
  },
  borderdark: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px;",
    paddingTop: "10px;"
  }
}));

const GlycanQuerySummary = props => {
  const title = "Glycan Search Summary";

  const { data } = props;

  // const classes = useStyles();

  const executionTime = data.execution_time
    ? getDateMMDDYYYY(data.execution_time)
    : "";
  const {
    glytoucan_ac,
    mass,
    mass_type,
    number_monosaccharides,
    // organism,
    // organism_list,
    // organism_list.id,
    // organism_list.name,
    glycan_type,
    glycan_subtype,
    protein_identifier,
    glycan_motif,
    enzyme,
    pmid
  } = data;

  return (
    // <Col md={4}>&nbsp;</Col>
    <>
      {/* <div style={{ display: "flex", justifyContent: "center", width: "50%" }}> */}
      <Col
        offset={4}
        className="block-example border border-dark borderdark"
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px;",
          paddingTop: "10px;"
        }}
      >
        {/* <div className="resultsTableTop"> */}
        <div className="panel-heading">
          <center>
            <h3>{title}</h3>
          </center>
        </div>

        <center>{/* <b>{ question }</b> */}</center>
        <h6>
          <center>Performed on: {executionTime} (EST)</center>
        </h6>
        {/* </div> */}

        <div align="center border border-dark">
          <table>
            <tbody>
              {/* glycan typeahead */}
              {glytoucan_ac && (
                <Row>
                  <Col md={6}>Glycan Id:</Col>
                  <Col md={6}>{glytoucan_ac}</Col>
                </Row>
              )}
              {/* glycan mass */}
              {mass && mass.min && (
                <Row>
                  <Col md={6}>Mass:</Col>
                  <Col md={6}>
                    {mass.min}&#8209;{mass.max}&nbsp;Da&nbsp;({mass_type})
                  </Col>
                </Row>
              )}
              {/* glycan sugar */}
              {number_monosaccharides && number_monosaccharides.min && (
                <Row>
                  <Col md={6}>Sugar:</Col>
                  <Col md={6}>
                    {number_monosaccharides.min}&#8209;
                    {number_monosaccharides.max}&nbsp;Da&nbsp;
                  </Col>
                </Row>
              )}
              {/* Oraganism */}
              {/* {organism && (
              <Row>
                <Col md={6}>Organism:</Col>
                <Col md={6}>
                  {organism_list.id}&nbsp{organism_list.name}
                </Col>
              </Row>
            )} */}
              {glycan_type && (
                <Row>
                  <Col md={6}>Glycan Type:</Col>
                  <Col md={6}>{glycan_type}</Col>
                </Row>
              )}
              {glycan_subtype && (
                <Row>
                  <Col md={6}>Glycan SubType:</Col>
                  <Col md={6}>{glycan_subtype}</Col>
                </Row>
              )}

              {protein_identifier && (
                <Row>
                  <Col md={6}>Protein Identifier:</Col>
                  <Col md={6}>{protein_identifier}</Col>
                </Row>
              )}
              {/* {enzyme.id && (
              <Row>
                <Col md={6}>Synthesizing Enzyme:</Col>
                <Col md={6}>{enzyme.id}</Col>
              </Row>
            )} */}
              {glycan_motif && (
                <Row>
                  <Col md={6}>Motif:</Col>
                  <Col md={6}>{glycan_motif}</Col>
                </Row>
              )}
              {pmid && (
                <Row>
                  <Col md={6}>PMID:</Col>
                  <Col md={6}>{pmid}</Col>
                </Row>
              )}
              <div align="center">
                <button type="button" className="btn btn-primary">
                  Update Results
                </button>
                &nbsp; &nbsp;
                <button type="button" className="btn btn-primary">
                  Modify Search
                </button>
                <p className="small">
                  ** To perform the same search again using the current version
                  of the database, click <strong>“Update Results”</strong>.
                </p>
              </div>
            </tbody>
          </table>
        </div>
      </Col>
      {/* </div> */}
    </>
  );
};

export default GlycanQuerySummary;

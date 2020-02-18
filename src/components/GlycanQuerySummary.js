import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Row, Col } from "react-bootstrap";
// import { makeStyles } from "@material-ui/core/styles";
import { getDateMMDDYYYY } from "../utils/common";

const GlycanQuerySummary = props => {
  const title = "Glycan Search Summary";

  const { data, onModifySearch } = props;

  const executionTime = data.execution_time
    ? getDateMMDDYYYY(data.execution_time)
    : "";
  const {
    glytoucan_ac,
    mass,
    mass_type,
    number_monosaccharides,
    organism,
    glycan_type,
    glycan_subtype,
    protein_identifier,
    glycan_motif,
    enzyme,
    pmid
  } = data;

  const formatOrganisms = organism => {
    const organismNames = organism.organism_list.map(item => item.name);

    return organismNames.join(` ${organism.operation} `);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className="ggContainer">
        <Table bordered hover5 size="lg" className="results-table-top ">
          <thead className="panelHeadBgr panelHeadText text-center">
            <tr>
              <th>
                <h3>{title}</h3>
              </th>
            </tr>
          </thead>
          <center>{/* <b>{ question }</b> */}</center>

          <tbody className="table-body">
            <tr className="table-row">
              <td>
                <h6>
                  <center>Performed on: {executionTime} (EST)</center>
                </h6>
                {/* glycan typeahead */}
                {glytoucan_ac && (
                  <Row className="summary-table-col" sm={12}>
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      Glycan Id:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {glytoucan_ac}
                    </Col>
                  </Row>
                )}
                {/* glycan mass */}
                {mass && mass.min && (
                  <Row className="summary-table-col">
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      Mass:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {mass.min}&#8209;{mass.max}&nbsp;Da&nbsp;({mass_type})
                    </Col>
                  </Row>
                )}
                {/* glycan sugar */}
                {number_monosaccharides && number_monosaccharides.min && (
                  <Row className="summary-table-col">
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      Sugar:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {number_monosaccharides.min}&#8209;
                      {number_monosaccharides.max}&nbsp;Da&nbsp;
                    </Col>
                  </Row>
                )}

                {/* Oraganism */}
                {organism && (
                  <Row className="summary-table-col">
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      Organism:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {formatOrganisms(organism)}
                    </Col>
                  </Row>
                )}
                {glycan_type && (
                  <Row className="summary-table-col">
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      Glycan Type:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {glycan_type}
                    </Col>
                  </Row>
                )}
                {glycan_subtype && (
                  <Row className="summary-table-col">
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      Glycan SubType:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {glycan_subtype}
                    </Col>
                  </Row>
                )}

                {protein_identifier && (
                  <Row className="summary-table-col">
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      Protein Identifier:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {protein_identifier}
                    </Col>
                  </Row>
                )}
                {enzyme && enzyme.id && (
                  <Row className="summary-table-col">
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      Synthesizing Enzyme:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {enzyme.id}
                    </Col>
                  </Row>
                )}
                {glycan_motif && (
                  <Row className="summary-table-col">
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      Motif:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {glycan_motif}
                    </Col>
                  </Row>
                )}
                {pmid && (
                  <Row className="summary-table-col">
                    <Col align="right" xs={6} sm={6} md={6} lg={6}>
                      PMID:
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      {pmid}
                    </Col>
                  </Row>
                )}
                <Row className="summary-table-col">
                  <div align="center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Update Results
                    </button>
                    &nbsp; &nbsp;
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={onModifySearch}
                    >
                      Modify Search
                    </button>
                    <p className="small">
                      ** To perform the same search again using the current
                      version of the database, click{" "}
                      <strong>“Update Results”</strong>.
                    </p>
                  </div>
                </Row>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </React.Fragment>
  );
};

export default GlycanQuerySummary;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import stringConstants from '../data/json/stringConstants';
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  if (month.toString().length == 1) {
    month = "0" + month;
  }
  if (day.toString().length == 1) {
    day = "0" + day;
  }
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }
  if (second.toString().length == 1) {
    second = "0" + second;
  }
  var dateTime =
    year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
  return dateTime;
}

const ProteinQuerySummary = props => {
  const title = "Protein Search Summary";
  let quickSearch = stringConstants.quick_search;

  const { data, onModifySearch } = props;

  const {
    uniprot_canonical_ac,
    refseq_ac,
    go_id,
    mass,
    mass_type,
    go_term,
    organism,
    gene_name,
    pathway_id,
    glycan,
    protein_name,
    sequence,
    glycosylated_aa,
    glycosylation_evidence,
    pmid,
    term,
    term_category
  } = data;

  const executionTime = data.execution_time
    ? getDateTime(data.execution_time)
    : "";

  function formatProtein() {
    const ProteinAc = data.uniprot_canonical_ac;
    return ProteinAc.split(",").join(", ");
  }

  return (
    <>
      {/* <pre>Test: {JSON.stringify(data, null, 2)}</pre> */}
      <Card className="text-center summary-panel">
        <Card.Header as="h3" className="panelHeadBgr panelHeadText">
          {title}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <p>
              <strong>Performed on: {executionTime} (EST)</strong>
            </p>
          </Card.Title>
          <Card.Text>
            {props.question && data.glytoucan_ac && (
                <>
								  {props.question.text.split("{0}")[0]}<strong>{data.glytoucan_ac}</strong>{props.question.text.split("{0}")[1]}
                </>
            )}

            {props.question && uniprot_canonical_ac && (
                <>
                  {props.question.text.split("{0}")[0]}<strong>{uniprot_canonical_ac}</strong>{props.question.text.split("{0}")[1]}
                </>
            )}

            {props.question && data.do_name && (
                <>
								  {props.question.text.split("{0}")[0]}<strong>{data.do_name}</strong>{props.question.text.split("{0}")[1]}
                </>
            )}

            {props.question && organism && props.question.organism && (
                <>
                  {props.question.text.split("{0}")[0]}<strong>{organism.name}</strong>{props.question.text.split("{0}")[1]}
                </>
            )}

            {/*  Protein typeahead */}
            {!props.question && uniprot_canonical_ac && (
              <Row className="summary-table-col" sm={12}>
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Protein Id:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {formatProtein(uniprot_canonical_ac)}
                </Col>
              </Row>
            )}

            {mass && mass.min && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Mass:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {mass.min}&#8209;{mass.max}&nbsp;Da&nbsp;({mass_type})
                </Col>
              </Row>
            )}
            {gene_name && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Gene Name:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {gene_name}
                </Col>
              </Row>
            )}
            {glycosylated_aa && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Glycosylated:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {glycosylated_aa.aa_list.join(
                    ` ${glycosylated_aa.operation} `
                  )}
                </Col>
              </Row>
            )}
            {glycosylation_evidence && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Glycosylation Evidence:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {glycosylation_evidence}
                </Col>
              </Row>
            )}
            {sequence && sequence.aa_sequence && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Sequence
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  <abbr
                    className="limit-text-size"
                    title="{{sequence.aa_sequence}}"
                  >
                    {sequence.aa_sequence}{" "}
                  </abbr>
                </Col>
              </Row>
            )}
            {protein_name && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Protein Name:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {protein_name}
                </Col>
              </Row>
            )}

            {go_id && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Go ID:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {go_id}
                </Col>
              </Row>
            )}
            {glycan && glycan.glytoucan_ac && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Interacting Glycan:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {glycan.glytoucan_ac}
                </Col>
              </Row>
            )}

            {/* glycan typeahead */}
            {term && (
              <Row className="summary-table-col" sm={12}>
                <Col align="right">Search Term:</Col>
                <Col align="left">{term}</Col>
              </Row>
            )}

            {/* glycan typeahead */}
            {term_category && (
              <Row className="summary-table-col" sm={12}>
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Category:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {term_category}
                </Col>
              </Row>
            )}
            {!props.question && organism && organism.name && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Organism :
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {organism.name}
                </Col>
              </Row>
            )}
            {refseq_ac && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Refseq Ac:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {refseq_ac}
                </Col>
              </Row>
            )}

            {go_term && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Go Term:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {go_term}
                </Col>
              </Row>
            )}
            {pathway_id && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  Pathway ID:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {pathway_id}
                </Col>
              </Row>
            )}
            {pmid && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  PMID:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {pmid}
                </Col>
              </Row>
            )}
          </Card.Text>
          <div className="pb-3">
            <Button
              type="button"
              className="gg-btn-outline mr-4"
              onClick={() => {
                window.location.reload();
              }}
            >
              Update Results
            </Button>
            <Button
              type="button"
              className="gg-btn-blue"
              onClick={onModifySearch}
            >
              Modify Search
            </Button>
          </div>
          <Card.Text>
            ** To perform the same search again using the current version of the
            database, click <strong>“Update Results”</strong>.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProteinQuerySummary;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import stringConstants from "../data/json/stringConstants";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getSuperSearchList } from "../data/supersearch";

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

const SiteQuerySummary = props => {
  const title = "Site Search Summary";
  const { data, onModifySearch, timestamp, searchId } = props;
  const proteinStrings = stringConstants.protein.common;
  const superSearchStrings = stringConstants.super_search.common;

  const {
    uniprot_ac,
    start_pos,
    end_pos,
    annotation,
    aa_list,
    glycosylated_aa
  } = data;

  const executionTime = timestamp ? getDateTime(timestamp) : "";
  const [aminoAcidLookup, setAminoAcidLookup] = useState({});

  useEffect(() => {
    getSuperSearchList().then(data => {
      const lookup = data.data.aa_list
        .map(({ name, key }) => {
          const tokens = name.split(" - ");
          return {
            key,
            short: tokens[1],
            long: tokens[0]
          };
        })
        .reduce(
          (ind, { key, short, long }) => ({
            ...ind,
            [key]: { short, long }
          }),
          {}
        );

      setAminoAcidLookup(lookup);
    });
  }, []);

  const getSummaryData = query => {
    let result = {};

    for (let querySection of query) {
      for (let listItem of querySection.query.unaggregated_list) {
        if (listItem.path === "uniprot_ac") {
          result.protein = listItem.string_value;
        }
      }
    }

    return result;
  };

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
            {/*  Protein typeahead */}

            {searchId !== "sups" && data && data.length > 0 && (
              <>
                {data.map(querySection => (
                  <>
                    {querySection.concept === "protein" && (
                      <Row className="summary-table-col" sm={12}>
                        <Col align="right" xs={6} sm={6} md={6} lg={6}>
                          protein
                        </Col>
                        <Col align="left" xs={6} sm={6} md={6} lg={6}>
                          {querySection.query.unaggregated_list[0].string_value}
                        </Col>
                      </Row>
                    )}
                  </>
                ))}
              </>
            )}

            {searchId && searchId === "sups" && <>{superSearchStrings.query}</>}

            {glycosylated_aa && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  {proteinStrings.glycosylated_aa.shortName}:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {glycosylated_aa.aa_list
                    .map(key => aminoAcidLookup[key].short || "")
                    .join(` ${glycosylated_aa.operation} `)}
                </Col>
              </Row>
            )}
            {annotation && (
              <Row className="summary-table-col">
                <Col align="right" xs={6} sm={6} md={6} lg={6}>
                  {proteinStrings.glycosylation_evidence.name}:
                </Col>
                <Col align="left" xs={6} sm={6} md={6} lg={6}>
                  {annotation}
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

export default SiteQuerySummary;

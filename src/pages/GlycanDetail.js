import React, { useState, useEffect } from "react";

import { getGlycanDetail } from "../data/glycan";
import { useParams } from "react-router-dom";
// import { Col, Row } from "react-bootstrap";
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
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

  const { mass, glytoucan } = detailData;

  return (
    <>
      {/* <MDBContainer>
        <MDBRow>
          <MDBCol md="3">Mass: {mass}</MDBCol>
          <MDBCol md="6">.col-md-4</MDBCol>
          <MDBCol md="3">.col-md-4</MDBCol>
        </MDBRow>
      </MDBContainer> */}

      <h1>Glycan Detail</h1>

      {/* <a href={`/glycan-list/${id}`}>Glycan List</a> */}
      {/* <p>Mass: {mass}</p> */}

      {glytoucan && glytoucan.glytoucan_ac && (
        <p>GlyToucan Accession: {glytoucan.glytoucan_ac + ""}</p>
      )}

      {/* glytoucan<p>GlyToucan Accession: glytoucan_ac}</p> */}

      <p>{JSON.stringify(detailData)}</p>

      {/* <QuerySummary data={query} />
      <DataTable pagination={pagination} data={data} columnDefinition={columnDefinition} /> */}
    </>
  );
};

export default GlycanDetail;

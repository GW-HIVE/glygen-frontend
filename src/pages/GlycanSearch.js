import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GlycanSearch = props => {
  let { id } = useParams();

  return (
    <>
      <h1>Glycan Search</h1>
      {id ? id : "No ID"}
    </>
  );
};

export default GlycanSearch;

import React from "react";


const QuerySummary = (props) => {

    const title = 'Query Summary';
    
    const { data } = props;
  
    return (
      <>
        <h2>{title}</h2>
    <span>{data.execution_time ?  (new Date(data.execution_time)).toISOString() : ''}</span>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </>
    )
}

export default QuerySummary;
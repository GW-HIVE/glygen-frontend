
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { getSystemData } from "../data";

const Home = () => {
  
    const [version, setVersion] = useState([]);
    const [statistics, setStatistics] = useState([]);
  
    useEffect(() => {
      const systemData = getSystemData();
  
      systemData.then(({data}) => {
        setVersion(data.version)
        setStatistics(data.statistics)
      });
    }, 
    [])

    return (
  <>
    <Helmet>
      <title>Quick Search</title>
    </Helmet>
    <div className="lander">
      <h1>Welcome to Glygen Project!</h1>
      <p>
        Here you can see Glygen data!
      </p>
      <pre>{JSON.stringify(version)}</pre>
      <pre>{JSON.stringify(statistics)}</pre>
    </div>
  </>
)
};

export default Home;
import React, { useEffect, useReducer, useState } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import PageLoader from "../components/load/PageLoader";
import TextAlert from "../components/alert/TextAlert";
import DialogAlert from "../components/alert/DialogAlert";
import SiteSearchControl from "../components/search/SiteSearchControl";
import { Tab, Tabs, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../css/Search.css";
import { getSuperSearch, getSuperSearchList } from "../data/supersearch";
import siteData from "../data/json/siteData";
import stringConstants from "../data/json/stringConstants";
import routeConstants from "../data/json/routeConstants";
import { logActivity } from "../data/logging";
import { axiosError } from "../data/axiosError";
import { getSiteSearch } from "../data/protein";
import FeedbackWidget from "../components/FeedbackWidget";
import ProteinTutorial from "../components/tutorial/ProteinTutorial";

/**
 * Protein search component for showing protein search tabs.
 */
const SiteSearch = props => {
  let { id } = useParams("");
  const [proActTabKey, setProActTabKey] = useState("Site-Search");
  const [pageLoading, setPageLoading] = useState(false);
  const [queryData, setQueryData] = useState([]);
  const [alertTextInput, setAlertTextInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );

  // useEffect(() => {
  //   console.log("SuperSearch");
  //   setPageLoading(true);

  //   getSuperSearchList(id, 1)
  //     .then(({ data }) => {
  //       logActivity("user", id, "Search modification initiated");
  //       setQueryData(data.cache_info.query);

  //       setPageLoading(false);
  //     })
  //     .catch(function(error) {
  //       let message = "list api call";
  //       axiosError(error, "", message, setPageLoading, setAlertDialogInput);
  //     });
  // }, []);

  return (
    <>
      <Helmet>
        {getTitle("proteinSiteSearch")}
        {getMeta("proteinSiteSearch")}
      </Helmet>
      <FeedbackWidget />
      <div className="lander">
        <Container>
          <PageLoader pageLoading={pageLoading} />
          <DialogAlert
            alertInput={alertDialogInput}
            setOpen={input => {
              setAlertDialogInput({ show: input });
            }}
          />
          <div className="content-box-md">
            <h1 className="page-heading">{siteData.pageTitle}</h1>
          </div>
          <Tabs
            defaultActiveKey="Site-Search"
            transition={false}
            activeKey={proActTabKey}
            mountOnEnter={true}
            unmountOnExit={true}
            onSelect={key => setProActTabKey(key)}
          >
            <Tab
              key="tutorial"
              eventKey="Tutorial"
              title={siteData.tutorial.tabTitle}
              className="tab-content-padding"
            >
              <Container className="tab-content-border">
                <ProteinTutorial />
              </Container>
            </Tab>
            <Tab
              key="search"
              eventKey="Site-Search"
              className="tab-content-padding"
              title={siteData.site_search.tabTitle}
            >
              <TextAlert alertInput={alertTextInput} />
              <Container className="tab-content-border">
                <SiteSearchControl
                  searchId={id}
                  // searchsiteClick={searchSiteClick}
                  // inputValue={SiteSearchData}
                  // setProAdvSearchData={setSiteSearchData}
                />
              </Container>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </>
  );
};

export default SiteSearch;

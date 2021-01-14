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
import siteSearchData from "../data/json/siteSearch";
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
  const [alertTextInput, setAlertTextInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const [proSiteSearchData, setProSiteSearchData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      proteinId: "",
      siteId: "",
      annotion:"",
      proRangeInput: [
        Number(260).toLocaleString("en-US"),
        Number(3906488).toLocaleString("en-US")
      ],
    }
  );
  let siteSearch = siteSearchData.site_search;
  let proteinData = stringConstants.protein;
  let commonProteinData = proteinData.common;
/**
   * useEffect for retriving data from api and showing page loading effects.
   */
  useEffect(() => {
    setPageLoading(true);
    logActivity();
    document.addEventListener("click", () => {
      setAlertTextInput({ show: false });
    });
   

       
        const anchorElement = props.history.location.hash;
        if (anchorElement) {
          setProActTabKey(anchorElement.substr(1));
        } else {
          setProActTabKey("Site-Search");
        }
                setProAdvSearchData({
                  proteinId:
                    data.cache_info.query.uniprot_canonical_ac === undefined
                      ? ""
                      : data.cache_info.query.uniprot_canonical_ac + ",",
                  siteId:
                    data.cache_info.query.site === undefined
                      ? ""
                      : data.cache_info.query.site,
                  
                  proMassInput:
                    data.cache_info.query.site_range === undefined
                      ? [
                          Math.floor(initData.protein_mass.min).toLocaleString(
                            "en-US"
                          ),
                          Math.ceil(initData.protein_mass.max).toLocaleString(
                            "en-US"
                          )
                        ]
                      : [
                          Math.floor(
                            data.cache_info.query.mass.min
                          ).toLocaleString("en-US"),
                          Math.ceil(
                            data.cache_info.query.mass.max
                          ).toLocaleString("en-US")
                        ],
                    proAnnotation:data.cache_info.query.annotion === undefined
                    ? ""
                    : data.cache_info.query.annotion,
                
   
                });

                setProActTabKey("Advanced-Search");
                setPageLoading(false);
              }
            })
            .catch(function(error) {
              let message = "list api call";
              axiosError(
                error,
                "",
                message,
                setPageLoading,
                setAlertDialogInput
              );
            });
      })
      .catch(function(error) {
        let message = "search_init api call";
        axiosError(error, "", message, setPageLoading, setAlertDialogInput);
      });
  }, [id, proteinData]);

  /**
   * Function to handle protein simple search.
   **/
  const loadSiteData = () => {
    var formjsonSite = {};
    logActivity("user", id, "Performing Site Search");
    let message = "Simple Search query=" + JSON.stringify(formjsonSite);

    getSiteSearch(formjsonSite)
      .then(response => {
        // if (response.data["list_id"] !== "") {
        //   logActivity(
        //     "user",
        //     (id || "") + ">" + response.data["list_id"],
        //     message
        //   ).finally(() => {
        //     props.history.push(
        //       routeConstants.proteinList + response.data["list_id"]
        //     );
        //   });
        //   setPageLoading(false);
        // }
        // else {
        //   logActivity("user", "", "No results. " + message);
        //   setPageLoading(false);
        //   setAlertTextInput({
        //     show: true,
        //     id: stringConstants.errors.simpleSerarchError.id
        //   });
        //   window.scrollTo(0, 0);
        // }
      })
      .catch(function(error) {
        axiosError(error, "", message, setPageLoading, setAlertDialogInput);
      })
      .finally(() => {
        setPageLoading(false);
      });
  };

  /**
   * Function to handle click event for protein simple search.
   **/
  const searchSiteClick = () => {
    setPageLoading(true);
    loadSiteData();
  };

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
            <h1 className="page-heading">{siteSearchData.pageTitle}</h1>
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
              eventKey="Site-Search"
              className="tab-content-padding"
              title={siteSearchData.tabTitle}
            >
              <TextAlert alertInput={alertTextInput} />
              <Container className="tab-content-border">
                <SiteSearchControl
                  searchsiteClick={searchSiteClick}
                  inputValue={proSiteSearchData}
                  setProAdvSearchData={setProSiteSearchData}
                />
              </Container>
            </Tab>
            <Tab
              eventKey="Tutorial"
              title={siteSearchData.tutorial.tabTitle}
              className="tab-content-padding"
            >
              <Container className="tab-content-border">
                <ProteinTutorial />
              </Container>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </>
  );
};

export default SiteSearch;

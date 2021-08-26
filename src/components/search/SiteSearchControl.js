import React, { useState, useEffect, useReducer } from "react";
import MultilineAutoTextInput from "../input/MultilineAutoTextInput";
import AutoTextInput from "../input/AutoTextInput";
import DialogAlert from "../alert/DialogAlert";
import SelectControl from "../select/SelectControl";
import HelpTooltip from "../tooltip/HelpTooltip";
import ExampleExploreControl from "../example/ExampleExploreControl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Button from "react-bootstrap/Button";
import { sortDropdown } from "../../utils/common";
import "../../css/Search.css";
import MultiselectTextInput from "../input/MultiselectTextInput";
import siteData from "../../data/json/siteData";
import stringConstants from "../../data/json/stringConstants";
import { InputLabel, Radio } from "@material-ui/core";
import { grid, positions } from "@material-ui/system";
import { getSiteSearch, getSiteSearchInit } from "../../data/supersearch";
import proteinSearchData from "../../data/json/proteinSearch";
import * as routeConstants from "../../data/json/routeConstants";
import { logActivity } from "../../data/logging";
import { axiosError } from "../../data/axiosError";
import { getTitle, getMeta } from "../../utils/head";
import PageLoader from "../load/PageLoader";
import FeedbackWidget from "../FeedbackWidget";
import TextAlert from "../alert/TextAlert";
const commonProteinData = stringConstants.protein.common;
const sitesData = siteData.site_search;
let advancedSearch = proteinSearchData.advanced_search;
let siteListRoute = routeConstants.siteList;
/**
 * Protein advanced search control.
 */
const SiteSearchControl = props => {
  const { defaults } = props;
  const [initData, setInitData] = useState(null);
  const [position, setPosition] = useState("");
  const [minRange, setMinRange] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [proteinId, setproteinId] = useState("");
  const [aminoType, setAminoType] = useState("");
  const [pattern, setPattern] = useState("");
  const [distance, setDistance] = useState("0");
  const [annotationOperation, setAnnotationOperation] = useState("$and");
  const [operator, setOperator] = useState("$lte");
  const [updownoperator, setUpDownOperator] = useState("down_seq");
  const [annotations, setAnnotations] = useState([]);
  const [singleannotations, setSingleAnnotations] = useState("");
  const [queryObject, setQueryObject] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [alertTextInput, setAlertTextInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const proteinStrings = stringConstants.protein.common;

  useEffect(() => {
    setPageLoading(true);
    document.addEventListener("click", () => {
      setAlertTextInput({ show: false });
    });
    logActivity();
    setAlertTextInput({ show: false });
    getSiteSearchInit().then(response => {
      setInitData(response.data);
      setPageLoading(false);
    });
  }, []);

  useEffect(() => {
    if (defaults.proteinId) {
      setproteinId(defaults.proteinId.join(","));
    }
    if (defaults.annotations) {
      const anno = initData.annotation_type_list.filter(annotation => {
        return defaults.annotations.includes(annotation.id);
      });

      setAnnotations(
        anno.map(x => ({
          ...x,
          name: x.label
        }))
      );
    }

    if (defaults.annotations) {
      const anno = initData.annotation_type_list.filter(annotation => {
        return defaults.annotations.includes(annotation.id);
      });

      setSingleAnnotations(
        anno.map(x => ({
          ...x,
          name: x.label
        }))
      );
    }
    if (defaults.aminoType) {
      setAminoType(defaults.aminoType);
    }
    if (defaults.min) {
      setMinRange(defaults.min);
    }
    if (defaults.max) {
      setMaxRange(defaults.max);
    }
    if (defaults.position) {
      setPosition(defaults.position);
    }
    if (defaults.annotationOperation) {
      setAnnotationOperation(defaults.annotationOperation);
    }
    if (defaults.operator) {
      setOperator(defaults.operator);
    }
    if (defaults.updownoperator) {
      setOperator(defaults.updownoperator);
    }
    if (defaults.distance) {
      setDistance(defaults.distance);
    }
    if (defaults.pattern) {
      setPattern(defaults.pattern);
    }

    console.log("defaults", defaults);
  }, [initData, defaults]);

  useEffect(() => {
    let currentPosition = parseInt(position) || 0;

    currentPosition = Math.min(currentPosition, 8);
    currentPosition = Math.max(currentPosition, 0);

    setPosition(currentPosition.toString());

    setPageLoading(false);
    setQueryObject({
      proteinId,
      aminoType,
      annotations,
      annotationOperation,
      singleannotations,
      operator,
      updownoperator,
      distance,
      minRange,
      maxRange,
      combinedPattern: `^[A-Z]{${parseInt(currentPosition)}}${pattern}`
    });
  }, [
    proteinId,
    aminoType,
    annotations,
    annotationOperation,
    singleannotations,
    operator,
    updownoperator,
    pattern,
    distance,
    position,
    minRange,
    maxRange
  ]);

  /**
   * Function to clear input field values.
   **/
  const clearSite = () => {
    setAlertTextInput({ show: false });
    setproteinId("");
    setMinRange("");
    setSingleAnnotations([]);
    setOperator("$lte");
    setPosition("");
    setMaxRange("");
    setAnnotations([]);
    setAminoType("");
    setAnnotationOperation("$and");
    setUpDownOperator("down_seq");
  };

  const handlePositionChange = event => {
    setPosition(event.target.value);
    setMinRange("");
    setMaxRange("");
  };

  // const handleMinRangeChange = event => {
  //   setMinRange(event.target.value);
  //   setPosition("");
  // };

  // const handleMaxRangeChange = event => {
  //   setMaxRange(event.target.value);
  //   setPosition("");
  // };

  const handleSearch = () => {
    setPageLoading(true);
    logActivity("user", "Performing Site Search");
    let message = "Site Search query=" + JSON.stringify(queryObject);
    console.log(message);

    getSiteSearch({
      ...queryObject,
      proteinId: queryObject.proteinId.split(",").filter(x => x !== ""),
      aminoType: queryObject.aminoType,
      annotations: queryObject.annotations.map(x => x.id.toLowerCase())
    })
      .then(response => {
        let listId = undefined;

        if (
          response.data &&
          response.data.results_summary &&
          response.data.results_summary.site &&
          response.data.results_summary.site.list_id
        )
          listId = response.data.results_summary.site.list_id;

        if (listId) {
          window.location = siteListRoute + listId;
        } else {
          logActivity("user", "", "No results. ");
          setPageLoading(false);
          setAlertTextInput({
            show: true,
            id: stringConstants.errors.siteSerarchError.id
          });
          window.scrollTo(0, 0);
        }
      })
      .catch(function(error) {
        axiosError(error, "", message, setPageLoading, setAlertDialogInput);
      });
  };

  return (
    <>
      <Grid
        container
        style={{ margin: "0  auto" }}
        spacing={3}
        justify="center"
      >
        <PageLoader pageLoading={pageLoading} />
        <DialogAlert
          alertInput={alertDialogInput}
          setOpen={input => {
            setAlertDialogInput({ show: input });
          }}
        />

        <Grid item xs={12} sm={10}>
          <TextAlert alertInput={alertTextInput} />
        </Grid>

        {initData && (
          <>
            {/* Buttons Top */}
            <Grid item xs={12} sm={10}>
              <Row className="gg-align-right pt-2 pb-2 mr-1">
                <Button className="gg-btn-outline mr-4" onClick={clearSite}>
                  Clear Fields
                </Button>
                <Button
                  className="gg-btn-blue"
                  onClick={handleSearch}
                  // disabled={!SiteSearchValError.every(err => err === false)}
                >
                  Search Protein Site
                </Button>
              </Row>
            </Grid>
            {/* <Grid item>
          <pre>{JSON.stringify(defaults)}</pre>
        </Grid> */}

            {/* Amino Acid */}
            <Grid item xs={12} sm={10}>
              <FormControl fullWidth variant="outlined">
                <Typography className={"search-lbl"} gutterBottom>
                  <HelpTooltip
                    title={commonProteinData.glycosylated_aa.tooltip.title}
                    text={commonProteinData.glycosylated_aa.tooltip.text}
                  />
                  {proteinStrings.glycosylated_aa.site_form}
                </Typography>
                <SelectControl
                  inputValue={aminoType}
                  placeholder={sitesData.amino_type.placeholder}
                  placeholderId={sitesData.amino_type.placeholderId}
                  placeholderName={sitesData.amino_type.placeholderName}
                  menu={initData.aa_type_list
                    .map(a => ({
                      ...a,
                      name: a.label
                        .split(" - ")
                        .reverse()
                        .join(" - ")
                    }))
                    .sort(sortDropdown)}
                  setInputValue={setAminoType}
                />
              </FormControl>
            </Grid>

            {/* annotation */}
            <Grid item xs={12} sm={10}>
              <FormControl fullWidth>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={9} sm={9}>
                    <Typography className={"search-lbl"} gutterBottom>
                      <HelpTooltip
                        title={commonProteinData.annotation.tooltip.title}
                        text={commonProteinData.annotation.tooltip.text}
                      />
                      {proteinStrings.annotation_type.name}
                    </Typography>
                    <MultiselectTextInput
                      inputValue={annotations}
                      placeholder={sitesData.annotation.placeholder}
                      placeholderId={sitesData.annotation.placeholderId}
                      placeholderName={sitesData.annotation.placeholderName}
                      options={initData.annotation_type_list
                        .map(a => ({
                          ...a,
                          name: a.label
                        }))

                        .sort(sortDropdown)}
                      setInputValue={setAnnotations}
                    ></MultiselectTextInput>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Typography className={"search-lbl"} gutterBottom>
                      &nbsp;
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <SelectControl
                        inputValue={annotationOperation}
                        menu={advancedSearch.aa_listforsite.operations}
                        setInputValue={setAnnotationOperation}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            {/* Neighbours */}
            <Grid item xs={12} sm={10}>
              <FormControl fullWidth>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6} sm={6}>
                    <Typography className={"search-lbl"} gutterBottom>
                      <HelpTooltip
                        title={commonProteinData.neighbours.tooltip.title}
                        text={commonProteinData.neighbours.tooltip.text}
                      />
                      {commonProteinData.neighbours.tooltip.title}
                    </Typography>

                    <FormControl fullWidth variant="outlined">
                      <SelectControl
                        inputValue={singleannotations}
                        placeholder={sitesData.annotation.placeholder}
                        placeholderId={sitesData.annotation.placeholderId}
                        placeholderName={sitesData.annotation.placeholderName}
                        menu={initData.annotation_type_list
                          .map(a => ({
                            ...a,
                            name: a.label,
                            id: a.id.replace("_flag", "")
                          }))
                          .sort(sortDropdown)}
                        setInputValue={setSingleAnnotations}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Typography className={"search-lbl"} gutterBottom>
                      &nbsp;
                    </Typography>

                    <FormControl fullWidth variant="outlined">
                      <AutoTextInput
                        inputValue={distance}
                        setInputValue={setDistance}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Typography className={"search-lbl"} gutterBottom>
                      &nbsp;
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <SelectControl
                        inputValue={operator}
                        menu={advancedSearch.operatorforsite.operations}
                        setInputValue={setOperator}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            {/* Pattern */}
            <Grid item xs={12} sm={10}>
              <FormControl fullWidth>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4} sm={4}>
                    <Typography className={"search-lbl"} gutterBottom>
                      <HelpTooltip
                        title={commonProteinData.pattern.tooltip.title}
                        text={commonProteinData.pattern.tooltip.text}
                      />
                      {commonProteinData.pattern.tooltip.title}
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <SelectControl
                        inputValue={updownoperator}
                        menu={advancedSearch.updownstreamforsite.operations}
                        setInputValue={setUpDownOperator}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Typography className={"search-lbl"} gutterBottom>
                      &nbsp;
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <AutoTextInput
                        inputValue={position}
                        setInputValue={setPosition}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Typography className={"search-lbl"} gutterBottom>
                      &nbsp;
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <AutoTextInput
                        inputValue={pattern}
                        setInputValue={setPattern}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            {/* Buttons Buttom */}
            <Grid item xs={12} sm={10}>
              <Row className="gg-align-right pt-3 mb-2 mr-1">
                <Button className="gg-btn-outline mr-4" onClick={clearSite}>
                  Clear Fields
                </Button>
                <Button className="gg-btn-blue" onClick={handleSearch}>
                  Search Protein Site
                </Button>
              </Row>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default SiteSearchControl;

SiteSearchControl.propTypes = {
  // initData: PropTypes.object
};

import React, { useState, useEffect } from "react";
import MultilineAutoTextInput from "../input/MultilineAutoTextInput";
import AutoTextInput from "../input/AutoTextInput";
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
import { getSiteSearch } from "../../data/supersearch";
import proteinSearchData from "../../data/json/proteinSearch";
import * as routeConstants from "../../data/json/routeConstants";

const commonProteinData = stringConstants.protein.common;
const sitesData = siteData.site_search;
let advancedSearch = proteinSearchData.advanced_search;
let siteListRoute = routeConstants.siteList;
/**
 * Protein advanced search control.
 */
const SiteSearchControl = props => {
  // const [positionOrRange, setPositionOrRange] = useState("");
  const [position, setPosition] = useState("");
  const [minRange, setMinRange] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [proteinId, setproteinId] = useState("");
  const [aminoId, setAminoId] = useState("");
  const [annotationOperation, setAnnotationOperation] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const [queryObject, setQueryObject] = useState({});

  // const validateMinRange = (minRange) => true;

  // const minRangeError = validateMinRange(minRange)

  useEffect(() => {
    setQueryObject({
      proteinId,
      aminoId,
      annotations,
      annotationOperation,
      position,
      minRange,
      maxRange
    });
  }, [
    proteinId,
    aminoId,
    annotations,
    annotationOperation,
    position,
    minRange,
    maxRange
  ]);

  /**
   * Function to clear input field values.
   **/
  const clearSite = () => {
    setproteinId("");
    setMinRange("");
    setPosition("");
    setMaxRange("");
    setAnnotations([]);
    setAminoId("");
    setAnnotationOperation("");
  };

  const handlePositionChange = event => {
    setPosition(event.target.value);
    setMinRange("");
    setMaxRange("");
  };

  const handleMinRangeChange = event => {
    setMinRange(event.target.value);
    setPosition("");
  };

  const handleMaxRangeChange = event => {
    setMaxRange(event.target.value);
    setPosition("");
  };

  const handleSearch = () => {
    getSiteSearch(queryObject).then(listId => {
      window.location = siteListRoute + listId;
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
          <pre>{JSON.stringify(queryObject)}</pre>
        </Grid> */}

        <Grid item xs={12} sm={10}>
          <FormControl fullWidth variant="outlined">
            <Typography className={"search-lbl"} gutterBottom>
              <HelpTooltip
                title={commonProteinData.uniprot_canonical_ac.tooltip.title}
                text={commonProteinData.uniprot_canonical_ac.tooltip.text}
                urlText={commonProteinData.uniprot_canonical_ac.tooltip.urlText}
                url={commonProteinData.uniprot_canonical_ac.tooltip.url}
              />
              {commonProteinData.uniprot_canonical_ac.name}
            </Typography>
            <MultilineAutoTextInput
              fullWidth
              inputValue={proteinId}
              setInputValue={setproteinId}
              placeholder={sitesData.uniprot_canonical_ac.placeholder}
              typeahedID={sitesData.uniprot_canonical_ac.typeahedID}
              length={sitesData.uniprot_canonical_ac.length}
              errorText={sitesData.uniprot_canonical_ac.errorText}
            />
            <ExampleExploreControl
              setInputValue={setproteinId}
              inputValue={advancedSearch.uniprot_canonical_ac.examples}
            />
          </FormControl>
        </Grid>
        {/* Amino Acid */}
        <Grid item xs={12} sm={10}>
          <FormControl fullWidth variant="outlined">
            <Typography className={"search-lbl"} gutterBottom>
              <HelpTooltip
                title={commonProteinData.glycosylated_aa.tooltip.title}
                text={commonProteinData.glycosylated_aa.tooltip.text}
              />
              {commonProteinData.glycosylated_aa.name}
            </Typography>
            <SelectControl
              inputValue={aminoId}
              placeholder={sitesData.site_id.placeholder}
              placeholderId={sitesData.site_id.placeholderId}
              placeholderName={sitesData.site_id.placeholderName}
              menu={sitesData.site_id.menu}
              setInputValue={setAminoId}
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
                  Annotation Type
                </Typography>
                <MultiselectTextInput
                  inputValue={annotations}
                  placeholder={sitesData.annotation.placeholder}
                  placeholderId={sitesData.annotation.placeholderId}
                  placeholderName={sitesData.annotation.placeholderName}
                  options={sitesData.annotation.menu.sort(sortDropdown)}
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
                    menu={advancedSearch.aa_list.operations}
                    setInputValue={setAnnotationOperation}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>

        {/* Position */}
        <Grid item xs={12} sm={10}>
          <FormControl fullWidth>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6} sm={6}>
                <Typography className={"search-lbl"} gutterBottom>
                  <HelpTooltip
                    title={commonProteinData.site.tooltip.title}
                    text={commonProteinData.site.tooltip.text}
                  />
                  {commonProteinData.site.tooltip.title}
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel className={"select-lbl-inline"}></InputLabel>
                  <OutlinedInput
                    className={props.inputClass}
                    value={position}
                    margin="dense"
                    onChange={handlePositionChange}
                    labelWidth={40}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3} sm={3}>
                <Typography className={"search-lbl"} gutterBottom>
                  <HelpTooltip
                    title={commonProteinData.site_range.tooltip.title}
                    text={commonProteinData.site_range.tooltip.text}
                  />
                  {commonProteinData.site_range.tooltip.title}
                </Typography>

                <FormControl fullWidth variant="outlined">
                  <InputLabel className={"select-lbl-inline"}>Min</InputLabel>
                  <OutlinedInput
                    className={props.inputClass}
                    value={minRange}
                    margin="dense"
                    onChange={handleMinRangeChange}
                    labelWidth={40}
                    inputProps={{
                      min: props.min,
                      max: props.max
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3} sm={3}>
                <Typography className={"search-lbl"} gutterBottom>
                  &nbsp;
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel className={"select-lbl-inline"}>Max</InputLabel>
                  <OutlinedInput
                    className={props.inputClass}
                    value={maxRange}
                    margin="dense"
                    onChange={handleMaxRangeChange}
                    labelWidth={40}
                    inputProps={{
                      min: props.min,
                      max: props.max
                    }}
                    // disabled={positionOrRange !== "range"}
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
      </Grid>
    </>
  );
};

export default SiteSearchControl;

SiteSearchControl.propTypes = {
  // initData: PropTypes.object
};

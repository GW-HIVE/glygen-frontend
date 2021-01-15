import React, { useState } from "react";
import MultilineAutoTextInput from "../input/MultilineAutoTextInput";
import AutoTextInput from "../input/AutoTextInput";
import SelectControl from "../select/SelectControl";
import CategorizedAutoTextInput from "../input/CategorizedAutoTextInput";
import MultiselectTextInput from "../input/MultiselectTextInput";
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
import siteData from "../../data/json/siteData";
import stringConstants from "../../data/json/stringConstants";
import { InputLabel, Radio } from "@material-ui/core";

/**
 * Protein advanced search control.
 */
const SiteSearchControl = props => {
  const [positionOrRange, setPositionOrRange] = useState("");
  const [proteinId, setproteinId] = useState("");
  const [siteId, setsiteId] = useState("");
  const [annotation, setAnnotation] = useState("annotation");
  // const [rangeInput, setRangeInput] = useState("rangeInput");

  let commonProteinData = stringConstants.protein.common;
  let sitesData = siteData.site_search;
  // const [siteSearchData, setSiteSearchData] = useState({
  //   proteinId: "",
  //   siteId: "",
  //   annotion: "",
  //   proRangeInput: ["", ""],
  //   position: ""
  // });
  // cosnt handleSubmitSearch = () => {
  //   const json = {
  //     proteinId,
  //     siteId,
  //     annotion,
  //     proRangeInput
  //   }
  //   callServer(json)
  //     .then()
  //     .then(catch)
  // }

  // /**
  //  * Function to handle click event for protein simple search.
  //  **/
  // const searchSiteClick = () => {
  //   setPageLoading(true);
  //   loadSiteData();
  // };

  /**
   * Function to clear input field values.
   **/
  const clearSite = () => {
    props.setSiteSearchData({
      proteinId: " ",
      siteId: " ",
      proRangeInput: [" ", " "],
      proAnnotation: " "
    });
  };

  // const handlePostionOrRangeChange = event => {
  //   setPositionOrRange(event.target.value);
  // };

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
              onClick={props.searchSiteClick}
              // disabled={
              //   !props.inputValue.proSiteSearchValError.every(
              //     err => err === false
              //   )
              // }
            >
              Search Protein Site
            </Button>
          </Row>
        </Grid>
        {/* Protein Id */}
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
            {/* <ExampleExploreControl
              setInputValue={proteinIdChange}
              inputValue={siteSearch.uniprot_canonical_ac.examples}
            /> */}
          </FormControl>
        </Grid>
        {/* Amino Acid Type */}
        <Grid item xs={12} sm={10}>
          <FormControl fullWidth variant="outlined">
            <Typography className={"search-lbl"} gutterBottom>
              <HelpTooltip
                title={commonProteinData.site.tooltip.title}
                text={commonProteinData.site.tooltip.text}
              />
              {commonProteinData.site.name}
            </Typography>
            <SelectControl
              inputValue={siteId}
              placeholder={sitesData.site_id.placeholder}
              placeholderId={sitesData.site_id.placeholderId}
              placeholderName={sitesData.site_id.placeholderName}
              menu={sitesData.site_id.menu}
              setInputValue={setsiteId}
            />
          </FormControl>
        </Grid>

        {/* Glycosylation Evidence Type */}
        <Grid item xs={12} sm={10}>
          <FormControl fullWidth variant="outlined">
            <Typography className={"search-lbl"} gutterBottom>
              <HelpTooltip
                title={commonProteinData.annotation.tooltip.title}
                text={commonProteinData.annotation.tooltip.text}
              />
              {commonProteinData.annotation.name}
            </Typography>
            <SelectControl
              inputValue={annotation}
              placeholder={sitesData.annotation.placeholder}
              placeholderId={sitesData.annotation.placeholderId}
              placeholderName={sitesData.annotation.placeholderName}
              menu={sitesData.annotation.menu}
              setInputValue={setAnnotation}
            />
          </FormControl>
        </Grid>
        {/* Position */}
        <Grid item xs={12} sm={10}>
          <Radio
            checked={positionOrRange === "position"}
            // onChange={handlePostionOrRangeChange}
            value="position"
            name="position-or-range"
          />
          <FormControl fullWidth variant="outlined">
            <Typography className={"search-lbl"} gutterBottom>
              <HelpTooltip
                title={commonProteinData.annotation.tooltip.title}
                text={commonProteinData.annotation.tooltip.text}
              />
              Position
            </Typography>
            {positionOrRange === "position" && (
              <FormControl fullWidth variant="outlined">
                <InputLabel className={"select-lbl-inline"}>
                  Position
                </InputLabel>
                <OutlinedInput
                  className={props.inputClass}
                  // value={props.inputValue[0]}
                  margin="dense"
                  // onChange={minInputChange}
                  // onBlur={onMinMoveOut}
                  labelWidth={40}
                  // inputProps={{
                  //   min: props.min,
                  //   max: props.max
                  // }}
                  disabled={positionOrRange !== "position"}
                />
              </FormControl>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Radio
            checked={positionOrRange === "range"}
            // onChange={handlePostionOrRangeChange}
            value="range"
            name="position-or-range"
          />

          <FormControl fullWidth>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={9}>
                <Typography className={"search-lbl"} gutterBottom>
                  <HelpTooltip
                    title={commonProteinData.number_range.tooltip.title}
                    text={commonProteinData.number_range.tooltip.text}
                  />
                  {commonProteinData.number_range.name}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel className={"select-lbl-inline"}>
                        Min
                      </InputLabel>
                      <OutlinedInput
                        className={props.inputClass}
                        // value={props.inputValue[0]}
                        margin="dense"
                        // onChange={minInputChange}
                        // onBlur={onMinMoveOut}
                        labelWidth={40}
                        inputProps={{
                          min: props.min,
                          max: props.max
                        }}
                        disabled={positionOrRange !== "range"}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel className={"select-lbl-inline"}>
                        Max
                      </InputLabel>
                      <OutlinedInput
                        className={props.inputClass}
                        // value={props.inputValue[1]}
                        margin="dense"
                        // onChange={maxInputChange}
                        // onBlur={onMaxMoveOut}
                        labelWidth={40}
                        inputProps={{
                          min: props.min,
                          max: props.max
                        }}
                        disabled={positionOrRange !== "range"}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        {/* Organisms */}

        {/* Buttons Buttom */}
        <Grid item xs={12} sm={10}>
          <Row className="gg-align-right pt-3 mb-2 mr-1">
            <Button className="gg-btn-outline mr-4" onClick={clearSite}>
              Clear Fields
            </Button>
            <Button
              className="gg-btn-blue"
              onClick={props.searchSiteClick}
              // disabled={
              //   !props.inputValue.proSiteSearchValError.every(
              //     err => err === false
              //   )
              // }
            >
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

import React from "react";
import MultilineAutoTextInput from "../input/MultilineAutoTextInput";
import RangeInputSlider from "../input/RangeInputSlider";
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
import siteSearchData from "../../data/json/siteSearch";
import stringConstants from "../../data/json/stringConstants";

/**
 * Protein advanced search control.
 */
const SiteSearchControl = props => {
  let commonProteinData = stringConstants.protein.common;
  let siteSearch = siteSearchData.site_search;

  /**
   * Function to set protein id value.
   * @param {string} inputProteinId - input protein id value.
   **/
  function proteinIdChange(inputProteinId) {
    let valArr = props.inputValue.proSiteSearchValError;
    valArr[0] = inputProteinId.length > siteSearch.uniprot_canonical_ac.length;
    props.setSiteSearchData({
      proteinId: inputProteinId,
      proSiteSearchValError: valArr
    });
  }
  /**
   * Function to set protein id value.
   * @param {string} inputSiteId - input protein id value.
   **/
  function siteIdChange(inputSiteId) {
    let valArr = props.inputValue.proSiteSearchValError;
    valArr[0] = inputSiteId.length > siteSearch.uniprot_canonical_ac.length;
    props.setSiteSearchData({
      siteId: inputSiteId,
      proSiteSearchValError: valArr
    });
  }
  /**
   * Function to set mass value.
   * @param {array} inputsite - input min, max mass value.
   **/
  function proRangeInputChange(inputRange) {
    props.setSiteSearchData({ proRangeInput: inputRange });
  }

  /**
   * Function to set glycosylation evidence type value.
   * @param {string} value - input glycosylation evidence type value.
   **/
  const proAnnotationOnChange = value => {
    props.setSiteSearchData({ proAnnotation: value });
  };
  /**
   * Function to clear input field values.
   **/
  const clearSite = () => {
    props.setSiteSearchData({
      proteinId: "",
      siteId: "",
      proRangeInput: [
        Math.floor(props.initData.protein_mass.min).toLocaleString("en-US"),
        Math.ceil(props.initData.protein_mass.max).toLocaleString("en-US")
      ],
      proAnnotation: siteSearch.annotation.placeholderId
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
              inputValue={props.inputValue.proteinId}
              setInputValue={proteinIdChange}
              placeholder={siteSearch.uniprot_canonical_ac.placeholder}
              typeahedID={siteSearch.uniprot_canonical_ac.typeahedID}
              length={siteSearch.uniprot_canonical_ac.length}
              errorText={siteSearch.uniprot_canonical_ac.errorText}
            />
            {/* <ExampleExploreControl
              setInputValue={proteinIdChange}
              inputValue={siteSearch.uniprot_canonical_ac.examples}
            /> */}
          </FormControl>
        </Grid>

        {/* Site Id */}
        <Grid item xs={12} sm={10}>
          <FormControl fullWidth variant="outlined">
            <Typography className={"search-lbl"} gutterBottom>
              <HelpTooltip
                title={commonProteinData.site.tooltip.title}
                text={commonProteinData.site.tooltip.text}
                urlText={commonProteinData.site.tooltip.urlText}
                url={commonProteinData.site.tooltip.url}
              />
              {commonProteinData.site.name}
            </Typography>
            <MultilineAutoTextInput
              fullWidth
              inputValue={props.inputValue.siteId}
              setInputValue={siteIdChange}
              placeholder={siteSearch.site.placeholder}
              typeahedID={siteSearch.site.typeahedID}
              length={siteSearch.site.length}
              errorText={siteSearch.site.errorText}
            />
            <ExampleExploreControl
              setInputValue={siteIdChange}
              inputValue={siteSearch.site.examples}
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
              inputValue={props.inputValue.proAnnotation}
              placeholder={siteSearch.annotation.placeholder}
              placeholderId={siteSearch.annotation.placeholderId}
              placeholderName={siteSearch.annotation.placeholderName}
              menu={siteSearch.annotation.menu}
              setInputValue={proAnnotationOnChange}
            />
          </FormControl>
        </Grid>
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
  initData: PropTypes.object,
  inputValue: PropTypes.object,
  searchProteinAdvClick: PropTypes.func,
  setProAdvSearchData: PropTypes.func
};

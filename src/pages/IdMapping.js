import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import { axiosError } from "../data/axiosError";
import { getSystemData } from "../data";
import { Row } from "react-bootstrap";
import { Grid, Typography } from "@material-ui/core";
import { Container } from "react-bootstrap";
import HelpTooltip from "../components/tooltip/HelpTooltip";
import FormControl from "@material-ui/core/FormControl";
import SelectControl from "../components/select/SelectControl";
import "../css/Search.css";
import idMappingData from "../data/json/idMapping";
import stringConstants from "../data/json/stringConstants";
import Button from "react-bootstrap/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MultilineAutoTextInput from "../components/input/MultilineAutoTextInput";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormHelperText from "@material-ui/core/FormHelperText";

const IdMapping = (props) => {
  const [pageLoading, setPageLoading] = React.useState(true);

  useEffect(() => {
    setPageLoading(true);
    logActivity();
    getSystemData()
      .then((response) => {
        setPageLoading(false);
      })
      .catch(function (error) {
        let message = "home_init api call";
        axiosError(error, "", message, setPageLoading);
      });
  }, []);

  let commonIdMappingData = stringConstants.id_mapping.common;

  return (
    <React.Fragment>
      <Helmet>
        {getTitle("idMapping")}
        {getMeta("idMapping")}
      </Helmet>
      <div className="content-box-md">
        <div className="horizontal-heading text-center">
          <h5>{idMappingData.pageSubtitle}</h5>
          <h2>
            {idMappingData.pageTitle} <strong>{idMappingData.pageTitleBold}</strong>
          </h2>
        </div>
      </div>
      <Container className="id-mapping-content">
        <PageLoader pageLoading={pageLoading} />
        {/* 1 Select Molecule */}
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth variant="outlined">
            <Typography className={"search-lbl"} gutterBottom>
              <span>1.</span>{" "}
              <HelpTooltip
                title={commonIdMappingData.molecule.tooltip.title}
                text={commonIdMappingData.molecule.tooltip.text}
              />
              {commonIdMappingData.molecule.name}
            </Typography>
            <SelectControl placeholder={idMappingData.molecule.placeholder} />
          </FormControl>
        </Grid>
        {/* 2 */}
        <Grid container className="select-type">
          {/* From ID Type */}
          <Grid item xs={12} sm={12} md={5} className="pt-3">
            <FormControl fullWidth variant="outlined">
              <Typography className={"search-lbl"} gutterBottom>
                <span>2.</span>{" "}
                <HelpTooltip
                  title={commonIdMappingData.from_id_type.tooltip.title}
                  text={commonIdMappingData.from_id_type.tooltip.text}
                />
                {commonIdMappingData.from_id_type.name}
              </Typography>
              <SelectControl placeholder={idMappingData.from_id_type.placeholder} />
            </FormControl>
          </Grid>
          {/* To ID Type */}
          <Grid item xs={12} sm={12} md={5} className="pt-3">
            <FormControl fullWidth variant="outlined">
              <Typography className={"search-lbl"} gutterBottom>
                <HelpTooltip
                  title={commonIdMappingData.to_id_type.tooltip.title}
                  text={commonIdMappingData.to_id_type.tooltip.text}
                />
                {commonIdMappingData.to_id_type.name}
              </Typography>
              <SelectControl placeholder={idMappingData.to_id_type.placeholder} />
            </FormControl>
          </Grid>
        </Grid>
        {/* 3 Enter IDs */}
        <Grid item xs={12} sm={12} md={12} className="pt-3">
          <FormControl fullWidth variant="outlined">
            <Typography className={"search-lbl"} gutterBottom>
              <span>3.</span>{" "}
              <HelpTooltip
                title={commonIdMappingData.id_entry.tooltip.title}
                text={commonIdMappingData.id_entry.tooltip.text}
              />
              {commonIdMappingData.id_entry.name}
            </Typography>
            <OutlinedInput
              fullWidth
              multiline
              rows="6"
              classes={{
                option: "auto-option",
                inputRoot: "auto-input-root",
                input: "input-auto",
              }}
              placeholder={idMappingData.id_entry.placeholder}
            ></OutlinedInput>
          </FormControl>
        </Grid>
        {/* Select Files */}
        <Grid className="pt-2">
          <Typography className="mb-1">
            <strong>{idMappingData.file_selection.upload_text}</strong>
          </Typography>
          {/* Text file dropdown */}
          <Grid item xs={12} sm={12} md={5}>
            <FormControl fullWidth variant="outlined">
              <SelectControl placeholder={idMappingData.file_selection.placeholder} />
            </FormControl>
          </Grid>
        </Grid>
        {/* Browse Files */}
        <Grid container className="pt-2">
          <Button className="gg-btn-outline mr-4">Browse</Button>
          <Typography>{idMappingData.file_selection.no_file_selected}</Typography>
        </Grid>
        {/*  Buttons */}
        <Grid item xs={12} sm={12}>
          <Row className="gg-align-center pt-5">
            <Button className="gg-btn-outline mr-4">Clear Fields</Button>
            <Button className="gg-btn-blue">Submit</Button>
          </Row>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default IdMapping;

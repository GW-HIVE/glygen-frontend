import React, { useEffect, useState, useReducer } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { logActivity } from "../data/logging";
import PageLoader from "../components/load/PageLoader";
import { axiosError } from "../data/axiosError";
import { getMappingInit, getMappingSearch, getMappingList } from "../data/mapping";
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
import FormHelperText from "@material-ui/core/FormHelperText";
import routeConstants from "../data/json/routeConstants";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DialogAlert from "../components/alert/DialogAlert";
import TextAlert from "../components/alert/TextAlert";
import { Col } from "react-bootstrap";

const IdMapping = (props) => {
  let { id } = useParams("");
  // let { category } = useParams("");
  const [initData, setInitData] = useState({});
  const [idMapFileSelect, setIdMapFileSelect] = useState("any");
  const [idMapSearchData, setIdMapSearchData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      recordType: "any",
      inputNamespace: "any",
      outputNamespace: "any",
      inputIdlist: "",
      idMapSearchValError: [false, false, false, false],
    }
  );
  const [idMapCategoryMapped, setIdMapCategoryMapped] = useState("any");
  const [idMapCategoryUnmapped, setIdMapCategoryUnmapped] = useState("any");

  const [moleculeValidated, setMoleculeValidated] = useState(false);
  const [fromIdTypeValidated, setFromIdTypeValidated] = useState(false);
  const [toIdTypeValidated, setToIdTypeValidated] = useState(false);
  const [enterIdValidated, setEnterIdValidated] = useState(false);
  const [fileSelectValidated, setFileSelectValidated] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  const [pageLoading, setPageLoading] = React.useState(true);
  const [alertTextInput, setAlertTextInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );

  let idMapData = stringConstants.id_mapping;
  let commonIdMappingData = stringConstants.id_mapping.common;

  const idMapRecordTypeOnChange = (value) => {
    setIdMapSearchData({ recordType: value });
    idMapInputNamespaceOnChange("any");
    idMapOutputNamespaceOnChange("any");
  };

  const idMapInputNamespaceOnChange = (value) => {
    setIdMapSearchData({ inputNamespace: value });
  };
  const idMapOutputNamespaceOnChange = (value) => {
    setIdMapSearchData({ outputNamespace: value });
  };
  const idMapInputIdlistOnChange = (event) => {
    setIdMapSearchData({ inputIdlist: event.target.value });
  };
  const idMapFileSelectOnChange = (value) => {
    setIdMapFileSelect(value);
  };

  const clearMapFields = () => {
    setIdMapSearchData({
      recordType: "any",
      inputNamespace: "any",
      outputNamespace: "any",
      inputIdlist: "",
      idMapSearchValError: [false, false, false, false],
    });

    setIdMapFileSelect("any");
    setFormValidated(false);
    setMoleculeValidated(false);
    setFromIdTypeValidated(false);
    setToIdTypeValidated(false);
    setEnterIdValidated(false);
    setFileSelectValidated(false);
  };

  useEffect(() => {
    setPageLoading(true);
    logActivity();
    document.addEventListener("click", () => {
      setAlertTextInput({ show: false });
    });
    getMappingInit()
      .then((response) => {
        let initData = response.data;
        setInitData(initData);
        // if (id === undefined) setPageLoading(false);
        id &&
          getMappingList(id)
            .then(({ data }) => {
              logActivity("user", id, "Search modification initiated");
              // if (
              //   data.category === idMapData.category_mapped.name) {
              //   setIdMapCategoryMapped(data.category)
              //   }
              // )
            })
            .catch(function (error) {
              let message = "list api call";
              axiosError(error, "", message, setPageLoading, setAlertDialogInput);
            });
      })
      .catch(function (error) {
        let message = "search_init api call";
        axiosError(error, "", message, setPageLoading, setAlertDialogInput);
      });
  }, [id]);

  function searchJson(
    input_recordtype,
    input_inputnamespace,
    input_outputnamespace,
    input_inputidlist
  ) {
    var selected_recordtype = undefined;
    // line below means that if glycan/protein !== "any" then glycan/protein is selected
    if (input_recordtype && input_recordtype.id !== idMappingData.recordtype.placeholderId) {
      selected_recordtype = {
        id: input_recordtype.id,
        name: input_recordtype.label,
      };
    }
    var formJson = {
      [commonIdMappingData.recordtype.id]: selected_recordtype,
      [commonIdMappingData.input_namespace.id]: input_inputnamespace,
      [commonIdMappingData.output_namespace.id]: input_outputnamespace,
      [commonIdMappingData.input_idlist.id]: input_inputidlist ? input_inputidlist : undefined,
    };
    return formJson;
  }

  const handleSubmit = (e) => {
    console.log("submit");
    // e.preventDefault();
    alert("alert");
    let formObject = searchJson(
      idMapSearchData.recordType,
      idMapSearchData.inputNamespace,
      idMapSearchData.outputNamespace,
      idMapSearchData.inputIdlist
    );
    logActivity("user", id, "Performing ID Mapping Search");
    let message = "ID Mapping Search query=" + JSON.stringify(formObject);
    getMappingSearch(formObject)
      .then((response) => {
        if (response.data["list_id"] !== "") {
          logActivity("user", (id || "") + ">" + response.data["list_id"], message).finally(() => {
            props.history.push(routeConstants.idMappingResult + response.data["list_id"]);
          });
          setPageLoading(false);
        } else {
          logActivity("user", "", "No results. " + message);
          setPageLoading(false);
          setAlertTextInput({
            show: true,
            id: stringConstants.errors.idMappingError.id,
          });
          window.scrollTo(0, 0);
        }
      })
      .catch(function (error) {
        axiosError(error, "", message, setPageLoading, setAlertDialogInput);
      });
    // setIdMapMolecule("any");
    // setIdMapFromIdType("any");
    // setIdMapToIdType("any");
    // setIdMapEnterId("");
    // setIdMapFileSelect("any");
    setFormValidated(false);
    setMoleculeValidated(false);
    setFromIdTypeValidated(false);
    setToIdTypeValidated(false);
    setEnterIdValidated(false);
    setFileSelectValidated(false);
  };
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
        <DialogAlert
          alertInput={alertDialogInput}
          setOpen={(input) => {
            setAlertDialogInput({ show: input });
          }}
        />
        <TextAlert alertInput={alertTextInput} />
        {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
        {/* 1 recordtype Select Molecule */}
        <Grid item xs={12} sm={12} md={12}>
          <FormControl
            fullWidth
            variant="outlined"
            // error={(formValidated || moleculeValidated) && idMapSearchData.recordType === "any"}
          >
            <Typography className={"search-lbl"} gutterBottom>
              <span>1.</span>{" "}
              <HelpTooltip
                title={commonIdMappingData.recordtype.tooltip.title}
                text={commonIdMappingData.recordtype.tooltip.text}
              />
              {commonIdMappingData.recordtype.name}
            </Typography>
            <SelectControl
              placeholder={idMappingData.recordtype.placeholder}
              placeholderId={idMappingData.recordtype.placeholderId}
              placeholderName={idMappingData.recordtype.placeholderName}
              inputValue={idMapSearchData.recordType}
              setInputValue={idMapRecordTypeOnChange}
              onBlur={() => setMoleculeValidated(true)}
              menu={Object.keys(initData).map((moleculeType) => {
                return {
                  id: initData[moleculeType].id,
                  name: initData[moleculeType].label,
                };
              })}
              required={true}
            />
          </FormControl>
          {(formValidated || moleculeValidated) && idMapSearchData.recordType === "any" && (
            <FormHelperText className={"error-text"} error>
              {idMappingData.recordtype.required}
            </FormHelperText>
          )}
        </Grid>
        {/* 2 */}
        <Grid container className="select-type">
          {/* input_namespace From ID Type */}
          <Grid item xs={12} sm={12} md={5} className="pt-3">
            <FormControl
              fullWidth
              variant="outlined"
              // error={
              //   (formValidated || fromIdTypeValidated) && idMapSearchData.inputNamespace === "any"
              // }
            >
              <Typography className={"search-lbl"} gutterBottom>
                <span>2.</span>{" "}
                <HelpTooltip
                  title={commonIdMappingData.input_namespace.tooltip.title}
                  text={commonIdMappingData.input_namespace.tooltip.text}
                />
                {commonIdMappingData.input_namespace.name}
              </Typography>
              <SelectControl
                placeholder={idMappingData.input_namespace.placeholder}
                placeholderId={idMappingData.input_namespace.placeholderId}
                placeholderName={idMappingData.input_namespace.placeholderName}
                inputValue={idMapSearchData.inputNamespace}
                setInputValue={idMapInputNamespaceOnChange}
                onBlur={() => setFromIdTypeValidated(true)}
                menu={
                  idMapSearchData.recordType === "any"
                    ? []
                    : initData[idMapSearchData.recordType].namespace.map((fromId) => {
                        return {
                          id: fromId,
                          name: fromId,
                        };
                      })
                }
                required={true}
              />
            </FormControl>
            {(formValidated || fromIdTypeValidated) && idMapSearchData.inputNamespace === "any" && (
              <FormHelperText className={"error-text"} error>
                {idMappingData.input_namespace.required}
              </FormHelperText>
            )}
          </Grid>
          {/* output_namespace To ID Type */}
          <Grid item xs={12} sm={12} md={5} className="pt-3">
            <FormControl
              fullWidth
              variant="outlined"
              // error={
              //   (formValidated || toIdTypeValidated) && idMapSearchData.outputNamespace === "any"
              // }
            >
              <Typography className={"search-lbl"} gutterBottom>
                <HelpTooltip
                  title={commonIdMappingData.output_namespace.tooltip.title}
                  text={commonIdMappingData.output_namespace.tooltip.text}
                />
                {commonIdMappingData.output_namespace.name}
              </Typography>
              <SelectControl
                placeholder={idMappingData.output_namespace.placeholder}
                placeholderId={idMappingData.output_namespace.placeholderId}
                placeholderName={idMappingData.output_namespace.placeholderName}
                inputValue={idMapSearchData.outputNamespace}
                setInputValue={idMapOutputNamespaceOnChange}
                onBlur={() => setToIdTypeValidated(true)}
                menu={
                  idMapSearchData.recordType === "any"
                    ? []
                    : initData[idMapSearchData.recordType].namespace.map((toId) => {
                        return {
                          id: toId,
                          name: toId,
                        };
                      })
                }
                required={true}
              />
            </FormControl>
            {(formValidated || toIdTypeValidated) && idMapSearchData.outputNamespace === "any" && (
              <FormHelperText className={"error-text"} error>
                {idMappingData.output_namespace.required}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        {/* 3 Enter IDs */}
        <Grid item xs={12} sm={12} md={12} className="pt-3">
          <FormControl fullWidth variant="outlined">
            <Typography className={"search-lbl"} gutterBottom>
              <span>3.</span>{" "}
              <HelpTooltip
                title={commonIdMappingData.input_idlist.tooltip.title}
                text={commonIdMappingData.input_idlist.tooltip.text}
              />
              {commonIdMappingData.input_idlist.name}
            </Typography>
            <OutlinedInput
              fullWidth
              multiline
              rows="6"
              required={true}
              classes={{
                option: "auto-option",
                inputRoot: "auto-input-root",
                input: "input-auto",
              }}
              placeholder={idMappingData.input_idlist.placeholder}
              value={idMapSearchData.inputIdlist}
              onChange={idMapInputIdlistOnChange}
              onBlur={() => setEnterIdValidated(true)}
              // error={
              //   idMapSearchData.inputIdlist.length > idMappingData.input_idlist.length ||
              //   ((formValidated || enterIdValidated) &&
              //     idMapSearchData.inputIdlist === "" &&
              //     idMapFileSelect === "any")
              // }
            ></OutlinedInput>
            {idMapSearchData.inputIdlist.length > idMappingData.input_idlist.length && (
              <FormHelperText className={"error-text"} error>
                {idMappingData.input_idlist.errorText}
              </FormHelperText>
            )}
            {(formValidated || enterIdValidated) &&
              idMapSearchData.inputIdlist === "" &&
              idMapFileSelect === "any" && (
                <FormHelperText className={"error-text"} error>
                  {idMappingData.input_idlist.required}
                </FormHelperText>
              )}
          </FormControl>
        </Grid>
        {/* Select Files */}
        <Grid className="pt-2">
          <Typography className="mb-1">
            <strong>{idMappingData.file_selection.upload_text}</strong>
          </Typography>
          {/* Text file dropdown */}
          <Grid item xs={12} sm={12} md={5}>
            <FormControl
              fullWidth
              variant="outlined"
              // error={
              //   (formValidated || fileSelectValidated) &&
              //   idMapFileSelect === "any" &&
              //   idMapSearchData.inputIdlist !== ""
              // }
            >
              <SelectControl
                placeholder={idMappingData.file_selection.placeholder}
                placeholderId={idMappingData.file_selection.placeholderId}
                placeholderName={idMappingData.file_selection.placeholderName}
                inputValue={idMapFileSelect}
                setInputValue={idMapFileSelectOnChange}
              />
            </FormControl>
            {/* {(formValidated || fileSelectValidated) &&
                idMapFileSelect === "any" &&
                idMapSearchData.inputIdlist !== "" && (
                  <FormHelperText className={"error-text"} error>
                    {idMappingData.file_selection.required}
                  </FormHelperText>
                )} */}
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
            <Button className="gg-btn-outline mr-4" onClick={clearMapFields}>
              Clear Fields
            </Button>
            {/* <Link to={routeConstants.idMappingResult}> */}
            <Link to={`${routeConstants.idMappingResult}${id}`}>
              <Button
                className="gg-btn-blue"
                // onClick={() => setFormValidated(true)}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Link>
          </Row>
        </Grid>
        {/* </form> */}
        <Row>
          <Col>
            <p className="text-muted mt-2">
              <strong>*</strong> These fields are required.
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default IdMapping;

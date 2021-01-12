import React, { useEffect, useState, useReducer } from "react";
import Helmet from "react-helmet";
import { getTitle, getMeta } from "../utils/head";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import SelectControl from "../components/select/SelectControl";
import HelpTooltip from "../components/tooltip/HelpTooltip";
import PageLoader from "../components/load/PageLoader";
import DialogAlert from "../components/alert/DialogAlert";
import TextAlert from "../components/alert/TextAlert";
import "../css/Search.css";
import { logActivity } from "../data/logging";
import { axiosError } from "../data/axiosError";
import idMappingData from "../data/json/idMapping";
import stringConstants from "../data/json/stringConstants";
import routeConstants from "../data/json/routeConstants";
import { getMappingInit, getMappingSearch, getMappingList } from "../data/mapping";

const IdMapping = (props) => {
  let { id } = useParams("");
  const [initData, setInitData] = useState({});

  // const [idMapFileSelect, setIdMapFileSelect] = useState("any");
  const [idMapSearchData, setIdMapSearchData] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      recordType: "any",
      inputNamespace: "any",
      outputNamespace: "any",
      inputIdlist: "",
      fileUpload: "any",
    }
  );

  const [fileUpload, setFileUpload] = useState(null);
  const [errorFileUpload, setErrorFileUpload] = useState(null);

  const [moleculeValidated, setMoleculeValidated] = useState(false);
  const [fromIdTypeValidated, setFromIdTypeValidated] = useState(false);
  const [toIdTypeValidated, setToIdTypeValidated] = useState(false);
  const [inputIdListValidated, setInputIdListValidated] = useState(false);
  const [fileUploadValidated, setFileUploadValidated] = useState(false);
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

  // let idMapData = stringConstants.id_mapping;
  let commonIdMappingData = stringConstants.id_mapping.common;

  /**
   * Function to set recordtype (molecule) name value.
   * @param {string} value - input recordtype (molecule) name value.
   **/
  const recordTypeOnChange = (value) => {
    setIdMapSearchData({ recordType: value });
    inputNamespaceOnChange("any");
    outputNamespaceOnChange("any");
  };
  /**
   * Function to set inputNamespace (From ID Type) name value.
   * @param {string} value - input inputNamespace (From ID Type) name value.
   **/
  const inputNamespaceOnChange = (value) => {
    setIdMapSearchData({ inputNamespace: value });
  };
  /**
   * Function to set outputNamespace (To ID Type) name value.
   * @param {string} value - input outputNamespace (To ID Type) name value.
   **/
  const outputNamespaceOnChange = (value) => {
    setIdMapSearchData({ outputNamespace: value });
  };
  /**
   * Function to set inputIdlist (Enter IDs) name value.
   * @param {string} value - input inputIdlist (Enter IDs) name value.
   **/
  const inputIdlistOnChange = (event) => {
    setIdMapSearchData({ inputIdlist: event.target.value });
  };
  /**
   * Function to set fileUpload (Select File) name value.
   * @param {string} value - input fileUpload (Select File) name value.
   **/
  const fileUploadOnChange = (event) => {
    setIdMapSearchData({ fileUpload: event.target.value });
  };

  const clearMapFields = () => {
    setIdMapSearchData({
      recordType: "any",
      inputNamespace: "any",
      outputNamespace: "any",
      inputIdlist: "",
      fileUpload: "any",
    });

    // setIdMapFileSelect("any");
    setFormValidated(false);
    setMoleculeValidated(false);
    setFromIdTypeValidated(false);
    setToIdTypeValidated(false);
    setInputIdListValidated(false);
    setFileUploadValidated(false);
  };
  /**
   * useEffect for retriving data from api and showing page loading effects.
   */
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
        if (id === undefined) setPageLoading(false);
        id &&
          getMappingList(id)
            .then(({ data }) => {
              logActivity("user", id, "Search modification initiated");
              setIdMapSearchData({
                recordType:
                  data.cache_info.query.recordtype === undefined
                    ? "any"
                    : data.cache_info.query.recordtype,
                inputNamespace:
                  data.cache_info.query.input_namespace === undefined
                    ? "any"
                    : data.cache_info.query.input_namespace,
                outputNamespace:
                  data.cache_info.query.output_namespace === undefined
                    ? "any"
                    : data.cache_info.query.output_namespace,
                inputIdlist:
                  data.cache_info.query.input_idlist === undefined
                    ? ""
                    : data.cache_info.query.input_idlist,
                // fileUpload:
                //   data.cache_info.query.input_idlist === undefined
                //     ? "any"
                //     : data.cache_info.query.input_idlist,
              });
              setPageLoading(false);
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
    input_inputidlist,
    input_fileupload
  ) {
    if (input_inputidlist) {
      input_inputidlist = input_inputidlist.trim();
      input_inputidlist = input_inputidlist.replace(/\u200B/g, "");
      input_inputidlist = input_inputidlist.replace(/\u2011/g, "-");
      input_inputidlist = input_inputidlist + ",";
      input_inputidlist = input_inputidlist.replace(/\s+/g, ",");
      input_inputidlist = input_inputidlist.replace(/,+/g, ",");

      var index = input_inputidlist.lastIndexOf(",");
      if (index > -1 && index + 1 === input_inputidlist.length) {
        input_inputidlist = input_inputidlist.substr(0, index);
      }
    }
    // var selected_recordtype = undefined;
    // line below means that if glycan/protein !== "any" then glycan/protein is selected
    // if (input_recordtype && input_recordtype.id !== idMappingData.recordtype.placeholderId) {
    //   selected_recordtype = {
    //     id: input_recordtype.id,
    //     name: input_recordtype.label,
    //   };
    // }
    var formJson = {
      [commonIdMappingData.recordtype.id]: input_recordtype,
      [commonIdMappingData.input_namespace.id]: input_inputnamespace,
      [commonIdMappingData.output_namespace.id]: input_outputnamespace,
      [commonIdMappingData.input_idlist.id]:
        (input_inputidlist ? input_inputidlist : undefined) ||
        (input_fileupload ? input_fileupload : undefined),
      // [commonIdMappingData.input_idlist.id]: input_fileupload ? input_fileupload : undefined,
    };
    return formJson;
  }

  const idMapHandleSubmit = () => {
    let formObject = searchJson(
      idMapSearchData.recordType,
      idMapSearchData.inputNamespace,
      idMapSearchData.outputNamespace,
      idMapSearchData.inputIdlist,
      idMapSearchData.fileUpload
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
          // console.log("submit");
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
    setFormValidated(false);
    setMoleculeValidated(false);
    setFromIdTypeValidated(false);
    setToIdTypeValidated(false);
    setInputIdListValidated(false);
    setFileUploadValidated(false);
  };

  /**
   * Function to handle click event for protein advanced search.
   **/
  const searchIdMapClick = () => {
    setPageLoading(true);
    idMapHandleSubmit();
    setFormValidated(true);
  };

  const typesFileUpload = [
    "text/plain",
    // "text/rtf",
    // "application/pdf",
    // "application/msword",
    // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleChangeFileUpload = (e) => {
    let selected = e.target.files[0];

    if (selected && typesFileUpload.includes(selected.type)) {
      // setFile(selected);
      setErrorFileUpload("");
    } else {
      setFileUpload(null);
      setErrorFileUpload("Please select accepted file type (.txt)");
    }
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
        {/* <form autoComplete="off" onSubmit={idMapHandleSubmit}> */}
        {/* 1 recordtype Select Molecule */}
        <Grid item xs={12} sm={12} md={12}>
          <FormControl
            fullWidth
            variant="outlined"
            error={(formValidated || moleculeValidated) && idMapSearchData.recordType === "any"}
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
              setInputValue={recordTypeOnChange}
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
        {/* 2 From ID / To ID */}
        <Grid container className="select-type">
          {/* input_namespace From ID Type */}
          <Grid item xs={12} sm={12} md={5} className="pt-3">
            <FormControl
              fullWidth
              variant="outlined"
              error={
                (formValidated || fromIdTypeValidated) && idMapSearchData.inputNamespace === "any"
              }
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
                setInputValue={inputNamespaceOnChange}
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
              error={
                (formValidated || toIdTypeValidated) && idMapSearchData.outputNamespace === "any"
              }
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
                setInputValue={outputNamespaceOnChange}
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
              onChange={inputIdlistOnChange}
              onBlur={() => setInputIdListValidated(true)}
              error={
                idMapSearchData.inputIdlist.length > idMappingData.input_idlist.length ||
                ((formValidated || inputIdListValidated) &&
                  idMapSearchData.inputIdlist === "" &&
                  idMapSearchData.fileUpload === "any")
              }
            ></OutlinedInput>
            {idMapSearchData.inputIdlist.length > idMappingData.input_idlist.length && (
              <FormHelperText className={"error-text"} error>
                {idMappingData.input_idlist.errorText}
              </FormHelperText>
            )}
            {(formValidated || inputIdListValidated) &&
              idMapSearchData.inputIdlist === "" &&
              idMapSearchData.fileUpload === "any" && (
                <FormHelperText className={"error-text"} error>
                  {idMappingData.input_idlist.required}
                </FormHelperText>
              )}
          </FormControl>
          <Typography>91859018,91845230,91845682,439177,XYZ</Typography>
          <Typography>91846235, 252277270, 11375554, 252288623, 91857678, 252290930</Typography>
          <Typography>5288428 252293186 91859643 252293273 5288347 252294787</Typography>
          <Typography>G00023MO G00023MO G00024MO G00024MO G00025AJ G00025AJ</Typography>
        </Grid>
        {/* Select Files */}
        <Grid className="pt-2">
          <Typography className="mb-1">
            <strong>OR</strong>
          </Typography>
          <Typography className="mb-1">
            <strong>{idMappingData.file_upload.upload_text}</strong>
          </Typography>
          {/* Text file dropdown */}
          {/* <Grid item xs={12} sm={12} md={5}>
            <FormControl
              fullWidth
              variant="outlined"
              // error={
              //   (formValidated || fileUploadValidated) &&
              //   idMapSearchData.fileUpload === "any" &&
              //   idMapSearchData.inputIdlist !== ""
              // }
            >
              <SelectControl
                placeholder={idMappingData.file_upload.placeholder}
                placeholderId={idMappingData.file_upload.placeholderId}
                placeholderName={idMappingData.file_upload.placeholderName}
                inputValue={idMapSearchData.fileUpload}
                setInputValue={fileUploadOnChange}
              />
            </FormControl> */}
          {/* {(formValidated || fileUploadValidated) &&
              idMapSearchData.fileUpload === "any" &&
              idMapSearchData.inputIdlist !== "" && (
                <FormHelperText className={"error-text"} error>
                  {idMappingData.file_upload.required}
                </FormHelperText>
              )} */}
          {/* </Grid> */}
        </Grid>

        {/* <UploadForm /> */}
        <form
          value={idMapSearchData.fileUpload}
          onChange={fileUploadOnChange}
          onBlur={() => setFileUploadValidated(true)}
          error={
            (formValidated || fileUploadValidated) &&
            idMapSearchData.fileUpload === "any" &&
            idMapSearchData.inputIdlist !== ""
          }
        >
          <label>
            <input className="mt-2" type="file" onChange={handleChangeFileUpload} />
          </label>
          <div className="output">
            {errorFileUpload && (
              <div className="error" style={{ color: "red" }}>
                {errorFileUpload}
              </div>
            )}
            {fileUpload && <div>{fileUpload.name}</div>}
          </div>
        </form>
        {(formValidated || fileUploadValidated) &&
          idMapSearchData.fileUpload === "any" &&
          idMapSearchData.inputIdlist !== "" && (
            <FormHelperText className={"error-text"} error>
              {idMappingData.file_upload.required}
            </FormHelperText>
          )}
        <Typography>
          <i>Accepted File Type: .txt</i>
          {/* <i>Accepted File Types: .txt, .rtf, .pdf, .doc, .docx</i> */}
        </Typography>
        {/*  Buttons */}
        <Grid item xs={12} sm={12}>
          <Row className="gg-align-center pt-5">
            <Button className="gg-btn-outline mr-4" onClick={clearMapFields}>
              Clear Fields
            </Button>
            <Button className="gg-btn-blue" onClick={searchIdMapClick}>
              Submit
            </Button>
          </Row>
        </Grid>
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

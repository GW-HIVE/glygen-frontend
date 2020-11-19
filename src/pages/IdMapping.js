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

const IdMapping = (props) => {
  let { id } = useParams("");
  const [initData, setInitData] = useState({});
  const [idMapMolecule, setIdMapMolecule] = useState("any");
  const [idMapFromIdType, setIdMapFromIdType] = useState("any");
  const [idMapToIdType, setIdMapToIdType] = useState("any");
  const [idMapEnterId, setIdMapEnterId] = useState("");
  const [idMapFileSelect, setIdMapFileSelect] = useState("any");

  const [pageLoading, setPageLoading] = React.useState(true);
  const [alertTextInput, setAlertTextInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );
  const [alertDialogInput, setAlertDialogInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: false, id: "" }
  );

  let commonIdMappingData = stringConstants.id_mapping.common;

  const idMapMoleculeOnChange = (value) => {
    setIdMapMolecule(value);
    idMapFromIdTypeOnChange("any");
    idMapToIdTypeOnChange("any");
  };
  const idMapFromIdTypeOnChange = (value) => {
    setIdMapFromIdType(value);
  };
  const idMapToIdTypeOnChange = (value) => {
    setIdMapToIdType(value);
  };
  const idMapEnterIdOnChange = (event) => {
    setIdMapEnterId(event.target.value);
  };
  const idMapFileSelectOnChange = (value) => {
    setIdMapFileSelect(value);
  };
  // const SequenceChange = (event) => {
  //   let valArr = props.inputValue.proAdvSearchValError;
  //   valArr[6] = event.target.value.length > advancedSearch.sequence.length;
  //   props.setProAdvSearchData({ proSequence: event.target.value, proAdvSearchValError: valArr });
  // };
  const clearMapFields = () => {
    setIdMapMolecule("any");
    setIdMapFromIdType("any");
    setIdMapToIdType("any");
    setIdMapEnterId("");
    setIdMapFileSelect("any");
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
        if (id === undefined) setPageLoading(false);
        id &&
          getMappingList(id, 1)
            .then(({ data }) => {
              logActivity("user", id, "Search modification initiated");
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
    if (input_recordtype && input_recordtype.id !== idMappingData.molecule.placeholderId) {
      selected_recordtype = {
        id: input_recordtype.id,
        name: input_recordtype.label,
      };
    }
    var formJson = {
      [commonIdMappingData.molecule.id]: selected_recordtype,
      [commonIdMappingData.from_id_type.id]: input_inputnamespace,
      [commonIdMappingData.to_id_type.id]: input_outputnamespace,
      [commonIdMappingData.id_entry.id]: input_inputidlist ? input_inputidlist : undefined,
    };
    return formJson;
  }

  const idMapSearchOnClick = () => {
    let formObject = searchJson();
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
            <SelectControl
              placeholder={idMappingData.molecule.placeholder}
              placeholderId={idMappingData.molecule.placeholderId}
              placeholderName={idMappingData.molecule.placeholderName}
              inputValue={idMapMolecule}
              setInputValue={idMapMoleculeOnChange}
              menu={Object.keys(initData).map((moleculeType) => {
                return {
                  id: initData[moleculeType].id,
                  name: initData[moleculeType].label,
                };
              })}
              // required={true}
            />
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
              <SelectControl
                placeholder={idMappingData.from_id_type.placeholder}
                placeholderId={idMappingData.from_id_type.placeholderId}
                placeholderName={idMappingData.from_id_type.placeholderName}
                inputValue={idMapFromIdType}
                setInputValue={idMapFromIdTypeOnChange}
                menu={
                  idMapMolecule === "any"
                    ? []
                    : initData[idMapMolecule].namespace.map((fromId) => {
                        return {
                          id: fromId,
                          name: fromId,
                        };
                      })
                }
                // required={true}
              />
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
              <SelectControl
                placeholder={idMappingData.to_id_type.placeholder}
                placeholderId={idMappingData.to_id_type.placeholderId}
                placeholderName={idMappingData.to_id_type.placeholderName}
                inputValue={idMapToIdType}
                setInputValue={idMapToIdTypeOnChange}
                menu={
                  idMapMolecule === "any"
                    ? []
                    : initData[idMapMolecule].namespace.map((toId) => {
                        return {
                          id: toId,
                          name: toId,
                        };
                      })
                }
                // required={true}
              />
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
              // required={true}
              classes={{
                option: "auto-option",
                inputRoot: "auto-input-root",
                input: "input-auto",
              }}
              placeholder={idMappingData.id_entry.placeholder}
              value={idMapEnterId}
              onChange={idMapEnterIdOnChange}
              error={idMapEnterId.length > idMappingData.id_entry.length}
            ></OutlinedInput>
            {idMapEnterId.length > idMappingData.id_entry.length && (
              <FormHelperText className={"error-text"} error>
                {idMappingData.id_entry.errorText}
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
            <FormControl fullWidth variant="outlined">
              <SelectControl
                placeholder={idMappingData.file_selection.placeholder}
                placeholderId={idMappingData.file_selection.placeholderId}
                placeholderName={idMappingData.file_selection.placeholderName}
                inputValue={idMapFileSelect}
                setInputValue={idMapFileSelectOnChange}
              />
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
            <Button className="gg-btn-outline mr-4" onClick={clearMapFields}>
              Clear Fields
            </Button>
            {/* <Button className="gg-btn-blue">Submit</Button> */}
            <Link to={routeConstants.idMappingResult}>
              {" "}
              <Button className="gg-btn-blue" onClick={idMapSearchOnClick}>
                Submit
              </Button>
            </Link>
          </Row>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default IdMapping;

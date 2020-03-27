import React from "react";
import MultilineAutoTextInput from "../components/input/MultilineAutoTextInput";
import RangeInputSlider from "../components/input/RangeInputSlider";
import AutoTextInput from "../components/input/AutoTextInput";
import MultiselectTextInput from "../components/input/MultiselectTextInput";
import CompositionSearchControl from "../components/input/CompositionSearchControl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { getJson } from "../data/api";
import compositionSearchData from '../data/json/compositionSearch';


import {
  Component,
  Tab,
  Tabs,
  Form,
  Container,
  Col,
  Row,
  NavLink
} from "react-bootstrap";
import { useParams } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import "../css/Search.css";

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  label: {
    fontSize: 16
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    // margin: theme.spacing(2)
    marginBottom: 16,
    width: 700
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 16,
    // marginRight: 16,
    marginLeft: 16,
    backgroundColor: "#2f78b7"
  },
  clearButton: {
    marginTop: 16,
    marginBottom: 16,
    // marginRight: 16,
    marginLeft: 16,
    backgroundColor: "#fff",
    borderColor: "#337ab7",
    color: "#337ab7"
  },
  marginButToolbar: {
    justifyContent: "flex-end",
    // marginRight: 0,
    width: 700
  },
  marginButToolbarCompoSearch: {
    justifyContent: "center",
    // marginRight: 0,
    // width: 920
  },
  marginLeft: {
    justifyContent: "flex-end"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 200
  },
  form1: {
    width: 770
  },
  label5: {
    fontSize: 16,
    width: "100px",
    height: "18px"
  },
  label: {
    fontSize: 16,
    width: "100px",
    height: "18px",
    shrink: false
  },
  label1: {
    fontSize: "14px",
    color: "#4A4A4A",
    fontWeight: "bold",
    marginLeft: -27
    // height: "25px"
  },
  label4: {
    fontSize: "15px",
    color: "#4A4A4A",
    fontWeight: "bold"
    // height: "25px"
  },
  label2: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#4A4A4A"
  },
  label3: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    width: "700px",
    height: "34px"
  },
  inputt: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    width: "700px",
    height: "10px"
  },
  input1: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    width: "700px",
    height: "74px"
  },
  tab: {
    borderRadius: 4,
    borderColor: "#80bdff",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    width: "1000px",
    height: "1150px",
    alignItems: "center",
    fontColor: "#2F78B7"
  },
  tabCompostionSearch: {
    borderRadius: 4,
    borderColor: "#80bdff",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    width: "1000px",
    height: "900px",
    alignItems: "center",
    fontColor: "#2F78B7"
  },
  headerTitle: {
    color: "#2F78B7",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "10px",
    fontWeight: "bold"
  },
  con: {
    width: "730px",
    height: "1100px",
    alignItems: "center"
  },
  con1: {
    width: "1000px",
    height: "1150px",
    alignItems: "left",
    marginBottom: "80px"
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120
  },
  select: {
    width: "200px",
    height: "34px"
  },
  select1: {
    width: "700px",
    height: "34px"
  },
  col1: {
    margin: 0,
    width: "25px"
  },
  row1: {
    margin: 0,
    marginRight: 15,
    width: "25px"
  },
  help1: {
    lineWidth: 1
  },
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    // fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  },
  helpicon: {
    fontSize: "18px",
    marginRight: 8
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  root1: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const GlycanSearch = props => {
  let { id } = useParams();
  const [initData, setInitData] = React.useState({});
  const classes = useStyles();

  const [glycanId, setGlycanId] = React.useState("");
  const [glyMassType, setGlyMassType] = React.useState("Native");
  const [glyMass, setGlyMass] = React.useState([149, 6751]);
  const [glyMassRange, setGlyMassRange] = React.useState([149, 6751]);
  const [glyNumSugars, setGlyNumSugars] = React.useState([1, 37]);
  const [glyNumSugarsRange, setGlyNumSugarsRange] = React.useState([1, 37]);
  const [glyOrganisms, setGlyOrganisms] = React.useState([]);
  const [glyOrgOperation, setGlyOrgOperation] = React.useState("or");
  const [glyType, setGlyType] = React.useState("");
  const [glySubType, setGlySubType] = React.useState("");
  const [glyProt, setGlyProt] = React.useState("");
  const [glyMotif, setGlyMotif] = React.useState("");
  const [glyBioEnz, setGlyBioEnz] = React.useState("");
  const [glyPubId, setGlyPubId] = React.useState("");
  const [glySubTypeIsHidden, setGlySubTypeIsHidden] = React.useState(true);

  function glyOrgChange(org) {
    setGlyOrganisms(org);
  }

  function glyNumSugarsChange(sugars) {
    setGlyNumSugars(sugars);
  }
  function glyMassChange(glyMass) {
    setGlyMass(glyMass);
  }

  const glyOrgOperationOnChange = event => {
    setGlyOrgOperation(event.target.value);
  };
  const glyMassTypeOnChange = event => {
    setGlyMassType(event.target.value);
    setMassValues(event.target.value, glyMass);
  };

  const setMassValues = (massType, massValues) => {
    var perMet_mass_min = Math.floor(initData.glycan_mass.permethylated.min);
    var perMet_mass_max = Math.ceil(initData.glycan_mass.permethylated.max);
    var native_mass_min,
      minRange,
      minval = Math.floor(initData.glycan_mass.native.min);
    var native_mass_max,
      maxRange,
      maxval = Math.ceil(initData.glycan_mass.native.max);
    var mass_type_native = initData.glycan_mass.native.name;
    native_mass_min = minRange = minval;
    native_mass_max = maxRange = maxval;

    if (massType === undefined) massType = mass_type_native;

    if (massValues !== undefined) {
      minval = massValues[0];
      maxval = massValues[1];
    }

    if (massType === mass_type_native) {
      if (minval === perMet_mass_min) minval = native_mass_min;

      if (maxval === perMet_mass_max || maxval > native_mass_max)
        maxval = native_mass_max;
    } else {
      if (minval === native_mass_min || minval < perMet_mass_min)
        minval = perMet_mass_min;

      if (maxval === native_mass_max) maxval = perMet_mass_max;

      minRange = perMet_mass_min;
      maxRange = perMet_mass_max;
    }

    setGlyMassRange([minRange, maxRange]);
    setGlyMass([minval, maxval]);
  };

  function sortDropdown(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (b.name < a.name) {
      return 1;
    }
    return 0;
  }

  const glyTypeOnChange = event => {
    if (event.target.value === "") setGlySubTypeIsHidden(true);
    else setGlySubTypeIsHidden(false);
    setGlySubType("");
    setGlyType(event.target.value);
  };

  const glySubTypeOnChange = event => {
    setGlySubType(event.target.value);
  };

  function glycanIdChange(inputGlycanId) {
    setGlycanId(inputGlycanId);
  }

  function glyProtChange(inputglycoProt) {
    setGlyProt(inputglycoProt);
  }

  function glyMotifChange(inputglycMotif) {
    setGlyMotif(inputglycMotif);
  }

  function glyBioEnzChange(inputglyBioEnz) {
    setGlyBioEnz(inputglyBioEnz);
  }

  function glyPubIdChange(inputglycPubId) {
    setGlyPubId(inputglycPubId);
  }

  const PubmedIdChange = event => {
    setGlyPubId(event.target.value);
  };

  const getGlycanInit = () => {
    const url = `/glycan/search_init`;
    return getJson(url);
  };

  React.useEffect(() => {
    getGlycanInit().then(response => {
      let initData = response.data;
      setGlyMassType(initData.glycan_mass.native.name);
      setGlyMassRange([
        Math.floor(initData.glycan_mass.native.min),
        Math.ceil(initData.glycan_mass.native.max)
      ]);
      setGlyMass([
        Math.floor(initData.glycan_mass.native.min),
        Math.ceil(initData.glycan_mass.native.max)
      ]);
      setGlyNumSugarsRange([
        initData.number_monosaccharides.min,
        initData.number_monosaccharides.max
      ]);
      setGlySubTypeIsHidden(true);

      const getGlycanList = (glycanListId, limit = 20, offset = 1) => {
        const url = `/glycan/list?query={"id":"${glycanListId}","offset":${offset},"limit":${limit},"order":"asc"}`;
        return getJson(url);
      };

      let compositionData = initData.composition;

      for (var x = 0; x < compositionData.length; x++) {
        compositionData[x].orderId = compositionSearchData[compositionData[x].residue].order_id;
        compositionData[x].subtext = compositionSearchData[compositionData[x].residue].subtext;
        compositionData[x].name = compositionSearchData[compositionData[x].residue].name;
        compositionData[x].shortName = compositionSearchData[compositionData[x].residue].short_name;
      }
      initData.composition = compositionData.sort(function(res1, res2){return parseInt(res1.orderId) - parseInt(res2.orderId)});
      setInitData(initData);

      id &&
        getGlycanList(id, 1).then(({ data }) => {
          setGlycanId(
            data.query.glytoucan_ac === undefined ? "" : data.query.glytoucan_ac
          );
          setGlyProt(
            data.query.protein_identifier === undefined
              ? ""
              : data.query.protein_identifier
          );
          setGlyMotif(
            data.query.glycan_motif === undefined ? "" : data.query.glycan_motif
          );
          setGlyBioEnz(
            data.query.enzyme === undefined ? "" : data.query.enzyme.id
          );
          setGlyPubId(data.query.pmid === undefined ? "" : data.query.pmid);
          setGlyMassType(
            data.query.mass_type === undefined
              ? initData.glycan_mass.native.name
              : data.query.mass_type
          );

          setGlyMassRange(
            data.query.mass_type === undefined
              ? [
                  Math.floor(initData.glycan_mass.native.min),
                  Math.ceil(initData.glycan_mass.native.max)
                ]
              : data.query.mass_type === initData.glycan_mass.native.name
              ? [
                  Math.floor(initData.glycan_mass.native.min),
                  Math.ceil(initData.glycan_mass.native.max)
                ]
              : [
                  Math.floor(initData.glycan_mass.permethylated.min),
                  Math.ceil(initData.glycan_mass.permethylated.max)
                ]
          );

          setGlyMass(
            data.query.mass === undefined
              ? [
                  Math.floor(initData.glycan_mass.native.min),
                  Math.ceil(initData.glycan_mass.native.max)
                ]
              : [data.query.mass.min, data.query.mass.max]
          );

          setGlyType(
            data.query.glycan_type === undefined ? "" : data.query.glycan_type
          );
          setGlyOrgOperation(
            data.query.organism === undefined
              ? "or"
              : data.query.organism.operation
          );
          setGlyOrganisms(
            data.query.organism === undefined
              ? []
              : data.query.organism.organism_list
          );
          setGlyNumSugars(
            data.query.number_monosaccharides === undefined
              ? [
                  initData.number_monosaccharides.min,
                  initData.number_monosaccharides.max
                ]
              : [
                  data.query.number_monosaccharides.min,
                  data.query.number_monosaccharides.max
                ]
          );

          if (data.query.glycan_type === undefined) setGlySubTypeIsHidden(true);
          else setGlySubTypeIsHidden(false);

          setGlySubType(
            data.query.glycan_subtype === undefined
              ? ""
              : data.query.glycan_subtype
          );
        });
    });
  }, [id]);

  function searchjson(
    input_query_type,
    input_glycan_id,
    input_mass_type,
    input_mass_min,
    input_mass_max,
    input_sugar_min,
    input_sugar_max,
    input_organism,
    input_organism_operation,
    input_glycantype,
    input_glycansubtype,
    input_enzyme,
    input_proteinid,
    input_motif,
    input_pmid,
    input_residue_comp
  ) {
    var enzymes = {};
    if (input_enzyme) {
      enzymes = {
        id: input_enzyme,
        type: "gene"
      };
    }

    var monosaccharides = undefined;
    if (input_sugar_min && input_sugar_max) {
      if (
        input_sugar_min !== initData.number_monosaccharides.min ||
        input_sugar_max !== initData.number_monosaccharides.max
      ) {
        monosaccharides = {
          min: parseInt(input_sugar_min),
          max: parseInt(input_sugar_max)
        };
      }
    }

    var input_mass = undefined;
    if (input_mass_min && input_mass_max) {
      if (input_mass_type === "Native") {
        if (
          input_mass_min !== initData.glycan_mass.native.min ||
          input_mass_max !== initData.glycan_mass.native.max
        ) {
          input_mass = {
            min: parseInt(input_mass_min),
            max: parseInt(input_mass_max)
          };
        }
      } else {
        if (
          input_mass_min !== initData.glycan_mass.permethylated.min ||
          input_mass_max !== initData.glycan_mass.permethylated.min
        ) {
          input_mass = {
            min: parseInt(input_mass_min),
            max: parseInt(input_mass_max)
          };
        }
      }
    }

    var organisms = undefined;
    if (input_organism && input_organism.length > 0) {
      organisms = {
        organism_list: input_organism,
        operation: input_organism_operation
      };
    }

    var glycan_id = input_glycan_id.trim();
    glycan_id = glycan_id.replace(/\u200B/g, "");
    glycan_id = glycan_id.replace(/\u2011/g, "-");
    glycan_id = glycan_id.replace(/\s+/g, ",");
    glycan_id = glycan_id.replace(/,+/g, ",");
    var index = glycan_id.lastIndexOf(",");
    if (index > -1 && index + 1 === glycan_id.length) {
      glycan_id = glycan_id.substr(0, index);
    }

    var formjson = {
      operation: "AND",
      query_type: input_query_type,
      mass_type: input_mass_type,
      mass: input_mass,
      number_monosaccharides: monosaccharides,
      enzyme: enzymes,
      glytoucan_ac: glycan_id,
      organism: organisms,
      glycan_type: input_glycantype,
      glycan_subtype: input_glycansubtype,
      protein_identifier: input_proteinid,
      glycan_motif: input_motif,
      pmid: input_pmid,
      composition: input_residue_comp
    };
    return formjson;
  }

  const glycanSearch = () => {
    let formObject = searchjson(
      "search_glycan",
      glycanId,
      glyMassType,
      glyMass[0],
      glyMass[1],
      glyNumSugars[0],
      glyNumSugars[1],
      glyOrganisms,
      glyOrgOperation,
      glyType,
      glySubType,
      glyBioEnz,
      glyProt,
      glyMotif,
      glyPubId,
      undefined
    );

    //formObject = searchjson(query_type, glycan_id, mass_type, mass_slider[0], mass_slider[1], sugar_slider[0], sugar_slider[1], organism, organism_operation, glycan_type, glycan_subtype, enzyme, proteinid, glycan_motif, pmid, residue_comp);
    var json = "query=" + JSON.stringify(formObject);
    const url = "/glycan/search?" + json;
    return getJson(url);
  };

  const searchGlycanClick = () => {
    glycanSearch().then(response => {
      if (response.data["list_id"] !== "") {
        props.history.push("/glycan-list/" + response.data["list_id"]);
      } else {
        alert("No Result Found.");
      }
    });
  };

  const clearGlycan = () => {
    setGlycanId("");
    setGlyProt("");
    setGlyMotif("");
    setGlyBioEnz("");
    setGlyPubId("");
    setGlyMassType(initData.glycan_mass.native.name);
    setGlyType("");
    setGlySubType("");
    setGlyOrgOperation("or");
    setMassValues(undefined, undefined);
    setGlyNumSugars([
      initData.number_monosaccharides.min,
      initData.number_monosaccharides.max
    ]);
    setGlyOrganisms([]);
    setGlySubTypeIsHidden(true);
  };

  return (
    <>
      {/* <Helmet>
        <title>"Glycan Search"</title>
        {getMeta(head.glycanSearch)}
      </Helmet> */}
      <h2 className={classes.headerTitle}>Glycan Search</h2>

      <div className="lander">
        <Container className={classes.con1}>
          <Tabs defaultActiveKey="advanced_search" transition={false}>
            <Tab
              eventKey="simple_search"
              className={classes.tab}
              title="Simple Search"
            ></Tab>
            <Tab
              eventKey="advanced_search"
              className={classes.tab}
              title="Advanced Search"
            >
              <Container className={classes.con}>
                <ButtonToolbar className={classes.marginButToolbar}>
                  <Button
                    className={classes.clearButton}
                    variant="secondary"
                    size="lg"
                    onClick={clearGlycan}
                  >
                    Clear Fields
                  </Button>
                  <Button
                    className={classes.submitButton}
                    variant="primary"
                    size="lg"
                    onClick={searchGlycanClick}
                  >
                    Search Glycan
                  </Button>
                </ButtonToolbar>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  <Typography className={classes.label1} gutterBottom>
                    <HtmlTooltip
                      disableTouchListener
                      interactive
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Glycan Id:</Typography>
                          <div className={classes.root1}></div>
                          {
                            "Unique accessions assigned to the registered glycan structures in GlyTouCan database. Enter complete or partial GlyTouCan Accession of your glycan. Explore"
                          }{" "}
                          <a
                            href="https://glytoucan.org/Structures/graphical"
                            target="_blank"
                          >
                            {"GlyTouCan"}
                          </a>
                        </React.Fragment>
                      }
                    >
                      <HelpOutline className={classes.helpicon} />
                    </HtmlTooltip>
                    Glycan Id
                  </Typography>
                  <MultilineAutoTextInput
                    inputValue={glycanId}
                    setInputValue={glycanIdChange}
                    placeholder="Enter single or multiple comma-separated GlyTouCan Accession(s) or Cross Reference(s) Id"
                    typeahedID="glytoucan_ac"
                  />
                  <Row>
                    <Col lg="6">
                      <div>
                        GlyTouCan Accession Example:{" "}
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            setGlycanId("G17689DH");
                          }}
                        >
                          G17689DH
                        </a>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div class="text-right">
                        Explore{" "}
                        <a
                          href="https://glytoucan.org/Structures/graphical"
                          target="_blank"
                        >
                          GlyTouCan Accession
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <div>
                        Cross References Id Example:{" "}
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            setGlycanId("G10716");
                          }}
                        >
                          G10716
                        </a>
                      </div>
                    </Col>
                  </Row>
                </FormControl>

                <div className={classes.margin}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Typography className={classes.label1} gutterBottom>
                        <HtmlTooltip
                          interactive
                          title={
                            <React.Fragment>
                              <Typography color="inherit">
                                Monoisotopic Mass:
                              </Typography>
                              {
                                "The monoisotopic mass is the sum of the masses of the atoms in a molecule. Use the sliders to select a Monoisotopic Mass range for your protein(s)"
                              }
                            </React.Fragment>
                          }
                        >
                          <HelpOutline className={classes.helpicon} />
                        </HtmlTooltip>
                        Monoisotopic Mass
                      </Typography>
                      <RangeInputSlider
                        step={10}
                        min={glyMassRange[0]}
                        max={glyMassRange[1]}
                        inputValue={glyMass}
                        setInputValue={glyMassChange}
                      />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.label4} gutterBottom>
                        &nbsp;
                      </Typography>
                      <FormControl variant="outlined">
                        <InputLabel className={classes.label3}>
                          Mass Type
                        </InputLabel>
                        <Select
                          value={glyMassType}
                          onChange={glyMassTypeOnChange}
                          className={classes.select}
                          labelWidth={100}
                        >
                          {initData.glycan_mass &&
                            Object.keys(initData.glycan_mass)
                              .sort()
                              .map(key => (
                                <MenuItem
                                  value={initData.glycan_mass[key].name}
                                >
                                  {initData.glycan_mass[key].name}
                                </MenuItem>
                              ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.margin}>
                  <Typography className={classes.label1} gutterBottom>
                    <HtmlTooltip
                      interactive
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            Number of Sugars:
                          </Typography>
                          {
                            "Use the sliders to select a Number of Sugars range for your protein(s)"
                          }
                        </React.Fragment>
                      }
                    >
                      <HelpOutline className={classes.helpicon} />
                    </HtmlTooltip>
                    No of Sugars
                  </Typography>
                  <RangeInputSlider
                    step={1}
                    min={glyNumSugarsRange[0]}
                    max={glyNumSugarsRange[1]}
                    inputValue={glyNumSugars}
                    setInputValue={glyNumSugarsChange}
                  />
                </div>
                <div className={classes.margin}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Typography className={classes.label1} gutterBottom>
                        <HtmlTooltip
                          interactive
                          title={
                            <React.Fragment>
                              <Typography color="inherit">Organism:</Typography>
                              {
                                "An individual animal, plant, or single-celled life form. Click to select an Organism that makes your glycan(s)"
                              }
                            </React.Fragment>
                          }
                        >
                          <HelpOutline className={classes.helpicon} />
                        </HtmlTooltip>
                        Organisms
                      </Typography>
                      <MultiselectTextInput
                        options={
                          initData.organism
                            ? initData.organism.sort(sortDropdown)
                            : initData.organism
                        }
                        inputValue={glyOrganisms}
                        setInputValue={glyOrgChange}
                        placeholder="Click to select multiple Organisms"
                      />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.label4} gutterBottom>
                        {/* Mass Type */}&nbsp;
                      </Typography>
                      <FormControl variant="outlined">
                        <Select
                          value={
                            glyOrgOperation === "" ? "or" : glyOrgOperation
                          }
                          onChange={glyOrgOperationOnChange}
                          className={classes.select}
                        >
                          <MenuItem value={"or"}>Or</MenuItem>
                          <MenuItem value={"and"}>And</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.margin}
                >
                  <Typography className={classes.label1} gutterBottom>
                    <HtmlTooltip
                      interactive
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Glycan Type:</Typography>
                          {
                            "The classification of glycan based on the nature of the sugar–peptide bond and the oligosaccharide attached. Click to select a Glycan Type."
                          }
                        </React.Fragment>
                      }
                    >
                      <HelpOutline className={classes.helpicon} />
                    </HtmlTooltip>
                    Glycan Type
                  </Typography>
                  <Select
                    value={glyType}
                    displayEmpty
                    onChange={glyTypeOnChange}
                    className={classes.select1}
                  >
                    <MenuItem value="">Select Glycan Type</MenuItem>
                    {initData.glycan_type &&
                      initData.glycan_type
                        .sort(sortDropdown)
                        .map(option => (
                          <MenuItem value={option.name}>{option.name}</MenuItem>
                        ))}
                  </Select>
                </FormControl>

                {!glySubTypeIsHidden && (
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.margin}
                  >
                    <Typography className={classes.label1} gutterBottom>
                      <HtmlTooltip
                        interactive
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              Glycan Subtype:
                            </Typography>
                            {
                              "Subclassifcation of Glycan types. Click to select a Glycan Subtype"
                            }
                          </React.Fragment>
                        }
                      >
                        <HelpOutline className={classes.helpicon} />
                      </HtmlTooltip>
                      Select Glycan Subtype
                    </Typography>
                    <Select
                      value={glySubType}
                      displayEmpty
                      onChange={glySubTypeOnChange}
                      className={classes.select1}
                      displayPrint="none"
                    >
                      <MenuItem value="" selected>
                        Select Glycan Subtype
                      </MenuItem>
                      {initData.glycan_type &&
                        initData.glycan_type.map(option =>
                          option.subtype
                            .sort()
                            .map(
                              subtype =>
                                option.name === glyType && (
                                  <MenuItem value={subtype}>{subtype}</MenuItem>
                                )
                            )
                        )}
                    </Select>
                  </FormControl>
                )}

                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.margin}
                >
                  <Typography className={classes.label1} gutterBottom>
                    <HtmlTooltip
                      interactive
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            Glycosylated Protein:
                          </Typography>
                          {
                            "A unique identifier assigned to a isoform chosen to be the canonical sequence in UniProt database. Enter the UniProtKB Accession for a  protein that bears your glycan. Explore"
                          }{" "}
                          <a href="https://www.uniprot.org/" target="_blank">
                            UniProtKB
                          </a>
                        </React.Fragment>
                      }
                    >
                      <HelpOutline className={classes.helpicon} />
                    </HtmlTooltip>
                    Glycosylated Protein
                  </Typography>
                  <AutoTextInput
                    inputValue={glyProt}
                    setInputValue={glyProtChange}
                    placeholder="Enter the UniProtKB Accession of your protein"
                    typeahedID="uniprot_canonical_ac"
                  />
                  <Row>
                    <Col lg="4">
                      <div>
                        Example:{" "}
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            setGlyProt("P14210");
                          }}
                        >
                          P14210
                        </a>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div class="text-right">
                        Explore{" "}
                        <a
                          href="https://www.uniprot.org/help/accession_numbers"
                          target="_blank"
                        >
                          UniProtKB Accession
                        </a>
                      </div>
                    </Col>
                  </Row>
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.margin}
                >
                  <Typography className={classes.label1} gutterBottom>
                    <HtmlTooltip
                      interactive
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Glycan Motif:</Typography>
                          {
                            "A “motif” refers to a substructure that appears in multiple glycans including O and N glycans. Enter a Glycan Motif comprising part of your glycan(s). Explore"
                          }{" "}
                          <a
                            href="https://www.uniprot.org/help/carbohyd"
                            target="_blank"
                          >
                            Glycan Motif
                          </a>
                        </React.Fragment>
                      }
                    >
                      <HelpOutline className={classes.helpicon} />
                    </HtmlTooltip>
                    Glycan Motif
                  </Typography>
                  <AutoTextInput
                    inputValue={glyMotif}
                    setInputValue={glyMotifChange}
                    placeholder="Enter the name of a Glycan Motif contained in your glycan"
                    typeahedID="motif_name"
                  />
                  <Row>
                    <Col lg="4">
                      <div>
                        Example:{" "}
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            setGlyMotif("N-Glycan complex");
                          }}
                        >
                          N-Glycan complex
                        </a>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div class="text-right">
                        Explore{" "}
                        <a
                          href="https://www.uniprot.org/help/carbohyd"
                          target="_blank"
                        >
                          Glycan Motif
                        </a>
                      </div>
                    </Col>
                  </Row>
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.margin}
                >
                  <Typography className={classes.label1} gutterBottom>
                    <HtmlTooltip
                      interactive
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            Biosynthetic Enzyme:
                          </Typography>
                          {
                            "Biosynthetic enzymes are enzymes involved in metabolism pathways that convert and modify simple compounds to complex coumpounds and macromolecules. Enter the Gene Name of an enzyme that particpates in the biosynthesis of your glycan(s). Explore"
                          }{" "}
                          <a href="https://enzyme.expasy.org/" target="_blank">
                            Biosynthetic Enzyme
                          </a>
                        </React.Fragment>
                      }
                    >
                      <HelpOutline className={classes.helpicon} />
                    </HtmlTooltip>
                    Biosynthetic Enzyme
                  </Typography>
                  <AutoTextInput
                    inputValue={glyBioEnz}
                    setInputValue={glyBioEnzChange}
                    placeholder="Enter the Gene Name of an enzyme"
                    typeahedID="gene_name"
                  />
                  <Row>
                    <Col lg="4">
                      <div>
                        Example:{" "}
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            setGlyBioEnz("B4GALT1");
                          }}
                        >
                          B4GALT1
                        </a>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div class="text-right">
                        Explore{" "}
                        <a href="https://enzyme.expasy.org/" target="_blank">
                          Biosynthetic Enzyme
                        </a>
                      </div>
                    </Col>
                  </Row>
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.margin}
                >
                  <Typography className={classes.label1} gutterBottom>
                    <HtmlTooltip
                      interactive
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            Biosynthetic Enzyme:
                          </Typography>
                          {
                            "A PMID is the unique identifier number used in PubMed for each article. The PMID is assigned to each article record when it enters the PubMed system. Explore"
                          }{" "}
                          <a
                            href="https://www.ncbi.nlm.nih.gov/pmc/pmctopmid/"
                            target="_blank"
                          >
                            PubMed ID
                          </a>
                        </React.Fragment>
                      }
                    >
                      <HelpOutline className={classes.helpicon} />
                    </HtmlTooltip>
                    Pubmed ID
                  </Typography>
                  <OutlinedInput
                    className={classes.input}
                    placeholder="Enter the Pubmed ID"
                    value={glyPubId}
                    onChange={PubmedIdChange}
                  />
                  {/* <AutoTextInput
                   inputValue={glyPubId} setInputValue={glycPubIdChange}
                   placeholder="Enter the Pubmed ID"
                   typeahedID = "glycan_pmid"
                  /> */}
                  <Row>
                    <Col lg="4">
                      <div>
                        Example:{" "}
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            setGlyPubId("9449027");
                          }}
                        >
                          9449027
                        </a>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div class="text-right">
                        Explore{" "}
                        <a
                          href="https://www.ncbi.nlm.nih.gov/pmc/pmctopmid/"
                          target="_blank"
                        >
                          Pubmed ID
                        </a>
                      </div>
                    </Col>
                  </Row>
                </FormControl>
                <ButtonToolbar className={classes.marginButToolbar}>
                  <Button
                    className={classes.clearButton}
                    variant="secondary"
                    size="lg"
                    onClick={clearGlycan}
                  >
                    Clear Fields
                  </Button>
                  <Button
                    className={classes.submitButton}
                    variant="primary"
                    size="lg"
                    onClick={searchGlycanClick}
                  >
                    Search Glycan
                  </Button>
                </ButtonToolbar>
              </Container>
            </Tab>
            <Tab
              eventKey="composition_search"
              title="Composition Search"
              className={classes.tabCompostionSearch}
            >
              <Container className="p-5">              
                  {initData.composition && <CompositionSearchControl
                    compositionInitMap={initData.composition}
                    step={1}
                  />}
              </Container>
            </Tab>
            <Tab eventKey="tutorial" title="Tutorial"></Tab>
          </Tabs>
        </Container>
      </div>
    </>
  );
};

export default GlycanSearch;

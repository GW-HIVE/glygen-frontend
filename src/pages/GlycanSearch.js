import React from "react";
import CustomizedHook from "../components/CustomizedHook";
import RangeSlider from "../components//RangeSlider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { getJson } from "../data/api";


import { Component, Tab, Tabs, Form, Container, Col, Row, NavLink } from "react-bootstrap";
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
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
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
  marginButton: {
    marginTop: 16,
    marginBottom: 16,
    // marginRight: 16,
    marginLeft: 16,
  },
  marginButToolbar: {
    justifyContent: "flex-end",
    // marginRight: 0,
    width: 700
  },
  marginLeft: {
    justifyContent: "flex-end",
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
  label: {
    fontSize: 16,
    width: "100px",
    height: "18px",
    shrink: false
  },
  label1: {
    fontSize: "14px",
    color: '#4A4A4A',
    fontWeight: "bold",
    marginLeft: -27
    // height: "25px"

  },
  label4: {
    fontSize: "15px",
    color: '#4A4A4A',
    fontWeight: "bold",
    // height: "25px"
  },
  label2: {
    fontSize: "20px",
    fontWeight: "bold",
    color: '#4A4A4A',
  },
  label3: {
    fontSize: "16px",
    fontWeight: "bold",
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
    fontColor: '#2F78B7',
    // color: "#2F78B7 !important",

  },
  headerTitle: {
    color: "#2F78B7",
    alignItems: "center",
    alignSelf: 'center', //if style using flexbox
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
},
  con: {
    width: "730px",
    height: "1100px",
    alignItems: "center",
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
        width: "25px",

    },
    row1: {
      margin: 0,
      marginRight: 15,
      width: "25px",

  },
  help1: {
    lineWidth: 1
  },
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    // fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
  helpicon:{
    fontSize: "18px",
    marginRight: 8,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },  root1: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const Opoptions = [
  {text:'Or', value:10},
  {text:'And', value:20},
];




const GlycanSearch = props => {

  const getGlycanInit = () => {
    const url = `/glycan/search_init`;
    getJson(url).then(response =>  
      { 
        setInitData(response.data);
        // setOrganisms(
        // [
        //   {
        //     "name": "Rattus norvegicus", 
        //     "id": 10116
        //   }, 
        //   {
        //     "name": "Mus musculus", 
        //     "id": 10090
        //   }
        // ]);
      });
  };
  let { id } = useParams();
  const [initData, setInitData] = React.useState([]);
  const [query, setQuery] = React.useState([]);
  //getGlycanInit();


  React.useEffect(() => {

    // getGlycanInit().then(({ response }) => {
    //   alert(response);
    //   setInitData(response);
    // });
    getGlycanInit();
  //if (id !== undefined) {
      getGlycanList(id, 1).then(({ data }) => {
        //setQuery(data.query);
        setGlycanId(data.query.glytoucan_ac === undefined? "" : data.query.glytoucan_ac);
        setglycoProt(data.query.protein_identifier === undefined? "" : data.query.protein_identifier);
        setglycMotif(data.query.glycan_motif === undefined? "" : data.query.glycan_motif);
        setglyBioEnz(data.query.enzyme === undefined? "" : data.query.enzyme.id);
        setglycPubId(data.query.pmid === undefined? "" : data.query.glytoucan_ac);
        setAge1(data.query.mass_type === undefined? "Native" : data.query.glytoucan_ac);
        setAge3(data.query.glycan_type === undefined? "" : data.query.glycan_type);

      if (data.query.glycan_type === undefined)
        setHidden(true);
      else 
        setHidden(false);

        setAge4(data.query.glycan_subtype === undefined? "" : data.query.glycan_subtype);

      });
    //}
    // eslint-disable-next-line
  }, []);


  const classes = useStyles();
  const [age1, setAge1] = React.useState("Native");
  const [age2, setAge2] = React.useState("");
  const [age3, setAge3] = React.useState("");
  const [age4, setAge4] = React.useState("");
  const [glycanId, setGlycanId] = React.useState("");
  const [glycoProt, setglycoProt] = React.useState("");
  const [glycMotif, setglycMotif] = React.useState("");
  const [glyBioEnz, setglyBioEnz] = React.useState("");
  const [glycPubId, setglycPubId] = React.useState("");


  const [isHidden, setHidden] = React.useState(true);
  const [initDone, setInitDone] = React.useState(false);




  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);


//  const getGlycanInit = () => {
//   const url = `/glycan/search_init`;
//   getJson(url).then(response =>  
//     { 
//       setInitData(response.data);
//       // setOrganisms(
//       // [
//       //   {
//       //     "name": "Rattus norvegicus", 
//       //     "id": 10116
//       //   }, 
//       //   {
//       //     "name": "Mus musculus", 
//       //     "id": 10090
//       //   }
//       // ]);
//     });
// };

const getGlycanList = (glycanListId, limit = 20, offset = 1) => {
    const url = `/glycan/list?query={"id":"${glycanListId}","offset":${offset},"limit":${limit},"order":"asc"}`;
    return getJson(url);
};

function searchjson(input_query_type, input_glycan_id, input_mass_type, input_mass_min, input_mass_max, input_sugar_min, input_sugar_max, input_organism, input_organism_operation, input_glycantype, input_glycansubtype, input_enzyme, input_proteinid, input_motif, input_pmid, input_residue_comp) {
  var enzymes = {}
  if (input_enzyme) {
      enzymes = {
          "id": input_enzyme,
          "type": "gene"
      }
  }
  var monosaccharides = undefined;
  if (input_sugar_min && input_sugar_max) {
      if (input_sugar_min !== 1 || input_sugar_max !== 38) {
          monosaccharides = {
              "min": parseInt(input_sugar_min),
              "max": parseInt(input_sugar_max)
          };
      }
  }

  var input_mass = undefined;
  if (input_mass_min && input_mass_max) {
      if (input_mass_type === "Native") {
          if (input_mass_min !== 149 || input_mass_max !== 6752) {
              input_mass = {
                  "min": parseInt(input_mass_min),
                  "max": parseInt(input_mass_max)
              };
          }
      } else {
          if (input_mass_min !== 205 || input_mass_max !== 8308) {
              input_mass = {
                  "min": parseInt(input_mass_min),
                  "max": parseInt(input_mass_max)
              };
          }
      }
  }

  var organisms = undefined;
  if (input_organism && input_organism.length > 0) {
      organisms = {
          "organism_list": input_organism,
          "operation": input_organism_operation
      }
  }
  var formjson = {
      "operation": "AND",
      query_type: input_query_type,
      mass_type: input_mass_type,
      mass: input_mass,
      number_monosaccharides: monosaccharides,
      enzyme: enzymes,
      glytoucan_ac: input_glycan_id,
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
  // query = {
  //   "query_type":"search_glycan",
  //   "operation":"AND",
  //   "glytoucan_ac":"${glycanId}"}`

  let formObject = searchjson("search_glycan", glycanId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, age3, age4, glyBioEnz, glycoProt, glycMotif, glycPubId, undefined);

  //formObject = searchjson(query_type, glycan_id, mass_type, mass_slider[0], mass_slider[1], sugar_slider[0], sugar_slider[1], organism, organism_operation, glycan_type, glycan_subtype, enzyme, proteinid, glycan_motif, pmid, residue_comp);
  var json = "query=" + JSON.stringify(formObject);
  //const url = `/glycan/search?query={"query_type":"search_glycan","operation":"AND","glytoucan_ac":"${glycanId}"}`;
  const url = "/glycan/search?" + json;
  return getJson(url); 
};

const glycanIdTypeahead = () => {
  const url = `/typeahead?query={"field":"glytoucan_ac","value":"${glycanId}","limit":100}`;
  return getJson(url).then(response =>  {  alert(response.data) });
};

  const handleChange2 = event => {
    setAge2(event.target.value);
  };
  const handleChange1 = event => {
    setAge1(event.target.value);
    //alert(event.target.value);
    setMass([event.target.value !== "Native" ? 205 : 149, event.target.value !== "Native" ? 8308 : 6752]);
  };

  
  const handleChange3 = event => {
    if (event.target.value === "")
      setHidden(true);
    else 
      setHidden(false);
    setAge4("");
    setAge3(event.target.value);

  };
  const handleChange4 = event => {
    setAge4(event.target.value);
  };
  const GlycanIdChange = event => {
    setGlycanId(event.target.value);
  };

  const GlycoProtChange = event => {
    setglycoProt(event.target.value);
  };
  const MotifChange = event => {
    setglycMotif(event.target.value);
  };
  const BioEnzChange = event => {
    setglyBioEnz(event.target.value);
  };
  const PubmedIdChange = event => {
    setglycPubId(event.target.value);
  };

  const searchGlycanClick = () =>{
      glycanSearch().then(response =>  {
         if (response.data["list_id"] !== "") {
          //window.location = '/glycan-list/' + response.data["list_id"];
          props.history.push("/glycan-list/" + response.data["list_id"]);
        } else {
          alert("No Result Found.")
        }
      })
  };

  const clearGlycan = () =>{
    setGlycanId("");
    setglycoProt("");
    setglycMotif("");
    setglyBioEnz("");
    setglycPubId("");
    setAge1("Native");
    setAge3("");
    setAge4("");
    setHidden(true);
  }

  const GlycanIdClick = () =>{
    setGlycanId('G17689DH');
  };

  const CrossReferencesIdClick = () =>{
    setGlycanId('G10716');
  };

  const GlyProteinClick = () =>{
    setglycoProt('P14210');
  };
  const GlyMotifClick = () =>{
    setglycMotif('N-Glycan complex');
  };
  const GlyBioEnClick = () =>{
    setglyBioEnz('B4GALT1');
  };
  const GlyPubIdClick = () =>{
    setglycPubId('9449027');
  };

  const [value, setOrganisms] = React.useState([]);
  function handleOrgSelect(org) {
    setOrganisms(org);
  }

  const [numSugars, setNumSugars] = React.useState([1, 38]);
  function handleSetNumSugars(sugars) {
    setNumSugars(sugars);
  }

  const [mass, setMass] = React.useState([age1 !== "Native" ? 205 : 149, age1 !== "Native" ? 8308 : 6752]);
  function handleSetMass(mass) {
    setMass(mass);
  }

//   const handleSetOrganisms = (org1) =>{
//     setOrganisms(org1);
//     alert(org1)
// };

  
  return (
    <>
      {/* <Helmet>
        <title>"Glycan Search"</title>
        {getMeta(head.glycanSearch)}
      </Helmet> */}
      <h2 className={classes.headerTitle}>Glycan Search</h2>

      <div className="lander">
        <Container className={classes.con1}>
          <Tabs
            defaultActiveKey="advanced_search"
            transition={false}
            id="noanim-tab-example"
          >
            <Tab eventKey="simple_search" 
            className={classes.tab}
            title="Simple Search"></Tab>
            <Tab
              eventKey="advanced_search"
              className={classes.tab}
              title="Advanced Search"
            >
              <Container className={classes.con}>
                <ButtonToolbar className={classes.marginButToolbar}>
                  <Button className={classes.marginButton} variant="secondary" size="lg" onClick={clearGlycan}>
                    Clear Fields
                  </Button>
                  <Button className={classes.marginButton} variant="primary" size="lg"
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
                  <Typography className={classes.label1} id="range-slider" gutterBottom>
                  <HtmlTooltip disableTouchListener interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Glycan Id:</Typography>
                        <div className={classes.root1}>
                  {/* <Avatar variant="square" src="https://www.researchgate.net/profile/Jonathan_Lyons2/publication/279284153/figure/fig1/AS:294331559759874@1447185520497/Glycan-structures-A-Representative-examples-of-N-glycans.png" className={classes.large} /> */}
                  </div>
                        {"Unique accessions assigned to the registered glycan structures in GlyTouCan database. Enter complete or partial GlyTouCan Accession of your glycan. Explore"} <a href='https://glytoucan.org/Structures/graphical' target='_blank'>{"GlyTouCan"}</a>
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                  Glycan Id
                  </Typography>
                 
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    className={classes.input1}
                    placeholder="Enter single or multiple comma-separated GlyTouCan Accession(s) or Cross Reference(s) Id"
                    multiline
                    rows="3"
                    variant="outlined"
                    value={glycanId}
                    onChange={GlycanIdChange}
                    // startAdornment={<Help />}
                    // labelWidth={100}
                  />
                  <Row>
                    <Col lg="6">
                      <div>
                      GlyTouCan Accession Example:{" "}
                        <a  href="javascript:void(0)" onClick={GlycanIdClick} id="textExampleGlycan">
                          G17689DH
                        </a>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div class="text-right">
                        Explore{" "}
                        <a href="https://glytoucan.org/Structures/graphical" target="_blank">
                          GlyTouCan Accession
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                  <Col lg="6">
                      <div>
                      Cross References Id Example:{" "}
                        <a  href="javascript:void(0)" onClick={CrossReferencesIdClick} id="textExampleGlycan">
                        G10716
                        </a>
                      </div>
                    </Col>
                  </Row>
                </FormControl>

                {/* <CustomizedHook/> */}
                {/* <Asynchronous/> */}
                {/* <GoogleMaps/> */}


                <div className={classes.margin}>
                <Grid container spacing={2} alignItems="center">
                <Grid item>
                <Typography className={classes.label1} id="range-slider" gutterBottom>
                  <HtmlTooltip interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Monoisotopic Mass:</Typography>
                        {"The monoisotopic mass is the sum of the masses of the atoms in a molecule. Use the sliders to select a Monoisotopic Mass range for your protein(s)"}
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                  Monoisotopic Mass
                  </Typography>
                    <RangeSlider 
                       step= {10}
                       //min = {mass[0]}
                       min = {age1 !== "Native" ? 205 : 149 }
                       //max= {mass[1]} 
                       max= {age1 !== "Native" ? 8308 : 6752}
                       //{initData.number_monosaccharides.max}
                       intValue= {mass}
                       handleSetNumSugars={handleSetMass}
                    />
                  </Grid>
                  <Grid item>
                  <Typography className={classes.label4} id="range-slider" gutterBottom>
                    {/* Mass Type */}&nbsp;
                  </Typography>
                    <FormControl variant="outlined">                                 
                      <InputLabel  className={classes.label3} id="demo-simple-select-filled-label1">
                        Mass Type
                      </InputLabel>
                      <Select                       
                        labelId="demo-simple-select-filled-label1"
                        id="demo-simple-select-filled1"
                        value={age1 === "" ? "Native" : age1} 
                        onChange={handleChange1}
                        // startAdornment={<Help />}
                        className={classes.select}
                        labelWidth={100}
                      >
                        <MenuItem value={"Native"}>Native</MenuItem>
                        <MenuItem value={"Permethylated"}>Permethylated</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                </div>
                <div className={classes.margin}>
                 {/* <Row className={classes.row1}> */}
                {/* <Help /> */}
                  <Typography className={classes.label1} id="range-slider" gutterBottom>
                  <HtmlTooltip interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Number of Sugars:</Typography>
                        {"Use the sliders to select a Number of Sugars range for your protein(s)"}
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                  No of Sugars
                  </Typography>
                  {/* </Row>  */}
                  <RangeSlider 
                    step= {1}
                    min= {1}
                    //{initData.number_monosaccharides.min}
                    max= {38}
                    //{initData.number_monosaccharides.max}
                    intValue= {numSugars}
                    handleSetNumSugars={handleSetNumSugars}
                    />
                </div>
                <div className={classes.margin}>
                <Grid container spacing={2} alignItems="center">
                <Grid item>
                <Typography className={classes.label1} id="range-slider" gutterBottom>
                  <HtmlTooltip interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Organism:</Typography>
                        {"An individual animal, plant, or single-celled life form. Click to select an Organism that makes your glycan(s)"}
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                    Organisms
                  </Typography>
                  <CustomizedHook orgList={initData.organism} value={value} handleOrgSelect={handleOrgSelect} /> 
                  </Grid>
                  <Grid item>
                  <Typography className={classes.label4} id="range-slider" gutterBottom>
                    {/* Mass Type */}&nbsp;
                  </Typography>
                    <FormControl variant="outlined">                                 
                      <Select                       
                        labelId="demo-simple-select-cond-label2"
                        id="demo-simple-select-cond2"
                        value={age2 === "" ? "or" : age2} 
                        onChange={handleChange2}
                        // startAdornment={<Help />}
                        className={classes.select}
                        // labelWidth={100}
                      >
                        <MenuItem value={"or"}>Or</MenuItem>
                        <MenuItem value={"and"}>And</MenuItem>

                        {/* {Opoptions.map(option => (
                          <MenuItem value={option.value} selected={option === 'Or'}>
                            {option.text}
                          </MenuItem>
                        ))} */}

                      </Select>
                    </FormControl>
                    </Grid>
                </Grid>
                </div>
                <FormControl fullWidth variant="outlined" className={classes.margin}> 
                  <Typography className={classes.label1} id="range-slider" gutterBottom>
                  <HtmlTooltip interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Glycan Type:</Typography>
                        {"The classification of glycan based on the nature of the sugar–peptide bond and the oligosaccharide attached. Click to select a Glycan Type."}
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                  Glycan Type
                  </Typography>                                
                      <Select
                        labelId="demo-simple-select-filled-label3"
                        id="demo-simple-select-filled3"
                        value={age3}
                        displayEmpty
                        onChange={handleChange3}
                        // startAdornment={<Help />}
                        className={classes.select1}
                        // labelWidth={130}
                      >
                        <MenuItem value="">
                         Select Glycan Type
                        </MenuItem>
                        {/* {initData.glycan_type.map(option => (
                            <MenuItem value={option.name}>
                              {option.name}
                            </MenuItem>
                        ))} */}
                        <MenuItem value={"N-glycan"}>N-Glycan</MenuItem>
                        <MenuItem value={"O-glycan"}>O-Glycan</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    </FormControl>

                    {/* <div className={classes.margin}> */}
                    {!isHidden && <FormControl fullWidth variant="outlined" className={classes.margin}>                                 
                    <Typography className={classes.label1} id="demo-simple-select-sel" gutterBottom>
                  <HtmlTooltip interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Glycan Subtype:</Typography>
                        {"Subclassifcation of Glycan types. Click to select a Glycan Subtype"}
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                    Select Glycan Subtype
                  </Typography>
                      <Select
                        labelId="demo-simple-select-sel"
                        id="demo-simple-select-sel"
                        value={age4}
                        displayEmpty
                        onChange={handleChange4}
                        // startAdornment={<Help />}
                        className={classes.select1}
                        // labelWidth={130}
                        displayPrint="none"
                      >
                        <MenuItem value="" selected>
                         Select Glycan Subtype
                        </MenuItem>
                        {initData.glycan_type.map(option => (
                            option.subtype.sort().map(subtype => (
                            (option.name === age3) && <MenuItem value={subtype}>
                              {subtype}
                            </MenuItem>
                            ))
                        ))}
                        {/* <ListSubheader>N-Glycan</ListSubheader>
                        <MenuItem value={1}>hybrid</MenuItem>
                        <MenuItem value={2}>complex</MenuItem>
                        <MenuItem value={3}>Other</MenuItem>
                        <MenuItem value={4}>high mannonse</MenuItem>
                        <MenuItem value={5}>pauci mannonse</MenuItem>
                        <ListSubheader>O-Glycan</ListSubheader>
                        <MenuItem value={7}>Core 1</MenuItem>
                        <MenuItem value={8}>Core 2</MenuItem>
                        <MenuItem value={9}>Core 3</MenuItem>
                        <MenuItem value={10}>Core 4</MenuItem>
                        <MenuItem value={11}>Core 5</MenuItem>
                        <MenuItem value={12}>Core 6</MenuItem>
                        <MenuItem value={13}>Core 7</MenuItem>
                        <ListSubheader>Other</ListSubheader>
                        <MenuItem value={14}>Other</MenuItem> */}
                      </Select>
                      
                    </FormControl>}

                    <FormControl fullWidth variant="outlined" className={classes.margin}>                                 
                   <Typography className={classes.label1} id="range-slider" gutterBottom>
                  <HtmlTooltip interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Glycosylated Protein:</Typography>
                        {"A unique identifier assigned to a isoform chosen to be the canonical sequence in UniProt database. Enter the UniProtKB Accession for a  protein that bears your glycan. Explore"} <a href='https://www.uniprot.org/' target='_blank'>UniProtKB</a>
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                  Glycosylated Protein
                  </Typography>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    className={classes.input}
                    placeholder="Enter the UniProtKB Accession of your protein"
                    // startAdornment={<Help />}
                    // labelWidth={210}
                    value={glycoProt}
                    onChange={GlycoProtChange}
                    variant="outlined"
                  />
                  <Row>
                    <Col lg="4">
                      <div>
                        Example:{" "}
                        <a href="javascript:void(0)" onClick={GlyProteinClick} id="textExampleGlycan">
                        P14210
                        </a>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div class="text-right">
                        Explore{" "}
                        <a href="https://www.uniprot.org/help/accession_numbers" target="_blank">
                        UniProtKB Accession
                        </a>
                      </div>
                    </Col>
                  </Row>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" className={classes.margin}>                                 
                   <Typography className={classes.label1} id="range-slider" gutterBottom>
                  <HtmlTooltip interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Glycan Motif:</Typography>
                        {"A “motif” refers to a substructure that appears in multiple glycans including O and N glycans. Enter a Glycan Motif comprising part of your glycan(s). Explore"} <a href='https://www.uniprot.org/help/carbohyd' target='_blank'>Glycan Motif</a>
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                  Glycan Motif
                  </Typography>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    className={classes.input}
                    placeholder="Enter the name of a Glycan Motif contained in your glycan"
                    value={glycMotif}
                    onChange={MotifChange}
                    // startAdornment={<Help />}
                    // labelWidth={210}
                  />
                  <Row>
                    <Col lg="4">
                      <div>
                        Example:{" "}
                        <a href="javascript:void(0)" onClick={GlyMotifClick} id="textExampleGlycan">
                        N-Glycan complex
                        </a>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div class="text-right">
                        Explore{" "}
                        <a href="https://www.uniprot.org/help/carbohyd" target="_blank">
                        Glycan Motif
                        </a>
                      </div>
                    </Col>
                  </Row>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" className={classes.margin}>                                 
                   <Typography className={classes.label1} id="range-slider" gutterBottom>
                  <HtmlTooltip interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Biosynthetic Enzyme:</Typography>
                        {"Biosynthetic enzymes are enzymes involved in metabolism pathways that convert and modify simple compounds to complex coumpounds and macromolecules. Enter the Gene Name of an enzyme that particpates in the biosynthesis of your glycan(s). Explore"} <a href='https://enzyme.expasy.org/' target='_blank'>Biosynthetic Enzyme</a>
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                  Biosynthetic Enzyme
                  </Typography>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    className={classes.input}
                    placeholder="Enter the Gene Name of an enzyme"
                    value={glyBioEnz}
                    onChange={BioEnzChange}
                    // startAdornment={<Help />}
                    // labelWidth={210}
                  />
                  <Row>
                    <Col lg="4">
                      <div>
                        Example:{" "}
                        <a href="javascript:void(0)" onClick={GlyBioEnClick} id="textExampleGlycan">
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
                  <FormControl fullWidth variant="outlined" className={classes.margin}>                                 
                   <Typography className={classes.label1} id="range-slider" gutterBottom>
                  <HtmlTooltip interactive title={
                      <React.Fragment>
                        <Typography color="inherit">Biosynthetic Enzyme:</Typography>
                        {"A PMID is the unique identifier number used in PubMed for each article. The PMID is assigned to each article record when it enters the PubMed system. Explore"} <a href='https://www.ncbi.nlm.nih.gov/pmc/pmctopmid/' target='_blank'>PubMed ID</a>
                      </React.Fragment>
                    }>
                    <HelpOutline className={classes.helpicon}/>
                  </HtmlTooltip>
                  Pubmed ID
                  </Typography>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    className={classes.input}
                    placeholder="Enter the Pubmed ID"
                    value={glycPubId}
                    onChange={PubmedIdChange}
                    // startAdornment={<Help />}
                    // labelWidth={210}
                  />
                  <Row>
                    <Col lg="4">
                      <div>
                        Example:{" "}
                        <a href="javascript:void(0)" onClick={GlyPubIdClick} id="textExampleGlycan">
                        9449027
                        </a>
                      </div>
                    </Col>
                    <Col lg="8">
                      <div class="text-right">
                        Explore{" "}
                        <a href="https://www.ncbi.nlm.nih.gov/pmc/pmctopmid/" target="_blank">
                        Pubmed ID
                        </a>
                      </div>
                    </Col>
                  </Row>
                  </FormControl>
                  <ButtonToolbar className={classes.marginButToolbar}>
                  <Button className={classes.marginButton} variant="secondary" size="lg" onClick={clearGlycan}>
                    Clear Fields
                  </Button>
                  <Button className={classes.marginButton} variant="primary" size="lg" onClick={searchGlycanClick}>
                    Search Glycan
                  </Button>
                </ButtonToolbar>

              </Container>
            </Tab>
            <Tab eventKey="composition_search" title="Composition Search"></Tab>
            <Tab eventKey="tutorial" title="Tutorial"></Tab>
          </Tabs>
        </Container>
      </div>
    </>
  );
}

export default GlycanSearch;


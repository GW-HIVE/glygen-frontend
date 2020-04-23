import React from "react";
import MultilineAutoTextInput from "../input/MultilineAutoTextInput";
import RangeInputSlider from "../input/RangeInputSlider";
import AutoTextInput from "../input/AutoTextInput";
import MultiselectTextInput from "../input/MultiselectTextInput";
import HelpTooltip from "../tooltip/HelpTooltip";
import ExampleExploreControl from "../example/ExampleExploreControl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";
import {Col,Row} from "react-bootstrap";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "react-bootstrap/Button";
import "../../css/Search.css";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: 16,
        width: 700,
    },
    marginLeft: {
        justifyContent: "flex-end",
    },
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    label1: {
        fontSize: "14px",
        color: "#4A4A4A",
        fontWeight: "bold",
        marginLeft: -27,
    },
    label4: {
        fontSize: "15px",
        color: "#4A4A4A",
        fontWeight: "bold",
    },
    label3: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    errorText: {
        fontSize: "14px  !important",
        marginRight: 0,
        marginLeft: 0,
    },
    input: {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        fontSize: 16,
        width: "700px",
        height: "34px",
    },
    select: {
        width: "200px",
        height: "34px",
    },
    select1: {
        width: "700px",
        height: "34px",
    },
    selectOutlined: {
        paddingTop: "4px !important",
        paddingBottom: "4px !important",
        backgroundColor: "white",
    }
}));

const GlycanAdvancedSearch = (props) => {
    const classes = useStyles();

    function sortDropdown(a, b) {
        if (a.name < b.name) {
            return -1;
        } else if (b.name < a.name) {
            return 1;
        }
        return 0;
    }

    function glyOrgChange(org) {
        props.setGlyAdvSearchData({ glyOrganisms: org });
    }

    const glyOrgOperationOnChange = (event) => {
        props.setGlyAdvSearchData({ glyOrgOperation: event.target.value });
    };

    const glyMassTypeOnChange = (event) => {
        props.setGlyAdvSearchData({ glyMassType: event.target.value });
        setMassValues(event.target.value, props.inputValue.glyMass);
    };

    const setMassValues = (massType, massValues) => {
        var perMet_mass_min = Math.floor(
            props.initData.glycan_mass.permethylated.min
        );
        var perMet_mass_max = Math.ceil(
            props.initData.glycan_mass.permethylated.max
        );
        var native_mass_min,
            minRange,
            minval = Math.floor(props.initData.glycan_mass.native.min);
        var native_mass_max,
            maxRange,
            maxval = Math.ceil(props.initData.glycan_mass.native.max);
        var mass_type_native = props.initData.glycan_mass.native.name;
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

        props.setGlyAdvSearchData({ glyMassRange: [minRange, maxRange] });
        props.setGlyAdvSearchData({ glyMassInput: [minval, maxval] });
        props.setGlyAdvSearchData({ glyMass: [minval, maxval] });
    };

    const glyTypeOnChange = (event) => {
        if (event.target.value === "")
            props.setGlyAdvSearchData({ glySubTypeIsHidden: true });
        else props.setGlyAdvSearchData({ glySubTypeIsHidden: false });

        props.setGlyAdvSearchData({ glySubType: "" });
        props.setGlyAdvSearchData({ glyType: event.target.value });
    };

    const glySubTypeOnChange = (event) => {
        props.setGlyAdvSearchData({ glySubType: event.target.value });
    };

    function glycanIdChange(inputGlycanId) {
        props.setGlyAdvSearchData({ glycanId: inputGlycanId });
        let valArr = props.inputValue.glyAdvSearchValError;
        valArr[0] = inputGlycanId.length > 2500;
        props.setGlyAdvSearchData({ glyAdvSearchValError: valArr });
    }

    function glyProtChange(inputglycoProt) {
        props.setGlyAdvSearchData({ glyProt: inputglycoProt });
        let valArr = props.inputValue.glyAdvSearchValError;
        valArr[1] = inputglycoProt.length > 12;
        props.setGlyAdvSearchData({ glyAdvSearchValError: valArr });
    }

    function glyMotifChange(inputglycMotif) {
        props.setGlyAdvSearchData({ glyMotif: inputglycMotif });
        let valArr = props.inputValue.glyAdvSearchValError;
        valArr[2] = inputglycMotif.length > 47;
        props.setGlyAdvSearchData({ glyAdvSearchValError: valArr });
    }

    function glyBioEnzChange(inputglyBioEnz) {
        props.setGlyAdvSearchData({ glyBioEnz: inputglyBioEnz });
        let valArr = props.inputValue.glyAdvSearchValError;
        valArr[3] = inputglyBioEnz.length > 12;
        props.setGlyAdvSearchData({ glyAdvSearchValError: valArr });
    }

    function glyPubIdChange(inputglycPubId) {
        props.setGlyAdvSearchData({ glyPubId: inputglycPubId });
        let valArr = props.inputValue.glyAdvSearchValError;
        valArr[4] = inputglycPubId.length > 20;
        props.setGlyAdvSearchData({ glyAdvSearchValError: valArr });
    }

    const PubmedIdChange = (event) => {
        props.setGlyAdvSearchData({ glyPubId: event.target.value });
        let valArr = props.inputValue.glyAdvSearchValError;
        valArr[4] = event.target.value.length > 20;
        props.setGlyAdvSearchData({ glyAdvSearchValError: valArr });
    };

    const clearGlycan = () => {
        props.setGlyAdvSearchData({
            glycanId: "",
            glyMassType: props.initData.glycan_mass.native.name,
            glyMass: [
                props.initData.glycan_mass.native.min,
                props.initData.glycan_mass.native.max,
            ],
            glyMassInput: [
                props.initData.glycan_mass.native.min,
                props.initData.glycan_mass.native.max,
            ],
            glyMassRange: [
                props.initData.glycan_mass.native.min,
                props.initData.glycan_mass.native.max,
            ],
            glyNumSugars: [
                props.initData.number_monosaccharides.min,
                props.initData.number_monosaccharides.max,
            ],
            glyNumSugarsRange: [
                props.initData.number_monosaccharides.min,
                props.initData.number_monosaccharides.max,
            ],
            glyNumSugarsInput: [
                props.initData.number_monosaccharides.min,
                props.initData.number_monosaccharides.max,
            ],
            glyOrganisms: [],
            glyOrgOperation: "or",
            glyType: "",
            glySubType: "",
            glySubTypeIsHidden: true,
            glyProt: "",
            glyMotif: "",
            glyBioEnz: "",
            glyPubId: "",
            glyAdvSearchValError: [false, false, false, false, false],
        });
    };

    return (
        <>
            <Row className="gg-align-right pt-5 pb-2">
                <Button
                    className="gg-btn-outline mr-4"
                    onClick={clearGlycan}
                >
                    Clear Fields
                </Button>
                <Button
                    className="gg-btn-blue"
                    onClick={props.searchGlycanAdvClick}
                    disabled={
                        !props.inputValue.glyAdvSearchValError.every((err) => err === false)
                    }
                >
                    Search Glycan
                </Button>
            </Row>
            <FormControl fullWidth className={classes.margin} variant="outlined">
                <Typography className={classes.label1} gutterBottom>
                    <HelpTooltip
                        title = "Glycan Id"
                        text = "Unique accessions assigned to the registered glycan structures in GlyTouCan database. Enter complete or partial GlyTouCan Accession of your glycan. Explore"
                        urlText = "GlyTouCan"
                        url = "https://glytoucan.org/Structures/graphical"
                    />
                    Glycan Id
                </Typography>
                <MultilineAutoTextInput
                    inputValue={props.inputValue.glycanId}
                    setInputValue={glycanIdChange}
                    placeholder="Enter single or multiple comma-separated GlyTouCan Accession(s) or Cross Reference(s) Id"
                    typeahedID="glytoucan_ac"
                    length={2500}
                    errorText="Entry is too long - max length is 2500."
                />
                <ExampleExploreControl
                    exampleText={"GlyTouCan Accession Example:"}
                    setInputValue={glycanIdChange}
                    inputValue={"G17689DH"}
                    exploreText={"GlyTouCan Accession"}
                    exploreUrl={"https://glytoucan.org/Structures/graphical"}
                />
                <ExampleExploreControl
                    exampleText={"Cross References Id Example:"}
                    setInputValue={glycanIdChange}
                    inputValue={"G10716"}
                />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography className={classes.label1} gutterBottom>
                            <HelpTooltip
                                title = "Monoisotopic Mass"
                                text = "The monoisotopic mass is the sum of the masses of the atoms in a molecule. Use the sliders to select a Monoisotopic Mass range for your glycan(s)."
                            />
                            Monoisotopic Mass
                        </Typography>
                        <RangeInputSlider
                            step={10}
                            min={props.inputValue.glyMassRange[0]}
                            max={props.inputValue.glyMassRange[1]}
                            inputValue={props.inputValue.glyMassInput}
                            setInputValue={(input) =>
                                props.setGlyAdvSearchData({ glyMassInput: input })
                            }
                            inputValueSlider={props.inputValue.glyMass}
                            setSliderInputValue={(input) =>
                                props.setGlyAdvSearchData({ glyMass: input })
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Typography className={classes.label4} gutterBottom>
                            &nbsp;
                        </Typography>
                        <FormControl variant="outlined">
                            <InputLabel className={classes.label3}>Mass Type</InputLabel>
                            <Select
                                value={props.inputValue.glyMassType}
                                onChange={glyMassTypeOnChange}
                                highlight={false}
                                classes={{
                                    outlined: classes.selectOutlined,
                                    root: "select-menu",
                                }}
                                className={classes.select}
                                labelWidth={100}
                            >
                                {props.initData.glycan_mass &&
                                    Object.keys(props.initData.glycan_mass)
                                        .sort()
                                        .map((key) => (
                                            <MenuItem value={props.initData.glycan_mass[key].name}>
                                                {props.initData.glycan_mass[key].name}
                                            </MenuItem>
                                        ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
                <Typography className={classes.label1} gutterBottom>
                     <HelpTooltip
                        title = "Number of Sugars"
                        text = "Use the sliders to select a Number of Sugars range for your glycan(s)."
                    >
                    </HelpTooltip>
                    No of Sugars
                </Typography>
                <RangeInputSlider
                    step={1}
                    min={props.inputValue.glyNumSugarsRange[0]}
                    max={props.inputValue.glyNumSugarsRange[1]}
                    inputValue={props.inputValue.glyNumSugarsInput}
                    setInputValue={(input) =>
                        props.setGlyAdvSearchData({ glyNumSugarsInput: input })
                    }
                    inputValueSlider={props.inputValue.glyNumSugars}
                    setSliderInputValue={(input) =>
                        props.setGlyAdvSearchData({ glyNumSugars: input })
                    }
                />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography className={classes.label1} gutterBottom>
                            <HelpTooltip
                                title = "Organism"
                                text = "An individual animal, plant, or single-celled life form. Click to select an Organism that makes your glycan(s)."
                            >
                            </HelpTooltip>
                            Organisms
                        </Typography>
                        <MultiselectTextInput
                            options={
                                props.initData.organism
                                    ? props.initData.organism.sort(sortDropdown)
                                    : props.initData.organism
                            }
                            inputValue={props.inputValue.glyOrganisms}
                            setInputValue={glyOrgChange}
                            placeholder="Click to select one or multiple Organisms"
                        />
                    </Grid>
                    <Grid item>
                        <Typography className={classes.label4} gutterBottom>
                            &nbsp;
                        </Typography>
                        <FormControl variant="outlined">
                            <Select
                                variant="outlined"
                                classes={{
                                    outlined: classes.selectOutlined,
                                    root: "select-menu",
                                }}
                                value={
                                    props.inputValue.glyOrgOperation
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
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.margin}>
                <Typography className={classes.label1} gutterBottom>
                     <HelpTooltip
                        title = "Glycan Type"
                        text = "The classification of glycan based on the nature of the sugar–peptide bond and the oligosaccharide attached. Click to select a Glycan Type."
                    >
                    </HelpTooltip>
                    Glycan Type
                </Typography>
                <Select
                    value={props.inputValue.glyType}
                    displayEmpty
                    onChange={glyTypeOnChange}
                    className={classes.select1}
                    classes={{
                        outlined: classes.selectOutlined,
                        root: "select-menu",
                    }}
                >
                    <MenuItem value=''>Select Glycan Type</MenuItem>
                    {props.initData.glycan_type &&
                        props.initData.glycan_type
                            .sort(sortDropdown)
                            .map((option) => (
                                <MenuItem value={option.name}>{option.name}</MenuItem>
                            ))}
                </Select>
            </FormControl>
            {!props.inputValue.glySubTypeIsHidden && (
                <FormControl fullWidth variant="outlined" className={classes.margin}>
                    <Typography className={classes.label1} gutterBottom>
                        <HelpTooltip
                            title = "Glycan Subtype"
                            text = "Subclassifcation of Glycan types. Click to select a Glycan Subtype."
                        />
                        Select Glycan Subtype
                    </Typography>
                    <Select
                        value={props.inputValue.glySubType}
                        displayEmpty
                        onChange={glySubTypeOnChange}
                        className={classes.select1}
                        classes={{
                            outlined: classes.selectOutlined,
                            root: "select-menu",
                        }}
                        displayPrint="none"
                    >
                        <MenuItem value="" selected>
                            Select Glycan Subtype
                        </MenuItem>
                        {props.initData.glycan_type &&
                            props.initData.glycan_type.map((option) =>
                                option.subtype
                                    .sort()
                                    .map(
                                        (subtype) =>
                                            option.name === props.inputValue.glyType && (
                                                <MenuItem value={subtype}>{subtype}</MenuItem>
                                            )
                                    )
                            )}
                    </Select>
                </FormControl>
            )}

            <FormControl fullWidth variant="outlined" className={classes.margin}>
                <Typography className={classes.label1} gutterBottom>
                    <HelpTooltip
                        title = "Glycosylated Protein"
                        text = "A unique identifier assigned to a isoform chosen to be the canonical sequence in UniProt database. Enter the UniProtKB Accession for a  protein that bears your glycan. Explore"
                        urlText = "UniProtKB"
                        url = "https://www.uniprot.org/"
                    />
                 Glycosylated Protein
                </Typography>
                <AutoTextInput
                    inputValue={props.inputValue.glyProt}
                    setInputValue={glyProtChange}
                    placeholder="Enter the UniProtKB Accession of your protein"
                    typeahedID="uniprot_canonical_ac"
                    length={12}
                    errorText="Entry is too long - max length is 12."
                />
                <ExampleExploreControl
                    exampleText={"Example:"}
                    setInputValue={glyProtChange}
                    inputValue={"P14210"}
                    exploreText={"UniProtKB Accession"}
                    exploreUrl={"https://www.uniprot.org/help/accession_numbers"}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.margin}>
                <Typography className={classes.label1} gutterBottom>
                    <HelpTooltip
                        title = "Glycan Motif"
                        text = "A “motif” refers to a substructure that appears in multiple glycans including O and N glycans. Enter a Glycan Motif comprising part of your glycan(s). Explore"
                        urlText = "Glycan Motif"
                        url = "https://www.uniprot.org/help/carbohyd"
                    />
                    Glycan Motif
                </Typography>
                <AutoTextInput
                    inputValue={props.inputValue.glyMotif}
                    setInputValue={glyMotifChange}
                    placeholder="Enter the name of a Glycan Motif contained in your glycan"
                    typeahedID="motif_name"
                    length={47}
                    errorText="Entry is too long - max length is 47."
                />
                <ExampleExploreControl
                    exampleText={"Example:"}
                    setInputValue={glyMotifChange}
                    inputValue={"N-Glycan complex"}
                    exploreText={"Glycan Motif"}
                    exploreUrl={"https://www.uniprot.org/help/carbohyd"}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.margin}>
                <Typography className={classes.label1} gutterBottom>
                     <HelpTooltip
                        title = "Biosynthetic Enzyme"
                        text = "Biosynthetic enzymes are enzymes involved in metabolism pathways that convert and modify simple compounds to complex coumpounds and macromolecules. Enter the Gene Name of an enzyme that particpates in the biosynthesis of your glycan(s). Explore"
                        urlText = "Biosynthetic Enzyme"
                        url = "https://enzyme.expasy.org/"
                    />
                    Biosynthetic Enzyme
                </Typography>
                <AutoTextInput
                    inputValue={props.inputValue.glyBioEnz}
                    setInputValue={glyBioEnzChange}
                    placeholder="Enter the Gene Name of an enzyme"
                    typeahedID="gene_name"
                    length={12}
                    errorText="Entry is too long - max length is 12."
                />
                <ExampleExploreControl
                    exampleText={"Example:"}
                    setInputValue={glyBioEnzChange}
                    inputValue={"B4GALT1"}
                    exploreText={"Biosynthetic Enzyme"}
                    exploreUrl={"https://enzyme.expasy.org/"}
                />
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.margin}>
                <Typography className={classes.label1} gutterBottom>
                    <HelpTooltip
                        title = "Pubmed ID"
                        text = "A PMID is the unique identifier number used in PubMed for each article. The PMID is assigned to each article record when it enters the PubMed system. Explore"
                        urlText = "Pubmed ID"
                        url = "https://www.ncbi.nlm.nih.gov/pmc/pmctopmid/"
                    />
                    Pubmed ID
                </Typography>
                <OutlinedInput
                    className={classes.input}
                    placeholder="Enter the Pubmed ID"
                    value={props.inputValue.glyPubId}
                    onChange={PubmedIdChange}
                    error={props.inputValue.glyPubId.length > 20}
                />
                {props.inputValue.glyPubId.length > 20 && (
                    <FormHelperText className={classes.errorText} error>
                        Entry is too long - max length is 20.
                    </FormHelperText>
                )}
                {/* <AutoTextInput
                   inputValue={glyPubId} setInputValue={glycPubIdChange}
                   placeholder="Enter the Pubmed ID"
                   typeahedID = "glycan_pmid"
                  /> */}
                <ExampleExploreControl
                    exampleText={"Example:"}
                    setInputValue={glyPubIdChange}
                    inputValue={"9449027"}
                    exploreText={"Pubmed ID"}
                    exploreUrl={"https://www.ncbi.nlm.nih.gov/pmc/pmctopmid/"}
                />
            </FormControl>
            <Row className="gg-align-right pt-3 mb-2">
                <Button
                    className="gg-btn-outline mr-4"
                    onClick={clearGlycan}
                >
                    Clear Fields
                </Button>
                <Button
                    className="gg-btn-blue"
                    onClick={props.searchGlycanAdvClick}
                    disabled={
                        !props.inputValue.glyAdvSearchValError.every((err) => err === false)
                    }
                >
                    Search Glycan
                </Button>
            </Row>
        </>
    );
};

export default GlycanAdvancedSearch;

GlycanAdvancedSearch.propTypes = {
    initData: PropTypes.object,
    inputValue: PropTypes.array,
    compositionInitMap: PropTypes.array,
    setCompositionData: PropTypes.func,
    getSelectionValue: PropTypes.func,
};

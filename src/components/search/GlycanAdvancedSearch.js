import React from 'react';
import MultilineAutoTextInput from '../input/MultilineAutoTextInput';
import RangeInputSlider from '../input/RangeInputSlider';
import AutoTextInput from '../input/AutoTextInput';
import MultiselectTextInput from '../input/MultiselectTextInput';
import HelpTooltip from '../tooltip/HelpTooltip';
import ExampleExploreControl from '../example/ExampleExploreControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from 'react-bootstrap/Button';
import '../../css/Search.css';
import glycanSearchData from '../../data/json/glycanSearch';
import stringConstants from '../../data/json/stringConstants';

const useStyles = makeStyles((theme) => ({
	// marginLeft: {
	//     justifyContent: "flex-end",
	// },
	// root: {
	//     display: "flex",
	//     flexWrap: "wrap",
	// },
	label: {
		// fontSize: "14px",
		// color: "#4A4A4A",
		fontWeight: 'bold',
        marginLeft: -27,
	},
	// label4: {
	//     fontSize: "15px",
	//     color: "#4A4A4A",
	//     fontWeight: "bold",
	// },
	labelSelect: {
		// fontSize: "16px",
		fontWeight: 'bold',
	},
	errorText: {
		fontSize: '14px  !important',
		marginRight: 0,
		marginLeft: 0,
	},
	// input: {
	//     borderRadius: 4,
	//     position: "relative",
	//     backgroundColor: theme.palette.background.paper,
	//     fontSize: 16,
	//     width: "700px",
	//     height: "34px",
	// },
	// select: {
	//     width: "200px",
	//     height: "34px",
	// },
	// select1: {
	//     width: "700px",
	//     height: "34px",
	// },
	// selectOutlined: {
	//     paddingTop: "4px !important",
	//     paddingBottom: "4px !important",
	//     backgroundColor: "white",
	// }
}));

const GlycanAdvancedSearch = (props) => {
    const classes = useStyles();
    let commonGlycanData = stringConstants.glycan.common;
    let advancedSearch = glycanSearchData.advanced_search;

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

    function glyMassInputChange(mass) {
        props.setGlyAdvSearchData({ glyMassInput: mass })
    }
    
    function glyMassSliderChange(mass) {
        props.setGlyAdvSearchData({ glyMass: mass })
    }
    
    function glyNumSugarsInputChange(numSugars) {
        props.setGlyAdvSearchData({ glyNumSugarsInput: numSugars })
    }
    
    function glyNumSugarsSliderChange(numSugars) {
        props.setGlyAdvSearchData({ glyNumSugars: numSugars })
    }

	const glyTypeOnChange = (event) => {
		if (event.target.value === '')
			props.setGlyAdvSearchData({ glySubTypeIsHidden: true });
		else props.setGlyAdvSearchData({ glySubTypeIsHidden: false });

		props.setGlyAdvSearchData({ glySubType: '' });
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
			glycanId: '',
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
			glyOrgOperation: 'or',
			glyType: '',
			glySubType: '',
			glySubTypeIsHidden: true,
			glyProt: '',
			glyMotif: '',
			glyBioEnz: '',
			glyPubId: '',
			glyAdvSearchValError: [false, false, false, false, false],
		});
	};

	return (
		<>
			<Grid
				container
				style={{ margin: '0  auto' }}
				spacing={3}
				justify='center'>
				{/* Buttons Top */}
				<Grid item xs={12} sm={10}>
					<Row className='gg-align-right pt-2 pb-2 mr-1'>
						<Button className='gg-btn-outline mr-4' onClick={clearGlycan}>
							Clear Fields
						</Button>
						<Button
							className='gg-btn-blue'
							onClick={props.searchGlycanAdvClick}
							disabled={
								!props.inputValue.glyAdvSearchValError.every(
									(err) => err === false
								)
							}>
							Search Glycan
						</Button>
					</Row>
				</Grid>
				{/* Glycan Id */}
				<Grid item xs={12} sm={10} className={'zero-top-padding'}>
					<FormControl fullWidth variant='outlined'>
						<Typography className={classes.label} gutterBottom>
							<HelpTooltip
                                title={commonGlycanData.glycan_id.tooltip.title}
                                text={commonGlycanData.glycan_id.tooltip.text}
                                urlText={commonGlycanData.glycan_id.tooltip.urlText}
                                url={commonGlycanData.glycan_id.tooltip.url}
                            />
                            {commonGlycanData.glycan_id.name}
						</Typography>
						<MultilineAutoTextInput
							fullWidth
							inputValue={props.inputValue.glycanId}
                            setInputValue={glycanIdChange}
                            placeholder={advancedSearch.glycan_id.placeholder}
							typeahedID={advancedSearch.glycan_id.typeahedID}
							length={advancedSearch.glycan_id.length}
							errorText={advancedSearch.glycan_id.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={glycanIdChange}
							inputValue={advancedSearch.glycan_id.examples}
						/>
					</FormControl>
				</Grid>
				{/* Monoisotopic Mass */}
				<Grid item xs={12} sm={10} className={'zero-top-padding'}>
					<FormControl fullWidth>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs={12} sm={9}>
								<Typography className={classes.label} gutterBottom>
									<HelpTooltip
                                        title={commonGlycanData.mass.tooltip.title}
                                        text={commonGlycanData.mass.tooltip.text}
                                    />
                                    {commonGlycanData.mass.name}
								</Typography>
								<RangeInputSlider
									step={10}
									min={props.inputValue.glyMassRange[0]}
									max={props.inputValue.glyMassRange[1]}
									inputValue={props.inputValue.glyMassInput}
                                    setInputValue={glyMassInputChange}
									inputValueSlider={props.inputValue.glyMass}
                                    setSliderInputValue={glyMassSliderChange}
								/>
							</Grid>
							{/* Mass Type */}
							<Grid item xs={12} sm={3}>
								<Typography className={classes.label} gutterBottom>
									&nbsp;
								</Typography>
                                <FormControl 
                                    variant='outlined' 
                                    //margin='dense' 
                                    fullWidth
                                >
									<InputLabel className={classes.labelSelect}>
                                        {commonGlycanData.mass_type.name}
									</InputLabel>
									<Select
										value={props.inputValue.glyMassType}
										onChange={glyMassTypeOnChange}
										classes={{
											//outlined: classes.selectOutlined,
											root: 'select-menu-adv',
										}}
										className={classes.select}
										labelWidth={85}>
											{Object.keys(props.initData.glycan_mass)
												.sort()
												.map((key) => (
													<MenuItem
                                                        key={props.initData.glycan_mass[key].name}
														value={props.initData.glycan_mass[key].name}>
														{props.initData.glycan_mass[key].name}
													</MenuItem>
												))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</FormControl>
				</Grid>
				{/* No of Sugars */}
				<Grid item xs={12} sm={10} className={'zero-top-padding'}>
					<FormControl fullWidth>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs={12} sm={9}>
								<Typography className={classes.label} gutterBottom>
									<HelpTooltip
                                        title={commonGlycanData.number_monosaccharides.tooltip.title}
                                        text={commonGlycanData.number_monosaccharides.tooltip.text}
                                    />
                                    {commonGlycanData.number_monosaccharides.name}
								</Typography>
								<RangeInputSlider
									step={1}
									min={props.inputValue.glyNumSugarsRange[0]}
									max={props.inputValue.glyNumSugarsRange[1]}
									inputValue={props.inputValue.glyNumSugarsInput}
                                    setInputValue={glyNumSugarsInputChange}
									inputValueSlider={props.inputValue.glyNumSugars}
									setSliderInputValue={glyNumSugarsSliderChange}
								/>
							</Grid>
						</Grid>
					</FormControl>
				</Grid>
				{/* Organisms */}
				<Grid item xs={12} sm={10} className={'zero-top-padding'}>
					<FormControl fullWidth>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs={9} sm={9}>
								<Typography
									className={classes.label}
									gutterBottom
								>
									<HelpTooltip
                                        title={commonGlycanData.organism.tooltip.title}
                                        text={commonGlycanData.organism.tooltip.text}
                                    />
                                    {commonGlycanData.organism.name}
								</Typography>
								{<MultiselectTextInput
									options={props.initData.organism.sort(sortDropdown)}
									inputValue={props.inputValue.glyOrganisms}
									setInputValue={glyOrgChange}
									placeholder={advancedSearch.organism.placeholder}
								/>}
							</Grid>
							<Grid item xs={3} sm={3}>
                                <Typography className={classes.label} gutterBottom>
									&nbsp;
								</Typography>
                                <FormControl 
                                    variant='outlined' 
                                    //margin='dense' 
                                    fullWidth
                                >
									<Select
										// margin='dense'
										variant='outlined'
										classes={{
											//outlined: classes.selectOutlined,
											root: 'select-menu-adv',
										}}
										value={props.inputValue.glyOrgOperation}
										onChange={glyOrgOperationOnChange}
										className={classes.select}>
										<MenuItem value={'or'}>Or</MenuItem>
										<MenuItem value={'and'}>And</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</FormControl>
				</Grid>
				{/* Glycan Type */}
				<Grid item xs={12} sm={10} className={'zero-top-padding'}>
					<FormControl
						fullWidth
						variant='outlined'
						// margin='dense'
					>
						<Typography className={classes.label} gutterBottom>
							<HelpTooltip
                                title={commonGlycanData.glycan_type.tooltip.title}
                                text={commonGlycanData.glycan_type.tooltip.text}
                            />
                            {commonGlycanData.glycan_type.name}
						</Typography>
						<Select
							value={props.inputValue.glyType}
							displayEmpty
							onChange={glyTypeOnChange}
							className={classes.select1}
							classes={{
								//outlined: classes.selectOutlined,
                                root: 'select-menu-adv',
							}}>
							<MenuItem value=''>Select Glycan Type</MenuItem>
							{props.initData.glycan_type &&
								props.initData.glycan_type
									.sort(sortDropdown)
									.map((option) => (
										<MenuItem key={option.name} value={option.name}>{option.name}</MenuItem>
									))}
						</Select>
					</FormControl>
				</Grid>
				{/* Glycan Subtype */}

				{!props.inputValue.glySubTypeIsHidden && (
					<Grid item xs={12} sm={10} className={'zero-top-padding'}>
						<FormControl
							fullWidth
							variant='outlined'
							//margin='dense'
						>
							<Typography className={classes.label} gutterBottom>
								<HelpTooltip
                                    title={commonGlycanData.glycan_subtype.tooltip.title}
                                    text={commonGlycanData.glycan_subtype.tooltip.text}
                                />
                            {commonGlycanData.glycan_subtype.name}
							</Typography>
							<Select
								value={props.inputValue.glySubType}
								displayEmpty
								onChange={glySubTypeOnChange}
								className={classes.select1}
								classes={{
									//outlined: classes.selectOutlined,
									root: 'select-menu-adv',
								}}
							>
								<MenuItem value='' selected>
									Select Glycan Subtype
								</MenuItem>
								{props.initData.glycan_type &&
									props.initData.glycan_type.map((option) =>
										option.subtype
											.sort()
											.map(
												(subtype) =>
													option.name === props.inputValue.glyType && (
														<MenuItem key={subtype} value={subtype}>{subtype}</MenuItem>
													)
											)
									)}
							</Select>
						</FormControl>
					</Grid>
				)}

				{/* Glycosylated Protein */}
				<Grid item xs={12} sm={10} className={'zero-top-padding'}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={classes.label}
							gutterBottom
						>
							<HelpTooltip
                                title={commonGlycanData.protein_identifier.tooltip.title}
                                text={commonGlycanData.protein_identifier.tooltip.text}
                                urlText={commonGlycanData.protein_identifier.tooltip.urlText}
                                url={commonGlycanData.protein_identifier.tooltip.url}
                            />
                            {commonGlycanData.protein_identifier.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.glyProt}
                            setInputValue={glyProtChange}
                            placeholder={advancedSearch.protein_identifier.placeholder}
							typeahedID={advancedSearch.protein_identifier.typeahedID}
							length={advancedSearch.protein_identifier.length}
							errorText={advancedSearch.protein_identifier.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={glyProtChange}
							inputValue={advancedSearch.protein_identifier.examples}
						/>
					</FormControl>
				</Grid>
				{/* Glycan Motif */}
				<Grid item xs={12} sm={10} className={'zero-top-padding'}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={classes.label}
							gutterBottom
						>
							<HelpTooltip
                                title={commonGlycanData.glycan_motif.tooltip.title}
                                text={commonGlycanData.glycan_motif.tooltip.text}
                                urlText={commonGlycanData.glycan_motif.tooltip.urlText}
                                url={commonGlycanData.glycan_motif.tooltip.url}
                            />
                            {commonGlycanData.glycan_motif.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.glyMotif}
                            setInputValue={glyMotifChange}
                            placeholder={advancedSearch.glycan_motif.placeholder}
							typeahedID={advancedSearch.glycan_motif.typeahedID}
							length={advancedSearch.glycan_motif.length}
							errorText={advancedSearch.glycan_motif.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={glyMotifChange}
							inputValue={advancedSearch.glycan_motif.examples}
						/>
					</FormControl>
				</Grid>
				{/* Biosynthetic Enzyme */}
				<Grid item xs={12} sm={10} className={'zero-top-padding'}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={classes.label}
							gutterBottom
						>
							<HelpTooltip
                                title={commonGlycanData.enzyme.tooltip.title}
                                text={commonGlycanData.enzyme.tooltip.text}
                                urlText={commonGlycanData.enzyme.tooltip.urlText}
                                url={commonGlycanData.enzyme.tooltip.url}
                            />
                            {commonGlycanData.enzyme.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.glyBioEnz}
                            setInputValue={glyBioEnzChange}
                            placeholder={advancedSearch.enzyme.placeholder}
							typeahedID={advancedSearch.enzyme.typeahedID}
							length={advancedSearch.enzyme.length}
							errorText={advancedSearch.enzyme.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={glyBioEnzChange}
							inputValue={advancedSearch.enzyme.examples}
						/>
					</FormControl>
				</Grid>
				{/* Pubmed ID */}
				<Grid item xs={12} sm={10} className={'zero-top-bottom-padding'}>
					<FormControl
						fullWidth
						variant='outlined'
						margin='dense'
					>
						<Typography className={classes.label} gutterBottom>
							<HelpTooltip
                                title={commonGlycanData.pmid.tooltip.title}
                                text={commonGlycanData.pmid.tooltip.text}
                                urlText={commonGlycanData.pmid.tooltip.urlText}
                                url={commonGlycanData.pmid.tooltip.url}
                            />
                            {commonGlycanData.pmid.name}
						</Typography>
						<OutlinedInput
                            className={classes.input}
                            placeholder={advancedSearch.pmid.placeholder}
                            value={props.inputValue.glyPubId}
                            onChange={PubmedIdChange}
                            error={props.inputValue.glyPubId.length > advancedSearch.pmid.length}
						/>
						{props.inputValue.glyPubId.length > advancedSearch.pmid.length && (
							<FormHelperText className={classes.errorText} error>
								{advancedSearch.pmid.errorText}
							</FormHelperText>
						)}
						{/* <AutoTextInput
                        inputValue={glyPubId} setInputValue={glycPubIdChange}
                        placeholder="Enter the Pubmed ID"
                        typeahedID = "glycan_pmid"
                        /> */}
                        <ExampleExploreControl
							setInputValue={glyPubIdChange}
							inputValue={advancedSearch.pmid.examples}
						/>
					</FormControl>
				</Grid>
				{/* Buttons Buttom */}
				<Grid item xs={12} sm={10}>
					<Row className='gg-align-right pt-3 mb-2 mr-1'>
						<Button className='gg-btn-outline mr-4' onClick={clearGlycan}>
							Clear Fields
						</Button>
						<Button
							className='gg-btn-blue'
							onClick={props.searchGlycanAdvClick}
							disabled={
								!props.inputValue.glyAdvSearchValError.every(
									(err) => err === false
								)
							}>
							Search Glycan
						</Button>
					</Row>
				</Grid>
			</Grid>
		</>
	);
};

export default GlycanAdvancedSearch;

GlycanAdvancedSearch.propTypes = {
	initData: PropTypes.object,
	inputValue: PropTypes.object,
	setCompositionData: PropTypes.func,
	getSelectionValue: PropTypes.func,
};

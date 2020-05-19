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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from 'react-bootstrap/Button';
import '../../css/Search.css';
import proteinSearchData from '../../data/json/proteinSearch';
import stringConstants from '../../data/json/stringConstants';


const ProteinAdvancedSearch = (props) => {
    let commonProteinData = stringConstants.protein.common;
    let advancedSearch = proteinSearchData.advanced_search;

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

    function proMassInputChange(mass) {
        props.setProAdvSearchData({ proMassInput: mass })
    }
    
    function proMassSliderChange(mass) {
        props.setProAdvSearchData({ proMass: mass })
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

	function proteinIdChange(inputProteinId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[0] = inputProteinId.length > 2500;
		props.setProAdvSearchData({ proteinId: inputProteinId, proAdvSearchValError: valArr });
	}

	function proRefSeqIdChange(inputProRefSeqId) {
		// props.setGlyAdvSearchData({ proRefSeqId: inputProRefSeqId });
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[1] = inputProRefSeqId.length > 12;
		props.setProAdvSearchData({ proRefSeqId: inputProRefSeqId, proAdvSearchValError: valArr });
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

	const clearProtein = () => {
		props.setProAdvSearchData({
			proteinId: '',
			proRefSeqId: '',
			proMass: [
				Math.floor(props.initData.protein_mass.min),
				Math.ceil(props.initData.protein_mass.max),
			],
			proMassInput: [
				Math.floor(props.initData.protein_mass.min),
				Math.ceil(props.initData.protein_mass.max),
			],
			proMassRange: [
				Math.floor(props.initData.protein_mass.min),
				Math.ceil(props.initData.protein_mass.max),
			],
			proAdvSearchValError: [false, false, false, false, false],
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
						<Button className='gg-btn-outline mr-4' onClick={clearProtein}>
							Clear Fields
						</Button>
						<Button
							className='gg-btn-blue'
							onClick={props.searchProteinAdvClick}
							disabled={
								!props.inputValue.proAdvSearchValError.every(
									(err) => err === false
								)
							}>
							Search Protein
						</Button>
					</Row>
				</Grid>
				{/* Glycan Id */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography className={'search-lbl'} gutterBottom>
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
                            placeholder={advancedSearch.uniprot_canonical_ac.placeholder}
							typeahedID={advancedSearch.uniprot_canonical_ac.typeahedID}
							length={advancedSearch.uniprot_canonical_ac.length}
							errorText={advancedSearch.uniprot_canonical_ac.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proteinIdChange}
							inputValue={advancedSearch.uniprot_canonical_ac.examples}
						/>
					</FormControl>
				</Grid>
				{/* RefSeq Accession */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.refseq_ac.tooltip.title}
                                text={commonProteinData.refseq_ac.tooltip.text}
                                urlText={commonProteinData.refseq_ac.tooltip.urlText}
                                url={commonProteinData.refseq_ac.tooltip.url}
                            />
                            {commonProteinData.refseq_ac.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proRefSeqId}
                            setInputValue={proRefSeqIdChange}
                            placeholder={advancedSearch.refseq_ac.placeholder}
							typeahedID={advancedSearch.refseq_ac.typeahedID}
							length={advancedSearch.refseq_ac.length}
							errorText={advancedSearch.refseq_ac.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proRefSeqIdChange}
							inputValue={advancedSearch.refseq_ac.examples}
						/>
					</FormControl>
				</Grid>
				{/* Chemical Mass */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth>
						<Typography className={'search-lbl'} gutterBottom>
							<HelpTooltip
								title={commonProteinData.mass.tooltip.title}
								text={commonProteinData.mass.tooltip.text}
							/>
							{commonProteinData.mass.name}
						</Typography>
						<RangeInputSlider
							step={1}
							min={props.inputValue.proMassRange[0]}
							max={props.inputValue.proMassRange[1]}
							inputClass='pro-rng-input'
							inputValue={props.inputValue.proMassInput}
							setInputValue={proMassInputChange}
							inputValueSlider={props.inputValue.proMass}
							setSliderInputValue={proMassSliderChange}
						/>
					</FormControl>
				</Grid>
				{/* Organisms */}
				{/* <Grid item xs={12} sm={10}>
					<FormControl fullWidth>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs={9} sm={9}>
								<Typography
									className={'search-lbl'}
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
                                <Typography className={'search-lbl'} gutterBottom>
									&nbsp;
								</Typography>
                                <FormControl 
                                    variant='outlined' 
                                    fullWidth
                                >
									<Select
										variant='outlined'
										classes={{
											root: 'select-menu-adv',
										}}
										value={props.inputValue.glyOrgOperation}
										onChange={glyOrgOperationOnChange}
									>
										<MenuItem value={'or'}>Or</MenuItem>
										<MenuItem value={'and'}>And</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</FormControl>
				</Grid> */}
				{/* Glycan Type */}
				{/* <Grid item xs={12} sm={10}>
					<FormControl
						fullWidth
						variant='outlined'
					>
						<Typography className={'search-lbl'} gutterBottom>
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
							classes={{
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
				</Grid> */}
				{/* Glycan Subtype */}

				{/* {!props.inputValue.glySubTypeIsHidden && (
					<Grid item xs={12} sm={10}>
						<FormControl
							fullWidth
							variant='outlined'
							//margin='dense'
						>
							<Typography className={'search-lbl'} gutterBottom>
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
								classes={{
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
				)} */}

				{/* Glycosylated Protein */}
				{/* <Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
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
				</Grid> */}
				{/* Glycan Motif */}
				{/* <Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
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
				</Grid> */}
				{/* Biosynthetic Enzyme */}
				{/* <Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
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
				</Grid> */}
				{/* Pubmed ID */}
				{/* <Grid item xs={12} sm={10}>
					<FormControl
						fullWidth
						variant='outlined'
					>
						<Typography className={'search-lbl'} gutterBottom>
							<HelpTooltip
                                title={commonGlycanData.pmid.tooltip.title}
                                text={commonGlycanData.pmid.tooltip.text}
                                urlText={commonGlycanData.pmid.tooltip.urlText}
                                url={commonGlycanData.pmid.tooltip.url}
                            />
                            {commonGlycanData.pmid.name}
						</Typography>
						<OutlinedInput
                            placeholder={advancedSearch.pmid.placeholder}
                            margin='dense'
                            value={props.inputValue.glyPubId}
                            onChange={PubmedIdChange}
                            error={props.inputValue.glyPubId.length > advancedSearch.pmid.length}
						/>
						{props.inputValue.glyPubId.length > advancedSearch.pmid.length && (
							<FormHelperText className={"error-text"} error>
								{advancedSearch.pmid.errorText}
							</FormHelperText>
						)} */}
						{/* <AutoTextInput
                        inputValue={glyPubId} setInputValue={glycPubIdChange}
                        placeholder="Enter the Pubmed ID"
                        typeahedID = "glycan_pmid"
                        /> */}
                        {/* <ExampleExploreControl
							setInputValue={glyPubIdChange}
							inputValue={advancedSearch.pmid.examples}
						/>
					</FormControl>
				</Grid> */}
				{/* Buttons Buttom */}
				<Grid item xs={12} sm={10}>
					<Row className='gg-align-right pt-3 mb-2 mr-1'>
						<Button className='gg-btn-outline mr-4' onClick={clearProtein}>
							Clear Fields
						</Button>
						<Button
							className='gg-btn-blue'
							onClick={props.searchProteinAdvClick}
							disabled={
								!props.inputValue.proAdvSearchValError.every(
									(err) => err === false
								)
							}>
							Search Protein
						</Button>
					</Row>
				</Grid>
			</Grid>
		</>
	);
};

export default ProteinAdvancedSearch;

ProteinAdvancedSearch.propTypes = {
	initData: PropTypes.object,
	inputValue: PropTypes.object,
};

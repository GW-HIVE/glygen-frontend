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

	function proAminoAcidChange(inputProAminoAcid) {
		props.setProAdvSearchData({ proAminoAcid: inputProAminoAcid });
	}

	const proAminoAcidOperationOnChange = (event) => {
		props.setProAdvSearchData({ proAminoAcidOperation: event.target.value });
	}

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

	const proOrganismOnChange = (event, child) => {
		props.setProAdvSearchData({ proOrganism: {id : child.props.value, name : child.props.name} });
	};

	function proteinNameChange(inputProteinName) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[0] = inputProteinName.length > 1000;
		props.setProAdvSearchData({ proteinName: inputProteinName, proAdvSearchValError: valArr });	
	}

	function proGeneNameChange(inputGeneName) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[0] = inputGeneName.length > 1000;
		props.setProAdvSearchData({ proGeneName: inputGeneName, proAdvSearchValError: valArr });	
	}

	function proteinIdChange(inputProteinId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[0] = inputProteinId.length > 2500;
		props.setProAdvSearchData({ proteinId: inputProteinId, proAdvSearchValError: valArr });
	}

	function proRefSeqIdChange(inputProRefSeqId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[1] = inputProRefSeqId.length > 12;
		props.setProAdvSearchData({ proRefSeqId: inputProRefSeqId, proAdvSearchValError: valArr });
	}

	function proGONameChange(inputProGOName) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[2] = inputProGOName.length > 47;
		props.setProAdvSearchData({ proGOName: inputProGOName, proAdvSearchValError: valArr });
	}

	function proGOIdChange(inputProGOId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[3] = inputProGOId.length > 12;
		props.setProAdvSearchData({ proGOId: inputProGOId, proAdvSearchValError: valArr });
	}

	function proGlytoucanAcChange(inputGlytoucanAc) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[3] = inputGlytoucanAc.length > 12;
		props.setProAdvSearchData({ proGlytoucanAc: inputGlytoucanAc, proAdvSearchValError: valArr });
	}

	function proPubIdChange(inputProPubId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[4] = inputProPubId.length > 20;
		props.setProAdvSearchData({ proPubId: inputProPubId, proAdvSearchValError: valArr });
	}

	const PubmedIdChange = (event) => {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[4] = event.target.value.length > 20;
		props.setProAdvSearchData({ proPubId: event.target.value, proAdvSearchValError: valArr });
	}

	function proSequenceChange(inputProSequence) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[4] = inputProSequence.length > 20;
		props.setProAdvSearchData({ proSequence: inputProSequence, proAdvSearchValError: valArr });
	}

	const SequenceChange = (event) => {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[4] = event.target.value.length > 20;
		props.setProAdvSearchData({ proSequence: event.target.value, proAdvSearchValError: valArr });
	}
	
	function proPathwayIdChange(inputProPathwayId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[4] = inputProPathwayId.length > 20;
		props.setProAdvSearchData({ proPathwayId: inputProPathwayId, proAdvSearchValError: valArr });
	}
	 
	const proRelationOnChange = (event) => {
		props.setProAdvSearchData({ proRelation: event.target.value });
	}
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
							labelDisplay='off'
							inputValue={props.inputValue.proMassInput}
							setInputValue={proMassInputChange}
							inputValueSlider={props.inputValue.proMass}
							setSliderInputValue={proMassSliderChange}
						/>
					</FormControl>
				</Grid>
				{/* Organism */}
				<Grid item xs={12} sm={10}>
					<FormControl
						fullWidth
						variant='outlined'
					>
						<Typography className={'search-lbl'} gutterBottom>
							<HelpTooltip
                                title={commonProteinData.organism.tooltip.title}
                                text={commonProteinData.organism.tooltip.text}
                            />
                            {commonProteinData.organism.name}
						</Typography>
						<Select
							value={props.inputValue.proOrganism.id}
							displayEmpty
							onChange={proOrganismOnChange}
							classes={{
                                root: 'select-menu-adv',
							}}>
							<MenuItem key="0" value="0" name="All">Select Organism</MenuItem>
							{props.initData.organism &&
								props.initData.organism
									.sort(sortDropdown)
									.map((option) => (
										<MenuItem key={option.id} value={option.id} name={option.name}>{option.name}</MenuItem>
									))}
						</Select>
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
                                title={commonProteinData.protein_name.tooltip.title}
                                text={commonProteinData.protein_name.tooltip.text}
                                urlText={commonProteinData.protein_name.tooltip.urlText}
                                url={commonProteinData.protein_name.tooltip.url}
                            />
                            {commonProteinData.protein_name.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proteinName}
                            setInputValue={proteinNameChange}
                            placeholder={advancedSearch.protein_name.placeholder}
							typeahedID={advancedSearch.protein_name.typeahedID}
							length={advancedSearch.protein_name.length}
							errorText={advancedSearch.protein_name.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proteinNameChange}
							inputValue={advancedSearch.protein_name.examples}
						/>
					</FormControl>
				</Grid>
				{/* Gene Name */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.gene_name.tooltip.title}
                                text={commonProteinData.gene_name.tooltip.text}
                                urlText={commonProteinData.gene_name.tooltip.urlText}
                                url={commonProteinData.gene_name.tooltip.url}
                            />
                            {commonProteinData.gene_name.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proGeneName}
                            setInputValue={proGeneNameChange}
                            placeholder={advancedSearch.gene_name.placeholder}
							typeahedID={advancedSearch.gene_name.typeahedID}
							length={advancedSearch.gene_name.length}
							errorText={advancedSearch.gene_name.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proGeneNameChange}
							inputValue={advancedSearch.gene_name.examples}
						/>
					</FormControl>
				</Grid>
				{/*  GO Name */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.go_term.tooltip.title}
                                text={commonProteinData.go_term.tooltip.text}
                                urlText={commonProteinData.go_term.tooltip.urlText}
                                url={commonProteinData.go_term.tooltip.url}
                            />
                            {commonProteinData.go_term.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proGOName}
                            setInputValue={proGONameChange}
                            placeholder={advancedSearch.go_term.placeholder}
							typeahedID={advancedSearch.go_term.typeahedID}
							length={advancedSearch.go_term.length}
							errorText={advancedSearch.go_term.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proGONameChange}
							inputValue={advancedSearch.go_term.examples}
						/>
					</FormControl>
				</Grid>
				{/* GO ID */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.go_id.tooltip.title}
                                text={commonProteinData.go_id.tooltip.text}
                                urlText={commonProteinData.go_id.tooltip.urlText}
                                url={commonProteinData.go_id.tooltip.url}
                            />
                            {commonProteinData.go_id.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proGOId}
                            setInputValue={proGOIdChange}
                            placeholder={advancedSearch.go_id.placeholder}
							typeahedID={advancedSearch.go_id.typeahedID}
							length={advancedSearch.go_id.length}
							errorText={advancedSearch.go_id.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proGOIdChange}
							inputValue={advancedSearch.go_id.examples}
						/>
					</FormControl>
				</Grid>
				{/* Interacting Glycan */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.glytoucan_ac.tooltip.title}
                                text={commonProteinData.glytoucan_ac.tooltip.text}
                                urlText={commonProteinData.glytoucan_ac.tooltip.urlText}
                                url={commonProteinData.glytoucan_ac.tooltip.url}
                            />
                            {commonProteinData.glytoucan_ac.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proGlytoucanAc}
                            setInputValue={proGlytoucanAcChange}
                            placeholder={advancedSearch.glytoucan_ac.placeholder}
							typeahedID={advancedSearch.glytoucan_ac.typeahedID}
							length={advancedSearch.glytoucan_ac.length}
							errorText={advancedSearch.glytoucan_ac.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proGlytoucanAcChange}
							inputValue={advancedSearch.glytoucan_ac.examples}
						/>
					</FormControl>
				</Grid>
				{/* Organisms */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs={9} sm={9}>
								<Typography
									className={'search-lbl'}
									gutterBottom
								>
									<HelpTooltip
                                        title={commonProteinData.glycosylated_aa.tooltip.title}
                                        text={commonProteinData.glycosylated_aa.tooltip.text}
                                    />
                                    {commonProteinData.glycosylated_aa.name}
								</Typography>
								{<MultiselectTextInput
									options={props.initData.aa_list.sort()}
									inputValue={props.inputValue.proAminoAcid}
									setInputValue={proAminoAcidChange}
									placeholder={advancedSearch.aa_list.placeholder}
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
										value={props.inputValue.proAminoAcidOperation}
										onChange={proAminoAcidOperationOnChange}
									>
										<MenuItem value={'or'}>Or</MenuItem>
										<MenuItem value={'and'}>And</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</FormControl>
				</Grid>
				{/* Protein or Peptide Sequence */}
				<Grid item xs={12} sm={10}>
					<FormControl
						fullWidth
						variant='outlined'
					>
						<Typography className={'search-lbl'} gutterBottom>
							<HelpTooltip
                                title={commonProteinData.sequence.tooltip.title}
                                text={commonProteinData.sequence.tooltip.text}
                                urlText={commonProteinData.sequence.tooltip.urlText}
                                url={commonProteinData.sequence.tooltip.url}
                            />
                            {commonProteinData.sequence.name}
						</Typography>
						<OutlinedInput
                            placeholder={advancedSearch.sequence.placeholder}
							margin='dense'
							multiline
							rows={3}
                            value={props.inputValue.proSequence}
                            onChange={SequenceChange}
                            error={props.inputValue.proSequence.length > advancedSearch.sequence.length}
						/>
						{props.inputValue.proSequence.length > advancedSearch.sequence.length && (
							<FormHelperText className={"error-text"} error>
								{advancedSearch.sequence.errorText}
							</FormHelperText>
						)}
						{/* <AutoTextInput
                        inputValue={glyPubId} setInputValue={glycPubIdChange}
                        placeholder="Enter the Pubmed ID"
                        typeahedID = "glycan_pmid"
                        /> */}
                        <ExampleExploreControl
							setInputValue={proSequenceChange}
							inputValue={advancedSearch.sequence.examples}
						/>
					</FormControl>
				</Grid>
				{/* Pathway ID */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.pathway_id.tooltip.title}
                                text={commonProteinData.pathway_id.tooltip.text}
                                urlText={commonProteinData.pathway_id.tooltip.urlText}
                                url={commonProteinData.pathway_id.tooltip.url}
                            />
                            {commonProteinData.pathway_id.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proPathwayId}
                            setInputValue={proPathwayIdChange}
                            placeholder={advancedSearch.pathway_id.placeholder}
							typeahedID={advancedSearch.pathway_id.typeahedID}
							length={advancedSearch.pathway_id.length}
							errorText={advancedSearch.pathway_id.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proPathwayIdChange}
							inputValue={advancedSearch.pathway_id.examples}
						/>
					</FormControl>
				</Grid>
				{/* Pubmed ID */}
				<Grid item xs={12} sm={10}>
					<FormControl
						fullWidth
						variant='outlined'
					>
						<Typography className={'search-lbl'} gutterBottom>
							<HelpTooltip
                                title={commonProteinData.pmid.tooltip.title}
                                text={commonProteinData.pmid.tooltip.text}
                                urlText={commonProteinData.pmid.tooltip.urlText}
                                url={commonProteinData.pmid.tooltip.url}
                            />
                            {commonProteinData.pmid.name}
						</Typography>
						<OutlinedInput
                            placeholder={advancedSearch.pmid.placeholder}
                            margin='dense'
                            value={props.inputValue.proPubId}
                            onChange={PubmedIdChange}
                            error={props.inputValue.proPubId.length > advancedSearch.pmid.length}
						/>
						{props.inputValue.proPubId.length > advancedSearch.pmid.length && (
							<FormHelperText className={"error-text"} error>
								{advancedSearch.pmid.errorText}
							</FormHelperText>
						)}
						{/* <AutoTextInput
                        inputValue={glyPubId} setInputValue={glycPubIdChange}
                        placeholder="Enter the Pubmed ID"
                        typeahedID = "glycan_pmid"
                        /> */}
                        <ExampleExploreControl
							setInputValue={proPubIdChange}
							inputValue={advancedSearch.pmid.examples}
						/>
					</FormControl>
				</Grid>
				{/* Glycosylation Evidences */}
				<Grid item xs={12} sm={10}>
					<FormControl
						fullWidth
						variant='outlined'
					>
						<Typography className={'search-lbl'} gutterBottom>
							<HelpTooltip
                                title={commonProteinData.relation.tooltip.title}
                                text={commonProteinData.relation.tooltip.text}
                            />
                            {commonProteinData.relation.name}
						</Typography>
						<Select
							value={props.inputValue.proRelation}
							displayEmpty
							onChange={proRelationOnChange}
							classes={{
                                root: 'select-menu-adv',
							}}>
							<MenuItem value=''>Select Glycosylation Evidence Type</MenuItem>
							<MenuItem value='both'>Both</MenuItem>
							<MenuItem value='reported'>Reported</MenuItem>
							<MenuItem value='predicted'>Predicted</MenuItem>
						</Select>
					</FormControl>
				</Grid>
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

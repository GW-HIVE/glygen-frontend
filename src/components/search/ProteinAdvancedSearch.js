import React from 'react';
import MultilineAutoTextInput from '../input/MultilineAutoTextInput';
import RangeInputSlider from '../input/RangeInputSlider';
import AutoTextInput from '../input/AutoTextInput';
import SelectControl from '../select/SelectControl';
import CategorizedAutoTextInput from '../input/CategorizedAutoTextInput';
import MultiselectTextInput from '../input/MultiselectTextInput';
import HelpTooltip from '../tooltip/HelpTooltip';
import ExampleExploreControl from '../example/ExampleExploreControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Button from 'react-bootstrap/Button';
import {sortDropdown} from '../../utils/common';
import '../../css/Search.css';
import proteinSearchData from '../../data/json/proteinSearch';
import stringConstants from '../../data/json/stringConstants';

/**
 * Protein advanced search control.
 */
const ProteinAdvancedSearch = (props) => {
    let commonProteinData = stringConstants.protein.common;
    let advancedSearch = proteinSearchData.advanced_search;

	/**
	 * Function to set protein id value.
	 * @param {string} inputProteinId - input protein id value.
	 **/
	function proteinIdChange(inputProteinId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[0] = inputProteinId.length > advancedSearch.uniprot_canonical_ac.length;
		props.setProAdvSearchData({ proteinId: inputProteinId, proAdvSearchValError: valArr });
	}

	/**
	 * Function to set RefSeq id value.
	 * @param {string} inputProRefSeqId - input RefSeq id value value.
	 **/
	function proRefSeqIdChange(inputProRefSeqId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[1] = inputProRefSeqId.length > advancedSearch.refseq_ac.length;
		props.setProAdvSearchData({ proRefSeqId: inputProRefSeqId, proAdvSearchValError: valArr });
	}

	/**
	 * Function to set mass value.
	 * @param {array} inputMass - input min, max mass value.
	 **/
	function proMassInputChange(inputMass) {
        props.setProAdvSearchData({ proMassInput: inputMass })
    }
    
	/**
	 * Function to set slider mass value.
	 * @param {array} inputMass - input min, max mass value.
	 **/
    function proMassSliderChange(inputMass) {
        props.setProAdvSearchData({ proMass: inputMass })
	}

	/**
	 * Function to set organism value.
	 * @param {string} value - input organism id value.
	 * @param {string} name - input organism name value.
	 **/
	const proOrganismOnChange = (value, name) => {
		props.setProAdvSearchData({ proOrganism: {id: value, name: name} });
	}

	/**
	 * Function to set protein name value.
	 * @param {string} inputProteinName - input protein name value.
	 **/
	function proteinNameChange(inputProteinName) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[2] = inputProteinName.length > advancedSearch.protein_name.length;
		props.setProAdvSearchData({ proteinName: inputProteinName, proAdvSearchValError: valArr });	
	}

	/**
	 * Function to set gene name value.
	 * @param {string} inputGeneName - input gene name value.
	 **/
	function proGeneNameChange(inputGeneName) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[3] = inputGeneName.length > advancedSearch.gene_name.length;
		props.setProAdvSearchData({ proGeneName: inputGeneName, proAdvSearchValError: valArr });	
	}

	/**
	 * Function to set GO name value.
	 * @param {string} inputProGOName - input GO name value.
	 **/
	function proGONameChange(inputProGOName) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[4] = inputProGOName.length > advancedSearch.go_term.length;
		props.setProAdvSearchData({ proGOName: inputProGOName, proAdvSearchValError: valArr });
	}


	/**
	 * Function to set GO id value.
	 * @param {string} inputProGOId - input GO id value.
	 **/
	function proGOIdChange(inputProGOId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[5] = inputProGOId.length > advancedSearch.go_id.length;
		props.setProAdvSearchData({ proGOId: inputProGOId, proAdvSearchValError: valArr });
	}


	/**
	 * Function to set input amino acid value.
	 * @param {string} inputProAminoAcid - input amino acid value.
	 **/
	function proAminoAcidChange(inputProAminoAcid) {
		props.setProAdvSearchData({ proAminoAcid: inputProAminoAcid });
	}

	/**
	 * Function to set input amino acid operation value.
	 * @param {string} value - input amino acid operation value.
	 **/
	const proAminoAcidOperationOnChange = (value) => {
		props.setProAdvSearchData({ proAminoAcidOperation: value });
	}

	/**
	 * Function to set protein or peptide sequence value.
	 * @param {string} inputProSequence - input protein or peptide sequence value.
	 **/
	function proSequenceChange(inputProSequence) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[6] = inputProSequence.length > advancedSearch.sequence.length;
		props.setProAdvSearchData({ proSequence: inputProSequence, proAdvSearchValError: valArr });
	}

	/**
	 * Function to handle onchange event for protein or peptide sequence.
	 * @param {object} event - event object.
	 **/
	const SequenceChange = (event) => {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[6] = event.target.value.length > advancedSearch.sequence.length;
		props.setProAdvSearchData({ proSequence: event.target.value, proAdvSearchValError: valArr });
	}
	
	/**
	 * Function to set pathway id value.
	 * @param {string} inputProPathwayId - input pathway id value.
	 **/
	function proPathwayIdChange(inputProPathwayId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[7] = inputProPathwayId.length > advancedSearch.pathway_id.length;
		props.setProAdvSearchData({ proPathwayId: inputProPathwayId, proAdvSearchValError: valArr });
	}

	/**
	 * Function to set pubmed id value.
	 * @param {string} inputProPubId - input pubmed id value.
	 **/
	function proPubIdChange(inputProPubId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[8] = inputProPubId.length > advancedSearch.pmid.length;
		props.setProAdvSearchData({ proPubId: inputProPubId, proAdvSearchValError: valArr });
	}

	/**
	 * Function to set glycosylation evidence type value.
	 * @param {string} value - input glycosylation evidence type value.
	 **/
	const proGlyEvidenceOnChange = (value) => {
		props.setProAdvSearchData({ proGlyEvidence: value });
	}

	/**
	 * Function to set disease name value.
	 * @param {string} inputProDiseaseName - input disease name value.
	 **/
	function proDiseaseNameChange(inputProDiseaseName) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[9] = inputProDiseaseName.length > advancedSearch.disease_name.length;
		props.setProAdvSearchData({ proDiseaseName: inputProDiseaseName, proAdvSearchValError: valArr });
	}

	/**
	 * Function to set disease id value.
	 * @param {string} inputProDiseaseId - input disease id value.
	 **/
	function proDiseaseIdChange(inputProDiseaseId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[10] = inputProDiseaseId.length > advancedSearch.disease_id.length;
		props.setProAdvSearchData({ proDiseaseId: inputProDiseaseId, proAdvSearchValError: valArr });
	}

	/**
	 * Function to set attached glycan id value.
	 * @param {string} inputProAttachedGlycanId - input attached glycan id value.
	 **/
	function proAttachedGlycanIdChange(inputProAttachedGlycanId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[11] = inputProAttachedGlycanId.length > advancedSearch.attached_glycan_id.length;
		props.setProAdvSearchData({ proAttachedGlycanId: inputProAttachedGlycanId, proAdvSearchValError: valArr });
	}

	/**
	 * Function to set binding glycan id value.
	 * @param {string} inputProBindingGlycanId - input binding glycan id value.
	 **/
	function proBindingGlycanIdChange(inputProBindingGlycanId) {
		let valArr = props.inputValue.proAdvSearchValError;
		valArr[12] = inputProBindingGlycanId.length > advancedSearch.binding_glycan_id.length;
		props.setProAdvSearchData({ proBindingGlycanId: inputProBindingGlycanId, proAdvSearchValError: valArr });
	}
	 
	/**
	 * Function to clear input field values.
	 **/
	const clearProtein = () => {
		props.setProAdvSearchData({
			proteinId: '',
			proRefSeqId: '',
			proMass: [
				Math.floor(props.initData.protein_mass.min),
				Math.ceil(props.initData.protein_mass.max),
			],
			proMassInput: [
				Math.floor(props.initData.protein_mass.min).toLocaleString('en-US'),
				Math.ceil(props.initData.protein_mass.max).toLocaleString('en-US'),
			],
			proMassRange: [
				Math.floor(props.initData.protein_mass.min),
				Math.ceil(props.initData.protein_mass.max),
			],
			proOrganism: {id: advancedSearch.organism.placeholderId, name: advancedSearch.organism.placeholderName},
			proteinName: '',
			proGeneName: '',
			proGOName: '',
			proGOId: '',
			proAminoAcid: [],
			proAminoAcidOperation: 'or',
			proSequence: '',
			proPathwayId: '',
			proPubId: '',
			proGlyEvidence: advancedSearch.glycosylation_evidence.placeholderId,
			proDiseaseName: '',
			proDiseaseId: '',
			proAttachedGlycanId: '',
			proBindingGlycanId: '',
			proAdvSearchValError: [false, false, false, false, false,
				false, false, false, false, false, false, false, false]
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
				{/* Protein Id */}
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
							step={10}
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
						<SelectControl
							inputValue={props.inputValue.proOrganism.id}
							placeholder={advancedSearch.organism.placeholder}
							placeholderId={advancedSearch.organism.placeholderId}
							placeholderName={advancedSearch.organism.placeholderName}
							menu={props.initData.organism}
							setInputValue={proOrganismOnChange}
						/>
					</FormControl>
				</Grid>
				{/* Protein Name */}
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
						<CategorizedAutoTextInput
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
				{/* Covalently Attached Glycan */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.attached_glycan_id.tooltip.title}
                                text={commonProteinData.attached_glycan_id.tooltip.text}
                                urlText={commonProteinData.attached_glycan_id.tooltip.urlText}
                                url={commonProteinData.attached_glycan_id.tooltip.url}
                            />
                            {commonProteinData.attached_glycan_id.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proAttachedGlycanId}
                            setInputValue={proAttachedGlycanIdChange}
                            placeholder={advancedSearch.attached_glycan_id.placeholder}
							typeahedID={advancedSearch.attached_glycan_id.typeahedID}
							length={advancedSearch.attached_glycan_id.length}
							errorText={advancedSearch.attached_glycan_id.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proAttachedGlycanIdChange}
							inputValue={advancedSearch.attached_glycan_id.examples}
						/>
					</FormControl>
				</Grid>
				{/* Bound Glycan */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.binding_glycan_id.tooltip.title}
                                text={commonProteinData.binding_glycan_id.tooltip.text}
                                urlText={commonProteinData.binding_glycan_id.tooltip.urlText}
                                url={commonProteinData.binding_glycan_id.tooltip.url}
                            />
                            {commonProteinData.binding_glycan_id.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proBindingGlycanId}
                            setInputValue={proBindingGlycanIdChange}
                            placeholder={advancedSearch.binding_glycan_id.placeholder}
							typeahedID={advancedSearch.binding_glycan_id.typeahedID}
							length={advancedSearch.binding_glycan_id.length}
							errorText={advancedSearch.binding_glycan_id.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proBindingGlycanIdChange}
							inputValue={advancedSearch.binding_glycan_id.examples}
						/>
					</FormControl>
				</Grid>
				{/* Glycosylated Amino Acid */}
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
								<MultiselectTextInput
									options={props.initData.aa_list.sort(sortDropdown)}
									inputValue={props.inputValue.proAminoAcid}
									setInputValue={proAminoAcidChange}
									placeholder={advancedSearch.aa_list.placeholder}
								/>
							</Grid>
							<Grid item xs={3} sm={3}>
                                <Typography className={'search-lbl'} gutterBottom>
									&nbsp;
								</Typography>
                                <FormControl 
                                    variant='outlined' 
                                    fullWidth
                                >
									<SelectControl
										inputValue={props.inputValue.proAminoAcidOperation}
										menu={advancedSearch.aa_list.operations}
										setInputValue={proAminoAcidOperationOnChange}
									/>
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
				{/* Disease Name */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.disease_name.tooltip.title}
                                text={commonProteinData.disease_name.tooltip.text}
                                urlText={commonProteinData.disease_name.tooltip.urlText}
                                url={commonProteinData.disease_name.tooltip.url}
                            />
                            {commonProteinData.disease_name.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proDiseaseName}
                            setInputValue={proDiseaseNameChange}
                            placeholder={advancedSearch.disease_name.placeholder}
							typeahedID={advancedSearch.disease_name.typeahedID}
							length={advancedSearch.disease_name.length}
							errorText={advancedSearch.disease_name.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proDiseaseNameChange}
							inputValue={advancedSearch.disease_name.examples}
						/>
					</FormControl>
				</Grid>
				{/* Disease ID */}
				<Grid item xs={12} sm={10}>
					<FormControl fullWidth variant='outlined'>
						<Typography
							className={'search-lbl'}
							gutterBottom
						>
							<HelpTooltip
                                title={commonProteinData.disease_id.tooltip.title}
                                text={commonProteinData.disease_id.tooltip.text}
                                urlText={commonProteinData.disease_id.tooltip.urlText}
                                url={commonProteinData.disease_id.tooltip.url}
                            />
                            {commonProteinData.disease_id.name}
						</Typography>
						<AutoTextInput
							inputValue={props.inputValue.proDiseaseId}
                            setInputValue={proDiseaseIdChange}
                            placeholder={advancedSearch.disease_id.placeholder}
							typeahedID={advancedSearch.disease_id.typeahedID}
							length={advancedSearch.disease_id.length}
							errorText={advancedSearch.disease_id.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proDiseaseIdChange}
							inputValue={advancedSearch.disease_id.examples}
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
						<AutoTextInput
							inputValue={props.inputValue.proPubId}
                            setInputValue={proPubIdChange}
                            placeholder={advancedSearch.pmid.placeholder}
							typeahedID={advancedSearch.pmid.typeahedID}
							length={advancedSearch.pmid.length}
							errorText={advancedSearch.pmid.errorText}
						/>
                        <ExampleExploreControl
							setInputValue={proPubIdChange}
							inputValue={advancedSearch.pmid.examples}
						/>
					</FormControl>
				</Grid>
				{/* Glycosylation Evidence Type */}
				<Grid item xs={12} sm={10}>
					<FormControl
						fullWidth
						variant='outlined'
					>
						<Typography className={'search-lbl'} gutterBottom>
							<HelpTooltip
                                title={commonProteinData.glycosylation_evidence.tooltip.title}
                                text={commonProteinData.glycosylation_evidence.tooltip.text}
                            />
                            {commonProteinData.glycosylation_evidence.name}
						</Typography>
						<SelectControl
							inputValue={props.inputValue.proGlyEvidence}
							placeholder={advancedSearch.glycosylation_evidence.placeholder}
							placeholderId={advancedSearch.glycosylation_evidence.placeholderId}
							placeholderName={advancedSearch.glycosylation_evidence.placeholderName}
							menu={advancedSearch.glycosylation_evidence.menu}
							setInputValue={proGlyEvidenceOnChange}
						/>
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
	searchProteinAdvClick: PropTypes.func,
	setProAdvSearchData: PropTypes.func,
};

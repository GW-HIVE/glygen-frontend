import React, { useEffect, useReducer, useState } from 'react';
import MultilineAutoTextInput from '../input/MultilineAutoTextInput';
import RangeInputSlider from '../input/RangeInputSlider';
import AutoTextInput from '../input/AutoTextInput';
import MultiselectTextInput from '../input/MultiselectTextInput';
import SelectControl from '../select/SelectControl';
import HelpTooltip from '../tooltip/HelpTooltip';
import ExampleExploreControl from '../example/ExampleExploreControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from 'react-bootstrap/Button';
import {sortDropdown} from '../../utils/common';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import '../../css/Search.css';
import glycanSearchData from '../../data/json/glycanSearch';
import stringConstants from '../../data/json/stringConstants';
import plusIcon from "../../images/icons/plus.svg";
import deleteIcon from "../../images/icons/delete.svg";
import downArrowIcon from "../../images/icons/down-arrow.svg";
import upArrowIcon from "../../images/icons/up-arrow.svg";
import { Image } from "react-bootstrap";

/**
 * Glycan advanced search control.
 **/
const GlycanAdvancedSearch = (props) => {
    let commonGlycanData = stringConstants.glycan.common;
    let advancedSearch = glycanSearchData.advanced_search;

	const [selectInput, setSelectInput] = useState("");
	const [operationEnum, setOperationEnum] = useState([]);
	const [selectEnum, setSelectEnum] = useState([]);

	/**
	 * Function to set organism value.
	 * @param {string} org - organism value.
	 **/
	function glyOrgChange(org) {
		props.setGlyAdvSearchData({ glyOrganisms: org });
	}

	/**
	 * Function to set organism operation value.
	 * @param {string} value - operation value.
	 **/
	const glyOrgOperationOnChange = (value) => {
		props.setGlyAdvSearchData({ glyOrgOperation: value });
	}

	/**
	 * Function to set organism annotation category value.
	 * @param {string} value - organism annotation category value.
	 **/
	const glyOrgAnnotationCatChange = (value) => {
		props.setGlyAdvSearchData({ glyOrgAnnotationCat: value });
	}

	/**
	 * Function to set mass type value.
	 * @param {string} value - mass type value.
	 **/
	const glyMassTypeOnChange = (value) => {
		props.setGlyAdvSearchData({ glyMassType: value });
		setMassValues(value, props.inputValue.glyMass);
	}

	/**
	 * Function to set mass values based on mass type and given mass values.
	 * @param {string} massType - mass type value.
	 * @param {array} massValues - min and max mass values.
	 **/
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
		props.setGlyAdvSearchData({ glyMassInput: [Number(minval).toLocaleString('en-US'), Number(maxval).toLocaleString('en-US')] });
		props.setGlyAdvSearchData({ glyMass: [minval, maxval] });
    };

	/**
	 * Function to set min, max mass values.
	 * @param {array} inputMass - input mass values.
	 **/
    function glyMassInputChange(inputMass) {
        props.setGlyAdvSearchData({ glyMassInput: inputMass })
    }
	
	/**
	 * Function to set min, max mass values based on slider position.
	 * @param {array} inputMass - input mass values.
	 **/
    function glyMassSliderChange(inputMass) {
        props.setGlyAdvSearchData({ glyMass: inputMass })
    }
	
	/**
	 * Function to set min, max sugar values.
	 * @param {array} inputNumSugars - input sugar values.
	 **/
    function glyNumSugarsInputChange(inputNumSugars) {
        props.setGlyAdvSearchData({ glyNumSugarsInput: inputNumSugars })
    }
	
	/**
	 * Function to set min, max sugar values based on slider position.
	 * @param {array} inputNumSugars - input sugar values.
	 **/
    function glyNumSugarsSliderChange(inputNumSugars) {
        props.setGlyAdvSearchData({ glyNumSugars: inputNumSugars })
    }

	/**
	 * Function to set glycan type value.
	 * @param {string} value - input glycan type value.
	 **/
	const glyTypeOnChange = (value) => {
		if (value === '')
			props.setGlyAdvSearchData({ glySubTypeIsHidden: true });
		else props.setGlyAdvSearchData({ glySubTypeIsHidden: false });

		props.setGlyAdvSearchData({ glySubType: '' });
		props.setGlyAdvSearchData({ glyType: value });
	}

	/**
	 * Function to set glycan sub type value.
	 * @param {string} value - input glycan sub type value.
	 **/
	const glySubTypeOnChange = (value) => {
		props.setGlyAdvSearchData({ glySubType: value });
	}

	/**
	 * Function to set glycan id value.
	 * @param {string} inputGlycanId - input glycan id value.
	 **/
	function glycanIdChange(inputGlycanId) {
		let valArr = props.inputValue.glyAdvSearchValError;
		valArr[0] = inputGlycanId.length > advancedSearch.glycan_identifier.length;
		props.setGlyAdvSearchData({ glycanId: inputGlycanId, glyAdvSearchValError: valArr });
	}

	/**
	 * Function to set glycan id subsumption value.
	 * @param {string} inputGlycanIdSubsumption - input glycan id subsumption value.
	 **/
	function glycanIdSubsumptionChange(inputGlycanIdSubsumption) {
		props.setGlyAdvSearchData({ glycanIdSubsumption: inputGlycanIdSubsumption });
	}

	/**
	 * Function to set glycosylated protein id value.
	 * @param {string} inputGlyProt - input glycosylated protein id value.
	 **/
	function glyProtChange(inputGlyProt) {
		let valArr = props.inputValue.glyAdvSearchValError;
		valArr[1] = inputGlyProt.length > advancedSearch.protein_identifier.length;
		props.setGlyAdvSearchData({ glyProt: inputGlyProt, glyAdvSearchValError: valArr });
	}

	/**
	 * Function to set motif value.
	 * @param {string} inputGlyMotif - input motif value.
	 **/
	function glyMotifChange(inputGlyMotif) {
		let valArr = props.inputValue.glyAdvSearchValError;
		valArr[2] = inputGlyMotif.length > advancedSearch.glycan_motif.length;
		props.setGlyAdvSearchData({ glyMotif: inputGlyMotif, glyAdvSearchValError: valArr });
	}

	/**
	 * Function to set biosynthetic enzyme value.
	 * @param {string} inputGlyBioEnz - input biosynthetic enzyme value.
	 **/
	function glyBioEnzChange(inputGlyBioEnz) {
		let valArr = props.inputValue.glyAdvSearchValError;
		valArr[3] = inputGlyBioEnz.length > advancedSearch.enzyme.length;
		props.setGlyAdvSearchData({ glyBioEnz: inputGlyBioEnz, glyAdvSearchValError: valArr });
	}

	/**
	 * Function to set pubmed id value.
	 * @param {string} inputGlyPubId - input pubmed id value.
	 **/
	function glyPubIdChange(inputGlyPubId) {
		let valArr = props.inputValue.glyAdvSearchValError;
		valArr[4] = inputGlyPubId.length > advancedSearch.pmid.length;
		props.setGlyAdvSearchData({ glyPubId: inputGlyPubId, glyAdvSearchValError: valArr });
	}

	/**
	 * Function to set binding protein id value.
	 * @param {string} inputGlyBindingIdProtein - input binding protein id value.
	 **/
	function glyBindingProteinIdChange(inputGlyBindingIdProtein) {
		let valArr = props.inputValue.glyAdvSearchValError;
		valArr[5] = inputGlyBindingIdProtein.length > advancedSearch.binding_protein_id.length;
		props.setGlyAdvSearchData({ glyBindingProteinId: inputGlyBindingIdProtein, glyAdvSearchValError: valArr });
	}

	/**
	 * Function to clear input field values.
	 **/
	const clearGlycan = () => {
		props.setGlyAdvSearchData({
			glycanId: '',
			glycanIdSubsumption: 'none',
			glyMassType: props.initData.glycan_mass.native.name,
			glyMass: [
				Math.floor(props.initData.glycan_mass.native.min),
				Math.ceil(props.initData.glycan_mass.native.max),
			],
			glyMassInput: [
				Math.floor(props.initData.glycan_mass.native.min).toLocaleString('en-US'),
				Math.ceil(props.initData.glycan_mass.native.max).toLocaleString('en-US'),
			],
			glyMassRange: [
				Math.floor(props.initData.glycan_mass.native.min),
				Math.ceil(props.initData.glycan_mass.native.max),
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
				Number(props.initData.number_monosaccharides.min).toLocaleString('en-US'),
				Number(props.initData.number_monosaccharides.max).toLocaleString('en-US'),
			],
			glyOrganisms: [],
			glyOrgAnnotationCat: '',
			glyOrgOperation: 'or',
			glyType: advancedSearch.glycan_type.placeholderId,
			glySubType: advancedSearch.glycan_subtype.placeholderId,
			glySubTypeIsHidden: true,
			glyProt: '',
			glyMotif: '',
			glyBioEnz: '',
			glyPubId: '',
			glyBindingProteinId: '',
			glyAdvSearchValError: [false, false, false, false, false, false],
		});
	};

	return (
		<>
			<Grid
                container
                class='svg-input-container1'
				// style={{ margin: '0  auto' }}
                // spacing={3}
                // xs={15} sm={15}
				>
				
				{/* Organisms */}
				<Grid item>
                {/* <Grid item > */}
					<FormControl fullWidth>
                        <Grid 
                            container 
                        class='svg-input-container'
                        // xs={15} sm={15}
                        // spacing={2} 
                        // alignItems='center'
						// justify='center'
						>
                            {/* Subsumption */}
                            <Grid item xs={1} sm={1} className={'svg-input-item'}>
                                <FormControl 
                                    variant='outlined' 
                                    fullWidth
                                    // class='svg-input-item'
                                >
									<SelectControl
										// inputValue={props.inputValue.glyOrgAnnotationCat}
										menu={[
                                            {
                                                "id": "or",
                                                "name": "Or"
                                            },
                                            {
                                                "id": "and",
                                                "name": "And"
                                            }
                                        ]}
										setInputValue={()=>{}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={3} sm={3} className={'svg-input-item'}>
                                <FormControl 
                                    variant='outlined' 
                                    fullWidth
                                    // class='svg-input-item'
                                >
									<SelectControl
										inputValue={selectInput}
										menu={props.data.fields ? props.data.fields.map((value)=> { return {id:value.id, name:value.label}}) : []}
										setInputValue={(input)=>{setSelectInput(input)
										setOperationEnum(props.data.fields.filter((value)=> value.id === input)[0].oplist)
										setSelectEnum(props.data.fields.filter((value)=> value.id === input)[0].enum)
										}}
									/>
								</FormControl>
							</Grid>
                            <Grid item xs={1} sm={1} className={'svg-input-item'}>
                                <FormControl 
                                    variant='outlined' 
                                    fullWidth
                                >
									<SelectControl
										// inputValue={props.inputValue.glyOrgOperation}
                                        menu={operationEnum.map((value)=> { return {id:value, name:value}})}
										setInputValue={()=>{}}
									/>
								</FormControl>
							</Grid>
                            <Grid item xs={4} sm={4} className={'svg-input-item'}>
                                {selectEnum.length === 0 && 
								
								<FormControl 
								variant='outlined' 
								fullWidth
								// class='svg-input-item'
							>
								<OutlinedInput
                                //className='svg-input-item'
                                className={'svg-input'}
                                value={props.query.order + " " + props.query.value}
                                margin='dense'
                                // onChange={minInputChange}
                                // onBlur={onMinMoveOut}
                                // labelWidth={40}
                                // inputProps={{
                                // 	min: props.min,
                                // 	max: props.max,
                                // }}
                            	/>
								</FormControl>}
								{selectEnum.length > 0 && <FormControl 
									variant='outlined' 
									fullWidth
									>
									<SelectControl
										// inputValue={props.inputValue.glyOrgOperation}
										menu={selectEnum.map((value)=> { return {id:value, name:value}})}
										setInputValue={()=>{}}
									/>
									</FormControl>
								}
							</Grid>
                            <Grid 
                            item 
                            // xs={4} sm={4}
                            >
                                {/* <FormControl 
                                    variant='outlined' 
                                    fullWidth
                                > */}
                            <Button 
                            className='gg-btn-outline mr-3 mb-3' 
                            onClick={() => props.supSearchAddQuery(props.query.order + 1)}
                            >
						<Image
						src={plusIcon}
						alt="Related glycans"
						// style={{ marginBottom: "5px" }}
					/>
				</Button>
                {props.prevOrderId !== undefined && <Button className='gg-btn-outline mr-3 mb-3' 
                onClick={() => props.supSearchDeleteQuery(props.query.order)}
                >
						<Image
						src={deleteIcon}
						alt="Related glycans"
						// style={{ marginBottom: "5px" }}
					/>
				</Button>}
                {props.prevOrderId !== undefined && <Button className='gg-btn-outline mr-3 mb-3' 
                onClick={() => props.supSearchMoveUpQuery(props.query.order, props.prevOrderId)}
                >
						<Image
						src={upArrowIcon}
						alt="Related glycans"
						// style={{ marginBottom: "5px" }}
					/>
				</Button>}
				{props.nextOrderId !== undefined && <Button
					className='gg-btn-outline mr-3 mb-3'
					// disabled={undoDisabled}
					onClick={() => props.supSearchMoveDownQuery(props.query.order, props.nextOrderId)}
                    >
						<Image
						src={downArrowIcon}
						alt="Related glycans"
						// style={{ marginBottom: "5px" }}
					/>
				</Button>}
								{/* </FormControl> */}
							</Grid>
						</Grid>
					</FormControl>
				</Grid>
			</Grid>
		</>
	);
};

export default GlycanAdvancedSearch;

GlycanAdvancedSearch.propTypes = {
	first: PropTypes.bool,
	inputValue: PropTypes.object,
	searchGlycanAdvClick: PropTypes.func,
	setGlyAdvSearchData: PropTypes.func,
};

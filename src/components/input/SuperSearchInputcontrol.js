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
import FormHelperText from "@material-ui/core/FormHelperText";
import '../../css/Search.css';
import glycanSearchData from '../../data/json/glycanSearch';
import stringConstants from '../../data/json/stringConstants';
import superSearchSVGData from '../../data/json/superSearchSVGData';
import plusIcon from "../../images/icons/plus.svg";
import deleteIcon from "../../images/icons/delete.svg";
import downArrowIcon from "../../images/icons/down-arrow.svg";
import upArrowIcon from "../../images/icons/up-arrow.svg";
import { Image } from "react-bootstrap";

/**
 * Glycan advanced search control.
 **/
const SuperSearchInputcontrol = (props) => {
	let operationList = superSearchSVGData.oplist;
	let aggregatorList = superSearchSVGData.aggregators;

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
									{props.query.order !== 0 && <SelectControl
										inputValue={props.query.aggregator}
										menu={aggregatorList}
										setInputValue={(input)=>{props.supSearchUpdateQuery(props.query.order, "aggregator", input)}}
									/>}
								</FormControl>
							</Grid>
							<Grid item xs={3} sm={3} className={'svg-input-item'}>
                                <FormControl 
                                    variant='outlined' 
                                    fullWidth
                                    // class='svg-input-item'
                                >
									<SelectControl
										inputValue={props.query.field}
										menu={props.data.fields ? props.data.fields.map((value)=> { return {id:value.id, name:value.label}}) : []}
										setInputValue={(input)=>{
											props.supSearchUpdateQuery(props.query.order, "field", input)
											let curfield = props.data.fields.filter((value)=> value.id === input)[0];
											props.supSearchUpdateQuery(props.query.order, "fieldType", curfield.type)
											//setOperationEnum(props.data.fields.filter((value)=> value.id === input)[0].oplist)
											props.supSearchUpdateQuery(props.query.order, "operationEnum", curfield.oplist)
											props.supSearchUpdateQuery(props.query.order, "selectEnum", curfield.enum)
											props.supSearchUpdateQuery(props.query.order, "operation", "$eq");
											props.supSearchUpdateQuery(props.query.order, "maxlength", curfield.maxlength ? curfield.maxlength : 100 );
											if (props.query.aggregator === "")
											 	props.supSearchUpdateQuery(props.query.order, "aggregator", "$and");
											//setSelectEnum(props.data.fields.filter((value)=> value.id === input)[0].enum)
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
										inputValue={props.query.operation}
										menu={props.query.operationEnum.map((value)=> { return {id:value, name:operationList.find((oper)=> value === oper.id).name}})}
										setInputValue={(input)=>{props.supSearchUpdateQuery(props.query.order, "operation", input)}}
									/>
								</FormControl>
							</Grid>
                            <Grid item xs={4} sm={4} className={'svg-input-item'}>
                                {props.query.selectEnum.length === 0 && 
								
								<FormControl 
								variant='outlined' 
								fullWidth
								// class='svg-input-item'
							>
								{/* {props.query.fieldType === "number" && <OutlinedInput
                                //className='svg-input-item'
                                className={'svg-input'}
                                value={props.query.value}
                                margin='dense'
								// onChange={minInputChange}
								onChange={(event)=>{props.supSearchUpdateQuery(props.query.order, "value", event.target.value)}}
								// onBlur={onMinMoveOut}
                                // labelWidth={40}
                                // inputProps={{
                                // 	min: props.min,
                                // 	max: props.max,
								// }}
								inputProps={{
									type: 'number'
								}}
                            	/>} */}
								{/* {props.query.fieldType !== "number" &&  */}
								<OutlinedInput
                                //className='svg-input-item'
                                className={'svg-input'}
                                value={props.query.value}
                                margin='dense'
								// onChange={minInputChange}
								onChange={(event)=>{props.supSearchUpdateQuery(props.query.order, "value", event.target.value)}}
								// onBlur={onMinMoveOut}
                                // labelWidth={40}
                                // inputProps={{
                                // 	min: props.min,
                                // 	max: props.max,
								// }}
								// inputProps={{
								// 	type: 'text'
								// }}
								//error={props.query.value.length > props.query.maxlength}
                            	/>
								{/* } */}
								</FormControl>
								}
								{/* {
								props.query.value.length > props.query.maxlength 
								&& (
									<FormHelperText className={"error-text"} error>
									{"Entry is too long - max length is" + props.query.maxlength + "."}
									</FormHelperText>
								)} */}
								{props.query.selectEnum.length > 0 && <FormControl 
									variant='outlined' 
									fullWidth
									>
									<SelectControl
										inputValue={props.query.value}
										// placeholder={"Select Value"}
										// placeholderId={""}
										// placeholderName={""}
										menu={props.query.selectEnum.map((value)=> { return {id:value, name:value}})}
										setInputValue={(input)=>{props.supSearchUpdateQuery(props.query.order, "value", input)}}
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

export default SuperSearchInputcontrol;

SuperSearchInputcontrol.propTypes = {

};

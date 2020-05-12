import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import ExampleControl from "../example/ExampleControl";
import '../../css/Search.css';

export default function SimpleSearchControl(props) {

	const simpleSearchCategoryOnChange = (event) => {
		props.setSimpleSearchCategory(event.target.value);
	};

	const simpleSearchTermOnChange = (event) => {
		props.setSimpleSearchTerm(event.target.value);
	};

	function sortSimpleSearchCategory(a, b) {
		if (a.display < b.display) {
			return -1;
		} else if (b.display < a.display) {
			return 1;
		}
		return 0;
	}

	return (
		<div>
			<Grid
				container
				spacing={3}
				justify='center'>
				<Grid item xs={12} sm={3}>
					<FormControl variant='outlined' fullWidth>
						<InputLabel className={'select-lbl-inline'}>{props.simpleSearchCategoryLabel}</InputLabel>
						<Select
							value={props.simpleSearchCategory}
							onChange={simpleSearchCategoryOnChange}
							defaultValue='any'
							classes={{
								root: 'select-menu',
							}}
							labelWidth={80}>
							{props.simple_search_category &&
								props.simple_search_category
									.sort(sortSimpleSearchCategory)
									.map((key) => (
										<MenuItem key={key.id} value={key.id}>{key.display}</MenuItem>
									))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<OutlinedInput
						fullWidth
						placeholder={
							props.simple_search !== undefined
								? props.simple_search[props.simpleSearchCategory].placeholder
								: ''
						}
						value={props.simpleSearchTerm}
						onChange={simpleSearchTermOnChange}
						error={props.simpleSearchTerm.length > props.length}
					/>
					{props.simpleSearchTerm.length > props.length && (
						<FormHelperText className={"error-text"} error>
							{props.errorText}
						</FormHelperText>
					)}
					<ExampleControl
						exampleMap={props.simple_search}
						type={props.simpleSearchCategory}
						setInputValue={(input) => {props.setSimpleSearchTerm(input)}}
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button
						className='gg-btn-blue gg-btn-simple-search'
						disabled={
							props.simpleSearchTerm.trim() === '' ||
							props.simpleSearchTerm.length > props.length
						}
						onClick={props.searchSimpleClick}>
						Search
					</Button>
				</Grid>
			</Grid>
			<br />
			<Grid container spacing={3} justify='center'>
				<Grid className={"small-text"} item>
					*{' '}
					<em>
						"<strong>Any category</strong>"
					</em>{' '}
					allows you to search an entire GlyGen database, including the context
					match. *
				</Grid>
			</Grid>
		</div>
	);
}

SimpleSearchControl.propTypes = {
	simpleSearchCategory: PropTypes.string,
	simpleSearchCategoryLabel: PropTypes.string,
	simpleSearchTerm: PropTypes.string,
	simple_search_category: PropTypes.array,
	simple_search: PropTypes.object,
	errorText: PropTypes.string,
	length: PropTypes.number,
	searchSimpleClick: PropTypes.func,
	setGlySimpleSearchCategory: PropTypes.func,
	setGlySimpleSearchTerm: PropTypes.func,
};

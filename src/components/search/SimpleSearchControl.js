import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
//import {Row} from 'react-bootstrap';
import FormHelperText from '@material-ui/core/FormHelperText';
import ExampleControl from "../example/ExampleControl";


const useStyles = makeStyles((theme) => ({
	// inputSimple: {
	// 	borderRadius: 4,
	// 	position: 'left',
	// 	backgroundColor: theme.palette.background.paper,
	// 	fontSize: 16,
	// 	width: '100%',
	// 	height: '45px',
	// 	padding: '0px !important',
	// },
	// anchorSimple: {
	//       paddingLeft: '15px !important',
	//       fontSize: '14px',
	// },
	// selectSimple: {
	// 	height: '45px',
	//   },
	labelSelect: {
		fontSize: '16px',
		fontWeight: 'bold',
	},
	// simpleContainer: {
	// 	paddingLeft: '40px !important',
	// 	paddingBottom: '30px !important',
	//   },
	smallText: {
		fontSize: '14px !important',
	},
}));

export default function SimpleSearchControl(props) {
	const classes = useStyles();

	const simpleSearchCategoryOnChange = (event) => {
		props.setSimpleSearchCategory(event.target.value);
	};

	const simpleSearchTermOnChange = (event) => {
		props.setSimpleSearchTerm(event.target.value);
	};

	return (
		<div>
			<Grid
				container
				spacing={3}
				// className={classes.simpleContainer}
				justify='center'>
				{/* <Grid item className='col-sm-3'> */}
				<Grid item xs={12} sm={3}>
					<FormControl variant='outlined' fullWidth>
						<InputLabel className={classes.labelSelect}>Category</InputLabel>
						<Select
							value={props.simpleSearchCategory}
							onChange={simpleSearchCategoryOnChange}
							highlight={false}
							defaultValue='any'
							classes={{
								outlined: classes.selectOutlined,
								root: 'select-menu',
							}}
							className={classes.selectSimple}
							labelWidth={80}>
							{props.simple_search_category &&
								props.simple_search_category
									.sort()
									.map((key) => (
										<MenuItem value={key.id}>{key.display}</MenuItem>
									))}
						</Select>
					</FormControl>
				</Grid>
				{/* <Grid item className='col-sm-6'> */}
				<Grid item xs={12} sm={6}>
					<OutlinedInput
						fullWidth
						// className={classes.inputSimple}
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
						<FormHelperText className={classes.smallText} error>
							{props.errorText}
						</FormHelperText>
					)}
					<ExampleControl
						exampleMap={props.simple_search}
						type={props.simpleSearchCategory}
						setInputValue={(input) => {props.setSimpleSearchTerm(input)}}
					/>
				</Grid>
				{/* <Grid item className='col-sm-2'> */}
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
				<Grid className={classes.smallText} item>
					{/* <div class='col-md-12 col-sm-12 col-xs-12' justifyContent='center'> */}
					*{' '}
					<em>
						"<strong>Any category</strong>"
					</em>{' '}
					allows you to search an entire GlyGen database, including the context
					match. *{/* </div> */}
				</Grid>
			</Grid>
		</div>
	);
}

SimpleSearchControl.propTypes = {
	simpleSearchCategory: PropTypes.string,
	simpleSearchTerm: PropTypes.string,
	simple_search_category: PropTypes.array,
	simple_search: PropTypes.object,
	errorText: PropTypes.string,
	length: PropTypes.number,
	searchSimpleClick: PropTypes.func,
	setGlySimpleSearchCategory: PropTypes.func,
	setGlySimpleSearchTerm: PropTypes.func,
};

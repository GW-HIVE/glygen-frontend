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
import { Row } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
	// simpleSearchButton: {
	//   // marginTop: 16,
	//   // marginBottom: 16,
	//   // marginRight: 16,
	//   //height: "48px",
	//   marginLeft: 16,
	//   // marginRight: 16,
	//   backgroundColor: "#2f78b7"
	// },
	inputSimple: {
		borderRadius: 4,
		position: 'left',
		backgroundColor: theme.palette.background.paper,
		fontSize: 16,
		width: '100%',
		height: '45px',
		padding: '0px !important',
	},
	anchorSimple: {
		paddingLeft: '15px !important',
	},
	selectSimple: {
		//width: "200px",
		//width: "100%",
		height: '45px',
	},
	simpleContainer: {
		paddingLeft: '40px !important',
		paddingBottom: '30px !important',
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
				className={classes.simpleContainer}
				justify='center'>
				<Grid item className='col-sm-3'>
					<FormControl variant='outlined' fullWidth>
						<InputLabel className={classes.label3}>Category</InputLabel>
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
				<Grid item className='col-sm-6'>
					<OutlinedInput
						className={classes.inputSimple}
						placeholder={
							props.simple_search !== undefined
								? props.simple_search[props.simpleSearchCategory].placeholder
								: ''
						}
						value={props.simpleSearchTerm}
						onChange={simpleSearchTermOnChange}
					/>
					<Row>
						{/* <Col lg="6"> */}
						<div className={classes.anchorSimple}>
							Example(s):{' '}
							{props.simple_search &&
								props.simple_search[props.simpleSearchCategory].examples.map(
									(key) => (
										<a
											href='javascript:void(0)'
											onClick={() => {
												props.setSimpleSearchTerm(key.trim().replace(',', ''));
											}}>
											{key}
										</a>
									)
								)}
						</div>
						{/* </Col> */}
					</Row>
				</Grid>
				<Grid item className='col-sm-2'>
					<Button
						className='gg-btn-blue gg-btn-simple-search'
						disabled={props.simpleSearchTerm.trim() === ''}
						onClick={props.searchSimpleclick}>
						Search
					</Button>
				</Grid>
				{/* <Grid item className='col-sm-2'>
					<Button
						className={classes.simpleSearchButton + ' gg-btn'}
						disabled={props.simpleSearchTerm.trim() === ''}
						onClick={props.searchSimpleclick}>
						Search
					</Button>
				</Grid> */}
			</Grid>
			<Grid container spacing={3} justify='center'>
				<Grid item>
					<div class='col-md-12 col-sm-12 col-xs-12' justifyContent='center'>
						*{' '}
						<em>
							"<strong>Any category</strong>"
						</em>{' '}
						allows you to search an entire GlyGen database, including the
						context match. *
					</div>
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
	searchSimpleclick: PropTypes.func,
	setGlySimpleSearchCategory: PropTypes.func,
	setGlySimpleSearchTerm: PropTypes.func,
};

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
// import { getJson } from '../data/api';
import { getTstJson } from '../../data/api';
import { validateEmail } from '../../utils/common';

const useStyles = makeStyles((theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	})
);

const ContactForm = (props) => {
	const classes = useStyles();

	// const [contactUsData, setContactUsData] = useReducer(
	// 	(state, newState) => ({ ...state, ...newState }),
	// 	{
	// 		fname: '',
	// 		lname: '',
	// 		email: '',
	// 		message: '',
	// 	}
	// );

	// const [contactUsValidated, setContactUsValidated] = useReducer(
	// 	(state, newState) => ({ ...state, ...newState }),
	// 	{
	// 		fname: false,
	// 		lname: false,
	// 		email: false,
	// 		message: false,
	// 		form: false,
	// 	}
	// );

	const [fname, setFName] = useState('');
	const [lname, setLName] = useState('');
	const [subject, setSubject] = useState('general');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const [fNameValidated, setFNameValidated] = useState(false);
	const [lNameValidated, setLNameValidated] = useState(false);
	const [emailValidated, setEmailValidated] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	const [messageValidated, setMessageValidated] = useState(false);
	const [formValidated, setFormValidated] = useState(false);
	const [contactUsResponseMessage, setContactUsResponseMessage] = useState('');

	const [contactUsErrorMessage, setContactUsErrorMessage] = useState('');

	const messageMaxLen = 2400;
	const [messageCharsLeft, setMessageCharsLeft] = useState(messageMaxLen);

	const inputLabel = useRef(null);
	const handleChange = (event) => {
		setContactUsResponseMessage();
		setSubject(event.target.value);
	};

	const handleWordCount = (e) => {
		const charCount = e.target.value.length;
		const charLength = messageMaxLen - charCount;
		setMessageCharsLeft(charLength);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = {
			fname: fname,
			lname: lname,
			email: email,
			subject: subject,
			message: message,
		};
		const url = `/auth/contact?query=${JSON.stringify(formData)}`;
		// const url = `/auth/contact?query=${JSON.stringify(contactUsData)}`;

		getTstJson(url)
			.then((response) => {
				setContactUsResponseMessage(response.data.message);
			})
			.catch((error) => {
				setContactUsErrorMessage(
					'Oops, something went wrong! We did not receive your message. Please try again later.'
				);
			});

		//setContactUsData({fname: '', lname: ''})
		setFName('');
		setLName('');
		setEmail('');
		setSubject('');
		setMessage('');
		setMessageCharsLeft(`${messageMaxLen}`);
		setFormValidated(false);
		setFNameValidated(false);
		setLNameValidated(false);
		setEmailValidated(false);
		setMessageValidated(false);
		setSubject('general');
	};

	// Allows to type in only text and "-".
	const onlyText = (e) => {
		e.target.value = e.target.value.replace(/[^a-zA-Z-]/g, '');
	};

	return (
		<>
			{/* Contact Us Right */}
			<form autoComplete='off' onSubmit={handleSubmit}>
				<h4>Send Message</h4>
				<p>We'd love to hear from you.</p>
				<Row>
					<Col sm={12} md={6} lg={6}>
						<TextField
							id='outlined-full-width'
							required
							label='First name'
							type='text'
							name='fname'
							value={fname}
							placeholder='Please enter your first name.'
							error={(formValidated || fNameValidated) && fname === ''}
							onChange={(e) => {
								setFName(e.target.value);
								setContactUsResponseMessage();
								setContactUsErrorMessage();
							}}
							onBlur={() => setFNameValidated(true)}
							helperText={
								(formValidated || fNameValidated) &&
								fname === '' &&
								'First name is required.'
							}
							onInput={(e) => onlyText(e)}
							style={{ margin: 8 }}
							fullWidth
							margin='dense'
							className={classes.labell}
							InputLabelProps={{
								shrink: true,
								style: {
									fontWeight: '900',
								},
							}}
							variant='outlined'
							inputProps={{
								maxLength: 64,
							}}
						/>
					</Col>
					<Col sm={12} md={6} lg={6}>
						<TextField
							id='outlined-full-width'
							required
							label='Last name'
							type='text'
							name='lname'
							value={lname}
							placeholder='Please enter your last name.'
							error={(formValidated || lNameValidated) && lname === ''}
							onChange={(e) => {
								setLName(e.target.value);
								setContactUsResponseMessage();
								setContactUsErrorMessage();
							}}
							onBlur={() => setLNameValidated(true)}
							helperText={
								(formValidated || lNameValidated) &&
								lname === '' &&
								'Last name is required.'
							}
							onInput={(e) => onlyText(e)}
							style={{ margin: 8 }}
							fullWidth
							margin='dense'
							InputLabelProps={{
								shrink: true,
								style: {
									fontWeight: '900',
								},
							}}
							variant='outlined'
							inputProps={{
								maxLength: 64,
							}}
						/>
					</Col>
					<Col sm={12} md={6} lg={6}>
						<FormControl
							variant='outlined'
							fullWidth
							className={classes.formControl}>
							<InputLabel
								ref={inputLabel}
								id='demo-simple-select-outlined-label'
								style={{ fontWeight: '900' }}>
								Subject
							</InputLabel>
							<Select
								labelId='demo-simple-select-outlined-label'
								id='demo-simple-select-outlined'
								value={subject}
								fullWidth
								margin='dense'
								onChange={handleChange}
								labelWidth={60}>
								<MenuItem value={'general'}>General comment</MenuItem>
								<MenuItem value={'technical'}>Technical issue</MenuItem>
								<MenuItem value={'help'}>Need help</MenuItem>
								<MenuItem value={'requestQuick'}>
									Request new quick search
								</MenuItem>
								<MenuItem value={'shareData'}>Share my data</MenuItem>
								<MenuItem value={'dataIssue'}>Report data issue</MenuItem>
								<MenuItem value={'other'}>Other</MenuItem>
							</Select>
						</FormControl>
					</Col>
					<Col sm={12} md={6} lg={6}>
						<TextField
							id='email'
							required
							label='Email'
							type='email'
							name='email'
							value={email}
							style={{ margin: 8 }}
							placeholder='example@domain.com'
							error={(formValidated || emailValidated) && !validEmail}
							onChange={(e) => {
								var emailVal = e.target.value;
								setValidEmail(validateEmail(emailVal));
								setEmail(emailVal); //setContactUsData({email: emailVal})
								setContactUsResponseMessage();
								setContactUsErrorMessage();
							}}
							onBlur={() => setEmailValidated(true)}
							helperText={
								(formValidated || emailValidated) &&
								!validEmail &&
								'Please enter a valid email.'
							}
							fullWidth
							margin='dense'
							InputLabelProps={{
								shrink: true,
								style: { fontWeight: '900' },
							}}
							variant='outlined'
							inputProps={{
								maxLength: 128,
							}}
						/>
					</Col>
					<Col>
						<TextField
							id='outlined-full-width'
							required
							label='Message'
							name='message'
							value={message}
							type='text'
							style={{ margin: 8 }}
							placeholder='Please tell us how we can help you.'
							error={
								(formValidated || messageValidated) &&
								(message === '' ||
									message.length < 5 ||
									message.length > messageMaxLen)
							}
							onChange={(e) => {
								setMessage(e.target.value);
								setContactUsResponseMessage();
								setContactUsErrorMessage();
								handleWordCount(e);
							}}
							onBlur={() => setMessageValidated(true)}
							helperText={
								(formValidated || messageValidated) &&
								((message === '' && 'Please leave us a message.') ||
									((message.length < 5 || message.length > messageMaxLen) &&
										`Message should be between 5 to ${messageMaxLen} characters`))
							}
							fullWidth
							multiline
							rows='3'
							margin='normal'
							InputLabelProps={{
								shrink: true,
								style: { fontWeight: '900' },
							}}
							variant='outlined'
							inputProps={{
								minlength: 5,
								maxlength: messageMaxLen,
							}}
						/>
						<div
							className={'text-right text-muted'}
							style={{ marginTop: '-5px' }}>
							{messageCharsLeft}/{messageMaxLen}
						</div>
					</Col>
				</Row>

				<div
					className={`alert-success ${
						contactUsResponseMessage ? 'alert' : ''
					}`}>
					<strong>{contactUsResponseMessage}</strong>
				</div>
				<div className={`alert-danger ${contactUsErrorMessage ? 'alert' : ''}`}>
					<strong>{contactUsErrorMessage}</strong>
				</div>
				<Button
					variant='success'
					style={{ margin: '10px 0' }}
					type='submit'
					// className={`${
					// 	!fNameValidated ||
					// 	!lNameValidated ||
					// 	!emailValidated ||
					// 	!validEmail ||
					// 	!messageValidated
					// 		? 'disabled'
					// 		: ''
					// }`}
					// size='lg'
					onClick={() => setFormValidated(true)}
					// disabled={formValidated}
					// disabled={
					// 	!fNameValidated ||
					// 	!lNameValidated ||
					// 	!emailValidated ||
					// 	!validEmail ||
					// 	!messageValidated
					// }
					// .no-drop {cursor: no-drop;}
				>
					SEND MESSAGE
				</Button>
			</form>

			<Row>
				<Col>
					<p className='text-muted'>
						<strong>*</strong> These fields are required.
					</p>
				</Col>
			</Row>
		</>
	);
};
export default ContactForm;

// Simple search
// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types';
// import { Row, Col } from 'react-bootstrap';
// import FormHelperText from '@material-ui/core/FormHelperText';

// const useStyles = makeStyles((theme) => ({
// 	// inputSimple: {
// 	// 	borderRadius: 4,
// 	// 	position: 'left',
// 	// 	backgroundColor: theme.palette.background.paper,
// 	// 	fontSize: 16,
// 	// 	width: '100%',
// 	// 	height: '45px',
// 	// 	padding: '0px !important',
// 	// },
// 	// anchorSimple: {
// 	// 	paddingLeft: '15px !important',
// 	// 	fontSize: '14px',
// 	// },
// 	// selectSimple: {
// 	// 	height: '45px',
// 	//   },
// 	//   label3: {
// 	// 	fontSize: '16px',
// 	// 	fontWeight: 'bold',
// 	// },
// 	// simpleContainer: {
// 	// 	paddingLeft: '40px !important',
// 	// 	paddingBottom: '30px !important',
// 	//   },
// 	examples: {
// 		fontSize: '14px !important',
// 	},
// }));

// export default function SimpleSearchControl(props) {
// 	const classes = useStyles();

// 	const simpleSearchCategoryOnChange = (event) => {
// 		props.setSimpleSearchCategory(event.target.value);
// 	};

// 	const simpleSearchTermOnChange = (event) => {
// 		props.setSimpleSearchTerm(event.target.value);
// 	};

// 	return (
// 		<div>
// 			<Grid
// 				// container
// 				// spacing={3}
// 				// className={classes.simpleContainer}
// 				justify='center'>
// 				{/* <Grid item className='col-sm-3'> */}
// 				<Row>
// 					<Col sm={3}>
// 						<FormControl variant='outlined' fullWidth>
// 							<InputLabel className={classes.label3}>Category</InputLabel>
// 							<Select
// 								value={props.simpleSearchCategory}
// 								onChange={simpleSearchCategoryOnChange}
// 								highlight={false}
// 								defaultValue='any'
// 								// classes={{
// 								// 	outlined: classes.selectOutlined,
// 								// 	root: 'select-menu',
// 								// }}
// 								// className={classes.selectSimple}
// 								labelWidth={80}>
// 								{props.simple_search_category &&
// 									props.simple_search_category
// 										.sort()
// 										.map((key) => (
// 											<MenuItem value={key.id}>{key.display}</MenuItem>
// 										))}
// 							</Select>
// 						</FormControl>
// 						{/* </Grid> */}
// 					</Col>
// 					{/* <Grid item className='col-sm-6'> */}
// 					<Col sm={7} space={5} className='simple-search-input-mobile'>
// 						<OutlinedInput
// 							fullWidth
// 							// className={classes.inputSimple}
// 							placeholder={
// 								props.simple_search !== undefined
// 									? props.simple_search[props.simpleSearchCategory].placeholder
// 									: ''
// 							}
// 							value={props.simpleSearchTerm}
// 							onChange={simpleSearchTermOnChange}
// 							error={props.simpleSearchTerm.length > props.length}
// 						/>
// 						{props.simpleSearchTerm.length > props.length && (
// 							<FormHelperText className={classes.examples} error>
// 								{props.errorText}
// 							</FormHelperText>
// 						)}
// 						{/* <Row> */}
// 						{/* <Col lg="6"> */}
// 						<div className={classes.anchorSimple}>
// 							Example(s):{' '}
// 							{props.simple_search &&
// 								props.simple_search[props.simpleSearchCategory].examples.map(
// 									(key) => (
// 										// eslint-disable-next-line
// 										<a
// 											// eslint-disable-next-line
// 											href='javascript:void(0)'
// 											onClick={() => {
// 												props.setSimpleSearchTerm(key.trim().replace(',', ''));
// 											}}>
// 											{key}
// 										</a>
// 									)
// 								)}
// 						</div>
// 						{/* </Col> */}
// 						{/* </Row> */}
// 						{/* </Grid> */}
// 					</Col>
// 					{/* <Grid item className='col-sm-2'> */}
// 					<Col sm={2}>
// 						<Button
// 							className='gg-btn-blue gg-btn-simple-search'
// 							disabled={
// 								props.simpleSearchTerm.trim() === '' ||
// 								props.simpleSearchTerm.length > props.length
// 							}
// 							onClick={props.searchSimpleClick}>
// 							Search
// 						</Button>
// 						{/* </Grid> */}
// 					</Col>
// 				</Row>
// 			</Grid>
// 			<br />
// 			<Grid container justify='center'>
// 				<Grid className={classes.examples} item>
// 					*{' '}
// 					<em>
// 						"<strong>Any category</strong>"
// 					</em>{' '}
// 					allows you to search an entire GlyGen database, including the context
// 					match. *
// 				</Grid>
// 			</Grid>
// 		</div>
// 	);
// }

// SimpleSearchControl.propTypes = {
// 	simpleSearchCategory: PropTypes.string,
// 	simpleSearchTerm: PropTypes.string,
// 	simple_search_category: PropTypes.array,
// 	simple_search: PropTypes.object,
// 	errorText: PropTypes.string,
// 	length: PropTypes.number,
// 	searchSimpleClick: PropTypes.func,
// 	setGlySimpleSearchCategory: PropTypes.func,
// 	setGlySimpleSearchTerm: PropTypes.func,
// };

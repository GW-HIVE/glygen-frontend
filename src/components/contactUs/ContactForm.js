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
// import NotInterestedIcon from '@material-ui/icons/NotInterested';

// import Alert from '@material-ui/lab/Alert';

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
	// const [counterValue, setCounterValue] = useState({
	// 	chars_left: null,
	// 	max_chars: 2400
	// });

	const inputLabel = useRef(null);
	const handleChange = (event) => {
		setContactUsResponseMessage();
		setSubject(event.target.value);
	};

	// const handleWordCount = e => {
	// 	const charCount = e.target.value.length;
	// 	const maxChar = counterValue.max_chars;
	// 	const charLength = maxChar - charCount;
	// 	setCounterValue({ chars_left: charLength });
	// };

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

		getTstJson(url)
			.then((response) => {
				setContactUsResponseMessage(response.data.message);
			})
			.catch((error) => {
				setContactUsErrorMessage(
					'Oops, something went wrong! We did not receive your message. Please try again later.'
				);
			});

		setFName('');
		setLName('');
		setEmail('');
		setSubject('');
		setMessage('');
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
									fontSize: '20px',
								},
							}}
							variant='outlined'
							// InputProps={{
							// 	disableUnderline: true
							// }}
							inputProps={{
								minLength: 2,
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
							// defaultValue={lname}
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
									fontSize: '20px',
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
								style={{ fontWeight: '900', fontSize: '20px' }}>
								Subject
							</InputLabel>
							<Select
								labelId='demo-simple-select-outlined-label'
								id='demo-simple-select-outlined'
								value={subject}
								fullWidth
								margin='dense'
								onChange={handleChange}
								labelWidth={75}>
								<MenuItem value={'general'}>General comment</MenuItem>
								<MenuItem value={'technical'}>Technical issue</MenuItem>
								<MenuItem value={'help'}>Need help</MenuItem>
								<MenuItem value={'requestQuick'}>
									Request new quick search
								</MenuItem>
								<MenuItem value={'shareData'}>Share my data</MenuItem>
								<MenuItem value={'dataIssue'}>Report data issue</MenuItem>
								<MenuItem value={'other'}>Other</MenuItem>
								<MenuItem value={'testing'}>Testing</MenuItem>
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
							// defaultValue={email}
							style={{ margin: 8 }}
							// placeholder='Please enter your email.'
							placeholder='example@domain.com'
							error={(formValidated || emailValidated) && !validEmail}
							onChange={(e) => {
								var emailVal = e.target.value;
								setValidEmail(validateEmail(emailVal));
								setEmail(emailVal);
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
								style: { fontWeight: '900', fontSize: '20px' },
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
							error={(formValidated || messageValidated) && message === ''}
							onChange={(e) => {
								setMessage(e.target.value);
								setContactUsResponseMessage();
								setContactUsErrorMessage();
								// handleWordCount(e);
							}}
							onBlur={() => setMessageValidated(true)}
							helperText={
								(formValidated || messageValidated) &&
								message === '' &&
								'Please leave us a message.'
							}
							fullWidth
							multiline
							rows='3'
							margin='normal'
							InputLabelProps={{
								shrink: true,
								style: { fontWeight: '900', fontSize: '20px' },
							}}
							variant='outlined'
							inputProps={{
								maxLength: 2400,
							}}
						/>

						{/* <div>
							Characters Left:{''}{' '}
							{counterValue.chars_left || counterValue.max_chars}
							{''}/{''}2400
						</div> */}
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
					type='submit'
					className={` ${
						!fNameValidated ||
						!lNameValidated ||
						!emailValidated ||
						!validEmail ||
						!messageValidated
							? 'disabled'
							: ''
					}`}
					size='lg'
					onClick={() => setFormValidated(true)}
					// disabled={formValidated}
					disabled={
						!fNameValidated ||
						!lNameValidated ||
						!emailValidated ||
						!validEmail ||
						!messageValidated
					}
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

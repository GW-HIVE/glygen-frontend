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

const useStyles = makeStyles(theme =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120
		},
		selectEmpty: {
			marginTop: theme.spacing(2)
		},
		btnGreen: {
			background: '#60ba4b',
			border: 'solid 1px #60ba4b',
			color: '#fff',
			margin: '20px 0',
			'&:hover': {
				background: '#1d9901',
				border: 'solid 1px #1d9901'
			}
		}
	})
);

const ContactForm = props => {
	const classes = useStyles();

	const [fname, setFName] = useState('');
	const [lname, setLName] = useState('');
	const [subject, setSubject] = useState('general');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const [fNameValidated, setFNameValidated] = useState(false);
	const [lNameValidated, setLNameValidated] = useState(false);
	const [emailValidated, setEmailValidated] = useState(false);
	const [messageValidated, setMessageValidated] = useState(false);

	const [formValidated, setFormValidated] = useState(false);

	const inputLabel = useRef(null);
	const handleChange = event => {
		setSubject(event.target.value);
	};

	return (
		<>
			{/* Contact Us Right */}
			<form autoComplete='off' method='POST'>
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
							placeholder='Please enter your first name.'
							// defaultValue={fname}
							error={(formValidated || fNameValidated) && fname === ''}
							onChange={e => setFName(e.target.value)}
							onBlur={() => setFNameValidated(true)}
							helperText={
								(formValidated || fNameValidated) &&
								fname === '' &&
								'First name is required.'
							}
							style={{ margin: 8 }}
							fullWidth
							margin='dense'
							className={classes.labell}
							InputLabelProps={{
								shrink: true,
								style: {
									fontWeight: '900',
									fontSize: '20px'
								}
							}}
							variant='outlined'
						/>
					</Col>
					<Col sm={12} md={6} lg={6}>
						<TextField
							id='outlined-full-width'
							required
							label='Last name'
							type='text'
							name='lname'
							placeholder='Please enter your last name.'
							defaultValue={lname}
							error={(formValidated || lNameValidated) && lname === ''}
							onChange={e => setLName(e.target.value)}
							onBlur={() => setLNameValidated(true)}
							helperText={
								(formValidated || lNameValidated) &&
								lname === '' &&
								'Last name is required.'
							}
							style={{ margin: 8 }}
							fullWidth
							margin='dense'
							InputLabelProps={{
								shrink: true,
								style: {
									fontWeight: '900',
									fontSize: '20px'
								}
							}}
							variant='outlined'
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
							defaultValue={email}
							style={{ margin: 8 }}
							// placeholder='Please enter your email.'
							placeholder='example@domain.com'
							error={(formValidated || emailValidated) && email === ''}
							onChange={e => setEmail(e.target.value)}
							onBlur={() => setEmailValidated(true)}
							// value= {/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
							helperText={
								(formValidated || emailValidated) &&
								email === '' &&
								'Please enter a valid email.'
							}
							fullWidth
							margin='dense'
							InputLabelProps={{
								shrink: true,
								style: { fontWeight: '900', fontSize: '20px' }
							}}
							variant='outlined'
						/>
					</Col>
					<Col>
						<TextField
							id='outlined-full-width'
							required
							label='Message'
							type='text'
							style={{ margin: 8 }}
							placeholder='Please tell us how we can help you.'
							error={(formValidated || messageValidated) && message === ''}
							onChange={e => setMessage(e.target.value)}
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
								style: { fontWeight: '900', fontSize: '20px' }
							}}
							variant='outlined'
						/>
					</Col>
				</Row>
			</form>
			<Button
				variant='success'
				type='submit'
				className={classes.btnGreen}
				size='lg'
				onClick={() => setFormValidated(true)}>
				SEND MESSAGE
			</Button>
			<Row>
				<Col>
					<p className='text-muted'>
						<strong>*</strong> These fields are required.
					</p>
				</Col>
			</Row>
			<div className='messages'></div>
		</>
	);
};
export default ContactForm;

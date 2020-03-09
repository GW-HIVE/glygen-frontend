import React from 'react';
import Helmet from 'react-helmet';
import { head, getMeta } from '../utils/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import VerticalHeading from '../components/headings/VerticalHeading';
import { Row, Col } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from 'react-bootstrap/Button';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import GoogleMap from '../components/GoogleMap';

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
const mapStyles = {
	position: 'relative',
	width: '100%',
	height: '350px'
};

const ContactUs = props => {
	const vertHeadContactUs = {
		h5VerticalText: 'MESSAGES',
		// h5VerticalText: 'WHO WE ARE',
		h2textTop: 'Get',
		h2textBottom: 'In',
		h2textBottomStrongAfter: 'Touch'
	};

	const classes = useStyles();
	const [subject, setSubject] = React.useState('general');

	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleChange = event => {
		setSubject(event.target.value);
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{head.contactUs.title}</title>
				{getMeta(head.contactUs)}
			</Helmet>

			<CssBaseline />
			<Container maxWidth='xl' className='ggContainer'>
				<Row>
					{/* Contact Left*/}
					<Col sm={12} md={6} lg={6}>
						<VerticalHeading post={vertHeadContactUs} />
						<Typography
							variant='p'
							style={{
								fontSize: '18px'
							}}>
							We always welcome questions, comments, and suggestions regarding
							our website and information we provide in general. We will make
							every effort to respond to you within a reasonable amount of time.
						</Typography>

						<div className='content-box-md5' style={{ marginTop: '40px' }}>
							<Row>
								<Col sm={12} md={6} lg={6}>
									{/* <div className='office'> */}
									<h3>
										<span>
											<RoomIcon style={{ fontSize: 30, color: '#444' }} />
										</span>{' '}
										UGA Location
									</h3>
									<h4>University of Georgia</h4>
									<ul className='office-details'>
										<li>
											<strong>Complex Carbohydrate Research Center</strong>
										</li>
										<li>315 Riverbend Road Athens,</li>
										<li>Georgia 30602 USA </li>
									</ul>
									{/* </div> */}
								</Col>
								<Col sm={12} md={6} lg={6}>
									{/* <div className='office'> */}
									<h3>
										<span>
											<RoomIcon style={{ fontSize: 30, color: '#444' }} />
										</span>{' '}
										GW Location
									</h3>
									<h4>The George Washington University</h4>
									<ul className='office-details'>
										<li>
											<strong>School of Medicine and Health Sciences</strong>
										</li>
										<li>2300 Eye Street N.W.,</li>
										<li>Washington, DC 20037 USA </li>
									</ul>
									{/* </div> */}
								</Col>
							</Row>
						</div>
					</Col>
					{/* Contact Right */}
					<Col sm={12} md={6} lg={6} className='content-box-md'>
						<div id='contact-right'>
							<form>
								<h4>Send Message</h4>
								<p>We'd love to hear from you.</p>
								<Row>
									<Col sm={12} md={6} lg={6}>
										<TextField
											id='outlined-full-width'
											label='Firstname *'
											type='text'
											style={{ margin: 8 }}
											placeholder='Please enter your firstname.'
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
											label='Lastname *'
											type='text'
											style={{ margin: 8 }}
											placeholder='Please enter your lastname.'
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
												// value={age1 === "" ? "Native" : age1}
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
												<MenuItem value={'dataIssue'}>
													Report data issue
												</MenuItem>
												<MenuItem value={'other'}>Other</MenuItem>
											</Select>
										</FormControl>
									</Col>
									<Col sm={12} md={6} lg={6}>
										<TextField
											id='outlined-full-width'
											label='Email *'
											type='email'
											style={{ margin: 8 }}
											placeholder='Please enter your email.'
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
											label='Message *'
											type='text'
											style={{ margin: 8 }}
											placeholder='Please leave us a message.'
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
							<Button variant='success' className={classes.btnGreen} size='lg'>
								SEND MESSAGE
							</Button>
						</div>
					</Col>
				</Row>

				<Row>
					<div style={mapStyles}>
						<GoogleMap />
					</div>
				</Row>
			</Container>
		</React.Fragment>
	);
};
export default ContactUs;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import { downloadFromServer } from '../utils/download';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Button from 'react-bootstrap/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		minWidth: '40px',
		border: '1px solid #ced4da',
		padding: '7px 26px 7px 12px',
	},
}))(InputBase);

const DownloadButton = (props) => {
	const { types, dataId } = props;

	const [show, setShow] = useState(false);
	const [format, setFormat] = useState(props.format || props.types[0].type);
	const [compressed, setCompressed] = useState(props.compressed || false);

	const handleDownload = async () => {
		const dataType = types.find((typeItem) => typeItem.type === format).data;

		await downloadFromServer(dataId, format, compressed, dataType);

		setShow(false);
	};
	const clearForm = () => {
		setFormat(props.format || props.types[0].type);
		setCompressed(props.compressed || false);
	};

	return (
		<div className='dropdown text-right'>
			<Link>
				<button
					className='btn btn-link gg-download-btn dropdown-toggle'
					type='button'
					id='download'
					alt='Download results'
					data-toggle='dropdown'
					aria-haspopup='true'
					aria-expanded='true'
					onClick={() => {
						setShow(!show);
					}}>
					<GetAppIcon /> DOWNLOAD
					<span className='caret mr-1'></span>
				</button>
			</Link>
			<div
				style={{ padding: '15px' }}
				className={
					'dropdown-menu dropdown-menu-right' + (show ? ' open show' : '')
				}
				aria-labelledby='download'>
				<Row>
					<Col>
						<button
							type='button'
							className='gg-blue-color'
							style={{
								float: 'right',
								border: 'none',
								backgroundColor: 'inherit',
								padding: '0',
							}}
							onClick={() => {
								clearForm();
								setShow(!show);
							}}>
							<CloseIcon />
						</button>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormControl margin='dense' variant='outlined'>
							<Row>
								<Col
									// xs={ 7 } sm={ 7 }
									style={{ paddingTop: '6px' }}>
									<strong>Format:</strong>
								</Col>

								<Col
									// xs={5}	// sm={5}
									align='right !important'>
									<Select
										input={<BootstrapInput />}
										value={format}
										onChange={(e) => {
											setFormat(e.target.value);
										}}>
										{types.map((typeItem) => (
											<MenuItem value={typeItem.type}>{typeItem.type}</MenuItem>
										))}
									</Select>
								</Col>
							</Row>
						</FormControl>
					</Col>
				</Row>
				<Row style={{ paddingTop: '10px' }}>
					<Col
					// xs={ 7 } sm={ 7 }
					>
						<strong style={{ whiteSpace: 'nowrap' }}>
							Compress file (*.gzip):
						</strong>
					</Col>
					<Col
						// xs={ 5 } sm={ 5 }
						align='right'>
						<input
							// style={{ fontSize: 'xx-large' }}
							type='checkbox'
							id='download_compression'
							checked={compressed}
							onClick={(e) => {
								setCompressed(e.target.checked);
							}}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button
							type='button'
							style={{ marginTop: '15px', float: 'right' }}
							className='gg-btn-outline'
							onClick={handleDownload}>
							OK
						</Button>
					</Col>
				</Row>
			</div>
		</div>
	);
};
export default DownloadButton;

import React from 'react';
import Helmet from 'react-helmet';
import { head, getMeta } from '../utils/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import VerticalHeading from '../components/headings/VerticalHeading';
import { Row, Col, Image } from 'react-bootstrap';
import { makeStyles, Link } from '@material-ui/core';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import licenseData from '../data/json/licenseData';
import gplLicenseIcon from '../images/license/GPLv3_Logo.png';
import creativecommonsLicenseIcon from '../images/license/CreativeCommons_logo_trademark.svg';

const License = () => {
	const vertHeadDisclaimer = {
		h5VerticalText: 'to know',
		h2textTop: 'Get Familiar',
		h2textBottom: 'With',
		h2textBottomStrongAfter: 'License'
	};
	const useStyles = makeStyles(theme => ({
		tableHeader: {
			backgroundColor: '#4B85B6',
			color: theme.palette.common.white,
			height: '50px'
		},
		licenseIcons: {
      width: '70%',
      verticalAlign: 'middle',
      paddingTop: '15%'
		}
	}));
	const classes = useStyles();
	const databasesLicenseCols = [
		{
			dataField: 'databases',
			text: 'Databases',
			// sort: true,
			formatter: cell => (
				<Link
					variant='subtitle1'
					href={cell.url}
					target='_blank'
					rel='noopener noreferrer'>
					{cell.name}
				</Link>
			),
			style: { paddingLeft: '20px' },
			headerStyle: {
				paddingLeft: '20px',
				verticalAlign: 'middle'
			}
		},
		{
			dataField: 'licenseType',
			text: 'License Type',
			// sort: true,
			formatter: cell => (
				<Link
					variant='subtitle1'
					href={cell.url}
					target='_blank'
					rel='noopener noreferrer'>
					{cell.name}
				</Link>
			),
			style: { paddingLeft: '20px' },
			headerStyle: {
				paddingLeft: '20px',
				verticalAlign: 'middle'
			}
		}
	];
	return (
		<>
			<Helmet>
				<title>{head.license.title}</title>
				{getMeta(head.license)}
			</Helmet>

			<CssBaseline />
			<Container
				maxWidth='md'
				className='card'
				style={{ marginTop: '20px', marginBottom: '20px' }}>
				<Row>
					<Col style={{ paddingBottom: '40px' }}>
						<Row>
							<Col>
								<VerticalHeading post={vertHeadDisclaimer} />
							</Col>
							<Col className='content-box-md' style={{display: 'flex', verticalAlign: 'middle'}}>
								<a
									href='https://www.ccrc.uga.edu/'
									target='_blank'
									rel='noopener noreferrer'>
									<Image
										src={gplLicenseIcon}
										className={classes.licenseIcons}
									/>
								</a>
								<a
									href='https://www.ccrc.uga.edu/'
									target='_blank'
									rel='noopener noreferrer'>
									<Image
										src={creativecommonsLicenseIcon}
										className={classes.licenseIcons}
									/>
								</a>
							</Col>
						</Row>

						<p>
							We have chosen to apply the{' '}
							<a
								href='https://creativecommons.org/licenses/by/4.0/'
								target='_blank'
								rel='noopener noreferrer'>
								Creative Commons Attribution 4.0 International (CC BY 4.0)
							</a>{' '}
							license to all our database sets. This means that you are free to
							copy, distribute, display and make commercial use of these
							databases in all legislations, provided you give us credit.
						</p>
						<p>
							{' '}
							The source code of the project is released under{' '}
							<a
								href='https://www.gnu.org/licenses/gpl-3.0.en.html'
								target='_blank'
								rel='noopener noreferrer'>
								{' '}
								GNU General Public License v3
							</a>{' '}
							and is available in our{' '}
							<a
								href='https://github.com/glygener'
								target='_blank'
								rel='noopener noreferrer'>
								GlyGen GitHub{' '}
							</a>
							repository.
						</p>
						<p>
							Below are some of the databases we integrate data from, along with
							their license information.
						</p>
						<br />
						<Col sm={12} lg={10} style={{ margin: '0px auto' }}>
							<BootstrapTable
								bootstrap4
								// responsive='xl'
								striped
								hover
								// condensed
								headerClasses={classes.tableHeader}
								keyField='id'
								data={licenseData.databasesLicenseData}
								columns={databasesLicenseCols}
								// defaultSorted={[
								// 	{
								// 		dataField: 'databases',
								// 		order: 'asc'
								// 	}
								// ]}
							/>
						</Col>
					</Col>
				</Row>
			</Container>
		</>
	);
};
export default License;

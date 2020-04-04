import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToTopArrow from '../components/ToTopArrow';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
// import PDF from '../downloads/citation/31616925.pdf';

// import FormatQuoteOutlinedIcon from '@material-ui/icons/FormatQuoteOutlined';

const PanelHowToCite = (props) => {
	return (
		<div id={props.id}>
			<CssBaseline />
			<Container maxWidth='xl' className='ggContainer'>
				<Table bordered hover size='lg' className='panel-width'>
					<thead className='panelHeadBgr panelHeadText'>
						{props.data.map((json) => (
							<h3 style={{ margin: '15px' }}>{json.title}</h3>
						))}
					</thead>
					<tbody className='table-body'>
						{props.data.map((json) => (
							<tr className='table-row'>
								<td style={{ paddingLeft: '30px', paddingRight: '30px' }}>
									<p>{json.text}</p>
									<p>
										{json.comingSoon}
										<div>
											<strong>{json.heading}</strong>
										</div>
										{json.authors}
										<div style={{ textIndent: '-50px', paddingLeft: '50px' }}>
											{json.citations}
										</div>
										{json.publisher}
										<div>
											{json.pmid}{' '}
											<a
												href={json.website.url}
												target='_blank'
												rel='noopener noreferrer'>
												{json.website.name}
											</a>
											{json.period}
										</div>
										{/* Quotes */}
										<div>
											<Image
												src={json.quote}
												style={{ paddingRight: '20px' }}
											/>
											{/* <FormatQuoteOutlinedIcon /> */}{' '}
											{/* <a
												href={PDF}
												target='_blank'
												rel='noopener noreferrer'
												download="31616925.pdf"
												style={{ paddingRight: '20px', paddingLeft: '20px' }}>
												PDF
											</a> */}
											{/* <a
												href={process.env.PUBLIC_URL + json.pdf}
												target='_blank'
												rel="noopener noreferrer"
												download
												style={{ paddingRight: '20px', paddingLeft: '20px' }}>
												PDF
											</a> */}
											<Link
												to={json.bibtex}
												style={{ paddingRight: '20px' }}
												target='_blank'
												download>
												{json.bibtexlabel}
											</Link>
											<Link
												to={json.endnote}
												target='_blank'
												download
												style={{ paddingRight: '20px' }}>
												{json.endnotelabel}
											</Link>
										</div>
									</p>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<ToTopArrow />
				<br />
			</Container>
		</div>
	);
};
export default PanelHowToCite;

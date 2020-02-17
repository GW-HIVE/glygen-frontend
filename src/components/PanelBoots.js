import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const PanelBoots = props => {
	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth='xl' className='ggContainer'>
				<Table bordered hover size='lg'>
					<thead className='panelHeadBgr panelHeadText'>
						<tr>
							<th>
								<h3>How To Cite</h3>
							</th>
						</tr>
					</thead>
					<tbody className="table-body">
						<tr className="table-row">
							<td>
								<ul>
									{props.data.map(pub => (
										<li>
											<h4>
												<strong>{pub.heading}</strong>
											</h4>
											<p>{pub.authors}</p>
										</li>
									))}
								</ul>
							</td>
						</tr>
					</tbody>
				</Table>
			</Container>
		</React.Fragment>
	);
};
export default PanelBoots;

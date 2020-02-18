import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Icon from '@material-ui/core/Icon';
// import GitHubIcon from '@material-ui/icons/GitHub';

export default function PanelText(props) {
	const { post } = props;

	return (
		<TableContainer component={Paper}>
			<Table className='panelTable ' aria-label='simple table'>
				<TableHead className='panelHeadBgr'>
					<TableRow>
						<TableCell align='left'>
							<Typography
								variant='h4'
								// component='h2'
								className='panelHeadText'>
								{post.headTitle}
							</Typography>
						</TableCell>
						<TableCell align='right'>
							<Icon></Icon>
							<CardMedia
								component='img'
								image={post.image}
								title={post.imageText}
								href={post.href}
								target={post.target}
								rel='noopener noreferrer'
              />
              {/* <GitHubIcon /> */}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody stripedRows >
					<TableRow>
						<TableCell>
							<Typography variant='h5' component='li'>
								<strong>{post.tableBodyTitle}</strong>
							</Typography>
							<Typography variant='p' component='p'>
								{post.tableBody1}
							</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
PanelText.propTypes = {
	post: PropTypes.object
};

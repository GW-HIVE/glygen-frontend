import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from '@material-ui/core';

function Sidebar({ items }) {
	return (
		<div className='sidebar'>
			<List disablePadding dense>
				{items.map(({ label, id }) => (
					<>
						<Link href={'#' + id}>
							<ListItem key={id} button>
								<ListItemText>{label}</ListItemText>
							</ListItem>
						</Link>
					</>
				))}
			</List>
		</div>
	);
}

export default Sidebar;

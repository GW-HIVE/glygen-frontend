import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from '@material-ui/core';
import '../../css/Sidebar.css';
// import { useLocation } from "react-router-dom";
// import { withRouter } from "react-router-dom";

function Sidebar({ items }) {

	const [activeLink, setActiveLink] = useState('');

	useEffect(() => {
		setActiveLink(items[0].id);
		return () => {
			//cleanup
		};
	}, [items]);

	return (
		<div className='sidebar-container sidbar-top-padding'>
			<div className='sidebar'>
				{/* <ScrollToTop /> */}
				<List disablePadding dense>
					{items.map(({ label, id }) => (
						<>
							<Link href={'#' + id}>
								<ListItem
									key={id}
									button
									onClick={() => setActiveLink(id)}
									className={
										'sidebar-item' + (activeLink === id ? ' active' : '')
									}>
									<ListItemText className='sidebar-item-text'>
										{label}
									</ListItemText>
								</ListItem>
							</Link>
						</>
					))}
				</List>
			</div>
		</div>
	);
}

export default Sidebar;

import React, { useState } from 'react';
import { Link } from '@material-ui/core';
import '../../css/Sidebar.css';

function Sidebar({ items }) {
	const [activeLink, setActiveLink] = useState(items[0].id);

	return (
		<div className='sidebar-container sidbar-top-padding'>
			<div className='sidebar'>
				{items.map(({ label, id }) => (
					<>
						<Link href={'#' + id}>
							<ul
								key={id}
								button
								onClick={() => setActiveLink(id)}
								className={
									'sidebar-item' + (activeLink === id ? ' active' : '')
								}>
								<li className='sidebar-item-text'>{label}</li>
							</ul>
						</Link>
					</>
				))}
			</div>
		</div>
	);
}

export default Sidebar;

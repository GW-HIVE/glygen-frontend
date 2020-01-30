import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import { getGlycanList } from '../data';

const SelectableTable = props => {
	const [columns, setColumns] = useState([]);
	const [selectedColumns, setSelectedColumns] = useState([]);

	useEffect(() => {
		setColumns(props.columns);
		setSelectedColumns(props.columns.filter(column => column.selected));
	}, []);

	const onColumnSelection = event => {
		// console.log(event)
		// console.log(event.target)

		const checkbox = event.target;
		const changedColumn = checkbox.getAttribute('data-column');

		const newColumns = columns.map(column => ({
			...column,
			selected:
				column.dataField === changedColumn
					? event.target.checked
					: column.selected
		}));

		setColumns(newColumns);
		setSelectedColumns(newColumns.filter(column => column.selected));
	};

	return (
		<div>
			{JSON.stringify(columns)}
			<section>
				<h1>Column Options</h1>
				<ul>
					{columns.map(column => (
						<li key={column.text}>
							<label>
								<input
									data-column={column.dataField}
									type='checkbox'
									checked={column.selected}
									onChange={onColumnSelection}
								/>
								<span>{column.text}</span>
							</label>
						</li>
					))}
				</ul>
			</section>
			{/* <PaginationControl data={props.pagination} /> */}
			<section>
				<h1>Table</h1>
				{selectedColumns && selectedColumns.length && (
					<BootstrapTable
						bootstrap4
						keyField='glytoucan_ac'
						data={props.data}
						columns={selectedColumns}
					/>
				)}
			</section>
			{/* <PaginationControl data={props.pagination} /> */}
		</div>
	);
};

export default function GlycanList(props) {
	// const classes = useStyles();

	const [data, setData] = useState([]);

	useEffect(() => {
		getGlycanList('9cc698050e82aed8c33696685da1ee1d').then(({ data }) => {
			// place to change values before rendering

			setData(data.results);
			// setQuery(data.query);
			// setPagination(data.pagination);
		});
	}, []);

	const columnDefinition = [
		{
			dataField: 'glytoucan_ac',
			text: 'Glycan ID',
			sort: true,
			selected: true
		},
		{ dataField: 'mass', text: 'Mass', sort: true, selected: true },
		{ dataField: 'iupac', text: 'iupac', sort: true, selected: true },
		{ dataField: 'glycoct', text: 'glycoct', sort: true },
		{ dataField: 'mass_pme', text: 'mass_pme', sort: true }
	];

	return (
		<>
			<SelectableTable columns={columnDefinition} data={data}></SelectableTable>
		</>
	);
}

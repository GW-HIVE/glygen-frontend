import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import GlycanList from './pages/GlycanList';

// import GlycanList2 from './pages/GlycanList2';
import ProteinList from './pages/ProteinList';
import GlycanListEditColumns from './pages/GlycanListEditColumns';

const Routes = props => (
	<Switch>
		<Route path='/' component={Home} />
		<Route path='/home' component={Home} />
		<Route path='/glycan-list/:id/edit' component={GlycanListEditColumns} />
		<Route path='/glycan-list/:id' component={GlycanList} />
		<Route path='/protein-list' component={ProteinList} />
	</Switch>
);

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import GlycanList from './pages/GlycanList';
import GlycanList2 from './pages/GlycanList2';

const Routes = props => (
	<Switch>
		<Route path='/glycan-list' component={GlycanList} />
		<Route path='/glycan-list2' component={GlycanList2} />
		<Route path='/home' component={Home} />
		<Route path='/' component={Home} />
	</Switch>
);

export default Routes;

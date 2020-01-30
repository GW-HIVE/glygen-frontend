import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import GlycanList from './pages/GlycanList';

const Routes = props => (
	<Switch>
		<Route path='/glycan-list' component={GlycanList} />
		<Route path='/home' component={Home} />
		<Route path='/' component={Home} />
	</Switch>
);

export default Routes;

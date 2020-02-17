import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import GlycanList from "./pages/GlycanList";
import Resources from "./pages/Resources";
import GlycanDetail from "./pages/GlycanDetail";
import GlycanListEditColumns from "./pages/GlycanListEditColumns";
import HowToCite from "./pages/HowToCite";

const Routes = props => (
  <Switch>
    <Route path="/glycan-list/:id/edit" component={GlycanListEditColumns} />
    <Route path="/glycan-list/:id" component={GlycanList} />
    <Route path="/glycan-detail" component={GlycanDetail} />
    <Route path="/resources" component={Resources} />
    <Route path="/how-to-cite" component={HowToCite} />

    {/* Keep path='/' at the bottom */}
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;

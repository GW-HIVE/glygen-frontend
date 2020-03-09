import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import GlycanList from "./pages/GlycanList";
import Resources from "./pages/Resources";
import GlycanDetail from "./pages/GlycanDetail";
import GlycanListEditColumns from "./pages/GlycanListEditColumns";
import GlycanSearch from "./pages/GlycanSearch";
import HowToCite from "./pages/HowToCite";
import ContactUs from "./pages/ContactUs";

const Routes = props => (
  <Switch>
    <Route path="/glycan-list/:id/edit" component={GlycanListEditColumns} />
    <Route path="/glycan-list/:id" component={GlycanList} />
    <Route path="/glycan-search/:id" component={GlycanSearch} />
    <Route path="/glycan-search/" component={GlycanSearch} />

    {/* // <Route path="/protein-list" component={ProteinList} /> */}
    <Route path="/glycan-detail/:id" component={GlycanDetail} />
    <Route path="/glycan-detail" component={GlycanDetail} />
    <Route path="/resources" component={Resources} />
    <Route path="/how-to-cite" component={HowToCite} />
    <Route path="/contact-us" component={ContactUs} />

    {/* Keep path='/' at the bottom */}
    <Route path="/" component={Home} />
  </Switch>
);

export default Routes;

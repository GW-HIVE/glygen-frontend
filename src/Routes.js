import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import GlycanList from "./pages/GlycanList";
import ProteinList from "./pages/ProteinList";
import Resources from "./pages/Resources";
import GlycanDetail from "./pages/GlycanDetail";
import ProteinDetail from "./pages/ProteinDetail";
import GlycanListEditColumns from "./pages/GlycanListEditColumns";
import GlycanSearch from "./pages/GlycanSearch";
import HowToCite from "./pages/HowToCite";
import ContactUs from "./pages/ContactUs";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import License from "./pages/License";
import PrivacySettings from "./pages/PrivacySettings";
import Feedback from "./pages/Feedback";
import TryMeCard from "./components/cards/TryMeCard";
import routeConstants from "./data/json/routeConstants.json";

const Routes = props => (
  <Switch>
    <Route
      path={`${routeConstants.glycanListEdit}:id`}
      component={GlycanListEditColumns}
    />
    <Route path={`${routeConstants.glycanList}:id`} component={GlycanList} />
    <Route path={`${routeConstants.proteinList}:id`} component={ProteinList} />
    <Route
      path={`${routeConstants.glycanSearch}:id`}
      component={GlycanSearch}
    />
    <Route path={routeConstants.glycanSearch} component={GlycanSearch} />{" "}
    <Route
      path={`${routeConstants.glycanDetail}:id`}
      component={GlycanDetail}
    />
    <Route path={routeConstants.glycanDetail} component={GlycanDetail} />
    <Route
      path={`${routeConstants.proteinDetail}:id`}
      component={ProteinDetail}
    />
    <Route path={routeConstants.proteinDetail} component={ProteinDetail} />
    <Route path={routeConstants.resources} component={Resources} />
    <Route path={routeConstants.howToCite} component={HowToCite} />
    <Route path={routeConstants.contactUs} component={ContactUs} />
    <Route path={routeConstants.disclaimer} component={Disclaimer} />
    <Route path={routeConstants.privacyPolicy} component={PrivacyPolicy} />
    <Route path={routeConstants.license} component={License} />
    <Route path={routeConstants.privacySettings} component={PrivacySettings} />
    <Route path={routeConstants.feedback} component={Feedback} />
    <Route path={routeConstants.tryMe} component={TryMeCard} />
    {/* Keep path='/' at the bottom */}
    <Route path={routeConstants.home} component={Home} />
    <Route path={routeConstants.default} component={Home} />
  </Switch>
);

export default Routes;

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
import ProteinSearch from "./pages/ProteinSearch";
import GlobalSearchResult from "./pages/GlobalSearchResult";
import HowToCite from "./pages/HowToCite";
import ContactUs from "./pages/ContactUs";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import License from "./pages/License";
import PrivacySettings from "./pages/PrivacySettings";
import Feedback from "./pages/Feedback";
import routeConstants from "./data/json/routeConstants.json";
import TryMe from "./pages/TryMe";
import About from "./pages/About";
import Frameworks from "./pages/Frameworks";
import Media from "./pages/Media";
import QuickSearch from "./pages/QuickSearch";

const Routes = (props) => (
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
		<Route path={routeConstants.glycanSearch} component={GlycanSearch} />
		<Route
			path={`${routeConstants.proteinSearch}:id`}
			component={ProteinSearch}
		/>
		<Route path={routeConstants.proteinSearch} component={ProteinSearch} />
		<Route
			path={`${routeConstants.glycanDetail}:id`}
			component={GlycanDetail}
		/>
		<Route path={routeConstants.glycanDetail} component={GlycanDetail} />
		<Route
			path={`${routeConstants.proteinDetail}:id`}
			component={ProteinDetail}
		/>
		<Route
			path={`${routeConstants.globalSearchResult}:id`}
			component={GlobalSearchResult}
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
		<Route path={routeConstants.tryMe} component={TryMe} />
		<Route path={routeConstants.about} component={About} />
		<Route path={routeConstants.frameworks} component={Frameworks} />
		<Route path={routeConstants.media} component={Media} />
		<Route path={routeConstants.quickSearch} component={QuickSearch} />
		{/* Keep path='/' at the bottom */}
		<Route path={routeConstants.home} component={Home} />
		<Route path={routeConstants.default} component={Home} />
	</Switch>
);

export default Routes;

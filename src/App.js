import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./Routes";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import { GLYGEN_ENV, GLYGEN_BETA } from "./envVariables.js";

function initializeReactGA() {
	if (
		document.location.hostname.search(GLYGEN_ENV) === 0 ||
		document.location.hostname.search(GLYGEN_BETA) === 0
	) {
		ReactGA.initialize("UA-123338976-1");
		ReactGA.pageview(window.location.pathname + window.location.search);
	}
}

const theme = createMuiTheme({
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			"Oxygen",
			"Ubuntu",
			"Cantarell",
			'"Fira Sans"',
			'"Droid Sans"',
			'"Helvetica Neue"',
			"sans-serif",
		].join(","),
	},
});

function App() {
	initializeReactGA();
	const [userTrackingBannerState, setUserTrackingBannerState] = useState("none");

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Header userTrackingBannerState={userTrackingBannerState} setUserTrackingBannerState={setUserTrackingBannerState} />
				<Routes userTrackingBannerState={userTrackingBannerState} setUserTrackingBannerState={setUserTrackingBannerState} />
				<Footer />
			</ThemeProvider>
		</div>
	);
}

export default App;

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
	  fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'Oxygen',
		'Ubuntu',
		'Cantarell',
		'"Fira Sans"',
		'"Droid Sans"',
		'"Helvetica Neue"',
		'sans-serif'
	  ].join(','),
	},
  });

function App() {
	return (
		<div className='App'>
			<ThemeProvider theme={theme}>
			<Header />
			<Routes />
			<Footer />
			</ThemeProvider>
		</div>
	);
}

export default App;

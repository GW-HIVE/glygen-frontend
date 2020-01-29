import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes />
			<Footer />
		</div>
	);
}

export default App;

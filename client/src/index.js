import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Admin from './routes/admin/';
import Home from './routes/home/';
import Stats from './routes/stats/';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route path='/' element={<Home />} />
				<Route path='admin' element={<Admin />} />
				<Route path='stats' element={<Stats />} />
			</Route>
			<Route
				path='*'
				element={
					<main style={{ padding: '1rem' }}>
						<h1>There's nothing here!</h1>
					</main>
				}
			/>
		</Routes>
	</BrowserRouter>,
	document.getElementById('root'),
);

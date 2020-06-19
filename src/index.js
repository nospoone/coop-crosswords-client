import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import App from './App';
import {StateProvider} from './contexts/grid-context.js';
import {SocketIOProvider} from 'use-socketio';

ReactDOM.render(
	<React.StrictMode>
		<StateProvider>
			<SocketIOProvider url='http://localhost:5000'>
				<App />
			</SocketIOProvider>
		</StateProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

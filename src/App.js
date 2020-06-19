import React, {useEffect, useContext} from 'react';

import Grid from './components/grid';
import Clues from './components/clues';

import Loading from './pages/loading';
import Auth from './pages/auth';

import {Store} from './contexts/grid-context';

import Utilities from './utilities';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App(...props) {
	// let mainContainer = null;

	// const {state, dispatch} = useContext(Store);

	// useEffect(() => {
	// 	if (mainContainer !== null) {
	// 		mainContainer.focus();
	// 	}
	// });

	// useEffect(() => {
	// 	const socket = io('http://localhost:5000');
	// 	socket.on('getMeta', data => {
	// 		dispatch({ type: 'updateGrid', payload: { grid: Utilities.generateGridFromWords(data.data, 8, 12), words: data.data}});
	// 	});
	// }, [dispatch]);

	// return state.grid === null ? null : (
	// 	<div
	// 		tabIndex={-1}
	// 		className="main-container"
	// 		ref={mainContainerRef => {mainContainer = mainContainerRef;}}
	// 		onKeyDown={event => {
	// 			if (event.key === 'Enter' || event.key === 'Backspace' || event.key === ' ' || (event.key.length === 1 && event.key.toUpperCase() !== event.key.toLowerCase())) {
	// 				if (event.key === ' ') {
	// 					dispatch({
	// 						type: 'changeDirection'
	// 					});
	// 				} else if (event.key === 'Enter') {
	// 					dispatch({
	// 						type: 'jumpToNextWord'
	// 					});
	// 				} else {
	// 					dispatch({
	// 						type: 'changeLetter',
	// 						payload: event.key === 'Backspace' ? event.key.toLowerCase() : event.key.toUpperCase()
	// 					});
	// 				}
	// 			}
	// 		}}
	// 	>
	// 		<Grid grid={state.grid} x={state.x} y={state.y} direction={state.direction} dispatch={dispatch}/>
	// 		<Clues words={state.words} x={state.x} y={state.y} direction={state.direction} dispatch={dispatch}/>
	// 	</div>
	// );
	return (
		<Router>
			<Switch>
				<Route exact path="/auth">
					<Auth/>
				</Route>
				<Route exact path="/">
					<Loading/>
				</Route>
			</Switch>
		</Router>
	)
}

export default App;

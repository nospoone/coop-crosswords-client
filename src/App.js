import React, {useEffect, useContext} from 'react';

import Grid from './components/grid';
import Clues from './components/clues';

import {Store} from './contexts/grid-context';

function App() {
	let mainContainer = null;

	const {state, dispatch} = useContext(Store);

	useEffect(() => {
		mainContainer.focus();
	});

	return (
		<div
			tabIndex={-1}
			className="main-container"
			ref={mainContainerRef => {mainContainer = mainContainerRef;}}
			onKeyDown={event => {
				if (event.key === 'Enter' || event.key === 'Backspace' || event.key === ' ' || (event.key.length === 1 && event.key.toUpperCase() !== event.key.toLowerCase())) {
					if (event.key === ' ') {
						dispatch({
							type: 'changeDirection'
						});
					} else if (event.key === 'Enter') {
						dispatch({
							type: 'jumpToNextWord'
						});
					} else {
						dispatch({
							type: 'changeLetter',
							payload: event.key === 'Backspace' ? event.key.toLowerCase() : event.key.toUpperCase()
						});
					}
				}
			}}
		>
			<Grid grid={state.grid} x={state.x} y={state.y} direction={state.direction} dispatch={dispatch}/>
			<Clues words={state.words} x={state.x} y={state.y} direction={state.direction} dispatch={dispatch}/>
		</div>
	);
}

export default App;

import React, {useEffect, useContext} from 'react';

import Utilities from './utilities';
import {Direction} from './constants';

import Grid from './components/grid';
import Clues from './components/clues';

import {Store} from './contexts/grid-context';

const temp_data = {
	titre: "mcroises_1_600",
	legende: "",
	force: "1",
	width: 8,
	height: 12,
	grille: [
		['B','O','I','S','S','O','N','S'],
		['A','R','R','A','C','H','E','E'],
		['N','x','R','I','O','x','M','M'],
		['C','H','I','N','O','I','S','E'],
		['x','E','T','x','P','M','x','N'],
		['C','L','A','S','S','A','N','T'],
		['O','E','I','L','x','M','A','x'],
		['U','E','x','I','F','x','S','T'],
		['T','x','S','P','O','L','I','E'],
		['U','S','E','x','C','O','L','T'],
		['M','O','N','O','x','I','L','E'],
		['E','N','S','E','R','R','E','S'],
	],
	definitionsh: [
		["Se consomment au bar."],
		["Enlevée de force."],
		["Ville de carnaval.", "Partie du mètre."],
		["Fille de Pékin."],
		["Héros de Spielberg.", "Pour l'après-midi."],
		["Rangeant des papiers."],
		["Il est dans l'orbite.", "Qui m'appartient."],
		["Groupe d'États unis.", "Conifère à fruits rouges.", "Devant celui que l'on fête."],
		["Privé de ce qui lui revenait."],
		["Qui a trop servi.", "Revolver de cow-boy."],
		["Animateur de colo.", "Terre entourée d'eau."],
		["Maintenus à l'étroit."]],
	definitionsv: [
		["Siège d'extérieur.", "Façon de faire."],
		["Matière d'alliance.", "Appelée peu discrètement.", "Pour lui ou pour l'âne."],
		["Exaspérai.", "Signification d'un mot."],
		["En bonne santé.", "Il est mis pour le bain.", "Axe de Brest à Strasbourg."],
		["Nouvelles inédites.", "Voile à l'avant du bateau."],
		["Exprime la surprise.", "Il connaît bien le Coran.", "On dort comme lui profondément."],
		["Beignets du Vietnam.", "Parle du nez."],
		["Laissent loin derrière.", "Bois au biberon."]
	],
};

const words = Utilities.generateWords(temp_data.grille, temp_data.width, temp_data.height, temp_data.definitionsh, temp_data.definitionsv);

function App() {
	let mainContainer = null;

	const globalState = useContext(Store);
	const {dispatch} = globalState;

	useEffect(() => {
		mainContainer.focus();
	});

	console.log(globalState);

	return (
		<div
			tabIndex={-1}
			className="main-container"
			ref={mainContainerRef => { mainContainer = mainContainerRef; }}
			onKeyDown={event => {
				console.log(event.ctrlKey && event.key === 'Enter');
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
			<Grid grid={globalState.grid} x={globalState.x} y={globalState.y} direction={globalState.direction} dispatch={dispatch}/>
			<Clues words={words} x={globalState.x} y={globalState.y} direction={globalState.direction} dispatch={dispatch}/>
		</div>
	);
}

export default App;

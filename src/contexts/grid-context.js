import React, {createContext, useReducer} from 'react';
import Utilities from '../utilities';
import {Direction} from '../constants';

// Temporary
const temp_data = {
	titre: "mcroises_1_600",
	legende: "",
	force: "1",
	width: 8,
	height: 12,
	grille: [
		['B', 'O', 'I', 'S', 'S', 'O', 'N', 'S'],
		['A', 'R', 'R', 'A', 'C', 'H', 'E', 'E'],
		['N', 'x', 'R', 'I', 'O', 'x', 'M', 'M'],
		['C', 'H', 'I', 'N', 'O', 'I', 'S', 'E'],
		['x', 'E', 'T', 'x', 'P', 'M', 'x', 'N'],
		['C', 'L', 'A', 'S', 'S', 'A', 'N', 'T'],
		['O', 'E', 'I', 'L', 'x', 'M', 'A', 'x'],
		['U', 'E', 'x', 'I', 'F', 'x', 'S', 'T'],
		['T', 'x', 'S', 'P', 'O', 'L', 'I', 'E'],
		['U', 'S', 'E', 'x', 'C', 'O', 'L', 'T'],
		['M', 'O', 'N', 'O', 'x', 'I', 'L', 'E'],
		['E', 'N', 'S', 'E', 'R', 'R', 'E', 'S'],
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

const initialState = {
	x: -1,
	y: -1,
	gridWidth: temp_data.width,
	gridHeight: temp_data.height,
	direction: 0,
	grid: Utilities.generateGrid(temp_data.width, temp_data.height, temp_data.grille),
	words: Utilities.generateWords(temp_data.grille, temp_data.width, temp_data.height, temp_data.definitionsh, temp_data.definitionsv)
};

const Store = createContext(initialState);

const StateProvider = ({children}) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'cellClick':
				return {
					...state,
					x: state.x === action.payload.x && state.y === action.payload.y ? state.x : action.payload.x,
					y: state.x === action.payload.x && state.y === action.payload.y ? state.y : action.payload.y,
					direction: state.x === action.payload.x && state.y === action.payload.y ? (state.direction + 1) % 2 : state.direction,
				}
			case 'changeDirection':
				return {
					...state,
					direction: (state.direction + 1) % 2
				}
			case 'changeLetter':
				if (state.x === -1 && state.y === -1) {
					return state;
				}

				const grid = state.grid;

				// Merci Lewis 😘
				if (!grid[state.y][state.x].locked) {
					grid[state.y][state.x].content = action.payload === 'backspace' ? '' : action.payload.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
				}

				// Find next valid square to move to
				let x = state.x;
				let y = state.y;
				if (state.direction === Direction.HORIZONTAL) {
					do {
						x += action.payload === 'backspace' ? -1 : 1;
					} while (x > -1 && x < state.gridWidth.width - 1 && state.grid[state.y][x].blocked);
				} else {
					do {
						y += action.payload === 'backspace' ? -1 : 1;
					} while (y > -1 && y < state.gridWidth.height - 1 && state.grid[y][state.x].blocked);
				}

				if (x === state.gridWidth.width || x === -1 || y === state.gridWidth.height || y === -1) {
					x = -1;
					y = -1;
				}

				return {
					...state,
					grid,
					x,
					y
				}
			case 'changePosition':
				return {
					...state,
					x: action.payload.x,
					y: action.payload.y,
					direction: action.payload.direction
				}
			case 'jumpToNextWord':
				let wordIndex = Utilities.getWordIndexByCoordinates(state.x, state.y, state.direction, state.words) + 1;
				if (wordIndex === state.words.length) {
					wordIndex = 0;
				}

				return {
					...state,
					x: state.words[wordIndex].start.x,
					y: state.words[wordIndex].start.y,
					direction: state.words[wordIndex].direction
				};
			case 'validateGrid':
				const validatedGrid = state.grid;
				validatedGrid.forEach(row => {
					row.forEach(cell => {
						cell.locked = cell.content === cell.answer;
					});
				});

				return {
					...state,
					grid: validatedGrid
				};
			default:
				break;
		}
	}, initialState);

	return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
};

export {Store, StateProvider}

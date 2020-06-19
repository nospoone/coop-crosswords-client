import React, {createContext, useReducer} from 'react';

import Utilities from '../utilities';
import {Direction} from '../constants';

const initialState = {
	x: -1,
	y: -1,
	gridWidth: 0,
	gridHeight: 0,
	direction: 0,
	grid: null,
	words: [],
	connected: false
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
			case 'updateGrid':
				return {
					...state,
					grid: action.payload.grid,
					words: action.payload.words
				}
			default:
				break;
		}
	}, initialState);

	return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
};

export {Store, StateProvider}

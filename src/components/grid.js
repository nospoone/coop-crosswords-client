import React from 'react';
import Cell from './cell';

import {Direction} from '../constants';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

function Grid({grid, x, y, direction, dispatch}) {
	return (
		<div className="grid-container">
			<table className="grid">
				<thead>
					<tr>
						<th></th>
						{grid[0].map((value, index) => <th key={alphabet[index]} className="grid__header grid__header--vertical">{alphabet[index]}</th>)}
					</tr>
				</thead>
				<tbody>
					{grid.map((row, rowIndex) => {
						return (
							<tr key={rowIndex} className="grid__row">
								<th className="grid__header grid__header--horizontal">{rowIndex + 1}</th>
								{row.map((letter, letterIndex) => <Cell key={`${rowIndex}${letterIndex}`} x={letterIndex} y={rowIndex} value={letter} selected={rowIndex === y && letterIndex === x} highlighted={(direction === Direction.HORIZONTAL && y === rowIndex) || (direction === Direction.VERTICAL && x === letterIndex)} dispatch={dispatch}/>)}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="controls">
				<button className="controls__button" onClick={() => {dispatch({type: 'validateGrid'})}}>Valider</button>
			</div>
		</div>
	);
}

export default Grid;

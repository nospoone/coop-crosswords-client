import React from 'react';
import classNames from 'classnames';

import Utilities from '../utilities';
import {Direction} from '../constants';

function Clues({words, x, y, direction, dispatch}) {
	const wordsElements = {
		horizontal: [],
		vertical: []
	};

	const currentWord = Utilities.getWordIndexByCoordinates(x, y, direction, words);

	words.forEach((word, wordIndex) => {
		if (word.direction === Direction.HORIZONTAL) {
			if (wordsElements.horizontal[word.start.y] === undefined) {
				wordsElements.horizontal[word.start.y] = [];
			}

			wordsElements.horizontal[word.start.y].push(
				<span
					key={word.definition}
					className={classNames({
						clues__clue: true,
						'clues__clue--active': wordIndex === currentWord
					})}
					onClick={event => {
						dispatch({
							type: 'changePosition',
							payload: {
								x: word.start.x,
								y: word.start.y,
								direction: Direction.HORIZONTAL
							}
						})
					}}
				>{word.definition}</span>
			);
		}

		if (word.direction === Direction.VERTICAL) {
			if (wordsElements.vertical[word.start.x] === undefined) {
				wordsElements.vertical[word.start.x] = [];
			}

			wordsElements.vertical[word.start.x].push(
				<span
					key={word.definition}
					className={classNames({
						clues__clue: true,
						'clues__clue--active': wordIndex === currentWord
					})}
					onClick={event => {
						dispatch({
							type: 'changePosition',
							payload: {
								x: word.start.x,
								y: word.start.y,
								direction: Direction.VERTICAL
							}
						})
					}}
				>{word.definition}</span>
			);
		}
	});

	return (
		<div className="clues-container">
			<div className="clues">
				<span className="clues__title">Horizontal</span>
				<ol className="clues__list">
				{wordsElements.horizontal.map((clues, clueIndex) => {
					return (
						<li key={clueIndex}>
							{clues}
						</li>
					);
				})}
				</ol>
			</div>
			<div className="clues">
				<span className="clues__title">Vertical</span>
				<ol className="clues__list clues__list--alpha">
					{wordsElements.vertical.map((clues, clueIndex) => {
						return (
							<li key={clueIndex}>
								{clues}
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
}

export default Clues;

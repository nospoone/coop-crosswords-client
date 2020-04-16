import {Direction} from './constants';

function generateWords(grid, width, height, horizontalDefinitions, verticalDefinitions) {
	const words = [];
	let word;

	// Generate horizontal words
	let position = 0;
	for (let y = 0; y < height; y++) {
		position = 0;
		word = generateEmptyWord(position, 0);

		for (let x = 0; x < width; x++) {
			// detect word boundaries, discard one letter words
			if (grid[y][x] === 'x') {
				if (word.letters.length > 1) {
					word.definition = horizontalDefinitions[y][position];
					words.push(word);
					position++;
				}

				word = generateEmptyWord(position, 0);

				continue;
			}

			if (x === 0 || grid[y][x - 1] === 'x') {
				word.start.x = x;
				word.start.y = y;
			}

			word.letters.push(grid[y][x]);
			word.end.x = x;
			word.end.y = y;
		}

		// discard one letter words
		if (word.letters.length > 1) {
			word.definition = horizontalDefinitions[y][position];
			words.push(word);
			position++;
		}
	}

	// Generate vertical words
	for (let x = 0; x < width; x++) {
		position = 0;
		word = generateEmptyWord(position, 1);

		for (let y = 0; y < height; y++) {
			// detect word boundaries, discard one letter words
			if (grid[y][x] === 'x') {
				if (word.letters.length > 1) {
					word.definition = verticalDefinitions[x][position];
					words.push(word);
					position++;
				}

				word = generateEmptyWord(position, 1);

				continue;
			}

			if (y === 0 || grid[y - 1][x] === 'x') {
				word.start.x = x;
				word.start.y = y;
			}

			word.letters.push(grid[y][x]);
			word.end.x = x;
			word.end.y = y;
		}

		// discard one letter words
		if (word.letters.length > 1) {
			word.definition = verticalDefinitions[x][position];
			words.push(word);
			position++;
		}
	}

	return words;
}

function generateEmptyGrid(width, height) {
	const grid = [];
	for (let y = 0; y < height; y++) {
		grid.push([]);

		for (let x = 0; x < width; x++) {
			if (x === 0) {
				grid[y].push([]);
			}

			grid[y][x] = {
				content: '',
				answer: '',
				locked: false,
				blocked: true
			};
		}
	}

	return grid;
}

function generateEmptyWord(position, direction) {
	return {
		letters: [],
		definition: '',
		start: {
			x: 0,
			y: 0
		},
		end: {
			x: 0,
			y: 0
		},
		position,
		direction,
		validated: false
	}
}

function getWordIndexByCoordinates(x, y, direction, words) {
	let foundWordIndex = -1;
	words.forEach((word, wordIndex) => {
		if (x >= word.start.x && x <= word.end.x && y >= word.start.y && y <= word.end.y && direction === word.direction) {
			foundWordIndex = wordIndex;
		}
	});

	return foundWordIndex;
}

function generateGridFromWords(words, width, height) {
	const grid = generateEmptyGrid(width, height);

	words.forEach(word => {
		if (word.direction === Direction.HORIZONTAL) {
			for (let x = word.start.x; x <= word.end.x; x++) {
				grid[word.start.y][x] = {
					content: '',
					answer: word.letters[x - word.start.x],
					locked: false,
					blocked: false
				}
			}
		} else if (word.direction === Direction.VERTICAL) {
			for (let y = word.start.y; y <= word.end.y; y++) {
				grid[y][word.start.x] = {
					content: '',
					answer: word.letters[y - word.start.y],
					locked: false,
					blocked: false
				}
			}
		}
	});

	return grid;
}

export default {generateWords, getWordIndexByCoordinates, generateGridFromWords};

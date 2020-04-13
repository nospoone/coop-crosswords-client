import Utilities from '../utilities';

describe('Utility functions', () => {
	it('generateWords', () => {
		const gridData = {
			grid: [
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
			width: 8,
			height: 12
		}

		const generatedWords = Utilities.generateWords(gridData.grid, gridData.width, gridData.height);

		expect(generatedWords.length).toBe(38);
	})
});

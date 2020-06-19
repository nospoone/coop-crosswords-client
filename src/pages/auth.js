import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/use-debounce';
import seedrandom from 'seedrandom';

const shapes = [
	'squares',
	'isogrids',
	'spaceinvaders',
	'labs/isogrids/hexa',
	'labs/isogrids/hexa16'
];

const colorThemes = [
	'frogideas',
	'sugarsweets',
	'heatwave',
	'daisygarden',
	'seascape',
	'summerwarmth',
	'bythepool',
	'duskfalling',
	'berrypie',
	'base'
];

const colors = [
	2,
	3,
	4
];

function Auth() {
	const [name, setName] = useState('');
	const [imageURL, setImageURL] = useState('');
	const debouncedName = useDebounce(name, 350);
	useEffect(() => {
		const seededRandom = seedrandom(debouncedName);
		console.log(Math.floor(seededRandom() * shapes.length))
		setImageURL(`http://tinygraphs.com/${shapes[Math.floor(seededRandom() * shapes.length)]}/${encodeURIComponent(debouncedName)}?theme=${colorThemes[Math.floor(seededRandom() * colorThemes.length)]}&numcolors=${Math.floor(seededRandom() * 3) + 2}&size=220&fmt=svg`)
	}, [debouncedName])

	return (
		<div className="login-form__container">
			<span className="login-form__title">crosswords.cool</span>
			<div className="login-form__input-block">
				<label>Name</label>
				<input
					onChange={e => setName(e.target.value)}
					type="text"
				/>
				{imageURL === '' ? null : <img src={imageURL}/>}
			</div>
		</div>
	);
}

export default Auth;

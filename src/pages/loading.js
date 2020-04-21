import React, {useContext, useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import useSocketIO from '../hooks/useSocketIO';

import {Store} from '../contexts/grid-context';

import Spinner from '../components/spinner';

function Loading() {
	const [redirect, setRedirect] = useState(false);
	useSocketIO('test', () => {
		setRedirect(true);
	});

	return redirect ? <Redirect to='/auth'/> : (
		<div className='loading'>
			<Spinner/>
		</div>
	);
}

export default Loading;

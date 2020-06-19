import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {useSocket} from 'use-socketio';

import Spinner from '../components/spinner';

function Loading() {
	const [redirect, setRedirect] = useState(false);
	useSocket('test', () => {
		setRedirect(true);
	});

	return redirect ? <Redirect to='/auth'/> : (
		<div className='loading'>
			<Spinner/>
		</div>
	);
}

export default Loading;

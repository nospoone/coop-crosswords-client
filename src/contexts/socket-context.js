import React, {createContext, useRef} from 'react';
import io from 'socket.io-client';

const SocketIO = createContext(undefined);

const SocketIOProvider = ({url, opts, children}) => {
	const socket = useRef();

	if (socket.current === undefined) {
		socket.current = io(url, opts || {});
	}

	return <SocketIO.Provider value={socket.current}>{children}</SocketIO.Provider>;
};

export {SocketIO, SocketIOProvider}

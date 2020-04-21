import {useContext, useEffect, useRef, useCallback} from "react";
import {SocketIO} from "../contexts/socket-context";

const useSocketIO = (event, callback) => {
	const socket = useContext(SocketIO);
	const callbackRef = useRef(callback);

	callbackRef.current = callback;

	const socketHandlerRef = useRef(() => {
		if (callbackRef.current !== undefined) {
			// eslint-disable-next-line no-undef
			callbackRef.current.apply(this, arguments);
		}
	});

	const subscribe = useCallback(() => {
		if (event !== undefined) {
			socket.on(event, socketHandlerRef.current);
		}
	}, [socket, event]);

	const unsubscribe = useCallback(() => {
		if (event !== undefined) {
			socket.removeListener(event, socketHandlerRef.current);
		}
	}, [socket, event]);

	useEffect(() => {
		subscribe();

		return unsubscribe;
	}, [subscribe, unsubscribe]);

	return {socket, unsubscribe, subscribe};
};

export default useSocketIO;

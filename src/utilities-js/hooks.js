import React from 'react';
import { makeRequest } from './httpClient';

/**
 * A hook to capture key presses and make callbacks.
 *
 * @param {{
 * 	targetKey: string;
 * 	callback: () => void;
 * 	enabled: boolean;
 * }} {\
 * &nbsp; `targetKey`: The key to attach the callback to\
 * &nbsp; `callback`: The function to call when the key is pressed\
 * &nbsp; `enabled`: Whether the callback should currently be called\
 * }
 */
export const useKeyPressedCallback = ({ targetKey, callback, enabled }) => {
	React.useEffect(() => {
		const keyPressHandler = ({ key }) => {
			if (key.toLowerCase() === targetKey.toLowerCase()) {
				callback();
			}
		};

		if (enabled) {
			window.addEventListener('keypress', keyPressHandler);
		}
		return () => {
			if (enabled) {
				window.removeEventListener('keypress', keyPressHandler);
			}
		};
	}, [callback, enabled, targetKey]);
};

/**
 * A hook similar to setState, but for boolean values that only need to be toggled.
 *
 * @param {boolean} initialValue Initial value for the state
 * @return {[
 *  state: boolean;
 *  toggleState: () => void
 * ]} [\
 * &nbsp; `state`: The current state. Do not change this directly\
 * &nbsp; `toggleState`: A method to toggle the boolean\
 * ]
 */
export const useToggle = (initialValue) => {
	const [state, setState] = React.useState(initialValue);
	const toggleState = () => setState(!state);
	return [state, toggleState];
};

// #region useAsync
const asyncReducer = (_draft, action) => {
	switch (action.type) {
		case 'reset': {
			return { status: 'idle', data: undefined, error: undefined };
		}
		case 'pending': {
			return { status: 'pending', data: undefined, error: undefined };
		}
		case 'resolved': {
			const { data } = action.payload;
			return { status: 'resolved', data, error: undefined };
		}
		case 'rejected': {
			const { error } = action.payload;
			return { status: 'rejected', data: undefined, error };
		}
		default: {
			throw new Error(`Unhandled action type: ${action}`);
		}
	}
};

/**
 * A hook to simplify making API calls and tracking the information from them.
 *
 * @return {{
 *  status: AsyncStatus;
 *  data: TReturn | undefined;
 *  error: Error | undefined;
 *  makeHttpRequest: ({ url, method, params, body, }: {
 * 		url: string;
 * 		method: Method;
 * 		params?: TParams;
 * 		body?: TBody;
 * 	}) => Promise<void>;
 *  reset: () => void;
 * }} {\
 * &nbsp; `status`: The status of the request. Do not change this directly\
 * &nbsp; `data`: The response from the request after calling run, if there is one. Do not change this directly\
 * &nbsp; `error`: The error from the request after call run, if there is one. Do not change this directly\
 * &nbsp; `makeHttpRequest`: Method to pass in HTTP request parameters to send request and update state\
 * &nbsp; `reset`: Method to reset to an initial state\
 * }
 */
export const useAsync = () => {
	const initialState = { status: 'idle', data: undefined, error: undefined };
	const [state, dispatch] = React.useReducer(asyncReducer, initialState);

	const makeHttpRequest = React.useCallback(
		async ({ url, method, params, body }) => {
			dispatch({ type: 'pending' });
			try {
				const data = await makeRequest({ url, method, params, body });
				dispatch({ type: 'resolved', payload: { data } });
			} catch (error) {
				dispatch({ type: 'rejected', payload: { error } });
			}
		},
		[dispatch],
	);

	const reset = () => dispatch({ type: 'reset' });

	return { ...state, makeHttpRequest, reset };
};

// #endregion

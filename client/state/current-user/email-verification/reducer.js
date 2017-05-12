/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import {
	EMAIL_VERIFY_REQUEST,
	EMAIL_VERIFY_REQUEST_SUCCESS,
	EMAIL_VERIFY_REQUEST_FAILURE,
} from 'state/action-types';

export const status = createReducer( null, {
	[ EMAIL_VERIFY_REQUEST ]: () => 'requesting',
	[ EMAIL_VERIFY_REQUEST_SUCCESS ]: () => 'sent',
	[ EMAIL_VERIFY_REQUEST_FAILURE ]: () => 'error',
} );

export const errorMessage = createReducer( '', {
	[ EMAIL_VERIFY_REQUEST_FAILURE ]: ( state, { message } ) => message,
} );

export default combineReducers( {
	status,
	errorMessage,
} );

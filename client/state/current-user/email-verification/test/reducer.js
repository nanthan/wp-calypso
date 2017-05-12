/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	EMAIL_VERIFY_REQUEST,
	EMAIL_VERIFY_REQUEST_SUCCESS,
	EMAIL_VERIFY_REQUEST_FAILURE,
	EMAIL_VERIFY_STATE_RESET,
} from 'state/action-types';
import reducer, {
	status,
} from '../reducer';

describe( 'reducer', () => {
	it( 'exports expected reducer keys', () => {
		expect( reducer( undefined, {} ) ).to.have.keys( [
			'status',
		] );
	} );

	describe( '#status', () => {
		it( 'returns null by default', () => {
			const result = status( undefined, { type: 'DUMMY' } );
			expect( result ).to.equal( null );
		} );

		it( 'returns "requesting" when a request is made', () => {
			const result = status( undefined, { type: EMAIL_VERIFY_REQUEST } );
			expect( result ).to.equal( 'requesting' );
		} );

		it( 'returns "sent" when email is sent', () => {
			const result = status( undefined, { type: EMAIL_VERIFY_REQUEST_SUCCESS } );
			expect( result ).to.equal( 'sent' );
		} );

		it( 'returns "error" when there is an error sending an email', () => {
			const result = status( undefined, { type: EMAIL_VERIFY_REQUEST_FAILURE } );
			expect( result ).to.equal( 'error' );
		} );

		it( 'returns null when the status is reset', () => {
			const result = status( undefined, { type: EMAIL_VERIFY_STATE_RESET } );
			expect( result ).to.equal( null );
		} );
	} );
} );

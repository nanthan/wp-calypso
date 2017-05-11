/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { noop, pick } from 'lodash';
/**
 * Internal dependencies
 */
import Button from 'components/button';

class RegistrantExtraInfoForm extends PureComponent {

	static defaultProps = {
		isVisible: false,
		isProbablyOrganization: false,
		onSubmit: noop,

	}

	constructor( props ) {
		super( props );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	componentWillMount() {
		this.state = {
			registrantType: this.props.isProbablyOrganization
				? 'organization' : 'individual',
			countryOfBirth: 'FR',
			dateOfBirth: '2000-12-31',
			placeOfBirth: 'dummyCity',
			postalCodeOfBirth: '12345',
			registrantVatId: 'XX123456789',
			sirenSiret: '123456789',
			trademarkNumber: '123456789',
		};
	}

	getRelevantFields( state ) {
		const { countryOfBirth, registrantType } = state;
		const bornInFrance = countryOfBirth === 'FR';
		const birthPlaceFields = [ 'placeOfBirth', 'postalCodeOfBirth' ];
		const individualFields = [
			'countryOfBirth',
			'dateOfBirth',
			...( bornInFrance ? birthPlaceFields : [] ),
		];
		const organizationalFields = [ 'registrantVatId', 'sirenSiret', 'trademarkNumber' ];
		const conditionalFields = registrantType === 'individual'
			? individualFields
			: organizationalFields;
		return [ 'registrantType', ...conditionalFields ];
	}

	handleSubmit() {
		const relevantFields = this.getRelevantFields( this.state );
		// TODO: Validate first
		// TODO: Do we need to strip spaces from VAT or SIRE[NT]?
		const result = pick( this.state, relevantFields );
		this.props.onSubmit( result );
	}

	render() {
		return (
			<div>
				<h1>The form</h1>
				<Button className="registrant-extra-info__continue is-primary"
					onClick={ this.handleSubmit }>
					Continue
				</Button>

			</div>
		);
	}
}

RegistrantExtraInfoForm.displayName = 'ExtraInfoFrForm';

export default RegistrantExtraInfoForm;

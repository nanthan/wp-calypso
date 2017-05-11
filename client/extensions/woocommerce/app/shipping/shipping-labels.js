/**
 * External dependencies
 */
import React, { Component } from 'react';
import i18n from 'i18n-calypso';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import FormFieldSet from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormSelect from 'components/forms/form-select';
import FormToggle from 'components/forms/form-toggle';
import ShippingCard from './shipping-card';
import ShippingHeader from './shipping-header';

class ShippingLabels extends Component {
	constructor( props ) {
		super( props );

		//TODO: use redux state with real data
		this.state = {
			visible: true,
			cards: [ {
				selected: true,
				type: 'VISA',
				digits: '1234',
				name: 'Name Surname',
				date: '12/19'
			}, {
				selected: false,
				type: 'MasterCard',
				digits: '5678',
				name: 'Name Surname',
				date: '01/20'
			} ]
		};

		this.onToggle = this.onToggle.bind( this );
		this.renderCard = this.renderCard.bind( this );
	}

	onToggle() {
		this.setState( { visible: ! this.state.visible } );
	}

	selectCard( index ) {
		const cards = this.state.cards.map( ( card ) => {
			return { ...card, selected: false };
		} );

		cards[ index ].selected = true;

		this.setState( { cards } );
	}

	renderCard( card, index ) {
		const onSelect = () => {
			this.selectCard( index );
		};

		return ( <ShippingCard
			key={ index }
			onSelect={ onSelect }
			{ ...card } /> );
	}

	render() {
		const __ = i18n.translate;

		return (
			<div>
				<ShippingHeader
					label={ __( 'Shipping Labels' ) }
					description={ __( 'Print shipping labels yourself.' ) }>
					<FormToggle onChange={ this.onToggle } checked={ this.state.visible } />
				</ShippingHeader>
				<Card className={ classNames( 'shipping__labels-container', { hidden: ! this.state.visible } ) }>
					<FormFieldSet>
						<FormLabel
							className="shipping__labels-paper-size"
							htmlFor="paper-size">
							{ __( 'Paper size' ) }
						</FormLabel>
						<FormSelect name="paper-size">
							<option>{ __( 'Letter' ) }</option>
							<option>{ __( 'Legal' ) }</option>
							<option>{ __( 'Label (4"x6")' ) }</option>
							<option>{ __( 'A4' ) }</option>
						</FormSelect>
					</FormFieldSet>
					<FormFieldSet>
						<FormLabel
							className="shipping__cards-label">
							{ __( 'Credit card' ) }
						</FormLabel>
						<p className="shipping__header-description shipping__credit-card-description">
							{ __( 'Use your credit card on file to pay for the labels you print or add a new one.' ) }
						</p>
						{ this.state.cards.map( this.renderCard ) }
						<Button compact>{ __( 'Add another credit card' ) }</Button>
					</FormFieldSet>
				</Card>
			</div>
		);
	}
}

export default ShippingLabels;

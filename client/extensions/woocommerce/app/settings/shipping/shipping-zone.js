/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import Gridicon from 'gridicons';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';

const ShippingZone = ( { translate, locationName, locationDescription, methodName, methodDescription, icon } ) => {
	return (
		<div className="shipping__zones-row">
			<div className="shipping__zones-row-icon">
				<Gridicon icon={ icon } size={ 36 } />
			</div>
			<div className="shipping__zones-row-location">
				<p className="shipping__zones-row-location-name">{ locationName }</p>
				<p className="shipping__zones-row-location-description">{ locationDescription }</p>
			</div>
			<div className="shipping__zones-row-method">
				<p className="shipping__zones-row-method-name">{ methodName }</p>
				<p className="shipping__zones-row-method-description">{ methodDescription }</p>
			</div>
			<div className="shipping__zones-row-actions">
				<Button compact>{ translate( 'Edit' ) }</Button>
			</div>
		</div>
	);
};

ShippingZone.propTypes = {
	locationName: PropTypes.string,
	locationDescription: PropTypes.string,
	methodName: PropTypes.string,
	methodDescription: PropTypes.string,
	icon: PropTypes.string
};

export default localize( ShippingZone );

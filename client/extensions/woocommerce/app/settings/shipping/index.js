/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import ShippingLabels from './shipping-labels';
import ShippingOrigin from './shipping-origin';
import ShippingPackageList from './shipping-package-list';
import ShippingZoneList from './shipping-zone-list';

const Shipping = ( { className } ) => {
	return (
		<Main className={ classNames( 'shipping', className ) }>
			<ShippingOrigin />
			<ShippingZoneList />
			<ShippingLabels />
			<ShippingPackageList />
		</Main>
	);
};

export default Shipping;

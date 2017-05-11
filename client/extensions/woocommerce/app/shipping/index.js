/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import ShippingLabels from './shipping-labels';
import ShippingOrigin from './shipping-origin';
import ShippingPackageList from './shipping-package-list';
import ShippingZoneList from './shipping-zone-list';

class Shipping extends Component {
	render() {
		return (
			<Main className="woocommerce shipping">
				<ShippingOrigin />
				<ShippingZoneList />
				<ShippingLabels />
				<ShippingPackageList />
			</Main>
		);
	}
}

export default Shipping;

/**
 * External dependencies
 */
import React, { Component } from 'react';
import classNames from 'classnames';

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
			<Main className={ classNames( 'shipping', this.props.className ) }>
				<ShippingOrigin />
				<ShippingZoneList />
				<ShippingLabels />
				<ShippingPackageList />
			</Main>
		);
	}
}

export default Shipping;

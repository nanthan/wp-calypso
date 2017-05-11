/**
 * External dependencies
 */
import React from 'react';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import Dialog from 'components/dialog';
import ExtraInfoFrForm from 'components/domains/registrant-extra-info/fr-form';

class RegistrantExtraInfoDialog extends React.Component {
	getDefaultProps() {
		return {
			isVisible: false,
			onDialogClose: noop,
		};
	}

	render() {
		console.log( 'rendering fr dialog:' );
		console.log( 'this.props.onDialogClose:', this.props.onDialogClose );
		return (
			<Dialog additionalClassNames="extra-contact-information-dialog domain-fr"
				isVisible={ this.props.isVisible }
				onClose={ this.props.onClose }>
				<ExtraInfoFrForm
					isVisible={ this.props.isVisible }
					onSubmit={ this.props.onDialogClose } />
			</Dialog>
		);
	}
}

RegistrantExtraInfoDialog.displayName = 'RegistrantExtraInfoDialog';

export default RegistrantExtraInfoDialog;
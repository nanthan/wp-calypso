/* eslint-disable no-console */
export default function transformer( file, api, options ) {
	const j = api.jscodeshift;
	const ReactUtils = require( 'react-codemod/transforms/utils/ReactUtils' )( j );
	const root = j( file.source );

	let changedSomething = false;

	// Remove CommonJS requires of LinkedStateMixin
	const commonJSImports = root.find( j.VariableDeclarator, {
		id: { name: 'LinkedStateMixin' },
		init: {
			type: 'CallExpression',
			callee: { name: 'require' },
			arguments: [ { type: 'Literal', value: 'react-addons-linked-state-mixin' } ]
		}
	} );

	if ( commonJSImports.size() > 0 ) {
		commonJSImports.remove();
		changedSomething = true;
	}

	// Remove ES6 imports of LinkedStateMixin
	const es6Imports = root.find( j.ImportDeclaration, {
		specifiers: [ {
			type: 'ImportDefaultSpecifier',
			local: { name: 'LinkedStateMixin' }
		} ],
		source: { type: 'Literal', value: 'react-addons-linked-state-mixin' }
	} );

	if ( es6Imports.size() > 0 ) {
		es6Imports.remove();
		changedSomething = true;
	}

	const removeLinkedStateMixin = classPath => {
		const mixinProperties = j( classPath ).find( j.Property, { key: { name: 'mixins' } } );
		if ( mixinProperties.size() === 0 ) {
			return null;
		}

		const mixinElements = j( mixinProperties.get().get( 'value' ).get( 'elements' ) );
		const linkedStateMixins = mixinElements.find( j.Identifier, { name: 'LinkedStateMixin' } );
		if ( linkedStateMixins.size() > 0 ) {
			// If it's the only remaining mixin, remove the whole 'mixin' property
			if ( mixinElements.get().value.length === 1 ) {
				mixinProperties.remove();
			} else {
				linkedStateMixins.remove();
			}
			changedSomething = true;
		}
	};

	const findLinkStateCalls = classPath => (
		j( classPath ).find( j.MemberExpression, {
			object: { type: 'ThisExpression' },
			property: { type: 'Identifier', name: 'linkState' }
		} )
	);

	ReactUtils.findAllReactCreateClassCalls( root ).forEach( createClassCall => {
		removeLinkedStateMixin( createClassCall );

		const linkStates = findLinkStateCalls( createClassCall );
		if ( linkStates.size() > 0 ) {
			console.log( 'Class has linkState calls?', linkStates.size() );
		}
	} );

	return changedSomething ? root.toSource( options ) : null;
}

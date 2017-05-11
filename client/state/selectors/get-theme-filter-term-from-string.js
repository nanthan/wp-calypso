/**
 * Internal dependencies
 */
import { isAmbiguousThemeFilterTerm } from './';

/**
 * return term from a taxonomy:term string
 *
 * @param {string} filter taxonomy:term string
 * @return {string} The term part, or full string if term is ambiguous
 */
export default function getThemeFilterTermFromString( state, filter ) {
	const term = filter.split( ':' )[ 1 ];
	if ( isAmbiguousThemeFilterTerm( state, term ) ) {
		return filter;
	}
	return term;
}

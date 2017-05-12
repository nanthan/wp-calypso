/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { localize } from 'i18n-calypso';
/**
 * Internal dependencies
 */
const AllSites = require( 'my-sites/all-sites' ),
	analytics = require( 'lib/analytics' ),
	Button = require( 'components/button' ),
	Card = require( 'components/card' ),
	Site = require( 'blocks/site' ),
	Gridicon = require( 'gridicons' );

import AsyncLoad from 'components/async-load';
import { getCurrentUser } from 'state/current-user/selectors';
import { getDecoratedSiteDomains } from 'state/sites/domains/selectors';
import { getSelectedOrAllSites } from 'state/selectors';
import { getSelectedSite, getSelectedSiteId } from 'state/ui/selectors';
import { isJetpackSite } from 'state/sites/selectors';
import QuerySiteDomains from 'components/data/query-site-domains';
import { setLayoutFocus } from 'state/ui/layout-focus/actions';
import SiteNotice from './notice';

class CurrentSite extends Component {
	static propTypes = {
		isJetpack: React.PropTypes.bool,
		isPreviewShowing: React.PropTypes.bool,
		siteCount: React.PropTypes.number.isRequired,
		setLayoutFocus: React.PropTypes.func.isRequired,
		selectedSiteId: React.PropTypes.number,
		selectedSite: React.PropTypes.object,
		translate: React.PropTypes.func.isRequired,
		anySiteSelected: React.PropTypes.array
	};

	switchSites = ( event ) => {
		event.preventDefault();
		event.stopPropagation();
		this.props.setLayoutFocus( 'sites' );

		analytics.ga.recordEvent( 'Sidebar', 'Clicked Switch Site' );
	};

	getDomainWarnings() {
		const { domains, isJetpack, selectedSiteId, selectedSite: site } = this.props;

		if ( ! selectedSiteId || isJetpack ) {
			return null;
		}

		return (
			<AsyncLoad require="my-sites/upgrades/components/domain-warnings"
				isCompact
				selectedSite={ site }
				domains={ domains }
				ruleWhiteList={ [
					'unverifiedDomainsCanManage',
					'unverifiedDomainsCannotManage',
					'expiredDomainsCanManage',
					'expiringDomainsCanManage',
					'expiredDomainsCannotManage',
					'expiringDomainsCannotManage',
					'wrongNSMappedDomains',
					'pendingGappsTosAcceptanceDomains'
				] }
			/>
		);
	}

	previewSite = ( event ) => this.props.onClick && this.props.onClick( event );

	render() {
		const { selectedSite, selectedSiteId, translate, anySiteSelected } = this.props;

		if ( ! anySiteSelected.length ) {
			return (
				<Card className="current-site is-loading">
					{ this.props.siteCount > 1 &&
						<span className="current-site__switch-sites">&nbsp;</span>
					}
					<div className="site">
						<a className="site__content">
							<div className="site-icon" />
							<div className="site__info">
								<span className="site__title">{ translate( 'Loading My Sites…' ) }</span>
							</div>
						</a>
					</div>
				</Card>
			);
		}

		return (
			<Card className="current-site">
				{ this.props.siteCount > 1 &&
					<span className="current-site__switch-sites">
						<Button compact borderless onClick={ this.switchSites }>
							<Gridicon icon="arrow-left" size={ 18 } />
							{ translate( 'Switch Site' ) }
						</Button>
					</span>
				}
				{ selectedSite
					? <div>
						<QuerySiteDomains siteId={ selectedSiteId } />
						<Site site={ selectedSite } />
						<a
							href={ selectedSite.URL }
							onClick={ this.previewSite }
							className={ `current-site__view-site${ this.props.isPreviewShowing ? ' selected' : '' }` }
						>
							<span className="current-site__view-site-text">
								{ translate( 'Site Preview' ) }
							</span>
							<Gridicon icon="computer" />
						</a>
					</div>
					: <AllSites />
				}
				{ this.getDomainWarnings() }
				<SiteNotice site={ selectedSite } />
			</Card>
		);
	}
}

export default connect(
	( state ) => {
		const selectedSiteId = getSelectedSiteId( state );
		const user = getCurrentUser( state );

		return {
			domains: getDecoratedSiteDomains( state, selectedSiteId ),
			isJetpack: isJetpackSite( state, selectedSiteId ),
			selectedSiteId,
			selectedSite: getSelectedSite( state ),
			anySiteSelected: getSelectedOrAllSites( state ),
			siteCount: get( user, 'visible_site_count', 0 ),
		};
	},
	{ setLayoutFocus },
)( localize( CurrentSite ) );

import React from 'react';
import { LayoutMain } from 'layouts';
import { useMarketplaceStore, MarketplaceStoreProvider } from './store';
import { MarketplaceRow } from './components';
import { Button } from 'components/common';
import { setPage } from './actions';
import { EmptyNotice } from 'components/common';

const MarketplacePage = (props) => {
	const { state, dispatch } = useMarketplaceStore();
	const { rows, total, page, loading } = state;
	return (
		<React.Fragment>
			{total === 0 && !loading && <EmptyNotice />}
			{rows.map((x, i) => (
				<MarketplaceRow count={i + 1} row={x} key={x._id.toString()} />
			))}
			{rows.length < total && !loading && (
				<div style={{ textAlign: 'center' }}>
					<Button
						className="btn small-btn "
						style={{ border: '1px solid green' }}
						label="load more"
						onClick={() => setPage(dispatch)(page + 1)}
					/>
				</div>
			)}
		</React.Fragment>
	);
};

export default () => (
	<LayoutMain>
		<div className="title-card">
			<div className="title-cardHead-wrapper">
				<h4 className="title-cardHead">Marketplace</h4>
			</div>
		</div>
		<MarketplaceStoreProvider>
			<MarketplacePage />
		</MarketplaceStoreProvider>
	</LayoutMain>
);

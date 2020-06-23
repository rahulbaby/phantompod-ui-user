import React from 'react';
import { LayoutMain } from 'layouts';
import { useMarketplaceStore, MarketplaceStoreProvider } from './store';
import { MarketplaceRow } from './components';
import { Button } from 'components/common';
import { setPage } from './actions';

const MarketplacePage = (props) => {
	const { state, dispatch } = useMarketplaceStore();
	const { rows, total, page, loading } = state;
	return (
		<React.Fragment>
			{rows.map((x, i) => (
				<MarketplaceRow count={i + 1} row={x} key={x._id.toString()} />
			))}
			{rows.length < total && !loading && (
				<Button label="load more" onClick={() => setPage(dispatch)(page + 1)} />
			)}
		</React.Fragment>
	);
};

export default () => (
	<LayoutMain>
		<MarketplaceStoreProvider>
			<MarketplacePage />
		</MarketplaceStoreProvider>
	</LayoutMain>
);

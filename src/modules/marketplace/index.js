import React from 'react';
import { LayoutMain } from 'layouts';
import { useMarketplaceStore, MarketplaceStoreProvider } from './store';
import { MarketplaceRow } from './components';
import { Button } from 'components/common';
import { setPage } from './actions';
import { EmptyNotice } from 'components/common';

const MarketplacePage = (props) => {
	const [search, setSearch] = React.useState('');
	const { state, dispatch, resetStore } = useMarketplaceStore();
	const { rows, total, page, loading } = state;

	const inputRef = React.useRef();

	return (
		<React.Fragment>
			<div className="search-from mb-4">
				<input
					type="text"
					className="form-control form-input"
					placeholder="Search by Name"
					ref={inputRef}
				/>
				<button
					className="btn green-btn search-btn"
					onClick={() => {
						const searchVal = inputRef.current.value;
						resetStore(searchVal);
					}}
				>
					Search
				</button>
			</div>
			{total === 0 && !loading && (
				<EmptyNotice title={`No Pods are available to join at the moment!`} />
			)}
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
		<MarketplaceStoreProvider>
			<MarketplacePage />
		</MarketplaceStoreProvider>
	</LayoutMain>
);

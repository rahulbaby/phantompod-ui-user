import { useSelector } from 'react-redux';

export default (itemKey) => {
	const items = useSelector(({ items }) => items.rows);
	return items[itemKey];
};

import { useEffect, useState } from 'react';

export default function usePagination({ count = 0, initial = 0 }) {
	const [page, setPage] = useState(initial);
	const [direction, setDirection] = useState(true);
	const atStart = (page <= 0);
	const atEnd = (page >= count -1);
	const back = () => {
		setDirection(false);
		!atStart && setPage(page - 1);
	}
	const forward = () => {
		setDirection(true);
		!atEnd && setPage(page + 1);
	}
	const goTo = index => index > -1 && index < count && setPage(index);

	return { atEnd, atStart, back, count, direction, forward, goTo, page, setPage }
};
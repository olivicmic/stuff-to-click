import { usePagination } from 'hangers';

const n = o => o;

export default function useSlideshow({ onCatch = n, onChange = n, ...rest }) {
	const inChange = ({ target }) => {
		onChange({
			target: {
				...target,
				...target?.name && { name: target.name },
				value: { slide: target?.value || 0 }
			}
		});
	};

	const catchPage = (slide, toDo) => {
		onCatch(slide);
		toDo(slide)
	};

	const { back, forward, goTo, ...pagination } = usePagination({
		...rest,
		onChange: inChange
	});

	return {
		...pagination,
		back: w => catchPage(w,back),
		forward: w => catchPage(w,forward),
		goTo: w => catchPage(w,goTo),
	};
};
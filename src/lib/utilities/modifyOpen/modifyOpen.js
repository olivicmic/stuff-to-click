import { is } from 'lal';

const props = ['bottom', 'centerX', 'closeOutside', 'cornerX', 'cornerY', 'debug', 'height', 'padX', 'padY', 'right', 'top', 'width', 'x', 'y'];

const modifyOpen = ({ baseConfig, target: inTarget, config, ...openRest }) => {
	const base = baseConfig || {};
	const target = inTarget?.getBoundingClientRect() || {};
	const { gapX, gapY, ...overwrite } = config || {};
	const primaryProps = props.reduce((obj, prop) => ({ 
		...obj,
		...is.defined(a => ({  [prop]: a }), overwrite[prop],target[prop],base[prop])
	}),{});

	const fontSize = parseInt(( inTarget ? 
		getComputedStyle(inTarget) :
		window.getComputedStyle(document.getElementById('root')) 
	).getPropertyValue('font-size').slice(0,-2));

	const gap = ['gapX','gapY'];
	const multiply = ['gapXMultiply','gapYMultiply'];
	const animate = (n,i) =>({ [gap[i]]: n * is.defined(overwrite[multiply[i]], base[multiply[i]], 0) });

	return {
		...(baseConfig || config || inTarget) && { 
			config: {
				...primaryProps,
				enter: [0,-50],
				...is.defined(n => animate(n,0), gapX, base.gapX, fontSize),
				...is.defined(n => animate(n,1), gapY, base.gapY, fontSize) 
			},
		},
		...openRest,
	};
};

export default modifyOpen;
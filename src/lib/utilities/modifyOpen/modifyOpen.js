import { is } from 'lal';

const parentKeys = ['alignX', 'alignY', 'bottom', 'centerX', 'cornerX', 'cornerY', 'debug', 'height', 'padX', 'padY', 'right', 'top', 'width', 'x', 'y'];
const childKeys = ['alignX', 'alignY', 'closeOutside', 'disableTint', 'enter', 'exit', 'spring'];

const modifyOpen = ({ eventChild = {}, eventParent = {}, presetChild = {}, presetParent = {}, target: inTarget, ...openRest }) => {
	const parents = [eventParent, presetParent];
	const children = [eventChild, presetChild];
	const target = inTarget?.getBoundingClientRect() || {};
	const setupProps = (arr, input) => arr.reduce((obj, prop) => ({ 
		...obj,
		...is.defined(a => ({  [prop]: a }), input[0][prop],target[prop],input[1][prop])
	}),{});
	const childProps = setupProps(childKeys, children);
	const parentProps = setupProps(parentKeys, parents);

	const fontSize = parseInt(( inTarget ? 
		getComputedStyle(inTarget) :
		window.getComputedStyle(document.getElementById('root')) 
	).getPropertyValue('font-size').slice(0,-2));

	const gap = ['gapX','gapY'];
	const multiply = ['gapXMultiply','gapYMultiply'];
	const animate = (n,i) =>({ [gap[i]]: n * is.defined(eventParent[multiply[i]], presetParent[multiply[i]], 0) });

	return {
		...( parents.concat(children).find(a => !!Object.keys(a).length) || inTarget) && {
			...childProps && { child: childProps },
			parent: {
				...parentProps,
				...is.defined(n => animate(n,0), eventParent.gapX, presetParent.gapX, fontSize),
				...is.defined(n => animate(n,1), eventParent.gapY, presetParent.gapY, fontSize) 
			},
			...openRest,
		}
	};
};

export default modifyOpen;
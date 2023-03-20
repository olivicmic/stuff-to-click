import { is } from 'lal';

const parentKeys = ['alignX', 'alignY', 'bottom', 'debug', 'height', 'padX', 'padY', 'right', 'top', 'width', 'x', 'y'];
const childKeys = ['alignX', 'alignY', 'centerX', 'centerY', 'closeOutside', 'disableTint', 'enter', 'exit', 'fitToParentX', 'spring'];

const positionOverlay = ({ debug, eventConfig, preConfig, target: inTarget, ...rest }) => {
	const { child: presetChild = {}, parent: presetParent = {} } = preConfig || {};
	const { child: eventChild = {}, parent: eventParent = {} } = eventConfig || {};
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

	if (debug) console.debug('positionOverlay debug',{ debug, childProps, parentProps });

	return {
		...rest,
		...( parents.concat(children).find(a => !!Object.keys(a).length) || inTarget) && {
			...childProps && { child: childProps },
			...parentProps && { parent: {
				...parentProps,
				...is.defined(n => animate(n,0), eventParent.gapX, presetParent.gapX, fontSize),
				...is.defined(n => animate(n,1), eventParent.gapY, presetParent.gapY, fontSize) 
			} },
			debug
		}
	};
};

export default positionOverlay;
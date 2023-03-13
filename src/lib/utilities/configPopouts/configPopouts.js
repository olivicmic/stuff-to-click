import Picker from '../../Picker';

const popoutAnchor = (child, parent) => ({
	child: { alignX: 0, disableTint: true, enter: [0,-16], spring: { mass: 0.5,tension: 120, friction: 10 }, ...child },
	parent: { alignX: 0, gapYMultiply: .5, padX: 8, ...parent }
});

const configPopouts = ({ debug, overrideAll, picker, pickerOverride, addConfigs }) => ({
	picker: {
		component: picker || Picker,
		...popoutAnchor(pickerOverride?.child || {}, pickerOverride?.parent || {}),
		...overrideAll
	},
	...addConfigs && Object.keys(addConfigs).reduce((obj, config) => {
		let { child, parent, ...configRest } = addConfigs[config];
		if (debug) console.debug('configPopouts', debug, { child, parent, configRest });
		return {
			...obj,
			[config]: { ...configRest, ...popoutAnchor(child, parent), ...overrideAll },
		}
	},{})
});

export default configPopouts;

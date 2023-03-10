import Picker from '../../Picker';

const popoutAnchor = {
	child: { alignX: 0, disableTint: true, enter: [0,-16], spring: { mass: 0.5,tension: 120, friction: 10 } },
	parent: { alignX: 0, gapYMultiply: .5, padX: 4 }
};

const configPopouts = ({ picker, addConfigs }) => ({
	picker: {
		component: picker || Picker,
		...popoutAnchor
	},
	...addConfigs && Object.keys(addConfigs).reduce((obj, config) => ({
		...obj,
		[config]: { ...addConfigs[config], ...popoutAnchor }
	}),{})
});

export default configPopouts;

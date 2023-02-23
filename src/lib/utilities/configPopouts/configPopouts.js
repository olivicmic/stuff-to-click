import modifyOpen from '../modifyOpen';

const configPopouts = {
	picker: {  
		config: { gapYMultiply: .25 }, 
		disableTint: true, modifyOpen,
		spring: { mass: 0.5,tension: 120, friction: 10	}
	}
};

export default configPopouts;

import { useSpring, easings } from 'react-spring';

export default function useAnimatedDrop({ onRest }) {
	const [sprung, animate] = useSpring(() => ({
		opacity: 0,
		transform: `translateY(0px)`,
	}));

	return [ sprung, // props
		(dir, y) => animate.start({ // enter
			config: {			
				duration: 500,
				easing: easings.easeOutCirc,
			},
			opacity: 1, 
			transform: `translateY(${ (dir || -1 )* (y) }px)`
		}),
		(func = () => {}) => {
		animate.start({ // exit
				config: {			
					duration: 700,
					easing: easings.easeInQuart,
				},
				opacity: 0,
				transform: `translateY(0px)`,
				onRest
			});

			if (func) func();
		}
	];
};
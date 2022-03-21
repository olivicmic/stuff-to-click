import { useSpring, easings } from 'react-spring';

export default function useAnimatedDrop({ onRest = () => {}, from = [0,0], to = [0,0] }) {
	const [sprung, animate] = useSpring(() => ({
		opacity: 0,
		transform: `translate(${from[0]}px, ${from[1]}px)`,
	}));

	return [ sprung, // props
		dir => animate.start({ // enter
			config: {			
				duration: 500,
				easing: easings.easeOutCirc,
			},
			opacity: 1, 
			transform: `translate(${ (dir || -1 )* (to[0]) }px, ${ (dir || -1 )* (to[1]) }px)`
		}),
		(func = () => {}) => {
		animate.start({ // exit
				config: {			
					duration: 800,
					easing: easings.easeInOutQuart,
				},
				opacity: 0,
				transform: `translateY(${from[0]}px, ${from[1]}px)`,
				onRest
			});

			if (func) func();
		}
	];
};
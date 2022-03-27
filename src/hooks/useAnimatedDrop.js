import { useSpring, easings } from 'react-spring';

export default function useAnimatedDrop({ modals, modID, onRest = () => {}, from = [0,0], to = [0,0] }) {
	console.log('useAnimatedDrop base', modID, modals);
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
			transform: `translate(0px, 0px)`
		}),
		(func = () => {}) => {
		animate.start({ // exit
				config: {			
					duration: 800,
					easing: easings.easeInOutQuart,
				},
				opacity: 0,
				transform: `translateY(${from[0]}px, ${from[1]}px)`,
				onRest: () => { console.log('useAnimatedDrop exit onRest', modID, modals); onRest(); func(); }
			});
		}
	];
};
const selectSwitch = {
	from: { opacity: 0, transform: 'translateY(0em)'},
	enter: { opacity: 1, transform: 'translateY(0.5em)'},
	leave: { opacity: 0, transform: 'translateY(0em)'},
	config: { friction: 50, tension: 350 }
};

export default selectSwitch;
export default function useStuffClasses({ focus, valid, }) {
	const classes = ['-wrapper','-active','-error','-label','-label-error'].map(item => 'stuff-input' + item);
	const isValid = !valid ? true : valid;
	const errClass = n => isValid ? '' : classes[n];

	return {
		labelClass: `${classes[3]} ${errClass(4)}`,
		mainClass: `${classes[0]} ${focus ? classes[1] : ''} ${errClass(2)}`
	};
};
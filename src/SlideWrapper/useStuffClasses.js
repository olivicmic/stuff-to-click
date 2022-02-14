export default function useStuffClasses({ focus, valid, value, }) {
	const classes = ['','-active','-error','-label','-label-raised','-label-error'].map(item => 'stuff-slide-input' + item);
	const isValid = !valid ? true : valid;
	const errClass = n => isValid ? '' : classes[n];
	const labelRaise = (focus || value) ? classes[4] : '';

	return {
		labelClass: `${classes[3]} ${labelRaise} ${errClass(5)}`,
		mainClass: `${classes[0]} ${focus ? classes[1] : ''} ${errClass(2)}`
	};
};
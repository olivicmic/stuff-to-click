export default function useStuffClasses({ focus, valid, type = 'input' }) {
	const classes = (i, kind) => ['','-focus','-error'].map(item => 'stuff-' + kind + item)[i];
	const isValid = !valid ? true : valid;
	const errClass = (n, kind) => isValid ? '' : ' ' + classes(n, kind);

	return {
		labelClass: `${ classes( 0, 'label' ) }${ errClass(2, 'label') }`,
		mainClass: `${ classes(0, type) }${ focus ?  ' ' + classes(1, type) : '' }${ errClass(2, type) }`
	};
};
# stuff-to-click

[![NPM](https://img.shields.io/npm/v/stuff-to-click.svg)](https://www.npmjs.com/package/stuff-to-click) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

ReadMe not updates for v4, use at your own risk.

A collection of experimental React components.

## Install

```bash
npm install --save stuff-to-click
```

## Common usage
All of the stuff-to-click inputs are designed as controlled inputs, pulling their value from a parent state and updating it via a provided function via the onChange attribute.

## Accordian

The accordian, closed by default, will expand to the height of the child contents. It is expanded via clicking the accordian header and footer. There is an expander attribute where you can specify a component which is passed an "active" boolean attribute. Content for the header and footer can be specified via the header and footer attributes respectively. Only the header is visible while the accordian is closed. It can also recieve a function which itself can recieve a callback that returns the expanded state as a boolean (true = expanded, false = closed).

```jsx
const myButton = ({ active, onClick}) => <button type='button' onClick={onClick}>{ active ? 'on' : 'off' }</button>;

<Accordian expander={/* {myButton} */} headerComponent={/* {headerComponent} */} footer={/* {footerComponent} */}>
	<h3>Hey</h3>
	<p>Some stuff</p>
</Accordian>

```


## DragSlider

DragSlider is a numerical range slider, that adjust values from 0 to whatever is set as "max" attribute. An updated value is returned via the onChange function. Styling can applied to slider handle via the "slide" attribute.

```jsx

doThis = (newValue) => setState(newValue);

<DragSlider value={value} max={100} onChange={doThis} slide={{/* css */}}/>

```


## Input

This input has a built in label (defined by using the 'label' attribute). Use the onChange attribute to define a function to update the parent state, which can also be a sanitizing function. The valid attribute takes a boolean which on error will assign the classes 'stuff-text-error' (these are type dependent, for example, type='number' will have 'stuff-number' prefixed classes) and 'stuff-label-error' which can be styled any which way to indicate an error. The bar at the bottom of the input can be styled via passing a CSS object to the 'bar', or disabled with a falsey value.

A buttons, icon, or any other component can be displayed in the input by passing the component via the 'extra' attribute.

Other standard input attributes can be applied to it, and they will be passed to the core child input.

```jsx

doThis = (newValue) => setState(newValue);

<Input label={state} onChange={doThis} valid="true" name="firstname" bar={{/* css */}} extra={component}/>

```


## OverLayer

Overlayer injects componenents as overlays above page content, providing controls and shared state to the injected component as props, or via the useOverlayContext hook for any other components. Required by Select. Positioning is determined by providing the coordinates and size of a host component, and will appear below or above the component if it goes off the edge of the viewport vertically.

```jsx
import { OverLayer } from 'stuff-to-click';

export default function App({}) {
	return <OverLayer>
	// your content
	</OverLayer>;
};

// in any component ...

import { useOverlayContext } from 'stuff-to-click';
import MyOverlay from './MyOverlay'

export default function MyComponent({}) {
	const [rendered, setRendered] = useState(false);
	const { addOverlay } = useOverlayContext();
	const content = 'hello world';

	useEffect(() => {
		if (!rendered) {
			addOverlay({
				component: MyOverlay,
				host: { gap: 8, height: 45, width: 250, x: 100, y: 50 }, // will determine position
				...rest // other values will be passed to yout overlay
				state: { content }
			}); // because overlays are in a different scope these values will not update dynamically, use overState/updateOverlay to share state.
		}
	},[rendered]);

	return <div>Hello World.</div>;
};

// your overlay

export default function MyOverlay({ 
	current, // provided to overlay by overLayer
	deleteOverlay,
	state // saved to overlay state when created above
}) {

	return <div>
		{ state.content || null }
		<button onClick={() => deleteOverlay(current)} >Close</button>
	</div>;
};
```

### Shared overlay context values
- `addOverlay (function)`: Create a new overlay with the parameter object below:
	- `Component (React component)`: The component to be rendered within OverLayer.
	- `host (object)`: Object dictating positioning of the overlay.
		- `gap (number)`: Distance from the overlay and the host after animating.
		- `height (number)`: Height of host component (determines animation origin).
		- `width (number)`: Width of host component (determines animation origin).
		- `x (number)`: X value of where the top left of corner the host component sits.
		- `Y (number)`: Y X value of where the top left of corner the host component sits.
- `current (number)`: Represents the index of the most recently created overlay.
- `deleteOverlay (function)`: Sets the overlay at a given index to be deleted.
- `overlays (array)`: An array of objects representing each overlay.
- `overState (array)`: An array of objects per each overlay.
- `updateOverlay (function)`: Update an overlay state with the following params:
	1. Index number of overlay to update.
	2. Object containing values to update the overlay state with.

### Additional props passed to custom overlays
- `busy (boolean)`: True while any overlay is animating.
- `overlay (object)`: the shared state for the current overlay.
- `overlayID (string)`: A string unique to each modal.
- `overlayRef (function)`: Set as the ref for your overlay, neccesary to animate within the viewport.
- `position (number)`: The position of the overlay within the overlay array.


## Select

Select is a select/picker with an integrated label like Input. It updates a parent state via an onChange function which is passed an event callback. Options are provided via an array of objects, each with a 'value' and 'label' property. The label property is what is displayed on the component but does not have to reflect the value exactly.

The valid attribute takes a boolean which will assign error classes 'stuff-select-error' and 'stuff-label-error' which can be styled any which way to indicate an error. The main select input, the option list, and the optional bottom bar can be styled by providing 

A component can be inserted via the 'arrow' attribute to replace the default arrow.

It can be controlled via the up and down arrows, and a selection can be made with the enter key. On mobile devices the system select interface will activate rather than the custom styled list.

Usage requires Select is within the OverLayer component above.

```jsx

doThis = (newValue) => setState(newValue);

options = [{
		value: 'pizza', // will be returned if chosen
		label: 'Fresh Pizza'// will be displayed if chosen
	},{
		value: 'sandwich',
		label: 'Deli Sandwich'
	}];

<Select 
	value={state}
	onChange={doThis} 
	label='Pick a food' name='text'
	set={options}
	tabIndex='1'
	required
	valid={/* boolean */} arrow={myCustomeArrowComponent}
	style={{ /* css for the main select input */}}
	listStyle={{/* css for the option list*/}}
	bar={{/* css for the bottom bar */}}
/>

```

## SlideShow

Slideshow takes a collection of elements and animates between them utilizing [react-spring](https://react-spring.io). Slides are provided with a variety of controls to navigate between, and for the overall animation simplified controls may be used or full react-spring params.

```jsx
// containing slides are presented via a function to make the slideshow controls/values accessible to your slides, which themselves are returned within an array.
const mySlides = ({ atStart, atEnd, back, busy, page, forward, ...more }) => [ ... ].map((item, it) =>
	<div>
		<h1>Page {page}: {item.title}</h1>
		<button onClick={back} disabled={atStart || busy}>Back</button>
		<button onClick={forward} disabled={atEnd || busy}>Next</button>
	</div>);

<Slideshow from={{opacity: 1, range: 100}} leave={{opacity: 0, range: 50}} spring='slow'>{myslides}</Slideshow>

```

### Slideshow input props
- `axis (string, default 'x')`: Set the orientation of movement between 'x', 'y', and 'xy'.
- `direction (number 0 - 1 default 1,)`: Flip the direction, for example a value of 1 advances right, reverses left, but alternates with 0.
- `fade (number 0 - 1 default 1)`: Set the opacity on the from/leave steps simultaneously.
- `from \ enter \ leave (object)`: Params defining the animation steps 'from' (item adds/appears), 'enter' (item stationary), and 'leave' (item hides/removes).
	- `opacity (number, 0 - 1.0 )`: Opacity value for the respective step.
	- `range (any number, including negative )`: Refers the percentage moved from origin.
- `initial (number)`; Set the initial page.
- `onChange (function)`: A function to run on page changes. Recieves the current page number ala e.target.value
- `override (object)`: Set your own react-spring useTransition params.
- `range (any number, including negative default 100)`: Set the range on the from/leave steps simultaneously.
- `spring (object/string, default 'slot')`: Set spring config, including default react-spring configs, or pass your own config object.

### Slide recieved props
- `active (boolean)`: Initially false, will be true on the first page change.
- `atEnd (boolean)`: Will be true if on the last page.
- `atStart (boolean)`: Will be true if on the first page.
- `back (function)`: Function to go back one page if not on the first page.
- `busy (boolean)`: Is true while the slideshow is animating, and false when static.
- `count (number)`: Total number of slides.
- `direction (number)`: Direction value provided above.
- `forward (function)`: Function to go forward one page if not on the last page.
- `goto (function(number))`: Function to go to the page provided as a number param if the page is within count.
- `page (number)`: Current page as a number.


## License

MIT © [olivicmic](https://github.com/olivicmic)
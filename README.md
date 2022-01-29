# stuff-to-click

> A library of react components by vics.pics 😎

[![NPM](https://img.shields.io/npm/v/stuff-to-click.svg)](https://www.npmjs.com/package/stuff-to-click) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save stuff-to-click
```

## Common usage
All of the stuff-to-click inputs are designed as controlled inputs, pulling their value from a parent state and updating it via a provided function via the onChange attribute.

## SlideInput

This input has a built in label (defined by using the 'label' attribute). Use the onChange attribute to define a function to update the parent state, which can also be a sanitizing function. The valid attribute takes a boolean which will assign error classes 'stuff-slide-input-error' and 'stuff-slide-input-label-error' which can be styled any which way to indicate an error. The bar attribute is disabled by default, but when passed an empty object or a CSS object a bottom bar will appear and can be styled via the CSS object.

A buttons, icon, or any other component can be displayed in the input by passing the component via the 'extra' attribute.

Other standard input attributes can be applied to it, and they will be passed to the core child input.

```jsx

doThis = (newValue) => setState(newValue);

<SlideInput label={state} onChange={doThis} valid="true" name="firstname" bar={{/* css */}} extra={component}/>

```

## SlideSelect

SlideSelect is a select/dropdown with a built-in label like SlideInput. It updates a parent state via an onChange function which is passed an e.target callback object like standard input. Options are provided via an array of objects, each with a 'value' and 'label' property. The label property is what is displayed on the component but does not have to reflect the value exactly.

The valid attribute takes a boolean which will assign error classes 'stuff-slide-input-error' and 'stuff-slide-input-label-error' which can be styled any which way to indicate an error. The main select input, the option list, and the optional bottom bar can be styled by providing 

A component can be injected via the 'arrow' attribute, to replace the default arrow.

It can be controlled via the up and down arrows, and a selection can be made with the enter key. On mobile devices the system select interface will activate rather than the custom styled list.

```jsx

doThis = (newValue) => setState(newValue);

options = [{
		value: 'pizza', // will be returned if chosen
		label: 'Fresh Pizza'// will be displayed if chosen
	},{
		value: 'sandwich',
		label: 'Deli Sandwich'
	}];

<SlideSelect 
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

### Parameters
- `axis (string, default 'x')`: Set the orientation of movement between 'x', 'y', and 'xy'.
- `direction (number 0 - 1 default 1,)`: Flip the direction, for example a value of 1 advances right, reverses left, but alternates with 0.
- `fade (number 0 - 1 default 1)`: Set the opacity on the from/leave steps simultaneously.
- `from \ enter \ leave (object)`: Params defining the animation steps 'from' (item adds/appears), 'enter' (item stationary), and 'leave' (item hides/removes).
	- `opacity (number, 0 - 1.0 )`: Opacity value for the respective step.
	- `range (any number, including negative )`: Refers the percentage moved from origin.
- `initial (number)`; Set the initial page.
- `override (object)`: Set your own react-spring useTransition params.
- `range (any number, including negative default 100)`: Set the range on the from/leave steps simultaneously.
- `spring (object/string, default 'slot')`: Set spring config, including default react-spring configs, or pass your own config object.

### Slide Callbacks
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

## DragSlider

dragSlider is a numerical range slider, that adjust values from 0 to whatever is set as "max" attribute. An updated value is returned via the onChange function. Styling can applied to slider handle via the "slide" attribute.

```jsx

doThis = (newValue) => setState(newValue);

<DragSlider value={value} max={100} onChange={doThis} slide={{/* css */}}/>

```

## ColorDragSlider

ColorDragSlider is similar to DragSlider except that it accepts a 6 digit hex color as its value, and will return a new hex color depending on which color string ('red','green', or 'blue') is assigned to the mode attribute. The color returned via the onChange function will be a hex color including a hash. The unselected channels will be unaltered.

```jsx

import { ColorDragSlider } from 'stuff-to-click'; // outside parent component

doThis = (newValue) => setState(newValue);

<ColorDragSlider value={state} max={100} onChange={doThis} slide={{/* css */}} mode='red'/>

```
## NumInput

NumInput is used in place of standard number inputs, to avoid leading zeros, allowing for more natural typing input, while excluding unwanted input (such as letters). It will use numpad/keypad input on mobile. By applying a max prop, you can set a maximum input allowed (default 100).

Additional input props will be passed down to the input.

```jsx

import { NumInput } from 'stuff-to-click'; // outside parent component

doThis = (newValue) => setState(newValue);

<NumInput value={state} max='300' onChange={doThis} />

```

## RGBInput

RGBInput an input which uses NumINput, and when given a hex value alongside a 'red', 'green', or 'blue' mode, will display the 0-255 value of the selected channel. When the number is changed, it will return an updated full hex color via the onChange function, with the unselected channels unaltered.

Additional input props will be passed down to the input.

```jsx

import { RGBInput } from 'stuff-to-click'; // outside parent component

doThis = (newValue) => setState(newValue); // newValue = # hex string 

return <RGBInput value={state} onChange={colorChange} mode='red' /> // value = # hex string 

```

## HexInput

Hex input is a text input that accepts a hex color as its value. It anicipates a 6 digit hex with hash, but displays without the hash for ease of copying, but the hash will be returned via the onChange function. It blocks any invalid characters (not 0-9 or a-f);

Standard text input attributes can be passed down to the input.

```jsx

import { HexInput } from 'stuff-to-click'; // outside parent component

doThis = (newValue) => setState(newValue);

<HexInput value={state} onChange={doThis} />

```

## Accordian

The accordian, closed by default, will expand to the height of the child contents. It is expanded via clicking the accordian header and footer. There is an expander attribute where you can specify a component which is passed an "active" boolean attribute. Content for the header and footer can be specified via the header and footer attributes respectively. Only the header is visible while the accordian is closed. It can also recieve a function which itself can recieve a callback that returns the expanded state as a boolean (true = expanded, false = closed).

```jsx
const myButton = ({ active, onClick}) => <button type='button' onClick={onClick}>{ active ? 'on' : 'off' }</button>;

<Accordian expander={/* {myButton} */} headerComponent={/* {headerComponent} */} footer={/* {footerComponent} */}>
	<h3>Hey</h3>
	<p>Some stuff</p>
</Accordian>

```

## License

MIT © [olivicmic](https://github.com/olivicmic)

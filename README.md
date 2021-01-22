# stuff-to-click

> A library of react components by vics.pics 😎

[![NPM](https://img.shields.io/npm/v/stuff-to-click.svg)](https://www.npmjs.com/package/stuff-to-click) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save stuff-to-click
```

## SlideInput

This input has a built in label (defined by using the 'label' attribute). It is intended to work with values within a parent state. Use the onChange attribute to define a function to update the parent state, which can also be a sanitizing function. The valid attribute takes a boolean which will assign error classes 'stuff-slide-input-error' and 'stuff-slide-input-label-error' which can be styled any which way to indicate an error. The bar attribute is disabled by default, but when passed an empty object or a CSS object a bottom bar will appear and can be styled via the CSS object.

Other standard input attributes can be applied to it, and they will be passed to the core child input.

```jsx
import React from 'react'

import SlideInput from 'stuff-to-click';

doThis = (newValue) => setState(newValue);

default export function yourComponent() {
    return <SlideInput label={state.value} onChange={doThis} valid="true" name="firstname" bar={/* css */}/>
 }
```

## DragSlider

dragSlider is a numerical range slider, that adjust values from 0 to whatever is set as "max" attribute. An updated value is returned via the onChange function. Styling can applied to slider handle via the "slide" attribute.

```jsx
import React from 'react'

import DragSlider from 'stuff-to-click';

doThis = (newValue) => setState(newValue);

default export function yourComponent() {
    return <DragSlider value={state.value} max={100} onChange={doThis} slide={{/* css */}}/>
 }
```

## ColorDragSlider

ColorDragSlider is similar to DragSlider except that it accepts a 6 digit hex color as its value, and will return a new hex color depending on which color string ('red','green', or 'blue') is assigned to the mode attribute. The color returned via the onChange function will be a hex color including a hash. The unselected channels will be unaltered.

```jsx
import React from 'react'

import ColorDragSlider from 'stuff-to-click';

doThis = (newValue) => setState(newValue);

default export function yourComponent() {
    return <ColorDragSlider value={state.value} max={100} onChange={doThis} slide={{/* css */}} mode='red'/>
 }
```
## RGBInput

RGBInput is a number input which when given a hex value and a 'red', 'green', or 'blue' mode, will display the 0-255 value of the selected channel. When the number is changed, it will return an updated full hex color via the onChange function, with the unselected channels unaltered.

Standard number input attributes can be applied to it.

```jsx
import React from 'react'

import RGBInput from 'stuff-to-click';

doThis = (newValue) => setState(newValue);

default export function yourComponent() {
    return <RGBInput value={apSt.color} onChange={colorChange} mode='red' />
 }
```

## HexInput

Hex input is a text input that accepts a hex color as its value. It anicipates a 6 digit hex with hash, but displays without the hash for ease of copying, but the hash will be returned via the onChange function. It blocks any invalid characters (not 0-9 or a-f);

Standard text input attributes can be passed down to the input.

```jsx
import React from 'react'

import HexInput from 'stuff-to-click';

doThis = (newValue) => setState(newValue);

default export function yourComponent() {
    return <HexInput value={apSt.color} onChange={colorChange} />
 }
```

## License

MIT © [olivicmic](https://github.com/olivicmic)

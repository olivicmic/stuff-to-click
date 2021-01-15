# stuff-to-click

> A library of react components by vics.pics 😎

[![NPM](https://img.shields.io/npm/v/stuff-to-click.svg)](https://www.npmjs.com/package/stuff-to-click) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save stuff-to-click
```

## Usage

This input has a built in label (defined by using the 'name attribute'). It is intended to work with values within a parent state. Use the onChange attribute to define a function to update the parent state, which can also be a sanitizing function. The valid attribute takes a boolean which will assign error classes 'stuff-slide-input-error' and 'stuff-slide-input-label-error' which can be styled any which way to indicate an error. The bar attribute is disabled by default, but when passed an empty object or a CSS object a bottom bar will appear and can be styled via the CSS object.

It also supports the the following standard attributes:

	* autoComplete			
	* autoFocus				
	* disabled		
	* id
	* max
	* maxLength
	* min
	* minLength
	* name
	* required (adds a red indicator, can be styled via the stuff-slide-input-required class)
	* readOnly

```jsx
import React from 'react'

import SlideInput from 'stuff-to-click'

class Example extends Component {
  render() {
    return <SlideInput value={state.value} onChange={doThis} valid="true"/>
  }
}
```

## License

MIT © [olivicmic](https://github.com/olivicmic)

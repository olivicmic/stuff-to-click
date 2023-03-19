import React from 'react';
import { TestCoreSlideshow } from '..';
import { useSlideshow } from '../hooks';

const n = () => {};

export default function Slideshow({ at, debug, onChange = n, name, slides = [], ...rest }) {
	return <TestCoreSlideshow {...{ pagination: useSlideshow({ at, count: slides.length, debug, onChange, name}), slides, ...rest }} />
};
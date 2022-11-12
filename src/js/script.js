//@ts-check
'use strict';

import { validationError } from './utils/errors.js';
import { changeClassName, setLabel, handleClick } from './utils/dom.js';

// global variables
const inputs = document.querySelectorAll('.toggle__switch input');
const labels = document.querySelectorAll('.toggle__switch label');
const body = document.body;

// validate the querySelectors return values
if (inputs.length === 0)
  throw new validationError('NodeListOf<HTMLInputElement> is empty');
if (labels.length === 0)
  throw new validationError('NodeListOf<HTMLLabelElement> is empty');
if (body instanceof HTMLBodyElement === false) {
  throw new validationError('body isn"t an instance of the HTMLBodyElement');
}

// SET THEME ON PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme !== null) {
    changeClassName(body, theme);

    labels.forEach((label) => {
      if (label instanceof HTMLLabelElement) {
        setLabel(label, theme, 'hidden');
      }
    });
  }
});

// TOGGLE THEME ON CLICK
inputs.forEach((input) => {
  input.addEventListener('click', handleClick.bind(input, body, labels));
});

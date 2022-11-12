//@ts-check
'use strict';

import { validationError } from './utils/errors.js';
import { changeClassName, storeTheme, setLabel } from './utils/dom.js';

// global variables
const inputs = document.querySelectorAll('.toggle__switch input');
const labels = document.querySelectorAll('.toggle__switch label');
const body = document.body;

// validate the querySelectors return values
if (inputs.length === 0)
  throw new validationError('NodeListOf<HTMLInputElement> is empty');
if (labels.length === 0)
  throw new validationError('NodeListOf<HTMLLabelElement> is empty');

// TOGGLE THEME ON CLICK
/**
 * A function for handling toggling the theme onClick()
 * @param {HTMLBodyElement} body - The body element of the html document
 * @param {NodeListOf<HTMLLabelElement>} labels - The nodeListOf<HTMLLabelElements> which wraps around the radio inputs used for controlling the theme
 * @returns {void}
 */
function handleClick(body, labels) {
  this.addEventListener('click', () => {
    changeClassName(body, this.id);
    storeTheme(this.id);

    labels.forEach((label) => {
      if (label instanceof HTMLLabelElement) {
        setLabel(label, this.id, 'hidden');
      }
    });
  });
}

inputs.forEach((input) => {
  input.addEventListener('click', handleClick.bind(input, body, labels));
});

// inputs.forEach((input) => {
//   input.addEventListener('click', () => {
//     changeClassName(body, input.id);
//     storeTheme(input.id);

//     labels.forEach((label) => {
//       if (label instanceof HTMLLabelElement) {
//         setLabel(label, input.id, 'hidden');
//       }
//     });
//   });
// });

// LOAD THEME ON PAGE LOAD
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

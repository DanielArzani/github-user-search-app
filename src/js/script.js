//@ts-check
'use strict';

import { validationError } from './utils/errors.js';
import { changeClassName, storeTheme, retrieveTheme } from './utils/dom.js';

// TOGGLE SWITCH ON CLICK

// global variables
const inputs = document.querySelectorAll('.toggle__switch input');
const labels = document.querySelectorAll('.toggle__switch label');
const toggleSwitchContainer = document.querySelector('.toggle__switch');
const body = document.body;

// validate the querySelectors return values
if (inputs.length === 0)
  throw new validationError('NodeListOf<HTMLInputElement> is empty');
if (labels.length === 0)
  throw new validationError('NodeListOf<HTMLLabelElement> is empty');
if (toggleSwitchContainer === null)
  throw new validationError('HTMLDivElement is empty');

// main code

inputs.forEach((input) => {
  input.addEventListener('click', () => {
    changeClassName(body, input.id);
    storeTheme(input.id);
    labels.forEach((label) => {
      if (label instanceof HTMLLabelElement) {
        if (label.getAttribute('for') === input.id) {
          label.dataset.hidden = 'true';
        } else {
          label.dataset.hidden = 'false';
        }
      }
    });
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme !== null) changeClassName(body, theme);

  labels.forEach((label) => {
    if (label instanceof HTMLLabelElement) {
      if (label.getAttribute('for') === theme) {
        label.dataset.hidden = 'true';
      } else {
        label.dataset.hidden = 'false';
      }
    }
  });
});

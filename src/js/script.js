//@ts-check

import { validationError } from './utils/errors.js';
import { changeClassName } from './utils/dom.js';

// TOGGLE SWITCH ON CLICK

const inputs = document.querySelectorAll('.toggle__switch input');
const labels = document.querySelectorAll('.toggle__switch label');
const body = document.body;

// validate querySelectorAll's return value
if (inputs.length === 0)
  throw new validationError('NodeListOf<HTMLInputElement> is empty');
if (labels.length === 0)
  throw new validationError('NodeListOf<HTMLLabelElement> is empty');

// loop through both inputs and switch them on click
inputs.forEach((input) => {
  input.addEventListener('click', () => {
    const otherLabel =
      input.parentElement?.parentElement?.querySelector('.sr-only');
    otherLabel?.classList.remove('sr-only');
    input.parentElement?.classList.add('sr-only');

    // change className on body in order to work for firefox
    const inputId = input.getAttribute('id');
    if (inputId !== null) changeClassName(body, inputId);
  });
});

// STORE COLOUR PREFERENCE IN LOCAL STORAGE

//@ts-check
import { validationError } from './errors.js';

/**
 * Change the className of html element to the given string
 * @param {Element} element - The element who's class name should be changed
 * @param {string} newClassName - The new class name of the element
 * @returns {void} void
 */
export function changeClassName(element, newClassName) {
  if (element instanceof Element && typeof newClassName === 'string')
    element.className = newClassName;
  else
    throw new validationError(
      "Either an argument that wasn't an HTMLElement was passed in or a string wasn't passed in"
    );
}

/**
 * Stores a string to localStorage api
 * @param {string} theme - A string that should match a colour theme
 * @returns {void} void
 */
export function storeTheme(theme) {
  localStorage.setItem('theme', theme);
}

/**
 * A function that will take a HTMLLabelElement and change or create a data attribute on it depending on whether its for attribute matches the matcher param
 * @param {HTMLLabelElement} labelEl - An HTMLLabelElement
 * @param {string} matcher - A string to match against the label elements for attribute
 * @param {string} dataAttr - The desired data attribute to create or change
 * @returns {void}
 */
export function setLabel(labelEl, matcher, dataAttr) {
  if (labelEl.getAttribute('for') === matcher) {
    labelEl.dataset[dataAttr] = 'true';
  } else {
    labelEl.dataset[dataAttr] = 'false';
  }
}

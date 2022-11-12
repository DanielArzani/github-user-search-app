//@ts-check
import { validationError } from './errors.js';

/**
 * Change the className of html element to the given string
 * @param {Element} element - The element who's class name should be changed
 * @param {string} newClassName - The new class name of the element
 * @returns {void}
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
 * @returns {void}
 */
export function storeTheme(theme) {
  localStorage.setItem('theme', theme);
}

/**
 * A function that will take a HTMLLabelElement and change or create a data attribute on it and set it to true or false depending on whether its for attribute matches the matcher param
 * @param {HTMLLabelElement} labelEl - An HTMLLabelElement
 * @param {string} matcher - A string to match against the label elements "for" attribute, if they match then the data attr will be set to true, else false
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

/**
 * A function for handling toggling the theme onClick()
 * @param {HTMLBodyElement} body - The body element of the html document
 * @param {NodeListOf<HTMLLabelElement>} labels - The nodeListOf<HTMLLabelElements> which wraps around the radio inputs used for controlling the theme
 * @returns {void}
 */
export function handleClick(body, labels) {
  changeClassName(body, this.id);
  storeTheme(this.id);

  labels.forEach((label) => {
    if (label instanceof HTMLLabelElement) {
      setLabel(label, this.id, 'hidden');
    } else
      throw new validationError(
        'One of the elements is not an instance of HTMLLabelElement'
      );
  });
}

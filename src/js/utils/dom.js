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
 * Retrieves a string from the localStorage api
 * @param {string} theme - Theme from localStorage to retrieve
 * @returns {String  | null} - Will either return a theme or null if it doesn't exist
 */
export function retrieveTheme(theme) {
  return localStorage.getItem(theme);
}

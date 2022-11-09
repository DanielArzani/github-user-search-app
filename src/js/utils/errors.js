//@ts-check

/**
 * @class
 * @classdesc Can be used to return a custom error message, should be used with the throw keyword
 * @example throw new validationError
 */
export class validationError {
  /** @param {string} message - The message to return on error */
  constructor(message = 'ERROR ERROR') {
    this.message = message;
  }
}

//@ts-check

/**
 * @class
 * @classdesc Can be used to return a custom error message, should be used with the throw keyword. Contains a default error message if one isn't passed in
 * @example throw new validationError
 */
export class validationError {
  /** @param {string} message - The message to return on error */
  constructor(message = 'ERROR ERROR') {
    this.message = message;
  }
}

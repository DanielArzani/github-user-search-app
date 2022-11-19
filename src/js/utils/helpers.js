//@ts-check

/**
 * Converts ISO time format to a custom time format
 * @example convertTimeFormat('2012-05-29T07:46:02Z') returns 29 May 2012
 * @param {string} time - A date string that follows the ISO format
 * @returns {string} A custom formatted string
 */
export function convertTimeFormat(time) {
  console.log(time);
  const newDateFormat = new Date(time);
  const cleanDateFormat = newDateFormat.toUTCString();

  const cutString = cleanDateFormat.slice(4, 16);

  return cutString;
}

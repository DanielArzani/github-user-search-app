//@ts-check

/**
 * extracts a single key from a form
 * @param {HTMLFormElement} form - An instance of an HTMLFormElement
 * @param {string} formKey - The key of the associated value of the formData object
 * @returns {string | null}
 */
export function extractFormData(form, formKey) {
  const formData = new FormData(form);
  const searchInput = formData.get(formKey);
  if (searchInput != null) {
    return searchInput.toString();
  } else return null;
}

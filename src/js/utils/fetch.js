//@ts-check

// @ts-ignore

/**
 * Will make a fetch request to the github api
 * @param {string} name - GitHub username
 * @returns {Promise} The fulfilled promise
 */
export async function getUser(name) {
  try {
    const response = await fetch(`https://api.github.com/users/${name}`);

    const data = await response.json();

    if (data.message === 'Not Found') {
      return undefined;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

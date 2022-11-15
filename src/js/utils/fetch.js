//@ts-check

// @ts-ignore
// import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';
// TODO: Remove personal access token and add this method to notes

/**
 * Will make a fetch request to the github api
 * @param {string} name - GitHub username
 * @returns {Promise} The fulfilled promise
 */
export async function getUser(name) {
  try {
    // const response = await octokit.request(`GET /${name}`, {});
    // return response;

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

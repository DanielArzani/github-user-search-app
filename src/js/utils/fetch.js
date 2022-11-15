//@ts-check

// @ts-ignore
import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';

/**
 * Will make a fetch request to the github api
 * @param {string} name - GitHub username
 * @returns {Promise} The fulfilled promise
 */
export async function getUser(name) {
  const octokit = new Octokit({
    auth: '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',
    baseUrl: 'https://api.github.com/users',
  });

  try {
    const response = await octokit.request(`GET /${name}`, {});

    return response;
  } catch (error) {
    console.log(error);
  }
}

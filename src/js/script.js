//@ts-check
'use strict';

// dependencies

import { validationError } from './utils/errors.js';
import { changeClassName, setLabel, handleClick } from './utils/dom.js';
import { getUser } from './utils/fetch.js';
import { extractFormData } from './utils/form.js';

// global variables
const searchForm = document.querySelector('.search-form');
const inputs = document.querySelectorAll('.toggle__switch input');
const labels = document.querySelectorAll('.toggle__switch label');
const body = document.body;

// SET THEME ON PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme !== null) {
    changeClassName(body, theme);

    labels.forEach((label) => {
      if (label instanceof HTMLLabelElement) {
        setLabel(label, theme, 'hidden');
      }
    });
  }
});

// TOGGLE THEME ON CLICK
inputs.forEach((input) => {
  input.addEventListener('click', handleClick.bind(input, body, labels));
});

// GET GITHUB USER INFO
// avatar_url ,created_at, name, location, public_repos, followers, following, html_url, twitter_username, blog, bio, company

searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (searchForm instanceof HTMLFormElement) {
    const userSearchParam = extractFormData(searchForm, 'search');
    if (userSearchParam == null) return null;

    getUser(userSearchParam).then((data) => {
      console.log(data);
      const errorMsg = document.querySelector('.search-form__error');

      if (data != null) {
        // hide error message
        if (errorMsg instanceof HTMLSpanElement) {
          errorMsg.dataset.content = '';
        }

        // UN-COMMENT FOR DEVELOPMENT
        // const { data: userData } = data;

        // UN-COMMENT OUT FOR PRODUCTION
        const userData = data;

        // render data on screen
      }

      if (data == undefined) {
        if (errorMsg instanceof HTMLSpanElement) {
          errorMsg.dataset.content = 'No Results';
        }
      }
    });
  }
});

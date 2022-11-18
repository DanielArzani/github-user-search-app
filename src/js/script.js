//@ts-check
'use strict';

// dependencies
import { changeClassName, setLabel, handleClick } from './utils/dom.js';
import { getUser } from './utils/fetch.js';
import { extractFormData } from './utils/form.js';
import { UI } from './utils/render.js';

// global variables
const searchForm = document.querySelector('.search-form');
const inputs = document.querySelectorAll('.toggle__switch input');
const labels = document.querySelectorAll('.toggle__switch label');
const body = document.body;

// elements of the user card
const userImage = document.querySelector('.user__image img');
const userName = document.querySelector('.user__name');
const userLink = document.querySelector('.user__link');
const userLinkSpan = document.querySelector('[data-user-link]');
const dateJoined = document.querySelector('.user__date-joined');
const userBio = document.querySelector('.user__bio');
const userRepos = document.querySelector('[data-repos]');
const userFollowers = document.querySelector('[data-followers]');
const userFollowing = document.querySelector('[data-following]');
const userLocation = document.querySelector('[data-location]');
const userLocationLink = document.querySelector('.link--location');
const userTwitter = document.querySelector('[data-twitter]');
const userTwitterLink = document.querySelector('.link--twitter');
const userWebsite = document.querySelector('[data-website]');
const userWebsiteLink = document.querySelector('.link--website');
const userCompany = document.querySelector('[data-company]');
const userCompanyLink = document.querySelector('.link--company');

const elementsList = {
  userImage,
  userName,
  userLink,
  userLinkSpan,
  dateJoined,
  userBio,
  userRepos,
  userFollowers,
  userFollowing,
  userLocation,
  userLocationLink,
  userTwitter,
  userTwitterLink,
  userWebsite,
  userWebsiteLink,
  userCompany,
  userCompanyLink,
};

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
searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (searchForm instanceof HTMLFormElement) {
    const userSearchParam = extractFormData(searchForm, 'search');
    if (userSearchParam == null) return null;

    getUser(userSearchParam).then((data) => {
      const errorMsg = document.querySelector('.search-form__error');

      if (data != null) {
        // hide error message
        if (errorMsg instanceof HTMLSpanElement) {
          errorMsg.dataset.content = '';
        }

        // render data on screen
        const userInterface = new UI(data, elementsList);
        userInterface.render();
      } else if (data == undefined) {
        // show error message
        if (errorMsg instanceof HTMLSpanElement) {
          errorMsg.dataset.content = 'No Results';
        }
      }
    });
  }
});

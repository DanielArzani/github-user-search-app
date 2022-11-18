//@ts-check

/**
 * @class For updating data and states rendered on screen
 */
export class UI {
  /**
   * Pass in all elements that can be updated and the new values for them
   * @example const ui = new UI({location:"Toronto"}, {headerElement})
   * @param {Object} data - The user object returned from the github api
   * @param {Object} elementsList - An object of html elements
   */
  constructor(data, elementsList) {
    this.data = data;
    this.elementsList = elementsList;
  }

  /**
   * Makes changes to all DOM elements
   */
  render() {
    // enable links on form submit
    const shouldEnable = [
      this.elementsList['userLocationLink'],
      this.elementsList['userTwitterLink'],
      this.elementsList['userWebsiteLink'],
      this.elementsList['userCompanyLink'],
    ];
    this.enableLinksOnNewSearch(shouldEnable);

    // update the src attribute of all images
    const imageProps = [this.data.avatar_url];
    const images = [this.elementsList['userImage']];
    this.updateImages(images, imageProps);

    // update the text content of all elements except the one that holds the user bio
    const textProps = [
      this.data.name,
      this.data.login,
      this.data.created_at,
      this.data.public_repos,
      this.data.followers,
      this.data.following,
      this.data.location,
      this.data.blog,
      this.data.twitter_username,
      this.data.company,
    ];
    const textElements = [
      this.elementsList['userName'],
      this.elementsList['userLink'],
      this.elementsList['dateJoined'],
      this.elementsList['userRepos'],
      this.elementsList['userFollowers'],
      this.elementsList['userFollowing'],
      this.elementsList['userLocation'],
      this.elementsList['userWebsite'],
      this.elementsList['userTwitter'],
      this.elementsList['userCompany'],
    ];
    this.updateTextContent(textElements, textProps);

    // change the text content of the element which holds the userBio
    this.updateUserBio(this.elementsList['userBio'], this.data.bio);

    // update the href attribute of all elements. Disable links that have null values and add not available as their text content
    const linkProps = [
      this.data.html_url,
      this.data.location,
      this.data.twitter_username,
      this.data.blog,
      this.data.company,
    ];
    const linkElements = [
      this.elementsList['userLink'],
      this.elementsList['userLocationLink'],
      this.elementsList['userTwitterLink'],
      this.elementsList['userWebsiteLink'],
      this.elementsList['userCompanyLink'],
    ];
    this.updateLinks(linkElements, linkProps);
  }

  /**
   * Changes the src attribute of an array of elements. Note that order of each element should match the string that will be its new value
   * @param {Element[]} imageElements
   * @param {Array} values
   */
  updateImages(imageElements, values) {
    imageElements.forEach((image, index) => {
      image.setAttribute('src', values[index]);
    });
  }

  /**
   * Changes the textContent of an array of elements. Note that order of each element should match the string that will be its new value
   * @param {Element[]} textElements
   * @param {Array} values
   */
  updateTextContent(textElements, values) {
    textElements.forEach((textElement, index) => {
      textElement.textContent = values[index];
    });
  }

  /**
   * Changes the textContent of the element which holds the user bio
   * @param {Element} element - The element which holds the user bio
   * @param {string | null} value - The string which will the bio should have. If null then "This profile has no bio" is used
   */
  updateUserBio(element, value) {
    if (value == null || !value) {
      element.textContent = 'This profile has no bio';
    } else {
      element.textContent = value;
    }
  }

  /**
   * Changes the href value of an array of elements. Note that order of each element should match the string that will be its new value
   * @param {Element[]} linkElements - An array of anchor elements
   * @param {string[]} values - An array of href values
   */
  updateLinks(linkElements, values) {
    linkElements.forEach((link, index) => {
      if (values[index] == null || !values[index]) {
        this.disableLink(linkElements[index]);
      } else {
        link.setAttribute('href', values[index]);
      }
    });
  }

  /**
   * Will disable the parent element of the passed in anchor tag which should be a list item in order for all of that list items children to also be disabled
   * @param {Element} linkElement - An anchor tag
   */
  disableLink(linkElement) {
    if (linkElement.parentElement != null) {
      linkElement.parentElement.classList.add('not-available');
    }
    const span = linkElement.querySelector('span');
    if (span != null) {
      span.textContent = 'Not Available';
    }
  }

  /**
   * Removes the not available class from an array of elements
   * @param {Element[]} links - An array of links who's parent elements will be targeted
   */
  enableLinksOnNewSearch(links) {
    links.forEach((link) => {
      const listItem = link.parentElement;
      if (listItem != null) {
        listItem.classList.remove('not-available');
      }
    });
  }
}

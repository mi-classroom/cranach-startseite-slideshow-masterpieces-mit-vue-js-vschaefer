/* Menu
############################################################################ */

const initMenu = () => {

  const menuOpenButton = document.querySelector('[data-js-main-menu-open]');
  const menuCloseButton = document.querySelector('[data-js-main-menu-close]');
  const mainMenu = document.querySelector('[data-js-main-menu-target]');

  menuOpenButton.addEventListener('click', () => {
    mainMenu.classList.add('is-active');
  });

  menuCloseButton.addEventListener('click', () => {
    mainMenu.classList.remove('is-active');
  });
}

/* On Page Navigation
############################################################################ */

const initPageNavigation = () => {

  const sectionHeadlines = document.querySelectorAll("[data-js-page-content] > section > h2");
  const pageNavigationMenu = document.querySelector('[data-js-page-navigation-menu]');

  if (pageNavigationMenu) {
    sectionHeadlines.forEach((headline) => {

      // const navigationItem = document.createElement('li');
      // const navigationLink = document.createElement('a');
      const slug = createSlug(headline.innerText);

      // navigationLink.setAttribute('href', `#${slug}`);
      // headline.parentElement.setAttribute('id', slug); 
      // navigationLink.innerText = headline.innerText;
      // navigationItem.appendChild(navigationLink);
      // pageNavigationMenu.appendChild(navigationItem);

      headline.parentElement.setAttribute('id', slug);

      pageNavigationMenu.innerHTML += `
      <li>
        <a href="#${slug}" class="page-navigation__link">${headline.innerText}</a>
      </li>
    `;

    });

  }
}

/* Please create a function that creates a slug from a string. Please without double dashes. Keep german umlauts
############################################################################ */

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[äöüß]/g, (match) => {
      switch (match) {
        case 'ä': return 'ae';
        case 'ö': return 'oe';
        case 'ü': return 'ue';
        case 'ß': return 'ss';
      }
    })
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with a single dash
    .replace(/^-|-$/g, '') // Remove leading and trailing dashes
    .replace(/--+/g, '-'); // Replace multiple dashes with a single dash
}



/* Main
############################################################################ */

document.addEventListener('DOMContentLoaded', () => {

  initMenu();
  initPageNavigation();

});
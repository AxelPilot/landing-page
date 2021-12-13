'use strict';
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

const ACTIVE_CLASS_NAME = 'your-active-class';

const sections = document.querySelectorAll('section');
let ActiveIndex = 0;

const goToTopButton = document.getElementById('gototop');

/**
 * End Global Variables
 * Begin Main Functions
 * 
 */

/**
 * Set CSS class active state when the section element is in the viewport.
 * 
 */

function setVisibleSectionActive(sections, navItems) {
    // Loops through sections to find out which section is currently visible in the viewport.
    for (let i = 0; i < sections.length; i++) {
        // Retrieves section's dimensions and position relative to the viewport.
        const rect = sections[i].getBoundingClientRect();
        
        // Checks if section is visible in the viewport.
        if (rect.top + rect.height > window.innerHeight * (2/3) && rect.top < window.innerHeight * (2/3)) {

            // Adds class 'your-active-class' to the section currently visible in the viewport,
            // and removes class 'your-active-class' from the section previously visible in the viewport.
            if (!sections[i].classList.contains(ACTIVE_CLASS_NAME)) {
                sections[i].classList.add(ACTIVE_CLASS_NAME);
                sections[ActiveIndex].classList.remove(ACTIVE_CLASS_NAME);
            }
            // Adds class 'your-active-class' to the navigation menu item corresponding with the 
            // currently visible section, and removes class 'your-active-class' from the 
            // navigation menu item corresponding with the previously active section.
            if (!navItems[i].classList.contains(ACTIVE_CLASS_NAME)) {
                navItems[i].classList.add(ACTIVE_CLASS_NAME);
                navItems[ActiveIndex].classList.remove(ACTIVE_CLASS_NAME);
            }
            // Updates ActiveIndex to be equal to the index of the section currently visible in the viewport.
            ActiveIndex = i;
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

/**
 * Scrolls smoothly to the top of the page when the Go-To-Top button 
 * in the lower right hand corner of the window is clicked.
 */

goToTopButton.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

/**
 * Builds the navigation menu.
 * 
 */

const fragment = document.createDocumentFragment();

// Loops through all section tags and retrieves the relevant data
// in order to dynamically build the navigation menu.
sections.forEach((section) => {
    const section_id = section.getAttribute('id');
    const navItem = section.getAttribute('data-nav');
    const newElement = document.createElement('li');
    newElement.innerHTML = `<a href="#${section_id}" class="menu__link">${navItem}</a>`;
    
    // Scrolls to the corresponding section when a menu item is clicked.
    newElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        section.scrollIntoView({behavior: 'smooth'});
    });
    fragment.appendChild(newElement);
});
document.getElementById('navbar__list').appendChild(fragment);

/**
 * End of navigation menu.
 * 
 */

// Retrieves all anchor items in the navigation menu.
const navItems = document.querySelectorAll('#navbar__list li a');

// Adds class 'your-active-class' to the first navigation menu item on page load.
if (!navItems[ActiveIndex].classList.contains(ACTIVE_CLASS_NAME)) {
    navItems[ActiveIndex].classList.add(ACTIVE_CLASS_NAME);
}

document.addEventListener('scroll', () => {
    /**
     * Adds class 'your-active-class' to the section that is currently visible in the viewport,
     * and adds class 'your-active-class' to the corresponding navigation menu item.
     */
    setTimeout(setVisibleSectionActive(sections, navItems), 0);

    /**
     * Determines whether the Go-To-Top button shall be visible or not,
     * based on the window's currrent scroll position.
     */
    setTimeout(() => {
        goToTopButton.style.display = document.documentElement.scrollTop > 200 || document.body.scrollTop > 200 ? 'block' : 'none';
    }, 0);
});

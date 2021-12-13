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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 * 
 */

const ACTIVE_CLASS_NAME = 'your-active-class';
const sections = document.querySelectorAll('section');
let ActiveIndex = 0;
let goToTopButtonIsVisible = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */


/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */


/**
 * End Main Functions
 * Begin Events
 * 
 */

/**
 * Build the navigation menu.
 * 
 * Creates a document fragment.
 * Loops through all section tags, using a forEach loop.
 * Retrieves the section's id attribute (to be included in the hyperlink's href attribute).
 * Retrieves the section's data-nav attribute.
 * Creates a new list (<li>) element.
 * Adds a hyperlink (a href) to the list (<li>) element using the element's innerHTML property.
 * Scrolls to section on link click.
 * Prevents the event's default action from happening.
 * Smoothly scrolls to the section corresponding with the menu item clicked.
 * Appends the new list (<li>) element as a child to the document fragment.
 * Appends the document fragment, containing the navigation menu's <li> items, as a child to the menu's <ul> element.
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
    
    // Scroll to section on link click
    newElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        section.scrollIntoView({behavior: 'smooth'});
    });
    fragment.appendChild(newElement);
});
document.getElementById('navbar__list').appendChild(fragment);

/**
 * Add class 'your-active-class' to section and corresponding 
 * navigation menu item when the section is visible in the viewport.
 * 
 * Retrieves all anchor items in the navigation menu.
 * Sets the first navigation menu item to be active initially.
 * Listens for scroll event.
 * When scroll event is detected:
 * Loops through sections to find out which section is currently visible in the viewport.
 * Retrieves section's dimensions and position relative to the viewport.
 * Checks if section is visible in the viewport.
 * Adds class 'your-active-class' to the section currently visible in the viewport.
 * Removes class 'your-active-class' from the section previously visible in the viewport.
 * Adds class 'your-active-class' to the navigation menu item corresponding with the currently visible section.
 * Removes class 'your-active-class' from the navigation menu item corresponding with the previously active section.
 * Updates ActiveIndex to be equal to the index of the section currently visible in the viewport.
 * 
 */

// Retrieves all anchor items in the navigation menu.
const navItems = document.querySelectorAll('#navbar__list li a');

// Adds class 'your-active-class' to the first navigation menu item initially.
if (!navItems[ActiveIndex].classList.contains(ACTIVE_CLASS_NAME)) {
    navItems[ActiveIndex].classList.add(ACTIVE_CLASS_NAME);
}

document.addEventListener('scroll', () => {
    setTimeout(() => {
        // Loops through sections to find out which section is currently visible in the viewport.
        for (let i = 0; i < sections.length; i++) {
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
    }, 0);
});

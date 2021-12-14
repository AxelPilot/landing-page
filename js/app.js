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

// A NodeList with all sections.
const sections = document.querySelectorAll('section'); 

// Index of the section currently in an active state.
let ActiveIndex = 0;

// An array with boolean values, corresponding with the
// collapsed/uncollapsed state of each section.
let isCollapsed = [];

// Element containing the Go-To-Top button in the lower
// right hand corner of the window.
const goToTopButton = document.getElementById('gototop');

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * Toggle between an upward and downward facing chevron.
 * 
 * @param {string} section_id Id of the section to be collapsed or uncollapsed.
 * 
 */

 function toggleCollapseIcon(section_id) {
    let collapseIcon = document.querySelector(`#${section_id} h2 .fas`);

    if (collapseIcon.classList.contains('fa-angle-up')) {
        collapseIcon.classList.remove('fa-angle-up');
        collapseIcon.classList.add('fa-angle-down');
    } else if (collapseIcon.classList.contains('fa-angle-down')) {
        collapseIcon.classList.remove('fa-angle-down');
        collapseIcon.classList.add('fa-angle-up');
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

/**
 * Build the navigation menu.
 * 
 * @param {NodeList} sections A NodeList with all sections.
 */

function buildMenu(sections) {
    const fragment = document.createDocumentFragment();

    // Loop through all section tags and retrieve the relevant data
    // in order to dynamically build the navigation menu.
    sections.forEach((section) => {
        const section_id = section.getAttribute('id');
        const navItem = section.getAttribute('data-nav');
        const newElement = document.createElement('li');
        newElement.innerHTML = `<a href="#${section_id}" class="menu__link">${navItem}</a>`;
        
        // Scroll to the corresponding section when a menu item is clicked.
        newElement.addEventListener('click', (evt) => {
            evt.preventDefault();
            section.scrollIntoView({behavior: 'smooth'});
        });
        fragment.appendChild(newElement);
    });
    document.getElementById('navbar__list').appendChild(fragment);
}

 /**
 * Collapse and uncollapse sections when the chevrons in the section headings are clicked.
 * 
 * @param {NodeList} sections A NodeList with all sections.
 */

function collapseSection(sections) {
    sections.forEach((section, index) => {
        isCollapsed[index] = false;
        const section_id = section.getAttribute('id');
    
        document.querySelector(`#${section_id} h2 .fas`).addEventListener('click', () => {
            toggleCollapseIcon(section_id);
            document.querySelector(`#${section_id} .landing__container .collapsible__container`).style.display = isCollapsed[index] ? 'block' : 'none';
            isCollapsed[index] = isCollapsed[index] ? false : true;
        });
    });    
}

/**
 * Set CSS class active state when the section element is in the viewport.
 * 
 * @param {NodeList} sections A NodeList with all sections.
 * @param {NodeList} navItems A NodeList with all menu items.
 * @param {number} fraction A value between 0 and 1 determining at which scroll position the active state should change.
 */

function setVisibleSectionActive(sections, navItems, fraction) {
    // Loop through sections to find out which section is currently visible in the viewport.
    for (let i = 0; i < sections.length; i++) {
        // Retrieve section's dimensions and position relative to the viewport.
        const rect = sections[i].getBoundingClientRect();
        
        // Check if section is visible in the viewport.
        if (rect.top + rect.height > window.innerHeight * fraction && rect.top < window.innerHeight * fraction) {

            // Add an active state to the section currently visible in the viewport,
            // and remove the active state from the section previously visible in the viewport.
            if (!sections[i].classList.contains(ACTIVE_CLASS_NAME)) {
                sections[i].classList.add(ACTIVE_CLASS_NAME);
                sections[ActiveIndex].classList.remove(ACTIVE_CLASS_NAME);
            }
            // Add an active state to the navigation menu item corresponding with the 
            // currently visible section, and remove the active state from the 
            // navigation menu item corresponding with the previously active section.
            if (!navItems[i].classList.contains(ACTIVE_CLASS_NAME)) {
                navItems[i].classList.add(ACTIVE_CLASS_NAME);
                navItems[ActiveIndex].classList.remove(ACTIVE_CLASS_NAME);
            }
            // Update ActiveIndex to be equal to the index of the section currently visible in the viewport.
            ActiveIndex = i;
        }
    }
}

/**
 * Toggle the Go-To-Top button in the lower right
 * hand corner of the window on and off.
 * 
 * @param {number} offset Scroll position offset from the top of the window.
 */

function toggleGoToTopButton(offset) {
    goToTopButton.style.display = document.documentElement.scrollTop > offset || document.body.scrollTop > offset ? 'block' : 'none';
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

/**
 * Build the navigation menu,
 */

 buildMenu(sections);

 /**
 * Collapse and uncollapse sections when the chevrons in the section headings are clicked.
 * 
 */

 collapseSection(sections);

/**
 * Scroll smoothly to the top of the page when the Go-To-Top button 
 * in the lower right hand corner of the window is clicked.
 */

goToTopButton.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Retrieve all anchor items in the navigation menu as a NodeList.
const navItems = document.querySelectorAll('#navbar__list li a');

// Add an active state to the first navigation menu item on page load.
if (!navItems[ActiveIndex].classList.contains(ACTIVE_CLASS_NAME)) {
    navItems[ActiveIndex].classList.add(ACTIVE_CLASS_NAME);
}

document.addEventListener('scroll', () => {
    /**
     * Add an active state to the section that is currently visible in the viewport,
     * and add an active state to the corresponding navigation menu item.
     */
    setTimeout(setVisibleSectionActive(sections, navItems, 1/4), 0);

    /**
     * Determine whether the Go-To-Top button shall be visible or not,
     * based on the window's currrent scroll position.
     */
    setTimeout(toggleGoToTopButton(200), 0);
});

/* global variables */
const pageSections = document.getElementsByTagName('section');
const unorderedList = document.getElementById('navbar__list');
const unorderedList_array = document.getElementById('navbar__list').childNodes;
const threeBars = document.querySelector('.threeBars');
const pageHeader = document.querySelector('.page__header');

// get our sections pageYOffset values here
const pageSectionsOffsetTopVAL = [];
let activeSection;
let activeSection_index;


/* creating the navigation bar dynamically based on page sections */
const navBar = () => {
    for (let section of pageSections) {

        let listItem = section.attributes['data-nav'].nodeValue;
        unorderedList.innerHTML += `<li><a href="" class="menu__link">${listItem}</a></li>`;
        // get our sections pageYOffset values 
        pageSectionsOffsetTopVAL.push(section.offsetTop);
    }
    // set our first li item active
    unorderedList.childNodes[0].classList.add('activeItem');
}
navBar();

/*
active state for buttons in navBar 
and making the circles animate for the active page section
*/

// track the window YOffset to detect the active section 

window.addEventListener('scroll', (e) => {

    // check if we reached the first section 
    if (pageSectionsOffsetTopVAL && window.pageYOffset >= pageSectionsOffsetTopVAL[0]) {

        // loop through just our sections pageYOffset values to detect the active section
        pageSectionsOffsetTopVAL.map((value, index) => {
            // 150 to avoid changing active class when we just hit the last few px of the section
            if (value <= window.pageYOffset + 150) {

                // define our active section to add our active class to it
                activeSection = pageSections[index];
                activeSection_index = index;
            }
        })

        // check if our active class is already in our active ssection classList
        if (activeSection.classList.contains("your-active-class")) {
            return
        } else {
            // remove our active class from all sections 
            for (let section of pageSections) {
                section.classList.remove("your-active-class")
            }
            // remove our active class from all nav li 
            for (let listItem of unorderedList_array) {
                listItem.classList.remove("activeItem")
            }
            // add our active class to only our active section
            activeSection.classList.add("your-active-class")
                // add our active class to only our active nav li
            unorderedList_array[activeSection_index].classList.add("activeItem")
        }
    }
});



/* making the navigation behavior as scrolling instead of jumping */
unorderedList.addEventListener('click', (e) => {
    e.preventDefault();
    for (let section of pageSections) {
        if (e.target.outerText == section.attributes['data-nav'].nodeValue) {
            window.scrollTo({
                top: section.offsetTop,
                left: section.offsetLeft,
                behavior: 'smooth'
            })
        }
    }
});

// show side menu 
threeBars.addEventListener('click', (e) => {
    pageHeader.classList.toggle("slide-out");
});

/* scroll to top behavior button */
function scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
};
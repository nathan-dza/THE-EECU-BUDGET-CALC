// @ts-check
const page_view = /** @type {HTMLDivElement} */ (
    document.querySelector('.current-page')
);
/** @type {number} */
let current_page_number = /** @type {any} */ (undefined);
const templates = [...document.querySelectorAll('template')];
const continue_button = /** @type {HTMLButtonElement} */ (
    document.querySelector('#cont')
);
const back_button = /** @type {HTMLButtonElement} */ (
    document.querySelector('#back')
);
const [...nav_progress] = document.querySelectorAll('nav > hr');

// //Next and back buttons are still a bit finicky, but they work
// function next_page() {
//     if (current_page_number >= templates.length - 1) return;
//     const template = templates[current_page_number++];
//     const fragment = template.content.cloneNode(true);
//     page_view.replaceChildren(...fragment.childNodes);
//     page_view.classList.remove(templates[current_page_number - 2]?.className);
//     page_view.id = template.className;
//     nav_progress[current_page_number - 2]?.classList.add('fulfilled');
//     nav_progress[current_page_number - 2]?.previousElementSibling?.classList.add('fulfilled');
// }

// function back_page() {
//     if (current_page_number === 0) return;
//     const template = templates[--current_page_number];
//     const fragment = template.content.cloneNode(true);
//     page_view.replaceChildren(...fragment.childNodes);
//     page_view.classList.remove(templates[current_page_number + 1]?.className);
//     page_view.id = template.className;
//     nav_progress[current_page_number]?.classList.remove('fulfilled');
//     nav_progress[current_page_number]?.previousElementSibling?.classList.remove('fulfilled');
// }

/**
 * @param {number} page
 */
function navigate(page) {
    if (page === current_page_number || page < 0 || page > templates.length - 1) {
        return;
    }
    // const prev_page = current_page_number;
    // const prev = /** @type {HTMLTemplateElement} */ (document.querySelector(`template.${page_view.id}`));
    const template = templates[current_page_number = page];
    const fragment = template.content.cloneNode(true);
    page_view.replaceChildren(...fragment.childNodes);
    page_view.id = template.className;
    for (const elem of nav_progress) {
        elem.classList.remove('fulfilled');
        elem.previousElementSibling?.classList.remove('fulfilled');
    }
    
    for (let i = 0; i < page; i++) {
        nav_progress[i]?.classList.add('fulfilled');
        nav_progress[i]?.previousElementSibling?.classList.add('fulfilled');
    }
}

navigate(0);

continue_button.addEventListener('click', () => navigate(current_page_number + 1));
back_button.addEventListener('click', () => navigate(current_page_number - 1));

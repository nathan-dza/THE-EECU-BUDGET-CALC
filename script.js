import './navigation.js';


async function careerSelect() {
  const selectElement = document.getElementById('occu');
  const occupationSalaryMap = new Map();
  
  try {
    const response = await fetch('https://eecu-data-server.vercel.app/data');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const users = await response.json();

    users.forEach(user => {
      occupationSalaryMap.set(user["Occupation"], user["Salary"]);
      const option = new Option(user["Occupation"], user["Occupation"]);
      selectElement.add(option);
    });

    selectElement.addEventListener('change', () => {
      salary.textContent = occupationSalaryMap.get(selectElement.value) || '';
    });
  } catch (error) {
    console.error('Error populating user select:', error);
  }
}
careerSelect();

const view = document.querySelector('.current-page');

/** @type {Map<string, Category>} */
const categories = new Map();

class Category {
    /** @type {HTMLInputElement[]} */
    inputs = [];
    /** @type {Map<string, number>} */
    values = new Map();
    name = '';
    constructor(name) {
        this.name = name;
        this.inputs = [...view.querySelectorAll('input')];
        for (const input of this.inputs) {
            input.addEventListener('input', () => {
                this.values.set(
                    input.previousElementSibling.textContent,
                    Number(input.value)
                );
                input.value = Number(input.value).toFixed(2);
            });
            this.values.set(input.previousElementSibling.textContent, Number(input.value));
        }
    }
}

let last = view.id;
const observer = new MutationObserver(() => {
    if (last !== view.id) {
        if (categories.has(view.id)) {
            const category = categories.get(view.id);
            for (let i = 0; i < category.inputs.length; i++) {
                const prev_input = category.inputs[i];
                const input = view.querySelectorAll('input').item(i);
                input.value = prev_input.value;
            }
            categories.set(last = view.id, new Category(view.id));
        } else {
            categories.set(last = view.id, new Category(view.id));
        }
        console.log(categories);
    }
});

observer.observe(view, {
    subtree: true,
    childList: true
});

categories.set(view.id, new Category(last));

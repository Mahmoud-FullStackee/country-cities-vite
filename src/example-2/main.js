import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css"

//Data for countries and cities
const countryCityData = {
  EG: { name: "Egypt", flag: "eg", cities: ["Cairo", "Giza", "Alexandria"] },
  US: { name: "United States", flag: "us", cities: ["New York", "Los Angeles", "Chicago"] },
  IN: { name: "India", flag: "in", cities: ["Delhi", "Mumbai", "Bangalore"] },
  DE: { name: "Germany", flag: "de", cities: ["Berlin", "Munich", "Frankfurt"] },
};

// DOM Elements
const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");

// Create country options
const countryChoices = new Choices(countrySelect, {
  allowHTML: true, // Allow HTML to be displayed inside options
  callbackOnCreateTemplates: function () {
    return {
      item: (classNames, data) => {
        // Check for flag
        const flagIcon = data.customProperties?.flag
          ? `<img class="flag-icon" src="flags/${data.customProperties.flag}.png" alt="${data.label}" />`
          : ' '; // Make it empty if the image is not present

        // Create the element
        const container = document.createElement('div');
        container.className = `${classNames.item} ${data.highlighted ? classNames.highlightedState : ''}`;
        container.setAttribute('data-item', '');
        container.setAttribute('data-id', data.id);
        container.setAttribute('data-value', data.value);

        // Add content
        container.innerHTML = `${flagIcon} ${data.label}`;
        return container;
      },
      choice: (classNames, data) => {
        const flagIcon = data.customProperties?.flag
          ? `<img class="flag-icon" src="flags/${data.customProperties.flag}.png" alt="${data.label}" />`
          : '';

        const container = document.createElement('div');
        container.className = `${classNames.item} ${classNames.itemChoice}`;
        container.setAttribute('data-choice', '');
        container.setAttribute('data-id', data.id);
        container.setAttribute('data-value', data.value);
        container.setAttribute('role', data.groupId > 0 ? 'treeitem' : 'option');
        container.innerHTML = `${flagIcon} ${data.label}`;
        return container;
      },
    };
  },
});

// Fill in country options
Object.entries(countryCityData).forEach(([code, { name, flag }]) => {
  countryChoices.setChoices([
    {
      value: code,
      label: name,
      customProperties: { flag }, // Make sure flag exists
    },
  ]);
});

// Variable to store the city's Choices object
let cityChoices = new Choices(citySelect, {
  allowHTML: true,
});

// Handling country selection
countrySelect.addEventListener("change", () => {
  const selectedCode = countrySelect.value;
  const cities = countryCityData[selectedCode]?.cities || [];

  // Update city options
  citySelect.innerHTML = "";
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });

  // Destroy Previous initialization and reinitialization
  if (cityChoices) {
    cityChoices.destroy(); // Destroy current initialization
  }
  cityChoices = new Choices(citySelect, { allowHTML: true }); // Reinitialization
  citySelect.disabled = cities.length === 0; // Disable the list if there are no cities
});
// Sample data for countries and cities
const countryCityData = {
  EG: { name: "Egypt", flag: "eg", cities: ["Cairo", "Giza", "Alexandria"] },
  US: { name: "United States", flag: "us", cities: ["New York", "Los Angeles", "Chicago"] },
  IN: { name: "India", flag: "in", cities: ["Delhi", "Mumbai", "Bangalore"] },
  DE: { name: "Germany", flag: "de", cities: ["Berlin", "Munich", "Frankfurt"] },
};

// DOM Elements
const countrySelect = document.getElementById("country-select");
const selected = countrySelect.querySelector(".selected");
const options = countrySelect.querySelector(".options");
const citySelect = document.getElementById("city");

// Fill Country List
Object.entries(countryCityData).forEach(([code, { name, flag }]) => {
  const li = document.createElement("li");
  li.dataset.value = code;
  li.innerHTML = `<img src="flags/${flag}.png" /> ${name}`;
  options.appendChild(li);
});

// Show Options when clicked on list
selected.addEventListener("click", () => {
  options.style.display = options.style.display === "block" ? "none" : "block";
});

// Update City Select Box When Select Country
options.addEventListener("click", (event) => {
  const target = event.target.closest("li");
  if (!target) return;

  const selectedCountry = target.dataset.value;
  selected.textContent = target.textContent;
  options.style.display = "none";

  // Fill Cities List
  const cities = countryCityData[selectedCountry]?.cities || [];
  citySelect.disabled = cities.length === 0;
  citySelect.innerHTML = `<option value="" disabled selected>Select City</option>`;
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
});

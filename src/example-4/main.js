import $ from "jquery";
import select2 from "select2";
import "select2/dist/css/select2.min.css"; // Import Select2's CSS

select2($); // Force Select2 to work with jQuery

const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");

// Cities data (optional)
const countryCityData = {
  EG: { name: "Egypt", flag: "eg", cities: ["Cairo", "Giza", "Alexandria"] },
  US: { name: "United States", flag: "us", cities: ["New York", "Los Angeles", "Chicago"] },
  IN: { name: "India", flag: "in", cities: ["Delhi", "Mumbai", "Bangalore"] },
  DE: { name: "Germany", flag: "de", cities: ["Berlin", "Munich", "Frankfurt"] },
};

// Load countries from API
async function loadCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  const countryOptions = countries.map((country) => {
    const flag = country.flags.svg || country.flags.png; // Flag link

    const name = country.translations.ar?.common || country.name.common; // Country name
    return {
      id: country.cca2, // Country code
      text: `<img class="flag-icon" src="${flag}" style= "width: 20px; height: 15px; margin-right: 5px;" /> ${name}`,
    };
  });

  // Initialize Select2 with countries
  $("#country").select2({
    data: countryOptions,
    escapeMarkup: (markup) => markup, // Allow flags to be displayed as HTML
    placeholder: "Select Country",
  });
}

// When selecting the country
$("#country").on("change", function () {
  const selectedCode = $(this).val();
  const selectedCountry = countryCityData[selectedCode];

  // Update the list of cities
  if (selectedCountry) {
    const cityOptions = selectedCountry.cities.map((city) => ({
      id: city,
      text: city,
    }));

    $("#city").empty(); // Empty old options
    cityOptions.forEach((option) => {
      const newOption = new Option(option.text, option.id, false, false);
      $("#city").append(newOption);
    });

    $("#city").prop("disabled", false).trigger("change");
  } else {
    $("#city").empty().prop("disabled", true).trigger("change");
  }
});

// Initialize the list of cities
$("#city").select2({
  placeholder: "Select City",
  disabled: true, // initially disabled
});

// Call function to load countries from API
$(document).ready(() => {
  loadCountries();
});
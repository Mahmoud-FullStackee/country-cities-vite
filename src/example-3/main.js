import $ from "jquery";
import select2 from "select2";

import "select2/dist/css/select2.min.css"; // Import Select2's CSS

select2($); // Force Select2 to work with jQuery

// Country and city data
const countryCityData = {
  EG: { name: "Egypt", flag: "eg", cities: ["Cairo", "Giza", "Alexandria"] },
  US: { name: "United States", flag: "us", cities: ["New York", "Los Angeles", "Chicago"] },
  IN: { name: "India", flag: "in", cities: ["Delhi", "Mumbai", "Bangalore"] },
  DE: { name: "Germany", flag: "de", cities: ["Berlin", "Munich", "Frankfurt"] },
};

$(document).ready(() => {
  // Fill Country List
  const countryOptions = Object.entries(countryCityData).map(([code, { name, flag }]) => ({
    id: code,
    text: `<img class="flag-icon" src="flags/${flag}.png" style="width: 20px; height: 15px; margin-right: 5px;" /> ${name}`,
  }));

  $("#country").select2({
    data: countryOptions,
    escapeMarkup: (markup) => markup, // to allow flag images to be displayed
    placeholder: "Select Country",
  });

  // Initialize the city list
  $("#city").select2({
    placeholder: "Select City",
    disabled: true, // initially disabled
  });

  // Handling country selection
  $("#country").on("change", function () {
    const selectedCode = $(this).val();
    const selectedCountry = countryCityData[selectedCode];

    // Update the list of cities
    if (selectedCountry) {
      const cityOptions = selectedCountry.cities.map((city) => ({ id: city, text: city }));
      $("#city").empty(); // Empty the previous options
      cityOptions.forEach((option) => {
        const newOption = new Option(option.text, option.id, false, false);
        $("#city").append(newOption);
      });
      $("#city").prop("disabled", false).trigger("change");
    } else {
      $("#city").empty().prop("disabled", true).trigger("change");
    }
  });
});
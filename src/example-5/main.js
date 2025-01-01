import $ from "jquery";
import select2 from "select2";
import "select2/dist/css/select2.min.css";
import countries from "./countries.js";

select2($)

function populateCountries() {
  const countryOptions = countries.map((country) => ({
    id: country.countryShortCode,
    text: `
 <span class="flag-container">
 <img class="flag-icon" src="flags/${country.countryShortCode.toLowerCase()}.png" alt="${country.countryName}" />
 </span>
 ${country.countryName}
 `,
  }));

  $("#country").select2({
    data: countryOptions,
    escapeMarkup: (markup) => markup, // to allow flags to be displayed
    placeholder: "Select country",
  });
}

$("#country").on("change", function () {
  const selectedCode = $(this).val();
  const selectedCountry = countries.find(
    (country) => country.countryShortCode === selectedCode
  );

  if (selectedCountry && selectedCountry.regions) {
    const cityOptions = selectedCountry.regions.map((region) => ({
      id: region.shortCode,
      text: region.name,
    }));

    $("#city")
      .prop("disabled", false)
      .empty()
      .select2({
        data: cityOptions,
        placeholder: "Select City",
      });
  } else {
    $("#city").prop("disabled", true).empty().select2({ data: [] });
  }
});

$("#city").select2({
  placeholder: "Select City",
});

$(document).ready(() => {
  populateCountries();
});
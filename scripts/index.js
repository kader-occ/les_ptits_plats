import { totalRecipes } from "../../data/recipes.js";
import { displayResult } from "./UI/display-result.js";
import { filterRecipesByKeywords } from "./UI/filter-recipes.js";

onload = () => {
  console.log(totalRecipes);

  // Charge toutes les recettes
  displayResult(totalRecipes);

  const searchInput = document.querySelector("#search-input");
  const btnSubmitSearchForm = document.querySelector("#search-form-btn-submit");

  searchInput.addEventListener("keypress", (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
    }
  });

  btnSubmitSearchForm.addEventListener("click", (ev) => {
    ev.preventDefault();
  });

  searchInput.addEventListener("keyup", () => {
    if (searchInput.value.length >= 3) {
      const recipeArr = filterRecipesByKeywords(searchInput.value);
      displayResult(recipeArr);
    } else {
      displayResult(totalRecipes);
    }
  });
};

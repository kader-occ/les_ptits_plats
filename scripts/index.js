import { totalRecipes } from "../../data/recipes.js";
import { displayResult } from "./UI/display-result.js";
import { filterRecipesByKeywords } from "./UI/filter-recipes.js";
import { selectAppareilFactory } from "./UI/select-appareil-factory.js";
import { selectIngredientFactory } from "./UI/select-ingredient-factory.js";
import { selectUstensileFactory } from "./UI/select-ustensile-factory.js";

onload = () => {
  localStorage.removeItem("_recipeResults");

  localStorage.setItem("_recipeResults", JSON.stringify(totalRecipes));

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

  searchInput.addEventListener("keyup", (ev) => {
    if (searchInput.value.length >= 3) {
      ev.stopImmediatePropagation();
      const recipeArr = filterRecipesByKeywords(searchInput.value);
      localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
      displayResult();
    } else {
      localStorage.setItem("_recipeResults", JSON.stringify(totalRecipes));
      displayResult();
    }
  });

  displayResult();
  loadSelect();
};

export const loadSelect = () => {
  const ingredientSelectBoxLink = document.querySelector(
    "#ingredient-select-box-link"
  );
  const appareilSelectBoxLink = document.querySelector(
    "#appareil-select-box-link"
  );
  const ustensileSelectBoxLink = document.querySelector(
    "#ustensile-select-box-link"
  );

  if (document.contains(document.getElementById("ingredient-result"))) {
    document.getElementById("ingredient-result").remove();
  }

  ingredientSelectBoxLink.addEventListener("click", (ev) => {
    ev.stopPropagation();
    selectIngredientFactory();
  });

  appareilSelectBoxLink.addEventListener("click", (ev) => {
    ev.stopPropagation();
    selectAppareilFactory();
  });

  ustensileSelectBoxLink.addEventListener("click", (ev) => {
    ev.stopPropagation();
    selectUstensileFactory();
  });
};

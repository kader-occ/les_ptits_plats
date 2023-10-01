import { totalRecipes } from "../../data/recipes.js";
import { cardRecipeFactory } from "./card-recipe-factory-ui.js";
import { removeHtmlElement } from "../utils/remove-html-element.js";
import { noResult } from "./no-result.js";
import { handleSelect } from "./select-filter-ui.js";

/**
 * Fonction qui affiche le resultat de la recherche
 * @param {Array} recipeArr
 */
export const displayResult = (recipeArr) => {
  const searchInput = document.querySelector("#search-input");
  const btnResetHeaderSearchForm = document.querySelector(
    "#btn-reset-header-search-form"
  );
  const totalRecipesDom = document.querySelector("#recipes-numbers");
  const mainDom = document.querySelector("main");
  const noResultDom = document.querySelector("#no-results");
  const resultsDom = document.querySelector("#recipe-result-search");
  const recipeCards = document.getElementsByClassName("recipe-card");
  const ingredientSelectBox = document.querySelector("#ingredient-select-box");
  const appareilSelectBox = document.querySelector("#appareil-select-box");
  const ustensileSelectBox = document.querySelector("#ustensile-select-box");

  totalRecipesDom.textContent = recipeArr.length;

  if (recipeArr.length < totalRecipes.length) {
    btnResetHeaderSearchForm.classList.remove("d-none");
    removeHtmlElement(recipeCards);
  }

  // Scénario alternatif A1 (Aucun resultat trouvé)
  if (!recipeArr.length && !noResultDom) {
    noResult(searchInput.value);
  } else {
    // Scénario alternatif A2
    if (noResultDom) {
      noResultDom.remove();
    }
    recipeArr.map((recipe) => {
      const recipeCard = cardRecipeFactory(recipe);
      resultsDom.append(recipeCard);
      mainDom.append(resultsDom);
    });

    btnResetHeaderSearchForm.addEventListener("click", () => {
      location.reload();
    });

    ingredientSelectBox.addEventListener("click", (ev) => {
      const ingredientResultDOM = document.querySelector("#ingredient-result");
      handleSelect(ev, ingredientResultDOM, "ingredients", recipeArr);
    });

    appareilSelectBox.addEventListener("click", (ev) => {
      const appareilResultDOM = document.querySelector("#appareil-result");
      handleSelect(ev, appareilResultDOM, "appareils", recipeArr);
    });

    ustensileSelectBox.addEventListener("click", (ev) => {
      const ustensileResultDOM = document.querySelector("#ustensile-result");
      handleSelect(ev, ustensileResultDOM, "ustensiles", recipeArr);
    });
  }
};

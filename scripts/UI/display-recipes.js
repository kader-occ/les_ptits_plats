import { totalRecipes } from "../../data/recipes.js";
import { cardRecipeFactory } from "./card-recipe-factory-ui.js";
import { removeHtmlElement } from "../utils/remove-html-element.js";
import { noResult } from "./no-result.js";

/**
 * Fonction qui affiche le resultat de la recherche
 * @param {Array} recipeToDisplay
 */
export const displayRecipes = () => {
  const searchInput = document.querySelector("#search-input");
  const btnResetHeaderSearchForm = document.querySelector(
    "#btn-reset-header-search-form"
  );
  const totalRecipesDom = document.querySelector("#recipes-numbers");
  const mainDom = document.querySelector("main");
  const noResultDom = document.querySelector("#no-results");
  const resultsDom = document.querySelector("#recipe-result-search");
  const recipeCards = document.getElementsByClassName("recipe-card");

  const recipeToDisplay = JSON.parse(localStorage.getItem("_recipeResults"));

  totalRecipesDom.textContent = recipeToDisplay.length;

  if (recipeToDisplay.length < totalRecipes.length) {
    btnResetHeaderSearchForm.classList.remove("d-none");
    removeHtmlElement(recipeCards);
  }

  // Scénario alternatif A1 (Aucun resultat trouvé)
  if (!recipeToDisplay.length && !noResultDom) {
    noResult(searchInput.value);
  } else {
    // Scénario alternatif A2
    if (noResultDom) {
      noResultDom.remove();
    }
    recipeToDisplay.map((recipe) => {
      const recipeCard = cardRecipeFactory(recipe);
      resultsDom.append(recipeCard);
      mainDom.append(resultsDom);
    });

    btnResetHeaderSearchForm.addEventListener("click", () => {
      location.reload();
    });
  }
};

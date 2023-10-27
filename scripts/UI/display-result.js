import { totalRecipes } from "../../data/recipes.js";
import { cardRecipeFactory } from "./card-recipe-factory-ui.js";
import { removeHtmlElement } from "../utils/remove-html-element.js";
import { noResult } from "./no-result.js";
import { selectIngredientFactory } from "./select-ingredient-factory.js";
import { selectAppareilFactory } from "./select-appareil-factory.js";
import { selectUstensileFactory } from "./select-ustensile-factory.js";
import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { handleSelectFilterData } from "./select-filter-data.js";

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

    const ingredientSelectBox = document.querySelector(
      "#ingredient-select-box"
    );
    const appareilSelectBox = document.querySelector("#appareil-select-box");
    const ustensileSelectBox = document.querySelector("#ustensile-select-box");

    ingredientSelectBox.addEventListener("click", () => {
      selectIngredientFactory(recipeArr);
    });

    appareilSelectBox.addEventListener("click", () => {
      selectAppareilFactory(recipeArr);
    });

    ustensileSelectBox.addEventListener("click", () => {
      selectUstensileFactory(recipeArr);
    });
  }
};

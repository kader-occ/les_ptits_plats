import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { toCapitalize } from "../utils/to-capitalize.js";
import { createBadgeFilter } from "./badge-filter-ui.js";
import { filterRecipesByKeywords } from "./filter-recipes.js";
import { displayResult } from "./display-result.js";
import { removeDuplicate } from "../utils/remove-duplicate.js";

/**
 * Gestion Select recherche avancée
 * @param {event} event
 * @param {HTMLElement} selectDOMResult
 * @param {string} filterType
 * @param {Array} recipeArr
 */
export const handleSelect = (event, selectDOMResult, filterType, recipeArr) => {
  const selectIcon = event.target.lastElementChild;
  const selectFilterUL = selectDOMResult.querySelector("ul");

  rotateHtmlElement(selectIcon);

  if (selectDOMResult.classList.contains("d-none")) {
    selectDOMResult.classList.remove("d-none");
    selectFilterFactory(selectDOMResult, filterType, recipeArr);
  } else {
    if (selectFilterUL) {
      selectFilterUL.remove();
      selectDOMResult.classList.add("d-none");
    }
  }
};

/**
 * Factory Select recherche avancée
 * @param {string} filterType
 * @param {Array} recipeArr
 */
export const selectFilterFactory = (selectDOMResult, filterType, recipeArr) => {
  const selectFilterUL = document.createElement("ul");

  //Scénario alternatif A3
  switch (filterType) {
    case "ingredients":
      recipeArr.map((recipe) => {
        recipe.ingredients.map((ingredient) => {
          const selectLI = document.createElement("li");
          selectLI.classList.add("select-option", "p-3");
          selectLI.textContent += toCapitalize(ingredient.ingredient);

          selectFilterUL.append(selectLI);
          selectDOMResult.append(selectFilterUL);
        });
      });
      break;

    case "appareils":
      recipeArr.map((recipe) => {
        const selectLI = document.createElement("li");
        selectLI.classList.add("select-option", "p-3");
        selectLI.textContent = toCapitalize(recipe.appliance);

        selectFilterUL.append(selectLI);
        selectDOMResult.append(selectFilterUL);
      });
      break;

    case "ustensiles":
      recipeArr.map((recipe) => {
        recipe.ustensils.map((ustensil) => {
          const selectLI = document.createElement("li");
          selectLI.classList.add("select-option", "p-3");
          selectLI.textContent += toCapitalize(ustensil);

          selectFilterUL.append(selectLI);
          selectDOMResult.append(selectFilterUL);
        });
      });
      break;
  }

  const selectsLI = document.querySelectorAll(".select-option");

  removeDuplicate(selectsLI);

  selectsLI.forEach((selectLI) => {
    selectLI.addEventListener("click", (ev) => {
      ev.preventDefault();
      if (selectFilterUL) {
        selectFilterUL.remove();
      }
      const recipeArr = filterRecipesByKeywords(selectLI.textContent);
      displayResult(recipeArr);
      selectDOMResult.classList.add("d-none");
      handleSelectOption(selectLI);
    });
  });

  const handleSelectOption = (selectedLI) => {
    createBadgeFilter(selectedLI);
  };
};

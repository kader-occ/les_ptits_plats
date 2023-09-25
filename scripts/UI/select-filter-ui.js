import { rotateHtmlElement } from "../utils/rotateHtmlElement.js";
import { createBadgeFilter } from "./badge-filter-ui.js";

/**
 * Gestion Select recherche avancée
 * @param {event} event
 * @param {HTMLElement} htmlElementDOMResult
 * @param {string} filterType
 * @param {Array} recipeArr
 */
export const handleSelect = (
  event,
  htmlElementDOMResult,
  filterType,
  recipeArr
) => {
  const selectIcon = event.target.lastElementChild;
  const selectFilterUL = htmlElementDOMResult.querySelector("ul");

  rotateHtmlElement(selectIcon);

  if (htmlElementDOMResult.classList.contains("d-none")) {
    htmlElementDOMResult.classList.remove("d-none");
    selectFilterFactory(htmlElementDOMResult, filterType, recipeArr);
  } else {
    selectFilterUL.remove();
    htmlElementDOMResult.classList.add("d-none");
  }
};

/**
 * Charge les resulats du Select recherche avancée
 * @param {string} filterType
 * @param {Array} recipeArr
 */
export const selectFilterFactory = (
  htmlElementDOMResult,
  filterType,
  recipeArr
) => {
  const selectFilterUL = document.createElement("ul");

  //Scénario alternatif A3
  switch (filterType) {
    case "ingredients":
      recipeArr.map((recipe) => {
        recipe.ingredients.map((ingredient) => {
          const selectLI = document.createElement("li");
          const selectOption = document.createElement("a");

          selectLI.classList.add("select-option", "p-3");
          selectOption.textContent += ingredient.ingredient;

          selectLI.append(selectOption);
          selectFilterUL.append(selectLI);
          htmlElementDOMResult.append(selectFilterUL);
        });
      });
      break;

    case "appareils":
      recipeArr.map((recipe) => {
        const selectLI = document.createElement("li");
        const selectOption = document.createElement("a");

        selectLI.classList.add("select-option", "p-3");
        selectOption.textContent = recipe.appliance;

        selectLI.append(selectOption);
        selectFilterUL.append(selectLI);
        htmlElementDOMResult.append(selectFilterUL);
      });
      break;

    case "ustensiles":
      recipeArr.map((recipe) => {
        recipe.ustensils.map((ustensil) => {
          const selectLI = document.createElement("li");
          const selectOption = document.createElement("a");

          selectLI.classList.add("select-option", "p-3");
          selectOption.textContent += ustensil;

          selectLI.append(selectOption);
          selectFilterUL.append(selectLI);
          htmlElementDOMResult.append(selectFilterUL);
        });
      });
      break;
  }

  const selectsLI = document.querySelectorAll(".select-option");

  selectsLI.forEach((selectLI) => {
    selectLI.addEventListener("click", (ev) => {
      ev.preventDefault();
      if (selectFilterUL) {
        selectFilterUL.remove();
      }
      htmlElementDOMResult.classList.add("d-none");
      handleSelectOption(selectLI);
    });
  });

  const handleSelectOption = (selectedLI) => {
    createBadgeFilter(selectedLI);
  };
};

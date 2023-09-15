import { totalRecipes } from "../../../data/recipes.js";
import { removeHtmlElement } from "../../utils/removeHtmlElement.js";

let count = 0;

const rotateHtmlElement = (htmlElement) => {
  count++;
  let deg = count * 180;
  htmlElement.style.transform = "rotate(" + deg + "deg)";
};

/**
 * Gestion du select Filter
 * @param {event} event
 * @param {HTMLElement} htmlElementDOMResult
 * @param {string} filterType
 * @param {Array} recipeArr
 */
export const handleSelectResult = (
  event,
  htmlElementDOMResult,
  filterType,
  recipeArr
) => {
  const selectIcon = event.target.lastElementChild;

  rotateHtmlElement(selectIcon);

  if (htmlElementDOMResult.classList.contains("d-none")) {
    selectFilterFactory(filterType, recipeArr);
  } else {
    htmlElementDOMResult.classList.add("d-none");
  }
};

/**
 * Charge les resulats du select Filter
 * @param {string} filterType
 * @param {Array} recipeArr
 */
export const selectFilterFactory = (filterType, recipeArr) => {
  //Scénario alternatif A3
  switch (filterType) {
    case "ingredients":
      const ingredientResult = document.querySelector("#ingredient-result");
      const ingredientOptions = document.querySelectorAll(".ingredient-option");

      if (recipeArr.length < totalRecipes.length) {
        removeHtmlElement(ingredientOptions);
      }

      ingredientResult.classList.remove("d-none");
      recipeArr.map((recipe) => {
        recipe.ingredients.map((ingredient) => {
          const ingredientOption = document.createElement("p");
          ingredientOption.style.cursor = "pointer";
          ingredientOption.className = "ingredient-option";
          ingredientOption.textContent += ingredient.ingredient;
          ingredientResult.append(ingredientOption);
        });
      });
      break;
    case "appareils":
      const appareilResult = document.querySelector("#appareil-result");
      const appareilOptions = document.querySelectorAll(".appareil-option");

      if (recipeArr.length < totalRecipes.length) {
        removeHtmlElement(appareilOptions);
      }

      appareilResult.classList.remove("d-none");

      recipeArr.map((recipe) => {
        const appareilOption = document.createElement("p");
        appareilOption.style.cursor = "pointer";
        appareilOption.className = "appareil-option";
        appareilOption.textContent = recipe.appliance;
        appareilResult.append(appareilOption);
      });
      break;

    case "ustensiles":
      const ustensileResult = document.querySelector("#ustensile-result");
      const ustensileOptions = document.querySelectorAll(".ustensile-option");

      if (recipeArr.length < totalRecipes.length) {
        removeHtmlElement(ustensileOptions);
      }

      ustensileResult.classList.remove("d-none");
      recipeArr.map((recipe) => {
        recipe.ustensils.map((ustensil) => {
          const ustensilOption = document.createElement("p");
          ustensilOption.style.cursor = "pointer";
          ustensilOption.className = "appareil-option";
          ustensilOption.textContent += ustensil;
          ustensileResult.append(ustensilOption);
        });
      });
      break;
  }
};

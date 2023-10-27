import { toCapitalize } from "../utils/to-capitalize.js";
import { filterRecipesByKeywords } from "./filter-recipes.js";
import { displayResult } from "./display-result.js";
import { removeDuplicate } from "../utils/remove-duplicate.js";

/**
 * Gestion Select
 * @param {HTMLElement} selectDOMResult
 * @param {Array} recipeArr
 */
export const handleSelectFilterData = (recipeArr, selectType) => {
  switch (selectType) {
    case "ingredients":
      const ingredientResult = document.getElementById("ingredient-result");
      const selectIngredientFilterUL = document.getElementById(
        "select-filter-ingredient-ul"
      );
      //Scénario alternatif A3
      recipeArr.map((recipe) => {
        recipe.ingredients.map((ingredient) => {
          const selectLI = document.createElement("li");
          selectLI.classList.add("select-option", "py-3");
          selectLI.textContent += toCapitalize(ingredient.ingredient);
          selectIngredientFilterUL.append(selectLI);
          ingredientResult.append(selectIngredientFilterUL);
          selectLI.addEventListener("click", () => {
            recipeArr = filterRecipesByKeywords(ingredient.ingredient);
            displayResult(recipeArr);
          });
        });
      });
      break;

    case "appareils":
      const appareilResult = document.getElementById("appareil-result");
      const selectAppareilFilterUL = document.getElementById(
        "select-filter-appareil-ul"
      );
      //Scénario alternatif A3
      recipeArr.map((recipe) => {
        const selectLI = document.createElement("li");
        selectLI.classList.add("select-option", "p-3");
        selectLI.textContent = toCapitalize(recipe.appliance);
        selectAppareilFilterUL.append(selectLI);
        appareilResult.append(selectAppareilFilterUL);
        selectLI.addEventListener("click", () => {
          recipeArr = filterRecipesByKeywords(recipe.appliance);
          displayResult(recipeArr);
        });
      });
      break;

    case "ustensiles":
      const ustensileResult = document.getElementById("ustensile-result");
      const selectUstensileFilterUL = document.getElementById(
        "select-filter-ustensile-ul"
      );
      //Scénario alternatif A3
      recipeArr.map((recipe) => {
        recipe.ustensils.map((ustensil) => {
          const selectLI = document.createElement("li");
          selectLI.classList.add("select-option", "p-3");
          selectLI.textContent = toCapitalize(ustensil);
          selectUstensileFilterUL.append(selectLI);
          ustensileResult.append(selectUstensileFilterUL);
          selectLI.addEventListener("click", () => {
            recipeArr = filterRecipesByKeywords(ustensil);
            displayResult(recipeArr);
          });
        });
      });
      break;
  }
  const selectOptions = document.querySelectorAll(".select-option");
  removeDuplicate(selectOptions);
};

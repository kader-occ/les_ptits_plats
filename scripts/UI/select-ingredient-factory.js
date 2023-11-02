import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { toCapitalize } from "../utils/to-capitalize.js";
import { tagFilterFactory } from "./tag-filter-factory.js";
import { displayResult } from "./display-result.js";
import { filterRecipesByIngredient } from "./filter-recipes.js";
import { removeDuplicate } from "../utils/remove-duplicate.js";
import { totalRecipes } from "../../data/recipes.js";

export const selectIngredientFactory = () => {
  const selectIcon = document.querySelector("#ingredient-select-chevron-icon");
  rotateHtmlElement(selectIcon);

  const ingredientSelectBox = document.querySelector("#ingredient-select-box");

  const selectFilterUL = document.createElement("ul");
  selectFilterUL.id = "select-filter-ingredient-ul";

  if (document.contains(document.getElementById("ingredient-result"))) {
    document.getElementById("ingredient-result").remove();
  } else {
    const ingredientResult = document.createElement("div");
    ingredientResult.id = "ingredient-result";

    const ingredientSearchForm = document.createElement("div");
    const ingredientSearchInput = document.createElement("input");
    const ingredientSearchFormIcon = document.createElement("i");

    ingredientSearchForm.id = "ingredient-search-form";
    ingredientSearchForm.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "py-3"
    );

    ingredientSearchInput.id = "ingredient-search-input";
    ingredientSearchInput.classList.add("form-control", "my-3");

    ingredientSearchFormIcon.classList.add(
      "bi",
      "bi-search",
      "icon-search-filter"
    );

    ingredientSearchForm.append(ingredientSearchInput);
    ingredientSearchForm.append(ingredientSearchFormIcon);
    ingredientResult.append(ingredientSearchForm);
    ingredientResult.append(selectFilterUL);
    ingredientSelectBox.append(ingredientResult);

    ingredientSearchInput.addEventListener("keyup", (ev) => {
      ev.preventDefault();
      if (ev.target.value.length > 3) {
        const recipeArr = filterRecipesByIngredient(ev.target.value);
        localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
        loadSelectData();
        displayResult();
      } else {
        localStorage.setItem("_recipeResults", JSON.stringify(totalRecipes));
        loadSelectData();
        displayResult();
      }
    });
    loadSelectData();
    displayResult();
  }
};

const loadSelectData = () => {
  const ingredientResult = document.querySelector("#ingredient-result");
  const selectFilterUL = document.querySelector("#select-filter-ingredient-ul");

  if (selectFilterUL) {
    selectFilterUL.innerHTML = "";
  }

  let recipeArr = JSON.parse(localStorage.getItem("_recipeResults"));

  recipeArr.map((recipe) => {
    recipe.ingredients.map((ingredient) => {
      const selectLI = document.createElement("li");
      const selectLink = document.createElement("a");

      selectLink.id = "ingredient-link";

      selectLI.classList.add("select-option", "py-3");
      selectLink.textContent += toCapitalize(ingredient.ingredient);

      selectLI.append(selectLink);
      selectFilterUL.append(selectLI);
      ingredientResult.append(selectFilterUL);

      selectLink.addEventListener("click", () => {
        tagFilterFactory(toCapitalize(ingredient.ingredient));
        recipeArr = filterRecipesByIngredient(ingredient.ingredient);
        localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
        displayResult();
        selectIngredientFactory();
      });
    });
  });
  const selectOptions = document.querySelectorAll(".select-option");
  removeDuplicate(selectOptions);
};

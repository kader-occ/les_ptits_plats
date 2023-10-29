import { removeDuplicate } from "../utils/remove-duplicate.js";
import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { toCapitalize } from "../utils/to-capitalize.js";
import { badgeFilterFactory } from "./badge-filter-factory.js";
import { displayResult } from "./display-result.js";
import {
  filterIngredientByKeyword,
  filterRecipesByKeywords,
} from "./filter-recipes.js";

export const selectIngredientFactory = () => {
  const selectIcon = document.querySelector("#ingredient-select-chevron-icon");
  rotateHtmlElement(selectIcon);

  const ingredientSelectBox = document.querySelector("#ingredient-select-box");

  if (document.contains(document.getElementById("ingredient-result"))) {
    document.getElementById("ingredient-result").remove();
  } else {
    const ingredientResult = document.createElement("div");
    const selectFilterUL = document.createElement("ul");

    ingredientResult.id = "ingredient-result";
    selectFilterUL.id = "select-filter-ingredient-ul";

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

    ingredientSearchInput.addEventListener("keyup", (ev) => {
      ev.preventDefault();
      handleSelectIngredientInputSearch(ev);
    });

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

        selectLink.addEventListener("click", (ev) => {
          ev.stopImmediatePropagation();
          badgeFilterFactory(toCapitalize(ingredient.ingredient));
          recipeArr = filterRecipesByKeywords(ingredient.ingredient);
          localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
          displayResult();
          selectIngredientFactory();
        });
      });
    });
  }

  const selectOptions = document.querySelectorAll(".select-option");
  removeDuplicate(selectOptions);
};

const handleSelectIngredientInputSearch = (ev) => {
  if (ev.target.value.length >= 3) {
    let recipeArr = filterIngredientByKeyword(ev.target.value);
    localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
    displayResult();
    selectIngredientFactory();
  }
};

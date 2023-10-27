import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { handleSelectFilterData } from "./select-filter-data.js";

export const selectIngredientFactory = (recipeArr) => {
  const selectIcon = document.querySelector(".select-icon");
  rotateHtmlElement(selectIcon);

  const ingredientSelectBox = document.querySelector("#ingredient-select-box");

  let ingredientResult;
  let selectFilterUL;

  if (document.contains(document.getElementById("ingredient-result"))) {
    document.getElementById("ingredient-result").remove();
  } else {
    ingredientResult = document.createElement("div");
    selectFilterUL = document.createElement("ul");
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

    handleSelectFilterData(recipeArr, "ingredients");
  }
};

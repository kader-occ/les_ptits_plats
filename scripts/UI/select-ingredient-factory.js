import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { handleSelectFilterData } from "./select-filter-data.js";

export const selectIngredientFactory = (recipeArr) => {
  const selectIcon = document.querySelector("#select-ingredient-chevron-icon");
  rotateHtmlElement(selectIcon);

  if (document.contains(document.getElementById("ingredient-result"))) {
    document.getElementById("ingredient-result").remove();
  } else {
    const ingredientSelectBox = document.querySelector(
      "#ingredient-select-box"
    );
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
    ingredientSearchInput.focus();
    ingredientSearchInput.classList.add("form-control", "my-3");

    ingredientSearchInput.addEventListener("click", (ev) => {
      ev.preventDefault();
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

    handleSelectFilterData(recipeArr, "ingredients");
    return;
  }
};

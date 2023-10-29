import { removeDuplicate } from "../utils/remove-duplicate.js";
import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { toCapitalize } from "../utils/to-capitalize.js";
import { badgeFilterFactory } from "./badge-filter-factory.js";
import { displayResult } from "./display-result.js";
import { filterRecipesByKeywords } from "./filter-recipes.js";

export const selectAppareilFactory = () => {
  const selectIcon = document.querySelector("#appareil-select-chevron-icon");
  rotateHtmlElement(selectIcon);

  const appareilSelectBox = document.querySelector("#appareil-select-box");

  if (document.contains(document.getElementById("appareil-result"))) {
    document.getElementById("appareil-result").remove();
  } else {
    const appareilResult = document.createElement("div");
    const selectFilterUL = document.createElement("ul");

    appareilResult.id = "appareil-result";
    selectFilterUL.id = "select-filter-appareil-ul";

    const appareilSearchForm = document.createElement("div");
    const appareilSearchInput = document.createElement("input");
    const appareilSearchFormIcon = document.createElement("i");

    appareilSearchForm.id = "appareil-search-form";
    appareilSearchForm.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "py-3"
    );

    appareilSearchInput.id = "appareil-search-input";
    appareilSearchInput.classList.add("form-control", "my-3");

    appareilSearchInput.addEventListener("keyup", (ev) => {
      ev.preventDefault();
      handleSelectAppareilInputSearch(ev);
    });

    appareilSearchFormIcon.classList.add(
      "bi",
      "bi-search",
      "icon-search-filter"
    );

    appareilSearchForm.append(appareilSearchInput);
    appareilSearchForm.append(appareilSearchFormIcon);
    appareilResult.append(appareilSearchForm);
    appareilResult.append(selectFilterUL);
    appareilSelectBox.append(appareilResult);

    let recipeArr = JSON.parse(localStorage.getItem("_recipeResults"));

    //Scénario alternatif A3
    recipeArr.map((recipe) => {
      const selectLI = document.createElement("li");
      const selectLink = document.createElement("a");

      selectLI.classList.add("select-option", "p-3");
      selectLink.id = "select-link";

      selectLink.textContent = toCapitalize(recipe.appliance);

      selectLI.append(selectLink);
      selectFilterUL.append(selectLI);
      appareilResult.append(selectFilterUL);

      selectLink.addEventListener("click", (ev) => {
        ev.stopImmediatePropagation();
        badgeFilterFactory(toCapitalize(recipe.appliance));
        recipeArr = filterRecipesByKeywords(recipe.appliance);
        localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
        displayResult(recipeArr);
        selectAppareilFactory();
      });
    });
  }
  const selectOptions = document.querySelectorAll(".select-option");
  removeDuplicate(selectOptions);
};

const handleSelectAppareilInputSearch = (ev) => {
  if (ev.target.value.length >= 3) {
    let recipeArr = filterRecipesByKeywords(ev.target.value);
    localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
    displayResult();
    selectAppareilFactory();
  }
};

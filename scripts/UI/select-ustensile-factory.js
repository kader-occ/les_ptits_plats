import { removeDuplicate } from "../utils/remove-duplicate.js";
import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { toCapitalize } from "../utils/to-capitalize.js";
import { badgeFilterFactory } from "./badge-filter-factory.js";
import { displayResult } from "./display-result.js";
import { filterRecipesByKeywords } from "./filter-recipes.js";

export const selectUstensileFactory = () => {
  const selectIcon = document.querySelector("#ustensile-select-chevron-icon");
  rotateHtmlElement(selectIcon);

  const ustensileSelectBox = document.querySelector("#ustensile-select-box");

  if (document.contains(document.getElementById("ustensile-result"))) {
    document.getElementById("ustensile-result").remove();
  } else {
    const ustensileResult = document.createElement("div");
    const selectFilterUL = document.createElement("ul");

    ustensileResult.id = "ustensile-result";
    selectFilterUL.id = "select-filter-ustensile-ul";

    const ustensileSearchForm = document.createElement("div");
    const ustensileSearchInput = document.createElement("input");
    const ustensileSearchFormIcon = document.createElement("i");

    ustensileSearchForm.id = "ustensile-search-form";
    ustensileSearchForm.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "py-3"
    );

    ustensileSearchInput.id = "ustensile-search-input";
    ustensileSearchInput.classList.add("form-control", "my-3");

    ustensileSearchInput.addEventListener("keyup", (ev) => {
      ev.preventDefault();
      handleSelectUstensileInputSearch(ev);
    });

    ustensileSearchFormIcon.classList.add(
      "bi",
      "bi-search",
      "icon-search-filter"
    );

    ustensileSearchForm.append(ustensileSearchInput);
    ustensileSearchForm.append(ustensileSearchFormIcon);
    ustensileResult.append(ustensileSearchForm);
    ustensileResult.append(selectFilterUL);
    ustensileSelectBox.append(ustensileResult);

    let recipeArr = JSON.parse(localStorage.getItem("_recipeResults"));

    //Scénario alternatif A3
    recipeArr.map((recipe) => {
      recipe.ustensils.map((ustensil) => {
        const selectLI = document.createElement("li");
        const selectLink = document.createElement("a");

        selectLI.classList.add("select-option", "p-3");
        selectLink.id = "select-link";

        selectLink.textContent = toCapitalize(ustensil);

        selectLI.append(selectLink);
        selectFilterUL.append(selectLI);
        ustensileResult.append(selectFilterUL);

        selectLink.addEventListener("click", (ev) => {
          ev.stopImmediatePropagation();
          badgeFilterFactory(toCapitalize(ustensil));
          recipeArr = filterRecipesByKeywords(ustensil);
          localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
          displayResult(recipeArr);
          selectUstensileFactory();
        });
      });
    });
  }
  const selectOptions = document.querySelectorAll(".select-option");
  removeDuplicate(selectOptions);
};

const handleSelectUstensileInputSearch = (ev) => {
  if (ev.target.value.length >= 3) {
    let recipeArr = filterRecipesByKeywords(ev.target.value);
    localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
    displayResult();
    selectUstensileFactory();
  }
};

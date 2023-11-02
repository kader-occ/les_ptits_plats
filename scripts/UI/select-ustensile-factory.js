import { totalRecipes } from "../../data/recipes.js";
import { removeDuplicate } from "../utils/remove-duplicate.js";
import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { toCapitalize } from "../utils/to-capitalize.js";
import { displayResult } from "./display-result.js";
import { filterRecipesByUstensile } from "./filter-recipes.js";
import { tagFilterFactory } from "./tag-filter-factory.js";

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

    ustensileSearchInput.addEventListener("keyup", (ev) => {
      ev.preventDefault();
      if (ev.target.value.length > 3) {
        const recipeArr = filterRecipesByUstensile(ev.target.value);
        localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
        displayResult();
        loadSelectData();
      } else {
        localStorage.setItem("_recipeResults", JSON.stringify(totalRecipes));
        displayResult();
        loadSelectData();
      }
    });
    loadSelectData();
    displayResult();
  }
};

const loadSelectData = () => {
  const ustensileResult = document.querySelector("#ustensile-result");
  const selectFilterUL = document.querySelector("#select-filter-ustensile-ul");

  if (selectFilterUL) {
    selectFilterUL.innerHTML = "";
  }

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

      selectLink.addEventListener("click", () => {
        tagFilterFactory(ustensil.toLowerCase());
        recipeArr = filterRecipesByUstensile(ustensil);
        localStorage.setItem("_recipeResults", JSON.stringify(recipeArr));
        displayResult();
        selectUstensileFactory();
      });
    });
  });
  const selectOptions = document.querySelectorAll(".select-option");
  removeDuplicate(selectOptions);
};

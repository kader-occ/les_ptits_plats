import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { handleSelectFilterData } from "./select-filter-data.js";

export const selectUstensileFactory = (recipeArr) => {
  const selectIcon = document.querySelector(".select-icon");
  rotateHtmlElement(selectIcon);

  const ustensileSelectBox = document.querySelector("#ustensile-select-box");

  let ustensileResult;
  let selectFilterUL;

  if (document.contains(document.getElementById("ustensile-result"))) {
    document.getElementById("ustensile-result").remove();
  } else {
    ustensileResult = document.createElement("div");
    selectFilterUL = document.createElement("ul");
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

    handleSelectFilterData(recipeArr, "ustensiles");
  }
};

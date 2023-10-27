import { rotateHtmlElement } from "../utils/rotate-html-element.js";
import { handleSelectFilterData } from "./select-filter-data.js";

export const selectAppareilFactory = (recipeArr) => {
  const selectIcon = document.querySelector(".select-icon");
  rotateHtmlElement(selectIcon);

  const appareilSelectBox = document.querySelector("#appareil-select-box");

  let appareilResult;
  let selectFilterUL;

  if (document.contains(document.getElementById("appareil-result"))) {
    document.getElementById("appareil-result").remove();
  } else {
    appareilResult = document.createElement("div");
    selectFilterUL = document.createElement("ul");
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

    handleSelectFilterData(recipeArr, "appareils");
  }
};

import { loadSelect } from "../index.js";
import { displayRecipes } from "./display-recipes.js";
import { handleRecipesByTag } from "../algo/filter-recipes.js";

let tagArr = [];

/**
 * Tag badge Factory
 * @param {string} selectedLinkTag
 */
export const tagFilterFactory = (selectedLinkTag) => {
  const filtersDOM = document.querySelector("#filters");

  tagArr.push(selectedLinkTag);
  localStorage.setItem("_tags", JSON.stringify(tagArr));

  let badgeSelectLI;
  let badgeFilterIconClose;
  let badgeFilterDiv;
  let badgeFilterUL;

  if (!document.contains(document.getElementById("badge-filter"))) {
    badgeFilterDiv = document.createElement("div");
    badgeFilterUL = document.createElement("ul");
    badgeFilterDiv.id = "badge-filter";
    badgeFilterDiv.classList.add("row", "mt-5");
    badgeFilterUL.id = "badge-filter-ul";
    badgeFilterDiv.append(badgeFilterUL);
    filtersDOM.append(badgeFilterDiv);
  } else {
    badgeFilterUL = document.querySelector("#badge-filter-ul");
  }

  badgeSelectLI = document.createElement("li");
  badgeFilterIconClose = document.createElement("i");

  badgeSelectLI.textContent = selectedLinkTag;

  badgeSelectLI.classList.add(
    "col-2",
    "badge",
    "text-black",
    "p-3",
    "badge-li",
    "mx-2"
  );

  badgeFilterIconClose.classList.add("bi", "bi-x", "btn-close-badge-filter");

  badgeSelectLI.append(badgeFilterIconClose);
  badgeFilterUL.append(badgeSelectLI);

  badgeFilterIconClose.addEventListener("click", (ev) => {
    ev.preventDefault();
    badgeFilterIconCloseEvent(badgeSelectLI);
  });
};

const badgeFilterIconCloseEvent = (badgeSelectLI) => {
  let tagArr = JSON.parse(localStorage.getItem("_tags"));
  tagArr.splice(tagArr.indexOf(badgeSelectLI.textContent), 1);

  localStorage.setItem("_tags", JSON.stringify(tagArr));
  badgeSelectLI.remove();

  const recipeToDisplay = handleRecipesByTag();
  localStorage.setItem("_recipeResults", JSON.stringify(recipeToDisplay));
  displayRecipes();
  loadSelect();
};

/**
 * Badge Factory
 * @param {string} selectedLIText
 */
export const badgeFilterFactory = (selectedLIText) => {
  const filtersDOM = document.querySelector("#filters");

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

  badgeSelectLI.textContent = selectedLIText;

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
    badgeFilterIconCloseEvent(ev, badgeSelectLI.textContent);
  });
};

const badgeFilterIconCloseEvent = (ev, badgeFilter) => {
  console.log(ev, badgeFilter);
  //displayResult(totalRecipes);
};

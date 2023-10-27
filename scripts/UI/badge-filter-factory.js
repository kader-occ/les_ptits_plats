let count = 0;

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

  if (count < 1) {
    badgeSelectLI = document.createElement("li");
    badgeSelectLI.textContent = selectedLIText;
    badgeFilterIconClose = document.createElement("i");
    badgeFilterIconClose.classList.add("bi", "bi-x", "btn-close-badge-filter");
    badgeFilterDiv = document.createElement("div");
    badgeFilterUL = document.createElement("ul");
    badgeFilterDiv.id = "badge-filter";
    badgeFilterDiv.classList.add("row", "mt-5");
    badgeFilterUL.id = "badge-filter-ul";
  } else {
    badgeSelectLI = document.querySelector(".badge-li");
    badgeFilterIconClose = document.querySelector(".btn-close-badge-filter");
    badgeFilterDiv = document.querySelector("#badge-filter");
    badgeFilterUL = document.querySelector("#badge-filter-ul");
  }

  badgeSelectLI.classList.add(
    "col-2",
    "badge",
    "text-black",
    "p-3",
    "badge-li"
  );
  badgeFilterDiv.append(badgeFilterUL);
  badgeSelectLI.append(badgeFilterIconClose);
  badgeFilterUL.append(badgeSelectLI);
  filtersDOM.append(badgeFilterDiv);

  badgeFilterIconClose.addEventListener("click", (ev) => {
    ev.preventDefault();
    badgeFilterIconCloseEvent(ev, badgeSelectLI.textContent);
  });

  count++;
};

const badgeFilterIconCloseEvent = (ev, badgeFilter) => {
  console.log(ev, badgeFilter);
  //displayResult(totalRecipes);
};

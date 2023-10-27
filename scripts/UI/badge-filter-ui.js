let count = 0;

export const createBadgeFilter = (selectedLIText) => {
  const filtersDOM = document.querySelector("#filters");

  const badgeSelectLI = document.createElement("li");
  badgeSelectLI.textContent = selectedLIText;

  const badgeFilterIconClose = document.createElement("i");
  badgeFilterIconClose.classList.add("bi", "bi-x", "btn-close-badge-filter");

  const badgeFilterDiv = document.createElement("div");
  const badgeFilterUL = document.createElement("ul");

  badgeFilterDiv.id = "badge-filter";
  badgeFilterDiv.classList.add("row", "mt-5");
  badgeFilterUL.id = "badge-filter-ul";

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

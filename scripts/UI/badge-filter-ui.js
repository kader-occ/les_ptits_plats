let count = 0;

export const createBadgeFilter = (selectedLI) => {
  const filtersDOM = document.querySelector("#filters");
  const badgeFilterIconClose = document.createElement("i");

  console.log(selectedLI);

  badgeFilterIconClose.classList.add("bi", "bi-x");

  selectedLI.append(badgeFilterIconClose);

  let badgeFilterDiv;
  let badgeFilterUL;

  if (count < 1) {
    badgeFilterDiv = document.createElement("div");
    badgeFilterUL = document.createElement("ul");
    badgeFilterDiv.id = "badge-filter";
    badgeFilterDiv.classList.add("row", "mt-5");
    badgeFilterUL.id = "badge-filter-ul";
  } else {
    badgeFilterDiv = document.querySelector("#badge-filter");
    badgeFilterUL = document.querySelector("#badge-filter-ul");
  }

  selectedLI.classList.add("col-2", "badge", "text-black", "mx-1", "my-1");

  badgeFilterDiv.append(badgeFilterUL);
  badgeFilterUL.append(selectedLI);
  filtersDOM.append(badgeFilterDiv);

  count++;
};

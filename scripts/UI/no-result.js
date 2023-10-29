export const noResult = (searchKeywords) => {
  const mainDom = document.querySelector("main");

  const noResultDom = document.createElement("h2");
  noResultDom.id = "no-results";
  noResultDom.className = "my-5 text-center";
  noResultDom.textContent =
    "Aucune recette contient " + searchKeywords + "ou les tags selectionnés";
  mainDom.append(noResultDom);
};

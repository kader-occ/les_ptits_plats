import { totalRecipes } from "../../data/recipes.js";

onload = () => {
  console.log(totalRecipes);

  const searchInput = document.querySelector("#search-input");
  const btnSubmitSearchForm = document.querySelector("#search-form-btn-submit");
  const totalRecipesDom = document.querySelector("#recipes-numbers");

  searchInput.addEventListener("keypress", (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
    }
  });

  btnSubmitSearchForm.addEventListener("click", (ev) => {
    ev.preventDefault();
  });

  searchInput.addEventListener("keyup", () => {
    if (searchInput.value.length < 3) {
      displayResult(totalRecipes);
    }
    if (searchInput.value.length >= 3) {
      const recipeArr = getRecipes(searchInput.value);
      displayResult(recipeArr);
    }
  });

  /**
   * Fonction qui affiche le resultat de la recherche
   * @param {Array} recipeArr
   */
  const displayResult = (recipeArr) => {
    const mainDom = document.querySelector("main");

    totalRecipesDom.textContent = recipeArr.length;

    // Scénario alternatif A1 (Aucun resultat trouvé)
    if (recipeArr.length === 0 && !document.querySelector("#no-results")) {
      const noResultDom = document.createElement("h2");
      noResultDom.id = "no-results";
      noResultDom.className = "my-5 text-center";
      noResultDom.textContent = "Aucune recette contient " + searchInput.value;
      mainDom.append(noResultDom);
    }
  };

  //Fonction recupere recette(s) selon mot(s)-clé(s)
  const getRecipes = (searchKeywords) => {
    return totalRecipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase() === searchKeywords ||
        recipe.ingredients.includes(searchKeywords) ||
        recipe.description.includes(searchKeywords)
      );
    });
  };

  displayResult(totalRecipes);
};

import { totalRecipes } from "../../data/recipes.js";
import { displayRecipes } from "./UI/display-recipes.js";
import { filterRecipesByKeywords } from "./UI/filter-recipes.js";
import { selectAppareilFactory } from "./UI/select-appareil-factory.js";
import { selectIngredientFactory } from "./UI/select-ingredient-factory.js";
import { selectUstensileFactory } from "./UI/select-ustensile-factory.js";

onload = () => {
  localStorage.setItem("_recipeResults", JSON.stringify(totalRecipes));
  localStorage.removeItem("_tags");

  const searchInput = document.querySelector("#search-input");
  const btnSubmitSearchForm = document.querySelector("#search-form-btn-submit");

  searchInput.addEventListener("keypress", (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
    }
  });

  btnSubmitSearchForm.addEventListener("click", (ev) => {
    ev.preventDefault();
  });

  searchInput.addEventListener("keyup", () => {
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
    const btnResetSearchForm = document.querySelector("#btn-reset-search-form");
    const mainDom = document.querySelector("main");
    const resultsDom = document.querySelector("#recipe-result-search");
    const recipeCards = document.getElementsByClassName("recipe-card");

    if (recipeArr.length < totalRecipes.length) {
      removeHtmlElement(recipeCards);
      btnResetSearchForm.classList.remove("d-none");
    }

    totalRecipesDom.textContent = recipeArr.length;

    // Scénario alternatif A1 (Aucun resultat trouvé)
    if (recipeArr.length === 0 && !document.querySelector("#no-results")) {
      const noResultDom = document.createElement("h2");
      noResultDom.id = "no-results";
      noResultDom.className = "my-5 text-center";
      noResultDom.textContent = "Aucune recette contient " + searchInput.value;
      mainDom.append(noResultDom);
    } else {
      // Scénario alternatif A2
      const noResultDom = document.querySelector("#no-results");
      if (noResultDom) {
        noResultDom.remove();
      }
      recipeArr.map((recipe) => {
        const recipeCard = cardRecipeFactory(recipe);
        resultsDom.append(recipeCard);
        mainDom.append(resultsDom);
      });

      btnResetSearchForm.addEventListener("click", (ev) => {
        ev.preventDefault();
        searchInput.value = "";
        btnResetSearchForm.classList.add("d-none");
        displayResult(totalRecipes);
      });
    }
  };

  //Version fonctionnelle recupere les recette(s) par tags
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

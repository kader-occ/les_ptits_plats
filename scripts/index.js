import { totalRecipes } from "../../data/recipes.js";
import { cardRecipeFactory } from "./UI/card-recipe-factory-ui.js";
import { removeHtmlElement } from "./utils/removeHtmlElement.js";

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

  //Version native recupere les recette(s) par tags
  const getRecipes = (searchKeywords) => {
    let recipeArr = [];
    totalRecipes.forEach((recipe) => {
      if (recipe.name.toLowerCase().includes(searchKeywords.toLowerCase())) {
        if (!recipeArr.includes(recipe)) {
          recipeArr.push(recipe);
        }
      }
      recipe.ingredients.forEach((ingredient) => {
        if (
          ingredient.ingredient
            .toLowerCase()
            .includes(searchKeywords.toLowerCase())
        ) {
          if (!recipeArr.includes(recipe)) {
            recipeArr.push(recipe);
          }
        }
      });
      if (
        recipe.description.toLowerCase().includes(searchKeywords.toLowerCase())
      ) {
        if (!recipeArr.includes(recipe)) {
          recipeArr.push(recipe);
        }
      }
    });
    return recipeArr;
  };

  displayResult(totalRecipes);
};

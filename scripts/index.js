import { totalRecipes } from "../../data/recipes.js";
import { cardRecipeFactory } from "./UI/card-recipe-factory-ui.js";
import { handleSelect } from "./UI/select-filter-ui.js";
import { removeHtmlElement } from "./utils/removeHtmlElement.js";

onload = () => {
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
    } else {
      const recipeArr = getRecipes(searchInput.value);
      displayResult(recipeArr);
    }
  });

  /**
   * Fonction qui affiche le resultat de la recherche
   * @param {Array} recipeArr
   */
  const displayResult = (recipeArr) => {
    const btnResetHeaderSearchForm = document.querySelector(
      "#btn-reset-header-search-form"
    );
    const mainDom = document.querySelector("main");
    const resultsDom = document.querySelector("#recipe-result-search");
    const recipeCards = document.getElementsByClassName("recipe-card");
    const ingredientSelectBox = document.querySelector(
      "#ingredient-select-box"
    );
    const appareilSelectBox = document.querySelector("#appareil-select-box");
    const ustensileSelectBox = document.querySelector("#ustensile-select-box");

    if (recipeArr.length < totalRecipes.length) {
      removeHtmlElement(recipeCards);
      btnResetHeaderSearchForm.classList.remove("d-none");
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

      btnResetHeaderSearchForm.addEventListener("click", (ev) => {
        ev.preventDefault();
        searchInput.value = "";
        btnResetHeaderSearchForm.classList.add("d-none");
        displayResult(totalRecipes);
      });

      ingredientSelectBox.addEventListener("click", (ev) => {
        ev.preventDefault();
        const ingredientResultDOM =
          document.querySelector("#ingredient-result");
        handleSelect(ev, ingredientResultDOM, "ingredients", recipeArr);
      });

      appareilSelectBox.addEventListener("click", (ev) => {
        ev.preventDefault();
        const appareilResultDOM = document.querySelector("#appareil-result");
        handleSelect(ev, appareilResultDOM, "appareils", recipeArr);
      });

      ustensileSelectBox.addEventListener("click", (ev) => {
        ev.preventDefault();
        const ustensileResultDOM = document.querySelector("#ustensile-result");
        handleSelect(ev, ustensileResultDOM, "ustensiles", recipeArr);
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

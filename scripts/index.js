import { totalRecipes } from "../../data/recipes.js";
import { displayRecipes } from "./UI/display-recipes.js";
import {
  filterRecipesByKeywords,
  handleRecipesByTagAppareil,
  handleRecipesByTagIngredient,
  handleRecipesByTagUstensile,
} from "./algo/filter-recipes.js";
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
      const recipeToDisplay = filterRecipesByKeywords(searchInput.value);
      localStorage.setItem("_recipeResults", JSON.stringify(recipeToDisplay));
      displayRecipes();
    } else {
      let tagArr = JSON.parse(localStorage.getItem("_tags"));
      if (tagArr) {
        let recipeToDisplay = [].concat(
          handleRecipesByTagIngredient(),
          handleRecipesByTagAppareil(),
          handleRecipesByTagUstensile()
        );
        recipeToDisplay = recipeToDisplay.filter((arr) => arr.length > 0);
        localStorage.setItem(
          "_recipeResults",
          JSON.stringify(recipeToDisplay[0])
        );
        displayRecipes();
      } else {
        localStorage.setItem("_recipeResults", JSON.stringify(totalRecipes));
        displayRecipes();
      }
    }
  });
  displayRecipes();
  loadSelect();
};

export const loadSelect = () => {
  const ingredientSelectBoxLink = document.querySelector(
    "#ingredient-select-box-link"
  );
  const appareilSelectBoxLink = document.querySelector(
    "#appareil-select-box-link"
  );
  const ustensileSelectBoxLink = document.querySelector(
    "#ustensile-select-box-link"
  );

  if (document.contains(document.getElementById("ingredient-result"))) {
    document.getElementById("ingredient-result").remove();
  }

  ingredientSelectBoxLink.addEventListener("click", () => {
    selectIngredientFactory();
  });

  appareilSelectBoxLink.addEventListener("click", () => {
    selectAppareilFactory();
  });

  ustensileSelectBoxLink.addEventListener("click", () => {
    selectUstensileFactory();
  });
};

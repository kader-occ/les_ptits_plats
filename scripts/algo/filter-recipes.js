import { toCapitalize } from "../utils/to-capitalize.js";
import { totalRecipes } from "../../data/recipes.js";

/**
 * Recherche les recettes dans Nom/Ingredient/Description
 * @param {string} searchKeywords
 * @returns
 */
export const filterRecipesByKeywords = (searchKeywords) => {
  let recipeToDisplay = [];
  totalRecipes.forEach((recipe) => {
    if (recipe.name.includes(searchKeywords.toLowerCase())) {
      recipeToDisplay.push(recipe);
    } else if (recipe.name.includes(toCapitalize(searchKeywords))) {
      recipeToDisplay.push(recipe);
    } else if (recipe.description.includes(searchKeywords.toLowerCase())) {
      recipeToDisplay.push(recipe);
    }
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.ingredient === toCapitalize(searchKeywords)) {
        recipeToDisplay.push(recipe);
      }
    });
  });
  return recipeToDisplay;
};

/**
 * Filtre Ingredient
 * @param {string} keyword
 * @returns
 */
export const filterRecipesByIngredient = (keyword) => {
  let recipeResults = JSON.parse(localStorage.getItem("_recipeResults"));
  let recipeToDisplay = [];
  recipeResults.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.ingredient === toCapitalize(keyword)) {
        recipeToDisplay.push(recipe);
      } else if (ingredient.ingredient === keyword) {
        recipeToDisplay.push(recipe);
      } else if (ingredient.ingredient.includes(keyword)) {
        recipeToDisplay.push(recipe);
      }
    });
  });
  return recipeToDisplay;
};

/**
 * Filtre Appareil
 * @param {string} keyword
 * @returns
 */
export const filterRecipesByAppareil = (keyword) => {
  let recipeResults = JSON.parse(localStorage.getItem("_recipeResults"));
  let recipeToDisplay = [];
  recipeResults.forEach((recipe) => {
    if (recipe.appliance === keyword.toLowerCase()) {
      recipeToDisplay.push(recipe);
    } else if (recipe.appliance === keyword) {
      recipeToDisplay.push(recipe);
    } else if (recipe.appliance === toCapitalize(keyword)) {
      recipeToDisplay.push(recipe);
    }
  });
  return recipeToDisplay;
};

/**
 * Filtre Ustensile
 * @param {string} keyword
 * @returns
 */
export const filterRecipesByUstensile = (keyword) => {
  let recipeResults = JSON.parse(localStorage.getItem("_recipeResults"));
  let recipeToDisplay = [];

  recipeResults.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (ustensil === toCapitalize(keyword)) {
        recipeToDisplay.push(recipe);
      } else if (ustensil === keyword) {
        recipeToDisplay.push(recipe);
      } else if (ustensil.includes(keyword)) {
        recipeToDisplay.push(recipe);
      }
    });
  });
  return recipeToDisplay;
};

/**
 * Gestion des tags
 * @returns Array
 */
export const handleRecipesByTag = () => {
  let tagArr = JSON.parse(localStorage.getItem("_tags"));
  let recipeToDisplay = [];
  tagArr.forEach((tag) => {
    totalRecipes.forEach((recipe) => {
      if (recipe.name.includes(tag)) {
        recipeToDisplay.push(recipe);
      } else if (recipe.name.includes(toCapitalize(tag))) {
        recipeToDisplay.push(recipe);
      } else if (recipe.name.includes(tag.toLowerCase())) {
        recipeToDisplay.push(recipe);
      } else if (recipe.description.includes(tag)) {
        recipeToDisplay.push(recipe);
      }
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient === toCapitalize(tag)) {
          recipeToDisplay.push(recipe);
        } else if (ingredient.ingredient === tag) {
          recipeToDisplay.push(recipe);
        } else if (ingredient.ingredient.includes(tag)) {
          recipeToDisplay.push(recipe);
        }
      });
    });
  });
  return recipeToDisplay;
};

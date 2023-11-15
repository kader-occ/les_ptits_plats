import { toCapitalize } from "../utils/to-capitalize.js";
import { totalRecipes } from "../../data/recipes.js";

/**
 * Recherche les recettes dans Nom/Ingredient/Description
 * @param {string} searchKeywords
 * @returns
 */
export const filterRecipesByKeywords = (searchKeywords) => {
  let recipeToDisplay = [];
  for (let i = 0; i < totalRecipes.length; i++) {
    const recipe = totalRecipes[i];
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
  }
  return recipeToDisplay;
};

/**
 * Filtre Ingredient
 * @param {string} keyword
 * @returns
 */
export const filterRecipesByIngredient = (keyword, recipeArr) => {
  let recipeToDisplay = [];

  for (let i = 0; i < recipeArr.length; i++) {
    const recipe = recipeArr[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      if (ingredient.ingredient === toCapitalize(keyword)) {
        recipeToDisplay.push(recipe);
      } else if (ingredient.ingredient === keyword) {
        recipeToDisplay.push(recipe);
      } else if (ingredient.ingredient.includes(keyword)) {
        recipeToDisplay.push(recipe);
      }
    }
  }
  return recipeToDisplay;
};

/**
 * Filtre Appareil
 * @param {string} keyword
 * @returns
 */
export const filterRecipesByAppareil = (keyword, recipeArr) => {
  let recipeToDisplay = [];

  for (let i = 0; i < recipeArr.length; i++) {
    const recipe = recipeArr[i];
    if (recipe.appliance === keyword.toLowerCase()) {
      recipeToDisplay.push(recipe);
    } else if (recipe.appliance === keyword) {
      recipeToDisplay.push(recipe);
    } else if (recipe.appliance === toCapitalize(keyword)) {
      recipeToDisplay.push(recipe);
    }
  }
  return recipeToDisplay;
};

/**
 * Filtre Ustensile
 * @param {string} keyword
 * @returns
 */
export const filterRecipesByUstensile = (keyword, recipeArr) => {
  let recipeToDisplay = [];

  for (let i = 0; i < recipeArr.length; i++) {
    const recipe = recipeArr[i];
    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j];
      if (ustensil === toCapitalize(keyword)) {
        recipeToDisplay.push(recipe);
      } else if (ustensil === keyword) {
        recipeToDisplay.push(recipe);
      } else if (ustensil.includes(keyword)) {
        recipeToDisplay.push(recipe);
      }
    }
  }
  return recipeToDisplay;
};

/**
 * Gestion des tags
 * @returns Array
 */
export const handleRecipesByTag = () => {
  let tagArr = JSON.parse(localStorage.getItem("_tags"));
  for (let i = 0; i < tagArr.length; i++) {
    const tag = tagArr[i];
    return filterRecipesByIngredient(tag, totalRecipes).concat(
      filterRecipesByAppareil(tag, totalRecipes),
      filterRecipesByUstensile(tag, totalRecipes)
    );
  }
};

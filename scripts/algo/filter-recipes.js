import { toCapitalize } from "../utils/to-capitalize.js";
import { totalRecipes } from "../../data/recipes.js";

/**
 * Recherche les recettes dans Nom/Ingredient/Description
 * @param {string} searchKeywords
 * @returns
 */
export const filterRecipesByKeywords = (searchKeywords) => {
  return totalRecipes.filter((recipe) => {
    return (
      recipe.name.includes(searchKeywords.toLowerCase()) ||
      recipe.name.includes(toCapitalize(searchKeywords)) ||
      recipe.description.includes(searchKeywords.toLowerCase()) ||
      recipe.ingredients.find((ingredient) => {
        return ingredient.ingredient === toCapitalize(searchKeywords);
      })
    );
  });
};

/**
 *Filtre Ingredient
 * @param {string} keyword
 * @returns
 */
export const filterRecipesByIngredient = (keyword, recipeArr) => {
  return recipeArr.filter((recipe) => {
    return recipe.ingredients.find((ingredient) => {
      return (
        ingredient.ingredient === toCapitalize(keyword) ||
        ingredient.ingredient === keyword ||
        ingredient.ingredient.includes(keyword)
      );
    });
  });
};

/**
 * Filtre Appareil
 * @param {string} keyword
 * @returns
 */
export const filterRecipesByAppareil = (keyword, recipeArr) => {
  return recipeArr.filter((recipe) => {
    return (
      recipe.appliance === keyword.toLowerCase() ||
      recipe.appliance === keyword ||
      recipe.appliance === toCapitalize(keyword)
    );
  });
};

/**
 * Filtre Ustensile
 * @param {string} keyword
 * @returns
 */
export const filterRecipesByUstensile = (keyword, recipeArr) => {
  return recipeArr.filter((recipe) => {
    return recipe.ustensils.find((ustensil) => {
      return (
        ustensil === toCapitalize(keyword) ||
        ustensil === keyword ||
        ustensil.includes(keyword)
      );
    });
  });
};

/**
 * Gestion des tags
 * @returns Array
 */
export const handleRecipesByTag = () => {
  let tagArr = JSON.parse(localStorage.getItem("_tags"));
  return tagArr.map((tag) => {
    return filterRecipesByIngredient(tag, totalRecipes).concat(
      filterRecipesByAppareil(tag, totalRecipes),
      filterRecipesByUstensile(tag, totalRecipes)
    );
  });
};

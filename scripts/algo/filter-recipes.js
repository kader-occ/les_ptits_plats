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
      (recipe.description.includes(toCapitalize(searchKeywords)) &&
        recipe.ingredients.map((ingredient) => {
          return (
            ingredient.ingredient.includes(searchKeywords.toLowerCase()) ||
            ingredient.ingredient.includes(toCapitalize(searchKeywords))
          );
        }))
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
        ingredient.ingredient === keyword.toLowerCase() ||
        ingredient.ingredient === toCapitalize(keyword) ||
        ingredient.ingredient.includes(keyword.toLowerCase()) ||
        ingredient.ingredient.includes(toCapitalize(keyword))
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
        ustensil === keyword.toLowerCase() ||
        ustensil === toCapitalize(keyword) ||
        ustensil.includes(keyword.toLowerCase()) ||
        ustensil.includes(toCapitalize(keyword))
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
    return (
      filterRecipesByIngredient(tag, totalRecipes) ||
      filterRecipesByAppareil(tag, totalRecipes) ||
      filterRecipesByUstensile(tag, totalRecipes)
    );
  });
};

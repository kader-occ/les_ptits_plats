import { toCapitalize } from "../utils/to-capitalize.js";
import { totalRecipes } from "../../data/recipes.js";

//Version fonctionnelle recupere les recettes par mot-clé
export const filterRecipesByKeywords = (searchKeywords) => {
  return totalRecipes.filter((recipe) => {
    return (
      recipe.name.includes(searchKeywords.toLowerCase()) ||
      recipe.name.includes(toCapitalize(searchKeywords)) ||
      recipe.ingredients.includes(toCapitalize(searchKeywords)) ||
      recipe.description.includes(searchKeywords.toLowerCase())
    );
  });
};

/*
let arrTag = [];

export const filterRecipesByTag = (tag) => {
  arrTag.push(tag);

  return totalRecipes.filter((recipe) => {
    return (
      recipe.name.includes(tag) ||
      recipe.name.includes(arrTag) ||
      recipe.ingredients.includes(arrTag) ||
      recipe.description.includes(tag)
    );
  });
};

export const filterIngredientByKeyword = (searchKeywords) => {
  let recipeArr = JSON.parse(localStorage.getItem("_recipeResults"));
  return recipeArr.filter((recipe) => {
    return recipe.ingredients.includes(searchKeywords.toLowerCase());
  });
};
*/

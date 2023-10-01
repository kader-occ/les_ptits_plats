import { totalRecipes } from "../../data/recipes.js";

//Version fonctionnelle recupere les recettes par tags
export const filterRecipesByKeywords = (searchKeywords) => {
  searchKeywords = searchKeywords.toLowerCase();
  return totalRecipes.filter((recipe) => {
    return (
      recipe.name.includes(searchKeywords) ||
      recipe.ingredients.includes(searchKeywords) ||
      recipe.description.includes(searchKeywords)
    );
  });
};

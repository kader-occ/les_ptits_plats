import { toCapitalize } from "../utils/to-capitalize.js";

//Card factory
export const cardRecipeFactory = (recipe) => {
  const recipeCard = document.createElement("article");
  const recipeName = document.createElement("p");
  const recipeIMG = document.createElement("img");
  const recipeTimeDiv = document.createElement("div");
  const recipeTime = document.createElement("p");
  const cardContent = document.createElement("div");
  const imgPath = `/assets/images/`;

  recipeCard.className = "recipe-card";
  recipeName.className = "recipe-name";
  recipeIMG.className = "recipe-img";
  recipeTimeDiv.className = "recipe-time-div";
  recipeTime.className = "recipe-time-p";
  cardContent.className = "card-content";

  recipeName.textContent = recipe.name;
  recipeIMG.setAttribute("src", imgPath + recipe.image);
  recipeTime.textContent = recipe.time + " min";

  const recipeLabel = document.createElement("p");
  recipeLabel.className = "recipe-label my-3";
  recipeLabel.textContent = "Recette";

  const recipeDescription = document.createElement("p");
  recipeDescription.className = "recipe-description";
  recipeDescription.textContent = recipe.description;

  const recipeIngredientLabel = document.createElement("p");
  recipeIngredientLabel.className = "recipe-label mt-5";
  recipeIngredientLabel.textContent = "Ingrédients";

  recipeTimeDiv.append(recipeTime);
  recipeCard.append(recipeTimeDiv);
  recipeCard.append(recipeIMG);

  cardContent.append(recipeName);
  cardContent.append(recipeLabel);
  cardContent.append(recipeDescription);
  cardContent.append(recipeIngredientLabel);

  const row = document.createElement("div");
  row.id = "recipe-ingredient";

  recipe.ingredients.map((ingredient) => {
    const col6 = document.createElement("div");
    const ingredientDom = document.createElement("p");
    const quantityDom = document.createElement("p");
    const unitDom = document.createElement("p");

    row.className = "row";
    col6.className = "col-6 my-2";

    ingredientDom.className = "ingredient";
    quantityDom.className = "ingredient-quantity";
    unitDom.className = "ingredient-unit";

    if (ingredient.unit) {
      quantityDom.textContent = ingredient.quantity + " " + ingredient.unit;
    } else {
      quantityDom.textContent = ingredient.quantity;
    }

    ingredientDom.textContent = toCapitalize(ingredient.ingredient);

    col6.append(ingredientDom);
    col6.append(quantityDom);
    row.append(col6);
  });

  cardContent.append(row);

  recipeCard.append(cardContent);

  return recipeCard;
};

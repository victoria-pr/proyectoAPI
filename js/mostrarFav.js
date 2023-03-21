import { getRecipes, deleteRecipe } from "./favourite.js";

function showFavourites(favourites) {
  let favouritesSection = document.getElementById("resulta2");
  
  favourites.forEach((favourite) => {
    let recipeSection = document.createElement("div");

    let recipeName = document.createElement("h3");
    recipeName.innerText = favourite.name;

    let recipeImage = document.createElement("img");
    recipeImage.src = favourite.image;

    let ingredientList = document.createElement("ul");
    favourite.ingredients.forEach((ingredient) => { 
      let eachIngredient = document.createElement("li");
      eachIngredient.innerText = ingredient.text;
      ingredientList.appendChild(eachIngredient);
    });

    let recipeURL = document.createElement("a");
    recipeURL.textContent = "You can find the full recipe here";
    recipeURL.target = "_blank";
    recipeURL.href = favourite.urlReceta;

    let deleteButton = document.createElement("button")
    deleteButton.innerText = "remove";
    deleteButton.addEventListener("click",() => {
      deleteRecipe(favourite)
      recipeSection.remove();
    });
 
    let space1 = document.createElement("br");


    recipeURL.target = "_blank";
    recipeSection.appendChild(recipeName);
    recipeSection.appendChild(recipeImage);
    recipeSection.appendChild(ingredientList);
    recipeSection.appendChild(deleteButton);
    recipeSection.appendChild(space1);
    recipeSection.appendChild(recipeURL);
    

    favouritesSection.appendChild(recipeSection);
  });
}

let favourites = getRecipes();
showFavourites(favourites);
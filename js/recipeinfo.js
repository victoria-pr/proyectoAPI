import {addRecipe as favAddRecipes} from "./favourite.js";

async function getData(url){
    let recipe = await fetch(url.toString())
    .then(response => response.json())
    .then(data => {
        console.log(data);
      return{
            name: data.recipe.label,
            image: data.recipe.image,
            ingredients: data.recipe.ingredients,
            urlReceta: data.recipe.url
          };
        })
        console.log(recipe);
    return recipe;
  }

function createBaseUrl(id){
    let url = new URL ("https://api.edamam.com/api/recipes/v2/"+ id)
    url.searchParams.set("type", "public")
    url.searchParams.set("app_id", "8f1116ed")
    url.searchParams.set("app_key", "b96244302b4b890f50c42ac76c664430")
    return url;
}

async function oneRecipe(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    let recipeUrl = createBaseUrl(id);
    let recipe = await getData(recipeUrl);
    showData(recipe)
}

function showData(recipe){
  let recipeSection = document.getElementById("infoRecipe")
  recipeSection.style.display = "none"
  
  let recipename = document.createElement("h3");
  
  let recipeimage = document.createElement("img");
  recipeimage.onload = function(){
    recipeSection.style.display="block";
}
  let ingredientList = document.createElement("ul");

  let favouriteButton = document.createElement("button")
  favouriteButton.innerText = "favourite";
  favouriteButton.addEventListener("click",() => favAddRecipes(recipe)); 

  let sourceButton = document.createElement("button")

  let recipeURL = document.createElement("a");
  recipeURL.textContent = "Source";
  recipeURL.target = "_blank";

  recipename.innerText = recipe.name;
  recipeimage.src = recipe.image;
  recipeURL.href = recipe.urlReceta;


  recipe.ingredients.forEach(ingredient => {
    let eachIngredient =document.createElement("li");
    eachIngredient.innerText = ingredient.text;
    ingredientList.appendChild(eachIngredient);
  });
    
  recipeSection.appendChild(recipename);
  recipeSection.appendChild(recipeimage);
  recipeSection.appendChild(ingredientList);
  recipeSection.appendChild(favouriteButton);
  recipeSection.appendChild(recipeURL)

};
oneRecipe();
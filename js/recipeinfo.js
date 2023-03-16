/* import {getRecipes, addRecipe, deleteRecipe} from "./favourite"; */


//una vez creada la imagen, hay que ponerle un listener [recipeImagen.addEventListener("click",() => menuAddRecipe(recipe))]

async function getData(url){
    let recipe = await fetch(url.toString())
    .then(response => response.json())
    .then(data => {
        console.log(data);
      return{
            name: data.recipe.label,
            image: data.recipe.image,
            url: data.recipe.url, //no lo estoy usando aún
            ingredients: data.recipe.ingredientLines
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
    let recipename = document.createElement("h3");
    let recipeimage = document.createElement("img");
    let recipeUrl = document.createElement("a");
    let ingredientList = document.createElement("li");
   


    recipename.innerText = recipe.name;
    recipeimage.src = recipe.image;
    recipeUrl.href = recipe.url;
    ingredientList.innerText = recipe.ingredients;
    
    /* recipeimage.addEventListener("click",() => favAddRecipes(recipe)); */

    recipeSection.appendChild(recipename);
    recipeSection.appendChild(recipeimage);
    recipeSection.appendChild(recipeUrl);
    recipeSection.appendChild(ingredientList)

  };
  oneRecipe();

/* let url = createBaseUrl();

url.searchParams.set("mealType", "lunch/dinner")
url.searchParams.set("mealType", "breakfast")

console.log(url.toString())

console.log(url.searchParams.get("mealType"));

function createBaseUrl(){
    let url = new URL ("https://api.edamam.com/api/recipes/v2")
    url.searchParams.set("type", "public")
    url.searchParams.set("app_id", "8f1116ed")
    url.searchParams.set("app_key", "b96244302b4b890f50c42ac76c664430")
    url.searchParams.append("dishType", "sandwiches")

    return url;

} */

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener('click', () => { //ponemos el listener al boton con id="searchButton"
  let searchInput = document.getElementById("searchInput");
  let ingredients = searchInput.value.trim().toLowerCase();

  if(ingredients.length < 3){
    return; 
}
  searchSandwiches(ingredients);
});

function searchSandwiches(ingredients) {
    const type = "public";
    const appId = "8f1116ed"; //tanto apiId como apiKey se utilizan para autenticarse con la API de Edamam.
    const apiKey = "b96244302b4b890f50c42ac76c664430";
    const query =  ingredients; //es la consulta de búsqueda que se envia a la API
    const dishType = "Sandwiches"; //para asegurarme de obtener resultados de sándwiches.
    const url = `https://api.edamam.com/api/recipes/v2?type=${type}&q=${query}&app_id=${appId}&app_key=${apiKey}&dishType=${dishType}`;//->
    //->Se crea una URL de solicitud utilizando las constantes definidas y los ingredientes proporcionados como parámetros

    //https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}&dishType=${dishType}

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const hits = data.hits;
      const resultadosSection = document.getElementById("resultados");
      resultadosSection.innerHTML ="";

      hits.forEach(hit => {
        let recetaDiv = document.createElement("div");
        recetaDiv.style.display = "none"

        let nombreReceta = document.createElement("h3");
        nombreReceta.innerText = hit.recipe.label;

        let imagenReceta = document.createElement("img");
        imagenReceta.onload = function(){
            recetaDiv.style.display="block";
        }
        imagenReceta.src = hit.recipe.image;

        let cantidadIngredientes = document.createElement("p");
        cantidadIngredientes.innerText = "Ingredients:" +hit.recipe.ingredients.length;

        let urlSource = document.createElement("a");
        urlSource.href = hit.recipe.url;
        urlSource.setAttribute("target", "_blank")


        let recipeUrl = document.createElement("a");
        let id = hit.recipe.uri.split("_")[1];
        recipeUrl.href = "recipeInfo.html?id=" + id ;


        recetaDiv.appendChild(nombreReceta);
        recipeUrl.appendChild(imagenReceta); //recipeUrl.appendChild(imagenReceta) -para que sea solo la imagen la q tenga el link
        recetaDiv.appendChild(recipeUrl)
        recetaDiv.appendChild(cantidadIngredientes);
        recetaDiv.appendChild(urlSource);
        urlSource.textContent = "+ info";
        resultadosSection.appendChild(recetaDiv);
      });
    })
    .catch(error => console.error(error));
}


        //MOSTRAR LA LISTA DE INGREDIENTES

                /* let ingredientList = document.createElement("li");
        ingredientList.innerText = hit.recipe.ingredientLines; */



        /* recetaDiv.appendChild(ingredientList) */


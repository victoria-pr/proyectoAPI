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
    const appId = "8f1116ed"; //tanto apiId como apiKey se utilizan para autenticarse con la API de Edamam.
    const apiKey = "b96244302b4b890f50c42ac76c664430";
    const query =  ingredients; //es la consulta de búsqueda que se envia a la API y agrego "sandwich" para asegurarme de obtener resultados de sandwiches
    const dishType = "Sandwiches"; //para asegurarme de obtener resultados de sándwiches.
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}&dishType=${dishType}`;//->
    //->Se crea una URL de solicitud utilizando las constantes definidas y los ingredientes proporcionados como parámetros

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
        nombreReceta.textContent = hit.recipe.label;

        let imagenReceta = document.createElement("img");
        imagenReceta.onload = function(){
            recetaDiv.style.display="block";
        }
        imagenReceta.src = hit.recipe.image;

       /*  let listaIngredientes = document.createElement("li");
        listaIngredientes.textContent = hit.recipe.ingredientLines; */

        let cantidadIngredientes = document.createElement("p");
        cantidadIngredientes.textContent = "Ingredients:" +hit.recipe.ingredients.length;

        let urlReceta = document.createElement("a");
        urlReceta.href = hit.recipe.url;
        
        recetaDiv.appendChild(nombreReceta);
        recetaDiv.appendChild(imagenReceta);
        recetaDiv.appendChild(cantidadIngredientes);
        recetaDiv.appendChild(urlReceta);
        /* recetaDiv.appendChild(listaIngredientes); */
        urlReceta.textContent = "Source";
        resultadosSection.appendChild(recetaDiv);
      });
    })
    .catch(error => console.error(error));
}
function createUrl() {
    const appId = "8f1116ed"; 
    const apiKey = "b96244302b4b890f50c42ac76c664430";
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}&dishType=${dishType}`;
}


function showRecipe(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id")


    createRecipe();
}

function createRecipe(recipe){

}

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const hits = data.hits;

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
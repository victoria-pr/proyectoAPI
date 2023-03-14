
let url = createBaseUrl();

url.searchParams.set("type", "public")
url.searchParams.set("mealType", "lunch/dinner")
url.searchParams.set("mealType", "breakfast")

console.log(url.toString())

let query = document.getElementById("buscador").value;
let url = createURLVeganMainCourseSearch(query);
getRecipes(url);

function getRecipes(url){
    fetch(url.toString()).then (response => response.json()).then (data => console.log)
    url.searchParams.append()
    //FALTA ALGO
}


function createURLVeganMainCourseSearch(query){
    let url =createURLVeganMainCourse();
    url.searchParams.append("q", query);
}

function createURLVeganMainCourse(){
    let url = createBaseUrl();
    url.searchParams.append("heal", "vegan");
    url.searchParams.append("dishType", "main course");
    return url;
}

function createBaseUrl(){
    let url = new URL ("https://api.edamam.com/api/recipes/v2")
    url.searchParams.set("app_id", "8f1116ed")
    url.searchParams.set("app_key", "b96244302b4b890f50c42ac76c664430")
    url.searchParams.append("health", "vegan")

    return url;
}

/*fetch(url.toString()).then (response => response.json()).then (data => console.log)*/
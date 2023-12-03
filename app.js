function randomMeals() {
    for (let i=0; i<4; i++) {
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(response => response.json()).then(data => {
            let html1 = ""
            data.meals.forEach(meal => {
                html1 += `
                    <div class="meal-card" data-id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" alt="" width="auto">
                        <h4>${meal.strMeal}</h4>
                        <a href="">View recipe</a>
                    </div>
                `
            })
            document.querySelector('#main .category .main-grid').innerHTML += html1;
        })
    }
}

let searchBtn = document.querySelector('#header .navbar a')
let recipeBtn = document.querySelector('#main .category .main-grid .meal-card')

searchBtn.addEventListener('click', getMealList)
recipeBtn.addEventListener('click', getRecipe)

function getMealList() {
    let randomRecipeText = document.querySelector('#main .category .random-recipe')
    let searchInputVal = document.querySelector('#header .navbar input').value
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputVal}`).then(response => response.json()).then(data => {
        console.log(data)
        let mealResult = ""
        if (data.meals) {
            randomRecipeText.innerHTML = `${searchInputVal}`
            data.meals.forEach(meal => {
                mealResult += `
                    <div class="meal-card" data-id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" alt="" width="auto">
                        <h4>${meal.strMeal}</h4>
                        <a>View recipe</a>
                    </div>
                `
            })
        } else {
            randomRecipeText.style.display = "none"
            mealResult = "Sorry, we couldn't find any meal."
        }
        document.querySelector('#main .category .main-grid').innerHTML = mealResult;
    })
}
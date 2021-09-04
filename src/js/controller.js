const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

const showRecipe = async function () {
    try {
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc990`
        );

        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        // console.log(res, data);
        //recipe object property change and give a nice name to understand
        let { recipe } = data.data;
        //now create new recipe object based on that
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
        console.log(recipe);
    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }
};
showRecipe();

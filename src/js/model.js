import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJson } from './helpers';
getJson;
export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJson(`${API_URL}/${id}`);

        //recipe object property change and give a nice name to understand
        const { recipe } = data.data;
        //now create new recipe object based on that
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
        console.log(state.recipe);
    } catch (err) {
        //Temp Error Handling
        // console.error(`${err} 🚨🚨🚨`);
        throw err;
    }
};

export const loadSearchResult = async function (query) {
    try {
        state.search.query = query;
        const data = await getJson(`${API_URL}?search=${query}`);
        // console.log(data);
        state.search.results = data.data.recipes.map(ing => {
            return {
                id: ing.id,
                image: ing.image_url,
                publisher: ing.publisher,
                title: ing.title,
            };
        });
        console.log(state.search
        );
    } catch (err) {
        throw err;
    }
};


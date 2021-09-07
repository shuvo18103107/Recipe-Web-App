import { async } from 'regenerator-runtime';
import { API_URL, END, RES_PER_PAGE, START } from './config';
import { getJson } from './helpers';
import { getJson } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultPerPage: RES_PER_PAGE,
    },
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
    } catch (err) {
        throw err;
    }
};

export const getSearchResultPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultPerPage;
    const end = page * state.search.resultPerPage;
    return state.search.results.slice(start, end);
};

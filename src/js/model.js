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
    bookMarks: [],
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
        //click korar por load hole to bookmark thake na new object set hoi tai jate bookmark identify kora jai tai array te check diye true kore dibo
        if (state.bookMarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookMarked = true;
        } else {
            state.recipe.bookMarked = false;
        }
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

        state.search.page = 1;
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

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        //newQuantity = (oldquantity*newServings)/oldservings
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });
    state.recipe.servings = newServings;
};

export const adBookMark = function (recipe) {
    //Add recipe object - adding bookmark
    state.bookMarks.push(recipe);

    //Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) {
        state.recipe.bookMarked = true;
    }
};

export const deleteBookMark = function (id) {
    //delete bookmark
    const index = state.bookMarks.findIndex(el => el.id === id);
    state.bookMarks.splice(index, 1);
    //Mark current recipe as not bookmarked
    if (id === state.recipe.id) {
        state.recipe.bookMarked = false;
    }

}
import { async } from 'regenerator-runtime';
import { API_URL, END, KEY, RES_PER_PAGE, START } from './config';
// import { getJson, sendJson } from './helpers';
import { AJAX } from './helpers';

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
const createRecipeObject = function (data) { //recipe object property change and give a nice name to understand
    const { recipe } = data.data;
    //now create new recipe object based on that
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        //trick for conditionally add proprties to an object
        ...(recipe.key && { key: recipe.key })
        //key:recipe.key if key exist
    };

}
export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

        state.recipe = createRecipeObject(data);

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
        //using key in query loadd the result including our own key 
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        // console.log(data);
        state.search.results = data.data.recipes.map(ing => {
            return {
                id: ing.id,
                image: ing.image_url,
                publisher: ing.publisher,
                title: ing.title,
                //result objects gula amader key sohoi fetch hoi tai key thakle proprty te add korbo na thakle na
                ...(ing.key && { key: ing.key })
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

const persistBookMark = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks))
}
export const adBookMark = function (recipe) {
    //Add recipe object - adding bookmark
    state.bookMarks.push(recipe);

    //Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) {
        state.recipe.bookMarked = true;
        persistBookMark();
    }
};

export const deleteBookMark = function (id) {
    //delete bookmark
    const index = state.bookMarks.findIndex(el => el.id === id);
    state.bookMarks.splice(index, 1);
    //Mark current recipe as not bookmarked
    if (id === state.recipe.id) {
        //false r true ta view render e help kore
        state.recipe.bookMarked = false;
        persistBookMark();

    }
};

const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookMarks = JSON.parse(storage);
}
init();


//clear all bookmarks for developing purpous 
const clearBookMarks = function () {
    localStorage.clear('bookmarks')
}
// clearBookMarks();
export const uploadRecipe = async function (newRecipe) {
    try {
        //goal: make this object same as the Api object pattern

        //1. take the ingredients data and put them into a object
        const ingredients = Object.entries(newRecipe).filter(entry => {
            return entry[0].startsWith('ingredient') && entry[1] !== ''
        }).map(ing => {
            const ingArr = ing[1].split(',').map(el => el.trim());
            if (ingArr.length !== 3) throw new Error('Wrong Ingredient Format! Please Use the correct format :)')
            const [quantity, unit, description] = ingArr;
            return {
                quantity: quantity ? +quantity : null, unit, description
            };

        })
        console.log(ingredients);
        //create object for the API
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients


        }
        // console.log(recipe );
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        //get our post data from the API
        console.log(data);
        //add to recipe object
        state.recipe = createRecipeObject(data);
        //added to bookmark


    }
    catch (err) {
        throw err;
    }

}






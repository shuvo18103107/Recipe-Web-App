import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

//import assets so that parcel can get it

//by this most old browser can render our app
//this one polyfilling everything
import 'core-js/stable';
//this one polyfilling asybc await and updated all js feature to old browsers
import 'regenerator-runtime/runtime';
import searchView from './views/searchView';
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    //1.loading recipe
    await model.loadRecipe(id);
    //as we call a async function that returns a promise so we have to await if we declare any async function

    //2. rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError()
    // alert(err.message);
    console.log(err.message);
  }
};

const controlSearchResults = async function () {
  try {
    //get search query
    const query = searchView.getQuery()
    if (!query) return;
    // load search results
    await model.loadSearchResult(query)
    //render results
    console.log(model.state.search.results);

  }
  catch (err) {
    console.log(err);
  }
}
//Event handlers technique in MVC using publisher subscriber design pattern
const init = function () {
  recipeView.adhandlerRender(controlRecipes);
  searchView.adhandlerSearch(controlSearchResults)
}
init()

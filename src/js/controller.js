import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';

//import assets so that parcel can get it

//by this most old browser can render our app
//this one polyfilling everything
import 'core-js/stable';
//this one polyfilling asybc await and updated all js feature to old browsers
import 'regenerator-runtime/runtime';
import searchView from './views/searchView';
import paginationView from './views/paginationView';
// //parcel hot reload
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    console.log(recipeView);
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
    //render spinner
    resultView.renderSpinner();

    //get search query
    const query = searchView.getQuery()
    if (!query) return;


    // load search results
    await model.loadSearchResult(query)
    //render results

    //render resultView
    resultView.render(model.getSearchResultPage())
    //render initial pagination

    paginationView.render(model.state.search)
  }
  catch (err) {
    resultView.renderError()
  }
}

const controlPagination = function (gotoPage) {
  //render resultView
  resultView.render(model.getSearchResultPage(gotoPage))
  //render initial pagination

  paginationView.render(model.state.search)

}

//Event handlers technique in MVC using publisher subscriber design pattern
const init = function () {
  recipeView.adhandlerRender(controlRecipes);
  searchView.adhandlerSearch(controlSearchResults);
  paginationView.adhandlerClick(controlPagination)

}
init()

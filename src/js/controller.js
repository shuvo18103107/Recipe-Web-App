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

import bookmarkView from './views/bookmarkView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';
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

    //update bookmarked for marker - cg url change hoile bookmark array er vitor loop chalaia je object er id er sathe url milbe setai marker dibo
    //update result view to mark selected search results- cg url change hole oi url er id er sathe current je object milbe setai markk thakbe
    resultView.update(model.getSearchResultPage());
    //update current dom er sathe compare kore dom update kore kintu current bookmarkview render hoi nai tai update kaj korbe na so age bookmark render korate hobe first e 
    bookmarkView.update(model.state.bookMarks);
    console.log(recipeView);
    //1.loading recipe
    await model.loadRecipe(id);
    //as we call a async function that returns a promise so we have to await if we declare any async function

    //2. rendering recipe
    recipeView.render(model.state.recipe);
    // console.log(model.state.bookMarks);
  } catch (err) {
    recipeView.renderError();
    // alert(err.message);
    console.log(err.message);
  }
};

const controlSearchResults = async function () {
  try {
    //render spinner
    resultView.renderSpinner();
    //get search query
    const query = searchView.getQuery();

    if (!query) return;

    // load search results
    await model.loadSearchResult(query);
    //render results

    //render resultView
    resultView.render(model.getSearchResultPage());
    //render initial pagination

    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError();
  }
};

const controlPagination = function (gotoPage) {
  //render resultView
  resultView.render(model.getSearchResultPage(gotoPage));
  //render initial pagination

  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  model.updateServings(newServing);
  // recipeView.render(model.state.recipe);
  //update the recipe serving in state
  recipeView.update(model.state.recipe);

  //update the view
};

const controlAddBookmarks = function () {
  if (!model.state.recipe.bookMarked) {
    model.adBookMark(model.state.recipe);
  } else {
    model.deleteBookMark(model.state.recipe.id);
  }
  // console.log(model.state.recipe);
  // console.log(model.state);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookMarks);
};

const controlBookMarks = function () {
  //load howar sathe sathe amra localstorage theke data to paici agei thn oita render korbo jate update erpr call korle compare korte pare
  bookmarkView.render(model.state.bookMarks)
}
const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    //show loading spinner
    addRecipeView.renderSpinner()
    //upload the new reciupe data
    await model.uploadRecipe(newRecipe);

    console.log(model.state.recipe);

    //render our added recipe 
    recipeView.render(model.state.recipe);

    //success Message
    addRecipeView.renderMessage();
    //render bookmarks cg bookmarks array now updated 
    bookmarkView.render(model.state.bookMarks)

    //change the id in the url cg otherwise when we load our recipe id will gone it will show the url id recipe
    //we can use history api to change the url withour reloading the page
    window.history.pushState(null, '', `#${model.state.recipe.id}`)//it take 3 arguments , stat,title,url
    //other use of history api -> window.history.back()- automatically go back to the last page

    //close form window
    setTimeout(() => {
      addRecipeView.toogleWindow()
    }, MODAL_CLOSE_SEC * 1000);

  }
  catch (err) {
    console.error(`💥${err}`);
    addRecipeView.renderError(err.message)
  }
  //upload the new recipe data

}
//Event handlers technique in MVC using publisher subscriber design pattern
const init = function () {

  bookmarkView.adhandleBookMark(controlBookMarks)
  recipeView.adhandlerRender(controlRecipes);
  recipeView.adhandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  //ekhane call dile undefined hobe cg ekhono api theke data ase nai
  // controlServings()
  searchView.adhandlerSearch(controlSearchResults);
  paginationView.adhandlerClick(controlPagination);
  addRecipeView.adhandlerUpload(controlAddRecipe)
};
init();


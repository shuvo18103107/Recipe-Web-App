import * as model from './model';
import recipeView from './views/recipeView';

//import assets so that parcel can get it

//by this most old browser can render our app
//this one polyfilling everything
import 'core-js/stable';
//this one polyfilling asybc await and updated all js feature to old browsers
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

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
    alert(err.message);
    console.log(err.message);
  }
};

//if i have multiple event for same dunctionality then i can doi this
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

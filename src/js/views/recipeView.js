import View from './View';
// import icons from '../img/icons.svg' //parcel 1 style
import icons from 'url:../../img/icons.svg'; //parcel 2 style
import { Fraction } from 'fractional';
import View from './View';

class ReciepView extends View {

  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe.  Please try another one!';
  _message = '';

  _generatedMarkup() {
    return `<figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title
      }" crossorigin="anonymous" class="recipe__img"></img> 
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime
      }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings
      }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-update-to="${this._data.servings - 1}" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-update-to="${this._data.servings + 1}" class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
        
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients
        .map(ing => this._generateMarkUpIngredient(ing))
        .join('')}

        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher
      }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
  }
  //handling event in mvc architecture-> publisher
  adhandlerRender(handler) {
    //if i have multiple event for same dunctionality then i can doi this

    ['hashchange', 'load'].forEach(ev =>
      window.addEventListener(ev, handler)
    );

  }

  adhandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      console.log(btn);
      const Serving = +btn.dataset.updateTo;
      if (Serving > 0) handler(Serving)


    })

  }


  _generateMarkUpIngredient(ing) {
    return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>`;
  }
}

export default new ReciepView();

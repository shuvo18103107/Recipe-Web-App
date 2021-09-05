// import icons from '../img/icons.svg' //parcel 1 style
import icons from 'url:../../img/icons.svg'; //parcel 2 style
import { Fraction } from 'fractional';
console.log(Fraction);
class ReciepView {
    #data;
    #parentElement = document.querySelector('.recipe');
    render(data) {
        this.#data = data;

        const markup = this._generatedMarkup();

        this._clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    _clear() {
        this.#parentElement.innerHTML = '';
    }
    _generatedMarkup() {
        return `<figure class="recipe__fig">
        <img src="${this.#data.image}" alt="${this.#data.title
            }" crossorigin="anonymous" class="recipe__img"></img> 
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime
            }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this.#data.servings
            }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
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
        ${this.#data.ingredients
                .map(ing => this._generateMarkUpIngredient(ing))
                .join('')}

        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this.#data.publisher
            }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
    }
    renderSpinner() {
        const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
        this.#parentElement.innerHTML = '';
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
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

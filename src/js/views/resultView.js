import View from './View';
import icons from 'url:../../img/icons.svg'; //parcel 2 style

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again 😥';
  _message = '';
  _generatedMarkup() {
    return this._data.map(item => this._generatedItem(item)).join('');
  }
  _generatedItem(item) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
       <a class="preview__link ${item.id === id ? `preview__link--active` : ''
      } " href="#${item.id}">
         <figure class="preview__fig">
           <img src="${item.image}" alt="${item.title
      }" crossorigin="anonymous" />
         </figure>
         <div class="preview__data">
           <h4 class="preview__title">${item.title}</h4>
           <p class="preview__publisher">${item.publisher}</p>
           
         </div>
       </a>
       </li>`;
  }
}
export default new ResultView();

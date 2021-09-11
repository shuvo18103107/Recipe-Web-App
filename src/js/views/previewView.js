import View from './View';
import icons from 'url:../../img/icons.svg'; //parcel 2 style

class PreviewView extends View {
  _generatedMarkup() {
    const id = window.location.hash.slice(1);
    console.log(this._data);
    return `<li class="preview">
       <a class="preview__link ${this._data.id === id ? `preview__link--active` : ''
      } " href="#${this._data.id}">
         <figure class="preview__fig">
           <img src="${this._data.image}" alt="${this._data.title
      }" crossorigin="anonymous" />
         </figure>
         <div class="preview__data">
           <h4 class="preview__title">${this._data.title}</h4>
           <p class="preview__publisher">${this._data.publisher}</p>
           
           <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
           <svg>
           <use href="${icons}#icon-user"></use>
           </svg>
           
           </div>
         </div>
       </a>
       </li>`;
  }
}
export default new PreviewView();

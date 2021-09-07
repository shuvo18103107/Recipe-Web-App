import icons from 'url:../../img/icons.svg'; //parcel 2 style
export default class View {
  _data;
  render(data) {
    console.log(data);
    //object pass korar time e kono element fetch na hoile ei guard class trigger korbe
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    console.log(this._data);
    const markup = this._generatedMarkup();

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {


    const markup = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)

  }
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)

  }

}
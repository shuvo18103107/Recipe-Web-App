import icons from 'url:../../img/icons.svg'; //parcel 2 style
export default class View {
  _data;
  /**
   * Render the recieve object to the DOM
   * @param {Object| object[]} data the data to be rendered(eg:recipe)
   * @param {boolean} [render = true]if false create markup string insted of rendering to the DOM
   * @returns {undefined | string} a markup string is returned if render = false
   * @this  {object} View instance
   * @author Mohammad Ali Shuvo
  */

  render(data, render = true) {
    //object pass korar time e kono element fetch na hoile ei guard class trigger korbe
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    console.log(this._data);
    const markup = this._generatedMarkup();

    if (!render) return markup;
    this.clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    //error load event e trigger kore so lage na
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    // console.log(this._data);
    const newMarkup = this._generatedMarkup();
    //here we get a strung in newmarkup , but i want to compare the old html string to new , so this newmarkup string i will convert to real dom node object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //here newDom is now become a virtual dom which lives in our memoty not in page
    //this dom is now updated object dom but we cannot render it on page we want to compare the page dom and our current virtual updated dom
    //now convert this nodeList to in an array
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements);
    // select the current page dom
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElement);
    newElements.forEach((newEl, i) => {
      //looping two arrays at the same time technique
      const curEl = curElement[i];
      //now have to compare
      // console.log(curEl);
      //new element is just a elemnt but we need text so go firstchild it will return a text node and if it is text then take the valu using nodeValue, and this text should not be empty
      // console.log(newEl.firstChild);

      // console.log(curEl, newEl, newEl.isEqualNode(curEl));
      //update changes text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() != ''
      ) {
        // console.log('💥', newEl.firstChild?.nodeValue.trim());
        //now thos are unmatch we have to find out those tag
        curEl.textContent = newEl.textContent;
      }
      //update changes attributes
      if (!newEl.isEqualNode(curEl)) {
        console.log(newEl, [newEl.attributes]);
        Array.from(newEl.attributes).forEach(att => {
          //we change all the current element attribute by the new element attribute
          curEl.setAttribute(att.name, att.value);
        });
      }
    });
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
    </div>`;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
    </div>`;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

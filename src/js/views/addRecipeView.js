import View from './View';
import icons from 'url:../../img/icons.svg'; //parcel 2 style

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _message = 'Recipe Was SuccessFully Uploaded'
    constructor() {
        super()//ekhane parent class identify korte super use kora lagbe cg this kon class er use korbe view naki recipe ta super thick korbe
        console.log(this);
        //child class er this access korte hoile constructor e super() call korte hoi
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }
    toogleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toogleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toogleWindow.bind(this));
        this._overlay.addEventListener('click', this.toogleWindow.bind(this));
    }
    adhandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            //rather selecting each form value we can use formdata api

            const dataArr = [...new FormData(this)]; //identify the form in this case this cg in handler this refer to the element itself
            // handler(dataArr); //kind of entries style
            //but our api is object so we have to convert entries to object
            // console.log(dataArr);
            const data = Object.fromEntries(dataArr);
            handler(data);
            // console.log(data);
        });
    }

    _generatedMarkup() { }
}
export default new AddRecipeView();

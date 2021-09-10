import View from './View';

import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; //parcel 2 style

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';
  _generatedMarkup() {
    return this._data
      .map(bookmarkObj => previewView.render(bookmarkObj, false))
      .join('');
  }
  adhandleBookMark(handler) {
    window.addEventListener('load', handler())
  }
}
export default new BookmarkView();

import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; //parcel 2 style

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again 😥';
  _message = '';
  _generatedMarkup() {
    return this._data
      .map(resultObj => previewView.render(resultObj, false))
      .join('');
  }
}
export default new ResultView();

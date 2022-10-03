import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './view';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a great recipe to bookmark it!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    //console.log(this._data, 'here is the data');
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new BookmarkView();

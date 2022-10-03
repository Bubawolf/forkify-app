import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No Recipes found in your query! Please try again!';

  _generateMarkup() {
    //console.log(this._data, 'here is the data');
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();

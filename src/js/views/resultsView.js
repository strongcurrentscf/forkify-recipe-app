import View from './View';
import previewView from './previewView.js';
import icons from '../../img/icons.svg'; // To use in markups.

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message =
    'Empty search? Try submitting the name of a recipe or an ingredient!';

  // addScrollHandlerClick() {
  //   this._parentElement.addEventListener('click', function (e) {
  //     const link = e.target.closest('.preview__link');
  //     if (!link) return;

  //     const recipeSection = document.querySelector('.recipe');
  //     setTimeout(() => {
  //       recipeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //     }, 500);
  //   });
  // }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();

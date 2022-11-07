import View from './View';
import previewView from './previewView.js';
import icons from '../../img/icons.svg'; // To use in markups.

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

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
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();

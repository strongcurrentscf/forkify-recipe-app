import View from './View.js';
import icons from '../../img/icons.svg'; // To use in markups.
// import icons from 'url:../../img/icons.svg'; // Parcel 2 use case when video was made.
import fracty from 'fracty';

// The view is going to be a class called RecipeView. We do this because later we will also have a parent class call View which will contain a couple of methods that all the views should inherit. Using classes makes this all very simple to implement... Also we want each view to have a couple private properties and methods.
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe'); // set private property of #parentElement to the recipeContainer because this would then make it really easy to render the spinner and to render successful error messages or to render the recipe itself. If each of the views has this #parent element property, then it would be easy to do all of those tasks.
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  // Receives data and will then set this._data to the data it just received
  // _data;
  // render(data) {
  //   this._data = data;
  //   const markup = this._generateMarkup();
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  // // for the sake of abstracting some code. Clears the .recipe div (parent)
  // _clear() {
  //   this._parentElement.innerHTML = '';
  // }

  // // public method so it can be called by controller.js.
  // renderSpinner() {
  //   const markup = `
  //         <div class="spinner">
  //           <svg>
  //             <use href="${icons}#icon-loader"></use>
  //           </svg>
  //         </div>
  //   `;

  //   // Clears the .recipe div before inserting markup
  //   this._clear;
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  // renderError(message = this._errorMessage) {
  //   const markup = `
  //         <div class="error">
  //           <div>
  //             <svg>
  //               <use href="${icons}#icon-alert-triangle"></use>
  //             </svg>
  //           </div>
  //           <p>${message}</p>
  //         </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  // renderMessage(message = this._message) {
  //   const markup = `
  //         <div class="message">
  //           <div>
  //             <svg>
  //               <use href="${icons}#icon-smile"></use>
  //             </svg>
  //           </div>
  //           <p>${message}</p>
  //         </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  addHandlerRender(handler) {
    //// LISTENING FOR LOAD AND HASHCHANGE EVENTS to call handler when either event is triggered. We use these event listeners to call controlRecipes in controller script.

    // Adding event listener for each event(ev) in array.
    ['hashchange', 'load'].forEach(ev => addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;

      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  // Scroll to .recipe section
  scrollTo() {
    this._parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Each view will render different HTML so we will have a method that generates that HTML so that the render method can then render that HTML.
  _generateMarkup() {
    // since we're using Babel here, we can already use this syntax method().
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img"  />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button  class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${
          this._data.ingredients.map(this._generationMarkupIngredient).join('') // Unlike forEach(), The map method can return something. We need this expression to return a string of HTML. Map returns a new array with the same length... and in the end we'll be able to .join the array of generated ing markups. The result is a big string containing all the ingredients.
        }

        
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
`;
  }

  _generationMarkupIngredient(ing) {
    // This is the specified callback function for the map method used in generating the ingredients list. So, in the map callback, we are asking it to return a string. Map will return an array in which each ing will have this murkup, corresponding to each element in the #data.ingredients.

    return `
  <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? fracty(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>              
  `;
  }
}

// We need to export something from this view so that the controller.js can use it. We could export the entire class so that in the controller.js we could import the class and create a new object out of that class. However, in that situation it may be possible to create more than one view and we would never want that. Also that would add unnecessary work to the controller.js which we want to keep as simple as possible.

// In order to avoid all of that we will create the object here and then export that object. This way, no one from the outside of this class will have access to anything except for the object... We dont pass any data in so we dont even need any constructor.
export default new RecipeView();

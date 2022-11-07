import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'regenerator-runtime/runtime';
import 'core-js/stable';

// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////
///////////////////////////////////////

/*

1. USER STORIES:
  Description of an applications functionality from the user's perspective.
  Common format is "As a [type of user], I want [an action] so that [a    benefit]."

  1) As a user, I want to search for recipes, so that I can find new ideas for meals.
  2) As a user, I want to be able to update the number of servings, so that I can cook a meal for different number of people.
  3) As a user, I want to bookmark recipes, so that I can review them later
  4) As a user, I want to be able to create my own recipes, so that I have them all organized in the same app.
  5) As a user, I want to be able to see my bookmarks and own recipes when I leave the app and come back later, so that I can close the app safely after cooking.

2. FEATURES:
  1) Search for recipes:
      - Search functionality: input field to send request to API with searched keywords.
      - Display results with pagination.
      - Display recipe with cooking time, servings and ingredients
  2) Update the number of servings:
      - Change servings functionality: update all ingredients according to current number of servings.
  3) Bookmark recipes:
      - Bookmarking functionality: display list of all bookmarked recipes.
  4) Create my own recipes:
      - User can upload own recipes.
      - User recipes will automatically be bookmarked
      - User can only see their own recipes, not recipes from other users.
  5) See my bookmarks and own recipes when I leave the app and come back:
      - Store bookmark data in the browser using local storage.
      - On page load, read saved bookmarks from local storage and display.

3. FLOWCHART:
PART 1: see pdf for full chart
  Features:
    1) Search functionality: API search request (async)
    2) Results with pagination
    3) Display recipe

4. ARCHITECTURE

5. DEVELOPMENT STEP

*/

//////////////////////////////////////////////////
/////// LOADING A RECIPE FROM API ///////

/*

In the source, we have images, Javascript, and Sass.

Browsers dont understand Sass and so it has to be converted to CSS.

Parcel is going to do that for us and it knows that it has to compile the Sass to CSS because it is referenced as an scss file in the main, index.html. And therefore, parcel knew that it had to include that file in the distribution (dist) and to replace to link to the actual final CSS file.

And the same is true for all of the images. It basically copied all of the images to the distribution folder and gave them a new name and replaced their source in the dist index.html.

The dist folder is not really important for us in development. Our development work will be in the src folder... and only what we see in the browser is what is coming form the dist folder.  That's the whole logic of having a module bundler. It takes that raw source code and compiles it into a nice package that is ready to ship to the browser.

// https://forkify-api.herokuapp.com/v2
Jonas developed his own API so that we are not dependent on any 3rd-party services.

Any good API has good documentation. See documentation for important details:

API key is what we will need to upload our own recipes.
Our main URLs or 'routes' of this API:
  The first is used to get All the recipes or to create a recipe. https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>

  The second is simple to get one single recipe. https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=<insert your key>

https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886 returns a recipe object we will use in our application.

As always to make an AJAX request to an API we use the fetch function.

*/

// An async function to await the AJAX fetch to recipe API.
const controlRecipes = async function () {
  // We use a try/catch for if there's error.
  try {
    const id = window.location.hash.slice(1); // gets id from URL bar hash to fetch from recipe API with.
    // console.log(id);

    if (!id) return; // guard clause for if !id.
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id); // Example of one async function calling another async function. It's important to rememeber that an async function will return a promise that we'll need to handle whenever we call that async function. At least if we want to get some result out of it or if we kind of want to stop the execution in the function that is calling the other async function.

    // 3) Rendering recipe
    recipeView.render(model.state.recipe); // This is where we pass in the data to the recipeView object with it's render public-method.

    // 4) Scroll to recipe section
    recipeView.scrollTo();
  } catch (err) {
    // If there's error, alert the error.
    // console.log(err);
    recipeView.renderError();
    console.error(err);
  }
};

//////////////////////////////////////////////////
/////// RENDERING THE RECIPE ///////

/*

The ingredients from the fetched recipe object is an array with each position in the array containing an object with the quantity, unit, an description of each ingredient. We will have to loop over this array and create one list element for each of them. 

*/

//////////////////////////////////////////////////
/////// LISTENING FOR LOAD AND HASHCHANGE EVENTS ///////
// Publisher-subscriber pattern

/*



*/

// window.addEventListener('hashchange', controlRecipes);

// window.addEventListener('load', console.log(window.location));
// window.addEventListener('load', !window.location.hash ? null : controlRecipes);

//////////////////////////////////////////////////
/////// THE MVC ARCHITECTURE ///////

/*

Why do we even need architecture?:

  1) The architecture will give our project the structure in which we can then write code.
  In software, structure means how we organize and divide the code into different modules classes and functions.
  
  2) Maintainability, when we build a project we need to be able to easily change it in the future.

  3) Expandability, we need to be able to easily add new features.


We can create our own architecture (Mapty project).

We can use well-established architecture pattern like MVC, MVP, Flux, etc. (this project).

In modern web development, many developers use a framework like React, Angular, Vue, Svelte, etc. to take care of the architecture for them.

No matter where the architecture comes from and who develops it, there are some components that every architecture should have...
  1) Business Logic - 
    All the code that solves the actual business problem;
    Directly related to what business does and what it needs;
    Example: sending messages(WhatsApp), storing transactions(bank), calculating taxes(budget manager).
 
  2) State - 
    One of the most important aspects of any web application.
    The application state is basically what stores all the data about the application that is running in the browser. The data about the app's front-end.
    The state should store any data that you might fetch from an API, or data the user inputs, or what page the user is currently viewing and so on...
    And this data should be the 'single source of truth' and should be kept in sync with the user interface. If some data changes in the state, then the user interface should reflect that. And the same is true the other way around. storing and displaying data and keeping everything in sync is one of the more difficult tasks when building web apps. That's why there are many state management libraries like Redux, or MobX... In this project we will keep things simple and use a single object to keep our state.

  3) HTTP Library -
    Responsible for making and receiving AJAX requests.
    We will continue to use fetch.
    Optional but almost always necessary when working with real-world apps. 

  4) Application Logic (router) -
    Code that's only concerned about the implementation of the App itself.
    Handles navigation and UI events.
    For the technical aspects of the app which are not directly related to the underlying business problem.

  5) Presentation Logic (UI layer) -
    Code that's concerned about the visible part of the app.
    Essentially displays application state on the UI in order to keep everything in sync.

Model-View-Controller Architechture

The View is for the Presentation Logic. It is the part of the app interacting with the user.

The Model is all about the app's data. That's why it usually contains the State and the Business Logic that manipulates the State. These 2 should be kept closely together.
The Model is also the part of the app that contains the HTTP Library that might get some data from the web(API/back-end). All data into the Model.

The Controller is the part of the app that contains the Application Logic.
It kind of sits between the model and the view. It basically creates a bridge between the Model and the View, which in fact should know nothing about eachother... the Model and the View should exist completely independent of one another.

One of the big goals of the MVC pattern is to separate the Business Logic from the Application Logic, which makes developing the app so much easier.
But as a consequence, we then need something to connect these two parts, the Controller.
We can say the Controller dispatches tasks to the Model and to the View. It controls and orchestrates the whole app itself.

*/

//////////////////////////////////////////////////
/////// REFACTORING FOR MVC ///////

/*

Create a new folder in our src for each of the necessary new files so that we can split our code between them.

js/model.js, js/controller.js, js/views/recipeView.js

model.js - Here, we're going to have a big 'state' object, which then, inside will contain an object for 'recipe{}', 'search{}', and 'bookmarks[]'. 
And then there will be a function for 'loadRecipe()'. Called by 'controlRecipes()', that sits between loading the recipe and then rendering it using the view. Remember that controller.js acts as a bridge between the model and view.

recipeview.js - we will have 1 module for each of the different views. The views are much bigger and we want to avoid files with many hundred lines of code. 



*/

//////////////////////////////////////////////////
/////// HELPERS AND CONFIGURATION FILES ///////

/*

Many real world applications have 2 special modules that are completely independent of the rest of the architecture. These are a module for Project Configuration and also a module for some general helper functions that will be useful across the entire project.

Configuration Module - we will put all the variables that should be constants and should be reused across the project. The goal of having this file with all these variables is that it will allow us to easily configure our project by simply changing some of the data that is in the config.js file.
The only variables that we do want here are the ones that are responsible for defining some important data about the app itself.

One example of that is the API URL that we will use in multiple places across this project. For getting search data and for uploading a recipe to the server. All of them will use this URL, but imagine that at some point the URL has to change (future versions).
Another example is the apparently magic number in the getJSON.timeout.


Helper Module - the goal of this module is to contain a couple of functions that we reuse over and over in our project. Here in the helper.js file we will have a central place for all of them.
A good example of this reusable function is the getJSON function.

*/

//////////////////////////////////////////////////
/////// EVENT HANDLER IN MVC: PUBLISHER-SUBSCRIBER PATTERN ///////
/*

We need put the logic of handling DOM events into the recipeView.js.
However, the handler function that we use to handle these events is actually this controlRecipes in this controller.js module.

We dont want application logic in the recipeView. On the other hand we want to listen for events in the recipeView because otherwise we would have DOM elements in the controller.js. That would be wrong in our MVC organization.

Event listeners should be attached to elements in the view but the events should then be handled by the controlRecipe in the controller.js.

We dont want to call the controlRecipes function right from the view because the way we set up the MVC architecture, the view does not know anything about the controller... it doesnt import anything from the controller.

The solution is called the Publisher-Subcriber design pattern. Design patterns are standard solutions to certain kinds of problems.

In the Publisher-Subscriber pattern we have a 'publisher' which is some code that knows when to react. In this case thats going to be the addHandlerRender function because it will contain the addEventListener method.

On the other hand we have a 'subscriber' which is code that wants to react. This is the code that should actually be executed(controlRecipes) when the event happens.

The solution is that we can subscribe to the publisher by passing in the subscriber function as an argument. That is possible because the controller does import both the view and the model.

As we call init() from controller.js, which calls addHandlerRender() in recipeView.js, we pass in our controlRecipes() function as an argument.
Essentially we subscribe controlRecipes to addHandlerRender and at this point the 2 functions are finally connected. And so now, addHandlerRender listens for events using the addEventListener method and as soon as the event actually happens, the controlRecipes function will be called as the callback function of addEventListener... As soon as the publisher publishes an event, the subscriber will get called.

 */
//////////////////////////////////////////////////
/////// IMPLEMENTING SEARCH RESULTS - PART 1 ///////
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) resultsView.renderMessage();
    return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  // console.log(model.state.search.results);
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmarks view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const testFeature = function () {
  console.log('Welcome to the application!');
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  testFeature();
};

init();

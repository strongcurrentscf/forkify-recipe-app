# Forkify App - Parts & Pieces

This project is a recipe search and bookmarking application built using HTML, JavaScript, and Sass. It includes features such as searching for recipes, updating servings, bookmarking favorite recipes, and adding user recipes via an API. The app follows the MVC architecture and integrates with a recipe API for fetching and managing data.

## Table of Contents
- [User Stories](#user-stories)
- [Project Setup](#project-setup)
- [API Integration](#api-integration)
- [MVC Architecture](#mvc-architecture)
- [Event Handlers in MVC](#event-handlers-in-mvc)
- [Error and Success Messages](#error-and-success-messages)
- [Search Functionality](#search-functionality)
- [Pagination](#pagination)
- [Summary](#summary)
- [Future Plans](#future-plans)
- [Live Demo](#live-demo)
- [License](#license)

---

## User Stories

The following user stories outline the main features of the Forkify App:

1. **Search for recipes**: Users can search for recipes by entering a keyword.
2. **Update servings**: Users can update the number of servings for a recipe, which automatically adjusts the ingredients' quantities.
3. **Bookmark recipes**: Users can bookmark their favorite recipes for later access.
4. **Create and add user recipes**: Users can add custom recipes using an API key.
5. **Persistent bookmarks**: Bookmarks and user-added recipes persist when the app is closed and revisited later.

---

## Project Setup

The Forkify App was built using the following technologies and tools:

- **HTML, JavaScript, Sass**: Core front-end technologies.
- **Parcel**: A module bundler used to compile and bundle the project for production.
- **NPM**: Node Package Manager for initializing and managing dependencies.

---

## API Integration

The Forkify App integrates with a public recipe API to fetch and manage recipe data.

- **API Documentation**: The app uses a third-party recipe API. Make sure to consult the API documentation for proper routes and URL patterns.
- **Fetching Data**: We use JavaScript’s `fetch` function within asynchronous functions to make AJAX requests. The `try/catch` block is used to handle errors.
- **Parsing JSON**: Once the API response is received, the data is parsed into JSON and stored in the Model to manage the app's state.

---

## MVC Architecture

The Forkify App follows the **Model-View-Controller (MVC)** architecture pattern:

1. **Model**: Manages the application’s state and contains the core business logic for handling recipes, bookmarks, and user-generated recipes. The Model performs tasks such as fetching recipes from the API and managing bookmarks.
   
   Example tasks:
   - Fetch recipe from API
   - Add or remove a bookmark

2. **View**: Responsible for rendering the user interface. The View holds the methods and class objects that generate HTML markup and display it on the page.
   
   Example tasks:
   - Render a recipe on the page
   - Display the bookmarks list

3. **Controller**: Connects the Model and the View. It processes user interactions (like a search or a bookmark) and instructs the Model or View to update accordingly.
   
   Example tasks:
   - Handle recipe search requests
   - Coordinate between updating the Model and re-rendering the View when a bookmark is added or removed

---

## Event Handlers in MVC

Event handling in the Forkify App follows the **Publisher-Subscriber pattern**:

- **Controller**: Event handler functions (e.g., search submission or recipe selection) are created in the Controller. These functions are then passed to the View as "handlers."
- **View**: The View uses these handler functions in its event listeners. When an event (like a click or form submission) occurs, the View calls the handler provided by the Controller.

This pattern decouples the logic between user actions and the Model's state changes, ensuring a clean separation of concerns in the MVC architecture.

---

## Error and Success Messages

Error and success handling is implemented to ensure proper feedback for users:

- **Throwing Errors in the Model**: Errors, such as failed API requests, are thrown from the Model and caught in the Controller to be handled appropriately.
- **Private Fields in Views**: The View contains private fields that store default error messages. These are displayed when something goes wrong during user interactions, such as submitting an invalid search or losing internet connectivity.

---

## Search Functionality

The Forkify App allows users to search for recipes through the integrated API.

- **Search Query**: The user input is used as a query parameter in the API request URL.
- **Search State Management**: The Model saves the search query and resulting data to its state, ensuring that the app retains the search results even as users navigate between different features (e.g., bookmarking or updating servings).

---

## Pagination

Pagination is implemented to improve user experience when displaying search results.

- **Paginated Results**: Large sets of search results are divided into pages. This helps users by not overwhelming them with too much information at once.
- **Pagination Controls**: Users can navigate through the pages of search results using the pagination buttons.

---

## Summary

This project demonstrates a well-structured architecture (MVC) and dynamic user features like searching, bookmarking, and creating recipes. It is being used as a study project to rebuild the same functionality using React and TypeScript, taking advantage of component-based architecture and type safety.

---

## Future Plans

The next steps for this project include:

- **Rebuilding in React/TypeScript**: Transitioning to a component-based architecture using React and TypeScript to modernize the codebase.
- **Improved UI/UX**: Enhancing the user interface and user experience with modern React libraries and design practices.

---

## Live Demo

Check out the live demo of the project here:  
[Live Demo](https://forkify-christian.netlify.app/)

---

## License

This project is licensed under the **MIT License**.

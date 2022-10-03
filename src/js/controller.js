import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime';
import Fraction from 'fractional';

///////////////////////////////////////
/*
if (module.hot) {
  module.hot.accept();
}*/

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Render Spiner
    recipeView.renderSpinner();

    // update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //update book
    bookmarksView.update(model.state.bookmark);

    //loading recipe
    await model.loadRecipe(id);
    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results

    await model.loadSearchResults(query);

    // render results
    console.log(model.state.search.results);
    //resultsView.render(model.state.search.results);
    //console.log(model.getSearchResultsPage(1));
    resultsView.render(model.getSearchResultsPage());

    // Render de pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// window

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

const controlPagination = function (gotoPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // render new pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe Servings (in State)
  model.updateServings(newServings);
  // Update the recipe View
  // Rendering Recipe
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddbookmark = function () {
  // Add o remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);

  //Update recipe view
  //console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  //render bookmark
  bookmarksView.render(model.state.bookmark);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spiner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    //success Message
    addRecipeView.renderMessage();

    //REnder bookmark view
    bookmarksView.render(model.state.bookmark);

    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView.toogleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('-_-', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddbookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

//console.log(model.state);

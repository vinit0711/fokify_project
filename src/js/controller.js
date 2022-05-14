import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./recipeView.js";
import searchView from "./searchView.js";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

//

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render Spinner
    recipeView.renderSpinner();

    console.log("Spinner is renderd");
    // 1)Loading Recipe
    await model.loadrecipe(id);

    console.log("model.state=", model.state);

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlSearchResults = async function () {
  try {
    console.log("Called Control sErach Resulta==");
    const query = searchView.getQuery();
    console.log("query==", query);
    if (!query) return;
    await model.loadSearchResults(query);
    console.log("model.state.search.results", model.state.search.results);
  } catch (error) {}
};

// controlSearchResults();

const init = function () {
  console.log("INIT Function is called");
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

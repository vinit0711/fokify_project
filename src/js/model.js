import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

export const loadrecipe = async function (id) {
  try {
    console.log("id no wloading get josnb=", id);

    const data = await getJSON(`${API_URL}${id}`);

    console.log("Data recievd");

    let { recipe } = data.data; //Here we got recipe Object
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log("state.recipe=", state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log("data string ", data);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (error) {
    throw err;
  }
};

// loadSearchResults("pizza");

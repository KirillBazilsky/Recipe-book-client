import { defineStore } from "pinia";
import { AxiosRequestConfig } from "axios";
import {
  addRecipeRequest,
  deleteRecipeRequest,
  getRecipeRequest,
  getRecipesRequest,
  updateRecipeRequest,
} from "@/api/recipes";
import {
  IRecipe,
  IRecipesState,
  IRecipesFiltersParams,
} from "@/interfaces/recipe";

export const useRecipeStore = defineStore("recipes", {
  state: (): IRecipesState => ({
    currentRecipe: undefined,
    recipes: [],
    isFiltersOpen: false,
    count: 0,
  }),
  actions: {
    async fetchRecipes(payload: IRecipesFiltersParams) {
      try {
        const response: { recipes: IRecipe[]; count: number } =
          await getRecipesRequest(payload);
        const { recipes, count } = response;

        this.recipes = recipes;
        this.count = count;

      } catch (error) {
        this.recipes = [];
        this.count = 0;
        throw error;
      }
    },
    async fetchRecipe(recipeId: string) {
      try {
        const response: { recipe: IRecipe } = await getRecipeRequest(recipeId);
        this.currentRecipe = response.recipe;
      } catch (error) {
        this.currentRecipe = undefined;
        throw error;
      }
    },

    async addRecipe(payload: FormData) {
      const response = await addRecipeRequest(payload);
      this.recipes.push(response);
    },

    async updateRecipe(recipeId: string, payload: FormData) {
      const response = await updateRecipeRequest(recipeId, payload);
      const index = this.recipes.findIndex((recipe) => recipe._id === recipeId);

      if (index !== -1) this.recipes.splice(index, 1, response);
    },

    async deleteRecipe(recipeId: string) {
      await deleteRecipeRequest(recipeId);

      this.recipes = this.recipes.filter((recipe) => recipe._id !== recipeId);
    },
  },

  getters: {
    allRecipes: (state) => state.recipes,
    getCurrentRecipe: (state) => state.currentRecipe,
    getIsFiltersOpen: (state) => state.isFiltersOpen,
    getCount: (state) => state.count,
  },
});

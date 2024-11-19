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
  }),
  actions: {
    async fetchRecipes(payload: IRecipesFiltersParams) {
      try {
        const response: IRecipe[] = await getRecipesRequest(payload);
        this.recipes = response;
      } catch (error) {
        this.recipes = [];
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

    async addRecipe(payload: AxiosRequestConfig<IRecipe>) {
      const response = await addRecipeRequest(payload);
      this.recipes.push(response);
    },

    async updateRecipe(recipeId: string, payload: AxiosRequestConfig<IRecipe>) {
      const response = await updateRecipeRequest(recipeId, payload);
      const index = this.recipes.findIndex(
        (recipe) => recipe._id === payload.data?._id
      );

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
  },
});

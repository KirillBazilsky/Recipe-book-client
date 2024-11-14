import { defineStore } from "pinia";
import { AxiosRequestConfig } from "axios";
import {
  addRecipeRequest,
  deleteRecipeRequest,
  getRecipesRequest,
  updateRecipeRequest,
} from "../api/RecipesApi";
import IRecipesFiltersParams from "../interfaces/IRecipesFiltersParams";
import IRecipesState from "../interfaces/IRecipesState";
import IRecipe from "../interfaces/IRecipe";

export const useRecipeStore = defineStore("recipes", {
  state: (): IRecipesState => ({
    recipes: [],
  }),
  actions: {
    async fetchRecipes(payload: AxiosRequestConfig<IRecipesFiltersParams>) {
      const response: IRecipe[] = await getRecipesRequest(payload);
      this.recipes = response;
    },

    async addRecipe(payload: AxiosRequestConfig<IRecipe>) {
      const response = await addRecipeRequest(payload);
      this.recipes.push(response);
    },

    async updateRecipe(payload: AxiosRequestConfig<IRecipe>) {
      const response = await updateRecipeRequest(payload);
      const index = this.recipes.findIndex(
        (recipe) => recipe.id === payload.data?.id
      );

      if (index !== -1) this.recipes.splice(index, 1, response);
    },

    async deleteRecipe(payload: AxiosRequestConfig<{ recipeId: string }>) {
      await deleteRecipeRequest(payload);

      this.recipes = this.recipes.filter(
        (recipe) => recipe.id !== payload.data?.recipeId
      );
    },
  },

  getters: {
    allRecipes: (state) => state.recipes,
  },
});

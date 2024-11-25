import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IRecipe, IRecipesFiltersParams } from "../interfaces/recipe";
import { BASE_URL } from "../constants/apiConstants.js";

export const getRecipesRequest = async (params: IRecipesFiltersParams) => {
  const { data }: AxiosResponse<{ recipes: IRecipe[] }> = await axios.get(
    `${BASE_URL}/recipes`,
    { params }
  );

  return data.recipes;
};

export const getRecipeRequest = async (recipeId: string) => {
  const response: AxiosResponse<{ recipe: IRecipe }> = await axios.get(
    `${BASE_URL}/recipes/${recipeId}`
  );

  return response.data;
};

export const addRecipeRequest = async (params: AxiosRequestConfig<IRecipe>) => {
  const { data }: AxiosResponse<IRecipe> = await axios.post(
    `${BASE_URL}/recipes`,
    params
  );

  return data;
};

export const updateRecipeRequest = async (
  recipeId: string,
  params: AxiosRequestConfig<IRecipe>
) => {
  const { data }: AxiosResponse<IRecipe> = await axios.put(
    `${BASE_URL}/recipes/${recipeId}`,
    params
  );

  return data;
};

export const deleteRecipeRequest = async (recipeId: string) => {
  const { data }: AxiosResponse<string> = await axios.delete(
    `${BASE_URL}/recipes/${recipeId}`
  );

  return data;
};

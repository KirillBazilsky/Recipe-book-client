import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IRecipe, IRecipesFiltersParams } from "../interfaces/recipe";
import { BASE_URL } from "../constants/api.js";
import { api } from "./api";

export const getRecipesRequest = async (params: IRecipesFiltersParams) => {
  const { data }: AxiosResponse<{ recipes: IRecipe[]; count: number }> =
    await api.get(`${BASE_URL}/recipes`, { params });

  return data;
};

export const getRecipeRequest = async (recipeId: string) => {
  const response: AxiosResponse<{ recipe: IRecipe }> = await api.get(
    `${BASE_URL}/recipes/${recipeId}`
  );

  return response.data;
};

export const addRecipeRequest = async (params: FormData) => {
  const { data }: AxiosResponse<IRecipe> = await api.post(
    `${BASE_URL}/recipes`,
    params,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const updateRecipeRequest = async (recipeId: string, params: FormData) => {
  const { data }: AxiosResponse<IRecipe> = await api.put(
    `${BASE_URL}/recipes/${recipeId}`,
    params,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteRecipeRequest = async (recipeId: string) => {
  const { data }: AxiosResponse<string> = await api.delete(
    `${BASE_URL}/recipes/${recipeId}`
  );

  return data;
};

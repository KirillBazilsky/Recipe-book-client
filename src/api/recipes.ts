import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IRecipe, IRecipesFiltersParams } from "../interfaces/recipe";
import { BASE_URL } from "../constants/appConstants";

export const getRecipesRequest = async (params: AxiosRequestConfig<IRecipesFiltersParams>) => {
    const response: AxiosResponse<IRecipe[]> = await axios.get(`${BASE_URL}/recipes`, params);

    return response.data
}

export const addRecipeRequest = async (params: AxiosRequestConfig<IRecipe>) => {
    const response: AxiosResponse<IRecipe> = await axios.post(`${BASE_URL}/recipes`, params);

    return response.data
}

export const updateRecipeRequest = async (params: AxiosRequestConfig<IRecipe>) => {
    const response: AxiosResponse<IRecipe> = await axios.put(`${BASE_URL}/recipes`, params);

    return response.data
}

export const deleteRecipeRequest = async (params: AxiosRequestConfig<{recipeId: string}>) => {
    const response: AxiosResponse<string> = await axios.delete(`${BASE_URL}/recipes`, params);

    return response.data
}
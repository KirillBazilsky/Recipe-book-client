import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL } from "../constants";
import IRecipe from "../interfaces/IRecipe";
import IRecipesFiltersParams from "../interfaces/IRecipesFiltersParams";

export const getRecipesRequest = async (params: AxiosRequestConfig<IRecipesFiltersParams>) => {
    const response: AxiosResponse<IRecipe[]> = await axios.get(`${API_URL}/recipes`, params);

    return response.data
}

export const addRecipeRequest = async (params: AxiosRequestConfig<IRecipe>) => {
    const response: AxiosResponse<IRecipe> = await axios.post(`${API_URL}/recipes`, params);

    return response.data
}

export const updateRecipeRequest = async (params: AxiosRequestConfig<IRecipe>) => {
    const response: AxiosResponse<IRecipe> = await axios.put(`${API_URL}/recipes`, params);

    return response.data
}

export const deleteRecipeRequest = async (params: AxiosRequestConfig<{recipeId: string}>) => {
    const response: AxiosResponse<string> = await axios.delete(`${API_URL}/recipes`, params);

    return response.data
}
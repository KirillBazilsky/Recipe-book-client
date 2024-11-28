import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "./api";
import { BASE_URL } from "@/constants/apiConstants";
import { IFavoritesParams } from "@/interfaces/favorites";
import { IRecipe } from "@/interfaces/recipe";

export const addFavoriteRequest = async (
  favoritesId: string,
  params: AxiosRequestConfig<IFavoritesParams>
) => {
  const response: AxiosResponse = await api.post(
    `${BASE_URL}/favorites/${favoritesId}`,
    params
  );

  return response;
};

export const removeFavoriteRequest = async (
  favoritesId: string,
  params: AxiosRequestConfig<{ recipeId: string }> 
) => {
  const response: AxiosResponse = await api.delete(
    `${BASE_URL}/favorites/${favoritesId}`,
    params
  );

  return response;
};

export const getUserFavoritesRequest = async (userId: string) => {
  const { data }: AxiosResponse<IRecipe[]> = await api.get(
    `${BASE_URL}/favorites/of/${userId}`
  );

  return data;
};

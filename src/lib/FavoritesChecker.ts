import { IRecipe } from "@/interfaces/recipe";

export const checkFavorites = (favorites: IRecipe[], recipeId: string):boolean => {
    return favorites.some((favorite) => favorite._id === recipeId)
}
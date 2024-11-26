import { IRecipe } from "@/interfaces/recipe";
import { IUser } from "@/interfaces/user";

export const checkAuthor = (
  currentUser: IUser | null,
  recipe: IRecipe | undefined,
) => {
  if (currentUser && recipe) {
    return recipe.creator.id === currentUser.id;
  }
  return false
};

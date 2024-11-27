import {
  INVALID_CATEGORY,
  INVALID_INGREDIENT,
  INVALID_INGREDIENTS,
  INVALID_INSTRUCTIONS,
  INVALID_NAME,
} from "@/constants/messages/errors";
import { IRecipe } from "@/interfaces/recipe";

const stringValidator = /^(?! )(?!.* {2})[^\s].*$/;

export const validateRecipe = (recipe: IRecipe): string | undefined => {
  const { name, category, ingredients, instructions } = recipe;

  if (!name && !stringValidator.test(name)) {
    return INVALID_NAME;
  }

  if (!category && !stringValidator.test(category)) {
    return INVALID_CATEGORY;
  }

  if (!ingredients.length) {
    return INVALID_INGREDIENTS;
  }

  for (const ingredient of ingredients) {
    const isInvalid: boolean =
      !stringValidator.test(ingredient.name) ||
      !stringValidator.test(ingredient.quantity);

    if (isInvalid) {
      return INVALID_INGREDIENT;
    }
  }

  if (!instructions && !stringValidator.test(instructions)) {
    return INVALID_INSTRUCTIONS;
  }

  return;
};

export interface IIngredient {
  name: string;
  quantity: string;
}

export interface IRecipe {
  name: string;
  ingredients: IIngredient[];
  instructions: string;
  category: string;
  creator: { name: string; id: string };
  _id?: string;
}

export interface IRecipesState {
  currentRecipe: IRecipe | undefined;
  recipes: IRecipe[];
  isFiltersOpen: boolean;
}

export interface IRecipesFiltersParams {
  name: string;
  ingredients: string;
  instructions: string;
  category: string;
  creator: string;
  userId?: string;
  id?: string;
}
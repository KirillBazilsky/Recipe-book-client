export interface IRecipe {
  name: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string;
  category: string;
  creator: { name: string; id: string };
  id?: string;
}

export interface IRecipesState {
  recipes: IRecipe[];
}

export interface IRecipesFiltersParams {
  name: string;
  ingredients: string;
  instructions: string;
  category: string;
  creator: string;
}
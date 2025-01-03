import {
  IIngredient,
  IRecipe,
  IRecipesFiltersParams,
} from "@/interfaces/recipe";

export const sessionExpireTime = Date.now() + 60 * 60 * 1000;
export const blankName = "Blank Name";
export const blankUser = { name: "", email: "", password: "", id: "" };

export const categoriesList: string[] = [
  "Breakfast",
  "Appetizers",
  "Soups",
  "Main Courses",
  "Side Dishes",
  "Desserts",
  "Salads",
  "Beverages",
  "Vegetarian",
  "Gluten-Free",
  "Low-Carb",
  "Keto",
  "Snacks",
  "Seafood",
];

export const defaultFilters: IRecipesFiltersParams = {
  name: "",
  ingredients: "",
  instructions: "",
  category: "",
  creator: "",
  limit: "10",
  page: "1",
};

export const defaultIngredient: IIngredient = {
  name: "",
  quantity: "",
};

export const defaultRecipe: IRecipe = {
  creator: {
    name: "",
    id: "",
  },
  _id: "",
  name: "",
  ingredients: [],
  instructions: "",
  category: "",
};

export const paginationOptions: string[] = ["10", "25", "50", "100"];

export const paginationSplitter: Record<string, string> = {
  left: " ...",
  center: "...",
  right: "... ",
};

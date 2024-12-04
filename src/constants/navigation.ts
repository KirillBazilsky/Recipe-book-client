import { INavigationLink } from "@/interfaces/router";

export const navigationList: INavigationLink[] = [
  { label: "Recipes", route: "/recipes", guestAccess: true },
  { label: "Add Recipe", route: "/create-recipe", guestAccess: false },
  { label: "Profile", route: "/profile", guestAccess: false },
  { label: "Login/Register", route: "/authentication", guestAccess: true },
];

export enum ProfileTabs {
  userForm = "user-form",
  recipeList = "recipe-list",
  favorites = "favorites",
}

export const accessBlackList: string[] = [
  "/authentication"
];

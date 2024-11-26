import { INavigationLink } from "@/interfaces/router";

export const navigationList: INavigationLink[] = [
  { label: "Recipes", route: "/recipes" },
  { label: "Add Recipe", route: "/create-recipe" },
  { label: "Profile", route: "/update-user" },
  { label: "Login/Register", route: "/authentication" },
];

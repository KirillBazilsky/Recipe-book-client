import { INavigationLink } from "../interfaces/router";

export const navigationList: INavigationLink[] = [
    { label: "Recipes", route: "/recipes" },
    { label: "Add Recipe", route: "/update-recipe" },
    { label: "Profile", route: "/update-user" },
    { label: "Login/Register", route: "/authentication" },
  ];
  
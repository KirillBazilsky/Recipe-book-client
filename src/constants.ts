import { INavigationLink } from "./interfaces/router";
import {
  mdiBaguette,
  mdiBlender,
  mdiCakeVariant,
  mdiCarrot,
  mdiCheese,
  mdiCookie,
  mdiEgg,
  mdiEggFried,
  mdiFoodDrumstick,
  mdiFoodTurkey,
  mdiFruitCitrus,
  mdiFruitGrapes,
  mdiFruitPineapple,
  mdiFruitWatermelon,
  mdiGrill,
  mdiMuffin,
  mdiMushroom,
  mdiNoodles,
  mdiPotMix,
  mdiPretzel,
  mdiRice,
  mdiSausage,
  mdiShaker,
  mdiSilverwareVariant,
} from "@mdi/js";

export const BASE_URL = "http://localhost:3000/api";
export const NAME = "Blank Name";
export const expirationTime = Date.now() + 60 * 60 * 1000;

export const navigationList: INavigationLink[] = [
  { label: "Recipes", route: "/recipes" },
  { label: "Add Recipe", route: "/update-recipe" },
  { label: "Profile", route: "/update-user" },
  { label: "Login/Register", route: "/authentication" },
];

export const foodIconList: string[] = [
  mdiBaguette,
  mdiCarrot,
  mdiCheese,
  mdiEgg,
  mdiFoodDrumstick,
  mdiFruitWatermelon,
  mdiMuffin,
  mdiShaker,
  mdiPretzel,
  mdiNoodles,
  mdiFruitPineapple,
  mdiFruitGrapes,
  mdiFoodTurkey,
  mdiCookie,
  mdiCakeVariant,
  mdiBlender,
  mdiEggFried,
  mdiFruitCitrus,
  mdiGrill,
  mdiMushroom,
  mdiPotMix,
  mdiRice,
  mdiSausage,
  mdiSilverwareVariant,
];

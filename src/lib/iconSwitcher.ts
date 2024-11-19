import { mdiApple, mdiAppleFinder, mdiBowlMix, mdiCarrot, mdiCubeOffOutline, mdiCupWater, mdiEggFried, mdiFish, mdiFoodApple, mdiFoodHotDog, mdiFoodTurkey, mdiHamburgerOff, mdiLeaf, mdiMuffin, mdiPotSteam, mdiRice, mdiSeedOff, mdiSilverwareVariant } from "@mdi/js";

export const iconSwitcher = (category: string): string => {
    switch (category) {
        case "Breakfast": return mdiEggFried;
        case "Appetizers": return mdiFoodApple;
        case "Soups": return mdiPotSteam;
        case "Main Courses": return mdiFoodTurkey;
        case "Side Dishes": return mdiRice;
        case "Desserts": return mdiMuffin;
        case "Salads": return mdiBowlMix;
        case "Beverages": return mdiCupWater;
        case "Vegetarian": return mdiCarrot;
        case "Gluten-Free": return mdiSeedOff;
        case "Low-Carb": return mdiCubeOffOutline;
        case "Keto": return mdiHamburgerOff;
        case "Snacks": return mdiFoodHotDog;
        case "Seafood": return mdiFish;

        default:  return mdiSilverwareVariant;
    }
}
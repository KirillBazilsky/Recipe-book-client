import { navigationList } from "@/constants/navigation";
import router from "@/router";

export const checkGuestAccess = (route?: string): boolean | undefined => {
  const currentRoute = route ?? router.currentRoute.value.path;
  const guestAccess = navigationList.find(
    (link) => link.route === currentRoute
  )?.guestAccess;

  return guestAccess;
};

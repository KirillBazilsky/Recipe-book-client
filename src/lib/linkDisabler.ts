import { accessBlackList } from "@/constants/navigationConstants";
import { checkGuestAccess } from "./pageAccessChecker";

export const disableLink = (link: string, isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return accessBlackList.includes(link);
  }

  return !checkGuestAccess(link);
};

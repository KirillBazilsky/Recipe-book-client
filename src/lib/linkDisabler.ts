export const disableLink = (link: string, isAuthenticated: boolean) => {
  if (isAuthenticated) {
    if (link === "/authentication") return true;
  } else {
    if (["/update-recipe", "/update-user"].includes(link)) return true;
  }

  return false;
};

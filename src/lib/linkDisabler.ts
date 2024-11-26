export const disableLink = (link: string, isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return link === "/authentication";
  } else {
    return ["/update-recipe", "/update-user", "/create-recipe"].includes(link);
  }

  return false;
};

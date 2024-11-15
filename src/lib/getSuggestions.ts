export const getSuggestions = (key: string) => {
    return localStorage.getItem(key)?.split(",").filter(Boolean) ?? [];
  };
export const setLocalStorageItem = (key: string, value: string[]) => {
    const formatValue = value.join(",");
    localStorage.setItem(key, formatValue);
  };
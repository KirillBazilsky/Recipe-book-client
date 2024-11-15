  export const pushValueToSuggestions = (
    value: string,
    suggestions: string[]
  ) => {
    if (!value || !suggestions || suggestions.includes(value)) {
      return;
    }
  
    suggestions.push(value);
  };
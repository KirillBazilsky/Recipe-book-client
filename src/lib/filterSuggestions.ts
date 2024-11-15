export const filterSuggestions = (value: string, suggestions: string[]) => {
    const query = value.toLowerCase();
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query)
    );
  };
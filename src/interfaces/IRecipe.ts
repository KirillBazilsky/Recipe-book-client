interface IRecipe {
  name: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string;
  category: string;
  creator: { name: string; id: string };
  id?: string;
}

export default IRecipe;

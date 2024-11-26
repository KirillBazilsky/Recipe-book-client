import { AxiosError } from "axios";
import {
  EMAIL_IN_USE,
  EXISTING_RECIPE,
  INVALID_CREDENTIALS,
  INVALID_PASSWORD,
  NO_RECIPES_FOUND,
  UNEXPECTED_ERROR,
} from "@/constants/messages/errors";

export const errorHandler = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data.message?.includes("credential"))
      return INVALID_CREDENTIALS;

    if (error.response?.data.message?.includes("password"))
      return INVALID_PASSWORD;

    if (error.response?.data.message?.includes("email")) return EMAIL_IN_USE;

    if (error.response?.data.message?.includes("No recipes found"))
      return NO_RECIPES_FOUND;

    if(error.response?.data.message?.includes("Recipe with this name already exists")) {
      return EXISTING_RECIPE
    }

    return UNEXPECTED_ERROR;
  }
  
  return "";
};

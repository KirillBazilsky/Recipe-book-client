import { AxiosError } from "axios";
import { EMAIL_IN_USE, INVALID_CREDENTIALS, INVALID_PASSWORD, UNEXPECTED_ERROR } from "./errorMessages";

export const errorHandler = (error: unknown): string  => {
  if (error instanceof AxiosError) {
    if (error.response?.data.message.includes("credential"))
      return INVALID_CREDENTIALS;

    if (error.response?.data.message.includes("password"))
        return INVALID_PASSWORD;

    if (error.response?.data.message.includes("email"))
        return EMAIL_IN_USE;

    return UNEXPECTED_ERROR;

  }
  return ''
};

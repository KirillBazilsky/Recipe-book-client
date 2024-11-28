import { INVALID_EMAIL, INVALID_NAME, INVALID_PASSWORD, UNCONFIRMED_PASSWORD, UNMATCHED_PASSWORDS } from "@/constants/messages/errors.js";

const namePattern = /^[^\s](?!.*\s{2})[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*[^\s]$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern =  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

export const credentialsValidator = (name: string, email: string, password: string): string => {

  if (!name || !namePattern.test(name)) return INVALID_NAME;

  if (!email || !emailPattern.test(email)) return INVALID_EMAIL;

  if (!password || !passwordPattern.test(password)) return INVALID_PASSWORD;

  return '';
} 

export const updateCredentialsValidator = (name: string, email: string, password: string, confirmedPassword: string): string => {

  if (!namePattern.test(name)) return INVALID_NAME;

  if (!emailPattern.test(email)) return INVALID_EMAIL;

  if (!passwordPattern.test(password)) return INVALID_PASSWORD;

  if (password && !confirmedPassword) return UNCONFIRMED_PASSWORD;

  if (password !== confirmedPassword) return UNMATCHED_PASSWORDS;

  return '';
}
import { INVALID_EMAIL, INVALID_NAME, INVALID_PASSWORD } from "#src/lib/errors/errorMessages.js";

const namePattern = /^[^\s](?!.*\s{2})[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*[^\s]$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern =  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

export const credentialsValidator = (name: string, email: string, password: string): string => {

  if (!name || !namePattern.test(name)) return INVALID_NAME;

  if (!email || !emailPattern.test(email)) return INVALID_EMAIL;

  if (!password || !passwordPattern.test(password)) return INVALID_PASSWORD;

  return '';
} 

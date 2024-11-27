export const redirectCountDown = async (
  message: string,
  count: number,
  setMessage: (message: string, isError?: string) => void
): Promise<void> => {

  setMessage(`${message},\nredirect in\n${count}`);

  while (count > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    count--;

    setMessage(`${message},\nredirect in\n${count}`);
  }
};

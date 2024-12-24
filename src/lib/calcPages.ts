import { paginationSplitter } from "@/constants/common";

export const calcPages = (
  count: number,
  limit: number
): number[] | (string | number)[] => {
  const pageAmount = Math.ceil(count / limit);
  const pages = [];

  for (let i = 1; i <= pageAmount; i++) {
    pages.push(i);
  }

  if (pages.length < 2) {
    return [];
  }

  if (pages.length > 5) {
    const newPages = [
      ...pages.splice(0, 2),
      paginationSplitter.center,
      ...pages.splice(pages.length - 2, pages.length - 1),
    ];
    return newPages;
  }

  return pages;
};

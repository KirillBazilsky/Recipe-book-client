import { paginationSplitter } from "@/constants/common";

const pageUp = (page: number | string): number => {
  return Number(page) + 1;
};

const pageDown = (page: number | string): number => {
  return Number(page) - 1;
};

const pageOnEdgesCheck = (
  currentPage: string,
  isUp: boolean,
  firsPartEnd: number,
  lastPartStart: number
) => {
  if (isUp) {
    return (
      pageUp(currentPage) <= firsPartEnd || pageUp(currentPage) >= lastPartStart
    );
  }
  return (
    pageDown(currentPage) <= firsPartEnd ||
    pageDown(currentPage) >= lastPartStart
  );
};

const pageOnBodyCheck = (
  currentPage: string,
  isUp: boolean,
  firsPartEnd: number,
  lastPartStart: number
) => {
  if (isUp) {
    return (
      pageUp(currentPage) > firsPartEnd && pageUp(currentPage) < lastPartStart
    );
  }
  return (
    pageDown(currentPage) < lastPartStart && pageDown(currentPage) > firsPartEnd
  );
};

export const calcPanel = (
  pages: (number | string)[],
  currentPage: string,
  isUp?: boolean
) => {
  if (pages.length < 5) {
    return pages;
  }

  const tempPages = [...pages];
  const pagesFirstPart = tempPages.splice(0, 2);
  const firsPartEnd = Number(pagesFirstPart[pagesFirstPart.length - 1]);
  const pagesLastPart = tempPages.splice(
    tempPages.length - 2,
    tempPages.length
  );
  const lastPartStart = Number(pagesLastPart[0]);
  const defaultPages = [...pagesFirstPart, paginationSplitter.center, ...pagesLastPart];

  if (isUp) {
    if (pageOnEdgesCheck(currentPage, true, firsPartEnd, lastPartStart)) {
      return defaultPages;
    }

    if (pageOnBodyCheck(currentPage, true, firsPartEnd, lastPartStart)) {
      const updatedPage = [
        1,
        2,
        paginationSplitter.left,
        pageUp(currentPage),
        paginationSplitter.right,
        ...pagesLastPart,
      ];
      return updatedPage;
    }
  }

  if (pageOnEdgesCheck(currentPage, false, firsPartEnd, lastPartStart)) {
    return defaultPages;
  }

  if (pageOnBodyCheck(currentPage, false, firsPartEnd, lastPartStart)) {
    const updatedPage = [
      1,
      2,
      paginationSplitter.left,
      pageDown(Number(currentPage)),
      paginationSplitter.right,
      ...pagesLastPart,
    ];
    return updatedPage;
  }
  return defaultPages;
};

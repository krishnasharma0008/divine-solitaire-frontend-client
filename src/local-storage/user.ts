import {
  TOKEN,
  USER,
  CONTACTNO,
  OTP,
  REDIRECTION_ROUTE,
  PORTFOLIO_UID,
  WISHLIST_UID,
  TABNO,
  //SEL_CURRENCY,
} from "./keys";

// export const setToken = (token: string): void =>
//   localStorage.setItem(TOKEN, token);
// Function to set the Token in localStorage
export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN, token);
  }
};

export const setUser = (user: string): void =>
  localStorage.setItem(USER, user);

export const setMobileNumber = (contactno: string): void =>
  localStorage.setItem(CONTACTNO, contactno);

export const setOTP = (otp: string): void => localStorage.setItem(OTP, otp);

export const getUser = (): string | null =>
  localStorage.getItem(USER);

export const getMobileNumber = (): string | null =>
  localStorage.getItem(CONTACTNO);

export const getOTP = (): string | null => localStorage.getItem(OTP);

//export const getToken = (): string | null => localStorage.getItem(TOKEN);
// Function to get the Token from localStorage
export const getToken = (): string | null => {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN) : null;
};

export const setRedirectionRoute = (url: string): void =>
  localStorage.setItem(REDIRECTION_ROUTE, url);
export const getRedirectionRoute = (): string | null =>
  localStorage.getItem(REDIRECTION_ROUTE);
export const deleteRedirectionRoute = (): void =>
  localStorage.removeItem(REDIRECTION_ROUTE);

export const deleteUser = ()=> localStorage.setItem(USER,"");
export const deleteMobileNumber = () => localStorage.setItem(CONTACTNO, "");
export const deleteOTP = () => localStorage.setItem(OTP, "");
export const deleteToken = () => localStorage.setItem(TOKEN, "");

export const setPortfoliouid = (portfoliouid: string): void =>
  localStorage.setItem(PORTFOLIO_UID, portfoliouid);
export const getPortfoliouid = (): string | null =>
  localStorage.getItem(PORTFOLIO_UID);
export const deletePortfoliouid = (): void =>
  localStorage.removeItem(PORTFOLIO_UID);

export const setWishListuid = (WishListuid: string): void =>
  localStorage.setItem(WISHLIST_UID, WishListuid);
export const getWishListuid = (): string | null =>
  localStorage.getItem(WISHLIST_UID);
export const deleteWishListuid = (): void =>
  localStorage.removeItem(PORTFOLIO_UID);


export const setRedirectionTabno = (tabno: string): void =>
  localStorage.setItem(TABNO, tabno);
export const getRedirectionTabno = (): string | null =>
  localStorage.getItem(TABNO);
export const deleteRedirectionTabno = (): void =>
  localStorage.removeItem(TABNO);

//export const setSelCurrency = (SelCurrency: string): void =>
//  localStorage.setItem(SEL_CURRENCY, SelCurrency);
//export const getSelCurrency = (): string | null =>
//  localStorage.getItem(SEL_CURRENCY);
//export const deleteSelCurrency = (): void =>
//  localStorage.removeItem(SEL_CURRENCY);

import { AxiosResponse } from "axios";

import { Clarity, Colour, Shape } from "@/enum";
import { ClarityRound, ClarityRoundcarat } from "@/enum/clarity-enum";
import { ComparePrice } from "@/interface";
import DiamondCoin from "@/interface/diamond-coin";
import IPastPrice from "@/interface/past-price";
import StonePrice from "@/interface/stone-price";
import { getToken } from "@/local-storage";

import {
  comparePastPricesEndpoint,
  deleteSolitairePriceEndpoint,
  getDiamondCoinEndpoint,
  getSolitairePriceListEndpoint,
  saveSolitairePriceEndpoint,
} from "./endpoints";
import { getStonePriceEndpoint } from "./endpoints";
import callWebService from "./web-service";

interface ComparePastPricesResponse {
  flag: "true" | "false";
  message: string;
  data: IPastPrice;
}

const comparePastPrices = (
  params: ComparePrice,
  countryCode: string
): Promise<AxiosResponse<ComparePastPricesResponse>> =>
  //callWebService(comparePastPricesEndpoint.url, {
    callWebService(`${comparePastPricesEndpoint.url}?countrycode=${countryCode}&islocal=0`, {
    method: comparePastPricesEndpoint.method,
    params
  });

interface StonePriceResponse {
  flag: boolean;
  message: string;
  data: number;
  premium_per: number; // Add premium_per
  premium_size_range: string; // Add premium_size_range
  premium_fr_cts: number;
  premium_to_cts: number;
  currency_locale:string;
  currency_code:string;
}

const getStonePrice = (
  params: Omit<ComparePrice, "day" | "month" | "year">,
  countryCode: string
): Promise<AxiosResponse<StonePriceResponse>> =>
  //callWebService(getStonePriceEndpoint.url, {
    callWebService(`${getStonePriceEndpoint.url}?countrycode=${countryCode}&islocal=0`, {
    method: getStonePriceEndpoint.method,
    params
  });

interface SaveSolitairePricePayload {
  shape: Shape;
  colour: Colour;
  purity: Clarity | ClarityRound | ClarityRoundcarat;
  carat: number;
  price: number;
  chkdate: string;
}

const saveSolitairePrice = (
  payload: SaveSolitairePricePayload,
  countryCode: string
): Promise<AxiosResponse<StonePriceResponse>> =>
  callWebService(saveSolitairePriceEndpoint.url, {
    method: saveSolitairePriceEndpoint.method,
    data: payload,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: {
      countryCode: countryCode, // Assuming the parameter name is 'countryCode'
      islocal:"0"
    },
  });

interface SolitairePriceListResponse {
  data: Array<StonePrice>;
}
const getSolitairePriceList = (countryCode: string): Promise<
  AxiosResponse<SolitairePriceListResponse>
> =>
  callWebService(getSolitairePriceListEndpoint.url, {
    method: getSolitairePriceListEndpoint.method,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: {
      countrycode: countryCode,
      islocal:"0" // Assuming the parameter name is 'countryCode'
    },
  });

const deleteSolitairePrice = (
  id: number,
  countryCode: string
): Promise<AxiosResponse<{ success: boolean }>> =>
  callWebService(`${deleteSolitairePriceEndpoint.url}/${id}`, {
    method: deleteSolitairePriceEndpoint.method,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params: {
      countryCode: countryCode, // Assuming the parameter name is 'countryCode'
      islocal:"0"
    },
  });

  interface DiamondCoinResponse {    
    currency_code: string;
    currency_locale:string
    data: Array<DiamondCoin>;
  }

  const getDiamondCoin = (countryCode: string): Promise<AxiosResponse<DiamondCoinResponse>> =>
    //callWebService(getDiamondCoinEndpoint.url, {
    callWebService(`${getDiamondCoinEndpoint.url}?countrycode=${countryCode}&islocal=0`, {
      method: getDiamondCoinEndpoint.method,
      //params
    });

export {
  comparePastPrices,
  getStonePrice,
  saveSolitairePrice,
  getSolitairePriceList,
  deleteSolitairePrice,
  getDiamondCoin,
};

export {
  type ComparePastPricesResponse,
  type StonePriceResponse,
  type SolitairePriceListResponse,
  type DiamondCoinResponse,
};

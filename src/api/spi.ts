import { AxiosResponse } from "axios";

import { Shape } from "@/enum";
import { SolitairePriceIndex } from "@/interface";

import { getSolitairePriceIndexEndpoint } from "./endpoints";
import callWebService from "./web-service";

export interface SolitairePriceIndexResponse {
  data: SolitairePriceIndex;
  message: "Success" | "Failed";
}

// const getSolitairePriceIndex = (
//   month: string,
//   year: number,
//   countrycode:string
// ): Promise<AxiosResponse<SolitairePriceIndexResponse>> =>
//   callWebService(getSolitairePriceIndexEndpoint.url, {
//     method: getSolitairePriceIndexEndpoint.method,
//     timeout: 60 * 1000,
//     params: {
//       shape: Shape.SPIROUND,
//       month,
//       year,
//       countrycode
//     },
//   });

const getSolitairePriceIndex = (
  month: string,
  year: number,
  countrycode: string
): Promise<AxiosResponse<SolitairePriceIndexResponse>> => {
  console.log(`Fetching Solitaire Price Index for country code: ${countrycode}`);

  return callWebService(getSolitairePriceIndexEndpoint.url, {
    method: getSolitairePriceIndexEndpoint.method,
    timeout: 60 * 1000,
    params: {
      shape: Shape.SPIROUND,
      month,
      year,
      countrycode,
      islocal :"0",
    },
  });
};

export default getSolitairePriceIndex;

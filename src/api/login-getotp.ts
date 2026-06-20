import { AxiosResponse } from "axios";

import { loginGetOTPEndpoint } from "./endpoints";
import callWebService from "./web-service";

export interface LoginResponse {
  id: number;
  message: "SUCCESS" | "FAILURE";
  token: string;
  sucess:boolean,
  error:string;
}

const loginGetOTPApi = (
  contactno: string
): Promise<AxiosResponse<LoginResponse>> =>
  callWebService(loginGetOTPEndpoint.url, {
    method: loginGetOTPEndpoint.method,
    timeout: 20000,
    data: {
      contactno,
    },
  });

export default loginGetOTPApi;

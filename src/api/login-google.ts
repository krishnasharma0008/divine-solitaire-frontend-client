import { AxiosResponse } from "axios";

import { googleLoginEndpoint } from "./endpoints";
import callWebService from "./web-service";

export interface GoogleLoginResponse {
  message: "SUCCESS" | "FAILURE";
  token: string;
  fname: string | null;
  mno: string | null;
}

const loginGoogleApi = (
  code: string
): Promise<AxiosResponse<GoogleLoginResponse>> =>
  callWebService(googleLoginEndpoint.url, {
    method: googleLoginEndpoint.method,
    timeout: 20000,
    data: { code },
  });

export default loginGoogleApi;
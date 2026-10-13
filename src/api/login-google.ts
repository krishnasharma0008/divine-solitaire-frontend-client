import { AxiosResponse } from "axios";

import { googleLoginEndpoint } from "./endpoints";
import callWebService from "./web-service";

export interface GoogleLoginResponse {
  success?: boolean;
  msg?: string;
  token?: string;
  fname?: string | null;
  mno?: string | null;
}

const loginGoogleApi = (
  idtoken: string
): Promise<AxiosResponse<GoogleLoginResponse>> =>
  callWebService(googleLoginEndpoint.url, {
    method: googleLoginEndpoint.method,
    timeout: 20000,
    data: { idtoken },
  });

export default loginGoogleApi;
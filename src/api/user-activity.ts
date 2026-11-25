import { AxiosResponse } from "axios";

import { userActivitySecureEndpoint } from "./endpoints";
import callWebService from "./web-service";

export interface UserActivityPayload {
  sessionid: string;
  vsource: string;
  page: string;
  activitytype: string;
  activitydetail: string;
  country: string;
}

export const saveUserActivity = (
  payload: UserActivityPayload,
  token: string
): Promise<AxiosResponse> =>
  callWebService(userActivitySecureEndpoint.url, {
    method: userActivitySecureEndpoint.method,
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
    data: payload,
    validateStatus: () => true,
  });

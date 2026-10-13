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

// Sirf logged-in users ke liye: /api/sec/activity (token se user pehchana jata hai).
// validateStatus: () => true  ->  koi bhi status "success" maana jata hai, isliye
// web-service ka interceptor yahan token delete ya error throw nahi karta.
// Analytics ki wajah se user kabhi logout nahi hoga.
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

import { saveUserActivity } from "@/api/user-activity";
import { API_CONFIG } from "@/config";
import { getToken } from "@/local-storage";

// Backend ke GET /api/activity/types se exact spelling match karo
// (jaise "Search" ya "search"). Sirf yahin badalna padega.
export const ActivityTypes = {
  PageView: "page_view",
  Search: "search",
  TabView: "tab_view",
  UidSearch: "uid_search",
  Compare: "compare",
  OpenItem: "open_item",
  Login: "login",
  Logout: "logout",
} as const;

export type ActivityType = (typeof ActivityTypes)[keyof typeof ActivityTypes];

const COUNTRY_NAMES: Record<string, string> = {
  IN: "India",
  US: "USA",
  AE: "UAE",
};

let countryPromise: Promise<string> | null = null;

// Ek page load mein sirf ek baar /api/ipinfo call hota hai.
// 2 second mein na mile ya fail ho to "" bhejte hain, activity phir bhi log hoti hai.
const getCountry = (): Promise<string> => {
  if (!countryPromise) {
    countryPromise = Promise.race([
      fetch("/api/ipinfo").then((res) => (res.ok ? res.json() : null)),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000)),
    ])
      .then((data) =>
        data?.country_code
          ? COUNTRY_NAMES[data.country_code] ?? data.country ?? data.country_code
          : ""
      )
      .catch(() => "");
  }
  return countryPromise;
};

// "null"/"undefined" jaise kharab token ko header mein mat bhejo
const getCleanToken = (): string | null => {
  const t = (getToken() ?? "").trim();
  return t && t !== "null" && t !== "undefined" ? t : null;
};

export const getSessionId = (): string => {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem("sessionid");
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem("sessionid", id);
    }
    return id;
  } catch {
    return "";
  }
};

/** Fire-and-forget: kabhi throw nahi karta, UI ko block nahi karta. */
export const logActivity = (
  activitytype: ActivityType,
  activitydetail = "",
  page?: string
): void => {
  if (typeof window === "undefined" || !API_CONFIG.host) return;

  // Sirf secured endpoint (/api/sec/activity) use hota hai. Token ke bina wo
  // request 400 deti hai, isliye guest (logged-out) ki activity save nahi hoti.
  const token = getCleanToken();
  if (!token) return;

  // event ke waqt ki values abhi pakad lo
  const pageValue = page ?? window.location.pathname + window.location.hash;
  const sessionid = getSessionId();

  getCountry().then((country) => {
    saveUserActivity(
      {
        sessionid,
        vsource: "Website",
        page: pageValue,
        activitytype,
        activitydetail,
        country,
      },
      token
    ).catch(() => undefined);
  });
};

/**
 * Sab tracking calls ka single entry point.
 * Naya event: upar ActivityTypes mein type add karo, yahan ek helper.
 * Detail strings purane format jaise hi hain, taaki dashboard ka data consistent rahe.
 */
export const track = {
  pageView: (path: string) => logActivity(ActivityTypes.PageView, "", path),
  search: (detail: string) => logActivity(ActivityTypes.Search, detail),
  tabView: (label: string, path: string) =>
    logActivity(ActivityTypes.TabView, label, `${path}#${label}`),
  uidFound: (uid: string, status: string) =>
    logActivity(
      ActivityTypes.UidSearch,
      `${uid.toUpperCase()}, Found, ${status}`
    ),
  uidNotFound: (uid: string) =>
    logActivity(ActivityTypes.UidSearch, `${uid.toUpperCase()}, Not found`),
  compare: (monthYear: string) => logActivity(ActivityTypes.Compare, monthYear),
  openItem: (uid: string) => logActivity(ActivityTypes.OpenItem, uid),
  login: (method: string) => logActivity(ActivityTypes.Login, method),
  logout: () => logActivity(ActivityTypes.Logout),
};
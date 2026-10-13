import { clearAdminSession, getAdminToken } from "./admin-auth";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

export interface ActivityRow {
  id: string;
  datetime: string;
  user: string | null; // null = guest
  page: string;
  activitytype: string;
  activitydetail: string;
  country: string | null;
}

export interface ActivityResponse {
  data: ActivityRow[];
  total: number;
  pageSize: number;
}

export interface ActivityFilters {
  from: string; // yyyy-mm-dd
  to: string; // yyyy-mm-dd
  user: string;
  country: string; // "" = all, otherwise "India" | "USA" | "UAE"
}

export class AdminApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type Raw = Record<string, unknown>;

const authHeaders = (): Record<string, string> => {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const toQuery = (f: ActivityFilters, extra: Record<string, string> = {}) => {
  const p = new URLSearchParams();
  if (f.from) p.set("fromdate", f.from);
  if (f.to) p.set("todate", f.to);
  if (f.user.trim()) p.set("user", f.user.trim());
  if (f.country) p.set("country", f.country);
  Object.entries(extra).forEach(([k, v]) => p.set(k, v));
  return p.toString();
};

const ensureOk = (res: Response): void => {
  if (res.status === 401) {
    clearAdminSession();
    throw new AdminApiError("Your session expired. Sign in again.", 401);
  }
  if (!res.ok) {
    throw new AdminApiError("Could not load activity. Try again.", res.status);
  }
};

const pick = (raw: Raw, keys: string[]): string => {
  for (const k of keys) {
    const v = raw[k];
    if (v !== undefined && v !== null && v !== "") return String(v);
  }
  return "";
};

// TODO: field names ko real API response ke hisaab se adjust karo
const mapRow = (raw: Raw, index: number): ActivityRow => ({
  id: pick(raw, ["id", "activityid"]) || String(index),
  datetime: pick(raw, ["createdon", "created_at", "datetime", "activitydate", "date"]),
  user: pick(raw, ["username", "user", "name", "mobile", "contactno"]) || null,
  page: pick(raw, ["page"]),
  activitytype: pick(raw, ["activitytype", "type"]),
  activitydetail: pick(raw, ["activitydetail", "detail"]),
  country: pick(raw, ["country"]) || null,
});

// TODO: list kis key ke andar aati hai, wo real response se confirm karo
const extractList = (json: unknown): Raw[] => {
  if (Array.isArray(json)) return json as Raw[];
  const obj = (json ?? {}) as Raw;
  for (const key of ["data", "list", "rows", "activities", "result"]) {
    if (Array.isArray(obj[key])) return obj[key] as Raw[];
  }
  return [];
};

export const adminLogin = async (
  email: string,
  password: string
): Promise<{ token: string; name: string }> => {
  // TODO: apne admin login ka real endpoint aur response yahan lagao
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new AdminApiError(
      res.status === 401
        ? "Incorrect email or password. Check both and try again."
        : "Could not sign in. Try again in a moment.",
      res.status
    );
  }
  const data = await res.json();
  if (!data?.token) {
    throw new AdminApiError("Could not sign in. Try again in a moment.", 500);
  }
  return { token: data.token, name: data.name ?? "Admin" };
};

export const fetchActivity = async (
  filters: ActivityFilters,
  page: number
): Promise<ActivityResponse> => {
  const query = toQuery(filters, { pageno: String(page) });
  const res = await fetch(`${BASE_URL}/api/secadmin/activity/list?${query}`, {
    headers: authHeaders(),
  });
  ensureOk(res);

  const json = await res.json();
  const list = extractList(json);
  const obj = (Array.isArray(json) ? {} : json ?? {}) as Raw;
  const total = Number(obj.total ?? obj.totalrecords ?? obj.totalcount ?? obj.count);
  const pageSize = Number(obj.pagesize ?? obj.pageSize);

  return {
    data: list.map(mapRow),
    total: Number.isFinite(total) && total > 0 ? total : list.length,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 ? pageSize : list.length || 20,
  };
};

export const exportActivityCsv = async (filters: ActivityFilters): Promise<void> => {
  const res = await fetch(
    `${BASE_URL}/api/secadmin/activity/csv?${toQuery(filters)}`,
    { headers: authHeaders() }
  );
  ensureOk(res);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `visitor-activity_${filters.from}_to_${filters.to}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

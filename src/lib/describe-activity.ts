import type { ActivityRow } from "./admin-api";

export type BadgeTone = "search" | "uid" | "neutral";

export interface ActivityLabel {
  badge: string;
  tone: BadgeTone;
  detail: string;
}

const LABELS: Record<string, { badge: string; tone: BadgeTone }> = {
  pageview: { badge: "Page view", tone: "neutral" },
  search: { badge: "Search", tone: "search" },
  tabview: { badge: "Tab view", tone: "neutral" },
  uidsearch: { badge: "UID search", tone: "uid" },
  compare: { badge: "Compare", tone: "neutral" },
  openitem: { badge: "Open item", tone: "neutral" },
};

const normalize = (t: string) => t.toLowerCase().replace(/[^a-z]/g, "");

const humanize = (t: string) => {
  const words = t.replace(/[_-]+/g, " ").trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "Activity";
};

export const describeActivity = (row: ActivityRow): ActivityLabel => {
  const known = LABELS[normalize(row.activitytype)];
  return {
    badge: known?.badge ?? humanize(row.activitytype),
    tone: known?.tone ?? "neutral",
    detail: row.activitydetail,
  };
};

export const formatDateTime = (value: string): string => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};

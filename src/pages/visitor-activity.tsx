import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

import {
  ActivityFilters,
  ActivityRow,
  exportActivityCsv,
  fetchActivity,
} from "@/lib/admin-api";
import {
  clearAdminSession,
  getAdminName,
  getAdminToken,
} from "@/lib/admin-auth";
import {
  BadgeTone,
  describeActivity,
  formatDateTime,
} from "@/lib/describe-activity";

const PAGE_SIZE = 20;

const COUNTRIES = [
  { value: "", label: "All countries" },
  { value: "India", label: "India" },
  { value: "USA", label: "USA" },
  { value: "UAE", label: "UAE" },
];

const CHIPS = [
  { label: "Today", days: 1 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
];

const TONES: Record<BadgeTone, string> = {
  search: "bg-[#ede3cf] text-[#5c4519]",
  uid: "bg-[#dce6f2] text-[#1f3a5c]",
  neutral: "bg-[#e6e6e6] text-[#333]",
};

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6A2F]";
const FIELD =
  "flex min-w-[170px] flex-1 flex-col gap-1.5 text-xs text-[#5f5f5f]";
const CONTROL = `h-10 rounded-md border border-[#bdbab2] bg-white px-2.5 text-sm text-[#1a1a1a] ${FOCUS}`;
const CARD = "rounded-lg border border-[#e4e2dc] bg-white p-5";
const TH =
  "whitespace-nowrap border-b border-[#e4e2dc] px-3 py-2.5 text-left text-xs font-semibold text-[#5f5f5f]";
const TD = "whitespace-nowrap border-b border-[#efede8] px-3 py-3";

const pad = (n: number) => String(n).padStart(2, "0");
const toInputDate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// "Last N days" includes today
const rangeFor = (days: number) => {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - (days - 1));
  return { from: toInputDate(from), to: toInputDate(to) };
};

const defaultFilters = (): ActivityFilters => ({
  ...rangeFor(7),
  user: "",
  country: "",
});

export default function VisitorActivityPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [adminName, setAdminName] = useState("");

  const [applied, setApplied] = useState<ActivityFilters>(defaultFilters);
  const [draft, setDraft] = useState<ActivityFilters>(applied);
  const [dateError, setDateError] = useState("");

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<ActivityRow[]>([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/login");
      return;
    }
    setAdminName(getAdminName() ?? "Admin");
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchActivity(applied, page)
      .then((res) => {
        if (cancelled) return;
        setRows(res.data);
        setTotal(res.total);
        setPageSize(res.pageSize);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (getAdminToken() === null) {
          router.replace("/login");
          return;
        }
        setError(
          err instanceof Error
            ? err.message
            : "Could not load activity. Try again.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [ready, applied, page, reloadKey, router]);

  const apply = (e: FormEvent) => {
    e.preventDefault();
    if (draft.from && draft.to && draft.from > draft.to) {
      setDateError("From date must be on or before To date.");
      return;
    }
    setDateError("");
    setPage(1);
    setApplied({ ...draft });
  };

  const pickChip = (days: number) => {
    setDateError("");
    setDraft((d) => ({ ...d, ...rangeFor(days) }));
  };

  const activeChip = CHIPS.find((c) => {
    const r = rangeFor(c.days);
    return r.from === draft.from && r.to === draft.to;
  })?.days;

  const onExport = async () => {
    setExporting(true);
    try {
      await exportActivityCsv(applied);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not export. Try again.",
      );
    } finally {
      setExporting(false);
    }
  };

  const signOut = () => {
    clearAdminSession();
    router.replace("/login");
  };

  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  if (!ready) return null;

  return (
    <>
      <Head>
        <title>Visitor Activity | Divine Solitaires Admin</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-[#f4f4f2] text-[#1a1a1a]">
        <header className="flex flex-wrap items-center justify-between gap-3 bg-[#111] px-4 py-5 sm:px-10">
          <div className="text-[13px] tracking-[0.3em] text-[#C9A45C]">
            DIVINE SOLITAIRES
          </div>
          <div className="flex items-center gap-4 text-[13px] text-[#d9d9d9]">
            <span>{adminName}</span>
            <button
              type="button"
              onClick={signOut}
              className={`cursor-pointer text-[#C9A45C] underline ${FOCUS}`}
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 px-4 py-8 sm:px-10">
          <div>
            <h1 className="m-0 text-[26px] font-semibold">Visitor Activity</h1>
            <p className="mt-1.5 text-[13px] text-[#5f5f5f]">
              Pages visited, searches and actions by user and session.
            </p>
          </div>

          <form onSubmit={apply} className={`${CARD} flex flex-col gap-4`}>
            <div className="flex flex-wrap gap-2">
              {CHIPS.map((chip) => {
                const active = activeChip === chip.days;
                return (
                  <button
                    key={chip.days}
                    type="button"
                    aria-pressed={active}
                    onClick={() => pickChip(chip.days)}
                    className={`h-9 cursor-pointer rounded-full border px-4 text-sm ${FOCUS} ${
                      active
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-[#bdbab2] bg-white text-[#1a1a1a]"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <label className={FIELD}>
                From date
                <input
                  type="date"
                  value={draft.from}
                  max={draft.to || undefined}
                  onChange={(e) => setDraft({ ...draft, from: e.target.value })}
                  className={CONTROL}
                />
              </label>
              <label className={FIELD}>
                To date
                <input
                  type="date"
                  value={draft.to}
                  min={draft.from || undefined}
                  onChange={(e) => setDraft({ ...draft, to: e.target.value })}
                  className={CONTROL}
                />
              </label>
              <label className={FIELD}>
                User
                <input
                  type="text"
                  placeholder="Search user"
                  value={draft.user}
                  onChange={(e) => setDraft({ ...draft, user: e.target.value })}
                  className={CONTROL}
                />
              </label>
              <label className={FIELD}>
                Country
                <select
                  value={draft.country}
                  onChange={(e) =>
                    setDraft({ ...draft, country: e.target.value })
                  }
                  className={CONTROL}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className={`h-10 cursor-pointer rounded-md bg-[#111] px-5 text-sm font-semibold text-white ${FOCUS}`}
              >
                Apply
              </button>
              <button
                type="button"
                onClick={onExport}
                disabled={exporting}
                className={`h-10 cursor-pointer rounded-md border border-[#111] bg-white px-4 text-sm font-semibold text-[#111] disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS}`}
              >
                {exporting ? "Exporting..." : "Export CSV"}
              </button>
            </div>
            {dateError && (
              <p role="alert" className="m-0 text-sm text-[#b00020]">
                {dateError}
              </p>
            )}
          </form>

          <section className={CARD} aria-labelledby="log-title">
            <h2 id="log-title" className="m-0 text-base font-semibold">
              Activity log
            </h2>

            {error && (
              <div
                role="alert"
                className="mt-3 flex items-center gap-3 text-sm text-[#b00020]"
              >
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => setReloadKey((k) => k + 1)}
                  className={`cursor-pointer rounded-md border border-[#111] bg-white px-3 py-1 text-[13px] font-semibold text-[#111] ${FOCUS}`}
                >
                  Retry
                </button>
              </div>
            )}

            <div className="mt-2 overflow-x-auto">
              <table className="w-full border-collapse text-[13px]">
                <caption className="sr-only">
                  Visitor activity for the selected dates
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className={TH}>
                      Date Time
                    </th>
                    <th scope="col" className={TH}>
                      User
                    </th>
                    <th scope="col" className={TH}>
                      Page
                    </th>
                    <th scope="col" className={TH}>
                      Activity
                    </th>
                    <th scope="col" className={TH}>
                      Country
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && rows.length === 0 && (
                    <tr>
                      <td colSpan={5} className={`${TD} text-[#5f5f5f]`}>
                        Loading activity...
                      </td>
                    </tr>
                  )}
                  {!loading && !error && rows.length === 0 && (
                    <tr>
                      <td colSpan={5} className={`${TD} text-[#5f5f5f]`}>
                        No activity for these filters. Try a wider date range.
                      </td>
                    </tr>
                  )}
                  {rows.map((row) => {
                    const label = describeActivity(row);
                    return (
                      <tr key={row.id} className={loading ? "opacity-60" : ""}>
                        <td className={TD}>{formatDateTime(row.datetime)}</td>
                        <td className={TD}>{row.user ?? "Guest"}</td>
                        <td className={TD}>{row.page}</td>
                        <td className={TD}>
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              TONES[label.tone]
                            }`}
                          >
                            {label.badge}
                          </span>
                          {label.detail && (
                            <span className="ml-1.5">{label.detail}</span>
                          )}
                        </td>
                        <td className={TD}>{row.country || "Unknown"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#5f5f5f]">
              <span>
                Showing {start} to {end} of {total.toLocaleString()} records
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1 || loading}
                  onClick={() => setPage((p) => p - 1)}
                  className={`h-[34px] cursor-pointer rounded-md border border-[#bdbab2] bg-white px-4 text-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS}`}
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= lastPage || loading}
                  onClick={() => setPage((p) => p + 1)}
                  className={`h-[34px] cursor-pointer rounded-md border border-[#111] bg-[#111] px-4 text-white disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS}`}
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

//import { adminLogin } from "@/lib/admin-api";
//import { getAdminToken, setAdminSession } from "@/lib/admin-auth";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6A2F]";
const INPUT = `h-12 rounded-md border border-[#bdbab2] px-3.5 text-[15px] text-[#1a1a1a] ${FOCUS}`;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     if (getAdminToken()) router.replace("/visitor-activity");
  //   }, [router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      //const { token, name } = await adminLogin(email.trim(), password);
      //setAdminSession(token, name, remember);
      router.replace("/visitor-activity");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not sign in. Try again.",
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Divine Solitaires</title>
      </Head>
      <div className="flex min-h-screen flex-wrap">
        <div className="box-border flex flex-1 basis-[420px] flex-col justify-between gap-12 bg-[#111] p-8 text-white sm:p-16">
          <div className="text-[13px] tracking-[0.3em] text-[#C9A45C]">
            DIVINE SOLITAIRES
          </div>
          <div>
            <h1 className="m-0 text-[44px] font-semibold leading-[1.15]">
              Admin Console
            </h1>
            <p className="mt-4 max-w-[420px] text-base leading-relaxed text-[#cfcfcf]">
              Monitor visitor activity, searches and engagement across the
              client website.
            </p>
          </div>
          <div className="text-[13px] text-[#a8a8a8]">
            Restricted access. All admin activity is logged.
          </div>
        </div>

        <div className="box-border flex flex-1 basis-[480px] items-center justify-center bg-white p-6 sm:p-12">
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex w-full max-w-[400px] flex-col gap-5"
          >
            <div>
              <h2 className="m-0 text-[28px] font-semibold text-[#1a1a1a]">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-[#5f5f5f]">
                Use your admin credentials to continue.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[13px] font-medium text-[#1a1a1a]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={INPUT}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[13px] font-medium text-[#1a1a1a]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={INPUT}
              />
            </div>

            <div className="flex items-center justify-between text-[13px] text-[#1a1a1a]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Keep me signed in
              </label>
              <Link
                href="/forgot-password"
                className={`text-[#8A6A2F] underline hover:text-[#5c4519] ${FOCUS}`}
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p role="alert" className="m-0 text-sm text-[#b00020]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`h-12 cursor-pointer rounded-md bg-[#111] font-semibold tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS}`}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>

            <p className="m-0 text-center text-xs text-[#5f5f5f]">
              Need access? Contact the system owner.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

"use client";

import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { useEffect, useState } from "react";

//import styles from './pyds.module.css';
import styles from "../../components/common/pyds/pyds.module.css";

/* Fonts (Divine Solitaires brand: Montserrat for UI/body, Cormorant for the wordmark) */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

/* Resolve one or more CSS-module class names (unknown names are dropped) */
const s = styles as Record<string, string>;
const cx = (...names: Array<string | false | undefined>) =>
  names
    .map((n) => (n ? s[n] : ""))
    .filter(Boolean)
    .join(" ");

const PLAN_OPTIONS = [
  "PYDS A — ₹3,000 / month",
  "PYDS B — ₹5,000 / month",
  "PYDS C — ₹10,000 / month",
  "PYDS D — ₹15,000 / month",
  "PYDS E — 0.50 ct & above",
  "Group Plan (GPYDS)",
  "Not sure yet",
];

export default function PydsLanding() {
  /* ---------- enquiry modal state ---------- */
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [errors, setErrors] = useState<{
    mobile?: boolean;
    email?: boolean;
    plan?: boolean;
  }>({});

  const onEnquire = () => {
    setSuccess(false);
    setErrors({});
    setMobile("");
    setEmail("");
    setPlan("");
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  const submit = () => {
    const digits = mobile.replace(/\D/g, "");
    const next = {
      mobile: digits.length !== 10,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
      plan: plan === "",
    };
    setErrors(next);
    if (next.mobile || next.email || next.plan) return;
    /* TODO: send { mobile, email, plan } to your CRM / form endpoint here */
    setSuccess(true);
  };

  /* lock scroll + close on Escape while modal is open */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* scroll-reveal animations */
  useEffect(() => {
    const revealClass = s.reveal;
    if (!revealClass) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(s.show);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    document
      .querySelectorAll("." + revealClass)
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`${styles.page} ${montserrat.variable} ${cormorant.variable}`}
    >
      <header className={cx("hero")}>
        {/* <div className={cx("logo")}>
          <svg
            className={cx("trinity")}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Divine Solitaires"
          >
            <path
              d="M50,54 C34,45 34,22 50,12 C66,22 66,45 50,54 Z"
              fill="#E1313F"
              opacity=".92"
            />
            <path
              d="M50,54 C34,45 34,22 50,12 C66,22 66,45 50,54 Z"
              fill="#F7B700"
              opacity=".92"
              transform="rotate(120 50 50)"
            />
            <path
              d="M50,54 C34,45 34,22 50,12 C66,22 66,45 50,54 Z"
              fill="#65ACDD"
              opacity=".92"
              transform="rotate(240 50 50)"
            />
            <path d="M50,4 L56,12 L50,20 L44,12 Z" fill="#1D1D1B" />
          </svg>
          <div className={cx("wm")}>
            <span className={cx("dv")}>DIVINE</span>
            <span className={cx("sol")}>SOLITAIRES</span>
            <span className={cx("tag")}>RARE. PRECIOUS. UNMATCHED.</span>
          </div>
        </div> */}

        <div className={cx("hero-grid")}>
          <div className={cx("hero-copy")}>
            <span className={cx("eyebrow")}>Plan Your Dream Solitaire</span>
            <h1>
              Own the solitaire
              <br />
              you’ve always dreamed of
            </h1>
            <p className={cx("triple")}>
              Privilege · Price Protection · Promising
            </p>
            <p className={cx("lede")}>
              Book with just <b>10% today</b> — that’s the first of your 9
              instalments. Pay 8 more and Divine Solitaires adds the 10th,{" "}
              <b>free</b>. All with price protection, so you never overpay.
            </p>
            <div className={cx("cta-row")}>
              {/* <button
                type="button"
                className={cx("btn", "gold")}
                onClick={onEnquire}
              >
                Enquire about the plan
              </button> */}
              <a
                href="#plans"
                className={cx("btn")}
                style={{
                  background: "#fff",
                  color: "#0d3530",
                  borderColor: "rgba(13,53,48,.12)",
                }}
              >
                See the plans
              </a>
            </div>
            <p className={cx("book-note")} style={{ marginTop: "14px" }}>
              A Divine Solitaires savings plan · Available at partner stores
            </p>
          </div>
          <div className={cx("hero-img")}>
            <img
              src="/pyds-ring.jpg"
              alt="Divine Solitaires gold solitaire diamond ring"
            />
          </div>
        </div>
      </header>

      <section>
        <div className={cx("wrap")}>
          <div className={cx("section-head", "reveal")}>
            <span className={cx("eyebrow")}>How it works</span>
            <h2>Three simple steps</h2>
            <p>A clear, transparent path to owning your dream solitaire.</p>
          </div>
          <div className={cx("steps")}>
            <div className={cx("step", "reveal")}>
              <div className={cx("step-no")}>1</div>
              <h3>Book with 10% today</h3>
              <p>
                Your 10% booking is the <b>first of your 9 instalments</b> — not
                an extra payment.
              </p>
            </div>
            <div className={cx("step", "reveal")}>
              <div className={cx("step-no")}>2</div>
              <h3>Pay 8 more instalments</h3>
              <p>
                That’s 9 instalments from you in all — and Divine Solitaires
                adds the 10th, free.
              </p>
            </div>
            <div className={cx("step", "reveal")}>
              <div className={cx("step-no")}>3</div>
              <h3>Take it home, price-protected</h3>
              <p>
                On maturity, choose and receive your Divine Solitaires diamond —
                at a price that’s protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={cx("tint")}>
        <div className={cx("wrap")}>
          <div className={cx("section-head", "reveal")}>
            <span className={cx("eyebrow")}>Price Protection Assurance</span>
            <h2>You win either way</h2>
            <p>
              Your solitaire’s price is locked at the price on your{" "}
              <b style={{ color: "#986422" }}>booking date</b>. If prices rise,
              you still pay the lower booked price; if they fall, you pay the
              lower current price. Only the gold moves with the market.
            </p>
          </div>

          <div className={cx("pp-chart", "reveal")}>
            <svg
              viewBox="0 0 760 360"
              role="img"
              aria-label="Your solitaire price stays locked at the booking level while others pay the rising, non-linear market price over the tenure."
            >
              <line
                x1="72"
                y1="46"
                x2="72"
                y2="300"
                stroke="rgba(13,53,48,.18)"
                strokeWidth="1.5"
              />
              <line
                x1="72"
                y1="300"
                x2="720"
                y2="300"
                stroke="rgba(13,53,48,.18)"
                strokeWidth="1.5"
              />

              <path
                d="M72,210 L130,200 L190,205 L250,182 L310,190 L370,158 L430,167 L490,136 L550,118 L610,102 L700,80 L700,210 Z"
                fill="rgba(26,107,96,.2)"
              />

              <polyline
                points="72,210 130,200 190,205 250,182 310,190 370,158 430,167 490,136 550,118 610,102 700,80"
                fill="none"
                stroke="#7d8884"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <line
                x1="72"
                y1="210"
                x2="700"
                y2="210"
                stroke="#0d3530"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="72" cy="210" r="5" fill="#0d3530" />
              <circle cx="700" cy="80" r="5" fill="#7d8884" />
              <circle
                cx="700"
                cy="210"
                r="6.5"
                fill="#0d3530"
                stroke="#EDF2F0"
                strokeWidth="2"
              />
              <text
                x="688"
                y="70"
                textAnchor="end"
                fill="#7d8884"
                fontSize="13.5"
                fontWeight="600"
              >
                Others pay ↗
              </text>
              <text
                x="470"
                y="150"
                textAnchor="middle"
                fill="#0d3530"
                fontSize="15.5"
                fontWeight="700"
              >
                You’re protected from
              </text>
              <text
                x="470"
                y="171"
                textAnchor="middle"
                fill="#0d3530"
                fontSize="15.5"
                fontWeight="700"
              >
                this price increase
              </text>
              <text
                x="88"
                y="234"
                fill="#0d3530"
                fontSize="13.5"
                fontWeight="600"
              >
                ✓ You pay the booked price
              </text>
              <text
                x="72"
                y="322"
                textAnchor="middle"
                fill="#0d3530"
                fontSize="13.5"
                fontWeight="600"
              >
                Time of
              </text>
              <text
                x="72"
                y="340"
                textAnchor="middle"
                fill="#0d3530"
                fontSize="13.5"
                fontWeight="600"
              >
                Booking
              </text>
              <text
                x="386"
                y="332"
                textAnchor="middle"
                fill="rgba(13,53,48,.55)"
                fontSize="12"
              >
                Duration of 10 months
              </text>
              <text
                x="700"
                y="322"
                textAnchor="middle"
                fill="#0d3530"
                fontSize="13.5"
                fontWeight="600"
              >
                Time of
              </text>
              <text
                x="700"
                y="340"
                textAnchor="middle"
                fill="#0d3530"
                fontSize="13.5"
                fontWeight="600"
              >
                Billing
              </text>
              <text
                transform="translate(30,175) rotate(-90)"
                textAnchor="middle"
                fill="rgba(13,53,48,.55)"
                fontSize="12"
                letterSpacing="1.5"
              >
                SOLITAIRE PRICE
              </text>
            </svg>
            <div className={cx("pp-legend")}>
              <span>
                <i style={{ borderColor: "#0d3530" }}></i> You pay — locked at
                booking
              </span>
              <span>
                <i
                  style={{ borderColor: "#7d8884", borderTopStyle: "dashed" }}
                ></i>{" "}
                Others pay — the rising market price
              </span>
            </div>
          </div>

          <div className={cx("pp-winways", "reveal")}>
            <div className={cx("winway", "up")}>
              <div className={cx("ww-ico")}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 17l7-7 4 4 5-6" />
                  <path d="M15 8h5v5" />
                </svg>
              </div>
              <p>
                <b>If prices go up</b> — you pay the booked price, which is
                lower than the current price.
              </p>
            </div>
            <div className={cx("ww-or")}>OR</div>
            <div className={cx("winway", "down")}>
              <div className={cx("ww-ico")}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 7l7 7 4-4 5 6" />
                  <path d="M15 16h5v-5" />
                </svg>
              </div>
              <p>
                <b>If prices go down</b> — you pay the current, lower price
                instead.
              </p>
            </div>
          </div>

          <div className={cx("pp-cards", "reveal")}>
            <div className={cx("pp-card", "diamond")}>
              <div className={cx("head")}>
                <div className={cx("badge")}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3h12l3 5-9 12L3 8l3-5z" />
                    <path d="M3 8h18M9 3l-3 5 6 12 6-12-3-5" />
                  </svg>
                </div>
                <div>
                  <h3>Solitaire</h3>
                  <span className={cx("tagpp")}>Price protected</span>
                </div>
              </div>
              <p>
                You pay the solitaire price fixed on your <b>booking date</b> —
                shielded from any rise before your tenure ends.
              </p>
            </div>
            <div className={cx("pp-card", "gold")}>
              <div className={cx("head")}>
                <div className={cx("badge")}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="14" width="5" height="6" rx="1" />
                    <rect x="9.5" y="9" width="5" height="11" rx="1" />
                    <rect x="16" y="4" width="5" height="16" rx="1" />
                  </svg>
                </div>
                <div>
                  <h3>Gold & charges</h3>
                  <span className={cx("tagpp")}>Current month’s rate</span>
                </div>
              </div>
              <p>
                Gold, metal and making charges are calculated at the{" "}
                <b>prevailing rate in your billing month</b> — the same as
                buying on the day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="plans">
        <div className={cx("wrap")}>
          <div className={cx("section-head", "reveal")}>
            <span className={cx("eyebrow")}>Choose your plan</span>
            <h2>A plan for every budget</h2>
            <p>
              Pick a monthly instalment that suits you and save toward your
              chosen jewellery value.
            </p>
          </div>

          <div className={cx("plan-grid")}>
            <div className={cx("plan", "reveal")}>
              <span className={cx("p1badge")}>+1 month free</span>
              <div className={cx("pname")}>PYDS A</div>
              <div className={cx("amount")}>
                ₹3,000 <span className={cx("per")}>/ month</span>
              </div>
              <div className={cx("rule")}></div>
              <div className={cx("row")}>
                <span className={cx("k")}>You pay · 9 months</span>
                <span className={cx("v")}>₹27,000</span>
              </div>
              <div className={cx("row", "add")}>
                <span className={cx("k")}>Divine adds +1</span>
                <span className={cx("v")}>+ ₹3,000</span>
              </div>
              <div className={cx("valuebox")}>
                <span className={cx("k")}>Jewellery value</span>
                <span className={cx("v")}>₹30,000</span>
              </div>
            </div>
            <div className={cx("plan", "reveal")}>
              <span className={cx("p1badge")}>+1 month free</span>
              <div className={cx("pname")}>PYDS B</div>
              <div className={cx("amount")}>
                ₹5,000 <span className={cx("per")}>/ month</span>
              </div>
              <div className={cx("rule")}></div>
              <div className={cx("row")}>
                <span className={cx("k")}>You pay · 9 months</span>
                <span className={cx("v")}>₹45,000</span>
              </div>
              <div className={cx("row", "add")}>
                <span className={cx("k")}>Divine adds +1</span>
                <span className={cx("v")}>+ ₹5,000</span>
              </div>
              <div className={cx("valuebox")}>
                <span className={cx("k")}>Jewellery value</span>
                <span className={cx("v")}>₹50,000</span>
              </div>
            </div>
            <div className={cx("plan", "reveal")}>
              <span className={cx("p1badge")}>+1 month free</span>
              <div className={cx("pname")}>PYDS C</div>
              <div className={cx("amount")}>
                ₹10,000 <span className={cx("per")}>/ month</span>
              </div>
              <div className={cx("rule")}></div>
              <div className={cx("row")}>
                <span className={cx("k")}>You pay · 9 months</span>
                <span className={cx("v")}>₹90,000</span>
              </div>
              <div className={cx("row", "add")}>
                <span className={cx("k")}>Divine adds +1</span>
                <span className={cx("v")}>+ ₹10,000</span>
              </div>
              <div className={cx("valuebox")}>
                <span className={cx("k")}>Jewellery value</span>
                <span className={cx("v")}>₹1,00,000</span>
              </div>
            </div>
            <div className={cx("plan", "reveal")}>
              <span className={cx("p1badge")}>+1 month free</span>
              <div className={cx("pname")}>PYDS D</div>
              <div className={cx("amount")}>
                ₹15,000 <span className={cx("per")}>/ month</span>
              </div>
              <div className={cx("rule")}></div>
              <div className={cx("row")}>
                <span className={cx("k")}>You pay · 9 months</span>
                <span className={cx("v")}>₹1,35,000</span>
              </div>
              <div className={cx("row", "add")}>
                <span className={cx("k")}>Divine adds +1</span>
                <span className={cx("v")}>+ ₹15,000</span>
              </div>
              <div className={cx("valuebox")}>
                <span className={cx("k")}>Jewellery value</span>
                <span className={cx("v")}>₹1,50,000</span>
              </div>
            </div>
            <div className={cx("plan", "e", "reveal")}>
              <div className={cx("pname")}>PYDS E · 0.50 ct & above</div>
              <div className={cx("amount")}>Custom</div>
              <p className={cx("sub")}>
                Instalment is 10% of your chosen diamond’s value — pay 9, Divine
                adds the 10th.
              </p>
              <div className={cx("rule")}></div>
              <div className={cx("row")}>
                <span className={cx("k")}>Diamond</span>
                <span className={cx("v")}>Selected upfront</span>
              </div>
              <div className={cx("row")}>
                <span className={cx("k")}>To begin</span>
                <span className={cx("v")}>10% advance</span>
              </div>
            </div>
          </div>
          <p className={cx("plan-note")}>
            Every PYDS plan is <b>pay 9, get 10</b> — your{" "}
            <b>10% booking counts as the first instalment</b>, you pay 8 more,
            and Divine Solitaires adds the tenth. For solitaires above 0.50 ct (
            <b>PYDS E</b>), you choose the diamond upfront and begin with a 10%
            advance. Metal & making charges apply at the prevailing rate on
            billing.
          </p>
        </div>
      </section>

      <section className={cx("gpyds")}>
        <div className={cx("wrap")}>
          <div className={cx("section-head", "reveal")}>
            <span className={cx("eyebrow")}>Every plan includes</span>
            <h2>Benefits you’ll love</h2>
            <p>
              Pay 9, get 10 — plus price protection and a monthly reward, on
              every PYDS plan.
            </p>
          </div>

          <div className={cx("gpyds-inner")}>
            <div className={cx("gpyds-strip", "reveal")}>
              <div className={cx("dots")}>
                <div className={cx("pill", "book")}>10%</div>
                <div className={cx("pill")}>2</div>
                <div className={cx("pill")}>3</div>
                <div className={cx("pill")}>4</div>
                <div className={cx("pill")}>5</div>
                <div className={cx("pill")}>6</div>
                <div className={cx("pill")}>7</div>
                <div className={cx("pill")}>8</div>
                <div className={cx("pill")}>9</div>
                <div className={cx("pill", "free")}>+1</div>
                <div className={cx("pill", "lucky")}>+1</div>
              </div>
              <p className={cx("cap")}>
                Your <b>10% booking is instalment 1</b>. Pay 8 more (9 in all) —
                Divine adds the 10th free, and an 11th for group lucky winners.
              </p>
            </div>

            <div className={cx("gpyds-points", "reveal")}>
              <div className={cx("gp")}>
                <div className={cx("gp-ico")}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="8" width="18" height="13" rx="2" />
                    <path d="M3 12h18M12 8V21M8 8a2.5 2.5 0 010-5c2 0 4 5 4 5M16 8a2.5 2.5 0 000-5c-2 0-4 5-4 5" />
                  </svg>
                </div>
                <div>
                  <h3>+1 month free</h3>
                  <p>
                    You pay just 9 instalments — starting with your 10% booking
                    — and Divine Solitaires adds the 10th on your behalf.
                  </p>
                </div>
              </div>
              <div className={cx("gp")}>
                <div className={cx("gp-ico")}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3>Price protection</h3>
                  <p>
                    Your solitaire is locked at the booking price — you win
                    whether prices rise or fall.
                  </p>
                </div>
              </div>
              <div className={cx("gp")}>
                <div className={cx("gp-ico")}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3l2.5 5.5L20 9.5l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1L12 3z" />
                  </svg>
                </div>
                <div>
                  <h3>Monthly lucky draw</h3>
                  <p>
                    Each month, one lucky member wins a bonus instalment. In a
                    group plan, Divine adds this as an{" "}
                    <b style={{ color: "#D8B152" }}>11th instalment</b> for
                    winners.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className={cx("gpyds-meta")}>
            <b>Now extends to groups!</b> Enrol as a{" "}
            <b>group of 25–40 members (GPYDS)</b> — same benefits, shared with
            friends & family.
          </p>
        </div>
      </section>

      <section>
        <div className={cx("wrap")}>
          <div className={cx("section-head", "reveal")}>
            <span className={cx("eyebrow")}>See how it adds up</span>
            <h2>An example: PYDS C</h2>
            <p>
              Here’s how a ₹10,000-a-month plan turns into more jewellery value.
            </p>
          </div>

          <div className={cx("eg", "reveal")}>
            <div className={cx("eg-head")}>
              <span className={cx("tag")}>PYDS C · ₹10,000 / month</span>
              <span className={cx("amt")}>You pay ₹90,000 over 9 months</span>
            </div>
            <div className={cx("eg-body")}>
              <div className={cx("eg-bar")} aria-hidden="true">
                <span className={cx("s1")}>You pay ₹90,000</span>
                <span className={cx("s2")}>+10k</span>
                <span className={cx("s3")}>+10k</span>
              </div>

              <div className={cx("eg-row")}>
                <div className={cx("dot", "d1")}></div>
                <div className={cx("txt")}>
                  <div className={cx("lbl")}>You pay 9 instalments</div>
                  <div className={cx("sub")}>
                    ₹10,000 × 9 — starting with your 10% booking
                  </div>
                </div>
                <div className={cx("val")}>₹90,000</div>
              </div>
              <div className={cx("eg-row")}>
                <div className={cx("dot", "d2")}></div>
                <div className={cx("txt")}>
                  <div className={cx("lbl")}>
                    Divine adds 1 month{" "}
                    <span style={{ color: "#986422", fontWeight: "700" }}>
                      (PYDS +1)
                    </span>
                  </div>
                  <div className={cx("sub")}>
                    Divine Solitaires covers the 10th month
                  </div>
                </div>
                <div className={cx("val")}>
                  + ₹10,000<small>→ ₹1,00,000</small>
                </div>
              </div>
              <div className={cx("eg-row")}>
                <div className={cx("dot", "d3")}></div>
                <div className={cx("txt")}>
                  <div className={cx("lbl")}>
                    Lucky draw bonus{" "}
                    <span style={{ color: "#986422", fontWeight: "700" }}>
                      (group winners)
                    </span>
                  </div>
                  <div className={cx("sub")}>
                    Divine adds an 11th instalment for lucky winners
                  </div>
                </div>
                <div className={cx("val")}>
                  + ₹10,000<small>→ ₹1,10,000</small>
                </div>
              </div>

              <div className={cx("eg-total")}>
                <span className={cx("l")}>Jewellery you can take home</span>
                <span className={cx("r")}>up to ₹1,10,000</span>
              </div>
              <p className={cx("eg-note")}>
                You pay ₹90,000 (9 instalments, incl. your 10% booking) · take
                ₹1,00,000 with the +1 · up to ₹1,10,000 as a group lucky winner
                (11th instalment).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={cx("tint")}>
        <div className={cx("wrap")}>
          <div className={cx("section-head", "reveal")}>
            <span className={cx("eyebrow")}>Good to know</span>
            <h2>Terms & Conditions</h2>
            <p>
              Everything you should know before you enrol — in plain, simple
              language.
            </p>
          </div>

          <div className={cx("terms-grid")}>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>1</span>
                <span className={cx("t-title")}>Eligible products</span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                The PYDS scheme is valid on all Divine Solitaires products
                except Diamond Coins, and applies{" "}
                <b>
                  exclusively to the purchase of solitaires and diamond
                  jewellery
                </b>
                .
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>2</span>
                <span className={cx("t-title")}>
                  When you choose your diamond
                </span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                For PYDS A–D (loose diamond selection up to 0.50 ct), you select
                the product after completing the scheme and paying all
                instalments. For diamonds above 0.50 ct (PYDS E), the solitaire
                must be selected at the beginning of the scheme, with a{" "}
                <b>10% (one-month) instalment paid as advance</b> to start.
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>3</span>
                <span className={cx("t-title")}>
                  Final weight & value adjustment
                </span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                The diamond made available at delivery can be of any weight
                within the selected size bracket. Any difference in value due to
                the final weight is adjusted in the last instalment.
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>4</span>
                <span className={cx("t-title")}>Delivery on maturity</span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                The Divine Solitaires diamond is delivered only upon maturity —
                completion of the full tenure (10 months) and payment of all
                instalments.
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>5</span>
                <span className={cx("t-title")}>Group participation</span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                The group scheme is applicable for a{" "}
                <b>minimum of 25 and a maximum of 40 members</b> in each group.
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>6</span>
                <span className={cx("t-title")}>Getting started — advance</span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                To initiate the PYDS scheme, you pay an advance equivalent to{" "}
                <b>10% (one month’s instalment)</b> of the selected scheme value
                at the time of enrolment.
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>7</span>
                <span className={cx("t-title")}>
                  Price protection & buyback
                </span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                <ul>
                  <li>
                    Price protection applies only to Divine Solitaires diamonds.
                  </li>
                  <li>
                    Buyback on DS products that are gifted, discounted or under
                    PYDS is subject to a <b>2-year lock-in</b> from the date of
                    purchase, unless specifically mentioned.
                  </li>
                  <li>
                    If the selected solitaire’s value exceeds the total scheme
                    value, the <b>most favourable price protection</b> is
                    determined — a SKU is identified based on the total
                    accumulated scheme value, and price protection is calculated
                    with reference to it. The applicable value is communicated
                    to you before redemption.
                  </li>
                </ul>
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>8</span>
                <span className={cx("t-title")}>Balance payment & charges</span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                <ul>
                  <li>
                    You must pay the balance amount in full before delivery of
                    the product.
                  </li>
                  <li>
                    Metal and other charges are calculated at the prevailing
                    rates at the time of redemption.
                  </li>
                </ul>
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>9</span>
                <span className={cx("t-title")}>Rewards & privilege rules</span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                <ul>
                  <li>
                    The monthly privilege reward is granted to one member per
                    cycle.
                  </li>
                  <li>
                    Each member can avail the bonus reward only once during the
                    scheme tenure.
                  </li>
                  <li>No two schemes can be combined under this plan.</li>
                  <li>All privileges are exclusive and non-transferable.</li>
                </ul>
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>10</span>
                <span className={cx("t-title")}>Lucky draw eligibility</span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                To be eligible for a month’s lucky draw, your instalment for
                that month must be received{" "}
                <b>on or before the 10th of the month</b>. Customers with
                overdue instalments are not eligible for that month’s draw.
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>11</span>
                <span className={cx("t-title")}>
                  Lucky draw process & transparency
                </span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                The monthly lucky draw is conducted on the{" "}
                <b>3rd Saturday of every month</b> via a video call on the
                group’s WhatsApp group, with screen sharing to ensure complete
                transparency. The winner is announced in the WhatsApp group.
                Across the tenure, <b>up to 8 lucky winners</b> each receive an
                added benefit worth one month’s instalment.
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>12</span>
                <span className={cx("t-title")}>GPYDS WhatsApp group</span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                Divine Solitaires creates a dedicated WhatsApp group for each
                GPYDS group. You’ll be invited to join through a WhatsApp link.
                Joining is optional and entirely at your discretion.
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>13</span>
                <span className={cx("t-title")}>
                  Pre-maturity & closure policy
                </span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                <ul>
                  <li>
                    <b>Buy before maturity (pre-closure):</b> Pay the balance
                    amount and receive price protection — the price at booking,
                    or the prevailing price if lower.
                  </li>
                  <li>
                    <b>Terminate the scheme:</b> If you stop paying the balance
                    instalments, the scheme becomes void. You may buy any
                    diamond equal to the amount paid to date, at prevailing
                    prices as per the Divine Solitaires Nationwide Standard &
                    Transparent Price List.
                  </li>
                  <li>
                    <b>Refund:</b> Requesting a refund of the amount paid voids
                    the scheme. If the diamond value is below ₹10,00,000, the
                    buyback policy applies to the amount paid; if above
                    ₹10,00,000, a refund cannot be opted for. Any additional
                    benefits, waivers or free gifts already given are adjusted
                    from the refund; those not yet given will not be applied.
                  </li>
                </ul>
              </div>
            </details>
            <details className={cx("term", "reveal")}>
              <summary>
                <span className={cx("num")}>14</span>
                <span className={cx("t-title")}>Delay in payment</span>
                <span className={cx("chev")}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className={cx("body")}>
                <ul>
                  <li>
                    Interest at <b>18% per annum</b> is charged if an instalment
                    is delayed beyond its due date.
                  </li>
                  <li>
                    If more than 3 instalments remain due and unpaid, Divine
                    Solitaires reserves the right to terminate the PYDS. The
                    amount deposited will either be forfeited, or you may choose
                    to buy another DS product worth the amount already paid.
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className={cx("cta", "reveal")}>
        <span className={cx("eyebrow")}>Begin your journey</span>
        <h2 style={{ marginTop: "12px" }}>
          Your dream solitaire, one step away
        </h2>
        <p>
          Ask your jeweller to enrol you for PYDS — or leave your details and
          our team will reach out.
        </p>
        <button type="button" className={cx("btn", "gold")} onClick={onEnquire}>
          Enquire about the plan
        </button>
      </section>

      {/*<footer>
        <div className={cx("logo", "on-dark")}>
          <svg
            className={cx("trinity")}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Divine Solitaires"
          >
            <path
              d="M50,54 C34,45 34,22 50,12 C66,22 66,45 50,54 Z"
              fill="#E1313F"
              opacity=".95"
            />
            <path
              d="M50,54 C34,45 34,22 50,12 C66,22 66,45 50,54 Z"
              fill="#F7B700"
              opacity=".95"
              transform="rotate(120 50 50)"
            />
            <path
              d="M50,54 C34,45 34,22 50,12 C66,22 66,45 50,54 Z"
              fill="#65ACDD"
              opacity=".95"
              transform="rotate(240 50 50)"
            />
            <path d="M50,4 L56,12 L50,20 L44,12 Z" fill="#D8B152" />
          </svg>
          <div className={cx("wm")}>
            <span className={cx("dv")}>DIVINE</span>
            <span className={cx("sol")}>SOLITAIRES</span>
            <span className={cx("tag")}>RARE. PRECIOUS. UNMATCHED.</span>
          </div>
        </div>
        <p className={cx("fnote")}>
          Plan Your Dream Solitaire (PYDS) & Group Plan (GPYDS) · Customer Terms
          & Conditions.
          <br />
          Details are indicative and subject to the full scheme agreement
          provided at enrolment.
        </p>
      </footer>*/}

      {/* ==================== ENQUIRY MODAL ==================== */}
      <div
        className={cx("modal-overlay", open && "open")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pyds-enq-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className={cx("modal")}>
          <button
            className={cx("close")}
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>

          {!success ? (
            <div className={cx("m-form")}>
              <div className={cx("m-logo")}>
                <svg
                  className={cx("trinity")}
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M50,54 C34,45 34,22 50,12 C66,22 66,45 50,54 Z"
                    fill="#E1313F"
                    opacity=".92"
                  />
                  <path
                    d="M50,54 C34,45 34,22 50,12 C66,22 66,45 50,54 Z"
                    fill="#F7B700"
                    opacity=".92"
                    transform="rotate(120 50 50)"
                  />
                  <path
                    d="M50,54 C34,45 34,22 50,12 C66,22 66,45 50,54 Z"
                    fill="#65ACDD"
                    opacity=".92"
                    transform="rotate(240 50 50)"
                  />
                  <path d="M50,4 L56,12 L50,20 L44,12 Z" fill="#1D1D1B" />
                </svg>
              </div>
              <h3 id="pyds-enq-title">Enquire about the plan</h3>
              <p className={cx("m-sub")}>
                Leave your details and our team will reach out.
              </p>

              <div className={cx("field", errors.mobile && "invalid")}>
                <label htmlFor="pyds-mobile">Mobile number</label>
                <input
                  id="pyds-mobile"
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  autoComplete="tel"
                />
                <span className={cx("err")}>
                  Please enter a valid 10-digit mobile number.
                </span>
              </div>

              <div className={cx("field", errors.email && "invalid")}>
                <label htmlFor="pyds-email">Email address</label>
                <input
                  id="pyds-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <span className={cx("err")}>
                  Please enter a valid email address.
                </span>
              </div>

              <div className={cx("field", errors.plan && "invalid")}>
                <label htmlFor="pyds-plan">Plan you’re interested in</label>
                <select
                  id="pyds-plan"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                >
                  <option value="">Select a plan</option>
                  {PLAN_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <span className={cx("err")}>Please choose a plan.</span>
              </div>

              <button
                type="button"
                className={cx("btn", "gold", "submit")}
                onClick={submit}
              >
                Request a call back
              </button>
              <p className={cx("m-privacy")}>
                By submitting, you agree to be contacted by Divine Solitaires.
              </p>
            </div>
          ) : (
            <div className={cx("m-success", "show")}>
              <div className={cx("tick")}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3>Thank you!</h3>
              <p>
                Our sales team will call you soon with more details about your
                plan.
              </p>
              <button
                type="button"
                className={cx("btn", "gold")}
                onClick={closeModal}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

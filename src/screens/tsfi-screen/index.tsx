import { Montserrat, Cormorant_Garamond } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

import styles from "./tsfi.module.css";

/* Fonts (Divine Solitaires brand: Montserrat for UI/body, Cormorant for numerals) */
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

/* ---- Content (edit these to change the page) ---- */
const GIFTS = [
  "gift-1",
  "gift-2",
  "gift-3",
  "gift-4",
  "gift-5",
  "gift-6",
  "gift-7",
  "gift-8",
];

const STEPS = [
  {
    no: "01",
    img: "soliter-1",
    imgM: "soliter-m-1",
    title: "Purchase a Divine Solitaires jewellery",
    body: "Purchase a Divine Solitaires jewellery from any partner jeweller stores across India.",
  },
  {
    no: "02",
    img: "soliter-2",
    imgM: "soliter-m-2",
    title: "Get Assured Gifts, Exclusive Benefits & More",
    body: "Receive assured gifts, special vouchers, plus opportunities to win weekly prizes and the Mega Bumper Draw.",
  },
  {
    no: "03",
    img: "soliter-3",
    imgM: "soliter-m-3",
    title: "Win Exciting Rewards",
    body: "Exciting prizes, from premium gadgets and home appliances to the XUV 7X0, await you throughout TSFI.",
  },
];

const DRAW_FEATURES = [
  { ic: "ic-1", big: "15,000+", text: "Solitaire Purchases Registered" },
  { ic: "ic-2", big: "200+", text: "Participating Stores Nationwide" },
  { ic: "ic-3", big: "5,000+", text: "Gifts & Coupons Already Claimed" },
];

const DRAWS = [
  {
    img: "car-1",
    title: "Mega Weekly Draw",
    date: "9th Aug, 2026",
    target: "2026-08-09T23:59:59",
  },
  {
    img: "car-2",
    title: "Grand Bumper Draw",
    date: "3rd Sept, 2026",
    target: "2026-09-03T23:59:59",
  },
];

const TESTIMONIAL_VIDEOS = ["vid-1", "vid-2", "vid-3"];
const TESTIMONIAL_IMAGES = ["test-1", "test-2", "test-3"];

/* two-digit remaining time until an ISO date; all zeros once elapsed */
function timeLeft(targetIso: string) {
  const distance = new Date(targetIso).getTime() - Date.now();
  if (distance <= 0)
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: pad(Math.floor(distance / 86400000)),
    hours: pad(Math.floor((distance / 3600000) % 24)),
    minutes: pad(Math.floor((distance / 60000) % 60)),
    seconds: pad(Math.floor((distance / 1000) % 60)),
  };
}

function Countdown({ target }: { target: string }) {
  /* Start with a static placeholder so server-rendered HTML matches the first
     client paint (no hydration mismatch); the effect fills real values at once. */
  const [t, setT] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });
  useEffect(() => {
    const tick = () => setT(timeLeft(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className={cx("countdown")}>
      <span>
        <b>{t.days}</b> :
      </span>
      <span>
        <b>{t.hours}</b> :
      </span>
      <span>
        <b>{t.minutes}</b> :
      </span>
      <span>
        <b>{t.seconds}</b>
      </span>
    </div>
  );
}

/* one gift-marquee row (pure-CSS continuous scroll); reverse flips direction.
   The list is repeated 4× so each animated half is wider than any viewport — no gaps. */
function GiftRow({ reverse }: { reverse?: boolean }) {
  const items = [...GIFTS, ...GIFTS, ...GIFTS, ...GIFTS];
  return (
    <div className={cx("marquee", reverse && "rev")}>
      <div className={cx("marquee-track")}>
        {items.map((g, i) => (
          <div key={`${g}-${i}`} className={cx("gift-card")}>
            <img src={`/assets/img/${g}.png`} alt="Assured gift" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TsfiScreen() {
  /* scroll-reveal (dependency-free replacement for AOS) */
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
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("." + revealClass)
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>The Solitaire Festival of India — Divine Solitaires</title>
        <meta
          name="description"
          content="The Solitaire Festival of India (TSFI): assured gifts, weekly draws and a grand bumper draw with every eligible Divine Solitaires purchase."
        />
      </Head>

      <div
        className={`${styles.page} ${montserrat.variable} ${cormorant.variable}`}
      >
        {/* ==================== HERO ==================== */}
        <section className={cx("hero", "reveal")}>
          <picture>
            <source
              media="(max-width: 480px)"
              srcSet="/assets/img/bannerM-img.jpeg"
            />
            <img
              src="/assets/img/banner-img.jpeg"
              alt="Divine Solitaires — The Solitaire Festival of India"
            />
          </picture>
        </section>

        {/* ==================== TESTIMONIALS ==================== */}
        <section id="testimonials">
          <div className={cx("wrap")}>
            <div className={cx("section-head", "reveal")}>
              <span className={cx("eyebrow")}>Winners</span>
              <h2>Thousands Have Won. You Could Be Next.</h2>
              <p>Every week, customers across India win exciting gifts.</p>
            </div>
          </div>
          <div className={cx("vstrip", "reveal")}>
            {TESTIMONIAL_VIDEOS.map((v) => (
              <div key={v} className={cx("vid-card")}>
                <video
                  playsInline
                  autoPlay
                  loop
                  muted
                  controls
                  preload="metadata"
                >
                  <source src={`/assets/video/${v}.mp4`} type="video/mp4" />
                </video>
              </div>
            ))}
            {TESTIMONIAL_IMAGES.map((t) => (
              <div key={t} className={cx("vid-card")}>
                <img
                  src={`/assets/img/${t}.jpeg`}
                  alt="Divine Solitaires winner"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ==================== REWARDS ==================== */}
        <section id="rewards" className={cx("rewards")}>
          <div className={cx("wrap")}>
            <div className={cx("section-head", "reveal")}>
              <span className={cx("eyebrow")}>Assured Gifts</span>
              <h2>Assured Gifts With Every Eligible Purchase</h2>
              <p>
                Shop your Divine Solitaires jewellery &amp; unlock your gifts.
              </p>
            </div>
          </div>
          <div className={cx("marquee-wrap", "reveal")}>
            <GiftRow reverse />
            <GiftRow />
          </div>
          <div className={cx("wrap")}>
            <a href="#" className={cx("btn", "gold", "center")}>
              View Eligible Gifts
            </a>
          </div>
        </section>

        {/* ==================== HOW IT WORKS ==================== */}
        <section id="howitworks" className={cx("tint")}>
          <div className={cx("wrap")}>
            <div className={cx("hiw-grid")}>
              <div className={cx("section-head", "left", "reveal")}>
                <span className={cx("eyebrow")}>How it works</span>
                <h2>Your Solitaire Purchase Comes With More</h2>
                <p>
                  Unlock assured gifts, exclusive vouchers, weekly draws, and a
                  chance to win big at TSFI.
                </p>
                <a href="#" className={cx("btn")}>
                  Get in touch
                </a>
              </div>
              <div className={cx("steps")}>
                {STEPS.map((step) => (
                  <div key={step.no} className={cx("solitaire-card", "reveal")}>
                    <picture>
                      <source
                        media="(max-width: 480px)"
                        srcSet={`/assets/img/${step.imgM}.png`}
                      />
                      <img src={`/assets/img/${step.img}.png`} alt="" />
                    </picture>
                    <div className={cx("sc-content")}>
                      <h6 className={cx("sc-num")}>{step.no}</h6>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== WEEKLY DRAW ==================== */}
        <section id="weeklyDraw">
          <div className={cx("wrap")}>
            <div className={cx("section-head", "reveal")}>
              <span className={cx("eyebrow")}>Weekly Draw</span>
              <h2>Your Next Chance to Win</h2>
              <p>
                Every eligible purchase gives you a chance to win exciting
                weekly rewards.
              </p>
            </div>

            <div className={cx("draw-grid", "reveal")}>
              {DRAWS.map((d) => (
                <div key={d.title} className={cx("draw-card")}>
                  <div className={cx("draw-img")}>
                    <img src={`/assets/img/${d.img}.png`} alt={d.title} />
                  </div>
                  <article className={cx("draw-content")}>
                    <h4>{d.title}</h4>
                    <div className={cx("draw-date")}>
                      <p>{d.date}</p>
                      <Countdown target={d.target} />
                    </div>
                    <ul className={cx("draw-feature")}>
                      {DRAW_FEATURES.map((f) => (
                        <li key={f.ic}>
                          <i className={cx("icon")}>
                            <img src={`/assets/img/${f.ic}.svg`} alt="" />
                          </i>
                          <b>{f.big}</b> {f.text}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

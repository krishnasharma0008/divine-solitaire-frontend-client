import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState, useRef } from "react";

import { getDiamondCoin } from "@/api/pricing";
import { InsuranceIcon, BuybackIcon, Button } from "@/components";
import { NOTIFICATION_MESSAGES } from "@/config";
//import { useCurrency } from "@/context/currency-context";
import LoaderContext from "@/context/loader-context";
import NotificationContext from "@/context/notification-context";
import useCountryCode from "@/hooks/use-country-code";
import useIsOutsideIndia from "@/hooks/use-is-outside-india";
import DiamondCoin from "@/interface/diamond-coin";
import { formatByCurrency } from "@/util";
//import { reverseCountryCurrencyMap } from "@/util/reverse-country-currency-map";

interface Props {
  children?: React.ReactNode;
}

const DiamondCoinSolitares: React.FC<Props> = () => {
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const { notifyErr } = useContext(NotificationContext);
  const [diamondCoinList, setDiamondCoinList] = useState<Array<DiamondCoin>>(
    [],
  );
  const [currencylocale, setCurrencyLocale] = useState<string>("");
  const [currencycode, setCurrencyCode] = useState<string>("");

  const countryCode = useCountryCode();
  const isOutsideIndia = useIsOutsideIndia();
  //const { currency } = useCurrency(); //for currency
  //const countryCode = reverseCountryCurrencyMap[currency];

  // for hand scrolling
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const fetchDiamondCoin = async (countryCode: string) => {
    showLoader();
    try {
      const res = await getDiamondCoin(countryCode);
      setDiamondCoinList(res.data.data || []);
      setCurrencyLocale(res.data.currency_locale);
      setCurrencyCode(res.data.currency_code);
      //console.log(diamondCoinList);
    } catch (err) {
      notifyErr(NOTIFICATION_MESSAGES.SOMETHING_WRONG);
    }
    hideLoader();
  };

  useEffect(() => {
    console.log(countryCode);
    if (countryCode) {
      fetchDiamondCoin(countryCode);
    }
  }, [countryCode, hideLoader, notifyErr, showLoader]);

  // Unique Features tiles (Free Insurance is hidden outside India)
  const features = [
    { label: "Buyback", icon: <BuybackIcon className="h-7 w-7" /> },
    ...(!isOutsideIndia
      ? [
          {
            label: "Free Insurance",
            icon: <InsuranceIcon className="h-7 w-7 bg-black" />,
          },
        ]
      : []),
    { label: "Upgrade", icon: <BuybackIcon className="h-7 w-7" /> },
    {
      label: "100% Certified",
      icon: (
        <Image
          src="/guarantee-certificate.png"
          alt=""
          height={120}
          width={160}
          className="h-8 w-8 object-contain"
        />
      ),
    },
  ];

  const CardCoin: React.FC<DiamondCoin> = (props) => (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white border shadow-md bg-clip-border rounded-xl md:w-[343px] w-[169px]">
      <div className="p-2">
        <table className="table w-full table-fixed [&>tr>td]:text-center md:[&>tr>td]:text-xl [&>tr>td]:text-xs">
          <tr className="w-full">
            <td>
              <Image
                //src="/dia_coin.png"
                src={props.image}
                alt="Arrow"
                height={1000}
                width={1000}
                className="m-auto h-auto w-auto md:h-64 md:w-64"
              />
            </td>
          </tr>
          <tr className="w-full [&>td]:bg-slate-50">
            <td>{props.net_weight} gms</td>
          </tr>
          <tr className="w-full [&>td]:text-gold">
            <td>
              {`${formatByCurrency(props.price, currencylocale, currencycode)}`}
            </td>
          </tr>
          <tr>
            <td className="text-slate-400 text-[9px]">
              {props.solitaire_details}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );

  const CardPendent: React.FC<DiamondCoin> = (props) => (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white border shadow-md bg-clip-border rounded-xl w-auto">
      <div className="p-6">
        <table className="table w-full table-fixed [&>tr>td]:text-center md:[&>tr>td]:text-xl [&>tr>td]:text-sm">
          <tr className="w-full">
            <td>
              <Image
                src={
                  props.mount_details === "10KT Gold"
                    ? "/locket_yellow.png"
                    : "/locket_green.png"
                }
                alt="Arrow"
                height={1000}
                width={1000}
                className="m-auto h-34 w-32 md:h-34 md:w-32"
              />
            </td>
          </tr>
          <tr className="w-full [&>td]:text-gold mt-2 ">
            <td>
              {`${formatByCurrency(props.price, currencylocale, currencycode)}`}
            </td>
          </tr>
          <tr>
            <td>{props.mount_details}</td>
          </tr>
        </table>
      </div>
    </div>
  );

  return (
    <div className="w-full items-start gap-x-[17px] font-montserrat">
      <div
        className="scroll-hide overflow-x-auto whitespace-nowrap px-2 bg-slate-50 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={scrollRef}
      >
        <div className="mx-auto flex w-max gap-4 pb-4">
          {diamondCoinList
            .filter((dcoin) => dcoin.design_type === "Diamond Coin")
            .map((dcoin) => (
              <CardCoin key={dcoin.id} {...dcoin} />
            ))}
        </div>
      </div>

      {/* Unique Features: new tile design */}
      <div className="w-full px-2 pb-6 justify-center items-center gap-[20px] bg-slate-50 mt-6">
        <div className="px-2 text-gray-900 md:text-3xl text-lg font-Montserrat font-medium tracking-widest text-center">
          Unique Features
        </div>
        <span className="mx-auto mt-3 block h-px w-12 bg-gold" />
        <ul
          className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          style={{ paddingLeft: "0" }}
        >
          {features.map((f) => (
            <li
              key={f.label}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white px-3 py-5 text-center ring-1 ring-neutral-200 md:py-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 ring-1 ring-gold/40">
                {f.icon}
              </span>
              <span className="text-sm md:text-base font-medium">
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 justify-center items-center gap-[20px] bg-slate-50">
        <div className="px-2 text-gray-900 md:text-3xl text-lg font-Montserrat font-medium tracking-widest text-center">
          Accessories
        </div>
        <div className="px-2 text-gray-900 font-Montserrat font-normal md:text-xl text-sm tracking-widest text-center">
          Wear it when you like it
          <br />
          &quot;sold seprately&quot;
        </div>
        <div className="flex gap-[20px] ">
          {diamondCoinList.map(
            (dcoin) =>
              dcoin.design_type !== "Diamond Coin" && (
                <CardPendent key={dcoin.id} {...dcoin} />
              ),
          )}
        </div>
      </div>
      <div className="p-4 justify-center items-center gap-[20px]">
        <Image
          src="/coin_jacket_locket.png"
          alt="Arrow"
          height={1000}
          width={1000}
          className="m-auto h-auto w-auto md:h-80 md:w-auto"
        />
      </div>
      <div className="flex w-full justify-between items-center md:text-2xl text-base px-4 pb-10">
        <div>
          <span>Diamond Coin</span>
        </div>
        <div className="md:mr-14 mr-10">
          <span>Jacket</span>
        </div>
        <div className="md:mr-8 mr-4">
          <span>Locket</span>
        </div>
      </div>

      <div className="bg-neutral-900 px-6 py-10 md:py-16 text-white">
        <div className="mx-auto max-w-4xl text-center md:grid md:grid-cols-2 md:items-center md:gap-12 md:text-left">
          {/* Text */}
          <div>
            <h2 className="text-xl md:text-3xl font-medium tracking-wide">
              An Elite Gift. A Prized Asset
            </h2>
            <span className="mx-auto mt-3 block h-px w-12 bg-gold md:mx-0" />
            <p className="mx-auto mt-4 max-w-sm text-sm md:mx-0 md:text-lg leading-relaxed text-neutral-300">
              An exclusive gift of appreciation in value with time
            </p>
          </div>

          {/* Gift card */}
          <div className="mx-auto mt-8 w-full max-w-xs md:mt-0 md:max-w-none">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-gold/40 shadow-[0_0_40px_rgba(184,146,74,0.25)]">
              <Image
                src="/angift.png"
                alt="Gift Card"
                height={1000}
                width={1000}
                className="m-auto h-auto w-full object-contain md:h-72 md:w-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 justify-center items-center gap-[20px] bg-slate-50 my-8">
        <div className="px-2 text-gray-900 md:text-xl font-Montserrat font-medium tracking-widest text-center text-[9px]">
          To buy this solitaire Diamond coin visit your nearest store
        </div>
        <div className="flex w-full justify-center items-center p-6">
          <Link href="/store-locator" className="inline-block">
            <Button
              themeType="dark"
              classes="p-4 px-8 h-14 text-xs font-light leading-5 max-w-[12rem] tracking-widest hover:bg-white hover:text-black [&:hover>span>svg]:fill-white [&:hover>span>svg>g>path]:stroke-black hover:border-none"
            >
              STORE LOCATOR
              <span className="inline-block align-middle float-right"></span>
            </Button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default DiamondCoinSolitares;

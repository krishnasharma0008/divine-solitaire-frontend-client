import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { getUserStore } from "@/api/store-locator";
import { Button } from "@/components/common";
//import Checkbox from "@/components/common/checkbox";
import LoaderContext from "@/context/loader-context";
import NotificationContext from "@/context/notification-context";
import { VerifyTrackContext } from "@/context/verify-track-context";
import { SaleType } from "@/enum/sale-type-enum";
import { StoreLocator } from "@/interface";
import { getToken, setRedirectionRoute } from "@/local-storage";
import { formatByCurrency } from "@/util";

import SummaryAccordion from "./summary-accordion";
import { RESALE_STEPS } from "../verify-track-resale-steps-enum";

interface ExchangeAtOtherStoreProps {
  setCurrentStep: (currentStep: RESALE_STEPS) => void;
  setProductAmt: (amt: string) => void;
  setSaletype: (saletype: SaleType) => void;
}

const ExchangeAtOtherStore: React.FC<ExchangeAtOtherStoreProps> = ({
  setCurrentStep,
  setProductAmt,
  setSaletype,
}) => {
  const { productDetails } = useContext(VerifyTrackContext);

  //const [tnc, setTnc] = useState<boolean>(false);
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const { notifyErr } = useContext(NotificationContext);
  //const [stores, setStores] = useState<string>(""); // Selected store ID
  const [searchQuery, setSearchQuery] = useState(""); // Store search input
  const [storeList, setStoreList] = useState<Array<StoreLocator>>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); //Login dialog visibility

  const { push } = useRouter();

  const handleClickProceed = () => {
    //if (!tnc) return;
    showLoader();
    // Show the login modal when button is clicked
    if (!getToken()) {
      //setShowLogin(true);
      handleDialogOpen();
      hideLoader();
      return;
    }
    // If logged in, proceed to form

    setCurrentStep(RESALE_STEPS.TWO);
    setProductAmt(
      `exchange_at_other_store,${productDetails?.exchange_diffrent_store_price.toString()},${searchQuery},`
    );
    setSaletype(SaleType.EXCHANGE);
    hideLoader();
    console.log("Proceeding to the next step...");
    //console.log("Selected Store ID:", stores);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true); // Open dialog
  };

  const handleDialogClose = () => {
    setRedirectionRoute(window.location.pathname);
    push("/login");
    setIsDialogOpen(false); // Close dialog
  };

  if (!productDetails) return <div>Loading product details...</div>;

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setLoading(true);
    if (value.trim() === "") {
      setShowSuggestions(false);
      setLoading(false);
      return;
    }

    try {
      //showLoader();
      const result = await getUserStore(value);
      setStoreList(result.data.data ?? []);
      setShowSuggestions(true);
    } catch (error) {
      notifyErr("An error occurred while fetching customer details.");
      console.error(error);
    } finally {
      //hideLoader();
      setLoading(false);
    }
  };

  const handleSuggestionClick = (id: string) => {
    setSearchQuery(id);
    setShowSuggestions(false);
    //setSearchQuery(""); // Optionally clear the search query
  };

  return (
    <div className="px-3 bg-[#FAFAFA]">
      <div className="w-full flex flex-col gap-2 mt-[25px]">
        <div className="relative w-full">
          {/* <label htmlFor="search" className="block text-gray-700 mb-1">
            Search Store
          </label> */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {/* Magnifying glass SVG */}
            <svg
              width="35"
              height="34"
              viewBox="0 0 35 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                x="0.90918"
                y="7.51172"
                width="27.0468"
                height="27.0468"
                transform="rotate(-15 0.90918 7.51172)"
                fill="url(#pattern0_166_1548)"
              />
              <defs>
                <pattern
                  id="pattern0_166_1548"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_166_1548" transform="scale(0.02)" />
                </pattern>
                <image
                  id="image0_166_1548"
                  width="50"
                  height="50"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADuElEQVR4nN2aTahVVRTH96uslJAmTcykLyoqGmiEZhgEfQyKIroQYt3eu/v/2/c+u+IVBKnBnViDJkEQNUiKPqy0UMSkiQ0iApOgkAYFVmbq84NSotQsja3P2F3vPu9xzj7Xd/rDGj3e+q//2Wutvc4615gcaLfblzjnHpb0kqTPgDHgKHAqsJOSfpG0A3gfWNpqta4yUwHtdnsmsNoH2BP0pEzS38AWa+288yKg2+1eACwDDuYR0Mf8aa211s4emIjR0dHLJG2cILC/gE+AFcBD/ok3m80bgUXAYuBlYHef/xtzzi0sXYRz7krg6wwBRyW9MDw8fMUk3A055+6VtL0n3Y5JeqI0EcAM4MsMEZ/mLN4hSSNhc5B0ArivBBmnydZniFhTq9UuLkLgnLsD2Bv4/NWnYzoJxhhr7VMZIt71QlPwNBqN2yT9FpzMtlS+TafTmS7pp0j73O7/bhLC30e+iwUcjydxDKyMtUzg9iQk53J+EAjZWTRtPYaA7yOnsdaUBGvtDcCfAd8jRR3Oj9VG2f0e2Bw8tPeKOnsmImTM3+7Jou7PbQO+g4WKfny46yfk7aRR9+ee08M5J7ez3ls3sOdNyajVaheOjzqnOa219+R2BnwbKfSnk0Yd598T1ORjuR1J+m6qCKFI54qllqTnzABSS2dmrrO8d+V2BqyLCHnLlAw/gPJf3utyO5P0bETIvrLbr3OuEfDtL9R+Jd2ZMSwuSBr5udybAiHrU7zS7ooIeceUhFardS1wPOCqFXYKrMpYHMxNEnn2RbwHmJbC6QxJP0fEbKvX65eahLDWPhiO8cDyUgqvj72ZkOdmSUeCB/VVt9u9KJX/s7WyISZG0itFj9+nabhZkfRHKfsuvwaaYIOydWRkZFbOd54lwO9h/RUaSSaCn0AlfZMhxgezul6vXz5Jf4skfd5zuid8KptBrEklfZQh5tR46/zY73ettfdba29xzl3t7x7gUUkvRt48DwMPmEGhdmbEXhWmQ1GT9GHO1CwOv6sd38AfyRm8v4s2SLrbTAV0Op3p/vYFXgW+kHSoJ+BjESEbTZUADEeEHCp7+EwKa+01sfRqNpu3mioB+DEiZqmpEoA3IkLWmSrBxhfhB5ItqgeBPnuqf80Pi6ZKkPRDREzLVAnA65E2XGy3O2gA9YiQYsuFQaPPiie0m0yVQPx7izNVArBm0B+OSoFz7slIau01VUIro078JzdTJUjaGREiUyVIeu18fQlLCv9bk/9FnVhrZ8fqpNFoXJ+C5B9KiNaRUnbwoAAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Store here..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 pl-14 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          {loading && (
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <div className="loader"></div>
            </div>
          )}
          {/* Dropdown suggestion box */}
          {showSuggestions && storeList.length > 0 && (
            <ul className="absolute left-0 top-full  w-full bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10">
              {storeList.map((store) => (
                <li
                  key={store.id}
                  onClick={() => handleSuggestionClick(String(store.name))}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {store.name} {/*({customer.email}) */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-5 pl-[2.75px]">
        <div className="font-Montserrat text-sm font-medium text-[#121212] mb-3">
          Product Details
        </div>

        <>
          <SummaryAccordion
            title={{
              main: "Divine Solitaires:",
              details: productDetails.solitaire_details_1,
              smount: "",
              //currentPrice: productDetails.slt_total_current_price,
              currentPrice: productDetails.exchange_solitaire_price, //display current price
              purchasePrice: productDetails?.slt_total_purchase_price,
              isCoin: productDetails.is_coin,
              uid_status: productDetails.uid_status,
              sd_cts: productDetails.sd_cts,
              currency_locale: productDetails.currency_locale,
              currency_code: productDetails.currency_code,
            }}
            className="!px-0"
          />
          {productDetails.product_type !== "Diamond" && (
            <SummaryAccordion
              title={{
                main: "Divine Mount",
                details: `${productDetails.net_wt} gms | ${productDetails.mount_details_1}`,
                smount: productDetails.mount_details_2,
                // currentPrice:
                //   productDetails.metal_total_current_price +
                //   productDetails?.sd_total_current_price,
                currentPrice: productDetails?.exchange_mount_price, //display current price
                purchasePrice: productDetails?.metal_sd_purchase_price,
                isCoin: productDetails.is_coin,
                uid_status: productDetails.uid_status,
                sd_cts: productDetails.sd_cts,
                currency_locale: productDetails.currency_locale,
                currency_code: productDetails.currency_code,
              }}
              className="mt-3 !px-0"
            />
          )}
        </>

        <div className="flex my-2.5 border-dotted border-[0.5px] border-black"></div>

        <div className="bg-[#F8F8F8]  pl-[11px] pt-[15px] pb-4 rounded-sm">
          <div className="flex justify-between text-xs font-Montserrat font-medium text-[#121212]">
            Exchange Amount:
            <div className="text-gold text-sm font-semibold font-Montserrat mr-[6px]">
              {`${formatByCurrency(
                Math.round(productDetails.exchange_price),
                productDetails.currency_locale,
                productDetails.currency_code
              )}`}
            </div>
          </div>

          <div className="flex justify-between py-5 font-Montserrat text-xs font-normal text-gray-900">
            Admin & Processing Charge:
            <div className="text-[#7E7E7E] text-sm font-medium font-Montserrat mr-[6px]">
              {`-${formatByCurrency(
                productDetails.exchange_processing_charges,
                productDetails.currency_locale,
                productDetails.currency_code
              )}`}
            </div>
          </div>

          <div className="flex justify-between font-Montserrat text-xs font-medium text-[#000000]">
            Exchange Amount at Other Store:
            <div className="text-gold text-sm font-semibold font-Montserrat mr-[6px]">
              {`${formatByCurrency(
                Math.round(productDetails.exchange_diffrent_store_price),
                productDetails.currency_locale,
                productDetails.currency_code
              )}`}
            </div>
          </div>
        </div>
        {/* <div className="flex my-2.5 border-dotted  border border-[]"></div> */}
        {/* <div className="px-4 w-full flex mt-10">
          <Checkbox
            id="remember_me"
            onChange={handleCheckboxChange}
            className="text-base leading-5 [&>input]:w-4"
          >
            Accept Terms & Conditions
          </Checkbox>
        </div> */}
      </div>
      <div className="px-4 flex justify-between gap-4 mt-[45px] mb-[13px]">
        <Button
          themeType="light"
          classes="w-6/12 text-base leading-5 font-medium py-3"
        >
          CANCEL
        </Button>
        <Button
          themeType="dark"
          classes="w-6/12 text-base leading-5 font-medium"
          onClick={handleClickProceed}
          //disabled={!tnc}
        >
          PROCEED
        </Button>
      </div>
      {isDialogOpen && (
        <div className="pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60">
          <div className="relative max-w-[311px]  lg:max-w-[40%] sm:max-w-[90%] bg-white shadow-sm">
            <div className="w-full relative border-t border-slate-200 p-4 ">
              <div className="flex justify-center items-center font-[Montserrat] text-sm leading-6">
                <p className="font-medium">Please Login To Proceed</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center pb-4 justify-center">
              <div className="w-24 ">
                <Button
                  onClick={handleDialogClose} // Close dialog on Cancel button
                  className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100"
                  themeType="dark"
                >
                  Login In
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeAtOtherStore;

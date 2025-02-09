import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { Button } from "@/components/common";
//import Checkbox from "@/components/common/checkbox";
import LoaderContext from "@/context/loader-context";
import { VerifyTrackContext } from "@/context/verify-track-context";
import { SaleType } from "@/enum/sale-type-enum";
import { getToken, setRedirectionRoute } from "@/local-storage";
import { formatByCurrency } from "@/util";

import SummaryAccordion from "../exchange/summary-accordion";
import { RESALE_STEPS } from "../verify-track-resale-steps-enum";

interface BuybackAtPurchasedStoreProps {
  setCurrentStep: (currentStep: RESALE_STEPS) => void;
  setProductAmt: (amt: string) => void;
  setSaletype: (saletype: SaleType) => void;
}

const BuybackAtPurchasedStore: React.FC<BuybackAtPurchasedStoreProps> = ({
  setCurrentStep,
  setProductAmt,
  setSaletype,
}) => {
  const { productDetails } = useContext(VerifyTrackContext);
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false); //Login dialog visibility

  const { push } = useRouter();
  // Move the useState hook to the top level
  //const [tnc, setTnc] = useState<boolean>(false);

  // Conditional rendering after hooks
  if (!productDetails) return <div>Loading product details...</div>;

  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTnc(e.target.checked);
  // };

  const handleClickProceed = () => {
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
      "buyback_at_purchased_store," +
        productDetails.buyback_same_store_price.toString()
    );
    setSaletype(SaleType.BUYBACK);
    hideLoader();
    //if (!tnc) return;
    console.log("Proceeding to the next step...");
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true); // Open dialog
  };

  const handleDialogClose = () => {
    setRedirectionRoute(window.location.pathname);
    push("/login");
    setIsDialogOpen(false); // Close dialog
  };

  return (
    <div className="px-3 bg-[#FAFAFA]">
      <div className="w-full flex flex-col gap-2 mt-[25px]">
        <label
          htmlFor="purchase-from"
          className="text-sm font-medium text-gray-700"
        >
          Store Name
        </label>
        <input
          id="purchase-from"
          type="text"
          value={productDetails?.purchase_from} // Fallback value
          placeholder="Name....."
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 cursor-not-allowed"
          readOnly={true}
        />
      </div>
      <div className="mt-5 pl-[2.75px]">
        <div className="font-Montserrat text-sm font-medium text-[#121212] mb-3">
          Product Details
        </div>
        {/* {isJewelleryProduct(productDetails) && ( */}
        <>
          <SummaryAccordion
            title={{
              main: "Divine Solitaires:",
              details: productDetails.solitaire_details_1,
              smount: "",
              currentPrice: productDetails.buyback_solitaire_price,
              purchasePrice: productDetails?.slt_total_purchase_price,
              isCoin: productDetails.is_coin,
              uid_status: productDetails.uid_status,
              sd_cts: productDetails.sd_cts,
              currency_locale: productDetails.currency_locale,
              currency_code: productDetails.currency_code,
              //formtype:
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
                currentPrice: productDetails?.buyback_mount_price, //display current price
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
          {/* <VerifyTrackSummarySltAccordion productDetails={productDetails} /> */}
          {/* <VerifyTrackSummaryMountAccordion productDetails={productDetails} /> */}
        </>
        {/* )} */}

        {/* {isDiamondProduct(productDetails) && (
          <>
            <DetailsTable
              title="Divine Solitaires: "
              headings={["Shape", "Carat", "Colour", "Clarity"]}
              rows={productDetails?.slt_details?.map((item) => [
                item.shape,
                item.carat.toFixed(2),
                item.colour,
                item.clarity,
              ])}
              growth={
                isSoldProduct(productDetails)
                  ? ((productDetails.slt_details[0].current_price -
                      productDetails.slt_details[0].purchase_price) /
                      productDetails.slt_details[0].purchase_price) *
                    100
                  : undefined
              }
            />
          </>
        )} */}
        {/* {isSoldProduct(productDetails) && (
          <>
            <VerifyTrackSummaryDetailsAccordion
              discount={productDetails.purchase_discount}
              purchaseAmount={productDetails.purchase_price as number}
              premium={0}
              total={productDetails.purchase_price_final as number}
              currency_locale={productDetails.currency_locale}
              currency_code={productDetails.currency_code}
              className="mt-9"
            />            
          </>
        )} */}
        <div className="flex my-2.5 border-dotted  border-[0.5px] border-black"></div>
        <div className="w-full bg-[#F8F8F8] rounded-[5px] pl-[11px] pt-[15px] pb-4 pr-2">
          <div className="flex justify-between text-xs font-Montserrat font-medium text-[#121212]">
            Buyback Amount:
            <div className="text-gold text-sm font-semibold font-Montserrat mr-[6px]">
              {`${formatByCurrency(
                Math.round(productDetails.buyback_same_store_price),
                productDetails.currency_locale,
                productDetails.currency_code
              )}`}
            </div>
          </div>
        </div>
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

export default BuybackAtPurchasedStore;

import { useState } from "react";

import { TabNavWithSection, TabNavWithSectionProps } from "@/components";
import { SaleType } from "@/enum/sale-type-enum";

import BuybackTabs from "./buy-back";
import ExchangeTabs from "./exchange";
//import VerifyTrackResaleBuyback from "./verify-track-resale-buyback";
import RequisitionForm from "./requisition-form";
import VerifyTrackResaleConfirmation from "./verify-track-resale-confirmation";
import { RESALE_STEPS } from "./verify-track-resale-steps-enum";
import VerifyTrackResaleUpgrade from "./verify-track-resale-upgrade";

interface StepWrapperProps {
  type: "UPGRADE" | "EXCHANGE" | "BUYBACK";
}

const StepWrapper: React.FC<StepWrapperProps> = ({ type }) => {
  const [currentStep, setCurrentStep] = useState<RESALE_STEPS>(
    RESALE_STEPS.ONE
  );
  const [productAmt, setProductAmt] = useState<string>("");
  const [saletype, setSaletype] = useState<SaleType>(SaleType.UPGRADE);

  switch (currentStep) {
    default:
    case RESALE_STEPS.ONE:
      if (type === "UPGRADE") {
        return (
          <VerifyTrackResaleUpgrade
            setCurrentStep={setCurrentStep}
            productAmt={productAmt}
            setProductAmt={setProductAmt}
            setSaletype={setSaletype}
          />
        );
      }
      if (type === "BUYBACK") {
        return (
          <BuybackTabs />
          // <VerifyTrackResaleBuyback
          //   setCurrentStep={setCurrentStep}
          //   setProductAmt={setProductAmt}
          //   setSaletype={setSaletype}
          // />
        );
      }
      // Render ExchangeTabs for "EXCHANGE" flow
      return <ExchangeTabs />;
    case RESALE_STEPS.TWO:
      return (
        // <VerifyTrackResaleForm
        //   setCurrentStep={setCurrentStep}
        //   productAmt={productAmt}
        //   saletype={saletype}
        // />
        <RequisitionForm
          setCurrentStep={setCurrentStep}
          productAmt={productAmt}
          saletype={saletype}
        />
      );
    case RESALE_STEPS.THREE:
      // setCurrentStep={setCurrentStep}
      return <VerifyTrackResaleConfirmation />;
  }
};

const VerifyTrackResale: React.FC = () => {
  const tabProps: TabNavWithSectionProps = {
    initialTab: 1,
    orientation: "custom",
    sections: [
      {
        label: "Ugrade",
        component: <StepWrapper type="UPGRADE" />,
      },
      {
        label: "Buyback",
        component: <StepWrapper type="BUYBACK" />,
      },
      {
        label: "Exchange", // Add the EXCHANGE tab
        component: <StepWrapper type="EXCHANGE" />,
      },
    ],
  };

  return (
    <div className={tabProps.initialTab > 1 ? "bg-[#F0F0F0] mx-2" : ""}>
      <TabNavWithSection {...tabProps} />
    </div>
  );
};

export default VerifyTrackResale;

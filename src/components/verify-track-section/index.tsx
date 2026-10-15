import { useRouter } from "next/router";
import React, { useContext } from "react";

import { TabNavWithSection, TabNavWithSectionProps } from "@/components";
import { VerifyTrackContext } from "@/context/verify-track-context";
import { VerifyTrackTabsEnum } from "@/enum";
import useIsOutsideIndia from "@/hooks/use-is-outside-india";
//import { deletePortfoliouid, getPortfoliouid } from "@/local-storage";
import { isJewelleryProduct, isSoldProduct } from "@/util";

import {
  VerifyTrackCertificate,
  VerifyTrackHeartArrow,
  VerifyTrackInsurance,
  VerifyTrackResale,
  VerifyTrackSummary,
  //VerifyTrackSummaryIndex,
  VerifyTrackJourney,
} from "./sub-components";
import { Tab } from "../tab-nav-with-section";

const tabsByType: {
  [key in VerifyTrackTabsEnum]: Tab;
} = {
  Summary: {
    label: "Summary",
    component: <VerifyTrackSummary />,
  },
  Certificate: {
    label: "Certificate",
    component: <VerifyTrackCertificate />,
  },
  Insurance: {
    label: "Insurance",
    component: <VerifyTrackInsurance />,
  },
  "H&A": {
    label: "H&A",
    component: <VerifyTrackHeartArrow />,
  },
  Resale: {
    label: "Resale",
    component: <VerifyTrackResale />,
  },
  // Loan: {
  //   title: "Loan",
  //   component: <VerifyTrackLoan />,
  // },
  Journey: {
    label: "Journey",
    component: <VerifyTrackJourney />,
  },
};

const getTabNavProps = (
  isJewellery: boolean,
  isSold: boolean,
  hideInsurance: boolean,
  chkport?: string,
): TabNavWithSectionProps => {
  const getSections = (): Array<Tab> => {
    const {
      Summary,
      Certificate,
      Insurance,
      Resale,
      // Loan,
      "H&A": HNA,
      Journey,
    } = tabsByType;
    const sections = ((): Array<Tab> => {
      if (isJewellery && isSold)
        return [Summary, Certificate, Insurance, Resale /*Loan*/];
      if (isJewellery && !isSold) return [Summary, Certificate, Insurance];
      if (!isJewellery && isSold)
        return [
          Summary,
          Certificate,
          Insurance,
          HNA,
          Resale,
          /*Loan,*/ Journey,
        ];
      return [Summary, Certificate, Insurance, HNA, Journey];
    })();
    // Insurance tab outside India mein nahi dikhana
    return hideInsurance
      ? sections.filter((tab) => tab !== Insurance)
      : sections;
  };

  const initialTabIndex =
    chkport === "yes"
      ? getSections().findIndex((tab) => tab === tabsByType.Resale) + 1
      : 0;

  //console.log("initialTabIndex:", initialTabIndex);
  const tabSectionData: TabNavWithSectionProps = {
    initialTab: initialTabIndex,
    sections: getSections(),
    className: "px-4",
  };

  //deletePortfoliouid();
  return tabSectionData;
};

const VerifyTrackSection: React.FC = () => {
  const { productDetails, switchToInsurance } = useContext(VerifyTrackContext);
  const isJewellery = isJewelleryProduct(productDetails);
  const isSold = isSoldProduct(productDetails);

  const isOutsideIndia = useIsOutsideIndia();

  // Insurance tab hidden ho to usme switch mat karo
  const currentTabVal = switchToInsurance && !isOutsideIndia ? 3 : undefined;
  const { query } = useRouter();

  return (
    <div className="pt-[72px] lg:pt-0 lg:m-auto md:px-2 lg:my-6 md:my-auto lg:max-w-screen-2xl">
      {/* key: tab list badalne par remount, taaki purana tab number galat tab na khole */}
      <TabNavWithSection
        key={isOutsideIndia ? "outside-india" : "india"}
        {...getTabNavProps(
          isJewellery,
          isSold,
          isOutsideIndia,
          query.portfolio?.toString(),
        )}
        currentTab={currentTabVal}
        logTabViews
      />
    </div>
  );
};

export default VerifyTrackSection;

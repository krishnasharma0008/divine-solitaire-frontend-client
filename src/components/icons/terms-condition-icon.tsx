import React from "react";

import { SvgIconProps } from "./icon-props";

const TermsConditionIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <rect width="48" height="48" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_120_5330" transform="scale(0.0005)" />
      </pattern>
      <image
        id="image0_120_5330"
        width="2000"
        height="2000"
      />
    </defs>
  </svg>
);

export default TermsConditionIcon;
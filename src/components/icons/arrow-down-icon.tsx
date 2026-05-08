import { SvgIconProps } from "./icon-props";

const ArrowDownIcon: React.FC<SvgIconProps> = (props) => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
    <path
      d="M12.5 3.75V20.25"
      stroke="#FF0000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.25 13.5L12.5 20.25L5.75 13.5"
      stroke="#FF0000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowDownIcon;

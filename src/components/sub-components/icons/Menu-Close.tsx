import { SVGProps } from "react";

const MenuClose = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="currentColor" {...props}>
    <path d="m6 6 12 12M6 18 18 6" />
  </svg>
);

export default MenuClose;

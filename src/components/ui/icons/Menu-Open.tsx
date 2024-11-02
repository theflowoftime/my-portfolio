import { SVGProps } from "react";

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="currentColor" {...props}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export default MenuIcon;

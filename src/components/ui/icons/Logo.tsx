import { SVGProps } from "react";

const Logo = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      {...props}
    >
      <path
        className={className}
        fillRule="evenodd"
        d="M12 .5H8v4H0v12h8v-4h8V.5h-4Zm-8 12h4v-4h4v-4H8v4H4v4Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Logo;

import { SVGProps } from "react";

const LogoHero = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="156"
      width="156" // can remove both (width and height) from here if I need to define custom sizes from the parent component
      viewBox="0 0 156 156" // Defines the SVG coordinate system
      fill="none"
      className={className}
      {...props}
    >
      <mask id="a" fill="#fff">
        <path
          fillRule="evenodd"
          d="M0 39.75h77.5V78.5H38.75v38.75H77.5V156H0V39.75Z"
          clipRule="evenodd"
        />
      </mask>
      <path
        fill="#C778DD"
        d="M0 39.75v-1h-1v1h1Zm77.5 0h1v-1h-1v1Zm0 38.75v1h1v-1h-1Zm-38.75 0v-1h-1v1h1Zm0 38.75h-1v1h1v-1Zm38.75 0h1v-1h-1v1Zm0 38.75v1h1v-1h-1ZM0 156h-1v1h1v-1ZM38.75 38.75H0v2h38.75v-2Zm38.75 0H38.75v2H77.5v-2Zm1 39.75V39.75h-2V78.5h2Zm-39.75 1H77.5v-2H38.75v2Zm1 37.75V78.5h-2v38.75h2Zm-1 1H77.5v-2H38.75v2Zm37.75-1V156h2v-38.75h-2Zm1 37.75H38.75v2H77.5v-2ZM0 157h38.75v-2H0v2Zm-1-39.75V156h2v-38.75h-2Zm0-38.75v38.75h2V78.5h-2Zm0-38.75V78.5h2V39.75h-2Z"
        mask="url(#a)"
      />
      <mask
        id="b"
        width={80}
        height={119}
        x={76.5}
        y={0}
        fill="#000"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M76.5 0h80v119h-80z" />
        <path
          fillRule="evenodd"
          d="M77.5 1H155v116.25H77.5V78.5h38.75V39.75H77.5V1Z"
          clipRule="evenodd"
        />
      </mask>
      <path
        fill="#C778DD"
        d="M77.5 1V0h-1v1h1ZM155 1h1V0h-1v1Zm0 116.25v1h1v-1h-1Zm-77.5 0h-1v1h1v-1Zm0-38.75v-1h-1v1h1Zm38.75 0v1h1v-1h-1Zm0-38.75h1v-1h-1v1Zm-38.75 0h-1v1h1v-1ZM116.25 0H77.5v2h38.75V0ZM155 0h-38.75v2H155V0Zm1 39.75V1h-2v38.75h2Zm0 38.75V39.75h-2V78.5h2Zm0 38.75V78.5h-2v38.75h2Zm-39.75 1H155v-2h-38.75v2Zm0-2H77.5v2h38.75v-2Zm-37.75 1V78.5h-2v38.75h2Zm-1-37.75h38.75v-2H77.5v2Zm37.75-39.75V78.5h2V39.75h-2Zm-37.75 1h38.75v-2H77.5v2ZM76.5 1v38.75h2V1h-2Z"
        mask="url(#b)"
      />
    </svg>
  );
};

export default LogoHero;

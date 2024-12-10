import { ComponentProps } from "react";
import Logo from "./icons/Logo";

const LogoWithName = (props: ComponentProps<"div">) => {
  return (
    <div className="flex items-center select-none gap-x-2" {...props}>
      <Logo className="w-4 h-4 fill-black dark:fill-white" />
      <span className="self-center hidden text-base -tracking-[0.03] dark:text-white sm:inline font-instrument italic">
        Yacine
      </span>
    </div>
  );
};

export default LogoWithName;

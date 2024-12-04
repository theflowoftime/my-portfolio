import { ComponentProps } from "react";
import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme-toggle";

const Toggles = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div className="flex gap-x-2" {...props}>
      <LanguageToggle className="text-xs shadow-sm dark:text-white shadow-black" />
      <ThemeToggle className="text-xs shadow-sm dark:text-white shadow-black" />
    </div>
  );
};

export default Toggles;

import { cloneElement, ComponentPropsWithoutRef } from "react";
import Github from "./Github";
import Dribble from "./Dribble";
import Figma from "./Figma";

type Size = "md" | "lg";
type SocialIconsProps = { size?: Size };

export default function SocialIcons({
  className,
  size,
}: ComponentPropsWithoutRef<"div"> & SocialIconsProps) {
  const icons = [
    { component: <Github />, mdClass: "w-[42px] h-[40px]" },
    { component: <Dribble />, mdClass: "w-[46px] h-[46px]" },
    { component: <Figma />, mdClass: "w-[28px] h-[40px]" },
  ];

  return (
    <div className={className}>
      {icons.map((icon, index) =>
        cloneElement(icon.component, {
          className: size === "md" ? icon.mdClass : undefined,
          key: index,
        })
      )}
    </div>
  );
}

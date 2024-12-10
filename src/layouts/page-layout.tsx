import NavBar from "@/components/sub-components/navbar";
import { ComponentPropsWithoutRef } from "react";

export default function PageLayout({
  children,
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div>{children}</div>
      </div>
    </div>
  );
}

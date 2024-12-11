import NavBar from "@/components/sub-components/navbar";
import { ComponentPropsWithoutRef } from "react";

export default function PageLayout({
  children,
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="h-full min-h-screen">
      <NavBar />
      <div className="container">
        <div>{children}</div>
      </div>
    </div>
  );
}

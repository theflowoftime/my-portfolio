import NavBar from "@/components/sub-components/navbar";
import { ComponentPropsWithoutRef } from "react";

export default function PageLayout({
  children,
  title,
}: ComponentPropsWithoutRef<"div"> & { title: string }) {
  return (
    <div>
      <NavBar className="bg-neutral-900 backdrop-blur-2xl backdrop-filter bg-opacity-40" />
      <div className="container">
        <div>{children}</div>
      </div>
    </div>
  );
}

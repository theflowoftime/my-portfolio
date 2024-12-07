import NavBar from "@/components/sub-components/navbar";
import { ComponentPropsWithoutRef } from "react";

export default function PageLayout({
  children,
  title,
}: ComponentPropsWithoutRef<"div"> & { title: string }) {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div>{children}</div>
      </div>
    </div>
  );
}

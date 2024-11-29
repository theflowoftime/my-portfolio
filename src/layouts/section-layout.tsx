import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const SectionLayout = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { slug: string; url?: string }
>(({ className, slug, url, children }, ref) => {
  return (
    <>
      {url ? (
        <div
          className="bg-cover bg-center h-[18.75rem] w-full bg-fixed"
          style={{ backgroundImage: `url(${url})` }}
        />
      ) : null}
      <div className={cn("relative overflow-hidden mb-16", className)}>
        <div ref={ref} className="container" id={slug}>
          <div className="w-full h-full py-16">{children}</div>
        </div>
      </div>
    </>
  );
});

export default SectionLayout;

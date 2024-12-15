import { getTimeZoneOffset } from "@/lib/utils";
import useVisitorStore from "@/stores/visitor-store";

export function VisitorTimezoneAndOffset() {
  const visitorInfo = useVisitorStore((state) => state.visitorInfo);

  return (
    <>
      {visitorInfo?.timezone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone}{" "}
      {getTimeZoneOffset(visitorInfo?.offset)}
    </>
  );
}

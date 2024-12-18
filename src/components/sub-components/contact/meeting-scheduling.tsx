import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn, computeDefaultMeetingDate } from "@/lib/utils";
import { useCursorStore } from "@/stores/cursor-store";
import { useLanguageStore } from "@/stores/language-store";
import { CalendarClock, Loader2 } from "lucide-react";
// import ScheduleMeetingForm from "./form-meeting";
import { useForm } from "react-hook-form";
import { MeetSchemaType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildFormSchema } from "@/lib/zod-schemas";
import { lazy, Suspense, useRef, useState } from "react";

const ScheduleMeetingForm = lazy(() => import("./form-meeting"));

function DrawerHeaderContent({
  status,
  platform,
}: {
  status: string;
  platform: string;
}) {
  if (status === "pending") {
    return <Loader2 className="animate-spin" />;
  }

  if (status === "success") {
    return (
      <>
        <DrawerTitle className="text-black">
          Created a {platform} meeting!
        </DrawerTitle>
        <DrawerDescription className="text-black/80">
          Looking forward to talking with you 😊
        </DrawerDescription>
      </>
    );
  }

  return (
    <>
      <DrawerTitle>Let's talk about your business!</DrawerTitle>
      <DrawerDescription>Schedule an online meeting</DrawerDescription>
    </>
  );
}

export default function ScheduleMeeting() {
  const language = useLanguageStore((state) => state.language);
  const animateCursor = useCursorStore((state) => state.animateCursor);
  const [formStatus, setFormStatus] = useState<string>("idle");
  const updateFormStatus = (status: string) => {
    setFormStatus(status);
  };

  const formSchema = buildFormSchema(null, "meet"); // will pass in meetData.errorMessages instead of null
  const form = useForm<MeetSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: computeDefaultMeetingDate(),
      time: "09:00",
      platform: "zoom",
    },
  });

  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <Button
          type="button"
          variant="outline"
          onMouseEnter={() => animateCursor("buttonHover")}
          onMouseLeave={() => animateCursor("cursorEnter")}
          className="font-unbounded font-medium sm:text-[0.75rem] md:text-base w-full h-4 py-6 transition-colors bg-inherit ease-in tracking-[0.052] border-[1px] border-primary-foreground/20 rounded-sm
            hover:bg-purple-500/20 hover:transition-all hover:duration-250 shadow-sm dark:shadow-black hover:bg-opacity-20 uppercase"
        >
          <div className="flex items-center w-full">
            <span
              className={cn("grow", language === "AR" && "order-2 font-baloo")}
            >
              Schedule A Meeting
            </span>
            <CalendarClock className="stroke-purple-700" />
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-screen space-y-2">
        <DrawerHeader>
          <DrawerHeaderContent
            status={formStatus}
            platform={form.getValues("platform")}
          />
        </DrawerHeader>
        <div className="container">
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <ScheduleMeetingForm
              form={form}
              onStatusChange={updateFormStatus}
            />
          </Suspense>
        </div>
        <DrawerFooter className="p-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

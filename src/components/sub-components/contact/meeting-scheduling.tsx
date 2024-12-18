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
import { CalendarClock } from "lucide-react";
import ScheduleMeetingForm from "./form-meeting";
import { useForm } from "react-hook-form";
import { MeetSchemaType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildFormSchema } from "@/lib/zod-schemas";

export default function ScheduleMeeting() {
  const language = useLanguageStore((state) => state.language);
  const animateCursor = useCursorStore((state) => state.animateCursor);

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
          {!form.formState.isSubmitSuccessful ? (
            <>
              <DrawerTitle>Let's talk about your buisness!</DrawerTitle>
              <DrawerDescription>Schedule an online meeting</DrawerDescription>
            </>
          ) : (
            <>
              <DrawerTitle>Created a meeting!</DrawerTitle>
              <DrawerDescription>
                looking forward to talking with you &#x1F603;
              </DrawerDescription>
            </>
          )}
        </DrawerHeader>

        <div className="container">
          <ScheduleMeetingForm form={form} />
        </div>
        <DrawerFooter className="p-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

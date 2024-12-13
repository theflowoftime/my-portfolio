import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useSendMessage from "@/hooks/useSendMessage";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { buildFormSchema } from "@/lib/zod-schemas";
import { useCursorStore } from "@/stores/cursor-store";
import { useLanguageStore } from "@/stores/language-store";
import type { MeetSchemaType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarClock, CalendarIcon, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

function ScheduleMeetingForm() {
  const language = useLanguageStore((state) => state.language);
  const animateCursor = useCursorStore((state) => state.animateCursor);

  const formSchema = buildFormSchema(null, "meet"); // will pass in meetData.errorMessages instead of null
  const form = useForm<MeetSchemaType>({
    resolver: zodResolver(formSchema),
    // defaultValues,
  });

  const handleSuccess = () => {
    form.reset();
    // toast({
    //   description: meetData?.toast.success.message || defaultSuccessMessage,
    // });
  };

  const handleError = (errorKey: "recaptcha" | "rateLimit" | "message") => {
    // toast({
    //   description:
    //     meetData?.toast.error?.[
    //       errorKey as keyof typeof meetData.toast.error
    //     ] || defaultErrorMessage,
    // });
  };

  const { throttledSubmit, status, recaptchaRef } = useSendMessage(
    handleSuccess,
    handleError,
    "meet"
  );

  const onSubmit = (data: MeetSchemaType) => throttledSubmit(data);

  const onError = () => {};

  useEffect(() => {
    form.reset();
  }, [language]);

  return (
    <Form {...form}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.stopPropagation();
          form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="meetingDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
                    // locale
                  />
                </PopoverContent>
              </Popover>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ReCAPTCHA
          className="hidden"
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY!}
          size="invisible"
        />

        <Button
          onMouseEnter={() => animateCursor("buttonHover")}
          onMouseLeave={() => animateCursor("cursorEnter")}
          disabled={status === "pending" || form.formState.isSubmitting}
          variant="outline"
          type="submit"
        >
          {status === "pending" ? (
            <>
              <Loader2 className="animate-spin" />
              sending...
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default function ScheduleMeeting() {
  const language = useLanguageStore((state) => state.language);
  const animateCursor = useCursorStore((state) => state.animateCursor);

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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Pick a date of your choice for an online meeting
          </DrawerTitle>
          <DrawerDescription>Let's talk about your buisness!</DrawerDescription>
        </DrawerHeader>
        <ScheduleMeetingForm />
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

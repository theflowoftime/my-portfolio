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
import { cn, computeDefaultMeetingDate } from "@/lib/utils";
import { buildFormSchema } from "@/lib/zod-schemas";
import { useCursorStore } from "@/stores/cursor-store";
import { useLanguageStore } from "@/stores/language-store";
import type { MeetSchemaType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarClock, CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useThemeStore from "@/stores/theme-store";

const meetingOptions = ["google meets", "zoom", "slack", "other"];

function ScheduleMeetingForm() {
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);
  const animateCursor = useCursorStore((state) => state.animateCursor);

  const formSchema = buildFormSchema(null, "meet"); // will pass in meetData.errorMessages instead of null
  const form = useForm<MeetSchemaType>({
    resolver: zodResolver(formSchema),
    // defaultValues,
    defaultValues: {
      meetingDate: computeDefaultMeetingDate(),
      meetingTime: "09:00",
      meetingPlatform: "google meets",
    },
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

  const onSubmit = (data: MeetSchemaType) => {
    console.log(data);
    throttledSubmit(data);
  };

  const onError = () => {};

  useEffect(() => {
    form.reset();
  }, [language]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className={cn(
          "py-8 lg:px-32 shadow-dark-form rounded-xl",
          theme === "light" && "shadow-light-form"
        )}
      >
        <div className="flex flex-col items-center gap-y-8 lg:gap-y-16">
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            <FormField
              control={form.control}
              name="meetingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-full">
                  <FormLabel className="self-start text-xs tracking-wide whitespace-nowrap">
                    When are you available?
                  </FormLabel>
                  <div className="w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
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
                      <PopoverContent className="w-auto p-4" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={[
                            { before: new Date() },
                            { dayOfWeek: [0, 6] },
                          ]}
                          // locale
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meetingTime"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="self-start text-xs tracking-wide whitespace-nowrap">
                    Pick any time from 9am to 6pm
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <Input
                        className="w-full"
                        type="time"
                        min="09:00"
                        max="18:00"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormDescription>
                      <small className="opacity-70">
                        {/* will be changed to figuring out the user timezone and displaying it in here instead */}
                        Coordinated Universal Time (UTC)
                      </small>
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col w-full gap-4 lg:flex-row">
            <FormField
              control={form.control}
              name="meetingPlatform"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="relative w-full">
                      <FormLabel className="text-xs tracking-wide">
                        Which platform suits you best?
                      </FormLabel>
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            language === "AR" &&
                              "data-[placeholder]:font-baloo font-baloo"
                          )}
                        >
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                    </div>
                    <SelectContent className="border-none focus:ring-0">
                      {meetingOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <div className="relative w-full">
                    <FormLabel className="text-xs tracking-wide">
                      What's your email address?
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full placeholder:text-center placeholder:opacity-20"
                        placeholder="your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-start">
                      <small className="opacity-80">
                        Email associated with the chosen platform
                      </small>
                    </FormDescription>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <ReCAPTCHA
            className="hidden"
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY!}
            size="invisible"
          />

          <div className="flex justify-center w-full gap-4 md:flex-col">
            <Button
              className="w-full font-unbounded"
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
                <>Confirm</>
              )}
            </Button>
            <DrawerClose className="w-full">
              <Button className="w-full font-unbounded" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </div>
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
      <DrawerContent className="max-h-screen space-y-2">
        <DrawerHeader>
          <DrawerTitle>Let's talk about your buisness!</DrawerTitle>
          <DrawerDescription>Schedule an online meeting</DrawerDescription>
        </DrawerHeader>
        <div className="container">
          <ScheduleMeetingForm />
        </div>
        <DrawerFooter className="p-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
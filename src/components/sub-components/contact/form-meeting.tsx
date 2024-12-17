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
import { DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  cn,
  computeDefaultMeetingDate,
  formatDateForSanity,
} from "@/lib/utils";
import { buildFormSchema } from "@/lib/zod-schemas";
import { useCursorStore } from "@/stores/cursor-store";
import { useLanguageStore } from "@/stores/language-store";
import useThemeStore from "@/stores/theme-store";
import type { MeetSchemaType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Globe, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { VisitorTimezoneAndOffset } from "./visitor-timezone-offset";
import { SuccessMeetingScheduling } from "./meeting-confirmation";

const meetingOptions = ["google meets", "zoom", "microsoft teams", "other"]; // will be replaced to be dynamic

type Data = {
  link: string;
  password: string;
};

export default function ScheduleMeetingForm() {
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);
  const animateCursor = useCursorStore((state) => state.animateCursor);

  const [data, setData] = useState<Data | null>(null);

  const formSchema = buildFormSchema(null, "meet"); // will pass in meetData.errorMessages instead of null
  const form = useForm<MeetSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: computeDefaultMeetingDate(),
      time: "09:00",
      platform: "zoom",
    },
  });

  const handleSuccess = (data: any) => {
    if (data) setData(data.data);
    // form.reset();
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
    throttledSubmit({
      ...data,
      date: formatDateForSanity(data.date), // Convert to YYYY-MM-DD
      language,
    });
  };

  const onError = () => {};

  useEffect(() => {
    form.reset();
  }, [language]);

  // if (status === "success" && form.formState.isSubmitSuccessful && data) {
  return (
    <SuccessMeetingScheduling
      email={form.getValues("email")}
      start_time={form.getValues("date")}
      time={form.getValues("time")}
      // join_url={data.link}
      join_url={"https:example.com/doerihvnerv4151581481581"}
      password="1234"
      // password={data.password}
    />
  );
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className={cn(
          "py-8 lg:px-32 shadow-dark-form rounded-xl",
          theme === "light" && "shadow-light-form"
        )}
      >
        <div className="flex flex-col items-center gap-y-4 lg:gap-y-8">
          <div className="flex flex-col w-full gap-4 lg:flex-row">
            <FormField
              control={form.control}
              name="date"
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
              name="time"
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
                      {/* <UserLocalTimeSetups /> */}
                      <small className="flex items-center opacity-70 gap-x-2">
                        {/* will be changed to figuring out the user timezone and displaying it in here instead */}
                        <Globe size={14} />
                        <VisitorTimezoneAndOffset />
                      </small>
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="bg-input/40" />

          <div className="flex flex-col w-full gap-4 lg:flex-row">
            <FormField
              control={form.control}
              name="platform"
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

          <div className="flex flex-col justify-center w-full gap-x-8 gap-y-2 lg:px-32 lg:flex-row">
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
                <>confirm</>
              )}
            </Button>
            {/* <Separator className="bg-input" /> */}
            <DrawerClose className="w-full border rounded-lg font-unbounded outline-1 outline-input border-input bg-background hover:bg-accent hover:text-accent-foreground">
              cancel
            </DrawerClose>
          </div>
        </div>
      </form>
    </Form>
  );
}

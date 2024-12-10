import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust this import based on your setup
import useSendMessage from "@/hooks/useSendMessage";
import { defaultValues } from "@/lib/constants";

import { cn } from "@/lib/utils";
import { buildFormSchema } from "@/lib/zod-schemas";
import { queryClient } from "@/main";
import { useCursorStore } from "@/stores/cursor-store";
import { useLanguageStore } from "@/stores/language-store";
import type { FormSchemaType, Contact as TContact } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CalendarClock, Loader2, Send } from "lucide-react";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import LabelIcon from "./form-label-icon";
import { Button } from "@/components/ui/button";

export function ContactForm({ contactData }: { contactData: TContact }) {
  const language = useLanguageStore((state) => state.language);
  const contact =
    contactData || queryClient.getQueryData<TContact>(["contact", language]);
  const animateCursor = useCursorStore((state) => state.animateCursor);

  const formSchema = buildFormSchema(contactData?.errorMessages);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { throttledSubmit, status, recaptchaRef } = useSendMessage(
    contact,
    form
  );

  const onSubmit = (data: FormSchemaType) => {
    throttledSubmit(data);
  };

  const onError = () => {};

  useEffect(() => {
    form.reset();
  }, [language]);

  return (
    <Form {...form}>
      <form
        className="px-8 py-4 space-y-24"
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        {contact.fields.inputs.map((input) => (
          <div key={input.label}>
            <FormField
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-8">
                    <div className="relative">
                      <FormLabel>
                        <LabelIcon
                          className={cn(
                            "absolute -translate-y-1/2 top-1/2 dark:stroke-purple-400 stroke-purple-700 strk-white",
                            language === "AR" && "right-0"
                          )}
                          name={input.name}
                          size={20}
                        />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={input.placeholder}
                          className={cn(
                            "text-center ring-offset-transparent focus-visible:ring-offset-0 focus-visible:ring-0 border-t-0 border-l-0 border-r-0 rounded-none placeholder:font-jura placeholder:text-base placeholder:uppercase placeholder:text-center dark:placeholder:text-primary/80 placeholder:text-primary/80 border-b-primary-foreground/20 focus-within:border-b-primary-foreground bg-inherit",
                            language === "AR" &&
                              "placeholder:font-baloo font-baloo"
                          )}
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        ))}

        {/* Reason Field */}
        {contact.fields.selects.map((select) => (
          <div key={select.label}>
            <FormField
              control={form.control}
              name={select.name}
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-4">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="relative">
                        <FormLabel>
                          <LabelIcon
                            className={cn(
                              "absolute -translate-y-1/2 top-1/2 dark:stroke-purple-400 stroke-purple-700 strk-white",
                              language === "AR" && "right-0"
                            )}
                            name={select.name}
                            size={20}
                          />
                        </FormLabel>
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "h-8 ring-offset-transparent focus-visible:ring-offset-0 focus-visible:ring-0  border-t-0 border-l-0 border-r-0 dark:placeholder:text-primary/80 rounded-none w-full data-[placeholder]:text-primary/80 data-[placeholder]:text-base data-[placeholder]:font-jura data-[placeholder]:uppercase  [&>span]:w-full  [&>span]:text-center data-[placeholder]:text-center border-b-primary-foreground/20 bg-inherit focus:ring-0 focus-within:border-b-primary",
                              language === "AR" &&
                                "data-[placeholder]:font-baloo font-baloo"
                            )}
                          >
                            <SelectValue placeholder={select.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                      </div>
                      <SelectContent className="border-none focus:ring-0">
                        {select.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        ))}

        <ReCAPTCHA
          className="hidden"
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY!}
          size="invisible"
        />

        {/* Submit Button */}
        <motion.div className="flex flex-col items-center item-center gap-y-4">
          <Button
            onMouseEnter={() => animateCursor("buttonHover")}
            onMouseLeave={() => animateCursor("cursorEnter")}
            disabled={status === "pending" || form.formState.isSubmitting}
            variant="outline"
            className={cn(
              "font-jura font-medium sm:text-[0.75rem] md:text-base w-full h-4 py-6 transition-colors bg-inherit ease-in tracking-[0.3em] border-[1px] border-primary-foreground/20 rounded-sm hover:bg-purple-500/20 hover:transition-all hover:duration-250 shadow-sm dark:shadow-black hover:bg-opacity-20 uppercase",
              language === "AR" && "tracking-wide"
            )}
            type="submit"
          >
            {status === "pending" ? (
              <>
                <Loader2 className="animate-spin" />
                {contact.button.submittingText}...
              </>
            ) : (
              <div className="flex items-center w-full">
                <span
                  className={cn(
                    "grow",
                    language === "AR" && "order-2 font-baloo"
                  )}
                >
                  {contact.button.initialText}
                </span>
                <Send className="stroke-purple-700" />
              </div>
            )}
          </Button>

          <div
            className="before:content[''] before:w-96 before:h-[0.062rem] dark:before:bg-white/10 
            before:bg-purple-400/30 text-purple-700 dark:text-purple-400 before:absolute before:-translate-y-1/2 after:-translate-y-1/2 before:top-1/2 before:left-[60%] 
            after:content[''] text-center after:w-96 after:h-[0.062rem]  dark:after:bg-white/10  after:bg-purple-400/30 after:absolute after:top-1/2 after:right-[60%] relative w-full"
          >
            <span className="text-base font-instrument">Or</span>
          </div>

          <Drawer>
            <DrawerTrigger className="w-full">
              <Button
                type="button"
                variant="outline"
                onMouseEnter={() => animateCursor("buttonHover")}
                onMouseLeave={() => animateCursor("cursorEnter")}
                className="font-jura font-medium sm:text-[0.75rem] md:text-base w-full h-4 py-6 transition-colors bg-inherit ease-in tracking-[0.3em] border-[1px] border-primary-foreground/20 rounded-sm
             hover:bg-purple-500/20 hover:transition-all hover:duration-250 shadow-sm dark:shadow-black hover:bg-opacity-20 uppercase"
              >
                <div className="flex items-center w-full">
                  <span
                    className={cn(
                      "grow",
                      language === "AR" && "order-2 font-baloo"
                    )}
                  >
                    Schedule A Meeting
                  </span>
                  <CalendarClock className="stroke-purple-700" />
                </div>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-pretty">
                  Pick a date of your choice for an online meeting so we can
                  talk about your buisness!
                </DrawerTitle>
                {/* <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription> */}
              </DrawerHeader>
              <DrawerFooter>
                <Button variant="outline">Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </motion.div>
      </form>
    </Form>
  );
}

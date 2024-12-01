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
import useContact from "@/hooks/useContact";
import useNavLinks from "@/hooks/useNavLinks";
import useSendMessage from "@/hooks/useSendMessage";
import SectionLayout from "@/layouts/section-layout";
import { defaultValues } from "@/lib/constants";

import {
  contactTitleBackFlip,
  ReversewaterFallContactForm,
} from "@/lib/framer-variants";
import { buildFormSchema } from "@/lib/zod-schemas";
import { queryClient } from "@/main";
import { useLanguageStore } from "@/stores/language-store";
import type { FormSchemaType, Contact as TContact } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import LabelIcon from "./sub-components/contact/form-label-icon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Toaster } from "./ui/toaster";
import { cn } from "@/lib/utils";

const contactFormHeaderText = [
  { word: "Let's", highlighted: false },
  { word: "talk!", highlighted: true },
];

function ContactForm() {
  const language = useLanguageStore((state) => state.language);
  const contact = queryClient.getQueryData<TContact>(["contact", language]);
  const formSchema = buildFormSchema(contact?.errorMessages);
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
      <motion.form
        className="px-8 py-4 space-y-16"
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        {contact?.fields.inputs.map((input) => (
          <motion.div key={input.label} variants={ReversewaterFallContactForm}>
            <FormField
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-8">
                    <div className="relative">
                      <FormLabel>
                        <LabelIcon
                          className="absolute -translate-y-1/2 top-1/2 dark:stroke-purple-400 stroke-purple-700 strk-white"
                          name={input.name}
                          size={16}
                        />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={input.placeholder}
                          className="text-center border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-xs placeholder:text-center dark:placeholder:text-primary border-b-primary-foreground/20 focus-within:border-b-primary-foreground bg-inherit focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </motion.div>
        ))}

        {/* Reason Field */}
        {contact?.fields.selects.map((select) => (
          <motion.div variants={ReversewaterFallContactForm} key={select.label}>
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
                            className="absolute -translate-y-1/2 top-1/2 dark:stroke-purple-400 stroke-purple-700 strk-white"
                            name={select.name}
                            size={16}
                          />
                        </FormLabel>
                        <FormControl>
                          <SelectTrigger className="h-8 border-t-0 border-l-0 border-r-0 rounded-none w-full dark:data-[placeholder]:text-primary  [&>span]:w-full  [&>span]:text-center data-[placeholder]:text-center border-b-primary-foreground/20 bg-inherit focus:ring-0 focus-within:border-b-primary">
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
          </motion.div>
        ))}

        <ReCAPTCHA
          className="hidden"
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY!}
          size="invisible"
        />

        {/* Submit Button */}
        <motion.div variants={ReversewaterFallContactForm}>
          <Button
            disabled={status === "pending" || form.formState.isSubmitting}
            variant="outline"
            className="w-full h-4 py-6 px-4 bg-inherit tracking-wide dark:text-white border-[1px] border-primary-foreground/20 rounded-sm 
          hover:bg-purple-500/20 hover:transition-all hover:duration-250 shadow-sm dark:shadow-black hover:bg-opacity-20"
            type="submit"
          >
            {status === "pending" ? (
              <>
                <Loader2 className="animate-spin" />
                {contact?.button.submittingText}...
              </>
            ) : (
              <div className="flex items-center justify-center gap-x-2">
                {contact?.button.initialText}
                <Send className="stroke-purple-400" />
              </div>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
}

function Contact() {
  const { data: contactData, isLoading } = useContact();
  const { data: navLinks } = useNavLinks();
  const slug = navLinks?.links?.[3].slug || "contact";

  // const {
  //   state: { data: navLinks },
  // } = useLocation();

  // const location = useLocation();
  if (isLoading || !contactData) return <SectionLayout slug={slug} />;

  return (
    <>
      <SectionLayout slug={slug} url="/mail.jpg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            initial: { y: "-100%" },
            visible: {
              y: 0,
              transition: {
                type: "spring",
                stiffness: 10,
                staggerChildren: 0.2,
                delayChildren: 0.2,
              },
            },
          }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col justify-center h-full"
        >
          {/* form container */}
          <div className="grid items-center justify-center gap-y-8 gap-x-8 lg:grid-cols-2 grid-re">
            <motion.div className="p-4 rounded-lg shadow-sm h-fit dark:shadow-black">
              <ContactForm />
            </motion.div>
            {/* Localization needed */}

            <motion.h5 className="text-[9.75rem] font-unbounded leading-[0.7em] row-start-1">
              {contactFormHeaderText.map((wordInfo) => (
                <motion.p
                  key={wordInfo.word}
                  className={cn(wordInfo.highlighted && "text-purple-500")}
                  variants={contactTitleBackFlip}
                >
                  {wordInfo.word}
                </motion.p>
              ))}
            </motion.h5>
          </div>
        </motion.div>
        <Toaster />
      </SectionLayout>
    </>
  );
}

export default Contact;

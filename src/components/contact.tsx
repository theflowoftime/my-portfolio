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
import { waterFall } from "@/lib/framer-variants";
import { buildFormSchema } from "@/lib/zod-schemas";
import { useLanguageStore } from "@/stores/language-store";
import type { FormSchemaType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import LabelIcon from "./sub-components/contact/form-label-icon";
import LazyBackground from "./sub-components/lazy-bg-img-sanity";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Toaster } from "./ui/toaster";
import ContactHeader from "./sub-components/contact/form-header";
import type { Contact as TContact } from "@/types/types";
import { queryClient } from "@/main";

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
        custom={0.6}
        variants={waterFall}
        className="px-8 space-y-8 rounded-md"
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        {contact?.fields.inputs.map((input) => (
          <FormField
            key={input.label}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem className="space-y-8">
                <FormLabel className="flex items-center gap-x-4">
                  <LabelIcon name={input.name} />
                  {input.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={input.placeholder}
                    className="border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center dark:placeholder:text-primary border-b-primary-foreground/20 focus-within:border-b-primary-foreground bg-inherit focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        ))}

        {/* Reason Field */}
        {contact?.fields.selects.map((select) => (
          <FormField
            key={select.label}
            control={form.control}
            name={select.name}
            render={({ field }) => (
              <FormItem className="space-y-8">
                <FormLabel className="flex items-center gap-x-4">
                  <LabelIcon name={select.name} />
                  {select.label}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-t-0 border-l-0 border-r-0 rounded-none w-full dark:data-[placeholder]:text-primary  [&>span]:w-full  [&>span]:text-center data-[placeholder]:text-center border-b-primary-foreground/20 bg-inherit focus:ring-0 focus-within:border-b-primary">
                      <SelectValue placeholder={select.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-none focus:ring-0">
                    {select.options.map((option) => (
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
        ))}

        <ReCAPTCHA
          className="hidden"
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY!}
          size="invisible"
        />

        {/* Submit Button */}
        <Button
          disabled={status === "pending" || form.formState.isSubmitting}
          variant="outline"
          className="w-full py-6 px-4 bg-inherit font-medium tracking-widest dark:text-white border-[1px] border-primary-foreground/20 rounded-sm 
      hover:bg-purple-500/20 hover:transition-all hover:duration-250 shadow-sm shadow-black hover:bg-opacity-20"
          type="submit"
        >
          {status === "pending" ? (
            <>
              <Loader2 className="animate-spin" />
              {contact?.button.submittingText}...
              {/* either remove or add in contact document (contact?.button.loaderText)  */}
            </>
          ) : (
            contact?.button.initialText
          )}
        </Button>
      </motion.form>
    </Form>
  );
}

function Contact() {
  // const { navLinks, language } = useCachedNavLinks();
  const { data: contactData, isLoading } = useContact();
  const { data: navLinks } = useNavLinks();
  const slug = navLinks?.links?.[3].slug || "contact";

  // const {
  //   state: { data: navLinks },
  // } = useLocation();

  // const location = useLocation();
  if (isLoading)
    return (
      <SectionLayout slug={slug}>
        <Loader2 />
      </SectionLayout>
    );

  if (!contactData) return <p>Loading contact form...</p>;

  return (
    <>
      <SectionLayout slug={slug}>
        <div className="flex flex-col h-full gap-y-4">
          <ContactHeader description={contactData.description} />
          {/* form container */}
          <div className="grid items-center py-8 shadow-md gap-x-4 lg:grid-cols-2 dark:shadow-black">
            <ContactForm />
            <LazyBackground
              size="md"
              className="bg-[27%_100%] rounded-none"
              image={contactData.contactImage}
            />
          </div>
        </div>
        <Toaster />
      </SectionLayout>
    </>
  );
}

export default Contact;

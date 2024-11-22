import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import SectionLayout from "@/layouts/section-layout";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust this import based on your setup
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useContact from "@/hooks/useContact";
import { Hand, Loader2, Mail, Phone, UserSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";
import { useEffect, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "@tanstack/react-query";
import useThrottle from "@/hooks/useThrottle";
import { defaultValues, THROTTLE_DELAY } from "@/lib/constants";
import { waterFall } from "@/lib/framer-variants";
import { buildFormSchema } from "@/lib/zod-schemas";
import type { Contact as TContact, FormSchemaType } from "@/types/types";
import countryData from "@/assets/data/dial_codes.json";
import { useLocation } from "react-router-dom";
import { useLanguageStore } from "@/stores/language-store";
import LazyBackground from "./sub-components/lazy-bg-img-sanity";

const SendMessage = async (
  data: FormSchemaType & { recaptchaToken: string }
) => {
  const response = await axios.post(
    `/api/verifyRecaptchaAndSubmitMessage`,
    data
  );
  return response.data;
};

const useSendMessage = (
  contactData: TContact | undefined,
  form: UseFormReturn<FormSchemaType>
) => {
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const { mutate, status } = useMutation({
    mutationFn: SendMessage,
    onSuccess: () => {
      form.reset();

      toast({
        description: contactData?.toast.success.message,
      });
    },
    onError: (data: any) => {
      const msg = data.response.data.message;

      toast({
        description:
          contactData?.toast.error?.[
            msg as keyof typeof contactData.toast.error
          ],
      });
    },
  });

  const handleRecaptcha = async () => {
    const token = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

    return token;
  };

  const throttledSubmit = useThrottle(async (data: FormSchemaType) => {
    const recaptchaToken = await handleRecaptcha();

    if (recaptchaToken) {
      mutate({ ...data, recaptchaToken });
    } else {
      toast({
        description:
          contactData?.toast.error?.[
            "recaptcha" as keyof typeof contactData.toast.error
          ] || "reCAPTCHA verification failed. Please try again.",
      });
    }
  }, THROTTLE_DELAY);

  return { throttledSubmit, status, recaptchaRef };
};

function Contact() {
  const { data: contactData, isLoading } = useContact();
  // const { navLinks, language } = useCachedNavLinks();
  const language = useLanguageStore((state) => state.language);
  // const {
  //   state: { data: navLinks },
  // } = useLocation();

  const location = useLocation();

  const slug = location?.state?.data?.links?.[3].slug || "contact";
  const formSchema = buildFormSchema(contactData?.errorMessages);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { throttledSubmit, status, recaptchaRef } = useSendMessage(
    contactData,
    form
  );

  const onSubmit = (data: FormSchemaType) => {
    throttledSubmit(data);
  };

  const onError = () => {};

  useEffect(() => {
    form.reset();
  }, [language]);

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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={waterFall}
            custom={0.2} // Controls delay for paragraph fade-in
            className="mb-4 space-y-8"
          >
            <motion.h1
              custom={0.2}
              variants={waterFall}
              className="lg:text-[2.5rem] whitespace-nowrap dark:text-white md:text-[1.5em] text-4xl text-center text-pretty"
            >
              {contactData.description.title}
            </motion.h1>
            <motion.p
              custom={0.4}
              variants={waterFall}
              className="text-base italic text-pretty opacity-80"
            >
              {contactData.description.subtitle}
            </motion.p>
          </motion.div>
          <div className="grid items-center py-8 shadow-md gap-x-16 lg:grid-cols-2 dark:shadow-black">
            <Form {...form}>
              <motion.form
                custom={0.6}
                variants={waterFall}
                className="px-8 space-y-8 rounded-md"
                onSubmit={form.handleSubmit(onSubmit, onError)}
              >
                {contactData?.fields.inputs.map((input) => (
                  <FormField
                    key={input.label}
                    control={form.control}
                    name={input.name}
                    render={({ field }) => (
                      <FormItem className="space-y-8">
                        <FormLabel className="flex items-center gap-x-4">
                          {/* this is just temporary!  */}
                          {input.label.includes("name") ? (
                            <Hand
                              className="dark:stroke-purple-400 stroke-purple-700"
                              size="20"
                            />
                          ) : null}
                          {input.label.includes("touch") ? (
                            <Mail
                              className="dark:stroke-purple-400 stroke-purple-700"
                              size="20"
                            />
                          ) : null}
                          {input.label.includes("call") ? (
                            <Phone
                              className="dark:stroke-purple-400 stroke-purple-700"
                              size="20"
                            />
                          ) : null}
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

                {/* Service Field */}
                {contactData.fields.selects.map((select) => (
                  <FormField
                    key={select.label}
                    control={form.control}
                    name={select.name}
                    render={({ field }) => (
                      <FormItem className="space-y-8">
                        <FormLabel className="flex items-center gap-x-4">
                          <UserSearch
                            className="dark:stroke-purple-400 stroke-purple-700"
                            size="20"
                          />
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
                      Sending...
                      {/* either remove or add in contact document (contactData?.button.loaderText)  */}
                    </>
                  ) : (
                    contactData.button.value
                  )}
                </Button>
              </motion.form>
            </Form>
            <LazyBackground
              className="bg-[40%_80%] rounded-none h-full"
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

import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import SectionLayout from "@/layouts/section-layout";
import { useForm } from "react-hook-form";
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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";
import { useEffect, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "@tanstack/react-query";
import useThrottle from "@/hooks/useThrottle";
import { defaultValues, textVariants, THROTTLE_DELAY } from "@/lib/constants";
import { buildFormSchema } from "@/lib/zod-schemas";
import { FormSchemaType } from "@/types/types";

function Contact() {
  const { data: contactData, isLoading } = useContact();
  const { navLinks, language } = useCachedNavLinks();
  const slug = navLinks?.links?.[3].slug || "contact";
  const { toast } = useToast();
  const formSchema = buildFormSchema(contactData?.errorMessages);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const { mutate, status } = useMutation({
    mutationFn: async (data: FormSchemaType & { recaptchaToken: string }) => {
      const response = await axios.post(
        `/api/verifyRecaptchaAndSubmitMessage`,
        data
      );
      return response.data;
    },
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

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const throttledSubmit = useThrottle(async (data: FormSchemaType) => {
    const recaptchaToken = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

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

  return (
    <>
      <SectionLayout slug={slug}>
        <div className="flex flex-col">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariants}
            custom={0.2} // Controls delay for paragraph fade-in
            className="space-y-4"
          >
            <motion.h1
              custom={0.2}
              variants={textVariants}
              className="lg:text-[2em] whitespace-nowrap dark:text-white md:text-[1.5em] text-4xl font-light tracking-tighter"
            >
              {contactData?.description.title}
            </motion.h1>
            <motion.p
              custom={0.4}
              variants={textVariants}
              className="italic mx-4 opacity-40 text-[0.75rem] text-wrap tracking-tighter"
            >
              {contactData?.description.subtitle}
            </motion.p>
          </motion.div>
          <div className="grid shadow-sm lg:grid-cols-2 dark:shadow-black">
            <Form {...form}>
              <motion.form
                custom={0.6}
                variants={textVariants}
                className="px-8 py-16 space-y-8 rounded-md"
                onSubmit={form.handleSubmit(onSubmit, onError)}
              >
                {contactData?.fields.inputs.map((input) => (
                  <FormField
                    key={input.label}
                    control={form.control}
                    name={input.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{input.label}</FormLabel>
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
                {contactData?.fields.selects.map((select) => (
                  <FormField
                    key={select.label}
                    control={form.control}
                    name={select.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{select.label}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-t-0 border-l-0 border-r-0 rounded-none w-full dark:data-[placeholder]:text-primary  [&>span]:w-full  [&>span]:text-center data-[placeholder]:text-center border-b-primary-foreground/20 bg-inherit focus:ring-0">
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
                  className="w-full py-6 px-4 bg-inherit font-extralight tracking-widest dark:text-white border-[1px] border-primary-foreground/20 rounded-sm 
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
                    contactData?.button.value
                  )}
                </Button>
              </motion.form>
            </Form>
          </div>
        </div>
        <Toaster />
      </SectionLayout>
    </>
  );
}

export default Contact;

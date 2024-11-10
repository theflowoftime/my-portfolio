import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import SectionLayout from "@/layouts/section-layout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  // Name: required, min 2 and max 30 characters
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(30, { message: "Name must be no more than 30 characters long" }),

  // Email: required, must be a valid email format
  email: z.string().email({ message: "Please enter a valid email address" }),

  // Phone number: required, with basic format validation
  phoneNumber: z.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
    message:
      "Please enter a valid phone number (e.g., +1234567890 or 1234567890)",
  }),

  // Reason: required string, ensures at least one selection
  reason: z.string().min(1, { message: "Please select a reason" }), // Require at least one character,
});

type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  name: "",
  email: "",
  phoneNumber: "",
  reason: "",
};

function Contact() {
  const { data: contactData, isLoading } = useContact();
  const { navLinks } = useCachedNavLinks();
  const slug = navLinks?.links?.[3].slug || "contact";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log("Form submitted:", data);
  };

  console.log(contactData);

  // if (isLoading) return <div>Loading...</div>

  return (
    <>
      <SectionLayout slug={slug}>
        <div className="flex flex-col mt-16 gap-y-2">
          <div className="py-2 space-y-8">
            <h1 className="lg:text-[5em] md:text-[3em] text-4xl pb-4">
              {contactData?.description.title}
            </h1>
            <p className="text-sm opacity-60">
              {contactData?.description.subtitle}
            </p>
          </div>
          <Form {...form}>
            <form
              className="px-8 py-16 space-y-8 rounded-md shadow-sm shadow-black"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {contactData?.fields.inputs.map((input) => (
                <FormField
                  control={form.control}
                  name={input.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{input.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={input.placeholder}
                          className="border-t-0 border-l-0 border-r-0 rounded-none placeholder:text-center dark:placeholder:text-primary border-b-primary-foreground/20 bg-inherit focus-visible:ring-0"
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
                            <SelectItem value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              ))}

              {/* Submit Button */}
              <Button
                variant="outline"
                className="w-full py-6 px-4 bg-inherit font-extralight tracking-widest dark:text-white border-[1px] border-primary-foreground/20 rounded-sm 
                hover:bg-purple-500/20 hover:transition-all hover:duration-250 shadow-sm shadow-black hover:bg-opacity-20"
                type="submit"
              >
                {contactData?.button.value}
              </Button>
            </form>
          </Form>
        </div>
      </SectionLayout>
    </>
  );
}

export default Contact;

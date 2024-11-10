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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust this import based on your setup
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

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

  // Service: required string, ensures at least one selection
  service: z.string().min(1, { message: "Please select a service" }), // Require at least one character,

  // Message: optional, max 500 characters
  message: z
    .string()
    .max(500, { message: "Message must be no more than 500 characters" })
    .optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  name: "",
  email: "",
  phoneNumber: "",
  service: "",
  message: "",
};

function Contact() {
  const { navLinks } = useCachedNavLinks();
  const slug = navLinks?.links?.[3].slug || "contact";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log("Form submitted:", data);
  };

  return (
    <>
      <SectionLayout slug={slug} title="contact">
        <Form {...form}>
          <form
            className="px-8 py-16 space-y-8 rounded-md lg:w-1/2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormDescription className="leading-relaxed tracking-wider text-primary-foreground">
              To request my services, contact me directly using one of my
              provided social links or fill out the form and I will get back to
              you soon.
            </FormDescription>
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    name (<span className="text-purple-400">*</span>)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-t-0 border-l-0 border-r-0 rounded-none border-b-primary-foreground/20 bg-inherit focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    email (<span className="text-purple-400">*</span>)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-t-0 border-l-0 border-r-0 rounded-none border-b-primary-foreground/20 bg-inherit focus-visible:ring-0"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    phone number (<span className="text-purple-400">*</span>)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-t-0 border-l-0 border-r-0 rounded-none border-b-primary-foreground/20 bg-inherit focus-visible:ring-0"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Service Field */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">
                    service (<span className="text-purple-400">*</span>)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-t-0 border-l-0 border-r-0 rounded-none border-b-primary-foreground/20 bg-inherit focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-none focus:ring-0">
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">message</FormLabel>
                  <FormControl>
                    <Textarea
                      cols={5}
                      rows={5}
                      className="border-t-0 border-l-0 border-r-0 rounded-none resize-none border-b-primary-foreground/20 bg-inherit focus-visible:ring-0"
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              variant="outline"
              className="w-full text-sm bg-inherit font-extralight tracking-widest dark:text-white border-[1px] border-primary-foreground/20 rounded-sm 
                hover:bg-purple-500/20 hover:transition-all hover:duration-250 shadow-sm shadow-black hover:bg-opacity-20"
              type="submit"
            >
              send
            </Button>
          </form>
        </Form>
      </SectionLayout>
    </>
  );
}

export default Contact;

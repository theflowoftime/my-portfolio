import useContact from "@/hooks/useContact";
import SectionLayout from "@/layouts/section-layout";

import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import Marquee from "@/hooks/useMarquee";
import { Toaster } from "./ui/toaster";
import { ContactForm } from "./sub-components/contact/form";
import ScheduleMeeting from "./sub-components/contact/meeting-scheduling";

function Contact() {
  const { data: contactData, isLoading, isError } = useContact();
  const { navLinks } = useCachedNavLinks();
  const slug = navLinks?.links?.[3].slug || "contact";

  if (isLoading || !contactData) return <SectionLayout slug={slug} />;
  if (isError) return <SectionLayout slug={slug}>Oops error..</SectionLayout>;

  return (
    <div className="overflow-x-hidden">
      <Marquee contactData={contactData} />
      <SectionLayout slug={slug}>
        <div className="flex flex-col justify-center h-full overflow-hidden gap-y-4">
          <div className="">
            <div className="px-0 rounded-lg shadow-sm lg:px-32 md:px-8 dark:shadow-black">
              <ContactForm contactData={contactData} />
              <ScheduleMeeting />
            </div>
          </div>
        </div>
        <Toaster />
      </SectionLayout>
    </div>
  );
}

export default Contact;

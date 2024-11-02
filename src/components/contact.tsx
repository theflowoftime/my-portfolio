import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";

function Contact() {
  const { navLinks } = useCachedNavLinks();

  const worksSlug = navLinks?.links?.[3].slug || "contact";

  return (
    <div className="min-h-screen container" id={worksSlug}>
      Contact
    </div>
  );
}

export default Contact;

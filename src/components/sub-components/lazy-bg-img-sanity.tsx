import { cn, urlFor } from "@/lib/utils";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion } from "framer-motion";
import { ComponentProps, useEffect, useState } from "react";

const LazyBackground = ({
  className,
  image,
  children,
  size = "lg",
}: ComponentProps<"div"> & {
  image: SanityImageSource;
  size?: "sm" | "md" | "lg";
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = urlFor(image).width(1920).quality(40).auto("format").url();
    img.onload = () => setLoaded(true);
  }, [image]);

  const placeholderImage = urlFor(image)
    .size(50, 50)
    .blur(20)
    .auto("format")
    .url();

  const images = {
    sm: urlFor(image).width(640).quality(80).auto("format").url(),
    md: urlFor(image).width(1024).quality(80).auto("format").url(),
    lg: urlFor(image).fit("max").quality(100).auto("format").url(),
  };

  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 1.05 }} // Start with slightly zoomed and dim
      animate={{ opacity: loaded ? 1 : 0.5, scale: loaded ? 1 : 1.05 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("select-none", className)}
      style={{
        // dark:shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)]
        // --background-image: `var(--background-image)`,
        backgroundImage: `url(${loaded ? images[size] : placeholderImage})`,
      }}
    >
      {children}
    </motion.div>
  );
};

export default LazyBackground;

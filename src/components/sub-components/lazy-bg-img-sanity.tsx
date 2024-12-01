import { cn, urlFor } from "@/lib/utils";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion } from "framer-motion";
import { ComponentProps, useEffect, useState } from "react";

const LazyBackground = ({
  className,
  image,
  size = "lg",
}: ComponentProps<"div"> & {
  image: SanityImageSource;
  size?: "sm" | "md" | "lg";
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = urlFor(image).width(1920).quality(80).format("webp").url();
    img.onload = () => setLoaded(true);
  }, [image]);

  const placeholderImage = urlFor(image).width(50).height(50).blur(20).url();

  const images = {
    sm: urlFor(image).width(640).quality(80).format("webp").url(),
    md: urlFor(image).width(1024).quality(80).format("webp").url(),
    lg: urlFor(image).width(1920).quality(80).format("webp").url(),
  };

  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 1.05 }} // Start with slightly zoomed and dim
      animate={{ opacity: loaded ? 1 : 0.5, scale: loaded ? 1 : 1.05 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "bg-cover bg-center bg-no-repeat h-full dark:shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)]  select-none",
        className
      )}
      style={{
        // --background-image: `var(--background-image)`,
        backgroundImage: `url(${loaded ? images[size] : placeholderImage})`,
      }}
    />
  );
};

export default LazyBackground;

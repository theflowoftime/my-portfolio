import { cn, urlFor } from "@/lib/utils";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ComponentProps, useEffect, useState } from "react";
import { motion } from "framer-motion";

const LazyBackground = ({
  className,
  image,
  size = "lg",
  title,
}: ComponentProps<"div"> & {
  image: SanityImageSource;
  size?: "sm" | "md" | "lg";
  title?: string;
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
        "bg-cover bg-center bg-no-repeat dark:shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] flex items-center justify-center h-full select-none rounded-[1.8rem]",
        className
      )}
      style={{
        // --background-image: `var(--background-image)`,
        backgroundImage: `url(${loaded ? images[size] : placeholderImage})`,
      }}
    >
      {title ? (
        <span className="text-center text-white/80 text-effect text-[4rem] font-semibold">
          {title}
        </span>
      ) : null}
    </motion.div>
  );
};

export default LazyBackground;

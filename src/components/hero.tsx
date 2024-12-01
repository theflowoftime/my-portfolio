import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";
import { waterFall } from "@/lib/framer-variants";
import { Link } from "react-router-dom";
import { ChevronsDown } from "lucide-react";
import useNavLinks from "@/hooks/useNavLinks";
import useHero from "@/hooks/useHero";
import { cn } from "@/lib/utils";
import React from "react";

const heroDatax = {
  MainTexLines: [
    {
      line: { sentence: "I'm Yacine", highlight: [1] },
      img: { position: 2, image: "/me.png", altText: "me" },
    },
    {
      line: { sentence: "Product Developer", highlight: [1] },
      img: { position: 1, image: "/product.jpg", altText: "Product icon" },
    },
    {
      line: { sentence: "based in Tunis", highlight: null },
      img: { position: 3, image: "/tunis.jpg", altText: "Tunis landscape" },
    },
  ],
  secondaryText:
    "I have 5 years of experience working on useful and mindful\nproducts together with startups and established brands",
  buttonText: "Explore",
};

const avatarSizeRem = { w: 5, h: 4.62 };
const { w, h } = avatarSizeRem;
const twImgSize = `w-[${w}rem] h-[${h}rem]`; // This is for consistency in image size
const PX_REM_ratio = 16;

function Hero() {
  const { data: heroData, isLoading } = useHero();
  const { data: navLinks } = useNavLinks();

  if (isLoading)
    return (
      <div className="relative flex flex-col items-center justify-around h-full min-h-[calc(100vh-4.56rem)] dark:mix-blend-lighten mix-blend-darken" />
    );

  // Function to create dynamic mask based on index and image width
  const generateMask = (
    wordIndex: number,
    isImage: boolean = false,
    lineIndex: number
  ) => {
    const numWords = heroDatax.MainTexLines.length;

    // Image width in pixels (5rem = 80px), using the 5rem as base image size
    const imageWidthPx = avatarSizeRem.w * PX_REM_ratio;

    // If it's an image, we adjust the offset by image width in pixels
    const offset = (wordIndex / numWords) * 100 + (isImage ? imageWidthPx : 0);

    // Dimming effect: The further the element from the light source, the darker it becomes
    const baseOpacity = 1 - Math.min(offset / 100, 1); // Opacity decreases as distance increases

    // Dimming based on line index (lower lines = dimmer)
    const lineDimming = 1 - 0.1 * lineIndex; // Each line gets progressively dimmer
    const opacity = Math.max(baseOpacity * lineDimming, 0.2); // Ensure opacity never goes below 0.2 for readability

    // Generate the radial gradient with the adjusted opacity
    return `radial-gradient(150% 150% at ${offset}% 100%, rgba(0, 0, 0, ${opacity}) 0%, rgba(0, 0, 0, 1) 100%) add`;
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={waterFall}
      className="relative flex flex-col items-center justify-around h-full min-h-[calc(100vh-4.56rem)] dark:mix-blend-lighten mix-blend-darken"
    >
      <motion.div className="container h-full space-y-4 text-center dark:text-white">
        {/* Title Section */}
        <motion.div className="leading-[6.33rem] font-instrument text-[4rem] lg:text-[5.11rem] -tracking-[0.17rem]">
          {heroDatax.MainTexLines.map((item, lineIndex) => {
            const words = item.line.sentence.split(" ");
            const sentenceWithImage = words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                {wordIndex === item.img.position && (
                  <Avatar
                    className={cn(
                      "border-4 dark:border-white border-black hidden sm:inline-block min-w-min min-h-min w-[5rem] h-[4.62rem] shadow-md bg-black",
                      twImgSize
                    )}
                    style={{
                      mask: generateMask(wordIndex, true, lineIndex), // Apply mask to the image as well
                      WebkitMask: generateMask(wordIndex, true, lineIndex), // Cross-browser support
                    }}
                  >
                    <AvatarImage
                      className="object-cover"
                      src={item.img.image}
                      alt={item.img.altText}
                    />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                )}
                <span
                  className={cn(
                    item.line.highlight?.includes(wordIndex) &&
                      "text-effect mix-blend-lighten"
                  )}
                  style={{
                    mask: generateMask(wordIndex, false, lineIndex), // Apply dynamic mask for each word
                    WebkitMask: generateMask(wordIndex, false, lineIndex), // Cross-browser support
                  }}
                >
                  {word}{" "}
                </span>
              </React.Fragment>
            ));

            // Check if image is at the end of the sentence (position > number of words)
            if (item.img.position >= words.length) {
              sentenceWithImage.push(
                <Avatar
                  key="end-image"
                  className={cn(
                    "border-4 dark:border-white border-black hidden sm:inline-block min-w-min min-h-min shadow-md bg-black",
                    twImgSize
                  )}
                  style={{
                    mask: generateMask(words.length, true, lineIndex), // Apply mask to image at the end
                    WebkitMask: generateMask(words.length, true, lineIndex), // Cross-browser support
                  }}
                >
                  <AvatarImage
                    className="object-cover"
                    src={item.img.image}
                    alt={item.img.altText}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              );
            }

            return (
              <motion.p
                key={lineIndex}
                variants={waterFall}
                className="flex items-center justify-center gap-x-4 whitespace-nowrap"
              >
                {sentenceWithImage}
              </motion.p>
            );
          })}
        </motion.div>

        {/* Description Section */}
        <motion.p
          variants={waterFall}
          className="tracking-tight text-balance dark:text-white/60"
        >
          {heroDatax.secondaryText}
        </motion.p>
      </motion.div>

      {/* scroll to projects Section */}
      <motion.div variants={waterFall}>
        <Link
          state={{ data: navLinks }}
          to={`${navLinks?.links?.[2]?.path || "#works"}`}
        >
          <div className="flex flex-col items-center">
            <ChevronsDown
              className="bg-white rounded-full dark:bg-black dark:text-white backdrop-blur-xl backdrop-filter bg-opacity-10 dark:bg-opacity-10 animate-bounce"
              size={72}
              strokeWidth={1}
            />
            <span className="text-xs dark:text-white animate-pulse opacity-20 font-unbounded">
              {heroDatax.buttonText}
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Hero;

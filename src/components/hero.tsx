import useHero from "@/hooks/useHero";
import { waterFall } from "@/lib/framer-variants";
import { cn, urlFor } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HERO_AVATAR_SIZES, PX_REM_ratio } from "@/lib/constants";
import { useCachedNavLinks } from "@/hooks/useCachedNavLinks";
import { useCursorStore } from "@/stores/cursor-store";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { useLanguageStore } from "@/stores/language-store";

function Hero() {
  const { data: heroData, isLoading } = useHero();
  const { navLinks } = useCachedNavLinks();
  const animateCursor = useCursorStore((state) => state.animateCursor);
  const language = useLanguageStore((state) => state.language);

  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  if (isLoading || !heroData)
    return (
      <div className="relative flex flex-col items-center justify-around h-full min-h-[calc(100vh-4.56rem)] dark:mix-blend-lighten mix-blend-darken" />
    );

  // const [w, h] = heroData.avatarSize || HERO_AVATAR_SIZES;
  const [w, h] = HERO_AVATAR_SIZES;
  const twImgSize = `w-[${w / PX_REM_ratio}rem] h-[${h / PX_REM_ratio}rem]`;

  console.log({ w, h });

  // Function to create dynamic mask based on index and image width
  const generateMask = (
    wordIndex: number,
    isImage: boolean = false,
    lineIndex: number
  ) => {
    const numWords = heroData.mainTextLines.length;

    // Image width in pixels
    const imageWidthPx = w;

    // If it's an image, we adjust the offset by image width in pixels
    const offset = (wordIndex / numWords) * 100 + (isImage ? imageWidthPx : 0);

    // Dimming effect: The further the element from the light source, the darker it becomes
    const baseOpacity = 1 - Math.min(offset / 100, 1); // Opacity decreases as distance increases

    // Dimming based on line index (lower lines = dimmer)
    const lineDimming = 1 - 0.1 * lineIndex; // Each line gets progressively dimmer
    const opacity = Math.max(baseOpacity * lineDimming, 0.4); // Ensure opacity never goes below 0.4 for readability

    // Generate the radial gradient with the adjusted opacity
    return `radial-gradient(150% 150% at ${offset}% 100%, rgba(0, 0, 0, ${opacity}) 0%, rgba(0, 0, 0, 1) 100%) add`;
  };

  return (
    <motion.div
      id="hero"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={waterFall}
      className="relative flex flex-col items-center justify-around h-full min-h-screen overflow-hidden"
    >
      <motion.div className="container h-full text-center dark:text-white">
        {/* Title Section */}
        <motion.div
          className={cn(
            "font-instrument text-[4rem] lg:text-[5.25rem] rounded-full flex flex-col leading-tight items-center",
            language === "AR" && "lg:text-[4.5rem] text-[3.25rem] font-baloo"
          )}
        >
          {heroData.mainTextLines.map((item, lineIndex) => {
            const words = item.line.text.split(" ");
            if (lineIndex === 0 && item.line.img.position < words.length)
              words.push(",");
            const textWithImage = words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                {wordIndex === item.line.img.position && (
                  <Avatar
                    className={cn(
                      "border-4 dark:border-white border-black hidden sm:inline-block  w-[6rem] h-[4.5rem] bg-black"
                      // twImgSize
                    )}
                    style={{
                      mask: generateMask(wordIndex, true, lineIndex), // Apply mask to the image as well
                      WebkitMask: generateMask(wordIndex, true, lineIndex), // Cross-browser support
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                  >
                    <Carousel
                      plugins={[plugin.current]}
                      opts={{
                        loop: true,
                        align: "start",
                        axis: "y",
                        containScroll: "trimSnaps",
                        skipSnaps: true,
                      }}
                      orientation="vertical"
                      onMouseEnter={plugin.current.stop}
                      onMouseLeave={() => plugin.current.play()}
                    >
                      <CarouselContent className={`h-[4.5rem]`}>
                        {item.line.img.images?.map((image, index) => (
                          <CarouselItem
                            className={`p-0 m-0 cursor-grab`}
                            key={index}
                          >
                            <AvatarImage
                              className="object-contain w-full h-full overflow-hidden"
                              src={urlFor(image)
                                .fit("max")
                                .quality(80)
                                .auto("format")
                                .url()}
                              alt={item.line.img.altText}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>

                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                )}

                {item.line.highlight?.includes(wordIndex) ? (
                  <em
                    className="italic dark:text-white/50 text-black/50 "
                    // style={{
                    //   mask: generateMask(wordIndex, false, lineIndex), // Apply dynamic mask for each word
                    //   WebkitMask: generateMask(wordIndex, false, lineIndex), // Cross-browser support
                    // }}
                  >
                    {word}{" "}
                  </em>
                ) : (
                  <span
                    style={{
                      mask: generateMask(wordIndex, false, lineIndex), // Apply dynamic mask for each word
                      WebkitMask: generateMask(wordIndex, false, lineIndex), // Cross-browser support
                    }}
                  >
                    {word}{" "}
                  </span>
                )}
              </React.Fragment>
            ));

            // Check if image is at the end of the text (position > number of words)
            if (item.line.img.position >= words.length) {
              textWithImage.push(
                <Avatar
                  key="end-image"
                  className={cn(
                    "border-4 dark:border-white border-black hidden sm:inline-block w-[6rem] h-[4.5rem]  bg-black"
                    // twImgSize
                  )}
                  style={{
                    mask: generateMask(words.length, true, lineIndex), // Apply mask to image at the end
                    WebkitMask: generateMask(words.length, true, lineIndex), // Cross-browser support
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <AvatarImage
                    className={cn(lineIndex === 0 && "object-contain")}
                    src={urlFor(item.line.img.images?.[0])
                      .fit("fillmax")
                      .quality(80)
                      .auto("format")
                      .url()}
                    alt={item.line.img.altText}
                  />
                  <AvatarFallback>
                    {/* <AvatarImage
                      className=""
                      src={urlFor(item.line.img.image)
                        .fit("max")
                        .quality(80)
                        .format("jpg")
                        .url()}
                      alt={item.line.img.altText}
                    /> */}
                  </AvatarFallback>
                </Avatar>
              );
            }

            return (
              <motion.p
                key={lineIndex}
                variants={waterFall}
                className={cn(
                  "flex items-center justify-center rounded-lg  gap-x-4 whitespace-nowrap"
                )}
                // style={{
                //   // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                //   boxShadow:
                //     // "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                //     "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                // }}
              >
                {lineIndex === 0 ? (
                  <span className="">
                    {textWithImage}
                    <span>
                      {lineIndex === 0 && item.line.img.position >= words.length
                        ? ","
                        : ""}
                    </span>
                  </span>
                ) : (
                  textWithImage
                )}
              </motion.p>
            );
          })}
        </motion.div>

        {/* Description Section */}
        <motion.p
          variants={waterFall}
          className={cn(
            "break-words whitespace-pre mx-auto  text-[1rem] text-balance dark:text-white/60 text-black/40 text-opacity-40 -tracking-[0.03] leading-[27.3px] font-mono text-center",
            language === "AR" && "text-lg font-baloo tracking-[0.125em]"
          )}
        >
          {heroData.secondaryText}
        </motion.p>
      </motion.div>

      {/* scroll to projects Section */}
      <motion.div variants={waterFall}>
        <Link
          state={{ data: navLinks }}
          to={`${navLinks?.links?.[2]?.path || "#works"}`}
        >
          <div
            onMouseEnter={() => animateCursor("buttonHover")}
            onMouseLeave={() => animateCursor("cursorEnter")}
            className="flex flex-col items-center"
          >
            <ChevronsDown
              className="transition-all ease-in bg-white rounded-full opacity-40 hover:opacity-100 dark:bg-black dark:text-white backdrop-blur-xl backdrop-filter bg-opacity-10 dark:bg-opacity-10 animate-bounce"
              size={60}
              strokeWidth={1}
            />
            {/* <span
              className={cn(
                "text-xs dark:text-white animate-pulse opacity-20 font-unbounded",
                language === "AR" && "font-baloo"
              )}
            >
              {heroData.buttonText}
            </span> */}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Hero;

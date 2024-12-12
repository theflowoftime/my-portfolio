import useHero from "@/hooks/useHero";
import { waterFall } from "@/lib/framer-variants";
import { cn, urlFor } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { HERO_AVATAR_SIZES } from "@/lib/constants";
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
  const [areFontsLoaded, setAreFontsLoaded] = useState(false);

  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!document.fonts) {
      setAreFontsLoaded(true); // Fallback for unsupported browsers
      return;
    }

    if (document.fonts.status === "loaded") {
      setAreFontsLoaded(true); // Fonts already loaded
      return;
    }

    const handleLoadingDone = () => {
      setAreFontsLoaded(true);
    };

    document.fonts.addEventListener("loadingdone", handleLoadingDone);

    return () => {
      document.fonts.removeEventListener("loadingdone", handleLoadingDone);
    };
  }, []);

  if (isLoading || !heroData || !areFontsLoaded)
    return (
      <div className="relative flex flex-col items-center justify-around h-full min-h-[calc(100vh-4.56rem)] dark:mix-blend-lighten mix-blend-darken" />
    );

  const [w, h] = heroData.avatarSize || HERO_AVATAR_SIZES;

  const generateMask = (
    wordIndex: number,
    isImage: boolean = false,
    lineIndex: number
  ) => {
    const numWords = heroData.mainTextLines.length;
    const imageWidthPx = w;
    const offset = (wordIndex / numWords) * 100 + (isImage ? imageWidthPx : 0);
    const baseOpacity = 1 - Math.min(offset / 100, 1);
    const lineDimming = 1 - 0.1 * lineIndex;
    const opacity = Math.max(baseOpacity * lineDimming, 0.4);

    return `radial-gradient(150% 150% at ${offset}% 100%, rgba(0, 0, 0, ${opacity}) 0%, rgba(0, 0, 0, 1) 100%)`;
  };

  return (
    <motion.div
      id="hero"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={waterFall}
      className="relative flex flex-col justify-around h-full min-h-screen"
    >
      <motion.div className="container flex flex-col items-center h-full text-center dark:text-white">
        <motion.div
          className={cn(
            "font-instrument font-medium text-[4rem] lg:text-[5.35rem] flex flex-col items-center leading-tight  w-fit px-4",
            language === "AR" &&
              "lg:text-[5rem] text-[4.25rem] -tracking-[0.02em] font-baloo"
          )}
        >
          {heroData.mainTextLines.map((item, lineIndex) => {
            const words = item.line.text.split(" ");

            const textWithImage = words.map((word, wordIndex) => {
              if (lineIndex === 0 && item.line.img.position < words.length) {
                if (language === "AR" && wordIndex === 0) {
                  word = "," + word;
                } else if (
                  language !== "AR" &&
                  wordIndex === words.length - 1
                ) {
                  word += ",";
                }
              }

              return (
                <React.Fragment key={wordIndex}>
                  {wordIndex === item.line.img.position && (
                    <Avatar
                      className="hidden overflow-hidden bg-transparent border-4 border-black shadow-lg shadow-black dark:border-white sm:inline-block"
                      style={{
                        mask: generateMask(wordIndex, true, lineIndex),
                        WebkitMask: generateMask(wordIndex, true, lineIndex),
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        width: w,
                        height: h,
                      }}
                    >
                      {item.line.img.images.length > 1 ? (
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
                          <CarouselContent style={{ height: h }}>
                            {item.line.img.images?.map((image, index) => (
                              <CarouselItem
                                className={`p-0 m-0 cursor-grab`}
                                key={index}
                              >
                                <AvatarImage
                                  className="object-contain w-full h-full overflow-hidden bg-transparent"
                                  src={urlFor(image)
                                    .fit("max")
                                    .quality(100)
                                    .auto("format")
                                    .url()}
                                  alt={item.line.img.altText}
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>
                      ) : (
                        <AvatarImage
                          className="object-contain w-full h-full overflow-hidden"
                          src={urlFor(item.line.img.images?.[0])
                            .fit("max")
                            .quality(100)
                            .auto("format")
                            .url()}
                          alt={item.line.img.altText}
                        />
                      )}

                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  )}

                  {item.line.highlight?.includes(wordIndex) ? (
                    <em className="italic px-1.5 dark:text-white text-black -tracking-[0.04em] -z-10">
                      {word}
                    </em>
                  ) : (
                    <span
                      className="px-1.5"
                      style={{
                        mask: generateMask(wordIndex, false, lineIndex),
                        WebkitMask: generateMask(wordIndex, false, lineIndex),
                      }}
                    >
                      {word}
                    </span>
                  )}
                </React.Fragment>
              );
            });

            if (item.line.img.position >= words.length) {
              let comma = null;
              if (lineIndex === 0) {
                if (language === "AR") {
                  comma = <span className="order-1">,</span>;
                } else {
                  comma = <span className="order-2">,</span>;
                }
              }

              textWithImage.push(
                <div className="flex items-center">
                  <Avatar
                    key="end-image"
                    className="hidden bg-transparent border-4 border-black shadow-lg dark:border-white sm:inline-block shadow-black"
                    style={{
                      mask: generateMask(words.length, true, lineIndex),
                      WebkitMask: generateMask(words.length, true, lineIndex),
                      // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      width: w,
                      height: h,
                    }}
                  >
                    <AvatarImage
                      className={cn(lineIndex === 0 && "object-contain")}
                      src={urlFor(item.line.img.images?.[0])
                        .fit("max")
                        .quality(100)
                        .auto("format")
                        .url()}
                      alt={item.line.img.altText}
                    />

                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  {comma}
                </div>
              );
            }

            return (
              <motion.p
                key={lineIndex}
                variants={waterFall}
                className={cn(
                  "flex items-center justify-center rounded-lg gap-x-2 whitespace-nowrap w-full px-2 py-1"
                )}
              >
                {textWithImage}
              </motion.p>
            );
          })}
        </motion.div>

        <motion.p
          variants={waterFall}
          className={cn(
            "break-words whitespace-pre mx-auto  text-[1.05rem] text-balance dark:text-white/60 text-black/40 text-opacity-40 -tracking-[0.03] leading-[27.3px] font-mono text-center",
            language === "AR" && "text-lg font-baloo tracking-[0.125em]"
          )}
        >
          {heroData.secondaryText}
        </motion.p>
      </motion.div>

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
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Hero;

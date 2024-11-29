import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";
import { waterFall } from "@/lib/framer-variants";
import { Link } from "react-router-dom";
import { ChevronsDown } from "lucide-react";
import useNavLinks from "@/hooks/useNavLinks";
import useHero from "@/hooks/useHero";
import React from "react";
import { cn } from "@/lib/utils";

const heroTexts = [
  {
    line: { sentence: "I'm Yacine", highlight: [1] }, // Highlight "Yacine"
    img: { position: 2, image: "/me.png", altText: "me" }, // Image after "Yacine"
  },
  {
    line: { sentence: "Product Developer", highlight: [1] }, // Highlight "Developer"
    img: { position: 1, image: "/product.jpg", altText: "Product icon" }, // Image after "Product"
  },
  {
    line: { sentence: "based in Tunis", highlight: null }, // No highlight
    img: { position: 3, image: "/tunis.jpg", altText: "Tunis landscape" }, // Image at the end
  },
];

const heroSubText =
  "I have 5 years of experience working on useful and mindful\nproducts together with startups and established brands";

const exploreText = "Explore";

function Hero() {
  const { data: heroData, isLoading } = useHero();
  const { data: navLinks } = useNavLinks();

  if (isLoading)
    return (
      <div className="relative flex flex-col items-center justify-around h-full min-h-[calc(100vh-4.56rem)] dark:mix-blend-lighten mix-blend-darken" />
    );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={waterFall}
      className="relative flex flex-col items-center justify-around h-full min-h-[calc(100vh-4.56rem)] dark:mix-blend-lighten mix-blend-darken"
    >
      <motion.div className="container h-full space-y-4 text-center dark:text-white">
        {/** Title Section */}
        <motion.div className="leading-[6.33rem] font-instrument text-[4rem] lg:text-[5.11rem] -tracking-[0.17rem]">
          {heroTexts.map((item, index) => {
            const words = item.line.sentence.split(" ");
            const sentenceWithImage = words.map((word, i) => (
              <React.Fragment key={i}>
                {i === item.img.position && (
                  <Avatar className="border-4 dark:border-white border-black hidden sm:inline-block min-w-min min-h-min w-[5rem] h-[4.62rem] shadow-md bg-black">
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
                    item.line.highlight?.includes(i) &&
                      "text-effect opacity-80 mix-blend-lighten"
                  )}
                >
                  {word}{" "}
                </span>
              </React.Fragment>
            ));

            if (item.img.position > words.length - 1) {
              sentenceWithImage.push(
                <Avatar
                  key="end-image"
                  className="border-4 dark:border-white border-black hidden sm:inline-block min-w-min min-h-min w-[5rem] h-[4.62rem] shadow-md bg-black"
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
                key={index}
                variants={waterFall}
                className="flex items-center justify-center gap-x-4 whitespace-nowrap"
              >
                {sentenceWithImage}
              </motion.p>
            );
          })}
        </motion.div>
        {/** Description Section */}
        <motion.p
          variants={waterFall}
          className="tracking-tight text-balance dark:text-white/60"
        >
          {heroSubText}
        </motion.p>
      </motion.div>
      {/** Call-to-action Section */}
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
              {exploreText}
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Hero;

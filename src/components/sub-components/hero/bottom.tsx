import { Hero } from "@/types/types";
import { RefObject } from "react";
import { motion } from "framer-motion";
import { waterFall } from "@/lib/framer-variants";

export default function Quotes({
  heroData,
  scrollRef,
}: {
  heroData: Hero;
  scrollRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={scrollRef}
      className="container flex justify-center w-full mt-[7rem] dark:text-white mb-4"
    >
      {heroData?.quotes.map((_quote, idx) => (
        <motion.div
          className="px-2 w-[80%] max-w-full text-center flex flex-col"
          key={_quote._key}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, root: scrollRef }}
          variants={waterFall}
          custom={idx * 0.2 + 1.0} // Staggered delay for each quote
        >
          <motion.q
            className="text-2xl py-8 px-4 relative text-white
                       before:absolute before:content-['“'] after:content-['“'] before:text-6xl after:text-6xl before:text-gray-400 
                       motion-safe:before:animate-in before:duration-300 
                     after:text-gray-400  after:absolute before:-top-4 before:left-4 after:-bottom-4 after:right-4 
                       before:h-8 after:h-8
                       bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10
                       shadow-sm shadow-black rounded-md z-10
                       "
          >
            {_quote.quote}
          </motion.q>
          <motion.p className="self-end px-4 py-8 text-xl text-white bg-white rounded-md shadow-sm bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-black">
            — {_quote.author}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}

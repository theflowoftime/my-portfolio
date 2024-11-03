import { useMemo } from "react";
import { Button } from "./ui/button";
import LogoHero from "./ui/icons/Logo-Hero";
import { animate, motion } from "framer-motion";

const FIRSTNAME = "Yacine";
const JOBS = ["web designer", "full-stack developer"];
const BIO = "He crafts responsive websites where technologies meet creativity";
const CURRENT_PROJECT = "Portfolio"; // max characters
const QUOTES = [
  { author: "Dr. Who", quote: "With great power comes great electricity bill" },
];
const SHAPE = "•";

const getRandomOffset = (maxOffset: number) => {
  return {
    x: Math.floor(Math.random() * maxOffset * 2) - maxOffset,
    y: Math.floor(Math.random() * maxOffset * 2) - maxOffset,
  };
};

const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFA533"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomRotation = () => Math.floor(Math.random() * 360); // Random rotation for each item

const Matrix = ({ rows, columns }: { rows: number; columns: number }) => {
  const initialPositions = useMemo(
    () => Array.from({ length: rows * columns }, () => getRandomOffset(1000)),
    [rows, columns]
  );

  const colors = useMemo(
    () => Array.from({ length: rows * columns }, () => getRandomColor()),
    [rows, columns]
  );

  const rotations = useMemo(
    () => Array.from({ length: rows * columns }, () => getRandomRotation()),
    [rows, columns]
  );

  const matrixAnimation = {
    hidden: (index: number) => ({
      opacity: 0,
      x: initialPositions[index].x,
      y: initialPositions[index].y,
      color: colors[index], // Start with random color
      scaleX: 4, // Start stretched in x-axis to form a "line"
      rotate: rotations[index], // Random initial rotation for each line
    }),
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      color: "#FFFFFF", // Target color transition
      scaleX: 1, // Shrink back to original scale (point)
      rotate: 0, // Rotate back to 0 for alignment
      transition: {
        duration: 1.5,
        delay: index * 0.05,
        color: { duration: 1.5 }, // Smooth color transition
      },
    }),
  };

  return (
    <div
      className="grid gap-5 w-[5.25rem] h-[5.25rem] absolute bottom-12 right-10"
      style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
    >
      {Array.from({ length: rows * columns }).map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          className="flex justify-center items-center w-1 h-1 rounded-full text-primary-foreground dark:text-white text-opacity-70"
          style={{
            textShadow: "0px 0px 8px rgba(255,255,255,0.7)", // Glow effect for "light trail" look
            fontSize: "1.5rem", // Increase size slightly for visibility
          }}
          variants={matrixAnimation}
          initial="hidden"
          animate="visible"
        >
          {SHAPE}
        </motion.div>
      ))}
    </div>
  );
};

function Hero() {
  return (
    <div className="flex flex-col mb-0 relative overflow-hidden">
      <div className="md:block hidden absolute bottom-20 right-0 border-[1px] border-r-0 border-gray-500 h-[5.69rem] w-[5.69rem]" />
      <div className="flex gap-x-2 mt-4 container lg:flex-row flex-col lg:gap-y-4 items-center">
        <motion.div
          className="lg:w-1/2 space-y-8 dark:text-white pt-16 lg:mt-[3.5rem] text-center lg:text-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 2.7, duration: 0.6 },
            },
          }}
        >
          <h3 className="text-[2rem] leading-[3rem] tracking-normal">
            Yacine is a
            <span className="text-primary-foreground"> web designer</span> and{" "}
            <span className="text-primary-foreground">
              full-stack developer
            </span>
          </h3>
          <p className="text-foreground leading-[1.5625rem] text-[1rem] font-normal">
            He crafts responsive websites where technologies meet creativity
          </p>
          <motion.circle
            enableBackground="#3357FF"
            cx={500}
            animate={{ cx: [null, 100, 200] }}
            transition={{ duration: 3, times: [0, 0.2, 1] }}
          />

          <Button className="lg:block hidden text-white border-[1px] font-medium border-purple-400 hover:bg-purple-500/20 hover:transition-all hover:duration-500">
            Contact me !!
          </Button>
        </motion.div>

        <motion.div
          className="flex flex-col mt-[3.13rem]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.2 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 1.2, ease: "easeInOut" },
            },
          }}
        >
          <div className="relative">
            <LogoHero className="absolute top-[25%] -z-10" />
            <Matrix rows={5} columns={5} />
            <img
              className="h-auto max-w-full mx-auto"
              src={"/hero.png"}
              alt="hero"
            />
          </div>
          <div className="border-[1px] border-gray-500 flex items-center gap-x-2 px-2 leading-[2rem] mr-4 ml-6 tracking-wider font-normal w-[25rem]">
            <div className="h-4 w-4 bg-purple-400 inline-block" />
            Currently working on{" "}
            <span className="dark:text-white">Portfolio...</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="container flex justify-center w-full mt-[7rem] dark:text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <div className="px-2 w-[80%] max-w-full text-center flex flex-col">
          <q
            className="text-2xl py-8 px-4 border border-gray-500 relative 
        before:content-['“'] after:content-['“'] before:text-6xl after:text-6xl before:text-gray-400 
          after:text-gray-400 before:absolute after:absolute before:-top-4 before:left-4 after:-bottom-4 after:right-4 
        dark:before:bg-primary dark:after:bg-primary before:bg-background after:bg-background before:h-8 after:h-8"
          >
            With great power comes great electricity bill
          </q>
          <p className="text-xl py-8 px-4 border border-t-0 self-end border-gray-500">
            — Dr. Who
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;

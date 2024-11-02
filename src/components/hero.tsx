import { Button } from "./ui/button";
import LogoHero from "./ui/icons/Logo-Hero";

const SHAPE = "•";
const FIRSTNAME = "Yacine";
const JOBS = ["web designer", "full-stack developer"];
const BIO = "He crafts responsive websites where technologies meet creativity";
const CURRENT_PROJECT = "Portfolio"; // max characters
const QUOTES = [
  { author: "Dr. Who", quote: "With great power comes great electricity bill" },
];

const Matrix = ({ rows, columns }: { rows: number; columns: number }) => {
  return (
    <div
      className="grid gap-5 w-[5.25rem] h-[5.25rem] absolute bottom-12 right-10"
      style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
    >
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: columns }).map((_, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="flex justify-center items-center w-1 h-1 border rounded-full text-primary-foreground dark:text-white"
          >
            {SHAPE}
          </div>
        ))
      )}
    </div>
  );
};

function Hero() {
  return (
    <div className="flex flex-col mb-0 relative">
      {/* rectangle */}
      <div className="md:block hidden absolute bottom-20 right-0 border-[1px] border-r-0 border-gray-500 h-[5.69rem] w-[5.69rem]" />
      <div className="flex gap-x-2 mt-4 container lg:flex-row flex-col lg:gap-y-4 items-center">
        {/* First div taking 50% width */}
        <div className="lg:w-1/2 space-y-8 dark:text-white pt-16 lg:mt-[3.5rem] text-center lg:text-start">
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
          <Button className="lg:block hidden text-white border-[1px] font-medium border-purple-400 hover:bg-purple-500/20 hover:transition-all hover:duration-500">
            Contact me !!
          </Button>
        </div>

        {/* Second div taking 50% width */}
        <div className="flex flex-col mt-[3.13rem]">
          <div className=" relative">
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
        </div>
      </div>

      <div className="container flex justify-center w-full mt-[7rem] dark:text-white">
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
      </div>
    </div>
  );
}

export default Hero;

import { Button } from "./ui/button";
import heroUrl from "@/assets/hero.png";

function Hero() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex gap-x-2 mt-4">
        {/* First div taking 50% width */}
        <div className="w-1/2 space-y-8 dark:text-white pt-16 mt-[3.5rem]">
          <h3 className="text-[2rem] leading-[3rem] tracking-normal">
            Yacine is a
            <span className="text-primary-foreground"> web designer</span> and{" "}
            <span className="text-primary-foreground">
              full-stack developer
            </span>
          </h3>
          <p className="text-foreground leading-[1.5625rem] text-[1rem] w-[28.94rem] font-normal">
            He crafts responsive websites where technologies meet creativity
          </p>
          <Button className="text-white border-[1px] font-medium border-gray-500">
            Contact me !!
          </Button>
        </div>

        {/* Second div taking 50% width */}
        <div className="w-[29rem] flex flex-col mt-[3.13rem]">
          <div className="w-[29.31rem]">
            <img
              className="h-auto max-w-full mx-auto"
              src={heroUrl}
              alt="hero"
            />
          </div>
          <p className="border-[1px] border-gray-500 flex items-center gap-x-2 px-2 leading-[2rem] mr-4 ml-6 tracking-wider font-normal w-[25rem]">
            <div className="h-4 w-4 bg-purple-400 inline-block" />
            Currently working on{" "}
            <span className="text-white ">Portfolio...</span>
          </p>
        </div>
      </div>

      {/* Third div taking full width, centered */}
      <div className="flex justify-center w-full mt-[7rem] dark:text-white">
        <div className=" px-2 w-[80%] max-w-full text-center flex flex-col ">
          <q className="text-2xl py-8 border-[1px] border-gray-500 ">
            With great power comes great electricity bill
          </q>
          <p className="py-4 px-2 border-[1px] border-t-0 self-end border-gray-500">
            — Dr. Who
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;

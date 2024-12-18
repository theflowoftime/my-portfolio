import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, combineAndFormat } from "@/lib/utils";
import { motion } from "framer-motion";
import { CopyCheckIcon, Link, LucideCopy } from "lucide-react";
import {
  ComponentProps,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type SuccessMeetingProps = {
  join_url: string;
  start_time: Date;
  password: string;
  email: string;
  time: string;
};

const successMessage = "success";

export function SuccessMeetingScheduling({
  className: containerClassName,
  join_url,
  start_time,
  password,
  email,
  time,
  ...props
}: SuccessMeetingProps & ComponentProps<"div">) {
  const linkTextElRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn(
        "group flex justify-center py-24 font-unbounded",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 h-full w-full bg-gradient-to-r from-teal-300 to-green-500"
        )}
      />

      {/* Parent Container for message */}
      <div className="flex flex-col items-center h-64 max-w-lg gap-y-4">
        <div className="flex overflow-hidden bg-green-800 rounded-full h-14">
          {/* Checkmark */}

          {/* Expanding green box with sliding text */}
          <motion.div
            className="z-0 flex justify-center overflow-hidden bg-green-800 rounded-full gap-x-4"
            initial={{ width: "0rem" }}
            animate={{ width: "12rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.5 } }}
              className="z-10 flex flex-col items-center content-center justify-center w-4 text-3xl text-white bg-green-800 rounded-full"
            >
              {" "}
              {/* Adjusted size */}
              &#10003;
            </motion.div>
            <motion.div
              className="flex items-center text-lg text-white text-nowrap"
              initial={{ x: -1000, zIndex: -10 }}
              animate={{ x: 0, zIndex: 1 }}
              transition={{ duration: 1.0, delay: 0.3 }}
            >
              {successMessage}
            </motion.div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <CopyJoinUrl linkTextElRef={linkTextElRef} join_url={join_url} />
          <div className="w-full text-lg tracking-wide text-center text-black font-fira">
            <small>{combineAndFormat(start_time, time)}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyJoinUrl({
  linkTextElRef,
  join_url,
}: {
  linkTextElRef: RefObject<HTMLInputElement>;
  join_url: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (linkTextElRef.current) {
      console.log("Ref initialized:", linkTextElRef.current.value);
    }
  }, []);

  return (
    <motion.div
      className="relative flex h-fit w-[600px] max-w-lg overflow-hidden gap-x-2 items-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      {/* Message box */}
      <div className="flex w-full px-6 py-4 my-4 border rounded-lg shadow-lg gap-x-4 h-fit border-white/40 bg-white/30 bg-opacity-90 backdrop-blur-md">
        <div className="flex items-center justify-center h-12 text-white bg-green-800 rounded-full min-w-12">
          <Link />
        </div>
        <div className="flex items-center w-full text-gray-800">
          <TooltipProvider>
            <Tooltip open={isCopied}>
              <TooltipTrigger>
                <motion.div
                  className="max-w-[390px] truncate text-wrap font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 2, duration: 0.9 }}
                >
                  <motion.input
                    className="bg-transparent"
                    ref={linkTextElRef}
                    type="text"
                    value={join_url}
                    readOnly
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Your zoom join url</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CopyJoinUrlButton
              el={linkTextElRef.current}
              isCopied={isCopied}
              setIsCopied={setIsCopied}
            />
          </TooltipTrigger>
          <TooltipContent align="center">
            {!isCopied ? <p>Copy to clipboard</p> : <p>Copied!</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}

function CopyJoinUrlButton({
  el,
  isCopied,
  setIsCopied,
}: {
  el: HTMLInputElement | null;
  isCopied: boolean;
  setIsCopied: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = async () => {
    if (el) {
      try {
        await navigator.clipboard.writeText(el.value);
        setIsCopied(true);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    } else {
      console.error("Element reference is null.");
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      setIsCopied(false);
    }, 4000);

    return () => clearInterval(id);
  }, [isCopied]);

  return (
    <Button
      variant="ghost"
      className="p-4 bg-green-800 rounded-full h-fit"
      onClick={async () => await handleClick()}
    >
      {isCopied ? (
        <CopyCheckIcon />
      ) : (
        <LucideCopy className="w-full h-full stroke-white" />
      )}
    </Button>
  );
}

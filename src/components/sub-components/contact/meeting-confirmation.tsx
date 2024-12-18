import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, combineAndFormat } from "@/lib/utils";
import { MeetSchemaType } from "@/types/types";
import { motion } from "framer-motion";
import {
  Link as LucideLink,
  ExternalLink,
  LucideClipboardCopy,
  ClipboardCheck,
} from "lucide-react";
import {
  ComponentProps,
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { UseFormReturn } from "react-hook-form";
import { RessponseData } from "./form-meeting";

type SuccessMeetingProps = {
  form: UseFormReturn<MeetSchemaType>;
  generated: RessponseData;
};

const successMessage = "success"; // TODO: will be replaced to be dynamic

export function SuccessMeetingScheduling({
  className: containerClassName,
  form,
  generated,
  ...props
}: SuccessMeetingProps & ComponentProps<"div">) {
  const { date: start_time, platform, time } = form.getValues();
  const { link: join_url, password } = generated;

  return (
    <div
      className={cn(
        "group flex justify-center items-center py-8 font-unbounded",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute -z-10 inset-0 h-full w-full bg-gradient-to-r from-teal-300 to-green-500"
        )}
      />

      {/* Parent Container for message */}
      <div className="flex flex-col items-center max-w-lg gap-y-4">
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

        <motion.div className="flex flex-col items-center p-4 border-dashed border-input gap-y-2">
          <CopyJoinUrl join_url={join_url} platform={platform} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 2 }}
            className="w-full text-lg tracking-wide text-center text-black font-fira"
          >
            <small>{combineAndFormat(start_time, time)}</small>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function CopyJoinUrl({
  join_url,
  platform,
}: {
  join_url: string;
  platform: string;
}) {
  const linkTextElRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleOpenInNewTab = () => {
    const url = linkTextElRef.current?.value || join_url;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.error("Cannot open a null or undefined URL.");
    }
  };

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
          <LucideLink />
        </div>
        <div className="flex items-center w-full text-gray-800">
          <TooltipProvider>
            <Tooltip open={isCopied}>
              <TooltipTrigger>
                <motion.div
                  className="max-w-[390px] text-wrap font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 2, duration: 0.9 }}
                >
                  <Input
                    className="tracking-wide truncate bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    ref={linkTextElRef}
                    type="text"
                    value={join_url}
                    readOnly
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Your {platform} join url is copied!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CopyJoinUrlButton
              elRef={linkTextElRef}
              isCopied={isCopied}
              setIsCopied={setIsCopied}
            />
          </TooltipTrigger>
          <TooltipContent align="center">
            {!isCopied ? <p>Copy to clipboard</p> : <p>Copied!</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              className="p-4 text-white bg-green-800 rounded-full h-fit"
              onClick={handleOpenInNewTab}
            >
              <ExternalLink />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="center">Open Link</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}

function CopyJoinUrlButton({
  elRef,
  isCopied,
  setIsCopied,
}: {
  elRef: RefObject<HTMLInputElement>;
  isCopied: boolean;
  setIsCopied: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const el = elRef.current;
    if (el) {
      try {
        await navigator.clipboard.writeText(el.value);
        setIsCopied(true);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    } else {
      console.error("Element reference is null.");
    }
  };

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isCopied)
      id = setInterval(() => {
        setIsCopied(false);
      }, 4000);

    return () => {
      if (id) clearInterval(id);
    };
  }, [isCopied]);

  return (
    <Button
      variant="ghost"
      className="p-4 bg-green-800 rounded-full h-fit"
      onClick={async (e: MouseEvent<HTMLButtonElement>) => await handleClick(e)}
    >
      {isCopied ? (
        <ClipboardCheck />
      ) : (
        <LucideClipboardCopy className="stroke-white" />
      )}
    </Button>
  );
}

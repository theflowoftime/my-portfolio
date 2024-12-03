import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGradualReveal } from "@/hooks/useGradualReveal";
import Words from "./words";

export default function Introduction({ words }: { words: string[] }) {
  const targetRef = useRef<HTMLParagraphElement>(null);
  const [progression, setProgression] = useState<number>(0);

  useGradualReveal({ setProgression, targetRef });

  return (
    <motion.p
      ref={targetRef}
      className="text-balance text-[3.25rem] leading-loose"
    >
      <Words words={words} progression={progression} />
    </motion.p>
  );
}

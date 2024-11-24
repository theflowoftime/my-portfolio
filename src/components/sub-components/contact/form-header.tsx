import { waterFall } from "@/lib/framer-variants";
import type { Contact } from "@/types/types";
import { motion } from "framer-motion";

function ContactHeader({
  description,
}: {
  description: Contact["description"];
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={waterFall}
      custom={0.2} // Controls delay for paragraph fade-in
      className="mb-4 space-y-8"
    >
      <motion.h1
        custom={0.2}
        variants={waterFall}
        className="lg:text-[2.5rem] whitespace-nowrap dark:text-white md:text-[1.5em] text-4xl text-center text-pretty"
      >
        {description.title}
      </motion.h1>
      <motion.p
        custom={0.4}
        variants={waterFall}
        className="text-base italic text-pretty opacity-80"
      >
        {description.subtitle}
      </motion.p>
    </motion.div>
  );
}

export default ContactHeader;

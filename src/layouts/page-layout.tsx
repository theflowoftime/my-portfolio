import NavBar from "@/components/ui/custom/navbar";
import { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";

function PageTitle({ title }: { title: string }) {
  return (
    <motion.h3
      initial={{ opacity: 0, x: "-15%" }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ ease: "easeIn", duration: 0.6, delay: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      className="text-3xl font-medium"
    >
      <span
        className="dark:text-white relative ml-1 after:content-[''] after:block after:w-[2px] after:h-full after:rotate-12 
      after:mx-4 after:bg-purple-400 after:absolute after:top-1/2 after:left-full after:-translate-y-1/2"
      >
        {title}
      </span>
    </motion.h3>
  );
}

export default function PageLayout({
  children,
  title,
}: ComponentPropsWithoutRef<"div"> & { title: string }) {
  return (
    <div>
      <NavBar />
      <div className="container">
        <PageTitle title={title} />
        <div>{children}</div>
      </div>
    </div>
  );
}

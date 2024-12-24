"use client";
import { motion } from "framer-motion";
import Demo from "./(components)/Demo";
import FAQ from "./(components)/FAQ";
import Pricing from "./(components)/Pricing";
import Main from "./(components)/Main";
import ProblemSection from "@/app/(pages)/(main page)/(components)/Problem";
import SolutionSection from "@/app/(pages)/(main page)/(components)/Solution";

const LAMBDA_URL =
  process.env.NEXT_PUBLIC_LAMBDA_URL || "http://localhost:4000/";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <>
      <Main LAMBDA_URL={LAMBDA_URL} />
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <ProblemSection />
      </motion.div>
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <SolutionSection />
      </motion.div>
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Demo />
      </motion.div>
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <FAQ />
      </motion.div>
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <Pricing />
      </motion.div>
    </>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { faqs } from "@/data/faqs";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container-page">
        <SectionHeading
          label="FAQ"
          title="Common Questions"
          description="Answers to the questions I'm asked most often before starting a project."
        />
        <Reveal>
          <div className="mx-auto max-w-2xl divide-y divide-line overflow-hidden rounded-lg border border-line bg-panel">
            {faqs.map((faq, i) => {
              const open = openIndex === i;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${faq.id}`}
                    id={`faq-button-${faq.id}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-lime/5"
                  >
                    <span className="text-sm font-medium text-fg sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-lime transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-button-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-7 text-fgMuted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

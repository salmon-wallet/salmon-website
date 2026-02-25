'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export default function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) {
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, damping: 15, stiffness: 120, mass: 0.8 };

  return (
    <div className="border-b border-border-default">
      <button
        id={`faq-question-${index}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="group flex w-full items-center justify-between py-6 text-left cursor-pointer"
      >
        <h3 className="text-lg font-medium text-text-primary pr-4 transition-colors duration-300 group-hover:text-accent">
          {question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={springConfig}
          className="shrink-0 text-text-secondary transition-colors duration-300 group-hover:text-text-primary"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springConfig}
            className="overflow-hidden"
          >
            <p className="pb-6 text-text-secondary leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

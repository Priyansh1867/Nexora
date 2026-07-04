import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Is Nexora free for students?",
    answer: "Yes, Nexora is completely free for individual students! You can create your profile, find teammate connections, join project workspaces, and access our curated resource library at no cost.",
  },
  {
    question: "Can I collaborate with students from other colleges?",
    answer: "Absolutely! Nexora is a cross-campus platform. You can search for teammates based on skills, interests, and availability, regardless of which institution they attend.",
  },
  {
    question: "Does Nexora provide study materials?",
    answer: "Yes, our Resource Library contains community-shared PDFs, notes, roadmaps, interview guides, and reference books. You can search by tags, courses, or subjects to find exactly what you need.",
  },
  {
    question: "Can I create my own projects?",
    answer: "Yes, you can create new projects, set milestones, list required roles, and post them to our Team Finder. Other students can then apply to collaborate with you.",
  },
  {
    question: "Is there a mobile application?",
    answer: "Currently, Nexora is built as a fully responsive web application that works flawlessly on desktop, tablet, and mobile browsers. Dedicated iOS and Android apps are in our future roadmap.",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-4xl px-6">

        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-[#172033]"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="overflow-hidden rounded-3xl border border-[#EDF1F4] bg-[#F8FAFB] transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                >
                  <h3 className="text-lg font-bold text-[#172033] pr-4">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#428475] shadow-sm border border-gray-100/50`}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-[#EDF1F4] px-6 pb-6 pt-4 text-[15px] leading-relaxed text-[#4B5563] font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FAQ;
import {
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Free",
    price: "₹0",
    description: "Perfect for students getting started.",
    features: [
      "Create Profile",
      "Join Projects",
      "Basic Chat",
      "Resource Library",
    ],
    button: "Get Started",
    featured: false,
  },
  {
    title: "Pro",
    price: "₹299",
    description: "Unlock premium collaboration features.",
    features: [
      "Everything in Free",
      "Premium Resources",
      "Unlimited Teams",
      "Priority Support",
      "AI Recommendations",
    ],
    button: "Upgrade",
    featured: true,
  },
  {
    title: "Campus",
    price: "Custom",
    description: "For colleges and institutions.",
    features: [
      "Campus Dashboard",
      "Unlimited Students",
      "Analytics",
      "Admin Panel",
      "Dedicated Support",
    ],
    button: "Contact Us",
    featured: false,
  },
];

function Pricing() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = (isFeatured) => ({
    hidden: { y: 50, opacity: 0, scale: isFeatured ? 1.02 : 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: isFeatured ? 1.03 : 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  });

  return (
    <section
      id="pricing"
      className="bg-[#FAFAFA] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-[#172033]"
          >
            Simple Pricing
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-3xl text-lg text-[#4B5563]"
          >
            Choose the perfect plan for your learning journey.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid gap-8 lg:grid-cols-3 items-center"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.title}
              variants={cardVariants(plan.featured)}
              whileHover={{ y: -8, scale: plan.featured ? 1.05 : 1.02 }}
              className={`relative rounded-[32px] border p-10 transition-all duration-300 ${
                plan.featured
                  ? "border-[#428475] bg-[#16332D] text-white shadow-xl shadow-[#16332D]/20 z-10 lg:py-12"
                  : "border-[#EDF1F4] bg-white text-[#172033] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#3BBD8A] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#16332D]">
                  Popular Choice
                </span>
              )}

              <h3 className="text-3xl font-extrabold">
                {plan.title}
              </h3>

              <p className={`mt-3 text-sm ${plan.featured ? "text-emerald-100/80" : "text-[#4B5563]"}`}>
                {plan.description}
              </p>

              <div className="mt-8 flex items-baseline gap-1">
                <span className="text-5xl font-black">{plan.price}</span>
                {plan.price !== "Custom" && <span className={`text-sm ${plan.featured ? "text-emerald-100/60" : "text-gray-500"}`}>/month</span>}
              </div>

              <div className="mt-10 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 font-semibold"
                  >
                    <Check size={18} className={plan.featured ? "text-[#3BBD8A]" : "text-[#428475]"} />
                    <span className={plan.featured ? "text-emerald-50" : "text-[#374151]"}>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`mt-10 w-full rounded-2xl py-4 font-bold transition-all duration-300 ${
                  plan.featured
                    ? "bg-[#3BBD8A] text-[#16332D] hover:bg-[#2fa073] hover:shadow-lg hover:shadow-[#3BBD8A]/35"
                    : "bg-[#16332D] text-white hover:bg-[#428475] hover:shadow-lg hover:shadow-[#428475]/25"
                }`}
              >
                {plan.button}
              </button>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default Pricing;
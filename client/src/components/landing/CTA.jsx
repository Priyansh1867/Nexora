import {
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0F2924] via-[#1A453B] to-[#2D5F54] py-24 text-white">
      {/* Decorative Blur Elements */}
      <div className="absolute -top-32 -left-32 h-[350px] w-[350px] rounded-full bg-[#3BBD8A]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 flex flex-col items-center text-center relative z-10">

        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-5xl font-black tracking-tight text-center"
        >
          Ready to Build Your Future?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-emerald-100 text-center"
        >
          Join thousands of students learning, collaborating, and growing together on Nexora.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/register"
            style={{ color: "#16332D" }}
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-emerald-500/15 transition-all duration-300 hover:-translate-y-1"
          >
            Join Nexora
            <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>

    </section>
  );
}

export default CTA;
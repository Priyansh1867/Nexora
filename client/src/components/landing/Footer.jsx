import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#16332D] py-16 text-white border-t border-[#1F4039]">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 lg:flex-row">

        <div>

          <h2 className="text-3xl font-extrabold tracking-tight">
            Nexora
          </h2>

          <p className="mt-4 max-w-md leading-relaxed text-emerald-100/80">
            A collaborative learning platform empowering students through skills, projects, and innovation.
          </p>

        </div>

        <div className="flex gap-5">

          <a href="#" className="rounded-xl bg-white/10 p-3 hover:bg-white/20 transition-all duration-200">
            <Github size={20} />
          </a>

          <a href="#" className="rounded-xl bg-white/10 p-3 hover:bg-white/20 transition-all duration-200">
            <Linkedin size={20} />
          </a>

          <a href="#" className="rounded-xl bg-white/10 p-3 hover:bg-white/20 transition-all duration-200">
            <Instagram size={20} />
          </a>

          <a href="#" className="rounded-xl bg-white/10 p-3 hover:bg-white/20 transition-all duration-200">
            <Twitter size={20} />
          </a>

        </div>

      </div>

      <div className="mx-auto max-w-7xl mt-12 border-t border-white/10 pt-8 text-center text-sm text-emerald-100/60">
        © 2026 Nexora. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
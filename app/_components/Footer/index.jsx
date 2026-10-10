import { ArrowUp } from "lucide-react";
import Logo from "@/components/Logo";
import Container from "../Container";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Container className="pt-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10 text-white" />
            <div>
              <p className="font-display text-[17px] font-bold tracking-tight">Ismat Cahangirov</p>
              <p className="text-[13px] text-white/50">Full stack developer, Baku</p>
            </div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/60">
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#stack" className="hover:text-white">Stack</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <a href="https://github.com/ismetcahangirov" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub
            </a>
          </nav>
          <a
            href="#home"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2.5 text-[13px] font-medium transition-colors hover:border-signal hover:bg-signal md:self-auto"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </Container>
      <p
        aria-hidden="true"
        className="font-wide text-outline mt-10 select-none whitespace-nowrap text-center text-[15.5vw] font-black uppercase leading-[0.78] tracking-[-0.04em] text-white/20 lg:text-[12.4vw]"
      >
        Cahangirov
      </p>
      <Container className="flex items-center justify-between border-t border-white/10 py-5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
        <span>© {new Date().getFullYear()} Ismat Cahangirov</span>
        <span>Built with Next.js</span>
      </Container>
    </footer>
  );
}

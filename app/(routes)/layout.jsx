import Header from "../_components/Header";
import Footer from "../_components/Footer";

export default function RoutesLayout({ children }) {
  return (
    <>
      <a
        href="#projects"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to projects
      </a>
      <Header />
      {children}
      <Footer />
    </>
  );
}

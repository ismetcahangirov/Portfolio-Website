import { Archivo, Hanken_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { getDict, locales, localePath } from "@/app/_i18n";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-caveat",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDict(lang);
  return {
    metadataBase: new URL("https://www.ismatcahangirov.com"),
    title: t.meta.title,
    description: t.meta.description,
    icons: { icon: "/logo.svg" },
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries(locales.map((l) => [l, localePath(l)])),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.ogDescription,
      images: ["/scene/hero-figure.png"],
      locale: lang === "az" ? "az_AZ" : "en_GB",
      type: "website",
    },
  };
}

export const viewport = {
  themeColor: "#d5d5d5",
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!locales.includes(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={lang} className={`${archivo.variable} ${hanken.variable} ${jetbrains.variable} ${caveat.variable}`}>
      <body>
        <a
          href="#projects"
          className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {t.skip}
        </a>
        <Header lang={lang} />
        {children}
        <Footer lang={lang} />
        <Toaster position="bottom-center" theme="dark" />
      </body>
    </html>
  );
}
